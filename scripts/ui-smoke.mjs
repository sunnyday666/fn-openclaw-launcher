/**
 * Render the launcher UI in a headless browser and capture each panel.
 * Fails on any console error, page error, or failed request.
 *
 * Usage: node scripts/ui-smoke.mjs [--base http://host:port] [--out dir]
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DEV = path.resolve(HERE, '..');

async function loadPlaywright() {
  const roots = [
    process.env.PLAYWRIGHT_MODULES,
    path.join(DEV, '.dev', 'openclaw', 'node_modules'),
  ].filter(Boolean);
  for (const root of roots) {
    for (const file of ['index.mjs', 'index.js']) {
      const p = path.join(root, 'playwright-core', file);
      if (fs.existsSync(p)) return import(pathToFileURL(p).href);
    }
  }
  throw new Error('playwright-core not found');
}
const { chromium } = await loadPlaywright();

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const BASE = arg('base', 'http://127.0.0.1:18790');
const OUT = arg('out', path.join(DEV, 'docs', 'screenshots'));
fs.mkdirSync(OUT, { recursive: true });

const PANELS = [
  { id: '', name: 'overview' },
  { id: '#service', name: 'service' },
  { id: '#devices', name: 'devices' },
  { id: '#logs', name: 'logs' },
  { id: '#advanced', name: 'advanced' },
];

const problems = [];

/**
 * Docs screenshots are published to a public repo, but the panels render the
 * live gateway token and the host's real IP. Mask both in the DOM *before*
 * capture so a screenshot can never leak a working credential.
 * Disable with --no-redact (only useful for private debugging).
 */
const REDACT = !process.argv.includes('--no-redact');

async function redactSecrets(page) {
  if (!REDACT) return;
  await page.evaluate(() => {
    const fix = (s) =>
      String(s)
        .replace(/#token=[A-Za-z0-9_-]{8,}/g, '#token=••••••••••••••••••')
        .replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, '192.168.1.100');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const next = fix(n.nodeValue);
      if (next !== n.nodeValue) n.nodeValue = next;
    }
    // URL fields are <input>.value — not part of the text tree.
    for (const el of document.querySelectorAll('input, textarea')) {
      if (el.value) el.value = fix(el.value);
    }
  });
}

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 950 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => pageErrors.push(e.message));
page.on('requestfailed', (r) => failedRequests.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText}`));

for (const panel of PANELS) {
  const before = { c: consoleErrors.length, p: pageErrors.length, f: failedRequests.length };

  await page.goto(`${BASE}/${panel.id}`, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.waitForTimeout(1800);

  const title = await page.title();
  const bodyText = await page.evaluate(() => document.body.innerText || '');

  // The shell must not be stuck on a skeleton or an error wall.
  const hasShell = /OpenClaw 管家/.test(bodyText);
  const errored = /无法连接启动器服务/.test(bodyText);
  if (!hasShell) problems.push(`[${panel.name}] 界面未渲染（正文：${bodyText.slice(0, 90).replace(/\n/g, ' ')}）`);
  if (errored) problems.push(`[${panel.name}] 显示连接错误`);

  const shot = path.join(OUT, `${panel.name}.png`);
  await redactSecrets(page);
  await page.screenshot({ path: shot, fullPage: true });

  const newC = consoleErrors.length - before.c;
  const newP = pageErrors.length - before.p;
  const newF = failedRequests.length - before.f;
  console.log(
    `${panel.name.padEnd(9)} title="${title}" shell=${hasShell ? 'yes' : 'NO'} ` +
      `console=${newC} page=${newP} failed=${newF} -> ${path.relative(DEV, shot)}`,
  );
}

// Dark theme render for the first panel.
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  document.documentElement.setAttribute('theme-mode', 'dark');
  try { localStorage.setItem('fnos-theme-mode', 'dark'); } catch {}
});
await page.waitForTimeout(900);
await redactSecrets(page);
await page.screenshot({ path: path.join(OUT, 'overview-dark.png'), fullPage: true });
console.log(`overview-dark -> ${path.relative(DEV, path.join(OUT, 'overview-dark.png'))}`);
console.log(`redaction: ${REDACT ? 'on（已脱敏 token 与 IP）' : 'OFF'}`);

await browser.close();

const meaningful = failedRequests.filter((f) => !/favicon/.test(f));
console.log('\n─── diagnostics ───');
console.log(`console errors : ${consoleErrors.length}`);
consoleErrors.slice(0, 10).forEach((e) => console.log(`   • ${e.slice(0, 180)}`));
console.log(`page errors    : ${pageErrors.length}`);
pageErrors.slice(0, 10).forEach((e) => console.log(`   • ${e.slice(0, 180)}`));
console.log(`failed requests: ${meaningful.length}`);
meaningful.slice(0, 10).forEach((e) => console.log(`   • ${e.slice(0, 180)}`));

if (consoleErrors.length) problems.push(`${consoleErrors.length} 个控制台错误`);
if (pageErrors.length) problems.push(`${pageErrors.length} 个页面错误`);
if (meaningful.length) problems.push(`${meaningful.length} 个失败请求`);

console.log(`\n═══ UI SMOKE: ${problems.length === 0 ? 'PASS ✅' : 'ISSUES ⚠️'} ═══`);
problems.forEach((p) => console.log(`  ! ${p}`));
process.exit(problems.length === 0 ? 0 : 1);
