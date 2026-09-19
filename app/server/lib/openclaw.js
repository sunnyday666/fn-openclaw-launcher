'use strict';

/**
 * OpenClaw runtime management: provisioning a self-contained Node.js,
 * installing/updating the `openclaw` npm package, and running its CLI.
 *
 * The launcher deliberately does NOT depend on fnOS's `nodejs_v24` package.
 * fnOS currently ships Node 24.15.0 while OpenClaw requires >=24.16.0, so the
 * app downloads and owns its own runtime — which also means upgrades of this
 * app can never break, or be broken by, another package's Node.
 */

const fsp = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const paths = require('./paths');
const settings = require('./settings');
const {
  run,
  extractJson,
  readJsonSync,
  exists,
  appendLog,
  rotateLog,
  randomToken,
} = require('./util');

/** Node release line this launcher provisions (satisfies openclaw >=24.16 <25). */
const NODE_SERIES = 'v24';
const NODE_MIN = [24, 16, 0];

/** OpenClaw's hosted model catalog, pinned so the fetch uses its origin guard. */
const DEFAULT_CATALOG_URL = 'https://catalog.openclaw.ai/models/v1/catalog.json';

/** Path the Control UI is mounted at, so the launcher can proxy it 1:1. */
const CONTROL_UI_BASE_PATH = '/control';

/** Icon CDNs the Control UI pulls provider/model logos from. */
const ICON_HOST_ALLOWLIST = [
  'cdn.simpleicons.org',
  'cdn.jsdelivr.net',
  'raw.githubusercontent.com',
  'api.iconify.design',
  'unpkg.com',
];

/** Thrown for expected, user-presentable failures. */
class LauncherError extends Error {
  constructor(message, { code = 'ELAUNCHER', detail = null, hint = null } = {}) {
    super(message);
    this.name = 'LauncherError';
    this.code = code;
    this.detail = detail;
    this.hint = hint;
  }
}

function compareVersions(a, b) {
  const pa = String(a).split('.').map((n) => Number.parseInt(n, 10) || 0);
  const pb = String(b).split('.').map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d > 0 ? 1 : -1;
  }
  return 0;
}

/** Environment for anything that shells out to the vendored Node/npm. */
function runtimeEnv(extra = {}) {
  const nodeDir = paths.nodeDir;
  return {
    PATH: `${path.join(nodeDir, 'bin')}:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`,
    HOME: paths.homeDir,
    npm_config_cache: paths.npmCacheDir,
    npm_config_prefix: paths.openclawDir,
    npm_config_registry: settings.load().openclaw.registry,
    NODE_COMPILE_CACHE: paths.compileCacheDir,
    OPENCLAW_NO_RESPAWN: '1',
    ...extra,
  };
}

/** Environment for running OpenClaw itself. */
function openclawEnv(extra = {}) {
  return runtimeEnv({
    OPENCLAW_STATE_DIR: paths.stateDir,
    OPENCLAW_CONFIG_PATH: paths.openclawConfig,
    OPENCLAW_WORKSPACE_DIR: paths.workspaceDir,
    ...extra,
  });
}

// ---------------------------------------------------------------------------
// Node runtime
// ---------------------------------------------------------------------------

async function nodeVersion() {
  if (!(await exists(paths.nodeBin))) return null;
  const res = await run(paths.nodeBin, ['-v'], { timeoutMs: 20_000 });
  if (res.code !== 0) return null;
  return res.stdout.trim() || null;
}

/**
 * Download and unpack the newest Node release in `NODE_SERIES` from nodejs.org.
 * Idempotent: re-running replaces the runtime in place.
 */
async function provisionRuntime({ onLog = () => {}, force = false } = {}) {
  const current = await nodeVersion();
  if (current && !force) {
    const parts = current.replace(/^v/, '').split('.').map(Number);
    if (compareVersions(current.replace(/^v/, ''), NODE_MIN.join('.')) >= 0 && parts[0] === 24) {
      return { changed: false, version: current };
    }
  }

  const arch = os.arch() === 'arm64' ? 'arm64' : 'x64';
  onLog(`Resolving latest Node.js ${NODE_SERIES} for linux-${arch}…`);

  const index = await run('curl', ['-sSL', '--max-time', '60', 'https://nodejs.org/dist/index.json'], {
    timeoutMs: 90_000,
  });
  if (index.code !== 0) {
    throw new LauncherError('无法获取 Node.js 版本列表', {
      code: 'ENETWORK',
      detail: index.stderr.slice(0, 500),
      hint: '请检查 NAS 是否能访问 nodejs.org',
    });
  }
  const releases = extractJson(index.stdout);
  if (!Array.isArray(releases)) {
    throw new LauncherError('Node.js 版本列表解析失败', { code: 'EPARSE' });
  }
  const target = releases.find(
    (r) => typeof r.version === 'string' && r.version.startsWith(`${NODE_SERIES}.`),
  );
  if (!target) {
    throw new LauncherError(`未找到 Node.js ${NODE_SERIES} 的可用版本`, { code: 'ENOTFOUND' });
  }

  const version = target.version;
  const file = `node-${version}-linux-${arch}.tar.xz`;
  const url = `https://nodejs.org/dist/${version}/${file}`;
  const tmpDir = await fsp.mkdtemp(path.join(paths.cacheDir, 'node-dl-'));
  const archive = path.join(tmpDir, file);

  try {
    onLog(`Downloading ${url}`);
    const dl = await run('curl', ['-fSL', '--max-time', '600', '-o', archive, url], {
      timeoutMs: 660_000,
    });
    if (dl.code !== 0) {
      throw new LauncherError('Node.js 运行时下载失败', {
        code: 'EDOWNLOAD',
        detail: dl.stderr.slice(0, 500),
      });
    }

    onLog('Extracting runtime…');
    const extract = await run('tar', ['-xJf', archive, '-C', tmpDir], { timeoutMs: 300_000 });
    if (extract.code !== 0) {
      throw new LauncherError('Node.js 运行时解压失败', {
        code: 'EEXTRACT',
        detail: extract.stderr.slice(0, 500),
      });
    }

    const extracted = path.join(tmpDir, `node-${version}-linux-${arch}`);
    if (!(await exists(path.join(extracted, 'bin', 'node')))) {
      throw new LauncherError('Node.js 运行时目录结构异常', { code: 'ELAYOUT' });
    }

    await fsp.rm(paths.nodeDir, { recursive: true, force: true });
    await fsp.mkdir(path.dirname(paths.nodeDir), { recursive: true });
    await fsp.rename(extracted, paths.nodeDir);

    // fnOS is a trimmed Debian image; the official x64 build may look for
    // libatomic at load time. Ship a copy next to the binary when absent.
    await ensureLibatomic();

    const installed = await nodeVersion();
    if (!installed) {
      throw new LauncherError('Node.js 安装后无法执行', { code: 'EEXEC' });
    }
    onLog(`Node.js runtime ready: ${installed}`);
    return { changed: true, version: installed };
  } finally {
    await fsp.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

/** Copy a system libatomic next to the runtime if one can be found. */
async function ensureLibatomic() {
  const candidates = [
    '/usr/lib/x86_64-linux-gnu/libatomic.so.1',
    '/lib/x86_64-linux-gnu/libatomic.so.1',
    '/usr/lib64/libatomic.so.1',
  ];
  const vendorDir = path.join(paths.nodeDir, 'lib');
  for (const candidate of candidates) {
    try {
      const real = await fsp.realpath(candidate);
      await fsp.copyFile(real, path.join(vendorDir, 'libatomic.so.1'));
      return true;
    } catch {
      /* try the next candidate */
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// OpenClaw package
// ---------------------------------------------------------------------------

async function installedVersion() {
  const pkg = readJsonSync(paths.openclawPkgJson, null);
  if (!pkg || !pkg.version) return null;
  if (!(await exists(paths.openclawBin))) return null;
  return pkg.version;
}

async function installedEngines() {
  const pkg = readJsonSync(paths.openclawPkgJson, null);
  return (pkg && pkg.engines) || null;
}

/**
 * Resolve which openclaw version to install.
 * "latest" walks the dist-tags/versions list and picks the newest stable
 * release whose `engines.node` the vendored runtime satisfies — this is what
 * keeps the app working when upstream raises its Node floor.
 */
async function resolveTargetVersion({ requested = 'latest', nodeVer } = {}) {
  const registry = settings.load().openclaw.registry.replace(/\/+$/, '');
  const runtime = nodeVer || (await nodeVersion());
  if (!runtime) throw new LauncherError('Node.js 运行时尚未安装', { code: 'ENORUNTIME' });

  const view = await run(
    paths.nodeBin,
    [paths.npmBin, 'view', 'openclaw', 'versions', '--json', `--registry=${registry}`],
    { timeoutMs: 120_000, env: runtimeEnv() },
  );
  if (view.code !== 0) {
    throw new LauncherError('无法查询 OpenClaw 版本列表', {
      code: 'ENETWORK',
      detail: (view.stderr || view.stdout).slice(0, 500),
    });
  }
  const all = extractJson(view.stdout);
  if (!Array.isArray(all) || all.length === 0) {
    throw new LauncherError('OpenClaw 版本列表为空', { code: 'EPARSE' });
  }

  const stable = all.filter((v) => !String(v).includes('-'));
  const pool = stable.length ? stable : all;

  if (requested && requested !== 'latest') {
    return { version: requested, resolvedFrom: 'pinned' };
  }

  const nodeSemver = runtime.replace(/^v/, '');
  // Newest first; probe engines only until one matches.
  for (let i = pool.length - 1; i >= 0; i -= 1) {
    const candidate = pool[i];
    const engines = await run(
      paths.nodeBin,
      [paths.npmBin, 'view', `openclaw@${candidate}`, 'engines.node', `--registry=${registry}`],
      { timeoutMs: 60_000, env: runtimeEnv() },
    );
    const range = (engines.stdout || '').trim();
    if (engines.code !== 0 || !range) continue;
    if (satisfiesNodeRange(nodeSemver, range)) {
      return { version: candidate, resolvedFrom: 'latest-compatible', nodeRange: range, node: nodeSemver };
    }
  }

  throw new LauncherError('找不到与当前 Node 运行时兼容的 OpenClaw 版本', {
    code: 'EINCOMPATIBLE',
    hint: `运行时可执行 node ${nodeSemver}`,
  });
}

/**
 * Minimal semver range check covering the shapes OpenClaw actually uses:
 *   ">=24.16.0 <25 || >=26.1.0", ">=22.22.3 <23 || >=24.15.0 <25"
 */
function satisfiesNodeRange(version, range) {
  const v = version.split('.').map((n) => Number.parseInt(n, 10) || 0);
  const alternatives = String(range).split('||').map((s) => s.trim());
  return alternatives.some((alt) => {
    const comparators = alt.match(/(>=|<=|>|<|=)?\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/g);
    if (!comparators) return false;
    return comparators.every((raw) => {
      const m = raw.trim().match(/^(>=|<=|>|<|=)?\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?$/);
      if (!m) return false;
      const op = m[1] || '=';
      const target = [m[2], m[3] || '0', m[4] || '0'].map((n) => Number.parseInt(n, 10));
      const cmp = compareVersions(v.join('.'), target.join('.'));
      switch (op) {
        case '>=':
          return cmp >= 0;
        case '<=':
          return cmp <= 0;
        case '>':
          return cmp > 0;
        case '<':
          return cmp < 0;
        default:
          return cmp === 0;
      }
    });
  });
}

/**
 * Install or upgrade the openclaw npm package into the app's private prefix.
 * Streams progress lines through `onLog`.
 */
async function install({ version = 'latest', onLog = () => {}, reinstall = false } = {}) {
  await provisionRuntime({ onLog });

  const current = await installedVersion();
  const target = await resolveTargetVersion({ requested: version });

  if (current && !reinstall && current === target.version) {
    onLog(`OpenClaw ${current} 已是最新，跳过安装`);
    return { changed: false, version: current, resolvedFrom: target.resolvedFrom };
  }

  onLog(
    current
      ? `Upgrading OpenClaw ${current} → ${target.version} (${target.resolvedFrom})`
      : `Installing OpenClaw ${target.version} (${target.resolvedFrom})`,
  );

  await fsp.mkdir(paths.openclawDir, { recursive: true });
  const pkgJson = path.join(paths.openclawDir, 'package.json');
  if (!(await exists(pkgJson))) {
    await fsp.writeFile(
      pkgJson,
      `${JSON.stringify(
        { name: 'openclaw-studio-prefix', version: '1.0.0', private: true },
        null,
        2,
      )}\n`,
      'utf8',
    );
  }

  const args = [
    paths.npmBin,
    'install',
    '--prefix',
    paths.openclawDir,
    '--no-audit',
    '--no-fund',
    '--loglevel',
    'http',
    `openclaw@${target.version}`,
  ];

  onLog(`$ npm install openclaw@${target.version}`);
  const res = await run(paths.nodeBin, args, {
    timeoutMs: 30 * 60_000,
    env: runtimeEnv(),
    maxBuffer: 16 * 1024 * 1024,
  });

  const output = `${res.stdout}\n${res.stderr}`.trim();
  if (output) {
    for (const line of output.split('\n').slice(-40)) onLog(line);
  }
  if (res.code !== 0) {
    throw new LauncherError('OpenClaw 安装失败', {
      code: 'EINSTALL',
      detail: output.slice(-2000),
      hint: '请检查网络或更换 npm 镜像源',
    });
  }

  const after = await installedVersion();
  if (!after) {
    throw new LauncherError('OpenClaw 安装后未找到可执行入口', { code: 'EVERIFY' });
  }
  onLog(`OpenClaw ${after} 安装完成`);
  return { changed: true, version: after, previous: current, resolvedFrom: target.resolvedFrom };
}

/** Run an openclaw CLI command with the launcher's environment. */
async function cli(args, options = {}) {
  if (!(await exists(paths.openclawBin))) {
    throw new LauncherError('OpenClaw 尚未安装', { code: 'ENOTINSTALLED' });
  }
  return run(paths.nodeBin, [paths.openclawBin, ...args], {
    env: openclawEnv(options.env),
    timeoutMs: options.timeoutMs ?? 60_000,
    cwd: options.cwd ?? paths.homeDir,
    maxBuffer: options.maxBuffer ?? 8 * 1024 * 1024,
    // Forward stdin — `config patch --stdin` reads the patch from it.
    input: options.input ?? null,
  });
}

/** Run an openclaw CLI command and parse its JSON output. */
async function cliJson(args, options = {}) {
  const res = await cli(args, options);
  const parsed = extractJson(res.stdout);
  return { ...res, json: parsed };
}

// ---------------------------------------------------------------------------
// OpenClaw configuration (openclaw.json is JSON5)
// ---------------------------------------------------------------------------

/**
 * Minimal JSON5 reader.
 *
 * `openclaw.json` is JSON5 — it may carry `//` and block comments and trailing
 * commas. Feeding that to `JSON.parse` throws, and a naive caller that treats
 * a parse failure as "empty config" would then overwrite the user's entire
 * configuration with a fresh minimal one. So we strip comments and trailing
 * commas before parsing, and we never *write* unless the existing content was
 * understood.
 */
function parseJson5(text) {
  let out = '';
  let inString = false;
  let quote = '';
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
        out += ch;
      }
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }
    if (inString) {
      out += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      out += ch === "'" ? '"' : ch;
      continue;
    }
    if (ch === '/' && next === '/') {
      inLineComment = true;
      i += 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i += 1;
      continue;
    }
    out += ch;
  }

  // Drop trailing commas before } or ].
  out = out.replace(/,(\s*[}\]])/g, '$1');

  // Unquoted keys -> quoted (single-line, conservative).
  out = out.replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1"$2"$3');

  return JSON.parse(out);
}

/**
 * Read the OpenClaw config.
 * Returns `{ config, ok, error }` — `ok:false` means the file exists but we
 * could not understand it, and callers must not rewrite it blindly.
 */
function readConfigDetailed() {
  const file = paths.openclawConfig;
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return { config: {}, ok: true, error: null, exists: false };
  }
  if (!raw.trim()) return { config: {}, ok: true, error: null, exists: true };
  try {
    return { config: parseJson5(raw), ok: true, error: null, exists: true };
  } catch (err) {
    return { config: {}, ok: false, error: err.message, exists: true };
  }
}

function readConfig() {
  return readConfigDetailed().config;
}

/**
 * Merge a patch into openclaw.json.
 *
 * Primary path is OpenClaw's own `config patch --stdin`, which validates the
 * result and refuses invalid writes. Only when the CLI is unavailable do we
 * fall back to an in-process atomic write — and even then only if the existing
 * file parsed cleanly, so a config we cannot read is never clobbered.
 */
async function patchConfig(patch, { onLog = () => {} } = {}) {
  const merged = applyPatch(readConfig(), patch);

  if (await exists(paths.openclawBin)) {
    const res = await cli(['config', 'patch', '--stdin'], {
      timeoutMs: 60_000,
      input: JSON.stringify(patch),
    });
    const output = `${res.stdout}${res.stderr}`.trim();
    if (res.code === 0) {
      if (output) onLog(output.split('\n').slice(-3).join(' '));
      // Re-read through the CLI so callers see exactly what was persisted.
      return readConfig();
    }
    // A validation failure is a real error the user must see — do not write.
    // Only a genuine validation rejection is fatal — a transport or stdin
    // problem should fall through to the direct-write path below.
    if (/config validation failed/i.test(output)) {
      throw new LauncherError('OpenClaw 配置校验未通过', {
        code: 'EVALIDATION',
        detail: output.slice(-2000),
      });
    }
    onLog(`config patch via CLI failed, falling back: ${output.slice(0, 300)}`);
  }

  const existing = readConfigDetailed();
  if (!existing.ok) {
    throw new LauncherError('现有 OpenClaw 配置无法解析，已放弃写入以避免覆盖', {
      code: 'EPARSE',
      detail: existing.error,
      hint: `请手工检查 ${paths.openclawConfig}`,
    });
  }

  const { writeJsonAtomic } = require('./util');
  await writeJsonAtomic(paths.openclawConfig, merged);
  return merged;
}

function applyPatch(target, patch) {
  const out = { ...target };
  for (const [key, value] of Object.entries(patch || {})) {
    if (value === null) {
      delete out[key];
      continue;
    }
    if (
      value && typeof value === 'object' && !Array.isArray(value) &&
      out[key] && typeof out[key] === 'object' && !Array.isArray(out[key])
    ) {
      out[key] = applyPatch(out[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Write the settings OpenClaw needs to run as a managed gateway, and that make
 * the "open it and it just works" flow possible:
 *
 *   gateway.mode              local, otherwise the gateway refuses to start
 *   gateway.bind/port         LAN reachable on a stable port
 *   gateway.auth              shared token so the Control UI can attach
 *   controlUi.allowedOrigins  every origin the user might browse from
 *   nodes.pairing             auto-approve trusted local pairing
 *   ssrfPolicy                trust the fake-IP ranges Clash-style DNS uses
 *
 * NOTE: `gateway.controlUi.dangerouslyDisableDeviceAuth` is deliberately NOT
 * set — OpenClaw retired and ignores it, and writing it only produces a
 * "run doctor --fix to remove the legacy key" warning.
 */
async function applyManagedConfig(
  { port, bind, authMode, token, tls, allowFakeIp },
  { onLog = () => {} } = {},
) {
  const origins = buildAllowedOrigins(port, bind);

  const patch = {
    gateway: {
      mode: 'local',
      bind,
      port,
      auth: authMode === 'none' ? { mode: 'none' } : { mode: 'token', token },
      controlUi: {
        allowedOrigins: origins,
        // Serve the Control UI under /control so the launcher can reverse-proxy
        // it 1:1 without rewriting asset URLs. Requests then reach the gateway
        // from loopback, which is what makes device pairing silent.
        basePath: CONTROL_UI_BASE_PATH,
      },
      nodes: { pairing: { autoApproveLocal: true } },
      ...(tls && tls.enabled
        ? { tls: { enabled: true, autoGenerate: tls.autoGenerate !== false } }
        : {}),
    },
  };

  if (allowFakeIp) {
    // 198.18.0.0/15 (RFC 2544 benchmarking space) is what Clash / sing-box
    // fake-IP DNS hands out, and OpenClaw's SSRF guard rejects it by default.
    const policy = {
      allowRfc2544BenchmarkRange: true,
      allowIpv6UniqueLocalRange: true,
      // Icon CDNs the Control UI loads provider logos from. Enumerated
      // explicitly rather than opening up private networks generally.
      allowedHostnames: ICON_HOST_ALLOWLIST,
    };
    patch.tools = { web: { fetch: { ssrfPolicy: policy } } };
    patch.browser = { ssrfPolicy: policy };

    // Declaring the catalog URL explicitly switches OpenClaw's catalog fetch to
    // its "configured origin" guard, which allows that exact origin. Without
    // it the fetch goes through the default guard and is refused whenever DNS
    // answers with a fake-IP / private address.
    patch.models = { catalogRefresh: { url: DEFAULT_CATALOG_URL } };
  }

  return patchConfig(patch, { onLog });
}

/** Build the Origin allowlist the Control UI needs for non-loopback access. */
function buildAllowedOrigins(port, bind) {
  const origins = new Set([
    `http://localhost:${port}`,
    `http://127.0.0.1:${port}`,
    `https://localhost:${port}`,
    `https://127.0.0.1:${port}`,
  ]);

  const interfaces = os.networkInterfaces();
  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family !== 'IPv4' || entry.internal) continue;
      origins.add(`http://${entry.address}:${port}`);
      origins.add(`https://${entry.address}:${port}`);
    }
  }

  // fnOS usually exposes the NAS by hostname as well.
  try {
    const host = os.hostname();
    if (host && host !== 'localhost') {
      origins.add(`http://${host}:${port}`);
      origins.add(`https://${host}:${port}`);
      origins.add(`http://${host}.local:${port}`);
      origins.add(`https://${host}.local:${port}`);
    }
  } catch {
    /* ignore */
  }

  if (bind === 'auto') origins.add('*');
  return [...origins];
}

/** Host addresses the UI can offer as "open" links. */
function hostAddresses() {
  const out = [];
  const interfaces = os.networkInterfaces();
  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family === 'IPv4' && !entry.internal) out.push(entry.address);
    }
  }
  return out;
}

module.exports = {
  LauncherError,
  NODE_MIN,
  compareVersions,
  satisfiesNodeRange,
  runtimeEnv,
  openclawEnv,
  nodeVersion,
  provisionRuntime,
  installedVersion,
  installedEngines,
  resolveTargetVersion,
  install,
  cli,
  cliJson,
  parseJson5,
  readConfig,
  readConfigDetailed,
  patchConfig,
  applyPatch,
  applyManagedConfig,
  buildAllowedOrigins,
  hostAddresses,
};
