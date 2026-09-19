/**
 * Theme resolution test.
 *
 * The launcher must mirror the fnOS desktop's light/dark preference. fnOS stores
 * an enum — 10 = light, 20 = dark, 30 = follow the system — and copying that
 * value verbatim into `theme-mode` matches no CSS rule, silently pinning the app
 * to light. These cases pin the mapping down.
 *
 * Serves app/ui/ over a throwaway static server, so it does not need the app
 * installed. Usage: node scripts/test-theme.mjs
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DEV = path.resolve(HERE, '..');
const UI = path.join(DEV, 'app', 'ui');

async function loadPlaywright() {
  const roots = [process.env.PLAYWRIGHT_MODULES, path.join(DEV, '.dev', 'openclaw', 'node_modules')].filter(Boolean);
  for (const root of roots) {
    for (const f of ['index.mjs', 'index.js']) {
      const p = path.join(root, 'playwright-core', f);
      if (fs.existsSync(p)) return import(pathToFileURL(p).href);
    }
  }
  throw new Error('playwright-core not found');
}
const { chromium } = await loadPlaywright();

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : d;
};
const PORT = Number(arg('port', 18999));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(UI, rel);
  if (!file.startsWith(UI) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const BASE = `http://127.0.0.1:${PORT}/`;
const DARK_BG = 'rgb(22, 24, 29)'; // style.css --bg, dark
const LIGHT_BG = 'rgb(244, 245, 247)'; // style.css --bg, light

// [label, injected fnos-theme-mode (or null), system colour scheme, expected theme]
const CASES = [
  ['30 follow-system + OS dark', '30', 'dark', 'dark'],
  ['30 follow-system + OS light', '30', 'light', 'light'],
  ['20 forced dark + OS light', '20', 'light', 'dark'],
  ['10 forced light + OS dark', '10', 'dark', 'light'],
  ['legacy word "dark"', 'dark', 'light', 'dark'],
  ['legacy word "light"', 'light', 'dark', 'light'],
  ['key absent + OS dark', null, 'dark', 'dark'],
  ['key absent + OS light', null, 'light', 'light'],
];

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
let pass = 0;
let fail = 0;

for (const [label, fnosVal, scheme, expect] of CASES) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 700 }, colorScheme: scheme });
  if (fnosVal !== null) {
    await ctx.addInitScript((v) => {
      try { localStorage.setItem('fnos-theme-mode', v); } catch (e) { /* blocked */ }
    }, fnosVal);
  }
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForTimeout(400);

  const got = await page.evaluate(() => document.documentElement.getAttribute('theme-mode'));
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const ok = got === expect && bg === (expect === 'dark' ? DARK_BG : LIGHT_BG) && errs.length === 0;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(28)} theme-mode=${String(got).padEnd(6)} bg=${bg}`);
  if (!ok) console.log(`        expected theme-mode=${expect} bg=${expect === 'dark' ? DARK_BG : LIGHT_BG}${errs.length ? ' errors=' + errs.join(';') : ''}`);
  ok ? pass++ : fail++;
  await ctx.close();
}

// Switching the desktop theme must apply without a reload: the parent frame
// writes localStorage, and a same-origin embed receives a `storage` event.
console.log('\n  live switch (no reload)');
{
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 700 }, colorScheme: 'dark' });
  await ctx.addInitScript(() => { try { localStorage.setItem('fnos-theme-mode', '10'); } catch (e) { /* blocked */ } });
  const app = await ctx.newPage();
  await app.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await app.waitForTimeout(400);
  const before = await app.evaluate(() => document.documentElement.getAttribute('theme-mode'));

  const other = await ctx.newPage(); // same origin, stands in for the fnOS desktop
  await other.goto(`${BASE}index.html`, { waitUntil: 'domcontentloaded' });

  await other.evaluate(() => localStorage.setItem('fnos-theme-mode', '20'));
  await app.waitForTimeout(700);
  const toDark = await app.evaluate(() => document.documentElement.getAttribute('theme-mode'));
  const darkBg = await app.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await other.evaluate(() => localStorage.setItem('fnos-theme-mode', '10'));
  await app.waitForTimeout(700);
  const toLight = await app.evaluate(() => document.documentElement.getAttribute('theme-mode'));

  const ok = before === 'light' && toDark === 'dark' && darkBg === DARK_BG && toLight === 'light';
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${before} -> ${toDark} (bg=${darkBg}) -> ${toLight}`);
  ok ? pass++ : fail++;
  await ctx.close();
}

await browser.close();
server.close();

console.log(`\n═══ THEME: ${fail === 0 ? 'PASS ✅' : 'FAIL ❌'} — ${pass} passed / ${fail} failed ═══`);
process.exit(fail === 0 ? 0 : 1);
