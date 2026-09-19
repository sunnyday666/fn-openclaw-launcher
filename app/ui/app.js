/* ==========================================================================
   OpenClaw 工作室 — launcher UI
   Framework-free SPA. Everything is relative to the document so the same code
   works standalone (launcher TCP port) and embedded in the fnOS desktop
   (served through the app's unix socket behind /app/openclaw.studio).
   ========================================================================== */

// ---------------------------------------------------------------- API access

const HERE = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
const API_BASE = HERE.replace(/\/$/, '');

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}/api/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`服务器返回了非 JSON 响应 (HTTP ${res.status})`);
  }
  if (!json.ok) {
    const err = new Error(json.error?.message || '请求失败');
    err.code = json.error?.code;
    err.detail = json.error?.detail;
    err.hint = json.error?.hint;
    throw err;
  }
  return json.data;
}

// ------------------------------------------------------------------ helpers

const $ = (sel, root = document) => root.querySelector(sel);

/** Escape untrusted text before it goes anywhere near innerHTML. */
function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function bytes(n) {
  if (!Number.isFinite(n)) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(v >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function duration(sec) {
  if (!Number.isFinite(sec)) return '—';
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (d) return `${d}天 ${h}小时`;
  if (h) return `${h}小时 ${m}分`;
  if (m) return `${m}分 ${Math.floor(sec % 60)}秒`;
  return `${Math.floor(sec)}秒`;
}

function timeAgo(ts) {
  if (!ts) return '—';
  const n = typeof ts === 'number' ? (ts > 1e12 ? ts : ts * 1000) : Date.parse(ts);
  if (!Number.isFinite(n)) return '—';
  const diff = Math.max(0, Date.now() - n) / 1000;
  if (diff < 60) return `${Math.floor(diff)} 秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
}

function toast(title, desc = '', kind = '') {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.innerHTML = `<div class="toast-title">${esc(title)}</div>${desc ? `<div class="toast-desc">${esc(desc)}</div>` : ''}`;
  $('#toasts').appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity .3s';
    setTimeout(() => el.remove(), 320);
  }, kind === 'err' ? 7000 : 3800);
}

function modal({ title, body, footer, wide = false }) {
  const root = $('#modal-root');
  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">
        <div class="modal-head">
          <h3 class="modal-title">${esc(title)}</h3>
          <button class="btn btn-ghost btn-sm" data-close style="margin-left:auto">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-foot">${footer}</div>` : ''}
      </div>
    </div>`;
  const close = () => {
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);
  root.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  root.querySelector('.modal-backdrop').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) close();
  });
  return { close, root };
}

/**
 * Confirmation that requires typing an exact phrase — for destructive actions
 * where a single click is too easy to trigger by accident.
 */
function confirmTyped({ title, message, phrase, confirmLabel = '确认执行' }) {
  return new Promise((resolve) => {
    const m = modal({
      title,
      body: `<p style="margin:0 0 12px">${esc(message)}</p>
        <div class="field" style="margin-bottom:0">
          <label class="field-label">请输入 <code>${esc(phrase)}</code> 以继续</label>
          <input type="text" id="ct-input" autocomplete="off" spellcheck="false" placeholder="${esc(phrase)}" />
        </div>`,
      footer: `<button class="btn" data-no>取消</button>
               <button class="btn btn-danger" data-yes disabled>${esc(confirmLabel)}</button>`,
    });
    const input = m.root.querySelector('#ct-input');
    const yes = m.root.querySelector('[data-yes]');
    input.addEventListener('input', () => {
      yes.disabled = input.value.trim() !== phrase;
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !yes.disabled) {
        m.close();
        resolve(true);
      }
    });
    setTimeout(() => input.focus(), 50);
    m.root.querySelector('[data-no]').onclick = () => {
      m.close();
      resolve(false);
    };
    yes.onclick = () => {
      m.close();
      resolve(true);
    };
  });
}

function confirmDialog(title, message, confirmLabel = '确定') {
  return new Promise((resolve) => {
    const m = modal({
      title,
      body: `<p style="margin:0">${esc(message)}</p>`,
      footer: `<button class="btn" data-no>取消</button>
               <button class="btn btn-danger" data-yes>${esc(confirmLabel)}</button>`,
    });
    m.root.querySelector('[data-no]').onclick = () => {
      m.close();
      resolve(false);
    };
    m.root.querySelector('[data-yes]').onclick = () => {
      m.close();
      resolve(true);
    };
  });
}

// -------------------------------------------------------------------- state

const state = {
  panel: 'overview',
  status: null,
  system: null,
  config: null,
  devices: null,
  logTab: 'gateway',
  logAuto: true,
  loading: false,
  installTaskId: null,
  lastError: null,
};

const PANELS = [
  { id: 'overview', icon: '◈', title: '总览', desc: '运行状态与快速操作' },
  { id: 'service', icon: '⚙', title: '服务设置', desc: '网关端口、认证与启动方式' },
  { id: 'devices', icon: '⛨', title: '设备与配对', desc: '自动注册与已授权设备' },
  { id: 'logs', icon: '≡', title: '运行日志', desc: '网关、安装与配对记录' },
  { id: 'advanced', icon: '⚗', title: '高级', desc: '系统信息与原始配置' },
];

// ------------------------------------------------------------------ sidebar

function renderSidebar() {
  const pendingCount = state.devices?.pending?.length || 0;
  $('#sidebar').innerHTML = `
    <div class="brand">
      <div class="brand-mark">OC</div>
      <div class="brand-text">
        <div class="brand-title">OpenClaw 管家</div>
        <div class="brand-sub">飞牛 fnOS 启动器</div>
      </div>
    </div>
    ${PANELS.map(
      (p) => `
      <button class="nav-item ${state.panel === p.id ? 'active' : ''}" data-panel="${p.id}">
        <span class="nav-icon">${p.icon}</span>
        <span>${esc(p.title)}</span>
        ${p.id === 'devices' && pendingCount ? `<span class="badge badge-warn">${pendingCount}</span>` : ''}
      </button>`,
    ).join('')}
    <div class="sidebar-foot">
      ${state.status?.gateway?.running
        ? `<span class="badge badge-ok"><span class="dot dot-pulse"></span> 网关运行中</span>`
        : `<span class="badge badge-err"><span class="dot"></span> 网关未运行</span>`}
    </div>`;

  $('#sidebar')
    .querySelectorAll('[data-panel]')
    .forEach((b) => b.addEventListener('click', () => go(b.dataset.panel)));
}

function go(panel) {
  state.panel = panel;
  location.hash = panel === 'overview' ? '' : panel;
  render();
  refresh(true);
}

// ------------------------------------------------------------------ refresh

async function refresh(showSpinner = false) {
  if (state.loading) return;
  state.loading = true;
  if (showSpinner) renderSkeletonIfEmpty();
  try {
    const [status, devices] = await Promise.all([api('status'), api('devices').catch(() => null)]);
    state.status = status;
    state.devices = devices;
    state.lastError = null;
  } catch (err) {
    state.lastError = err;
  } finally {
    state.loading = false;
    render();
  }
}

function renderSkeletonIfEmpty() {
  if (state.status) return;
  $('#main').innerHTML = `
    <div class="skeleton" style="height:34px;width:240px;margin-bottom:20px"></div>
    <div class="skeleton" style="height:130px;margin-bottom:16px"></div>
    <div class="skeleton" style="height:200px"></div>`;
}

// ------------------------------------------------------------------- render

function render() {
  renderSidebar();
  const meta = PANELS.find((p) => p.id === state.panel) || PANELS[0];
  const body = state.lastError && !state.status
    ? errorPanel(state.lastError)
    : { overview: overviewPanel, service: servicePanel, devices: devicesPanel, logs: logsPanel, advanced: advancedPanel }[state.panel]();

  $('#main').innerHTML = `
    <div class="page-head">
      <h1 class="page-title">${esc(meta.title)}</h1>
      <p class="page-desc">${esc(meta.desc)}</p>
    </div>
    ${body}`;

  wire();

  // Post-render work that needs the DOM to already exist.
  if ($('#links')) loadControlLinks();
}

function errorPanel(err) {
  return `<div class="alert alert-err">
      <div class="alert-body">
        <div class="alert-title">无法连接启动器服务</div>
        <div>${esc(err.message)}</div>
        ${err.detail ? `<div class="alert-detail">${esc(err.detail)}</div>` : ''}
      </div>
    </div>
    <button class="btn btn-primary" data-act="reload">重试</button>`;
}

function alertBox(kind, title, text = '', detail = '') {
  return `<div class="alert alert-${kind}">
      <div class="alert-body">
        <div class="alert-title">${esc(title)}</div>
        ${text ? `<div>${text}</div>` : ''}
        ${detail ? `<div class="alert-detail">${esc(detail)}</div>` : ''}
      </div>
    </div>`;
}

// ------------------------------------------------------------------ overview

function overviewPanel() {
  const s = state.status;
  if (!s) return `<div class="skeleton" style="height:200px"></div>`;

  const gw = s.gateway;
  const setup = s.setup;
  const activeTask = s.tasks?.find((t) => t.state === 'running');

  const steps = [
    {
      title: gw.nodeVersion ? `准备 Node ${gw.nodeVersion}` : '准备 Node',
      desc: gw.nodeVersion ? '运行时已就绪' : '尚未安装',
      done: !!gw.nodeVersion,
      active: !gw.nodeVersion,
    },
    { title: '安装 OpenClaw', desc: s.openclaw.version ? `已安装 ${s.openclaw.version}` : '尚未安装', done: !!s.openclaw.version, active: !!gw.nodeVersion && !s.openclaw.version },
    { title: '启动网关服务', desc: gw.running ? `运行中 (端口 ${gw.port})` : '未运行', done: gw.running, active: !!s.openclaw.version && !gw.running },
    (() => {
      const paired = state.devices?.paired?.length || 0;
      return {
        title: '打开控制台并自动注册',
        desc: paired
          ? `已注册 ${paired} 台设备`
          : gw.running
            ? '点击「打开 OpenClaw」即可自动登记本机浏览器'
            : '等待网关启动',
        done: paired > 0,
        active: gw.running && paired === 0,
      };
    })(),
  ];

  let html = '';

  if (activeTask) {
    html += `<div class="card"><div class="card-head">
        <h3 class="card-title">正在执行：${esc(activeTask.title)}</h3>
      </div><div class="card-body">
        <div>${esc(activeTask.message || '')}</div>
        <div class="progress"><div class="progress-bar" style="width:${activeTask.progress || 0}%"></div></div>
      </div></div>`;
  }

  if (!gw.installed) {
    html += alertBox('info', '首次使用', '点击下方「一键安装」将自动下载 Node.js 运行时并安装 OpenClaw，约需 1–3 分钟。');
  }

  html += `<div class="grid grid-4" style="margin-bottom:16px">
    <div class="stat">
      <div class="stat-label">网关状态</div>
      <div class="stat-value">${gw.running ? '运行中' : '已停止'}</div>
      <div class="stat-note">${esc(gw.running ? `端口 ${gw.port} · PID ${gw.pid}` : '尚未启动')}</div>
    </div>
    <div class="stat">
      <div class="stat-label">OpenClaw</div>
      <div class="stat-value" style="font-size:16px">${esc(s.openclaw.version || '未安装')}</div>
      <div class="stat-note">Node ${esc(gw.nodeVersion || '—')}</div>
    </div>
    <div class="stat">
      <div class="stat-label">已注册设备</div>
      <div class="stat-value">${state.devices?.paired?.length ?? '—'}</div>
      <div class="stat-note">${state.devices?.pending?.length ? `${state.devices.pending.length} 个待批准` : '自动注册已开启'}</div>
    </div>
    <div class="stat">
      <div class="stat-label">自动注册</div>
      <div class="stat-value" style="font-size:16px">${s.pairing.enabled ? '已启用' : '已关闭'}</div>
      <div class="stat-note">累计批准 ${s.pairing.stats.approvals} 次</div>
    </div>
  </div>`;

  html += `<div class="card">
    <div class="card-head">
      <div>
        <h3 class="card-title">部署进度</h3>
        <p class="card-sub">四个步骤完成后即可在飞牛桌面中直接使用</p>
      </div>
      <div class="card-actions">
        ${!gw.installed ? `<button class="btn btn-primary" data-act="install">一键安装</button>` : ''}
        ${gw.installed && !gw.running ? `<button class="btn btn-primary" data-act="gw-start">启动网关</button>` : ''}
        ${gw.running ? `<button class="btn btn-primary" data-act="open-ui">打开 OpenClaw</button>` : ''}
        ${gw.running ? `<button class="btn" data-act="gw-restart">重启</button>` : ''}
        ${gw.running ? `<button class="btn" data-act="gw-stop">停止</button>` : ''}
        ${gw.installed ? `<button class="btn" data-act="install" data-reinstall="0">检查更新</button>` : ''}
      </div>
    </div>
    <div class="card-body" style="padding:4px 8px">
      <div class="steps">
        ${steps
          .map(
            (st, i) => `<div class="step ${st.done ? 'done' : st.active ? 'active' : ''}">
          <div class="step-num">${st.done ? '✓' : i + 1}</div>
          <div class="step-text">
            <div class="step-title">${esc(st.title)}</div>
            <div class="step-desc">${esc(st.desc)}</div>
          </div>
        </div>`,
          )
          .join('')}
      </div>
    </div>
  </div>`;

  if (gw.running) {
    html += `<div class="card">
      <div class="card-head">
        <div>
          <h3 class="card-title">访问地址</h3>
          <p class="card-sub">通过「自动注册地址」打开时，浏览器会被 OpenClaw 自动登记，无需手动批准</p>
        </div>
      </div>
      <div class="card-body" id="links"><span class="dim">正在获取…</span></div>
    </div>`;
  }

  if (gw.lastError) {
    html += alertBox('err', '上次启动失败', '', gw.lastError);
  }

  return html;
}

async function loadControlLinks() {
  const box = $('#links');
  if (!box) return;
  try {
    const link = await api('gateway/control-link');
    const proxied = link.absoluteUrl || `${API_BASE}/${link.proxiedUrl}`;
    box.innerHTML = `
      <div class="field">
        <label class="field-label">自动注册地址（推荐）</label>
        <div class="row">
          <input type="text" class="grow mono" readonly value="${esc(proxied)}" />
          <button class="btn btn-primary" data-act="open-ui">打开 OpenClaw</button>
        </div>
        <div class="field-hint">${esc(link.note)}</div>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="field-label">直连地址</label>
        <div class="row">
          <input type="text" class="grow mono" readonly value="${esc(link.directUrl)}" />
          <button class="btn" data-act="copy" data-value="${esc(link.directUrl)}">复制</button>
        </div>
        <div class="field-hint">从局域网直接访问网关端口，首次使用需要在 OpenClaw 控制台内手动批准设备。</div>
      </div>`;
    wire();
  } catch (err) {
    box.innerHTML = `<span class="dim">${esc(err.message)}</span>`;
  }
}

// ------------------------------------------------------------------- service

function servicePanel() {
  const s = state.status;
  if (!s) return `<div class="skeleton" style="height:200px"></div>`;
  const cfg = s.settings;
  const gw = s.gateway;

  return `
    ${alertBox('info', '修改端口或认证方式后需要重启网关才会生效。')}

    <div class="card">
      <div class="card-head"><h3 class="card-title">网关服务</h3>
        <div class="card-actions">
          ${gw.running ? `<button class="btn" data-act="gw-restart">重启网关</button>
                          <button class="btn btn-danger" data-act="gw-stop">停止</button>`
                       : `<button class="btn btn-primary" data-act="gw-start">启动网关</button>`}
        </div>
      </div>
      <div class="card-body">
        <dl class="kv">
          <dt>状态</dt><dd>${gw.running ? `<span class="badge badge-ok"><span class="dot dot-pulse"></span> 运行中</span>` : '<span class="badge badge-err"><span class="dot"></span> 已停止</span>'}</dd>
          <dt>进程 PID</dt><dd>${esc(gw.pid || '—')}</dd>
          <dt>监听端口</dt><dd>${esc(gw.port)}</dd>
          <dt>绑定范围</dt><dd>${esc(gw.bind === 'lan' ? '局域网 (lan)' : gw.bind)}</dd>
          <dt>健康检查</dt><dd>${gw.reachable?.ok ? `<span class="badge badge-ok">正常 (HTTP ${gw.reachable.httpStatus})</span>` : `<span class="badge badge-warn">${esc(gw.reachable?.reason || '不可达')}</span>`}</dd>
        </dl>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3 class="card-title">网络与认证</h3></div>
      <div class="card-body">
        <div class="row">
          <div class="field grow" style="max-width:220px">
            <label class="field-label">网关端口</label>
            <input type="number" id="set-port" min="1024" max="65535" value="${esc(cfg.gateway.port)}" />
            <div class="field-hint" id="port-hint">修改前请确认端口未被占用</div>
          </div>
          <button class="btn" data-act="check-port" style="margin-bottom:13px">检测端口</button>
        </div>
        <div class="field">
          <label class="field-label">绑定范围</label>
          <select id="set-bind">
            <option value="lan" ${cfg.gateway.bind === 'lan' ? 'selected' : ''}>局域网 (lan) — 同一网络内均可访问</option>
            <option value="loopback" ${cfg.gateway.bind === 'loopback' ? 'selected' : ''}>仅本机 (loopback) — 只能通过启动器访问</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">认证方式</label>
          <select id="set-auth">
            <option value="token" ${cfg.gateway.authMode === 'token' ? 'selected' : ''}>令牌 (token) — 推荐</option>
            <option value="none" ${cfg.gateway.authMode === 'none' ? 'selected' : ''}>无认证 — 仅在完全可信的网络中使用</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">访问令牌</label>
          <div class="row">
            <input type="text" class="grow mono" id="set-token" value="${esc(cfg.gateway.token)}" />
            <button class="btn" data-act="regen-token">重新生成</button>
            <button class="btn" data-act="copy" data-value="${esc(cfg.gateway.token)}">复制</button>
          </div>
          <div class="field-hint">浏览器首次打开控制台时用它完成网关认证，请勿外泄。</div>
        </div>
        <label class="switch">
          <input type="checkbox" id="set-fakeip" ${cfg.network.allowFakeIp ? 'checked' : ''} />
          <span class="switch-text">
            <span class="switch-title">兼容 Fake-IP DNS（Clash / sing-box）</span>
            <span class="switch-desc">放行 RFC2544 网段与 IPv6 ULA，避免 Clash / sing-box 等代理环境下 OpenClaw 自身的网络请求被拦截</span>
          </span>
        </label>
        <label class="switch">
          <input type="checkbox" id="set-autostart" ${cfg.gateway.autoStart ? 'checked' : ''} />
          <span class="switch-text">
            <span class="switch-title">应用启动时自动启动网关</span>
            <span class="switch-desc">飞牛开机后随应用一起拉起 OpenClaw 服务</span>
          </span>
        </label>
        <label class="switch">
          <input type="checkbox" id="set-autoinstall" ${cfg.openclaw.autoInstall ? 'checked' : ''} />
          <span class="switch-text">
            <span class="switch-title">首次启动自动安装 OpenClaw</span>
            <span class="switch-desc">打开应用后自动下载运行时与 OpenClaw（约 100-200 MB），无需手动点击安装</span>
          </span>
        </label>
        <div style="margin-top:14px">
          <button class="btn btn-primary" data-act="save-settings">保存设置</button>
          <button class="btn" data-act="save-restart">保存并重启网关</button>
        </div>
      </div>
    </div>`;
}

// ------------------------------------------------------------------- devices

function devicesPanel() {
  const d = state.devices;
  const s = state.status;
  if (!d || !s) return `<div class="skeleton" style="height:220px"></div>`;
  const cfg = s.settings.pairing;

  return `
    ${alertBox(
      'ok',
      '自动注册已生效',
      '通过启动器打开 OpenClaw 时，浏览器会以本机回环地址访问网关，OpenClaw 会自动完成设备登记，无需任何手动批准。',
    )}

    <div class="card">
      <div class="card-head">
        <div>
          <h3 class="card-title">自动注册</h3>
          <p class="card-sub">打开控制台即自动完成设备配对</p>
        </div>
        <div class="card-actions">
          <button class="btn" data-act="scan">立即扫描</button>
        </div>
      </div>
      <div class="card-body">
        <label class="switch">
          <input type="checkbox" id="pair-auto" ${cfg.autoApprove ? 'checked' : ''} />
          <span class="switch-text">
            <span class="switch-title">自动批准待配对设备</span>
            <span class="switch-desc">监听网关配对状态并自动批准；事件驱动，空闲时不消耗资源</span>
          </span>
        </label>
        <div class="alert alert-info" style="margin-top:10px">
          <div class="alert-body">
            <div class="alert-title">
              触发方式：${d.engine.watching ? '事件驱动（推荐）' : '定时轮询'}
            </div>
            <div>
              ${
                d.engine.watching
                  ? '启动器监听网关状态数据库的写入，配对请求一产生就立即处理——空闲时不发起任何请求、不占用 CPU。'
                  : '当前无法使用文件系统通知，已降级为定时轮询。'
              }
            </div>
          </div>
        </div>
        <div class="row" style="margin-top:8px">
          <div class="field grow" style="max-width:220px">
            <label class="field-label">兜底巡检间隔（秒）</label>
            <input type="number" id="pair-fallback" min="30" max="3600" step="30"
                   value="${esc(Math.round((cfg.fallbackIntervalMs ?? 300000) / 1000))}" />
            <div class="field-hint">仅在事件丢失或不可用时生效</div>
          </div>
          <div class="field grow" style="max-width:200px">
            <label class="field-label">每分钟最多批准</label>
            <input type="number" id="pair-rate" min="1" max="600" value="${esc(cfg.maxApprovalsPerMinute)}" />
          </div>
          <button class="btn btn-primary" data-act="save-pairing" style="margin-bottom:13px">保存</button>
        </div>
        <dl class="kv" style="margin-top:12px">
          <dt>引擎状态</dt><dd>${d.engine.running ? `<span class="badge badge-ok">运行中</span> <span class="faint">${esc(d.engine.mode || '')}</span>` : '<span class="badge">已停止</span>'}</dd>
          <dt>最近触发</dt><dd>${esc(timeAgo(d.engine.stats.lastTriggerAt || d.engine.lastPollAt))}${d.engine.lastTrigger ? ` <span class="faint mono">${esc(String(d.engine.lastTrigger).slice(0, 40))}</span>` : ''}</dd>
          <dt>累计</dt><dd>批准 ${d.engine.stats.approvals} 次 · 失败 ${d.engine.stats.failures} 次 · 检查 ${d.engine.stats.polls} 次</dd>
          ${d.engine.lastError ? `<dt>最近错误</dt><dd class="faint">${esc(d.engine.lastError)}</dd>` : ''}
        </dl>
      </div>
    </div>

    ${
      d.pending.length
        ? alertBox(
            'warn',
            '这些请求需要手动批准',
            '从局域网直接访问网关端口（18789）时，飞牛 OpenClaw 要求管理员批准设备，而启动器持有的令牌没有 <code>operator.admin</code> 权限，无法代为批准。请在 OpenClaw 控制台的设备页面批准，或改用「自动注册地址」打开（走本机回环，无需批准）。',
          )
        : ''
    }

    <div class="card">
      <div class="card-head">
        <h3 class="card-title">待批准请求</h3>
        <div class="card-actions">
          ${d.pending.length ? `<button class="btn btn-primary" data-act="approve-all">全部批准</button>` : ''}
        </div>
      </div>
      ${
        d.pending.length === 0
          ? `<div class="empty"><span class="empty-icon">✓</span>没有待批准的设备</div>`
          : `<table>
              <thead><tr><th>设备</th><th>角色</th><th>来源 IP</th><th>请求时间</th><th></th></tr></thead>
              <tbody>
                ${d.pending
                  .map(
                    (p) => `<tr>
                    <td><strong>${esc(p.label)}</strong><div class="faint mono truncate">${esc(p.requestId || '')}</div></td>
                    <td><span class="badge badge-info">${esc(p.role || '—')}</span></td>
                    <td class="mono dim">${esc(p.remoteIp || '—')}</td>
                    <td class="dim nowrap">${esc(timeAgo(p.requestedAt))}</td>
                    <td class="td-actions">
                      <button class="btn btn-sm btn-primary" data-act="approve" data-id="${esc(p.requestId)}">批准</button>
                      <button class="btn btn-sm btn-danger" data-act="reject" data-id="${esc(p.requestId)}">拒绝</button>
                    </td>
                  </tr>`,
                  )
                  .join('')}
              </tbody>
            </table>`
      }
    </div>

    <div class="card">
      <div class="card-head">
        <div>
          <h3 class="card-title">已注册设备</h3>
          <p class="card-sub">
            共 ${d.paired.length} 个 · 同一浏览器只会保留一条记录，重新注册后旧记录会在约 60 秒内被自动清理
          </p>
        </div>
        <div class="card-actions">
          ${d.paired.length > 1 ? `<button class="btn" data-act="prune-devices">清理重复设备</button>` : ''}
        </div>
      </div>
      ${
        d.paired.length === 0
          ? `<div class="empty"><span class="empty-icon">⛨</span>还没有设备完成注册<br/>打开一次 OpenClaw 控制台即可自动登记</div>`
          : `<table>
              <thead><tr><th>设备</th><th>角色</th><th>来源</th><th>批准方式</th><th>最近活跃</th><th></th></tr></thead>
              <tbody>
                ${d.paired
                  .map(
                    (p) => `<tr>
                    <td><strong>${esc(p.label)}</strong><div class="faint mono truncate">${esc((p.deviceId || '').slice(0, 24))}…</div></td>
                    <td><span class="badge badge-info">${esc(p.role || '—')}</span></td>
                    <td class="mono dim">${esc(p.remoteIp || '—')}</td>
                    <td>${p.approvedVia === 'silent' ? '<span class="badge badge-ok">自动注册</span>' : `<span class="badge">${esc(p.approvedVia || '手动')}</span>`}</td>
                    <td class="dim nowrap">${esc(timeAgo(p.lastSeenAt))}</td>
                    <td class="td-actions">
                      <button class="btn btn-sm btn-danger" data-act="remove-device" data-id="${esc(p.deviceId)}">移除</button>
                    </td>
                  </tr>`,
                  )
                  .join('')}
              </tbody>
            </table>`
      }
    </div>

    ${
      d.engine.recent.length
        ? `<div class="card">
            <div class="card-head"><h3 class="card-title">自动批准记录</h3></div>
            <table>
              <thead><tr><th>设备</th><th>角色</th><th>方式</th><th>时间</th></tr></thead>
              <tbody>
                ${d.engine.recent
                  .map(
                    (r) => `<tr>
                    <td>${esc(r.label || '—')}</td>
                    <td class="dim">${esc(r.role || '—')}</td>
                    <td><span class="badge ${r.source === 'auto' ? 'badge-ok' : ''}">${esc(r.source)}</span></td>
                    <td class="dim nowrap">${esc(timeAgo(r.approvedAt))}</td>
                  </tr>`,
                  )
                  .join('')}
              </tbody>
            </table>
          </div>`
        : ''
    }`;
}

// ---------------------------------------------------------------------- logs

function logsPanel() {
  return `
    <div class="card">
      <div class="card-head">
        <div class="row" style="gap:6px">
          ${['gateway', 'install', 'pairing']
            .map(
              (t) =>
                `<button class="btn btn-sm ${state.logTab === t ? 'btn-primary' : ''}" data-act="log-tab" data-tab="${t}">${
                  { gateway: '网关日志', install: '安装日志', pairing: '配对日志' }[t]
                }</button>`,
            )
            .join('')}
        </div>
        <div class="card-actions">
          <label class="switch" style="padding:0">
            <input type="checkbox" id="log-auto" ${state.logAuto ? 'checked' : ''} />
            <span class="switch-title">自动刷新</span>
          </label>
          <button class="btn btn-sm" data-act="log-refresh">刷新</button>
        </div>
      </div>
      <div class="card-body">
        <pre class="log" id="log-box">加载中…</pre>
      </div>
    </div>`;
}

async function loadLog() {
  const box = $('#log-box');
  if (!box) return;
  try {
    const data = await api(`logs?file=${encodeURIComponent(state.logTab)}&lines=400`);
    const atBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 30;
    box.textContent = data.lines?.trim() || '（暂无日志）';
    if (atBottom) box.scrollTop = box.scrollHeight;
  } catch (err) {
    box.textContent = `读取日志失败：${err.message}`;
  }
}

// ------------------------------------------------------------------ advanced

function advancedPanel() {
  const sys = state.system;
  const s = state.status;
  if (!sys || !s) {
    loadSystem();
    return `<div class="skeleton" style="height:220px"></div>`;
  }
  return `
    <div class="card">
      <div class="card-head"><h3 class="card-title">系统信息</h3>
        <div class="card-actions"><button class="btn btn-sm" data-act="refresh-sys">刷新</button></div>
      </div>
      <div class="card-body">
        <dl class="kv">
          <dt>主机名</dt><dd>${esc(sys.hostname)}</dd>
          <dt>系统</dt><dd>${esc(sys.platform)} · ${esc(sys.arch)}</dd>
          <dt>CPU</dt><dd>${esc(sys.cpuModel)} (${sys.cpuCount} 核)</dd>
          <dt>内存</dt><dd>${bytes(sys.memory.used)} / ${bytes(sys.memory.total)} (${sys.memory.percent}%)</dd>
          ${sys.disk ? `<dt>数据盘</dt><dd>${bytes(sys.disk.used)} / ${bytes(sys.disk.total)} (${sys.disk.percent}%)</dd>` : ''}
          <dt>系统运行</dt><dd>${esc(duration(sys.uptimeSec))}</dd>
          <dt>内置 Node</dt><dd class="mono">${esc(sys.node.vendored || '未安装')}</dd>
          <dt>OpenClaw</dt><dd class="mono">${esc(sys.openclaw.version || '未安装')}</dd>
          <dt>IP 地址</dt><dd class="mono">${esc((sys.addresses || []).join(', ') || '—')}</dd>
          <dt>数据目录</dt><dd class="mono">${esc(sys.dataDir)}</dd>
        </dl>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3 class="card-title">运维操作</h3></div>
      <div class="card-body">
        <div class="row">
          <button class="btn" data-act="upgrade-runtime">更新 NODE 版本</button>
          <button class="btn" data-act="install" data-reinstall="1">重新安装 OpenClaw</button>
          <button class="btn" data-act="open-ui">打开 OpenClaw</button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3 class="card-title">OpenClaw 原始配置</h3>
        <div class="card-actions"><button class="btn btn-sm" data-act="load-raw">加载</button></div>
      </div>
      <div class="card-body">
        <pre class="log" id="raw-config">点击「加载」查看 ${esc(sys.dataDir)}/ocstate/openclaw.json</pre>
      </div>
    </div>`;
}

async function loadSystem() {
  try {
    state.system = await api('system');
    if (state.panel === 'advanced') render();
  } catch (err) {
    toast('无法读取系统信息', err.message, 'err');
  }
}

// ---------------------------------------------------------------------- wire

function wire() {
  const root = $('#main');

  root.querySelectorAll('[data-act]').forEach((el) => {
    el.addEventListener('click', () => act(el.dataset.act, el));
  });

  const logAuto = $('#log-auto');
  if (logAuto) logAuto.addEventListener('change', (e) => {
    state.logAuto = e.target.checked;
  });

  if (state.panel === 'logs') loadLog();
}

async function act(name, el) {
  try {
    switch (name) {
      case 'reload':
        await refresh(true);
        break;

      case 'install': {
        if (el.dataset.reinstall === '1') {
          const ok = await confirmTyped({
            title: '重新安装 OpenClaw',
            message:
              '将删除当前安装并重新下载与本机兼容的最新版本。模型与渠道配置保存在 openclaw.json 中不会丢失，但安装期间网关不可用。',
            phrase: '确认重新安装',
            confirmLabel: '重新安装',
          });
          if (!ok) break;
        }
        await doInstall(el);
        break;
      }

      case 'gw-start':
        await withBusy(el, () => api('gateway/start', { method: 'POST' }), '网关已启动');
        await refresh();
        break;
      case 'gw-stop':
        if (await confirmDialog('停止网关', '停止后 OpenClaw 控制台将无法访问，确定继续？', '停止')) {
          await withBusy(el, () => api('gateway/stop', { method: 'POST' }), '网关已停止');
        }
        await refresh();
        break;
      case 'gw-restart':
        await withBusy(el, () => api('gateway/restart', { method: 'POST' }), '网关已重启');
        await refresh();
        break;

      case 'open-ui': {
        const link = await api('gateway/control-link');
        // Prefer the launcher's own port: there the Control UI is same-origin
        // at the root, so its root-absolute asset paths resolve. Going through
        // the fnOS portal prefix would break them. Requests to this port still
        // arrive at the gateway over loopback, so registration stays automatic.
        const url = link.absoluteUrl || `${API_BASE}/${link.proxiedUrl}`;
        window.open(url, '_blank', 'noopener');
        break;
      }

      case 'copy':
        await navigator.clipboard.writeText(el.dataset.value || '');
        toast('已复制到剪贴板');
        break;

      case 'regen-token': {
        const bytes = new Uint8Array(24);
        crypto.getRandomValues(bytes);
        const token = btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, '').slice(0, 32);
        $('#set-token').value = token;
        toast('已生成新令牌', '记得点击「保存设置」', '');
        break;
      }

      case 'check-port': {
        const port = $('#set-port').value;
        const res = await api(`gateway/port?port=${encodeURIComponent(port)}`);
        const hint = $('#port-hint');
        if (res.available || res.self) {
          hint.innerHTML = `<span class="badge badge-ok">端口可用</span>`;
        } else {
          hint.innerHTML = `<span class="badge badge-err">端口已被占用</span> <span class="faint">${esc(res.occupant || '')}</span>`;
        }
        break;
      }

      case 'save-settings':
        await saveSettings(false, el);
        break;
      case 'save-restart':
        await saveSettings(true, el);
        break;

      case 'log-tab':
        state.logTab = el.dataset.tab;
        render();
        break;
      case 'log-refresh':
        await loadLog();
        break;


      case 'scan': {
        const res = await withBusy(el, () => api('devices/scan', { method: 'POST' }));
        toast('扫描完成', res?.approved?.length ? `自动批准 ${res.approved.length} 个设备` : '没有新的待批准设备');
        await refresh();
        break;
      }
      case 'approve':
        await api('devices/approve', { method: 'POST', body: { requestId: el.dataset.id } });
        toast('已批准');
        await refresh();
        break;
      case 'reject':
        await api('devices/reject', { method: 'POST', body: { requestId: el.dataset.id } });
        toast('已拒绝');
        await refresh();
        break;
      case 'approve-all': {
        const res = await withBusy(el, () => api('devices/approve-all', { method: 'POST' }));
        toast('处理完成', `成功批准 ${res?.approved ?? 0} 个设备`);
        await refresh();
        break;
      }
      case 'prune-devices': {
        const preview = await api('devices/prune', { method: 'POST', body: { dryRun: true } });
        if (!preview.candidates.length) {
          toast('没有需要清理的重复设备');
          break;
        }
        const ok = await confirmDialog(
          '清理重复设备',
          `将移除 ${preview.candidates.length} 条重复记录，每台设备保留最近使用的一条。确定继续？`,
          '清理',
        );
        if (!ok) break;
        const res = await withBusy(el, () => api('devices/prune', { method: 'POST', body: { dryRun: false } }));
        toast('已清理', `移除 ${res?.removed?.length ?? 0} 条重复记录`, 'ok');
        await refresh();
        break;
      }

      case 'remove-device':
        if (await confirmDialog('移除设备', '该设备下次访问时需要重新注册，确定继续？', '移除')) {
          await api('devices/remove', { method: 'POST', body: { deviceId: el.dataset.id } });
          toast('已移除');
          await refresh();
        }
        break;
      case 'save-pairing': {
        await api('settings', {
          method: 'POST',
          body: {
            pairing: {
              autoApprove: $('#pair-auto').checked,
              fallbackIntervalMs: Number($('#pair-fallback').value) * 1000,
              maxApprovalsPerMinute: Number($('#pair-rate').value),
            },
          },
        });
        toast('自动注册设置已保存');
        await refresh();
        break;
      }

      case 'refresh-sys':
        state.system = null;
        await loadSystem();
        break;
      case 'upgrade-runtime':
        if (await confirmDialog('更新 NODE 版本', '将下载最新 Node.js 24.x 并替换内置运行时，期间网关会短暂不可用，完成后会自动重启网关。', '更新')) {
          await startInstall({ runtimeOnly: true });
        }
        break;
      case 'load-raw': {
        const cfg = await api('openclaw/config');
        const box = $('#raw-config');
        if (box) box.textContent = JSON.stringify(cfg.config, null, 2);
        break;
      }
    }
  } catch (err) {
    state.lastError = err;
    toast(err.message, err.hint || err.detail || '', 'err');
    render();
  }
}

async function withBusy(el, fn, okMsg) {
  const original = el.innerHTML;
  el.disabled = true;
  el.innerHTML = '<span class="spinner"></span> 处理中';
  try {
    const res = await fn();
    if (okMsg) toast(okMsg);
    return res;
  } finally {
    el.disabled = false;
    el.innerHTML = original;
  }
}

// ------------------------------------------------------------------- actions

async function doInstall(el) {
  const reinstall = el.dataset.reinstall === '1';
  const res = await api('install', { method: 'POST', body: { reinstall } });
  state.installTaskId = res.taskId;
  toast('已开始安装', '可在总览页查看进度');

  const poll = setInterval(async () => {
    try {
      const { tasks } = await api('tasks');
      const task = tasks.find((t) => t.id === state.installTaskId);
      if (!task) return;
      if (task.state === 'success') {
        clearInterval(poll);
        toast('安装完成', task.result?.version ? `OpenClaw ${task.result.version}` : '', 'ok');
        await refresh();
      } else if (task.state === 'error') {
        clearInterval(poll);
        toast('安装失败', task.error?.message || '', 'err');
        await refresh();
      } else {
        await refresh();
      }
    } catch {
      clearInterval(poll);
    }
  }, 2500);
}

async function startInstall(extra) {
  const res = await api('install', { method: 'POST', body: extra });
  state.installTaskId = res.taskId;
  toast('任务已开始');
  setTimeout(() => refresh(), 1500);
}

async function saveSettings(restart, el) {
  const body = {
    gateway: {
      port: Number($('#set-port').value),
      bind: $('#set-bind').value,
      authMode: $('#set-auth').value,
      token: $('#set-token').value,
      autoStart: $('#set-autostart').checked,
    },
    network: { allowFakeIp: $('#set-fakeip').checked },
    openclaw: { autoInstall: $('#set-autoinstall').checked },
  };
  const res = await withBusy(el, () => api('settings', { method: 'POST', body }));
  if (restart) {
    toast('设置已保存', '正在重启网关…');
    await api('gateway/restart', { method: 'POST' });
    toast('网关已重启', '', 'ok');
  } else if (res.needsRestart) {
    toast('设置已保存', '端口或认证方式已变更，需要重启网关生效');
  } else {
    toast('设置已保存', '', 'ok');
  }
  await refresh();
}


// ----------------------------------------------------------------------- SSE

function connectEvents() {
  try {
    const es = new EventSource(`${API_BASE}/api/events`);
    es.addEventListener('pairing', () => refresh());
    es.addEventListener('error', () => {
      /* the browser reconnects automatically */
    });
  } catch {
    /* SSE is a progressive enhancement; polling still works */
  }
}

// ---------------------------------------------------------------------- boot

(function boot() {
  const hash = location.hash.replace('#', '');
  if (PANELS.some((p) => p.id === hash)) state.panel = hash;

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (PANELS.some((p) => p.id === h) && h !== state.panel) {
      state.panel = h;
      render();
      refresh();
    }
  });

  refresh(true);
  connectEvents();
  setInterval(() => {
    if (!document.hidden) refresh();
  }, 8000);
  setInterval(() => {
    if (state.panel === 'logs' && state.logAuto) loadLog();
  }, 4000);
})();
