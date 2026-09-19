'use strict';

/**
 * Auto-registration ("打开即注册").
 *
 * When a browser opens the OpenClaw Control UI it presents a fresh device
 * key. The gateway refuses it until an operator approves the pending pairing
 * request — which normally means the user has to drop into a terminal and run
 * `openclaw devices approve`. That is the single biggest piece of friction in
 * running OpenClaw on a NAS.
 *
 * This module removes it. A background loop watches the gateway's pending
 * pairing queue and approves new devices the moment they appear, so a user
 * who clicks "打开 OpenClaw" lands straight in the dashboard.
 *
 * Safety rails, because this is an approval path:
 *   - only requests whose role is on an explicit allowlist are approved;
 *   - approvals are rate limited, so a runaway client cannot flood the queue;
 *   - rejections and errors are recorded, and every action is audited;
 *   - the whole feature can be switched off from the UI, and a manual
 *     approve/reject path is always available.
 */

const fs = require('node:fs');
const path = require('node:path');

const paths = require('./paths');
const settings = require('./settings');
const gateway = require('./gateway');
const { appendLog, sleep } = require('./util');

const state = {
  timer: null,
  fallbackTimer: null,
  watcher: null,
  /** 'watch' when filesystem notifications drive us, else 'interval'. */
  watchMode: null,
  lastTrigger: null,
  lastCheck: null,
  lastReactionAt: 0,
  running: false,
  inFlight: false,
  /** requestId -> { requestId, deviceId, role, displayName, approvedAt, source } */
  recent: [],
  /** Rolling window of approval timestamps for rate limiting. */
  approvalTimes: [],
  /**
   * Requests that failed for a reason a retry cannot fix (e.g. the token lacks
   * operator.admin). Retrying them on every state change produced a stream of
   * pointless RPCs, so they are remembered and skipped.
   */
  abandoned: new Map(),
  lastPollAt: null,
  lastError: null,
  stats: {
    approvals: 0,
    rejections: 0,
    failures: 0,
    polls: 0,
    /** Reactions skipped because the queue was already empty. */
    skipped: 0,
    startedAt: null,
  },
  listeners: new Set(),
};

const MAX_RECENT = 50;

function emit(event) {
  for (const listener of state.listeners) {
    try {
      listener(event);
    } catch {
      /* a broken listener must not stop the poller */
    }
  }
}

function onEvent(listener) {
  state.listeners.add(listener);
  return () => state.listeners.delete(listener);
}

/** Normalise the many shapes `device.pair.list` may return. */
function normaliseList(payload) {
  if (!payload || typeof payload !== 'object') return { pending: [], paired: [] };
  const pending = Array.isArray(payload.pending) ? payload.pending : [];
  const paired = Array.isArray(payload.paired) ? payload.paired : [];
  return { pending, paired };
}

function requestIdOf(request) {
  if (!request) return null;
  return (
    request.requestId ||
    request.request_id ||
    request.id ||
    request.pairingRequestId ||
    null
  );
}

function roleOf(request) {
  if (!request) return null;
  const roles = Array.isArray(request.roles) && request.roles.length ? request.roles : null;
  return request.role || (roles ? roles[0] : null) || null;
}

function labelOf(request) {
  if (!request) return 'unknown device';
  return (
    request.displayName ||
    request.deviceName ||
    request.clientId ||
    request.platform ||
    'unknown device'
  );
}

/** Fetch the current pairing table. Returns null when the gateway is down. */
async function fetchDevices({ timeoutMs = 15_000 } = {}) {
  const res = await gateway.rpc('device.pair.list', {}, { timeoutMs });
  if (res.code !== 0 || !res.json) {
    const detail = `${res.stderr || ''}${res.stdout || ''}`.trim().slice(0, 400);
    return { ok: false, detail, pending: [], paired: [] };
  }
  const list = normaliseList(res.json);
  return { ok: true, ...list };
}

/** Approve one pending request. */
async function approveRequest(requestId, { source = 'manual', role = null, label = null } = {}) {
  const res = await gateway.rpc('device.pair.approve', { requestId }, { timeoutMs: 25_000 });
  const ok = res.code === 0;
  if (ok) {
    state.stats.approvals += 1;
    state.approvalTimes.push(Date.now());
    const record = {
      requestId,
      role,
      label,
      approvedAt: new Date().toISOString(),
      source,
    };
    state.recent.unshift(record);
    state.recent = state.recent.slice(0, MAX_RECENT);
    await appendLog(
      paths.pairingLog,
      `APPROVED requestId=${requestId} role=${role || '-'} device=${label || '-'} via=${source}`,
    );
    emit({ type: 'approved', record });
  } else {
    state.stats.failures += 1;
    const detail = `${res.stderr || ''}${res.stdout || ''}`.trim().slice(0, 300);
    await appendLog(
      paths.pairingLog,
      `FAILED requestId=${requestId} role=${role || '-'} via=${source} :: ${detail}`,
    );
    // Missing scope will not fix itself; stop hammering the gateway.
    if (/missing scope|forbidden|not permitted/i.test(detail)) {
      state.abandoned.set(requestId, { at: Date.now(), reason: detail.slice(0, 200) });
      await appendLog(
        paths.pairingLog,
        `ABANDONED requestId=${requestId} (non-retryable; needs approval in the OpenClaw console)`,
      );
    }
    emit({ type: 'approve-failed', requestId, detail });
  }
  return { ok, detail: ok ? null : `${res.stderr || res.stdout}`.trim().slice(0, 300) };
}

/** Reject one pending request. */
async function rejectRequest(requestId, { source = 'manual', reason = null } = {}) {
  const res = await gateway.rpc('device.pair.reject', { requestId }, { timeoutMs: 25_000 });
  const ok = res.code === 0;
  if (ok) {
    state.stats.rejections += 1;
    await appendLog(paths.pairingLog, `REJECTED requestId=${requestId} via=${source} reason=${reason || '-'}`);
    emit({ type: 'rejected', requestId, source });
  }
  return { ok, detail: ok ? null : `${res.stderr || res.stdout}`.trim().slice(0, 300) };
}

async function removePaired(deviceId) {
  const res = await gateway.rpc('device.pair.remove', { deviceId }, { timeoutMs: 25_000 });
  const ok = res.code === 0;
  if (ok) {
    await appendLog(paths.pairingLog, `REMOVED paired deviceId=${deviceId}`);
    emit({ type: 'removed', deviceId });
  }
  return { ok, detail: ok ? null : `${res.stderr || res.stdout}`.trim().slice(0, 300) };
}

/** Rate limiter: true when we may approve another device right now. */
function withinRateLimit() {
  const cfg = settings.load();
  const windowMs = 60_000;
  const now = Date.now();
  state.approvalTimes = state.approvalTimes.filter((t) => now - t < windowMs);
  return state.approvalTimes.length < cfg.pairing.maxApprovalsPerMinute;
}

/** One poll cycle. Exported so the UI can force an immediate sweep. */
async function pollOnce({ manual = false } = {}) {
  if (state.inFlight) return { skipped: 'busy' };
  state.inFlight = true;
  const cfg = settings.load();

  try {
    const result = await fetchDevices();
    state.lastPollAt = new Date().toISOString();
    state.stats.polls += 1;
    state.stats.lastTriggerAt = state.lastPollAt;

    if (!result.ok) {
      state.lastError = result.detail || 'gateway unreachable';
      return { ok: false, detail: state.lastError };
    }

    state.lastError = null;
    const pending = result.pending;
    if (pending.length === 0) return { ok: true, approved: [], pending: 0 };

    emit({ type: 'pending', count: pending.length, requests: pending });

    const approved = [];
    const skipped = [];

    for (const request of pending) {
      const requestId = requestIdOf(request);
      const role = roleOf(request);
      const label = labelOf(request);

      if (!requestId) {
        skipped.push({ reason: 'no-request-id', request });
        continue;
      }
      if (state.recent.some((r) => r.requestId === requestId)) continue;
      // A request we already failed on for a non-retryable reason: skip it
      // rather than firing another RPC every time the state file changes.
      if (state.abandoned.has(requestId)) continue;

      const allowed = manual || (cfg.pairing.autoApprove && isRoleAllowed(role, cfg));
      if (!allowed) {
        skipped.push({ requestId, role, reason: manual ? 'unknown' : 'role-not-allowlisted' });
        continue;
      }
      if (!manual && !withinRateLimit()) {
        skipped.push({ requestId, role, reason: 'rate-limited' });
        await appendLog(paths.pairingLog, `SKIPPED requestId=${requestId} reason=rate-limited`);
        continue;
      }

      if (cfg.pairing.verbose) {
        await appendLog(
          paths.pairingLog,
          `PENDING requestId=${requestId} role=${role || '-'} device=${label} -> approving`,
        );
      }

      const res = await approveRequest(requestId, {
        source: manual ? 'manual' : 'auto',
        role,
        label,
      });
      if (res.ok) approved.push({ requestId, role, label });
    }

    return { ok: true, approved, skipped, pending: pending.length };
  } catch (err) {
    state.lastError = err && err.message ? err.message : String(err);
    state.stats.failures += 1;
    return { ok: false, detail: state.lastError };
  } finally {
    state.inFlight = false;
  }
}

function isRoleAllowed(role, cfg) {
  // A request with no role at all is treated as the common browser case.
  const effective = (role || 'browser').toLowerCase();
  return cfg.pairing.autoApproveRoles
    .map((r) => String(r).toLowerCase())
    .some((allowed) => allowed === effective || effective.includes(allowed));
}

/**
 * Mirrors OpenClaw's own DEVICE_PAIRING_PENDING_TTL_MS (5 minutes). Requests
 * older than this are dead: the gateway ignores them even though the rows may
 * linger in the table.
 */
const PENDING_TTL_MS = 5 * 60 * 1000;

/** Directory holding the gateway's SQLite state, whose writes we watch. */
function stateWatchDir() {
  return path.join(paths.stateDir, 'state');
}

/**
 * React to a change in the gateway's state.
 *
 * Pairing requests are written to the gateway's SQLite database, so a file
 * change is the signal that something happened. Reading the database directly
 * is deliberately avoided — this only uses it as a trigger, and all real work
 * goes through the public `device.pair.*` RPC.
 *
 * A burst of writes arrives for a single pairing (WAL, shm and the main file
 * all change), so calls are debounced and rate limited.
 */
/**
 * Cheap peek at the gateway's pending-pairing queue.
 *
 * The authoritative interface is the `device.pair.*` RPC, but each call spawns
 * a whole Node process (~1.4 s of CPU). Filesystem notifications fire for
 * unrelated gateway writes too, so reacting to every one of them that way was
 * still costing ~18% of a core while nominally idle.
 *
 * This reads the pending count straight from the state database in ~13 ms and
 * is used purely as a filter: it decides whether the real RPC is worth
 * running. If the read fails for any reason — schema drift, permissions, a
 * missing file — `null` is returned and the caller falls back to the RPC, so
 * correctness never depends on the internal schema.
 */
/** Forget abandoned entries once the pending queue can no longer hold them. */
function pruneAbandoned() {
  if (state.abandoned.size === 0) return;
  const cutoff = Date.now() - 10 * 60 * 1000;
  for (const [id, info] of state.abandoned) {
    if (info.at < cutoff) state.abandoned.delete(id);
  }
}

function pendingIdsFast() {
  try {
    const { DatabaseSync } = require('node:sqlite');
    const file = path.join(stateWatchDir(), 'openclaw.sqlite');
    if (!fs.existsSync(file)) return null;
    const db = new DatabaseSync(file, { readOnly: true });
    try {
      // Only rows still inside OpenClaw's pending TTL count. Expired rows stay
      // in the table until the gateway prunes them, and the RPC ignores them —
      // counting them here caused needless RPCs on every state change.
      const cutoff = Date.now() - PENDING_TTL_MS;
      const rows = db
        .prepare(
          'SELECT request_id FROM device_pairing_pending ' +
            'WHERE COALESCE(refreshed_at_ms, ts) > ?',
        )
        .all(cutoff);
      return rows.map((r) => String(r.request_id));
    } finally {
      db.close();
    }
  } catch {
    return null;
  }
}

function scheduleReaction(reason) {
  if (!state.running) return;
  const cfg = settings.load();
  const debounce = 400;
  const minInterval = Math.max(1000, Math.floor(cfg.pairing.pollIntervalMs / 2));

  if (state.timer) clearTimeout(state.timer);
  const since = Date.now() - (state.lastReactionAt || 0);
  const wait = Math.max(debounce, minInterval - since);
  state.timer = setTimeout(async () => {
    state.lastReactionAt = Date.now();
    state.lastTrigger = reason;

    // Cheap filter first: work out whether anything is actually actionable
    // before paying for a process spawn. Requests we already failed on for a
    // non-retryable reason, and ones we already approved, do not count.
    pruneAbandoned();
    const ids = pendingIdsFast();
    if (ids !== null) {
      const actionable = ids.filter(
        (id) => !state.abandoned.has(id) && !state.recent.some((r) => r.requestId === id),
      );
      if (actionable.length === 0) {
        state.stats.skipped += 1;
        state.lastCheck = ids.length ? `idle(${ids.length} stuck)` : 'idle';
        return;
      }
      state.lastCheck = `rpc(${actionable.length}/${ids.length} pending)`;
    } else {
      state.lastCheck = 'rpc(fallback)';
    }
    await pollOnce().catch(() => {});
  }, wait);
}

/** Begin watching the gateway state directory. Returns true on success. */
function startWatcher() {
  const dir = stateWatchDir();
  try {
    state.watcher = fs.watch(dir, { persistent: true }, (eventType, filename) => {
      const name = filename ? String(filename) : '';
      // Ignore lock files; only real state writes are interesting.
      if (name.includes('.lock')) return;
      scheduleReaction(`${eventType}:${name}`);
    });
    state.watcher.on('error', (err) => {
      state.lastError = `状态目录监听失败：${err.message}`;
      state.watchMode = 'interval';
      stopWatcher();
      startFallbackTimer();
    });
    state.watchMode = 'watch';
    return true;
  } catch (err) {
    state.lastError = `无法监听状态目录 ${dir}：${err.message}`;
    state.watchMode = 'interval';
    return false;
  }
}

function stopWatcher() {
  if (state.watcher) {
    try {
      state.watcher.close();
    } catch {
      /* already closed */
    }
    state.watcher = null;
  }
}

/** Safety net: a slow sweep in case filesystem notifications are missed. */
function startFallbackTimer() {
  const cfg = settings.load();
  const every = cfg.pairing.fallbackIntervalMs;
  if (state.fallbackTimer) clearTimeout(state.fallbackTimer);
  const tick = async () => {
    if (!state.running) return;
    // Same cheap filter, so a missed notification costs one 13 ms read.
    pruneAbandoned();
    const ids = pendingIdsFast();
    const worth = ids === null || ids.some((id) => !state.abandoned.has(id));
    if (worth) {
      const gws = await gateway.status().catch(() => null);
      if (gws && gws.running) await pollOnce().catch(() => {});
    } else {
      state.stats.skipped += 1;
    }
    if (!state.running) return;
    state.fallbackTimer = setTimeout(tick, every);
  };
  state.fallbackTimer = setTimeout(tick, every);
}

function stopFallbackTimer() {
  if (state.fallbackTimer) {
    clearTimeout(state.fallbackTimer);
    state.fallbackTimer = null;
  }
}

/**
 * Start the auto-registration engine.
 *
 * Runs on filesystem events, so an idle system costs nothing at all: no
 * timers fire, no RPC is issued, no process is spawned. A slow fallback sweep
 * covers the case where notifications are unavailable or dropped.
 */
function startLoop() {
  if (state.running) return;
  state.running = true;
  state.stats.startedAt = state.stats.startedAt || new Date().toISOString();

  const watching = startWatcher();
  startFallbackTimer();

  // One immediate sweep so anything already queued is handled right away.
  scheduleReaction(watching ? 'startup' : 'startup(fallback)');
}

function stopLoop() {
  state.running = false;
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  stopWatcher();
  stopFallbackTimer();
}

/** Restart the loop so a changed poll interval takes effect immediately. */
function refreshLoop() {
  if (!state.running) return;
  stopLoop();
  startLoop();
}

function snapshot() {
  const cfg = settings.load();
  return {
    enabled: cfg.pairing.autoApprove,
    running: state.running,
    mode: state.watchMode || 'stopped',
    watching: state.watchMode === 'watch',
    lastTrigger: state.lastTrigger,
    lastCheck: state.lastCheck,
    abandoned: [...state.abandoned.entries()].map(([requestId, v]) => ({ requestId, ...v })),
    fallbackIntervalMs: cfg.pairing.fallbackIntervalMs,
    autoApproveRoles: cfg.pairing.autoApproveRoles,
    lastPollAt: state.lastPollAt,
    lastError: state.lastError,
    stats: { ...state.stats },
    recent: state.recent.slice(0, 20),
  };
}

/** Combined view for the devices panel. */
async function overview() {
  const result = await fetchDevices();
  return {
    ok: result.ok,
    detail: result.detail || null,
    pending: result.pending.map((r) => ({
      requestId: requestIdOf(r),
      deviceId: r.deviceId || r.device_id || null,
      role: roleOf(r),
      roles: r.roles || null,
      label: labelOf(r),
      platform: r.platform || null,
      clientId: r.clientId || null,
      remoteIp: r.remoteIp || r.remote_ip || null,
      requestedAt: r.requestedAt || r.requestedAtMs || r.createdAtMs || null,
      raw: r,
    })),
    paired: result.paired.map((d) => ({
      deviceId: d.deviceId || d.device_id || null,
      label: d.displayName || d.operatorLabel || d.clientId || 'unknown',
      role: d.role || null,
      roles: d.roles || null,
      platform: d.platform || null,
      clientId: d.clientId || null,
      remoteIp: d.remoteIp || null,
      approvedAt: d.approvedAtMs || null,
      approvedVia: d.approvedVia || null,
      lastSeenAt: d.lastSeenAtMs || null,
    })),
    engine: snapshot(),
  };
}

/**
 * Remove duplicate registrations, keeping the most recently seen device in
 * each cluster.
 *
 * OpenClaw already supersedes silently-approved devices that share a
 * "cluster" (clientId + clientMode + displayName), but only after a 60 second
 * grace period and only for devices that are not currently connected. That
 * grace window is why several entries for the same browser can be visible at
 * once. This performs the same grouping immediately and on demand.
 */
async function pruneDuplicates({ dryRun = true } = {}) {
  const list = await fetchDevices();
  if (!list.ok) {
    return { ok: false, detail: list.detail, candidates: [], removed: [] };
  }

  const groups = new Map();
  for (const d of list.paired) {
    const key = [d.clientId, d.clientMode, d.displayName, d.browserOrigin]
      .map((v) => String(v || '').toLowerCase().trim())
      .join('|');
    // Records without any identifying field cannot be grouped safely.
    if (key === '|||') continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(d);
  }

  const candidates = [];
  for (const members of groups.values()) {
    if (members.length < 2) continue;
    const sorted = [...members].sort(
      (a, b) => (b.lastSeenAtMs || b.approvedAtMs || 0) - (a.lastSeenAtMs || a.approvedAtMs || 0),
    );
    for (const stale of sorted.slice(1)) {
      candidates.push({
        deviceId: stale.deviceId,
        label: stale.displayName || stale.clientId || 'unknown',
        platform: stale.platform || null,
        lastSeenAt: stale.lastSeenAtMs || null,
      });
    }
  }

  if (dryRun || candidates.length === 0) {
    return { ok: true, candidates, removed: [], dryRun: true };
  }

  const removed = [];
  for (const c of candidates) {
    const res = await removePaired(c.deviceId);
    if (res.ok) removed.push(c.deviceId);
  }
  await appendLog(paths.pairingLog, `PRUNED ${removed.length} duplicate device(s)`);
  return { ok: true, candidates, removed, dryRun: false };
}

module.exports = {
  pollOnce,
  pruneDuplicates,
  startLoop,
  stopLoop,
  refreshLoop,
  approveRequest,
  rejectRequest,
  removePaired,
  fetchDevices,
  snapshot,
  overview,
  onEvent,
  isRoleAllowed,
  _state: state,
};
