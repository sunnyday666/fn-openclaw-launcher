/**
 * End-to-end test: does a browser open the OpenClaw Control UI and get
 * auto-registered without any manual approval?
 *
 * Runs against a live launcher + gateway and reports a timeline so the
 * auto-registration behaviour can be verified rather than assumed.
 *
 * Usage:
 *   node scripts/e2e-pairing.mjs [--keep] [--url <controlUiUrl>] [--api <apiBase>]
 *
 * playwright-core is resolved from PLAYWRIGHT_MODULES (a node_modules directory)
 * so the test does not need its own dependency tree.
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DEV = path.resolve(HERE, '..');

/** Resolve playwright-core from the dev tree (or a caller-supplied location). */
async function loadPlaywright() {
  const roots = [
    process.env.PLAYWRIGHT_MODULES,
    path.join(DEV, '.dev', 'openclaw', 'node_modules'),
    path.join(HERE, 'node_modules'),
  ].filter(Boolean);

  for (const root of roots) {
    const candidate = path.join(root, 'playwright-core', 'index.mjs');
    const fallback = path.join(root, 'playwright-core', 'index.js');
    for (const file of [candidate, fallback]) {
      if (fs.existsSync(file)) {
        return import(pathToFileURL(file).href);
      }
    }
  }
  throw new Error('找不到 playwright-core，请设置 PLAYWRIGHT_MODULES 指向其 node_modules 目录');
}

const { chromium } = await loadPlaywright();

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const flag = (name) => process.argv.includes(`--${name}`);

const API = arg('api', 'http://127.0.0.1:18080');
const KEEP = flag('keep');

const t0 = Date.now();
const timeline = [];
const problems = [];

function mark(label, detail = '') {
  const at = ((Date.now() - t0) / 1000).toFixed(2);
  const line = `[+${at}s] ${label}${detail ? ` — ${detail}` : ''}`;
  timeline.push(line);
  console.log(line);
}

async function api(pathname, options) {
  const res = await fetch(`${API}${pathname}`, options);
  const json = await res.json();
  if (!json.ok) throw new Error(`${pathname}: ${json.error?.message || 'failed'}`);
  return json.data;
}

async function main() {
  console.log('═══ OpenClaw Studio — auto-registration E2E test ═══\n');

  // ---------------------------------------------------------------- baseline
  const status = await api('/api/status');
  if (!status.gateway.running) throw new Error('网关未运行，请先启动');
  const token = status.settings.gateway.token;
  const port = status.gateway.port;
  const host = process.env.E2E_HOST || '127.0.0.1';

  mark('baseline', `gateway pid=${status.gateway.pid} port=${port} oc=${status.openclaw.version}`);
  mark('pairing engine', `enabled=${status.pairing.enabled} poll=${status.pairing.pollIntervalMs}ms`);

  const before = await api('/api/devices');
  mark('devices before', `pending=${before.pending.length} paired=${before.paired.length}`);

  const controlUrl = arg('url', `http://${host}:${port}/#token=${encodeURIComponent(token)}`);
  mark('opening', controlUrl.replace(token, '***'));

  // ---------------------------------------------------------------- browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText}`);
  });

  mark('navigating…');
  await page.goto(controlUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  // ------------------------------------------- watch for the pending request
  let sawPending = false;
  let pendingInfo = null;
  const watchStart = Date.now();
  while (Date.now() - watchStart < 30_000) {
    const dev = await api('/api/devices').catch(() => null);
    if (dev && dev.pending.length > 0) {
      sawPending = true;
      pendingInfo = dev.pending[0];
      mark('PENDING detected', `role=${pendingInfo.role} device=${pendingInfo.label} id=${pendingInfo.requestId}`);
      break;
    }
    // It may already have been approved by the engine between polls.
    const recent = await api('/api/devices').catch(() => null);
    if (recent && recent.engine.recent.length > 0) {
      sawPending = true;
      const r = recent.engine.recent[0];
      mark('already approved', `requestId=${r.requestId} source=${r.source}`);
      break;
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  if (!sawPending) mark('no pending request observed', '(pairing may have been silent/local)');

  // ------------------------------------------- wait for the UI to be usable
  const deadline = Date.now() + 60_000;
  let ready = false;
  let lastText = '';
  let everBlocked = false;
  while (Date.now() < deadline) {
    const text = await page.evaluate(() => document.body.innerText || '').catch(() => '');
    lastText = text;
    // An approval wall is the failure mode we are testing for.
    if (/Approve this browser|has not seen it|等待批准|not been approved/i.test(text)) {
      everBlocked = true;
    }
    // Ready = the app shell rendered and no approval wall is present.
    const shell = /Ask OpenClaw|CONNECTIONS|Gateway|Sessions|Chat|Settings/i.test(text);
    if (shell && !everBlocked) {
      ready = true;
      break;
    }
    await page.waitForTimeout(700);
  }

  mark(ready ? 'UI READY' : 'UI NOT READY', ready ? '' : `body starts: ${lastText.slice(0, 120).replace(/\n/g, ' | ')}`);

  const after = await api('/api/devices');
  mark('devices after', `pending=${after.pending.length} paired=${after.paired.length}`);
  mark('engine stats', JSON.stringify(after.engine.stats));

  if (after.paired.length > before.paired.length) {
    const newest = after.paired[0];
    mark('NEW PAIRED DEVICE', `${newest.label} role=${newest.role} via=${newest.approvedVia}`);
  } else if (before.paired.length > 0) {
    mark('no new paired device', `existing=${before.paired.length}`);
  } else {
    problems.push('没有设备被登记为已配对');
  }

  // ---------------------------------------------------------------- evidence
  await page.screenshot({ path: path.join(DEV, 'e2e-control-ui.png'), fullPage: false }).catch(() => {});

  const title = await page.title().catch(() => '');
  mark('page title', title);

  console.log('\n─── browser diagnostics ───');
  console.log(`console errors : ${consoleErrors.length}`);
  consoleErrors.slice(0, 8).forEach((e) => console.log(`   • ${e.slice(0, 200)}`));
  console.log(`page errors    : ${pageErrors.length}`);
  pageErrors.slice(0, 8).forEach((e) => console.log(`   • ${e.slice(0, 200)}`));
  // Some Control UI requests are optional resources that legitimately 404 on a
  // fresh profile — most notably the gateway owner's avatar, which does not
  // exist until the user uploads one. Verified by a control run straight
  // against the gateway with the launcher out of the path, so these are
  // OpenClaw's own behaviour and are reported as informational.
  const OPTIONAL = /(\/avatar(\?|$)|catalog-icon|favicon|apple-touch-icon|manifest\.webmanifest)/;
  const optionalFailed = failedRequests.filter((f) => OPTIONAL.test(f));
  const meaningfulFailed = failedRequests.filter((f) => !OPTIONAL.test(f));

  console.log(`failed requests: ${meaningfulFailed.length}`);
  meaningfulFailed.slice(0, 8).forEach((e) => console.log(`   • ${e.slice(0, 200)}`));
  if (optionalFailed.length) {
    console.log(`optional/absent  : ${optionalFailed.length} (expected on a fresh profile, not a fault)`);
    optionalFailed.slice(0, 4).forEach((e) => console.log(`   ~ ${e.slice(0, 160)}`));
  }

  console.log('\n─── pairing log tail ───');
  const plog = await api('/api/pairing/log?lines=15').catch(() => ({ lines: '' }));
  console.log(plog.lines || '(empty)');

  if (!ready) problems.push('控制台界面未能进入可用状态');
  if (pageErrors.length) problems.push(`存在 ${pageErrors.length} 个页面 JavaScript 错误`);
  if (meaningfulFailed.length) problems.push(`存在 ${meaningfulFailed.length} 个失败请求`);
  // A console error whose only cause is an optional 404 does not indicate a
  // defect, so judge console noise against the meaningful failures.
  if (consoleErrors.length > optionalFailed.length) {
    problems.push(`存在 ${consoleErrors.length - optionalFailed.length} 个控制台错误`);
  }

  if (!KEEP) await browser.close();

  console.log(`\n═══ RESULT: ${problems.length === 0 ? 'PASS ✅' : 'ISSUES ⚠️'} ═══`);
  problems.forEach((p) => console.log(`  ! ${p}`));
  process.exit(problems.length === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('\nFATAL:', err.message);
  process.exit(2);
});
