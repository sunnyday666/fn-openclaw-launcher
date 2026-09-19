'use strict';

/**
 * Launcher settings — the app's own configuration, kept separate from
 * OpenClaw's own openclaw.json so that neither can corrupt the other.
 */

const paths = require('./paths');
const { readJsonSync, writeJsonAtomic, clampInt, deepMerge, randomToken } = require('./util');

const DEFAULT_PORT = 18789;
const DEFAULT_WEB_PORT = 18790;

function defaults() {
  return {
    gateway: {
      port: DEFAULT_PORT,
      bind: 'lan',
      authMode: 'token',
      token: randomToken(24),
      tls: { enabled: false, autoGenerate: true },
      autoStart: true,
      extraArgs: [],
    },
    pairing: {
      /**
       * The core "auto-register" behaviour: when a browser or app opens the
       * OpenClaw Control UI it creates a pending device-pairing request.
       * With this on, the launcher approves it immediately so the user never
       * has to run a CLI command.
       */
      autoApprove: true,
      /**
       * Reactions are driven by filesystem events on the gateway's state
       * database, so an idle system issues no RPCs at all. This value only
       * sets the debounce/rate-limit window for those reactions.
       */
      pollIntervalMs: 2000,
      /**
       * Slow safety sweep, in case filesystem notifications are unavailable
       * or dropped. A single RPC every five minutes is ~85x cheaper than the
       * previous 2 second poll.
       */
      fallbackIntervalMs: 300_000,
      /** Roles the launcher is willing to approve unattended. */
      autoApproveRoles: ['operator', 'browser', 'control-ui', 'node', 'device'],
      /** Safety valve: never approve more than this many devices per minute. */
      maxApprovalsPerMinute: 30,
      /** Record every auto-approval in logs/pairing.log. */
      verbose: true,
    },
    openclaw: {
      /** "latest" resolves to the newest stable build the runtime supports. */
      version: 'latest',
      registry: 'https://registry.npmmirror.com/',
      autoUpdateCheck: true,
      /**
       * Provision the runtime and install OpenClaw on first launch, so the app
       * is ready by the time the user opens it. Progress is always visible in
       * the console; set false to require an explicit click instead.
       */
      autoInstall: true,
    },
    launcher: {
      /**
       * TCP port for the launcher's own web console.
       *
       * The launcher always listens on the fnOS portal unix socket, but the
       * proxied OpenClaw Control UI uses root-absolute asset paths, so it needs
       * a listener where it is same-origin at the root. "打开 OpenClaw" opens
       * this port.
       */
      webPort: 18790,
      enabled: true,
      /**
       * Host used when opening the OpenClaw Control UI. Empty means "the first
       * LAN IP". Pinning this keeps the Control UI origin stable, which matters
       * because the browser stores its device identity per origin — a changing
       * host would register a new device on every visit.
       */
      publicHost: '',
    },
    network: {
      /**
       * Clash / sing-box style fake-IP DNS answers with addresses from
       * 198.18.0.0/15, which OpenClaw's SSRF guard rejects. Trusting the
       * range keeps the model catalog working behind those resolvers.
       */
      allowFakeIp: true,
    },
    ui: {
      /** Open the OpenClaw Control UI in a new tab when starting. */
      openControlUiOnStart: false,
    },
  };
}

let cache = null;

function load() {
  if (cache) return cache;
  const stored = readJsonSync(paths.settingsFile, {}) || {};
  const merged = deepMerge(defaults(), stored);

  // Seed ports from the install wizard the first time the app runs, so the
  // choices made during installation are honoured before any UI is opened.
  if (Object.keys(stored).length === 0) {
    const gwPort = Number.parseInt(process.env.OPENCLAW_STUDIO_GATEWAY_PORT || '', 10);
    const webPort = Number.parseInt(process.env.OPENCLAW_STUDIO_WEB_PORT || '', 10);
    if (Number.isFinite(gwPort) && gwPort >= 1024 && gwPort <= 65535) merged.gateway.port = gwPort;
    if (Number.isFinite(webPort) && webPort >= 1024 && webPort <= 65535) merged.launcher.webPort = webPort;
  }

  // Repair values that would break the gateway if a user hand-edited them.
  merged.gateway.port = clampInt(merged.gateway.port, 1024, 65535, DEFAULT_PORT);
  merged.launcher.webPort = clampInt(merged.launcher.webPort, 1024, 65535, DEFAULT_WEB_PORT);
  merged.pairing.pollIntervalMs = clampInt(merged.pairing.pollIntervalMs, 500, 60_000, 2000);
  merged.pairing.fallbackIntervalMs = clampInt(
    merged.pairing.fallbackIntervalMs,
    30_000,
    3_600_000,
    300_000,
  );
  merged.pairing.maxApprovalsPerMinute = clampInt(
    merged.pairing.maxApprovalsPerMinute,
    1,
    600,
    30,
  );
  if (!Array.isArray(merged.gateway.extraArgs)) merged.gateway.extraArgs = [];
  if (!Array.isArray(merged.pairing.autoApproveRoles)) {
    merged.pairing.autoApproveRoles = defaults().pairing.autoApproveRoles;
  }
  if (!merged.gateway.token || typeof merged.gateway.token !== 'string') {
    merged.gateway.token = randomToken(24);
  }

  cache = merged;
  return cache;
}

async function save(next) {
  cache = next;
  await writeJsonAtomic(paths.settingsFile, next);
  return cache;
}

/** Apply a partial patch and persist. Returns the new settings. */
async function update(patch) {
  const current = load();
  const merged = deepMerge(current, patch || {});
  merged.gateway.port = clampInt(merged.gateway.port, 1024, 65535, DEFAULT_PORT);
  merged.pairing.pollIntervalMs = clampInt(merged.pairing.pollIntervalMs, 500, 60_000, 2000);
  return save(merged);
}

/** Ensure the settings file exists on disk (called at startup). */
async function ensureFile() {
  const current = load();
  await save(current);
  return current;
}

function invalidate() {
  cache = null;
}

module.exports = { load, save, update, ensureFile, invalidate, defaults, DEFAULT_PORT, DEFAULT_WEB_PORT };
