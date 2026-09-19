'use strict';

/**
 * Gateway process lifecycle.
 *
 * The OpenClaw gateway is a long-lived process. The launcher supervises it:
 * it starts it detached, records the pid, tails its log, and restarts it when
 * the user changes port/auth settings.
 */

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');

const paths = require('./paths');
const settings = require('./settings');
const openclaw = require('./openclaw');
const {
  run,
  exists,
  readPidFile,
  pidAlive,
  appendLog,
  rotateLog,
  readJsonSync,
  writeJsonAtomic,
  sleep,
  extractJson,
} = require('./util');

let lastStartError = null;

/** Read the pid of a running gateway, or null. */
function currentPid() {
  const pid = readPidFile(paths.gatewayPidFile);
  if (pid && pidAlive(pid)) return pid;
  return null;
}

/**
 * Guard against adopting a pid that has been recycled by an unrelated
 * process: pid files can outlive a crash.
 */
function describeProcess(pid) {
  try {
    const cmdline = fs.readFileSync(`/proc/${pid}/cmdline`, 'utf8').split('\0').join(' ').trim();
    return cmdline;
  } catch {
    return '';
  }
}

function isOurGateway(pid) {
  const cmd = describeProcess(pid);
  if (!cmd) return false;
  return cmd.includes('openclaw') && cmd.includes('gateway');
}

async function status() {
  const cfg = settings.load();
  const pid = currentPid();
  const running = Boolean(pid && isOurGateway(pid));
  if (!running && pid) {
    // Stale pidfile pointing at something else — clean it up.
    await fsp.rm(paths.gatewayPidFile, { force: true }).catch(() => {});
  }

  const version = await openclaw.installedVersion();
  const reachable = running ? await probe(cfg) : { ok: false, reason: 'not-running' };

  return {
    running,
    pid: running ? pid : null,
    port: cfg.gateway.port,
    bind: cfg.gateway.bind,
    authMode: cfg.gateway.authMode,
    url: gatewayUrl(cfg),
    controlUrl: controlUrl(cfg),
    openclawVersion: version,
    nodeVersion: await openclaw.nodeVersion(),
    installed: Boolean(version),
    reachable,
    lastError: lastStartError,
    startedAt: readJsonSync(paths.gatewayMetaFile, {})?.startedAt || null,
  };
}

function gatewayUrl(cfg) {
  const scheme = cfg.gateway.tls?.enabled ? 'https' : 'http';
  const host = openclaw.hostAddresses()[0] || '127.0.0.1';
  return `${scheme}://${host}:${cfg.gateway.port}`;
}

/**
 * Direct URL of the Control UI on the gateway's own port.
 *
 * NOTE: opening this from another machine on the LAN puts the browser behind
 * OpenClaw's manual device-approval wall. The launcher's own proxied link
 * (`control/#token=…`) is preferred because it arrives via loopback and
 * registers the browser automatically.
 */
function controlUrl(cfg) {
  return `${gatewayUrl(cfg)}/control/`;
}

/** Relative path of the Control UI as served through the launcher proxy. */
function localControlPath() {
  return 'control/';
}

/** HTTP probe of the gateway's control UI. */
async function probe(cfg = settings.load(), timeoutSec = 5) {
  const url = `http://127.0.0.1:${cfg.gateway.port}/control/`;
  const res = await run(
    'curl',
    ['-sS', '-o', '/dev/null', '-w', '%{http_code}', '-m', String(timeoutSec), url],
    { timeoutMs: (timeoutSec + 3) * 1000 },
  );
  if (res.code !== 0) {
    return { ok: false, reason: 'unreachable', detail: res.stderr.slice(0, 300) };
  }
  const code = Number.parseInt(res.stdout.trim(), 10);
  return { ok: code >= 200 && code < 500, httpStatus: code };
}

/** Start the gateway if it is not already running. */
async function start({ onLog = () => {} } = {}) {
  lastStartError = null;

  if (currentPid()) {
    return { started: false, reason: 'already-running', pid: currentPid() };
  }

  const version = await openclaw.installedVersion();
  if (!version) {
    throw new openclaw.LauncherError('OpenClaw 尚未安装，请先完成安装', { code: 'ENOTINSTALLED' });
  }

  const cfg = settings.load();
  paths.ensure();

  // A deliberate start always clears the "user stopped it" marker.
  await fsp.rm(paths.gatewayStoppedMarker, { force: true }).catch(() => {});

  // Keep openclaw.json in sync with the launcher settings on every start.
  await openclaw.applyManagedConfig({
    port: cfg.gateway.port,
    bind: cfg.gateway.bind,
    authMode: cfg.gateway.authMode,
    token: cfg.gateway.token,
    tls: cfg.gateway.tls,
    allowFakeIp: cfg.network.allowFakeIp,
  });

  await rotateLog(paths.gatewayLog);

  const args = [
    paths.openclawBin,
    'gateway',
    'run',
    '--bind',
    cfg.gateway.bind,
    '--port',
    String(cfg.gateway.port),
  ];
  if (cfg.gateway.authMode === 'token') args.push('--token', cfg.gateway.token);
  if (Array.isArray(cfg.gateway.extraArgs)) args.push(...cfg.gateway.extraArgs);

  onLog(`Starting gateway: node openclaw.mjs ${args.slice(1).join(' ')}`);

  const logStream = fs.openSync(paths.gatewayLog, 'a');
  const child = spawn(paths.nodeBin, args, {
    cwd: paths.homeDir,
    env: openclaw.openclawEnv(),
    detached: true,
    stdio: ['ignore', logStream, logStream],
  });

  let spawnError = null;
  child.on('error', (err) => {
    spawnError = err;
  });
  child.unref();
  fs.closeSync(logStream);

  await fsp.writeFile(paths.gatewayPidFile, String(child.pid), 'utf8');
  await writeJsonAtomic(paths.gatewayMetaFile, {
    pid: child.pid,
    startedAt: new Date().toISOString(),
    port: cfg.gateway.port,
    bind: cfg.gateway.bind,
  });

  // Wait for the HTTP server to answer rather than assuming success.
  const deadline = Date.now() + 60_000;
  let ready = false;
  while (Date.now() < deadline) {
    await sleep(700);
    if (!pidAlive(child.pid)) break;
    const p = await probe(cfg, 3);
    if (p.ok) {
      ready = true;
      break;
    }
  }

  if (spawnError) {
    lastStartError = spawnError.message;
    throw new openclaw.LauncherError('网关进程启动失败', {
      code: 'ESPAWN',
      detail: spawnError.message,
    });
  }

  if (!ready) {
    const tail = await require('./util').tailFile(paths.gatewayLog, 40);
    lastStartError = '网关在 60 秒内未就绪';
    throw new openclaw.LauncherError('网关启动超时', {
      code: 'ETIMEOUT',
      detail: tail.slice(-1500),
      hint: '请查看日志面板确认端口是否被占用',
    });
  }

  onLog(`Gateway ready on port ${cfg.gateway.port} (pid ${child.pid})`);
  return { started: true, pid: child.pid, port: cfg.gateway.port };
}

/** Stop the gateway, escalating TERM → KILL. */
async function stop({ onLog = () => {} } = {}) {
  const pid = currentPid();
  if (!pid) {
    await fsp.rm(paths.gatewayPidFile, { force: true }).catch(() => {});
    return { stopped: false, reason: 'not-running' };
  }

  onLog(`Stopping gateway pid ${pid}`);
  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    /* already gone */
  }

  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline && pidAlive(pid)) {
    await sleep(400);
  }

  if (pidAlive(pid)) {
    onLog('Gateway did not exit on SIGTERM, sending SIGKILL');
    try {
      process.kill(pid, 'SIGKILL');
    } catch {
      /* ignore */
    }
    await sleep(600);
  }

  await fsp.rm(paths.gatewayPidFile, { force: true }).catch(() => {});
  await fsp.rm(paths.gatewayMetaFile, { force: true }).catch(() => {});
  // Remember that the user asked for it to be down, so the supervisor in the
  // server does not immediately bring it back up.
  await fsp.writeFile(paths.gatewayStoppedMarker, new Date().toISOString(), 'utf8').catch(() => {});
  onLog('Gateway stopped');
  return { stopped: true, pid };
}

async function restart(opts = {}) {
  await stop(opts);
  await sleep(800);
  return start(opts);
}

/** Read the gateway log. */
async function logs(lines = 300) {
  const text = await require('./util').tailFile(paths.gatewayLog, lines);
  return text;
}

/** Quick RPC helper against the running gateway. */
async function rpc(method, params = {}, { timeoutMs = 20_000, json = true } = {}) {
  const cfg = settings.load();
  const args = ['gateway', 'call', method, '--params', JSON.stringify(params), '--timeout', String(timeoutMs)];
  if (cfg.gateway.authMode === 'token') args.push('--token', cfg.gateway.token);
  if (json) args.push('--json');
  const res = await openclaw.cli(args, { timeoutMs: timeoutMs + 15_000 });
  return { ...res, json: extractJson(res.stdout) };
}

/** True when the user explicitly stopped the gateway and it should stay down. */
async function userStopped() {
  return exists(paths.gatewayStoppedMarker);
}

module.exports = {
  status,
  userStopped,
  start,
  stop,
  restart,
  logs,
  probe,
  rpc,
  currentPid,
  gatewayUrl,
  controlUrl,
  localControlPath,
};
