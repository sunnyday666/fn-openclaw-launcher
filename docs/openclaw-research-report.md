# OpenClaw Research Report — for a third-party launcher on fnOS (Debian 12 NAS)

**Research date:** fetched live from `docs.openclaw.ai`, the npm registry, and the published
`openclaw@2026.9.5` package tarball (`dist/*.mjs`) — the last is quoted as **[SOURCE]** because it is the
actual shipped code, which is stronger evidence than the prose docs when the two disagree.

**Verification legend**

- **[DOCS]** — quoted from a `docs.openclaw.ai` markdown page (URL given).
- **[SOURCE]** — extracted from the published npm tarball `openclaw@2026.9.5` (`dist/*.mjs`).
- **[UNVERIFIED]** — stated explicitly where I could not confirm.

Primary sources:

- `https://docs.openclaw.ai/llms.txt` (full docs index, 1340 lines)
- `https://raw.githubusercontent.com/openclaw/openclaw/main/README.md`
- `https://registry.npmjs.org/openclaw/latest` (npm packument)
- `https://registry.npmjs.org/openclaw/-/openclaw-2026.9.5.tgz` (72,453,925 bytes; extracted to inspect `dist/`)

> **Read this first — the five things most likely to break your launcher**
>
> 1. **The Control UI is at `/` on port `18789`, not at `/control`.** There is no `/control` route.
> 2. **`openclaw devices approve --latest` does NOT approve anything.** It is a *preview* and exits with
>    **code 1**. You must pass the exact `requestId`.
> 3. **Node 25 is excluded** by `engines.node`. Debian 12's stock Node 18 will not work.
> 4. **Pairing state is in SQLite now**, not JSON files. Legacy `~/.openclaw/devices/*.json` is only
>    migrated by `openclaw doctor --fix`.
> 5. **The Gateway refuses to start unless `gateway.mode: "local"` is in the config** (or you pass
>    `--allow-unconfigured`).

---

## 1. INSTALLATION

### Package identity [SOURCE: `https://registry.npmjs.org/openclaw/latest`]

```json
{
  "name": "openclaw",
  "version": "2026.9.5",
  "description": "Multi-channel AI gateway with extensible messaging integrations",
  "license": "MIT",
  "bin": { "openclaw": "openclaw.mjs" },
  "engines": { "node": ">=24.16.0 <25 || >=26.1.0" },
  "type": "module",
  "main": "dist/index.js"
}
```

- **npm package name:** `openclaw` (unscoped).
- **Binary:** `bin` maps `openclaw` → `openclaw.mjs`, so a global install produces an **`openclaw`**
  executable on `PATH`. It is *not* primarily an `npx` tool.
- **`engines.node` — the exact constraint is `">=24.16.0 <25 || >=26.1.0"`.**
  Note this **excludes all of Node 25**. Debian 12 ships Node 18, so your launcher must provision
  Node 24.16+/26.1+ itself (the official installer does this).
- **Package size:** `dist.unpackedSize` = **224,973,173 bytes (~225 MB)** after install; the tarball is
  **72,453,925 bytes (~72 MB)**. Budget for this on the NAS and expect a slow first install.

[DOCS: https://docs.openclaw.ai/install.md] — "**Node 24.16+ or 26.1+** - Node 26 is recommended; the
installer provisions Node 26 on macOS and Node 24 LTS on Linux when Node is missing".

### Recommended install [DOCS: https://docs.openclaw.ai/install.md]

```bash
# macOS / Linux / WSL2 — detects OS, installs Node if needed, installs OpenClaw, launches onboarding
curl -fsSL https://openclaw.ai/install.sh | bash

# Without onboarding (useful for a launcher that wants to control the wizard itself)
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard

# Local prefix installer: keeps OpenClaw AND Node under a local prefix such as ~/.openclaw,
# without depending on a system-wide Node install. Good fit for an appliance/NAS.
curl -fsSL https://openclaw.ai/install-cli.sh | bash
```

> [DOCS] "Use this when you want OpenClaw and Node kept under a local prefix such as `~/.openclaw`,
> without depending on a system-wide Node install" — `install-cli.sh`. "It supports npm installs by
> default, plus git-checkout installs under the same prefix flow."

That `install-cli.sh` path is arguably the best match for fnOS, since it avoids fighting Debian's
system Node.

### npm / pnpm / bun [DOCS: https://docs.openclaw.ai/install.md]

```bash
# npm — npm 12 or npm 11.16+
npm install -g openclaw@latest --allow-scripts=openclaw
openclaw onboard --install-daemon

# npm 11.15 and earlier — omit the flag entirely
npm install -g openclaw@latest

# pnpm
pnpm add -g --allow-build=openclaw openclaw@latest
openclaw onboard --install-daemon

# bun — YES, there is a bun install path
bun add -g --trust openclaw@latest
bun run --bun openclaw onboard --install-daemon --daemon-runtime bun
```

> [DOCS] npm note: "npm 12 blocks unapproved package lifecycle scripts by default. The
> `--allow-scripts=openclaw` option explicitly allows OpenClaw's `preinstall` and `postinstall` steps;
> without it, npm reports them as `blocked because they are not covered by allowScripts`."
>
> [DOCS] npm note: "The `npm approve-scripts openclaw` command suggested by npm 11.16 does not work
> for a global install — it fails with `ENOMATCH  No installed packages match: openclaw`."

**Bun path detail** [DOCS: https://docs.openclaw.ai/install.md] — this is a real but explicitly
secondary runtime:

> "`--trust` allows OpenClaw's package lifecycle scripts for this install. Bun 1.4 or newer can also
> run OpenClaw's CLI, local agent, and Gateway. **Node remains the primary runtime**, so the plain
> `openclaw` executable keeps its Node shebang. `bun run --bun` forces the Bun runtime, while
> `--daemon-runtime bun` installs the managed Gateway under Bun."

And from the onboarding page [DOCS: https://docs.openclaw.ai/cli/onboard.md]:

> "`--daemon-runtime <node|bun>` (default: `node`). Bun 1.4+ with WAL-reset-safe `node:sqlite` is an
> explicit opt-in; **Node remains recommended**."

**Recommendation for fnOS:** use Node, not Bun. Bun is an opt-in, caveated path.

### From source [DOCS: https://docs.openclaw.ai/install.md]

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
corepack enable
pnpm install && pnpm build && pnpm ui:build
pnpm add --global "openclaw@link:$PWD"
openclaw onboard --install-daemon
```

### Verify

```bash
openclaw --version      # confirm the CLI is available
openclaw doctor         # check for config issues
openclaw gateway status # verify the Gateway is running
```

Managed startup on Linux is a **systemd user service** installed by `openclaw onboard --install-daemon`
or `openclaw gateway install`. [SOURCE] the unit file is named **`openclaw-gateway.service`** and lives
in **`~/.config/systemd/user/`**:

```
"openclaw-gateway.service"
"service-directory": "service directory (~/.config/systemd/user) or its nearest existing ancestor"
```

⚠️ **fnOS caveat:** a *user* systemd service requires `loginctl enable-linger <user>` to survive logout
and to start at boot without an interactive session. I did **not** find this documented by OpenClaw
**[UNVERIFIED]** — verify it yourself on fnOS, or supervise the Gateway yourself from your launcher.

---

## 2. GATEWAY

### What it is [DOCS: https://docs.openclaw.ai/cli/gateway/running.md]

> "The [Gateway](https://docs.openclaw.ai/gateway) is the local control plane for sessions, tools,
> events, and channel connections."

### Start command

```bash
openclaw gateway
openclaw gateway run   # equivalent, explicit form
```

**Default port: `18789`.** [SOURCE] `DEFAULT_GATEWAY_PORT = 18789`.

[DOCS: https://docs.openclaw.ai/gateway/config-gateway.md] — port precedence:

> "`port`: local Gateway bind port, multiplexing WS + HTTP. It does not select the macOS SSH tunnel
> port. Precedence: `--port` > `OPENCLAW_GATEWAY_PORT` > `gateway.port` > `18789`."

### `openclaw gateway` CLI flags [DOCS: https://docs.openclaw.ai/cli/gateway/running.md]

| Flag | Meaning |
| --- | --- |
| `--port <port>` | WebSocket port (default from config/env; usually `18789`). |
| `--bind <mode>` | Bind mode: `loopback` (default), `lan`, `tailnet`, `auto`, `custom`. |
| `--token <token>` | Shared token for `connect.params.auth.token`. Defaults to `OPENCLAW_GATEWAY_TOKEN` when set. |
| `--auth <mode>` | Auth mode: `none`, `token`, `password`, `trusted-proxy`. |
| `--password <password>` | Password for `--auth password`. |
| `--password-file <path>` | Read the Gateway password from a file. |
| `--tailscale <mode>` | Tailscale exposure: `off`, `serve`, `funnel`. |
| `--allow-unconfigured` | Start without enforcing `gateway.mode=local`. Ad-hoc/dev bootstrap only. |
| `--dev` | Create a dev config + workspace if missing (skips `BOOTSTRAP.md`). |
| `--ambient-channels` | Allow channel auto-config from ambient env vars. |
| `--reset` | Reset dev config, credentials, sessions, and workspace. Requires `--dev`. |
| `--force` | Kill any existing listener on the target port before starting. |
| `--verbose` | Verbose logging to stdout/stderr. |
| `--ws-log <style>` | `auto`, `full`, `compact`. |
| `--compact` | Alias for `--ws-log compact`. |
| `--raw-stream` / `--raw-stream-path <path>` | Log raw model stream events to JSONL. |

**There is NO `--host` flag.** [SOURCE] `"--host"` appears in the dist only inside a generic
`program-args` helper, not in the Gateway command's option set. Host selection is done with
`--bind` + `gateway.customBindHost`. If you were planning `openclaw gateway --host 0.0.0.0`, that is
wrong — use `--bind lan`.

### `--bind lan` — what it actually does

[DOCS: https://docs.openclaw.ai/gateway/config-gateway.md]

> "`bind`: `auto`, `loopback` (default), `lan` (`0.0.0.0`), `tailnet` (Tailscale IPv4 when available,
> otherwise loopback), or `custom` (one IPv4 address)."

So **`--bind lan` = listen on `0.0.0.0`** (all interfaces, IPv4). Additional rules:

> "**Legacy bind aliases**: use bind mode values in `gateway.bind` (`auto`, `loopback`, `lan`,
> `tailnet`, `custom`), not host aliases (`0.0.0.0`, `127.0.0.1`, `localhost`, `::`, `::1`)."

> "**Docker note**: the default `loopback` bind listens on `127.0.0.1` inside the container. With
> Docker bridge networking (`-p 18789:18789`), traffic arrives on `eth0`, so the gateway is
> unreachable. Use `--network host`, or set `bind: "lan"` (or `bind: "custom"` with
> `customBindHost: "0.0.0.0"`) to listen on all interfaces."

[SOURCE/DOCS] `--bind` values `lan`, `tailnet`, and `custom` resolve over **IPv4-only** paths;
"IPv6-only bring-your-own-host setups need an IPv4 sidecar or proxy in front of the Gateway."
For `--bind custom`, set `gateway.customBindHost` to an IPv4 address; any address other than
`127.0.0.1` or `0.0.0.0` also requires `127.0.0.1` on the same port for same-host clients, and
startup fails if either listener cannot bind.

### Auth is mandatory beyond loopback

[DOCS: https://docs.openclaw.ai/cli/gateway/running.md] — startup behavior:

> "Binding beyond loopback without auth is blocked."

> "Refuses to start unless `gateway.mode=local` is set in `~/.openclaw/openclaw.json`. Use
> `--allow-unconfigured` for ad-hoc/dev runs; it bypasses the guard without writing or repairing
> config."

> "`openclaw onboard --mode local` and `openclaw setup` write `gateway.mode=local`. If the config file
> exists but `gateway.mode` is missing, that is treated as damaged/clobbered config and the Gateway
> refuses to guess `local` for you — re-run onboarding, set the key manually, or pass
> `--allow-unconfigured`."

[DOCS: https://docs.openclaw.ai/gateway/config-gateway.md] — auth keys:

> "**Auth**: required by default. Non-loopback binds require gateway auth. In practice that means a
> shared token/password or an identity-aware reverse proxy with `gateway.auth.mode: "trusted-proxy"`.
> Onboarding wizard generates a token by default."

- `gateway.auth.mode: "none"` — "explicit no-auth mode. Use only for trusted local loopback setups;
  this is intentionally not offered by onboarding prompts."
- `gateway.auth.mode: "trusted-proxy"` — delegate browser/user auth to an identity-aware reverse proxy.
- `gateway.auth.allowTailscale` — "when `true`, Tailscale Serve identity headers can satisfy Control
  UI/WebSocket auth (verified via `tailscale whois`). … Defaults to `true` when `tailscale.mode = "serve"`."
- `gateway.auth.rateLimit` — per-client-IP and per-auth-scope failed-auth limiter; 429 + `Retry-After`;
  `gateway.auth.rateLimit.exemptLoopback` defaults to `true`.

Reveal the configured token (interactive TTY only — it refuses pipes, deliberately):

```bash
openclaw gateway auth-token --show
openclaw doctor --generate-gateway-token   # if no persistent token exists
```

[SOURCE/DOCS] "It requires an interactive terminal and refuses redirected or piped output so the
credential does not silently enter command logs." **This matters for your launcher:** you cannot read
the token by capturing `openclaw gateway auth-token --show` stdout. Instead read
`gateway.auth.token` from `openclaw.json` directly, or generate and store the token yourself at
onboarding time (see §6).

### TLS

[DOCS: https://docs.openclaw.ai/gateway/config-gateway.md] — the `gateway.tls` block:

```json5
gateway: {
  tls: {
    enabled: true,                                        // default: false
    autoGenerate: true,                                   // default: true
    certPath: "/etc/openclaw/tls/server.crt",
    keyPath:  "/etc/openclaw/tls/server.key",
    caPath:   "/etc/openclaw/tls/ca-bundle.crt",
  },
}
```

> - "`enabled`: enables TLS termination at the gateway listener (HTTPS/WSS) (default: `false`)."
> - "`autoGenerate`: defaults to `true`. Gateway startup generates a local self-signed cert/key pair
>   only when both files are missing, including at configured paths; for local/dev use only. An
>   existing partial pair is left untouched and startup fails."
> - "`certPath`: filesystem path to the TLS certificate file."
> - "`keyPath`: filesystem path to the TLS private key file; keep permission-restricted."

**Yes — there is self-signed cert auto-generation.** Default location when no `certPath` is set
[DOCS]:

> "Without `certPath`, they inspect `gateway/tls/gateway-cert.pem` under the state directory."

So: `~/.openclaw/gateway/tls/gateway-cert.pem`.

Automatic certificate reload: "With automatic reload enabled, the Gateway watches the certificate, key,
and CA files… Renewal never generates missing files." And: "Changing TLS configuration or file paths
still requires a Gateway restart." `gateway.reload.mode: "off"` pauses certificate renewal too.

For a remote `wss://` client, `gateway.remote.tlsFingerprint` pins the "expected SHA-256 certificate
fingerprint".

### Related Gateway operations

```bash
openclaw gateway status
openclaw gateway status --deep      # reports likely-blocked ports, firewall rules
openclaw gateway install            # install+start the managed service
openclaw gateway install --force    # reinstall an existing install; may restart a running Gateway
openclaw gateway restart
openclaw gateway probe
openclaw gateway discover           # Bonjour discovery
```

**Running multiple Gateways on one host** [DOCS: https://docs.openclaw.ai/gateway/config-gateway.md]:

```bash
openclaw gateway --port 19001
```

> "Convenience flags: `--dev` (uses `~/.openclaw-dev` + port `19001`), `--profile <name>` (uses
> `~/.openclaw-<name>`)."

Also `OPENCLAW_ALLOW_MULTI_GATEWAY` — "Allow multiple Gateway processes while preserving per-state
ownership locks." Relevant if fnOS users run more than one instance.

---

## 3. CONTROL UI

### URL path — this is `/`, not `/control`

[DOCS: https://docs.openclaw.ai/web/control-ui.md]

> "The Control UI is a small **Vite + Lit** single-page app served by the Gateway:
>
> - default: `http://<host>:18789/`
> - optional prefix: set `gateway.controlUi.basePath` (e.g. `/openclaw`)"

> "It speaks **directly to the Gateway WebSocket** on the same port."

> "If the Gateway is running on the same computer, open http://127.0.0.1:18789/ (or
> http://localhost:18789/)."

[SOURCE] confirms `basePath` is optional and unset by default — the config schema doc string is
`"gateway.controlUi.basePath": "Optional URL prefix where the Control UI is served (e.g. /openclaw)."`,
with the example value `"/openclaw"`. So the default mount point is the **server root**.

**There is no `/control` path.** If your launcher hardcodes `/control` it will 404.

### How it is served

- Same port as the WS RPC (`18789`), multiplexed WS + HTTP.
- `gateway.controlUi.enabled` hot-applies: "Disable it to stop serving dashboard pages and assets
  while bots and existing Gateway connections keep running."
- "Changing the serving base path or asset root still requires a Gateway restart."
- Unmatched HTTP paths use an app-shell fallback that respects the request's `Accept` header.

### Authentication

[DOCS: https://docs.openclaw.ai/web/control-ui.md]

> "Gateway auth runs before device pairing. **A direct loopback connection does not bypass token or
> password auth.** The login screen and **Settings → Gateway** use one **Gateway secret** field: paste
> the token or type the password. After a successful connection, the UI keeps the secret in session
> storage for the current browser tab and Gateway origin only when the Gateway reports token auth.
> Passwords stay in memory and are never persisted. **After pairing, the browser can use its stored
> per-device token on later connections.**"

Auth methods accepted:

> - "the configured shared secret in either `connect.params.auth.token` or
>   `connect.params.auth.password`; `gateway.auth.mode` selects the configured value
>   (`gateway.auth.token` or `gateway.auth.password`)"
> - "Tailscale Serve identity headers when `gateway.auth.allowTailscale: true`"
> - "trusted-proxy identity headers when `gateway.auth.mode: "trusted-proxy"`"

So the Control UI needs **two** things: (1) the Gateway secret (token/password), and (2) a **paired
device** — the browser is itself a pairing client (see §4).

Origins: `gateway.controlUi.allowedOrigins` — "explicit browser-origin allowlist for Gateway
WebSocket connects. **Required for public non-loopback browser origins.** Private same-origin
LAN/Tailnet UI loads from loopback, RFC1918/link-local, `.local`, `.ts.net`, or Tailscale CGNAT hosts
are accepted without enabling Host-header fallback."

⚠️ **You cannot disable Control UI device auth.** [SOURCE] — the config migration rule is explicit:

> `gateway.controlUi.dangerouslyDisableDeviceAuth is retired and ignored. Control UI browsers pair
> through the normal device flow; run "openclaw doctor --fix" to remove the legacy key.`

The key still exists in the schema as a deprecated `boolean().optional()` but is inert, and `doctor --fix`
deletes it. Do not build on it.

### `openclaw dashboard` [DOCS: https://docs.openclaw.ai/cli/dashboard.md]

> "Open the Control UI with a short-lived, one-time owner pairing link. A successful handoff gives that
> signed browser a durable administrator device credential, so reopening the dashboard does not depend
> on the shared Gateway token. Opening a fresh handoff in the same browser can also repair a previously
> limited device credential."

```bash
openclaw dashboard
openclaw dashboard --no-open    # print the URL but do not launch a browser
openclaw dashboard --json       # machine-readable connection object; no browser, no clipboard, no prompt
openclaw dashboard --yes        # start/install the Gateway without prompting when needed
```

`--no-open --json` is the launcher-friendly combination. Existing `OPENCLAW_STATE_DIR` / port
`/openclaw` (once `gateway.controlUi.basePath` is set).

---

## 4. PAIRING / DEVICE REGISTRATION ⭐ (most important section)

OpenClaw has **two distinct pairing systems**. Do not conflate them:

| | DM pairing (channel senders) | Device pairing (clients/nodes) |
| --- | --- | --- |
| Purpose | Who may DM the bot | Which device/browser/node may connect to the Gateway |
| CLI namespace | `openclaw pairing` | `openclaw devices` |
| Code concept | 8-char pairing code | Ed25519 device public key |
| Storage table | `channel_pairing_requests` | `device_pairing_pending` |
| TTL | 1 hour | **5 minutes** |

[DOCS: https://docs.openclaw.ai/cli/pairing.md] — "Approve or inspect DM pairing requests for channels
that support pairing (chat DMs only - **node/device pairing uses `openclaw devices`**)."

**For a launcher, §4b (device pairing) is the one that gates you.**

---

### 4a. What triggers a pending pairing request

[DOCS: https://docs.openclaw.ai/channels/pairing.md]

> "Nodes connect to the Gateway as **devices** with `role: node`. The Gateway creates a device pairing
> request that must be approved."

[DOCS: https://docs.openclaw.ai/gateway/pairing.md]

> "1. … approved one; new or widened surfaces store a **pending request** on the …
> 2. You approve or reject the request (CLI or UI)."

Concretely, a pending device request is created when:

1. **A brand-new client connects** to the Gateway WebSocket and is not yet paired. This includes the
   Control UI browser, third-party operator clients, WebChat, and `role: node` devices.
2. **The same device reconnects with changed auth details** — "If the same device retries with
   different auth details (for example different role/scopes/public key), the previous pending request
   is superseded and a new `requestId` is created." [DOCS: channels/pairing]
3. **An already-paired device asks for more.** "If it reconnects asking for more scopes or a broader
   role, OpenClaw keeps the existing approval as-is and creates a fresh pending upgrade request."
   [DOCS: channels/pairing]

**Two different request kinds exist and are distinguished in the record:**

- **Device pairing** (`device_pairing_pending`) — gates the WS `connect` handshake.
- **Node capability pairing** (`openclaw nodes pending|approve <nodeRequestId>`) — a *separate,
  second* approval for which commands a node may run. [DOCS: gateway/pairing]

> "**Breaking change:** starting with `2026.3.31`, node commands are disabled until node pairing is
> approved. Device pairing alone is no longer enough to expose declared node commands."

> "No blanket LAN or private-network auto-approve mode exists; SSH-verified and trusted-CIDR approval
> both require a fresh scopeless node pairing request."

Pending **node capability** requests behave differently from device requests:

> "Pending **node capability** requests do not expire just because time passes. They survive node
> disconnects and Gateway restarts, and remain pending until approved, rejected, superseded by a
> changed surface, or cleared by the node lifecycle."

---

### 4b. Where pending pairing requests are stored on disk

**Current (verified) — SQLite, not JSON files.** [DOCS: https://docs.openclaw.ai/channels/pairing.md]

> "For channels that use OpenClaw's pairing API, state is stored in the shared SQLite database at
> `~/.openclaw/state/openclaw.sqlite`:
>
> - pending requests in `channel_pairing_requests`
> - approved senders in `channel_pairing_allow_entries`"

> "### Node pairing state storage
>
> Stored in the shared SQLite state database at `~/.openclaw/state/openclaw.sqlite`:
>
> - pending device pairing requests (short-lived; they expire after 5 minutes)
> - paired devices + tokens"

[SOURCE] the DB filename constant is literally `openclaw.sqlite`, resolved under a `"state"` segment →
`~/.openclaw/state/openclaw.sqlite`. There is **one shared control-plane DB**. (Per-agent data lives
separately in `~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite`.)

#### Exact DDL [SOURCE: `dist/openclaw-state-db-DS2iNFy4.mjs`]

```sql
CREATE TABLE IF NOT EXISTS device_pairing_pending (
  request_id TEXT NOT NULL PRIMARY KEY,
  device_id TEXT NOT NULL,
  public_key TEXT NOT NULL,
  display_name TEXT,
  platform TEXT,
  device_family TEXT,
  client_id TEXT,
  client_mode TEXT,
  browser_origin TEXT,
  role TEXT,
  roles_json TEXT,
  scopes_json TEXT,
  remote_ip TEXT,
  silent INTEGER,
  is_repair INTEGER,
  ts INTEGER NOT NULL,
  refreshed_at_ms INTEGER
) STRICT

CREATE TABLE IF NOT EXISTS device_pairing_paired (
  device_id TEXT NOT NULL PRIMARY KEY,
  public_key TEXT NOT NULL,
  display_name TEXT,
  operator_label TEXT,
  platform TEXT,
  device_family TEXT,
  client_id TEXT,
  client_mode TEXT,
  browser_origin TEXT,
  role TEXT,
  roles_json TEXT,
  scopes_json TEXT,
  approved_scopes_json TEXT,
  remote_ip TEXT,
  tokens_json TEXT,
  approved_via TEXT,
  node_surface_json TEXT,
  pending_node_surface_json TEXT,
  created_at_ms INTEGER NOT NULL,
  approved_at_ms INTEGER NOT NULL,
  last_seen_at_ms INTEGER,
  last_seen_reason TEXT
) STRICT

CREATE TABLE IF NOT EXISTS channel_pairing_requests (
  channel_key TEXT NOT NULL,
  account_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  meta_json TEXT,
  PRIMARY KEY (channel_key, account_id, request_id)
) STRICT

CREATE TABLE IF NOT EXISTS channel_pairing_allow_entries (
  channel_key TEXT NOT NULL,
  account_id TEXT NOT NULL,
  entry TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (channel_key, account_id, entry)
) STRICT
```

Supporting tables in the same DB:

```sql
device_bootstrap_tokens        -- token_key, token, setup_id, ts, device_id, public_key,
                               -- profile_json, redeemed_profile_json, pending_profile_json,
                               -- issued_at_ms, last_used_at_ms
device_pair_setup_completions  -- setup_id, device_id, device_name, access,
                               -- completed_at_ms, delivery_state ('uncertain'|'confirmed'), retain_until_ms
device_pairing_join_codes      -- shortcode, payload_json, created_at_ms, expires_at_ms
device_identities              -- identity_key, device_id, public_key_pem, private_key_pem,
                               -- created_at_ms, updated_at_ms
device_auth_tokens             -- device_id, role, token, scopes_json, updated_at_ms
                               -- PRIMARY KEY (device_id, role)
gateway_origin_device_tokens   -- gateway_scope, device_id, role, token, scopes_json, updated_at_ms
```

Indexes:

```sql
CREATE INDEX IF NOT EXISTS idx_device_pairing_pending_device
  ON device_pairing_pending(device_id, ts DESC)
CREATE INDEX IF NOT EXISTS idx_device_pairing_paired_approved
  ON device_pairing_paired(approved_at_ms DESC, device_id)
CREATE INDEX IF NOT EXISTS idx_channel_pairing_requests_code
  ON channel_pairing_requests(channel_key, code)
CREATE INDEX IF NOT EXISTS idx_channel_pairing_requests_created
  ON channel_pairing_requests(channel_key, created_at, request_id)
CREATE INDEX IF NOT EXISTS idx_channel_pairing_allow_account
  ON channel_pairing_allow_entries(channel_key, account_id, sort_order, entry)
```

#### TTLs — exact constants [SOURCE]

```js
DEVICE_PAIRING_PENDING_TTL_MS  = 3e5   // 300,000 ms = 5 minutes
CHANNEL_PAIRING_PENDING_TTL_MS = 36e5  // 3,600,000 ms = 1 hour
DEVICE_PAIRING_JOIN_CODE_RE    = /^[A-Za-z0-9_-]{22}$/u   // join codes are 22 chars
```

This matches the docs exactly: device pairing requests "expire after 5 minutes"
[DOCS: channels/pairing]; DM pairing codes "**Expire after 1 hour**" and are "8 characters, uppercase,
no ambiguous chars (`0O1I`)" with "Pending DM pairing requests … capped at **3 per channel account**"
[DOCS: channels/pairing].

#### Legacy file locations (still migrated, NOT read at runtime)

[DOCS: https://docs.openclaw.ai/channels/pairing.md]

> "Older gateways wrote `<channel>-pairing.json` and `<channel>-<accountId>-allowFrom.json` under
> `~/.openclaw/credentials/`. `openclaw doctor --fix` imports those files into SQLite and removes each
> source after a successful import. **Normal Gateway startup leaves these legacy files unchanged.**"

> "Older gateways kept this state in `~/.openclaw/devices/*.json`. **Stop the Gateway** and run
> `openclaw doctor --fix` to import those files into SQLite and archive them with a `.migrated` suffix."

Other legacy paths confirmed by [SOURCE] / [DOCS: state-and-sessions]:

| Legacy path | Migrated into |
| --- | --- |
| `~/.openclaw/devices/*.json` | `device_pairing_pending` / `device_pairing_paired` |
| `~/.openclaw/credentials/<channel>-pairing.json` | `channel_pairing_requests` |
| `~/.openclaw/credentials/<channel>[-<accountId>]-allowFrom.json` | `channel_pairing_allow_entries` |
| `~/.openclaw/identity/device.json` | `device_identities` (`primary` row) |
| `~/.openclaw/device-pair-notify.json` | notify bookkeeping (constant `DEVICE_PAIR_NOTIFY_LEGACY_STATE_FILE`) |
| `~/.openclaw/cron/jobs.json` | cron rows in SQLite |
| `~/.openclaw/sessions/`, `~/.openclaw/agent/` | `~/.openclaw/agents/<agentId>/agent/` |

> ⚠️ **Do not build your launcher on the legacy JSON paths.** On a current install they are empty or
> absent, and reading them will report "no pending requests" while a real pending request sits in
> SQLite. If you must support both generations, try the CLI/WS API first (below) and only fall back to
> files.

> ⚠️ **Parsing SQLite directly is discouraged.** [DOCS: channels/pairing] "Treat the SQLite database as
> sensitive because these rows gate access to your assistant." The supported interfaces are the CLI
> `--json` output and the Gateway WS RPC.

---

### 4c. CLI commands — exact names and flags

#### Device pairing [DOCS: https://docs.openclaw.ai/cli/devices.md]

```bash
openclaw devices list
openclaw devices list --json
openclaw devices approve <requestId>
openclaw devices reject <requestId>
openclaw devices remove <deviceId>
openclaw devices rename --device <deviceId> --name "Kitchen Mac"
openclaw devices clear --yes
openclaw devices clear --yes --pending          # also rejects all pending requests
openclaw devices rotate --device <deviceId> --role operator --scope operator.read --scope operator.write
openclaw devices revoke --device <deviceId> --role node
openclaw devices join-code
```

[SOURCE] the compiled subcommand set is exactly:
`list`, `approve`, `reject`, `remove`, `rename`, `clear`, `rotate`, `revoke`, `join-code`.
[SOURCE] the flag literals are: `--json`, `--latest`, `--no-scopes`, `--pending`, `--yes`
(plus the documented common options `--url`, `--token`, `--password`, `--timeout`).

Common options: `--url <url>`, `--token <token>`, `--password <password>`, `--timeout <ms>`, `--json`.

> ⚠️ [DOCS] "When you set `--url`, the CLI does not fall back to config or environment credentials.
> Pass `--token` or `--password` explicitly, or the command errors."

> ⚠️ **THE CRITICAL GOTCHA.** [DOCS] "`openclaw devices approve [requestId] [--latest]` … Omitting
> `requestId`, or passing `--latest`, **only previews the newest pending request and exits (code 1);
> rerun with the exact request ID to approve.**"

I verified this in the shipped code [SOURCE: `dist/devices-cli.runtime-Bjzm1Dag.mjs`, ~line 643]:

```js
const usingImplicitSelection = !resolvedRequestId || Boolean(opts.latest);
if (usingImplicitSelection) {
    pairingList = await listPairingWithFallback(opts);
    selectedRequest = selectLatestPendingRequest(pairingList.pending);
    resolvedRequestId = selectedRequest?.requestId?.trim();
}
...
if (usingImplicitSelection) {
    ... // print preview + approveCommand
    if (opts.json) { defaultRuntime.writeJson({ selected, approvalState, approveCommand, requiresAuthFlags });
                     defaultRuntime.exit(1); return; }
```

So a script must **parse the `requestId` and issue a second call**. Do not treat exit code 1 from
`approve --latest` as a tooling failure — it is the designed preview behaviour.

Also note the printed approval command deliberately **omits token and password values**:

> "The printed approval command keeps your active profile or container, explicit Gateway URL,
> nondefault timeout, and JSON output mode. Token and password option values are omitted; supply the
> same credentials again when the preview asks you to reuse those options."

And a race warning:

> "If a device retries pairing with changed auth details (role, scopes, or public key), OpenClaw
> supersedes the previous pending entry with a new `requestId`. **Run `openclaw devices list` right
> before approval to get the current id.**"

Authorization requirements:

> "These commands require `operator.pairing` (or `operator.admin`) scope. Non-operator device roles
> always require `operator.admin`."

> "Approving a `node` role or other non-operator role requires `operator.admin`. `operator.pairing` is
> enough for operator-device approvals, but only when the requested operator scopes stay within the
> caller's own scopes."

Useful non-admin escape hatch:

> "If pairing scope is unavailable on local loopback and no explicit `--url` is passed, `list`/`approve`
> can fall back to local pairing state."

#### DM pairing (channel senders) [DOCS: https://docs.openclaw.ai/cli/pairing.md]

```bash
openclaw pairing list telegram
openclaw pairing list --channel telegram --account work
openclaw pairing list telegram --json

openclaw pairing approve <code>
openclaw pairing approve telegram <code>
openclaw pairing approve --channel telegram --account work <code> --notify
```

Options for `approve`: `--channel <channel>`, `--account <accountId>`, `--notify`.
Note `--account ""` is rejected with `--account must not be blank`.

**First-owner bootstrap** (important side effect):

> "If `commands.ownerAllowFrom` is empty when you approve a pairing code, the CLI also records the
> approved sender as the command owner. It writes a channel-scoped entry such as `telegram:123456789`.
> This only bootstraps the first owner — later pairing approvals never replace or expand
> `commands.ownerAllowFrom`."

The Control UI instead presents this as an explicit `operator.admin`-protected checkbox. There is also
`ChannelsPairingApproveParamsSchema` field `bootstrapCommandOwner` [SOURCE] to control it over RPC.

#### Node capability pairing [DOCS: https://docs.openclaw.ai/gateway/pairing.md]

```bash
openclaw devices list
openclaw devices approve <deviceRequestId>
openclaw nodes pending
openclaw nodes approve <nodeRequestId>
openclaw nodes status
```

#### Control UI path (for a GUI launcher)

[DOCS: channels/pairing] — **Settings → Devices → Pair device**:

1. Open the Control UI and go to **Settings → Devices**.
2. Click **Pair device**.
3. Keep **Full access (recommended)**, or select **Limited access** to omit administrative Gateway controls.
4. Click **Create setup code**.
5. On the phone, OpenClaw app → **Settings** → **Gateway**.
6. Scan the QR code or paste the setup code, then connect.

> "Official OpenClaw iOS and Android apps are approved automatically when their setup-code metadata
> matches."

The button requires `operator.admin`; otherwise use the CLI flow from the Gateway host.

---

### 4d. Non-interactive / auto-approve options

This is the crux for a launcher. There are **three** auto-approval mechanisms, and **no** general
"approve everything" switch.

#### 1. `gateway.nodes.pairing.autoApproveLocal` — **DEFAULT IS `true`** ⭐

This is the single most important fact in this section. [DOCS: https://docs.openclaw.ai/gateway/pairing.md]

> "## Silent local pairing
>
> The Gateway treats a **loopback source address as local**. This includes a client reaching a remote
> loopback-only Gateway through an SSH port forward: the SSH server terminates the connection on the
> Gateway host, so the Gateway sees the forwarded connection as loopback. This is intentional because
> ordinary SSH access already implies local trust, including the ability to read the shared Gateway
> token.
>
> **By default, trusted local connections silently approve first-time device pairing plus role and
> scope upgrades.** This keeps normal same-host and SSH tunnel reconnects convenient. Operators using
> shell-less, port-forward-only SSH keys or a multi-user Mac can require explicit approval for every
> device:"

```json5
{
  gateway: {
    nodes: {
      pairing: {
        autoApproveLocal: false,   // set false to REQUIRE explicit approval even locally
      },
    },
  },
}
```

> "With this setting, new pairing requests, role upgrades, and scope upgrades use the normal approval
> flow even when the connection is local. Metadata-only reconnect refreshes remain automatic so
> routine client or OS metadata changes do not create approval churn."

These silently-approved devices record `approvedVia: "silent"` [SOURCE].

**Consequence for your fnOS launcher:** if your launcher's UI, helper process, or browser runs **on the
NAS itself and talks to `127.0.0.1:18789`**, device pairing is **already auto-approved by default** and
you will never see a pending request. If instead your launcher connects from a *different* machine on
the LAN to the NAS's `bind: lan` listener, the source IP is not loopback and you **will** hit the
manual approval flow.

**Design recommendation:** have the fnOS launcher's privileged helper run *on the NAS* and do all
device pairing / approval work over **loopback**. That turns pairing into a non-issue. Only fall back
to the explicit `devices list` + `devices approve <requestId>` loop for genuinely remote clients.

Also:** when the Gateway silently approves a local device pairing** [DOCS: gateway/pairing]

> "…it retires older `silent`-approved records that belong to the same client cluster" — and
> "Owner-approved and QR/setup-code (bootstrap) pairings are never removed automatically."

#### 2. `gateway.nodes.pairing.autoApproveCidrs` — trusted CIDRs (node role only)

[DOCS: https://docs.openclaw.ai/channels/pairing.md]

```json5
{
  gateway: {
    nodes: {
      pairing: {
        autoApproveCidrs: ["192.168.1.0/24"],
      },
    },
  },
}
```

> "This only applies to **fresh `role: node` pairing requests with no requested scopes**. Operator,
> browser, Control UI, and WebChat clients still require manual approval. Role, scope, metadata, and
> public-key changes still require manual approval."

[DOCS: gateway/pairing]

> "Only a fresh `role: node` device pairing request with no requested scopes is eligible. …
> This approves the device only. Its first command surface still needs `openclaw nodes pending` and
> `openclaw nodes approve <nodeRequestId>`."

```js
// eligibility predicate, [SOURCE]
return request.isRepair !== true && (request.scopes ?? []).length === 0
    && (request.role === void 0 || request.role === "node") && (request.roles ?? []).every(...)
```

#### 3. `gateway.nodes.pairing.sshVerify` — SSH-verified auto-approval (**ON by default**)

[DOCS: https://docs.openclaw.ai/gateway/pairing.md]

> "First-time `role: node` device pairing from a private/CGNAT address is auto-approved when the gateway
> can **prove machine ownership over SSH**: it connects back to the pairing host (`BatchMode`,
> `StrictHostKeyChecking=yes`), runs `openclaw node identity --json` there, and approves only when the
> remote device id and public key match the pending request exactly."

> "Enabled by default." Requirements: gateway user can SSH non-interactively; `openclaw` resolves on
> the remote `PATH` for non-interactive `sh -lc`; the connecting IP is a direct (non-proxied,
> non-loopback) private/ULA/link-local/CGNAT address or matches `sshVerify.cidrs`; fresh scopeless node
> pairing only.

```json5
{
  gateway: {
    nodes: {
      pairing: {
        sshVerify: false,  // disable entirely
        // or scope/tune the probe:
        // sshVerify: { user: "me", identity: "~/.ssh/probe", timeoutMs: 7000, cidrs: ["10.0.0.0/8"] },
      },
    },
  },
}
```

Approved devices record `approvedVia: "ssh-verified"`. Failed targets get "a short cooldown (5 minutes
after a key mismatch)".

> "Pairing settings hot-apply without restarting the Gateway."

#### What does *not* exist

- ❌ **No `--yes`/`--auto-approve` flag on `openclaw devices approve`.**
- ❌ **No blanket LAN or private-network auto-approve.** [DOCS] "No blanket LAN or private-network
  auto-approve mode exists; SSH-verified and trusted-CIDR approval both require a fresh scopeless node
  pairing request."
- ❌ **No general config to auto-approve operator/browser pairing.**
- ❌ **`gateway.controlUi.dangerouslyDisableDeviceAuth` is retired and ignored** [SOURCE].
  [DOCS: gateway/pairing] "Device pairing remains manual by default." for anything other than the
  three mechanisms above.
- ⚠️ Doctor *does* flag dangerous states it can detect, via check ids
  `gateway-control-ui-insecure-auth`, `gateway-control-ui-device-auth-disabled`, and
  `gateway-control-ui-host-origin-fallback` [SOURCE] — evidence that a device-auth-disabled Control UI
  is treated as a misconfiguration to warn about, not a supported mode.

**The realistic launcher pattern:** poll `openclaw devices list --json` (loopback, which is
auto-approved anyway), and when `pending` is non-empty, call
`openclaw devices approve <that requestId>` explicitly. Optionally record the `deviceId` so you can
recognise repeat clients.

---

### 4e. Exact record shapes for programmatic parsing

These come from the **published wire protocol schemas** compiled into the released package
[SOURCE: `dist/*.mjs`], so they are the authoritative field names on the JSON/WS surface. Note the DB
uses `snake_case` columns; the JSON/WS/CLI surface uses **`camelCase`**.

#### Pending device pairing request (the object in `device.pair.list` → `pending[]`)

```ts
{
  requestId:     string;      // required, non-empty  ← use this for approve
  deviceId:      string;      // required, non-empty
  publicKey:     string;      // required, non-empty (Ed25519 public key)
  displayName?:  string;
  platform?:     string;
  deviceFamily?: string;
  clientId?:     string;
  clientMode?:   string;
  browserOrigin?: string;
  role?:         string;      // e.g. "operator" | "node"
  roles?:        string[];
  scopes?:       string[];    // e.g. ["operator.admin","operator.read",...]
  remoteIp?:     string;
  silent?:       boolean;     // true when silently auto-approved
  isRepair?:     boolean;
  ts:            number;      // integer >= 0 (epoch ms)
}
```

Verbatim schema fragment [SOURCE]:

```
requestId:NonEmptyString,deviceId:NonEmptyString,publicKey:NonEmptyString,
displayName:Optional(NonEmptyString),platform:Optional(NonEmptyString),
deviceFamily:Optional(NonEmptyString),clientId:Optional(NonEmptyString),
clientMode:Optional(NonEmptyString),browserOrigin:Optional(NonEmptyString),
role:Optional(NonEmptyString),roles:Optional(Array(NonEmptyString)),
scopes:Optional(Array(NonEmptyString)),remoteIp:Optional(NonEmptyString),
silent:Optional(Boolean),isRepair:Optional(Boolean),ts:Integer({minimum:0})
```

#### `device.pair.*` RPC params and results [SOURCE]

```ts
// device.pair.list   (params: {})
// result:  { pending: PendingDevicePairing[]; paired: PairedDevicePairing[] }
//          verified from: function parseDevicePairingList(value) {
//            return { pending: Array.isArray(obj.pending) ? obj.pending : [],
//                     paired:  Array.isArray(obj.paired)  ? obj.paired  : [] }; }

device.pair.approve  params: { requestId: string }                      // ← requestId ONLY
device.pair.reject   params: { requestId: string }
device.pair.remove   params: { deviceId: string }
device.pair.rename   params: { deviceId: string, label: string /* 1..64 chars */ }

device.token.rotate  params: { deviceId: string, role: string, scopes?: string[] }
// result: { deviceId, role, token?, scopes: string[], rotatedAtMs,
//           tokenDelivery?: "in-band" | "withheld-cross-device" }

device.pair.resolved event: { requestId: string, deviceId: string, decision: string, ts: number }
```

`device.pair.setupCode` returns `{ setupId, expiresAtMs, setupCode, qrDataUrl?, gatewayUrl, auth, urlSource, access }`
where `access ∈ { full, limited, node }`; `qrDataUrl` matches `^data:image/png;base64,`.
`device.pair.setupStatus` takes `{ setupId }` and returns `{ completion?, deliveryUncertain? }`.

`device.pair.setup.completed` event payload: `{ setupId, deviceId, deviceName?, access, ts }` —
"it never includes the bootstrap credential or token-derived identifiers."

#### DM pairing records [SOURCE]

```ts
// pending DM request
{
  requestId:      string;
  channel:        string;
  channelLabel:   string;
  accountId:      string;
  accountLabel?:  string;
  senderId:       string;
  senderLabel:    string;
  metadata?:      Record<string, string>;
  createdAt:      string;     // note: string, not number
  lastSeenAt:     string;
  expiresAt:      string;
  notifySupported: boolean;
}

// list result
{ accounts: [...], requests: [...], commandOwnerConfigured: boolean,
  limits: { pendingPerAccount: number, ttlMs: number } }

// approve params
{ channel, accountId, requestId, notify?, bootstrapCommandOwner? }

// approve result
{ requestId, senderId,
  notification:        "not-requested" | "sent" | "unsupported" | "failed",
  commandOwnerBootstrap: "not-requested" | "configured" | "already-configured" | "unavailable" }
```

#### Recommended parsing strategy

Prefer, in order:

1. **`openclaw devices list --json`** — stable, documented, handles the loopback fallback for you.
   Parse `pending[]` and `paired[]`.
2. **WS RPC `device.pair.list`** with `operator.pairing` scope — for a persistent client.
3. Direct SQLite read of `device_pairing_pending` — **last resort.** It is an internal schema with no
   compatibility promise, uses snake_case, stores `roles_json`/`scopes_json` as JSON *strings*, and the
   docs explicitly call the DB sensitive and gate-bearing.

---

## 5. CONFIG & STATE LAYOUT

### Config file

[DOCS: https://docs.openclaw.ai/gateway/configuration.md]

> "OpenClaw reads an optional **JSON5** config from `~/.openclaw/openclaw.json`. If the file is missing,
> OpenClaw uses safe defaults."

- **Path:** `~/.openclaw/openclaw.json`
- **Format:** **JSON5** (comments and trailing commas allowed) — *not* YAML, *not* TOML.
- **Override:** `OPENCLAW_CONFIG_PATH`

> ⚠️ **Symlinks are unsupported.** [DOCS] "The active config path must be a regular file. OpenClaw-owned
> writes replace it atomically (rename onto the path), so a symlinked `openclaw.json` gets its target
> replaced rather than written through - avoid symlinked config layouts. If you keep config outside the
> default state directory, point `OPENCLAW_CONFIG_PATH` directly at the real file."

This is a real trap for a launcher that wants to keep config in its own app directory — **do not
symlink, set `OPENCLAW_CONFIG_PATH` instead.**

[DOCS: https://docs.openclaw.ai/cli/config.md] — "The active config path must be a regular file.
Symlinked `openclaw.json` layouts are unsupported for writes; use `OPENCLAW_CONFIG_PATH` to point
directly at the real file instead."

Minimal config [DOCS]:

```json5
// ~/.openclaw/openclaw.json
{
  agents: { defaults: { workspace: "~/.openclaw/workspace" } },
  channels: { whatsapp: { allowFrom: ["+15555550123"] } },
}
```

Config editing surfaces:

```bash
openclaw config get agents.defaults.workspace
openclaw config set agents.defaults.heartbeat.every "2h"
openclaw config unset plugins.entries.brave.config.webSearch.apiKey
openclaw config file        # prints the active config path
openclaw config validate
openclaw config schema
```

[SOURCE/DOCS] `config get` output "remains redacted, including `--json`" — another reason the launcher
should read the file itself when it needs the real token.

### State directory tree

Default state dir is `~/.openclaw` (override `OPENCLAW_STATE_DIR`). From
[DOCS: https://docs.openclaw.ai/gateway/security/secrets-and-storage.md] and the DB layout page:

| Path | Contents |
| --- | --- |
| `~/.openclaw/openclaw.json` | Active config (JSON5). Perms `600`. |
| `~/.openclaw/state/openclaw.sqlite` | **Shared control plane**: device/pairing registries, approvals, plugin state, MCP OAuth tokens, cron, migrations. |
| `~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite` | **Per-agent data plane**: sessions, transcripts, memory indexes, **model auth profiles** (`auth_profile_store`). |
| `~/.openclaw/agents/<agentId>/agent/models.json` | Per-agent model catalog / provider overrides. |
| `~/.openclaw/agents/<agentId>/agent/auth-profiles.json` | Legacy model-auth migration source (imported into SQLite by doctor). |
| `~/.openclaw/agents/<agentId>/agent/auth.json` | Legacy compatibility file; static `api_key` entries scrubbed. |
| `~/.openclaw/agents/<agentId>/sessions/*.jsonl` | Session transcripts. |
| `~/.openclaw/agents/<agentId>/sessions/cold/` | Cold transcript archives. |
| `~/.openclaw/credentials/**` | Channel credentials, legacy pairing allowlists, legacy OAuth imports. |
| `~/.openclaw/credentials/whatsapp/<accountId>/creds.json` | WhatsApp (Baileys) auth. |
| `~/.openclaw/secrets.json` (optional) | File-backed secret payload for `file` SecretRef providers. |
| `~/.openclaw/gateway/tls/gateway-cert.pem` | Default TLS cert when `gateway.tls.certPath` is unset. |
| `~/.openclaw/logs/` | Logs. |
| `~/.openclaw/cron/jobs.json` | Legacy cron store. |
| `~/.openclaw/identity/device.json` | Legacy signed device identity. |

[DOCS: https://docs.openclaw.ai/reference/database-schemas/layout.md] — the two-database model:

> | Global control plane | `~/.openclaw/state/openclaw.sqlite` | Shared configuration state, registries, approvals, plugin state, and shared runtime state |
> | Per-agent data plane | `~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite` | Sessions, transcripts, memory indexes, auth state, conversation state, and agent-scoped runtime state |

Hardening guidance [DOCS: secrets-and-storage]:

> "Assume anything under `~/.openclaw/` (or `$OPENCLAW_STATE_DIR/`) may contain secrets or private data"
>
> "Hardening: keep permissions tight (`700` on dirs, `600` on files); use full-disk encryption on the
> gateway host; prefer a dedicated OS user account if the host is shared."
>
> "`~/.openclaw/openclaw.json`: `600` (user read/write only)"
> "`~/.openclaw`: `700` (user only)"

Also: "**Linux volatile state dir**: warns when state resolves to `tmpfs` or `ramfs`". On fnOS make
sure `~/.openclaw` is on persistent storage, not a tmpfs mount.

### Where model provider credentials go

Three coexisting mechanisms:

1. **Legacy/static:** `agents/<agentId>/agent/auth-profiles.json` and `auth.json` — **legacy**, doctor
   imports into SQLite.
2. **Canonical:** `agents/<agentId>/agent/openclaw-agent.sqlite` table `auth_profile_store`.
3. **Config-based (best for a launcher):** `models.providers.<id>.apiKey` in `openclaw.json`, ideally as
   a SecretRef or `${ENV_VAR}` substitution.

[DOCS: https://docs.openclaw.ai/gateway/configuration/environment-variables.md] — SecretRef form:

```json5
{
  models: {
    providers: {
      openai: { apiKey: { source: "env", provider: "default", id: "OPENAI_API_KEY" } },
    },
  },
}
```

Env substitution: `apiKey: "${CUSTOM_API_KEY}"` — rules: only `[A-Z_][A-Z0-9_]*`; missing vars "stay
visibly unresolved, emit a warning"; escape with `$${VAR}`.

Provider env vars are blocked from workspace `.env` files [DOCS]:

> "Provider credential environment variables are blocked from untrusted workspace `.env` files - for
> example `GEMINI_API_KEY`, `GOOGLE_API_KEY`, `XAI_API_KEY`, `MISTRAL_API_KEY`, `GROQ_API_KEY`,
> `DEEPSEEK_API_KEY`, `PERPLEXITY_API_KEY`, `BRAVE_API_KEY`, `TAVILY_API_KEY`, `EXA_API_KEY`,
> `FIRECRAWL_API_KEY`, and provider auth keys declared by installed trusted plugins. Put provider
> credentials in the Gateway process environment, `~/.openclaw/.env` (`$OPENCLAW_STATE_DIR/.env`), the
> config `env` block, or an optional login-shell import instead."

### Model catalog / provider config keys

[DOCS: https://docs.openclaw.ai/gateway/config-tools/custom-providers.md]

> "Provider plugins publish their own model catalog rows. Add custom providers via `models.providers` in
> config or `~/.openclaw/agents/<agentId>/agent/models.json`."

```json5
{
  models: {
    providers: {
      myprovider: {
        baseUrl: "http://localhost:4000/v1",
        apiKey: "LITELLM_KEY",
        api: "openai-completions",   // openai-completions | openai-responses |
                                     // anthropic-messages | google-generative-ai | etc.
        models: [ /* explicit catalog entries */ ],
      },
    },
  },
}
```

Full key reference [DOCS]:

| Key | Meaning |
| --- | --- |
| `models.providers.*.baseUrl` | Upstream API base URL. |
| `models.providers.*.apiKey` | Provider credential (prefer SecretRef/env substitution). |
| `models.providers.*.api` | Request adapter. |
| `models.providers.*.auth` | Auth strategy: `api-key`, `token`, `oauth`, `aws-sdk`. |
| `models.providers.*.models` | Explicit provider model catalog entries. |
| `models.providers.*.models.*.input` | `["text"]` or `["text","image"]`. |
| `models.providers.*.models.*.contextWindow` | Native context window. |
| `models.providers.*.models.*.contextTokens` | Optional active-input cap. |
| `models.providers.*.maxTokens` | Default output-token cap. |
| `models.providers.*.timeoutSeconds` | Per-provider HTTP timeout. |
| `models.providers.*.headers` | Extra static headers. |
| `models.providers.*.authHeader` | Force credential into `Authorization`. |
| `models.providers.*.request` | Transport overrides. |
| `models.providers.*.injectNumCtxForOpenAICompat` | Ollama + openai-completions: inject `options.num_ctx` (default `true`). |

Accepted `api` values [DOCS]:

> "`openai-completions`, `openai-responses`, `openai-chatgpt-responses`, `anthropic-messages`,
> `google-generative-ai`, `google-vertex`, `github-copilot`, `bedrock-converse-stream`, `ollama`,
> `pi-messages`, `azure-openai-responses`"

> "For self-hosted `/v1/chat/completions` backends such as MLX, vLLM, SGLang, and most
> OpenAI-compatible local servers, use `openai-completions`. **A custom provider with `baseUrl` but no
> `api` defaults to `openai-completions`**; set `openai-responses` only when the backend supports
> `/v1/responses`."

**Security note that matters for a NAS launcher** [DOCS]:

> "Configuring a custom/local provider `baseUrl` is also the narrow network trust decision for model
> HTTP requests: OpenClaw allows that exact `scheme://host:port` origin through the guarded fetch path,
> without adding a separate config option or trusting other private origins."

So pointing `baseUrl` at a LAN model server (e.g. `http://192.168.1.50:11434`) is **both** necessary and
sufficient to allow that origin. You do not need a separate allowlist entry.

Config writes for providers should be **additive** [DOCS]:

> "Safe edits: use `openclaw config set models.providers.<id> '<json>' --strict-json --merge` or
> `openclaw config set models.providers.<id>.models '<json-array>' --strict-json --merge` for additive
> updates. `config set` refuses destructive replacements unless you pass `--replace`."

### Default model selection

[DOCS: https://docs.openclaw.ai/gateway/config-agents/models.md]

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: ["minimax/MiniMax-M2.7"],
      },
      // utilityModel: "provider/model"  // short internal tasks
    },
  },
}
```

> "`model`: accepts either a string (`"provider/model"`) or an object (`{ primary, fallbacks }`)."
> "String form sets only the primary model."
> "Object form sets primary plus ordered failover models."

Usage: `openclaw models list`, `openclaw models status`, `openclaw models set <provider/model>`,
`openclaw models auth list`.

### Environment variables

[DOCS: https://docs.openclaw.ai/help/environment.md] — sources: parent process env, plus
`.env` from the current working directory (if present), plus `~/.openclaw/.env` (global fallback).
"Neither file overrides existing env vars."

**Paths and identity**

| Var | Meaning |
| --- | --- |
| `OPENCLAW_HOME` | "Override the home directory used for OpenClaw path defaults." (agent dirs, sessions, credentials, installer onboarding, default dev checkout) — "Useful when running OpenClaw as a dedicated service user." |
| `OPENCLAW_STATE_DIR` | "Override the state directory (default `~/.openclaw`)." |
| `OPENCLAW_CONFIG_PATH` | "Override the config file path (default `~/.openclaw/openclaw.json`)." |
| `OPENCLAW_WORKSPACE_DIR` | Override the default agent workspace. |
| `OPENCLAW_PROFILE` | Select a named profile and its isolated defaults. |
| `OPENCLAW_AGENT_DIR` | Explicit agent directory override (read by the SDK and Doctor). |
| `OPENCLAW_GIT_DIR` | Override the source checkout used by dev-channel updates. |
| `OPENCLAW_INCLUDE_ROOTS` | Path-list of extra roots where `$include` may resolve files (default none). |
| `OPENCLAW_SQLITE_LIBRARY` | Override the SQLite library (Bun on macOS). |

**Gateway / network**

| Var | Meaning |
| --- | --- |
| `OPENCLAW_GATEWAY_PORT` | "Override the local Gateway port." |
| `OPENCLAW_GATEWAY_URL` | "Override the remote Gateway URL used by clients." |
| `OPENCLAW_GATEWAY_TOKEN` | "Supply token authentication for Gateway servers and clients." |
| `OPENCLAW_GATEWAY_PASSWORD` | "Supply password authentication for Gateway servers and clients." |
| `OPENCLAW_ALLOW_INSECURE_PRIVATE_WS` | Allow trusted private-DNS `ws://` connections (break-glass). |
| `OPENCLAW_ALLOW_MULTI_GATEWAY` | Allow multiple Gateway processes with per-state ownership locks. |
| `OPENCLAW_DISABLE_BONJOUR` | Force Bonjour advertising on (`0`) or off (`1`). |

**Config mutability**

| Var | Meaning |
| --- | --- |
| `OPENCLAW_CONFIG_READONLY=1` | Treat `openclaw.json` as immutable; writers refuse. |
| `OPENCLAW_NIX_MODE=1` | Implies immutable config. |

> ⚠️ [DOCS: cli/config.md] "Runtime state still needs a writable `OPENCLAW_STATE_DIR`." and "Do not set
> `OPENCLAW_CONFIG_READONLY` in config `env` or `env.vars`."

**Other notable:** `OPENCLAW_LOG_LEVEL`, `OPENCLAW_NO_AUTO_UPDATE`, `OPENCLAW_OFFLINE`,
`OPENCLAW_SKIP_CHANNELS`, `OPENCLAW_BROWSER_HEADLESS`, `OPENCLAW_LOAD_SHELL_ENV`,
`OPENCLAW_SHELL_ENV_TIMEOUT_MS` (default 15000), `OPENCLAW_THEME`, `OPENCLAW_LOCALE`,
`OPENCLAW_DIAGNOSTICS`, `OPENCLAW_EXEC_SHELL_SNAPSHOT`, `OPENCLAW_LEGACY_ENV_VARS`.

There is **no** `OPENCLAW_HOME`-vs-port ambiguity: `OPENCLAW_GATEWAY_PORT` is the port var and
`OPENCLAW_HOME` only affects path resolution.

---

## 6. HEADLESS / NON-INTERACTIVE SETUP

**Yes — `openclaw onboard --non-interactive` exists**, and it is well supported.
[DOCS: https://docs.openclaw.ai/cli/onboard.md]

> "`--non-interactive` requires `--accept-risk` (acknowledges that agents are powerful and full system
> access is risky). `--mode` defaults to `local`."

> "Without an interactive terminal, both onboarding modes return a structured JSON error; add
> `--non-interactive --accept-risk` for automation." and "`--json` does not imply non-interactive mode
> in guided or classic onboarding."

### Flag inventory

| Flag | Notes |
| --- | --- |
| `--non-interactive` | Required for automation; requires `--accept-risk`. |
| `--accept-risk` | Mandatory with `--non-interactive`. |
| `--mode local\|remote` | Defaults to `local`. |
| `--agent-name <name>` | |
| `--auth-choice <choice>` | `custom-api-key`, `openai-api-key`, `ollama`, `lmstudio`, `llama-cpp`, `llama-cpp-existing-server`, `zai-api-key`, `mistral-api-key`, `arceeai-api-key`, `arceeai-openrouter`, `token`, … |
| `--custom-base-url <url>` | For custom/Ollama/LM Studio/llama.cpp endpoints. |
| `--custom-model-id <id>` | |
| `--custom-api-key <key>` | Optional; falls back to `CUSTOM_API_KEY` env. |
| `--custom-compatibility <mode>` | `openai` (default), `openai-responses`, `anthropic`. |
| `--custom-image-input` / `--custom-text-input` | Force modality metadata. |
| `--secret-input-mode plaintext\|ref` | `ref` stores SecretRefs instead of plaintext. |
| `--gateway-auth token\|password` | |
| `--gateway-token <token>` | Mutually exclusive with `--gateway-token-ref-env`. |
| `--gateway-token-ref-env <ENV_NAME>` | Stores `gateway.auth.token` as an env SecretRef. |
| `--gateway-password <value>` | |
| `--gateway-port`, `--gateway-bind`, `--tailscale` | |
| `--install-daemon` / `--no-install-daemon` / `--skip-daemon` | |
| `--daemon-runtime <node\|bun>` | Default `node`. |
| `--node-manager <npm\|pnpm\|bun>` | Default `npm`. |
| `--skip-health` | Skip the gateway health wait. |
| `--skip-bootstrap` | Sets `agents.defaults.skipBootstrap: true` and skips creating `AGENTS.md`, `SOUL.md`, `IDENTITY.md`, `USER.md`, `BOOTSTRAP.md`. |
| `--skip-channels`, `--skip-skills`, `--skip-ui`, `--skip-hooks`, `--skip-search` | |
| `--suppress-gateway-token-output` | Disables the automatic Control UI handoff. |

### ⭐ Minimum for a working assistant on an OpenAI-compatible endpoint

Exact documented example [DOCS: cli/onboard.md]:

```bash
openclaw onboard --non-interactive --accept-risk --skip-health \
  --agent-name robby \
  --auth-choice custom-api-key \
  --custom-base-url "https://llm.example.com/v1" \
  --custom-model-id "foo-large" \
  --custom-api-key "$CUSTOM_API_KEY" \
  --secret-input-mode plaintext \
  --custom-compatibility openai \
  --custom-image-input
```

Local-model variants:

```bash
# Ollama (base URL defaults to http://127.0.0.1:11434)
openclaw onboard --non-interactive --accept-risk --skip-health \
  --auth-choice ollama \
  --custom-base-url "http://ollama-host:11434" \
  --custom-model-id "qwen3.5:27b"

# LM Studio
openclaw onboard --non-interactive --accept-risk --skip-health \
  --auth-choice lmstudio \
  --custom-base-url "http://localhost:1234/v1" \
  --custom-model-id "qwen/qwen3.5-9b" \
  --lmstudio-api-key "$LM_API_TOKEN"

# llama.cpp against an existing llama-server
openclaw onboard --non-interactive --accept-risk \
  --auth-choice llama-cpp-existing-server \
  --custom-base-url "http://127.0.0.1:8080/v1" \
  --custom-model-id "my-model" \
  --llama-server-api-key "$LLAMA_SERVER_API_KEY"
```

Full production-shaped example with a SecretRef gateway token and no daemon install:

```bash
export OPENAI_API_KEY="your-provider-key"
export OPENCLAW_GATEWAY_TOKEN="your-token"
openclaw onboard --non-interactive --accept-risk --skip-health \
  --mode local \
  --auth-choice openai-api-key \
  --secret-input-mode ref \
  --gateway-auth token \
  --gateway-token-ref-env OPENCLAW_GATEWAY_TOKEN
```

**Launcher recommendation:** pass `--gateway-auth token --gateway-token <generated>` so *you* own the
secret and can write it to `openclaw.json`/your store. Otherwise:

> "Without auth flags or an existing credential, onboarding generates a Gateway secret and stores it as
> `gateway.auth.token` with `gateway.auth.mode: "token"`."

…and you cannot read it back via stdout (`gateway auth-token --show` refuses piped output), though you
*can* read `gateway.auth.token` from `~/.openclaw/openclaw.json`.

### ⚠️ Plugin capability gate blocks non-interactive onboarding

> "`--accept-risk` does not approve plugin capabilities. If local setup needs an external provider or
> runtime plugin, non-interactive onboarding **stops** when that plugin requires a capability review.
> Review and preinstall the required plugin, then rerun the same onboarding command."

```bash
openclaw plugins install codex --accept-capabilities
openclaw onboard --non-interactive --accept-risk --skip-health \
  --auth-choice openai-api-key \
  --secret-input-mode ref
```

Your launcher must run the plugin preinstall step **before** onboarding, or onboarding will halt.

### Health gating

- "Unless you pass `--skip-health`, onboarding waits for a reachable local gateway before exiting successfully."
- "`--install-daemon` starts the managed gateway install path first. With no daemon flag, a local
  gateway must already be running (for example `openclaw gateway run`)."
- "Explicit `--skip-daemon` or `--no-install-daemon` still probes for an existing gateway. If none is
  listening, setup reports that the gateway was not started and exits successfully."

### Non-interactive channel setup

[DOCS: https://docs.openclaw.ai/cli/channels.md]

> "For a headless host, complete non-interactive onboarding first, then add each channel with explicit
> credential flags or its environment-backed setup option:"

```bash
openclaw onboard --non-interactive --accept-risk --skip-health \
  ... \
  --skip-channels

openclaw channels add --channel telegram --token <bot-token>
openclaw channels add --channel telegram --use-env
openclaw channels add --channel nostr --private-key "$NOSTR_PRIVATE_KEY"
openclaw channels remove --channel telegram --delete
```

### Is there a CLI to add a model provider non-interactively?

**Partially.** There is no `openclaw models providers add` command, but there are two supported
non-interactive paths:

1. `openclaw onboard --non-interactive … --auth-choice custom-api-key --custom-base-url … --custom-model-id …`
2. Direct config write for full control over the provider block:

```bash
openclaw config set models.providers.myllm \
  '{"baseUrl":"http://192.168.1.50:8080/v1","api":"openai-completions","apiKey":{"source":"env","provider":"default","id":"MYLLM_API_KEY"},"models":[{"id":"my-model","input":["text"]}]}' \
  --strict-json --merge
```

Plus `openclaw models auth list` / `openclaw models list` / `openclaw models status` for inspection, and
`openclaw models auth login --provider <id>` for OAuth flows (interactive).

### Absolute minimum config to boot

The Gateway will not start without `gateway.mode`. A hand-written minimum:

```json5
// ~/.openclaw/openclaw.json
{
  gateway: { mode: "local" },
  agents: { defaults: { workspace: "~/.openclaw/workspace" } },
  models: {
    providers: {
      local: {
        baseUrl: "http://192.168.1.50:8080/v1",
        api: "openai-completions",
        apiKey: "${LOCAL_LLM_KEY}",
        models: [{ id: "my-model", input: ["text"] }],
      },
    },
  },
}
```

Then start the Gateway yourself. **[UNVERIFIED]** I did not find a documented statement that this exact
minimal JSON5 file is sufficient end-to-end — `openclaw doctor` validation of a hand-written config is
the honest way to confirm on your target box. The safer sequence for a launcher is
`onboard --non-interactive` (which writes a known-good config) and then patch in the provider with
`openclaw config set … --strict-json --merge`.

---

## 7. CHANNELS / PLUGINS

Channels are plugins. [DOCS: https://docs.openclaw.ai/cli/plugins/install.md]

### Plugin install sources

```bash
openclaw plugins search "calendar"                      # search ClawHub plugins
openclaw plugins install @openclaw/<package>            # trusted official catalog
openclaw plugins install <package>                      # arbitrary npm package
openclaw plugins install clawhub:<package>              # ClawHub only
openclaw plugins install npm:<package>                  # npm only
openclaw plugins install npm-pack:<path.tgz>            # local npm-pack tarball
openclaw plugins install git:github.com/<owner>/<repo>  # git repo
openclaw plugins install git:github.com/<owner>/<repo>@<ref>
openclaw plugins install <path>                         # local path or archive
openclaw plugins install -l <path>                      # link instead of copy
openclaw plugins install <plugin>@<marketplace>         # marketplace shorthand
openclaw plugins install <plugin> --marketplace <name>  # marketplace (explicit)
openclaw plugins install <package> --force              # confirm source / overwrite existing
openclaw plugins install <package> --pin                # pin resolved npm version
openclaw plugins install <package> --acknowledge-install-policy-warning
```

### `--force` — what it does and does not do

> "`--force` confirms a non-ClawHub source without prompting. **It does not bypass `security.installPolicy`
> or remaining install safety checks.** When the plugin or hook pack is already installed, it also
> permits replacing the existing install. Use it after reviewing an arbitrary npm, local, archive, git,
> or marketplace source, or when intentionally reinstalling the same id."

> "Noninteractive arbitrary installs must pass `--force` after you review and trust the source."

> "Reinstalling preserves an authored `plugins.entries.<id>.enabled: false`. **`--force` does not approve
> capabilities**: when no valid prior acceptance can be reused, review and accept them before the
> install commits."

> "Local copies selected through `plugins.load.paths`, including `--link` installs, **do not inherit
> official package trust**. `--force` does not change that boundary."

> "`--pin` applies to npm installs only and records the resolved exact `<name>@<version>`. It is not
> supported with `git:` installs … or with `--marketplace`."

### `--accept-capabilities` — what it does

> "Bundled plugins and verified first-party catalog plugins **do not require** `--accept-capabilities`
> during setup, install, enable, update, or Doctor repair. **Local copies and unverified sources still
> require capability consent** even when their package name matches an official plugin. This exemption
> does not grant OAuth, operating-system, or runtime tool permissions."

> "The flag approves only that plugin operation; **it is not a global bypass**."

Used with: `openclaw plugins install <id> --accept-capabilities`,
`openclaw plugins enable <id> --accept-capabilities`.

So: **`--force` ≈ "I trust this source / overwrite it"; `--accept-capabilities` ≈ "I consent to the
permissions this plugin declares."** They are orthogonal and neither overrides `security.installPolicy`
returning `block`.

### Other plugin commands

```bash
openclaw plugins list
openclaw plugins enable <ids...>
openclaw plugins enable <ids...> --accept-capabilities
openclaw plugins disable <ids...>
openclaw plugins update <id-or-npm-spec>
openclaw plugins uninstall <id>
openclaw plugins inspect <id> --runtime --json
openclaw plugins reload <id>
openclaw plugins doctor
openclaw plugins registry
openclaw plugins marketplace list <name>
```

Policy acknowledgement for non-interactive installs:
`--acknowledge-install-policy-warning` — "after review, `--acknowledge-install-policy-warning`
explicitly approves every warning for that command invocation."

There is also a Gateway-side equivalent: "Gateway API clients can acknowledge the reviewed request with
`acknowledgeInstallPolicyWarning: true`."

Interesting gotcha [DOCS]:

> "Raw `@openclaw/*` specs that match bundled plugins resolve to the image-owned bundled copy before npm
> fallback. … To force the external npm package, use
> `openclaw plugins install npm:@openclaw/discord@2026.5.20 --pin`."

### Channel add

```bash
openclaw channels list
openclaw channels list --all
openclaw channels status --probe
openclaw channels add --channel telegram --token <bot-token>
openclaw channels add --channel telegram --use-env
openclaw channels add --channel nostr --private-key "$NOSTR_PRIVATE_KEY"
openclaw channels remove --channel telegram --delete
openclaw channels capabilities --channel discord --target channel:123
openclaw channels resolve --channel slack "#general" "@jane"
openclaw channels logs --channel all
openclaw channels dead-letters list --channel telegram --account default
```

`--account <id>` selects a channel account; `--agent <id>` binds an agent. In non-interactive mode,
"non-interactive setup still requires `--agent`."

Gateway-side env-driven channel config requires explicit opt-in:
`openclaw gateway --ambient-channels` — "Allow the Gateway to auto-configure channels from ambient
environment variables. By default, channels require an explicit `channels.<id>` config block."

Supported pairing-capable channels [DOCS: channels/pairing]: `discord`, `feishu`, `googlechat`,
`imessage`, `irc`, `line`, `matrix`, `mattermost`, `msteams`, `nextcloud-talk`, `nostr`, `signal`,
`slack`, `sms`, `synology-chat`, `telegram`, `twitch`, `whatsapp`, `zalo`, `zalouser`.

---

## 8. HTTP API / PROGRAMMATIC CONTROL

### Primary API is the WebSocket RPC (same port as the Control UI)

[DOCS: https://docs.openclaw.ai/plugins/admin-http-rpc.md]

> "The normal Gateway WebSocket RPC path remains the preferred control-plane API for OpenClaw clients.
> Use admin HTTP RPC only for host tooling that needs a request/response HTTP surface."

Endpoint: `ws://127.0.0.1:18789` (or `wss://` with TLS).

**Published client packages** [DOCS: https://docs.openclaw.ai/gateway/clients.md]:

```bash
npm install --save-exact @openclaw/gateway-client@2026.8.1 @openclaw/gateway-protocol@2026.8.1
```

- `@openclaw/gateway-protocol` — "schemas, runtime validators, TypeScript types, client identity and
  capability registries, structured error readers, and protocol version constants." Its tarball also
  includes a generated `protocol.schema.json` (download as a file; not an export subpath).
- `@openclaw/gateway-client` — "the reference connection implementation. Import the package root for
  the Node client and `@openclaw/gateway-client/browser` for the browser-safe protocol, device-auth, and
  reconnect helpers."
- "These package releases declare Node.js `>=22.19.0`." (Lower than the CLI's Node 24.16 requirement —
  useful if you write the launcher's client in Node/TS separately.)
- "The `2026.8.1` packages export wire version `4`".

Recommended scopes for a full interactive client [DOCS]:

| Scope | Use it for |
| --- | --- |
| `operator.read` | `chat.history`, `sessions.list`, `sessions.subscribe`, model status, read-only events |
| `operator.write` | `chat.send` and ordinary session mutations |
| `operator.approvals` | Listing, displaying, and resolving exec or plugin approvals |
| `operator.questions` | "only if the client handles interactive questions" |
| `operator.pairing` | "only if it manages paired devices or nodes" |
| `operator.admin` | "only for administrative operations such as `config.patch`" |

### Device pairing RPCs (≈ the HTTP API for pairing approval)

[DOCS: https://docs.openclaw.ai/gateway/protocol/rpc-devices-nodes-and-approvals.md]

> - "`device.pair.list` returns pending and approved paired devices."
> - "`device.pair.setupCode` creates a mobile setup code and, by default, a PNG QR data URL. It requires
>   `operator.admin` …"
> - "`device.pair.setupStatus` reconciles one setup credential the caller already issued (`{ setupId }`)."
> - "`device.pair.approve`, `device.pair.reject`, and `device.pair.remove` manage device-pairing records."
> - "`device.pair.rename` assigns an operator label (`{ deviceId, label }`) …"
> - "`device.token.rotate` rotates a paired device token within its approved role and caller scope bounds."
> - "`device.token.revoke` revokes a paired device token within its approved role and caller scope bounds."

Related events: `device.pair.requested`, `device.pair.resolved`, `device.pair.changed`,
`device.pair.setup.completed`, `device.pair.setup.deliveryUncertain`.

Node family:

> "`node.pair.list`, `node.pair.approve`, `node.pair.reject`, and `node.pair.remove` cover node
> capability approvals. `node.pair.request` and `node.pair.verify` were **removed in 2026.7** together
> with the standalone node pairing store; pending requests are created by the Gateway during node connects."

Plus `node.list`, `node.describe`, `node.rename`, `node.invoke`, `node.invoke.result`, `node.event`,
`node.pending.pull|ack|enqueue|drain`, `mcp.tools.call.v1`.

Approval family: `approval.get`, `approval.resolve`, `approval.history`,
`exec.approval.request|get|list|resolve|waitDecision`, `plugin.approval.*`.

Config over RPC: `config.get`, `config.patch`, `config.apply`, `config.schema.lookup`.

**A third-party launcher can do the entire pairing flow over WS RPC:**
subscribe → receive `device.pair.requested` → call `device.pair.list` → call
`device.pair.approve { requestId }`. This avoids both the CLI-preview gotcha and direct SQLite access.

### The one documented HTTP REST surface

[DOCS: https://docs.openclaw.ai/plugins/admin-http-rpc.md]

> "The bundled `admin-http-rpc` plugin exposes an allowlisted set of Gateway control-plane methods over
> HTTP, for trusted host automation that cannot keep a Gateway WebSocket connection open."

> "It ships with OpenClaw but is **disabled by default**; when disabled, the route is not registered.
> When enabled, it adds `POST /api/v1/admin/rpc` on the same listener as the Gateway
> (`http://<gateway-host>:<port>/api/v1/admin/rpc`)."

Enable it:

```bash
openclaw plugins enable admin-http-rpc
```

or via config:

```json5
{ plugins: { entries: { "admin-http-rpc": { enabled: true } } } }
```

Call it:

```bash
curl -sS http://<gateway-host>:<port>/api/v1/admin/rpc \
  -H 'Authorization: Bearer <gateway-token>' \
  ...   # POST, JSON body
```

Auth:

> "- shared-secret auth (`gateway.auth.mode="token"` or `"password"`):
>   `Authorization: Bearer <token-or-password>`"

> "Shared-secret bearer auth (`token`/`password` modes) proves possession of the gateway operator
> secret; narrower `x-openclaw-scopes` headers are ignored on that path and normal full operator
> defaults are restored."

> "`gateway.auth.mode="none"` means this route is unauthenticated if the plugin is enabled. Use that
> only behind a private ingress you fully trust."

Errors: `401 Unauthorized` (auth), `405 Method Not Allowed` (non-POST).

> ⚠️ "Enabling the plugin intentionally offers access to the allowlisted admin RPC methods at
> `/api/v1/admin/rpc`." — it is **full operator access** for anyone with the shared token. Treat
> enabling it on a `bind: lan` Gateway as a deliberate exposure decision.

Also on the Gateway HTTP listener: inbound webhooks for automations
(`https://docs.openclaw.ai/automation/cron-jobs/webhooks`) — "Gateway HTTP hooks that let an external
service wake an agent or submit a turn."

### `openclaw` CLI as the third API

For a launcher written in Go/Python/shell, the CLI with `--json` is the most robust integration
surface and avoids reimplementing the WS protocol:

```bash
openclaw devices list --json
openclaw devices approve <requestId> --json
openclaw status --json
openclaw gateway status --deep --json
openclaw health --json
openclaw channels list --json
openclaw models list --json
openclaw config get gateway.port --json
openclaw dashboard --no-open --json
```

---

## 9. Concrete integration plan for the fnOS launcher

1. **Provision Node 24.16+ or 26.1+** (never 25) — via `install-cli.sh` (local prefix under
   `~/.openclaw`) or your own Node build. Do not rely on Debian 12's Node 18.
2. **Install** with `npm install -g openclaw@latest --allow-scripts=openclaw`, or
   `curl -fsSL https://openclaw.ai/install-cli.sh | bash` for a self-contained prefix.
3. **Onboard non-interactively**, owning the Gateway token yourself:
   ```bash
   openclaw onboard --non-interactive --accept-risk --skip-health --mode local \
     --auth-choice custom-api-key \
     --custom-base-url "http://<your-endpoint>/v1" \
     --custom-model-id "<model>" --custom-api-key "$KEY" \
     --custom-compatibility openai \
     --gateway-auth token --gateway-token "$GENERATED_TOKEN"
   ```
   Preinstall any provider/runtime plugin with `--accept-capabilities` **before** this step.
4. **Bind loopback by default.** For LAN access set `gateway.bind: "lan"` (0.0.0.0) — but remember
   non-loopback requires auth, and add `gateway.controlUi.allowedOrigins` for the fnOS web origin.
5. **For the Control UI**, open `http://<nas-ip>:18789/` — **not** `/control`. Provision a browser
   session with `openclaw dashboard --no-open --json`.
6. **For pairing:** drive everything over **loopback**, where `autoApproveLocal` (default `true`) makes
   pairing silent. For remote clients, poll `openclaw devices list --json` and call
   `openclaw devices approve <requestId>` with the **exact** id — never `--latest` (preview only, exit 1).
7. **State/permissions:** `chmod 700 ~/.openclaw`, `chmod 600 ~/.openclaw/openclaw.json`; ensure
   `~/.openclaw` is not on tmpfs; if you relocate config, use `OPENCLAW_CONFIG_PATH` — **never a symlink**.
8. **Do not parse `~/.openclaw/devices/*.json`** — that is legacy; live state is in
   `~/.openclaw/state/openclaw.sqlite`.

---

## 10. Explicitly unverified / caveats

I want to be precise about what I could **not** confirm, so you do not build on sand:

1. **The fnOS systemd user-service/linger story.** OpenClaw installs a *user* systemd unit
   (`~/.config/systemd/user/openclaw-gateway.service`). Whether fnOS's init/persistence keeps that
   alive across reboots without `loginctl enable-linger` is **not documented by OpenClaw**. Verify on a
   real fnOS box.
2. **The exact minimal boolean set for a hand-written `openclaw.json` to fully start the Gateway.** I
   verified the hard gate (`gateway.mode=local`) but not that a minimal file passes `openclaw doctor`
   end-to-end. Use `onboard --non-interactive` for a known-good config, then patch.
3. **GUI application-package integration for fnOS** (how a third-party app registers its port, icon, and
   reverse proxy in fnOS) — outside OpenClaw's docs; I did not investigate.
4. **Whether `gateway.nodes.pairing.autoApproveLocal` also covers DM/channel pairing.** The docs place
   it under device pairing and describe "first-time device pairing plus role and scope upgrades", so I
   read it as **device-only**. Channel DM pairing appears to always require
   `openclaw pairing approve`. **[UNVERIFIED]** for exotic mixed cases.
5. **Version drift.** Everything above is pinned to `openclaw@2026.9.5` / wire version 4 /
   `@openclaw/gateway-*@2026.8.1`. OpenClaw ships very frequently (the docs reference schema version
   "13 – Unreleased"), and the docs explicitly warn that package versions and wire versions are
   separate. Re-verify the `device_pairing_pending` DDL and the `--latest` preview behaviour against
   whichever version you pin.
6. **`x-openclaw-scopes` HTTP header semantics.** The docs say it is *ignored* on the shared-secret
   bearer path. I did not test the trusted-proxy path.
