'use strict';

/**
 * OpenClaw Studio — launcher backend.
 *
 * Serves the management UI (over fnOS's unix-socket gateway and/or a TCP port)
 * and exposes the JSON API the UI drives.
 */

const http = require('node:http');
const fsp = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');

const paths = require('./lib/paths');
const settings = require('./lib/settings');
const openclaw = require('./lib/openclaw');
const gateway = require('./lib/gateway');
const pairing = require('./lib/pairing');
const tasks = require('./lib/tasks');
const api = require('./lib/api');
const proxy = require('./lib/proxy');
const { appendLog, tailFile, extractJson } = require('./lib/util');

/**
 * Package version. fnOS exports TRIM_APPVER to the app's processes; the
 * manifest itself lives outside the app payload, so fall back to a read of
 * the deployed tree only when that is unavailable.
 */
const VERSION = (() => {
  // version.json is stamped into the payload at build time and is the most
  // reliable source; TRIM_APPVER is fnOS's own and is used as a fallback.
  // index.js sits in <app>/server/, so the payload root is one level up.
  // (lib/*.js is one deeper, hence both candidates.)
  for (const candidate of [
    path.join(__dirname, '..', 'version.json'),
    path.join(__dirname, '..', '..', 'version.json'),
    path.join(__dirname, '..', '..', 'manifest'),
    path.join(__dirname, '..', '..', '..', 'manifest'),
  ]) {
    try {
      const raw = require('node:fs').readFileSync(candidate, 'utf8');
      const fromJson = raw.trim().startsWith('{') ? JSON.parse(raw).version : null;
      if (fromJson) return fromJson;
      const m = raw.match(/^version\s*=\s*(.+)$/m);
      if (m) return m[1].trim();
    } catch {
      /* try the next candidate */
    }
  }
  const fromEnv = (process.env.TRIM_APPVER || '').trim();
  return fromEnv || 'unknown';
})();
const START_TS = Date.now();

/** Listeners actually bound, readable by route handlers. */
const activeListeners = [];

// ---------------------------------------------------------------------------
// Static assets
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

async function serveStatic(req, res, urlPath) {
  const uiDir = paths.uiDir;
  const rel = urlPath === '/' ? '/index.html' : urlPath;
  const normalised = path.normalize(rel).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(uiDir, normalised);

  // Never escape the UI directory.
  if (!filePath.startsWith(uiDir)) {
    send(res, 403, { error: 'forbidden' });
    return;
  }

  let stat = await fsp.stat(filePath).catch(() => null);
  if (stat && stat.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
    stat = await fsp.stat(filePath).catch(() => null);
  }
  if (!stat) {
    // SPA fallback so client-side routes deep-link correctly.
    filePath = path.join(uiDir, 'index.html');
    stat = await fsp.stat(filePath).catch(() => null);
    if (!stat) {
      send(res, 404, { error: 'not found' });
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const etag = `W/"${stat.size}-${Number(stat.mtimeMs).toString(36)}"`;
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, { ETag: etag, 'Cache-Control': 'no-cache' });
    res.end();
    return;
  }

  // `no-cache` means "revalidate before use", not "don't cache": unchanged
  // files still answer 304 cheaply, but an upgrade is picked up immediately.
  // A long max-age here once left browsers running the previous app.js against
  // the new API, which rendered an empty provider grid.
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    ETag: etag,
    'Cache-Control': 'no-cache',
  };

  // Stamp the shell's asset URLs with the package version so a new build can
  // never be served alongside a cached script.
  if (ext === '.html') {
    let html = await fsp.readFile(filePath, 'utf8');
    html = html
      .replace(/(href="style\.css)(\?[^"]*)?(")/g, `$1?v=${VERSION}$3`)
      .replace(/(src="app\.js)(\?[^"]*)?(")/g, `$1?v=${VERSION}$3`);
    const buf = Buffer.from(html, 'utf8');
    headers['Content-Length'] = buf.length;
    res.writeHead(200, headers);
    res.end(buf);
    return;
  }

  headers['Content-Length'] = stat.size;
  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function send(res, status, body, headers = {}) {
  const payload = typeof body === 'string' ? body : `${JSON.stringify(body)}\n`;
  res.writeHead(status, {
    'Content-Type': typeof body === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(payload);
}

function ok(res, data) {
  send(res, 200, { ok: true, data });
}

function fail(res, err) {
  const status = err && err.code === 'EBADREQUEST' ? 400
    : err && err.code === 'ENOTFOUND' ? 404
    : err && (err.code === 'EBUSY' || err.code === 'EPROTECTED') ? 409
    : err && err.code === 'ENOTINSTALLED' ? 412
    : 500;
  send(res, status, {
    ok: false,
    error: {
      message: err && err.message ? err.message : String(err),
      code: err && err.code ? err.code : 'EUNKNOWN',
      detail: err && err.detail ? String(err.detail).slice(0, 4000) : null,
      hint: err && err.hint ? err.hint : null,
    },
  });
}

async function readBody(req, limit = 2 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('请求体不是合法 JSON'));
      }
    });
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

const routes = {
  'GET /api/health': async () => ({
    status: 'ok',
    version: VERSION,
    uptimeSec: Math.round((Date.now() - START_TS) / 1000),
    pid: process.pid,
  }),

  'GET /api/status': () => api.fullStatus(),
  'GET /api/system': () => api.systemInfo(),

  'GET /api/settings': () => ({ settings: settings.load() }),

  /**
   * Read-only view of openclaw.json, used by the diagnostics viewer.
   *
   * There is deliberately no write route: the launcher does not configure
   * models or providers, so it cannot drift from or overwrite the official
   * configuration. Network settings the app must manage (gateway bind/port,
   * auth, Control UI origins) are applied through applyManagedConfig, which
   * goes through OpenClaw's own validating patch writer.
   */
  'GET /api/openclaw/config': () => api.getOpenClawConfig(),
  'POST /api/settings': async (req) => api.updateSettings(await readBody(req)),

  'POST /api/install': async (req) => {
    const body = await readBody(req);
    const task = api.startInstall({
      version: body.version || 'latest',
      reinstall: Boolean(body.reinstall),
      runtimeOnly: Boolean(body.runtimeOnly),
    });
    return { taskId: task.id, task: tasks.get(task.id) };
  },
  'GET /api/tasks': () => ({ tasks: tasks.list() }),

  'POST /api/gateway/start': () => api.gatewayAction('start'),
  'POST /api/gateway/stop': () => api.gatewayAction('stop'),
  'POST /api/gateway/restart': () => api.gatewayAction('restart'),
  'GET /api/gateway/logs': async (req, _res, url) => {
    const lines = Number.parseInt(url.searchParams.get('lines') || '300', 10);
    return { lines: await gateway.logs(Number.isFinite(lines) ? lines : 300) };
  },
  'GET /api/gateway/probe': async () => {
    const cfg = settings.load();
    return { probe: await gateway.probe(cfg), url: gateway.gatewayUrl(cfg), controlUrl: gateway.controlUrl(cfg) };
  },

  /**
   * Where to send the user to reach the Control UI.
   *
   * `proxiedUrl` is relative to the launcher, so it works both standalone and
   * behind the fnOS portal. Requests through it arrive at the gateway over
   * loopback, which is what makes device registration automatic.
   */
  'GET /api/gateway/control-link': async (req) => {
    const cfg = settings.load();
    const token = cfg.gateway.authMode === 'token' ? cfg.gateway.token : '';
    const fragment = token ? `#token=${encodeURIComponent(token)}` : '';

    // Absolute URL for opening in a new tab.
    //
    // The host is pinned to a canonical address (configurable, else the first
    // LAN IP) rather than whatever Host the browser sent. A browser stores the
    // Control UI's device identity per origin, so a varying host — IP one day,
    // hostname the next — would register a brand new device each time.
    const configuredHost = String(cfg.launcher?.publicHost || '').trim();
    const hostname =
      configuredHost ||
      openclaw.hostAddresses()[0] ||
      String(req.headers.host || '').split(':')[0] ||
      '127.0.0.1';
    const webPort = cfg.launcher?.webPort;
    const tcpAvailable = activeListeners.some((s) => s.type === 'tcp');
    const absoluteUrl = webPort && tcpAvailable
      ? `http://${hostname}:${webPort}/control/${fragment}`
      : null;

    return {
      proxiedUrl: `${gateway.localControlPath()}${fragment}`,
      proxiedPath: gateway.localControlPath(),
      directUrl: `${gateway.controlUrl(cfg)}${fragment}`,
      absoluteUrl,
      webPort: tcpAvailable ? webPort : null,
      tokenIncluded: Boolean(token),
      note: '该地址指向启动器自身端口，浏览器经本机回环访问网关，设备会自动完成注册；直接访问网关端口（18789）从局域网进入则需要在 OpenClaw 控制台内手动批准。',
    };
  },

  /** Mint a one-time owner bootstrap link (bypasses approval entirely). */
  'POST /api/gateway/bootstrap-link': async () => {
    const res = await openclaw.cliJson(['dashboard', '--no-open', '--json'], { timeoutMs: 45_000 });
    if (res.code !== 0 || !res.json) {
      throw new openclaw.LauncherError('无法生成控制台直连链接', {
        code: 'EDASHBOARD',
        detail: `${res.stderr || res.stdout}`.slice(0, 500),
      });
    }
    return res.json;
  },
  'GET /api/gateway/port': async (_req, _res, url) => api.portCheck(url.searchParams.get('port')),

  'GET /api/devices': () => pairing.overview(),
  'POST /api/devices/approve': async (req) => {
    const body = await readBody(req);
    if (!body.requestId) {
      throw new openclaw.LauncherError('缺少 requestId', { code: 'EBADREQUEST' });
    }
    const res = await pairing.approveRequest(body.requestId, {
      source: 'manual-ui',
      role: body.role || null,
      label: body.label || null,
    });
    if (!res.ok) throw new openclaw.LauncherError('批准失败', { code: 'EAPPROVE', detail: res.detail });
    return res;
  },
  'POST /api/devices/reject': async (req) => {
    const body = await readBody(req);
    if (!body.requestId) {
      throw new openclaw.LauncherError('缺少 requestId', { code: 'EBADREQUEST' });
    }
    const res = await pairing.rejectRequest(body.requestId, { source: 'manual-ui', reason: body.reason });
    if (!res.ok) throw new openclaw.LauncherError('拒绝失败', { code: 'EREJECT', detail: res.detail });
    return res;
  },
  'POST /api/devices/remove': async (req) => {
    const body = await readBody(req);
    if (!body.deviceId) throw new openclaw.LauncherError('缺少 deviceId', { code: 'EBADREQUEST' });
    const res = await pairing.removePaired(body.deviceId);
    if (!res.ok) throw new openclaw.LauncherError('移除失败', { code: 'EREMOVE', detail: res.detail });
    return res;
  },
  /** Force an immediate pairing sweep — used by the UI's "立即扫描" button. */
  'POST /api/devices/scan': () => pairing.pollOnce(),
  /**
   * Collapse duplicate registrations. `dryRun` (the default) only reports what
   * would be removed, so the UI can show a count before acting.
   */
  'POST /api/devices/prune': async (req) => {
    const body = await readBody(req).catch(() => ({}));
    return pairing.pruneDuplicates({ dryRun: body.dryRun !== false });
  },

  /** Approve every currently pending request regardless of role allowlist. */
  'POST /api/devices/approve-all': async () => {
    const list = await pairing.fetchDevices();
    if (!list.ok) {
      throw new openclaw.LauncherError('无法读取配对队列', { code: 'EGATEWAY', detail: list.detail });
    }
    const results = [];
    for (const request of list.pending) {
      const requestId = request.requestId || request.id;
      if (!requestId) continue;
      results.push({
        requestId,
        ...(await pairing.approveRequest(requestId, { source: 'manual-ui-bulk', role: request.role })),
      });
    }
    return { approved: results.filter((r) => r.ok).length, results };
  },

  'GET /api/pairing/log': async (_req, _res, url) => {
    const lines = Number.parseInt(url.searchParams.get('lines') || '200', 10);
    return { lines: await tailFile(paths.pairingLog, Number.isFinite(lines) ? lines : 200) };
  },

  'GET /api/logs': async (_req, _res, url) => {
    const lines = Number.parseInt(url.searchParams.get('lines') || '200', 10);
    const which = url.searchParams.get('file') || 'gateway';
    const map = {
      gateway: paths.gatewayLog,
      install: paths.installLog,
      pairing: paths.pairingLog,
    };
    const file = map[which];
    if (!file) throw new openclaw.LauncherError(`未知日志：${which}`, { code: 'EBADREQUEST' });
    return { file, lines: await tailFile(file, Number.isFinite(lines) ? lines : 200) };
  },

  'POST /api/openclaw/discover-models': async (req) => {
    const body = await readBody(req);
    const baseUrl = String(body.baseUrl || '').replace(/\/+$/, '');
    const apiKey = body.apiKey ? String(body.apiKey) : '';
    if (!/^https?:\/\//i.test(baseUrl)) {
      throw new openclaw.LauncherError('请填写有效的 Base URL', { code: 'EBADREQUEST' });
    }
    const url = `${baseUrl}/models`;
    const args = ['-sS', '--max-time', '20', url];
    if (apiKey) args.push('-H', `Authorization: Bearer ${apiKey}`);
    const { run } = require('./lib/util');
    const res = await run('curl', args, { timeoutMs: 25_000, maxBuffer: 4 * 1024 * 1024 });
    if (res.code !== 0) {
      throw new openclaw.LauncherError('无法访问该服务', { code: 'ENETWORK', detail: res.stderr.slice(0, 500) });
    }
    const json = extractJson(res.stdout);
    const models = Array.isArray(json?.data) ? json.data.map((m) => m.id).filter(Boolean)
      : Array.isArray(json?.models) ? json.models.map((m) => m.name || m.id).filter(Boolean)
      : [];
    return { models: models.slice(0, 500), raw: models.length ? null : res.stdout.slice(0, 800) };
  },
};

// ---------------------------------------------------------------------------
// SSE event stream
// ---------------------------------------------------------------------------

const sseClients = new Set();

function sseHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.write(`event: hello\ndata: ${JSON.stringify({ version: VERSION, at: Date.now() })}\n\n`);

  const client = { res, timer: null };
  client.timer = setInterval(() => {
    try {
      res.write(': ping\n\n');
    } catch {
      /* cleaned up on close */
    }
  }, 20_000);

  sseClients.add(client);
  req.on('close', () => {
    clearInterval(client.timer);
    sseClients.delete(client);
  });
}

function broadcast(event, data) {
  const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.res.write(frame);
    } catch {
      /* dropped below */
    }
  }
}

// Forward pairing engine events to browsers.
pairing.onEvent((event) => broadcast('pairing', event));

// ---------------------------------------------------------------------------
// Main request handler
// ---------------------------------------------------------------------------

/**
 * Remove the fnOS portal's mount prefix from a request path.
 *
 * The portal forwards the *full* path to the app socket — a request for
 * `/app/openclaw-studio/style.css` arrives here unchanged. Failing to strip it
 * makes every asset miss and fall through to the SPA fallback, which is what
 * produced a blank window in the desktop embed.
 *
 * `OPENCLAW_STUDIO_PREFIX` is honoured when set (cmd/main exports it); the
 * `/app/<name>` form is also recognised on its own so the app works no matter
 * how it is launched.
 */
function stripPortalPrefix(pathname) {
  const envPrefix = (process.env.OPENCLAW_STUDIO_PREFIX || '').replace(/\/+$/, '');
  if (envPrefix && (pathname === envPrefix || pathname.startsWith(`${envPrefix}/`))) {
    return pathname.slice(envPrefix.length) || '/';
  }
  const match = pathname.match(/^\/app\/[^/]+(\/.*)?$/);
  if (match) return match[1] || '/';
  return pathname;
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const urlPath = decodeURIComponent(url.pathname);

  // The fnOS desktop embeds the app at `/app/<name>` with no trailing slash.
  // Relative asset URLs would then resolve against `/app/` and 404, and a
  // client-side <base> fix cannot help because the browser's preload scanner
  // has already fetched the stylesheet/script by the time inline script runs.
  // Redirecting to the canonical trailing-slash form solves it properly.
  if ((req.method === 'GET' || req.method === 'HEAD') && /^\/app\/[^/]+$/.test(urlPath)) {
    res.writeHead(302, { Location: `${urlPath}/`, 'Cache-Control': 'no-store' });
    res.end();
    return;
  }

  const routePath = stripPortalPrefix(urlPath);

  if (routePath === '/api/events') {
    sseHandler(req, res);
    return;
  }

  const key = `${req.method} ${routePath}`;
  const handler = routes[key];

  if (handler) {
    try {
      const data = await handler(req, res, url);
      if (!res.writableEnded) ok(res, data);
    } catch (err) {
      if (!res.writableEnded) fail(res, err);
    }
    return;
  }

  if (routePath.startsWith('/api/')) {
    send(res, 404, { ok: false, error: { message: `未知接口 ${key}`, code: 'ENOROUTE' } });
    return;
  }

  // The OpenClaw Control UI is proxied through the launcher so the gateway
  // sees a loopback connection and auto-registers the browser silently.
  if (proxy.shouldProxy(routePath)) {
    // Provider/model logos are served by the launcher: OpenClaw's internal
    // icon fetch uses a strict SSRF guard that false-positives under fake-IP
    // DNS, and exposes no configuration to relax it.
    if (proxy.serveCatalogIcon(req, res, routePath)) return;

    const cfg = settings.load();
    if (!gateway.currentPid()) {
      send(res, 503, {
        ok: false,
        error: { message: 'OpenClaw 网关未运行，请先在控制台启动服务', code: 'EGATEWAYDOWN' },
      });
      return;
    }
    proxy.proxyHttp(req, res, {
      port: cfg.gateway.port,
      onError: (err) => process.stderr.write(`[launcher] proxy error: ${err.message}\n`),
    });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, { ok: false, error: { message: 'method not allowed', code: 'EMETHOD' } });
    return;
  }

  await serveStatic(req, res, routePath);
}

// ---------------------------------------------------------------------------
// Listeners
// ---------------------------------------------------------------------------

/**
 * Prepare a unix socket path for listening, refusing to clobber anything that
 * is not clearly ours.
 *
 * A stale socket file left behind by a crashed process is fine to replace.
 * A *live* socket, or any non-socket file, means someone else owns that path —
 * deleting it would break another application, so we refuse instead.
 */
async function prepareSocketPath(socketPath) {
  const allowedRoots = [paths.appDest, paths.dataDir].filter(Boolean);

  // Never operate outside the app's own directories (e.g. a leaked
  // TRIM_APPDEST pointing at a different fnOS package).
  const inOwnDir = allowedRoots.some(
    (root) => socketPath === root || socketPath.startsWith(`${root}${path.sep}`),
  );
  if (!inOwnDir) {
    throw new Error(`拒绝使用应用目录之外的套接字路径：${socketPath}`);
  }

  const stat = await fsp.lstat(socketPath).catch(() => null);
  if (!stat) return;
  if (!stat.isSocket()) {
    throw new Error(`套接字路径已被占用（非套接字文件）：${socketPath}`);
  }

  // Detect a live listener by attempting a connection.
  const live = await new Promise((resolve) => {
    const probe = net.connect(socketPath);
    const done = (value) => {
      probe.destroy();
      resolve(value);
    };
    probe.setTimeout(1200);
    probe.once('connect', () => done(true));
    probe.once('timeout', () => done(false));
    probe.once('error', () => done(false));
  });

  if (live) {
    throw new Error(`套接字已被其他进程占用：${socketPath}`);
  }

  await fsp.rm(socketPath, { force: true });
}

async function listenUnix(server, socketPath) {
  await prepareSocketPath(socketPath);
  await fsp.mkdir(path.dirname(socketPath), { recursive: true });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(socketPath, () => {
      server.removeListener('error', reject);
      // fnOS's portal process must be able to reach the socket.
      fsp.chmod(socketPath, 0o666).catch(() => {});
      resolve(socketPath);
    });
  });
}

/** Build one HTTP server; a separate instance per listening address. */
function buildServer() {
  const server = http.createServer((req, res) => {
    handle(req, res).catch((err) => {
      if (!res.writableEnded) fail(res, err);
    });
  });
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 70_000;

  // WebSocket upgrades for the proxied Control UI. The gateway may see the
  // request either with or without the portal prefix, so normalise both.
  server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const routePath = stripPortalPrefix(decodeURIComponent(url.pathname));

    if (!proxy.shouldProxy(routePath)) {
      socket.destroy();
      return;
    }

    const cfg = settings.load();
    if (!gateway.currentPid()) {
      socket.destroy();
      return;
    }

    proxy.proxyUpgrade(req, socket, head, {
      port: cfg.gateway.port,
      onError: (err) => process.stderr.write(`[launcher] proxy upgrade error: ${err.message}\n`),
    });
  });

  return server;
}

async function main() {
  paths.ensure();
  const cfg = await settings.ensureFile();

  const server = http.createServer((req, res) => {
    handle(req, res).catch((err) => {
      if (!res.writableEnded) fail(res, err);
    });
  });

  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 70_000;

  const listeners = activeListeners;
  const servers = [];

  // Primary: fnOS portal unix socket.
  const socketPath = process.env.MONITOR_SOCKET_PATH || paths.appSocket;
  const unixServer = buildServer();
  try {
    await listenUnix(unixServer, socketPath);
    servers.push(unixServer);
    listeners.push({ type: 'unix', path: socketPath });
    process.stdout.write(`[launcher] listening on unix socket ${socketPath}\n`);
  } catch (err) {
    process.stdout.write(`[launcher] unix socket unavailable: ${err.message}\n`);
    unixServer.close();
  }

  // TCP listener for the launcher web console. The proxied Control UI uses
  // root-absolute asset paths, so it needs an origin where it sits at `/`.
  const envPort = Number.parseInt(process.env.MONITOR_HTTP_PORT || '0', 10);
  const httpPort = envPort > 0 ? envPort : (cfg.launcher?.enabled === false ? 0 : cfg.launcher?.webPort);
  if (httpPort > 0) {
    const tcpServer = buildServer();
    try {
      await new Promise((resolve, reject) => {
        tcpServer.once('error', reject);
        tcpServer.listen(httpPort, '0.0.0.0', () => {
          tcpServer.removeListener('error', reject);
          resolve();
        });
      });
      servers.push(tcpServer);
      listeners.push({ type: 'tcp', port: httpPort });
      process.stdout.write(`[launcher] listening on tcp ${httpPort}\n`);
    } catch (err) {
      tcpServer.close();
      process.stdout.write(`[launcher] tcp ${httpPort} unavailable: ${err.message}\n`);
    }
  }

  if (servers.length === 0) {
    throw new Error('没有任何可用的监听地址，启动终止');
  }

  // Record our own pid so cmd/main can supervise this process.
  await fsp.mkdir(path.dirname(paths.launcherPidFile), { recursive: true }).catch(() => {});
  await fsp.writeFile(paths.launcherPidFile, String(process.pid), 'utf8').catch(() => {});

  await appendLog(paths.gatewayLog, `launcher started pid=${process.pid} version=${VERSION}`);

  // Boot the auto-registration engine.
  if (cfg.pairing.autoApprove) {
    pairing.startLoop();
    process.stdout.write('[launcher] auto-registration engine started\n');
  }

  // First-run provisioning: fetch the runtime and install OpenClaw so the app
  // is ready without the user having to trigger it, then bring the gateway up.
  (async () => {
    const st = await gateway.status().catch(() => null);
    if (!st) return;

    if (!st.installed && cfg.openclaw.autoInstall) {
      if (tasks.runningOfKind('install')) return;
      process.stdout.write('[launcher] OpenClaw not installed - starting automatic install\n');
      api.startInstall({ version: cfg.openclaw.version, reinstall: false });
      return;
    }

    if (st.installed && st.running) {
      // The gateway may have been started by a previous build of this app —
      // make sure it is running with the settings this version manages.
      try {
        await openclaw.applyManagedConfig({
          port: cfg.gateway.port,
          bind: cfg.gateway.bind,
          authMode: cfg.gateway.authMode,
          token: cfg.gateway.token,
          tls: cfg.gateway.tls,
          allowFakeIp: cfg.network.allowFakeIp,
        });
        process.stdout.write('[launcher] managed config re-applied to running gateway\n');
      } catch (err) {
        process.stdout.write(`[launcher] config re-apply skipped: ${err.message}\n`);
      }
      return;
    }

    if (st.installed && !st.running && cfg.gateway.autoStart && !(await gateway.userStopped())) {
      process.stdout.write('[launcher] auto-starting gateway\n');
      await gateway.start({ onLog: (l) => process.stdout.write(`[gateway] ${l}\n`) }).catch((err) => {
        process.stdout.write(`[launcher] gateway auto-start failed: ${err.message}\n`);
        appendLog(paths.gatewayLog, `auto-start failed: ${err.message}`);
      });
    }
  })().catch((err) => {
    process.stdout.write(`[launcher] startup sequence failed: ${err.message}\n`);
  });

  // If an install is still running, start the gateway once it succeeds.
  setInterval(async () => {
    if (tasks.runningOfKind('install')) return;
    const st = await gateway.status().catch(() => null);
    if (st && st.installed && !st.running && settings.load().gateway.autoStart && !(await gateway.userStopped())) {
      process.stdout.write('[launcher] gateway not running after install - starting\n');
      await gateway.start({ onLog: (l) => process.stdout.write(`[gateway] ${l}\n`) }).catch(() => {});
    }
  }, 20_000).unref();

  const shutdown = async (signal) => {
    process.stdout.write(`[launcher] received ${signal}, shutting down\n`);
    pairing.stopLoop();
    for (const client of sseClients) {
      try {
        client.res.end();
      } catch {
        /* ignore */
      }
      clearInterval(client.timer);
    }
    sseClients.clear();
    let pending = servers.length;
    if (pending === 0) process.exit(0);
    for (const srv of servers) {
      srv.close(() => {
        pending -= 1;
        if (pending === 0) process.exit(0);
      });
    }
    setTimeout(() => process.exit(0), 5000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  await new Promise(() => {});
}

if (require.main === module) {
  main().catch((err) => {
    process.stderr.write(`[launcher] fatal: ${err && err.stack ? err.stack : err}\n`);
    process.exit(1);
  });
}

module.exports = { main, broadcast, routes };
