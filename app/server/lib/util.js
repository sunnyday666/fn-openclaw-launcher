'use strict';

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');

/** Read + parse JSON, returning `fallback` when missing or corrupt. */
function readJsonSync(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

/** Atomically write JSON (write temp + rename) so readers never see a partial file. */
async function writeJsonAtomic(file, value) {
  await fsp.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  await fsp.writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await fsp.rename(tmp, file);
}

function existsSync(file) {
  try {
    fs.accessSync(file);
    return true;
  } catch {
    return false;
  }
}

async function exists(file) {
  try {
    await fsp.access(file);
    return true;
  } catch {
    return false;
  }
}

function randomToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString('base64url');
}

/**
 * Run a command and capture output. Never throws on a non-zero exit —
 * the caller inspects `code` so it can surface real error text to the UI.
 */
function run(cmd, args, options = {}) {
  const {
    cwd,
    env,
    timeoutMs = 120_000,
    input = null,
    maxBuffer = 8 * 1024 * 1024,
  } = options;

  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(cmd, args, {
        cwd,
        env: env ? { ...process.env, ...env } : process.env,
        stdio: ['pipe', 'pipe', 'pipe'],
      });
    } catch (err) {
      resolve({ code: -1, stdout: '', stderr: String(err && err.message), spawnError: true });
      return;
    }

    let stdout = '';
    let stderr = '';
    let killedBy = null;
    let truncated = false;

    const append = (target, chunk) => {
      const next = target + chunk;
      if (next.length > maxBuffer) {
        truncated = true;
        return next.slice(0, maxBuffer);
      }
      return next;
    };

    child.stdout.on('data', (d) => {
      stdout = append(stdout, d.toString());
    });
    child.stderr.on('data', (d) => {
      stderr = append(stderr, d.toString());
    });

    const timer = setTimeout(() => {
      killedBy = 'timeout';
      try {
        child.kill('SIGKILL');
      } catch {
        /* ignore */
      }
    }, timeoutMs);

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ code: -1, stdout, stderr: `${stderr}${err.message}`, spawnError: true, truncated });
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code: code === null ? -1 : code, stdout, stderr, killedBy, truncated });
    });

    if (input !== null) {
      child.stdin.end(input);
    } else {
      child.stdin.end();
    }
  });
}

/** Parse the first JSON value found in a CLI's stdout (tolerates leading log lines). */
function extractJson(text) {
  if (!text) return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    /* fall through to brace scanning */
  }
  const start = trimmed.search(/[[{]/);
  if (start === -1) return null;
  const opener = trimmed[start];
  const closer = opener === '{' ? '}' : ']';
  const end = trimmed.lastIndexOf(closer);
  if (end <= start) return null;
  try {
    return JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }
}

/** Check whether a pid is alive. */
function pidAlive(pid) {
  if (!pid || Number.isNaN(Number(pid))) return false;
  try {
    process.kill(Number(pid), 0);
    return true;
  } catch (err) {
    return err.code === 'EPERM';
  }
}

function readPidFile(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8').trim();
    const pid = Number.parseInt(raw, 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

/** Tail the last `lines` lines of a file without reading all of it. */
async function tailFile(file, lines = 200, maxBytes = 512 * 1024) {
  let handle;
  try {
    const stat = await fsp.stat(file);
    if (!stat.isFile()) return '';
    const start = Math.max(0, stat.size - maxBytes);
    handle = await fsp.open(file, 'r');
    const length = stat.size - start;
    const buf = Buffer.alloc(Number(length));
    await handle.read(buf, 0, Number(length), start);
    const text = buf.toString('utf8');
    const parts = text.split('\n');
    if (start > 0) parts.shift();
    return parts.slice(-lines).join('\n');
  } catch {
    return '';
  } finally {
    if (handle) await handle.close().catch(() => {});
  }
}

/** Append a line to a log file, creating parents as needed. */
async function appendLog(file, line) {
  const stamp = new Date().toISOString();
  try {
    await fsp.mkdir(path.dirname(file), { recursive: true });
    await fsp.appendFile(file, `[${stamp}] ${line}\n`, 'utf8');
  } catch {
    /* logging must never break the caller */
  }
}

/** Rotate a log file once it grows past `maxBytes`. */
async function rotateLog(file, maxBytes = 2 * 1024 * 1024) {
  try {
    const stat = await fsp.stat(file);
    if (stat.size < maxBytes) return;
    await fsp.rename(file, `${file}.1`);
  } catch {
    /* nothing to rotate */
  }
}

/** Promisified sleep. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Clamp a number into a range, falling back when not finite. */
function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/** Deep-merge plain objects; arrays and scalars from `source` win. */
function deepMerge(target, source) {
  if (!isPlainObject(target) || !isPlainObject(source)) return source;
  const out = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(out[key])) {
      out[key] = deepMerge(out[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

module.exports = {
  readJsonSync,
  writeJsonAtomic,
  exists,
  existsSync,
  randomToken,
  run,
  extractJson,
  pidAlive,
  readPidFile,
  tailFile,
  appendLog,
  rotateLog,
  sleep,
  clampInt,
  isPlainObject,
  deepMerge,
};
