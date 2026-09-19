'use strict';

/**
 * HTTP API surface for the launcher UI.
 *
 * Pure Node http — no framework, no runtime dependencies beyond the vendored
 * Node binary the app already ships. Every handler returns a plain object that
 * the server serialises as JSON.
 */

const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const paths = require('./paths');
const settings = require('./settings');
const openclaw = require('./openclaw');
const gateway = require('./gateway');
const pairing = require('./pairing');
const tasks = require('./tasks');
const { tailFile, exists, readJsonSync, appendLog, clampInt } = require('./util');
const { LauncherError } = openclaw;

// ---------------------------------------------------------------------------
// Install / upgrade
// ---------------------------------------------------------------------------

function startInstall({ version = 'latest', reinstall = false, runtimeOnly = false } = {}) {
  const task = tasks.guard('install', reinstall ? '重新安装 OpenClaw' : '安装 / 更新 OpenClaw');

  (async () => {
    try {
      tasks.progress(task, 5, '准备运行时…');
      const onLog = (line) => tasks.log(task, line);

      if (!runtimeOnly) {
        const runtime = await openclaw.provisionRuntime({ onLog, force: false });
        tasks.progress(task, 25, runtime.changed ? `Node ${runtime.version} 就绪` : `Node ${runtime.version} 已就绪`);
      } else {
        const runtime = await openclaw.provisionRuntime({ onLog, force: true });
        tasks.progress(task, 60, `Node ${runtime.version} 已更新`);
        tasks.finish(task, { runtimeOnly: true, nodeVersion: runtime.version });
        return;
      }

      tasks.progress(task, 35, '解析 OpenClaw 版本…');
      const result = await openclaw.install({ version, onLog, reinstall });
      tasks.progress(task, 85, result.changed ? '写入配置…' : '已是最新版本');

      // Re-apply managed config so a freshly installed version gets our keys.
      const cfg = settings.load();
      await openclaw.applyManagedConfig({
        port: cfg.gateway.port,
        bind: cfg.gateway.bind,
        authMode: cfg.gateway.authMode,
        token: cfg.gateway.token,
        tls: cfg.gateway.tls,
        allowFakeIp: cfg.network.allowFakeIp,
      });

      tasks.progress(task, 95, '完成');
      tasks.finish(task, result);
      await appendLog(paths.installLog, `install finished: ${JSON.stringify(result)}`);
    } catch (err) {
      tasks.log(task, `错误：${err.message}`);
      tasks.fail(task, err);
      await appendLog(paths.installLog, `install failed: ${err.message}`);
    }
  })();

  return task;
}

// ---------------------------------------------------------------------------
// System information
// ---------------------------------------------------------------------------

async function systemInfo() {
  const cfg = settings.load();
  const [nodeVer, ocVer] = await Promise.all([
    openclaw.nodeVersion(),
    openclaw.installedVersion(),
  ]);

  let disk = null;
  try {
    const stat = await fsp.statfs(paths.dataDir);
    const total = stat.blocks * stat.bsize;
    const free = stat.bavail * stat.bsize;
    disk = { total, free, used: total - free, percent: total ? Math.round(((total - free) / total) * 100) : 0 };
  } catch {
    /* statfs unsupported on some fs — not fatal */
  }

  return {
    hostname: os.hostname(),
    platform: `${os.platform()} ${os.release()}`,
    arch: os.arch(),
    uptimeSec: Math.round(os.uptime()),
    loadavg: os.loadavg(),
    cpuCount: os.cpus().length,
    cpuModel: (os.cpus()[0] || {}).model || 'unknown',
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      percent: Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100),
    },
    disk,
    addresses: openclaw.hostAddresses(),
    node: {
      vendored: nodeVer,
      system: process.version,
      satisfiesOpenClaw: nodeVer ? openclaw.satisfiesNodeRange(nodeVer.replace(/^v/, ''), '>=24.16.0 <25') : false,
    },
    openclaw: {
      version: ocVer,
      installed: Boolean(ocVer),
      engines: await openclaw.installedEngines(),
    },
    dataDir: paths.dataDir,
    gateway: {
      port: cfg.gateway.port,
      bind: cfg.gateway.bind,
      url: gateway.gatewayUrl(cfg),
      controlUrl: gateway.controlUrl(cfg),
    },
  };
}

/** Everything the dashboard needs, in one round trip. */
async function fullStatus() {
  const cfg = settings.load();
  const [gw, ocVer] = await Promise.all([gateway.status(), openclaw.installedVersion()]);
  return {
    launcher: {
      version: readJsonSync(path.join(paths.appDest, 'version.json'), {})?.version || '1.0.0',
      dataDir: paths.dataDir,
      pid: process.pid,
      startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
      uptimeSec: Math.round(process.uptime()),
    },
    gateway: gw,
    openclaw: { version: ocVer, installed: Boolean(ocVer) },
    pairing: pairing.snapshot(),
    settings: cfg,
    setup: {
      needsRuntime: !gw.nodeVersion,
      needsInstall: !ocVer,
      needsStart: Boolean(ocVer) && !gw.running,
      ready: Boolean(ocVer) && gw.running,
    },
    tasks: tasks.list().slice(0, 6),
  };
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

async function updateSettings(patch) {
  if (!patch || typeof patch !== 'object') {
    throw new LauncherError('无效的设置数据', { code: 'EBADREQUEST' });
  }

  const before = settings.load();
  const next = await settings.update(patch);

  const portChanged = before.gateway.port !== next.gateway.port;
  const authChanged = before.gateway.authMode !== next.gateway.authMode ||
    before.gateway.token !== next.gateway.token;
  const bindChanged = before.gateway.bind !== next.gateway.bind;
  const tlsChanged = JSON.stringify(before.gateway.tls) !== JSON.stringify(next.gateway.tls);
  const fakeIpChanged = before.network.allowFakeIp !== next.network.allowFakeIp;

  if (before.pairing.pollIntervalMs !== next.pairing.pollIntervalMs) pairing.refreshLoop();

  const gw = await gateway.status();
  const needsRestart = gw.running &&
    (portChanged || authChanged || bindChanged || tlsChanged || fakeIpChanged);

  return {
    settings: next,
    needsRestart,
    changed: { portChanged, authChanged, bindChanged, tlsChanged, fakeIpChanged },
  };
}

// ---------------------------------------------------------------------------
// OpenClaw config
// ---------------------------------------------------------------------------

async function getOpenClawConfig() {
  const detailed = openclaw.readConfigDetailed();
  const cfg = detailed.config;
  const gw = await gateway.status();
  return {
    path: paths.openclawConfig,
    exists: detailed.exists,
    parseOk: detailed.ok,
    parseError: detailed.error,
    config: cfg,
    // Read-only summary; the launcher never writes model configuration.
    defaultModel: cfg?.agents?.defaults?.model ?? null,
    providerCount: Object.keys(cfg?.models?.providers || {}).length,
    gateway: {
      running: gw.running,
      port: cfg?.gateway?.port ?? null,
      mode: cfg?.gateway?.mode ?? null,
      bind: cfg?.gateway?.bind ?? null,
      authMode: cfg?.gateway?.auth?.mode ?? null,
    },
  };
}

async function patchOpenClawConfig(patch) {
  if (!patch || typeof patch !== 'object') {
    throw new LauncherError('无效的配置数据', { code: 'EBADREQUEST' });
  }
  const protect = ['gateway'];
  const stripped = { ...patch };
  for (const key of protect) {
    if (key in stripped) {
      throw new LauncherError(`字段 ${key} 由启动器托管，请通过「服务设置」修改`, { code: 'EPROTECTED' });
    }
  }
  const next = await openclaw.patchConfig(stripped);
  const gw = await gateway.status();
  return { config: next, needsRestart: gw.running };
}

// ---------------------------------------------------------------------------
// Gateway control
// ---------------------------------------------------------------------------

async function gatewayAction(action) {
  const collector = { lines: [], push(line) { this.lines.push(String(line)); } };

  switch (action) {
    case 'start': {
      const res = await gateway.start({ onLog: (l) => collector.push(l) });
      return { ...res, log: collector.lines };
    }
    case 'stop': {
      const res = await gateway.stop({ onLog: (l) => collector.push(l) });
      return { ...res, log: collector.lines };
    }
    case 'restart': {
      const res = await gateway.restart({ onLog: (l) => collector.push(l) });
      return { ...res, log: collector.lines };
    }
    default:
      throw new LauncherError(`未知操作：${action}`, { code: 'EBADREQUEST' });
  }
}

/** Probe whether the configured port is free before starting. */
async function portCheck(port) {
  const cfg = settings.load();
  const target = clampInt(port, 1024, 65535, cfg.gateway.port);
  const { run } = require('./util');
  const res = await run('sh', ['-c', `ss -tlnH 2>/dev/null | awk '{print $4}' | grep -E ':${target}$' | head -1`], {
    timeoutMs: 8000,
  });
  const occupied = Boolean(res.stdout.trim());
  return { port: target, available: !occupied, occupant: occupied ? res.stdout.trim() : null, self: target === cfg.gateway.port };
}

module.exports = {
  startInstall,
  systemInfo,
  fullStatus,
  updateSettings,
  getOpenClawConfig,
  patchOpenClawConfig,
  gatewayAction,
  portCheck,
  tasks,
  pairing,
  gateway,
  settings,
  openclaw,
  tailFile,
  paths,
};
