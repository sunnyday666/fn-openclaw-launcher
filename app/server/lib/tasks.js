'use strict';

/**
 * Long-running task registry.
 *
 * Installing OpenClaw takes minutes and restarting the gateway takes seconds;
 * neither can block an HTTP response. Tasks run in the background and the UI
 * polls (or streams via SSE) for progress and the log tail.
 */

const fsp = require('node:fs/promises');
const path = require('node:path');
const paths = require('./paths');
const { appendLog, randomToken } = require('./util');

const tasks = new Map();
const MAX_TASKS = 40;

function create(kind, title) {
  const id = `${kind}-${Date.now().toString(36)}-${randomToken(4)}`;
  const task = {
    id,
    kind,
    title,
    state: 'running',
    startedAt: new Date().toISOString(),
    finishedAt: null,
    progress: 0,
    message: '准备中…',
    logs: [],
    result: null,
    error: null,
  };
  tasks.set(id, task);

  // Keep the registry bounded.
  if (tasks.size > MAX_TASKS) {
    const oldest = [...tasks.values()]
      .filter((t) => t.state !== 'running')
      .sort((a, b) => (a.startedAt < b.startedAt ? -1 : 1));
    for (const stale of oldest.slice(0, tasks.size - MAX_TASKS)) tasks.delete(stale.id);
  }

  return task;
}

function log(task, line) {
  if (!task) return;
  const text = String(line).replace(/\s+$/, '');
  if (!text) return;
  task.logs.push(text);
  if (task.logs.length > 500) task.logs.splice(0, task.logs.length - 500);
  task.message = text.slice(0, 300);
}

function progress(task, value, message) {
  if (!task) return;
  task.progress = Math.max(0, Math.min(100, Math.round(value)));
  if (message) task.message = message;
}

function finish(task, result) {
  if (!task) return;
  task.state = 'success';
  task.progress = 100;
  task.result = result ?? null;
  task.finishedAt = new Date().toISOString();
}

function fail(task, error) {
  if (!task) return;
  task.state = 'error';
  task.error = {
    message: error && error.message ? error.message : String(error),
    code: error && error.code ? error.code : 'EUNKNOWN',
    detail: error && error.detail ? String(error.detail).slice(0, 4000) : null,
    hint: error && error.hint ? error.hint : null,
  };
  task.finishedAt = new Date().toISOString();
}

function get(id) {
  return tasks.get(id) || null;
}

function list() {
  return [...tasks.values()]
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1))
    .slice(0, MAX_TASKS)
    .map((t) => ({
      id: t.id,
      kind: t.kind,
      title: t.title,
      state: t.state,
      progress: t.progress,
      message: t.message,
      startedAt: t.startedAt,
      finishedAt: t.finishedAt,
      error: t.error,
      result: t.result,
    }));
}

/** The single running task of a given kind, if any. */
function runningOfKind(kind) {
  return [...tasks.values()].find((t) => t.kind === kind && t.state === 'running') || null;
}

/** Reject overlapping runs of the same kind so two installs cannot race. */
function guard(kind, title) {
  const existing = runningOfKind(kind);
  if (existing) {
    const err = new Error(`已有进行中的任务：${existing.title}`);
    err.code = 'EBUSY';
    err.taskId = existing.id;
    throw err;
  }
  return create(kind, title);
}

module.exports = { create, log, progress, finish, fail, get, list, runningOfKind, guard, tasks };
