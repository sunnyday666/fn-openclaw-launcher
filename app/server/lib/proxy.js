'use strict';

/**
 * Loopback reverse proxy for the OpenClaw Control UI.
 *
 * Why this exists
 * ---------------
 * OpenClaw only silently auto-approves device pairing for *trusted local*
 * connections. A browser hitting `http://<nas-ip>:18789/` is remote, so it
 * lands behind a manual approval wall — the single biggest piece of friction
 * in running OpenClaw on a NAS.
 *
 * By serving the Control UI through the launcher instead, the gateway sees a
 * connection from 127.0.0.1 and registers the browser automatically and
 * persistently. The user just clicks "打开 OpenClaw" and is in.
 *
 * The proxy is a straight 1:1 path mapping against the gateway's
 * `gateway.controlUi.basePath`, so no HTML/asset rewriting is needed.
 */

const http = require('node:http');
const net = require('node:net');

/** Paths forwarded to the gateway. Everything else belongs to the launcher. */
const PROXY_PREFIXES = ['/control', '/__openclaw__'];

function shouldProxy(urlPath) {
  return PROXY_PREFIXES.some(
    (prefix) => urlPath === prefix || urlPath.startsWith(`${prefix}/`) || urlPath.startsWith(`${prefix}?`),
  );
}

/** Hop-by-hop headers must not be forwarded (RFC 7230 §6.1). */
const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

function filterHeaders(headers) {
  const out = {};
  for (const [key, value] of Object.entries(headers)) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) out[key] = value;
  }
  return out;
}

/**
 * Proxy a normal HTTP request to the gateway.
 * Returns true when the request was handled here.
 *
 * The launcher deliberately does NOT add `x-forwarded-*` headers. OpenClaw
 * treats a request carrying proxy-shaped forwarding headers as needing
 * `gateway.trustedProxies` attribution and rejects it otherwise, and if we did
 * declare ourselves a trusted proxy the gateway would resolve the *browser's*
 * LAN address and require manual device approval — defeating the purpose.
 *
 * The launcher is a genuine local access point: it serves the Control UI to
 * the user itself, and the browser still has to present the gateway token.
 * Requests therefore legitimately originate on loopback, which is exactly what
 * OpenClaw's `gateway.nodes.pairing.autoApproveLocal` is designed to trust.
 */
function proxyHttp(req, res, { port, host = '127.0.0.1', onError }) {
  const options = {
    host,
    port,
    method: req.method,
    path: req.url,
    headers: filterHeaders(req.headers),
  };

  const upstream = http.request(options, (upstreamRes) => {
    const headers = filterHeaders(upstreamRes.headers);
    // The UI is served from the same origin as the launcher; keep it uncached
    // so a gateway upgrade is picked up immediately.
    if (String(headers['content-type'] || '').includes('text/html')) {
      headers['cache-control'] = 'no-cache';
    }
    res.writeHead(upstreamRes.statusCode || 502, headers);
    upstreamRes.pipe(res);
  });

  upstream.on('error', (err) => {
    if (onError) onError(err);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    }
    res.end(
      JSON.stringify({
        error: 'gateway-unreachable',
        message: '无法连接到 OpenClaw 网关，请确认服务已启动',
        detail: err.message,
      }),
    );
  });

  req.pipe(upstream);
  return true;
}

/**
 * Proxy a WebSocket upgrade. The Control UI drives everything over a socket,
 * so this is not optional — without it the UI loads but never connects.
 */
function proxyUpgrade(req, socket, head, { port, host = '127.0.0.1', onError }) {
  const upstream = net.connect(port, host, () => {
    const headerLines = [`${req.method} ${req.url} HTTP/1.1`];
    for (const [key, value] of Object.entries(req.headers)) {
      // Preserve Upgrade/Connection: they are the point of this request.
      // Forwarded-* headers are dropped for the same reason as in proxyHttp.
      if (/^x-forwarded-/i.test(key)) continue;
      headerLines.push(`${key}: ${value}`);
    }
    headerLines.push('', '');
    upstream.write(headerLines.join('\r\n'));
    if (head && head.length) upstream.write(head);
    upstream.pipe(socket);
    socket.pipe(upstream);
  });

  const cleanup = () => {
    upstream.destroy();
    socket.destroy();
  };

  upstream.on('error', (err) => {
    if (onError) onError(err);
    cleanup();
  });
  socket.on('error', cleanup);
  socket.on('close', () => upstream.destroy());
  upstream.on('close', () => socket.destroy());
}

// ---------------------------------------------------------------------------
// Catalog icons
// ---------------------------------------------------------------------------

/**
 * OpenClaw proxies provider/model logos for the Control UI through
 * `/__openclaw__/catalog-icon/<urlencoded>`. That internal fetch passes no
 * SSRF policy, so it always uses the strict default guard — which rejects any
 * host that DNS resolves into a private/special-use range.
 *
 * Behind Clash / sing-box style fake-IP DNS every hostname resolves into
 * 198.18.0.0/15, so those logo requests fail as false positives and the
 * Control UI logs a 404 for each one. There is no configuration surface for
 * that guard, so the launcher satisfies the request instead: it fetches the
 * icon itself, but only from an explicit allowlist of icon CDNs.
 */

/** Icon CDNs the Control UI legitimately loads logos from. */
const ICON_HOSTS = new Set([
  'cdn.simpleicons.org',
  'cdn.jsdelivr.net',
  'raw.githubusercontent.com',
  'api.iconify.design',
  'unpkg.com',
]);

const ICON_ROUTE = '__openclaw__/catalog-icon/';
const ICON_MAX_BYTES = 512 * 1024;
const ICON_CACHE_MAX = 64;
const iconCache = new Map();

/** Extract and validate the target URL from a catalog-icon request path. */
function parseIconTarget(urlPath) {
  const idx = urlPath.indexOf(ICON_ROUTE);
  if (idx === -1) return null;

  let raw = urlPath.slice(idx + ICON_ROUTE.length);
  const q = raw.indexOf('?');
  if (q !== -1) raw = raw.slice(0, q);
  if (!raw) return null;

  let target;
  try {
    target = decodeURIComponent(raw);
  } catch {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  if (!ICON_HOSTS.has(parsed.hostname.toLowerCase())) return null;
  return parsed;
}

function rememberIcon(key, value) {
  if (iconCache.size >= ICON_CACHE_MAX) {
    iconCache.delete(iconCache.keys().next().value);
  }
  iconCache.set(key, value);
}

/** Serve a catalog icon directly. Returns true when it handled the request. */
function serveCatalogIcon(req, res, urlPath) {
  const target = parseIconTarget(urlPath);
  if (!target) return false;

  const key = target.href;
  const cached = iconCache.get(key);
  if (cached) {
    res.writeHead(200, {
      'Content-Type': cached.type,
      'Content-Length': cached.body.length,
      'Cache-Control': 'public, max-age=86400',
    });
    res.end(cached.body);
    return true;
  }

  const lib = target.protocol === 'https:' ? require('node:https') : require('node:http');
  const upstream = lib.get(
    target,
    { timeout: 8000, headers: { 'User-Agent': 'OpenClaw-Studio-Launcher' } },
    (up) => {
      if (up.statusCode !== 200) {
        up.resume();
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('icon unavailable');
        return;
      }
      const type = String(up.headers['content-type'] || '');
      if (!type.startsWith('image/')) {
        up.resume();
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('not an image');
        return;
      }
      const chunks = [];
      let size = 0;
      up.on('data', (c) => {
        size += c.length;
        if (size > ICON_MAX_BYTES) {
          up.destroy();
          return;
        }
        chunks.push(c);
      });
      up.on('end', () => {
        if (size > ICON_MAX_BYTES) {
          if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('icon too large');
          return;
        }
        const body = Buffer.concat(chunks);
        rememberIcon(key, { type, body });
        res.writeHead(200, {
          'Content-Type': type,
          'Content-Length': body.length,
          'Cache-Control': 'public, max-age=86400',
        });
        res.end(body);
      });
    },
  );

  upstream.on('timeout', () => {
    upstream.destroy();
    if (!res.headersSent) res.writeHead(504, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('icon timeout');
  });
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('icon fetch failed');
  });

  return true;
}

module.exports = { shouldProxy, proxyHttp, proxyUpgrade, serveCatalogIcon, PROXY_PREFIXES };
