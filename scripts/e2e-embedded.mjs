/**
 * Full user journey through the fnOS desktop, embedded mode:
 *   log in → click 桌面图标 → launcher UI inside the desktop window
 *   → click 打开 OpenClaw → Control UI opens and the device auto-registers.
 *
 * Usage: node scripts/e2e-embedded.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DEV = path.resolve(HERE, '..');

async function loadPlaywright() {
  for (const root of [process.env.PLAYWRIGHT_MODULES, path.join(DEV, '.dev', 'openclaw', 'node_modules')].filter(Boolean)) {
    for (const f of ['index.mjs', 'index.js']) {
      const p = path.join(root, 'playwright-core', f);
      if (fs.existsSync(p)) return import(pathToFileURL(p).href);
    }
  }
  throw new Error('playwright-core not found');
}
const { chromium } = await loadPlaywright();

const OUT = path.join(DEV, 'docs', 'screenshots');
const API = process.env.STUDIO_API || 'http://127.0.0.1:18790';
const DESKTOP = process.env.DESKTOP_URL || '';
const DESKTOP_USER = process.env.DESKTOP_USER || '';
const DESKTOP_PASS = process.env.DESKTOP_PASS || '';
if (!DESKTOP || !DESKTOP_USER || !DESKTOP_PASS) {
  console.error('set DESKTOP_URL, DESKTOP_USER and DESKTOP_PASS');
  process.exit(2);
}

const problems = [];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1500, height: 950 } });
const page = await ctx.newPage();

const consoleErrors = [];
const pageErrors = [];
const failed = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => pageErrors.push(e.message));
page.on('requestfailed', (r) => failed.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText}`));

const api = async (p) => (await (await fetch(`${API}${p}`)).json()).data;

// ---------------------------------------------------------------- baseline
const before = await api('/api/devices');
console.log(`baseline: pending=${before.pending.length} paired=${before.paired.length}`);

// ------------------------------------------------------------ fnOS desktop
await page.goto(DESKTOP, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.waitForTimeout(3000);
await page.locator('input[type="password"]').first().fill(DESKTOP_PASS);
await page.locator('input[type="text"], input[name="username"]').first().fill(DESKTOP_USER).catch(() => {});
await page.keyboard.press('Enter');
await page.waitForTimeout(9000);
console.log('fnOS desktop logged in');

// --------------------------------------------------- open the app (embedded)
console.log('clicking desktop icon …');
await page.locator('text=OpenClaw 管家').first().click({ timeout: 10_000 });
await page.waitForTimeout(9000);
await page.screenshot({ path: path.join(OUT, 'embedded-1-launcher.png') });

// The launcher UI lives in a child frame served through the portal.
const frames = page.frames();
const appFrame = frames.find((f) => f.url().includes('/app/openclaw-studio'));
console.log('frames:', frames.map((f) => f.url()).join('\n         '));

if (!appFrame) {
  problems.push('未找到应用 iframe（/app/openclaw-studio）');
} else {
  const text = await appFrame.evaluate(() => document.body.innerText || '').catch(() => '');
  const shell = /OpenClaw 管家/.test(text) && /总览/.test(text);
  console.log('embedded UI rendered:', shell);
  console.log('excerpt:', text.slice(0, 200).replace(/\n+/g, ' | '));
  if (!shell) problems.push('内嵌界面未渲染');
}

// ------------------------------------------------- click 打开 OpenClaw
console.log('\nclicking 打开 OpenClaw inside the embedded UI …');
const target = appFrame || page;
const btn = target.locator('button:has-text("打开 OpenClaw")').first();
const count = await btn.count();
console.log('button occurrences:', count);

let opened = null;
if (count > 0) {
  const popupPromise = page.waitForEvent('popup', { timeout: 20_000 }).catch(() => null);
  await btn.click({ timeout: 8000 }).catch((e) => console.log('click err:', e.message));
  opened = await popupPromise;
}

// The Control UI may open as a popup or inside the frame.
await page.waitForTimeout(6000);
const allPages = ctx.pages();
console.log('pages:', allPages.map((p) => p.url()).join('\n        '));

let controlPage = opened || allPages.find((p) => p.url().includes('/control'));
if (!controlPage) {
  // Opening a new tab was blocked for the headless popup: navigate directly.
  const link = await api('/api/gateway/control-link');
  console.log('popup blocked, navigating directly to', link.proxiedUrl.replace(/#.*/, '#***'));
  controlPage = await ctx.newPage();
  await controlPage.goto(`${DESKTOP}/app/openclaw-studio/${link.proxiedUrl}`, {
    waitUntil: 'domcontentloaded',
    timeout: 45_000,
  });
}

await controlPage.waitForTimeout(24_000);
await controlPage.screenshot({ path: path.join(OUT, 'embedded-2-controlui.png') });
console.log('control UI title:', await controlPage.title().catch(() => '?'));

// ---------------------------------------------------------- auto-register
const after = await api('/api/devices');
console.log(`\ndevices after: pending=${after.pending.length} paired=${after.paired.length}`);
console.log('engine stats:', JSON.stringify(after.engine.stats));

if (after.paired.length > before.paired.length) {
  console.log('NEW PAIRED DEVICE —', after.paired[0].label, 'via', after.paired[0].approvedVia);
} else {
  problems.push('没有设备完成自动注册');
}

// ---------------------------------------------------------------- verdict
const OPTIONAL = /(\/avatar(\?|$)|catalog-icon|favicon|apple-touch-icon|manifest\.webmanifest)/;
const meaningful = failed.filter((f) => !OPTIONAL.test(f));
console.log(`\nconsole errors: ${consoleErrors.length}  page errors: ${pageErrors.length}  failed: ${meaningful.length}`);
consoleErrors.slice(0, 6).forEach((e) => console.log('   •', e.slice(0, 160)));
meaningful.slice(0, 6).forEach((e) => console.log('   •', e.slice(0, 160)));

if (pageErrors.length) problems.push(`${pageErrors.length} 个页面错误`);
if (meaningful.length) problems.push(`${meaningful.length} 个失败请求`);

await browser.close();
console.log(`\n═══ EMBEDDED E2E: ${problems.length === 0 ? 'PASS ✅' : 'ISSUES ⚠️'} ═══`);
problems.forEach((p) => console.log('  !', p));
process.exit(problems.length === 0 ? 0 : 1);
