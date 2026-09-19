/**
 * Log into the fnOS desktop and check whether OpenClaw 管家 appears.
 *
 * Credentials come from the environment, never from source:
 *   DESKTOP_URL, DESKTOP_USER, DESKTOP_PASS
 *
 * Usage: DESKTOP_URL=http://nas:5666 DESKTOP_USER=me DESKTOP_PASS=... \
 *          node scripts/check-desktop.mjs
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

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : d;
};

const BASE = arg('base', process.env.DESKTOP_URL || 'http://127.0.0.1:5666');
const USER = arg('user', process.env.DESKTOP_USER || '');
const PASS = arg('pass', process.env.DESKTOP_PASS || '');
if (!USER || !PASS) {
  console.error('set DESKTOP_USER and DESKTOP_PASS (and DESKTOP_URL)');
  process.exit(2);
}

const OUT = path.join(DEV, 'docs', 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newContext({ viewport: { width: 1500, height: 950 }, ignoreHTTPSErrors: true }).then((c) => c.newPage());

console.log(`opening ${BASE} …`);
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.waitForTimeout(4000);

console.log('title:', await page.title());
await page.screenshot({ path: path.join(OUT, 'fnos-login.png') });

// Find and fill the login form.
const userSel = 'input[type="text"], input[name="username"], input[placeholder*="用户"], input[placeholder*="账号"]';
const passSel = 'input[type="password"]';

const hasLogin = (await page.locator(passSel).count()) > 0;
console.log('password field present:', hasLogin);

if (hasLogin) {
  await page.locator(userSel).first().fill(USER).catch(() => {});
  await page.locator(passSel).first().fill(PASS);
  await page.keyboard.press('Enter');
  console.log('submitted login, waiting…');
  await page.waitForTimeout(9000);
  await page.screenshot({ path: path.join(OUT, 'fnos-desktop.png') });
  console.log('after login title:', await page.title());
}

const text = await page.evaluate(() => document.body.innerText || '');
console.log('\n─── desktop text (searching for our app) ───');
const found = /OpenClaw/.test(text);
console.log('mentions OpenClaw :', found);
console.log('body excerpt:', text.slice(0, 700).replace(/\n+/g, ' | '));

// Try clicking the app if it is on the desktop.
if (found) {
  const el = page.locator('text=OpenClaw').first();
  await el.click({ timeout: 5000 }).catch((e) => console.log('click failed:', e.message));
  await page.waitForTimeout(6000);
  await page.screenshot({ path: path.join(OUT, 'fnos-app-opened.png') });
  const inner = await page.evaluate(() => document.body.innerText || '');
  console.log('\nafter click, excerpt:', inner.slice(0, 400).replace(/\n+/g, ' | '));
}

await browser.close();
console.log('\nscreenshots in', OUT);
