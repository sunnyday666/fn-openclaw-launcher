/**
 * Compare the fnOS portal route for our app against a known-working app,
 * using an authenticated desktop session.
 *
 * Usage: node scripts/check-portal-route.mjs
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

const BASE = process.env.DESKTOP_URL || 'http://127.0.0.1:5666';
const USER = process.env.DESKTOP_USER || '';
const PASS = process.env.DESKTOP_PASS || '';
if (!USER || !PASS) {
  console.error('set DESKTOP_USER and DESKTOP_PASS (and DESKTOP_URL)');
  process.exit(2);
}
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newContext({ viewport: { width: 1400, height: 900 } }).then((c) => c.newPage());

await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.waitForTimeout(3000);
await page.locator('input[type="password"]').first().fill(PASS);
await page.locator('input[type="text"], input[name="username"]').first().fill(USER).catch(() => {});
await page.keyboard.press('Enter');
await page.waitForTimeout(9000);
console.log('logged in, title =', await page.title());

// Probe several paths from inside the authenticated session.
const paths = process.argv.slice(2).filter((a) => a.startsWith('/'));
if (paths.length === 0) {
  paths.push(
    '/app/fn-deepseek-harness/',
    '/app/openclaw.studio/',
    '/app/openclaw.studio',
    '/app/openclaw-studio/',
    '/app/openclaw-studio',
  );
}

const results = await page.evaluate(async (list) => {
  const out = [];
  for (const p of list) {
    try {
      const r = await fetch(p, { redirect: 'manual' });
      const ct = r.headers.get('content-type') || '-';
      let body = '';
      if (!ct.includes('image')) body = (await r.text()).slice(0, 160).replace(/\s+/g, ' ');
      out.push({ path: p, status: r.status, ct, body });
    } catch (e) {
      out.push({ path: p, status: 'ERR', ct: '-', body: String(e).slice(0, 120) });
    }
  }
  return out;
}, paths);

console.log('\n=== authenticated portal probes ===');
for (const r of results) {
  console.log(`${String(r.status).padEnd(5)} ${r.path}`);
  console.log(`      ct=${r.ct}`);
  if (r.body) console.log(`      body=${r.body}`);
}

// Also ask the desktop what apps it thinks are installed.
const api = await page.evaluate(async () => {
  const tries = [
    '/api/controller/v2/app_user',
    '/api/controller/v1/app',
    '/app/ticket',
  ];
  const out = [];
  for (const t of tries) {
    try {
      const r = await fetch(t);
      out.push({ t, status: r.status, body: (await r.text()).slice(0, 200).replace(/\s+/g, ' ') });
    } catch (e) {
      out.push({ t, status: 'ERR', body: String(e).slice(0, 100) });
    }
  }
  return out;
});
console.log('\n=== desktop API probes ===');
for (const r of api) console.log(`${r.status} ${r.t} :: ${r.body}`);

await browser.close();
