'use strict';

/**
 * Central path resolution for the OpenClaw Studio launcher.
 *
 * Everything the launcher owns lives under a single data root so that
 * uninstalling the app can remove it in one shot, and so the app never
 * depends on another fnOS package's private directories.
 *
 *   <data>/
 *     runtime/node/        self-contained Node.js runtime
 *     openclaw/            npm prefix where openclaw itself is installed
 *     ocstate/             OPENCLAW_STATE_DIR (openclaw.json, sqlite state)
 *     ochome/              HOME for the gateway process
 *     workspace/           agent workspace
 *     logs/                launcher + gateway logs
 *     cache/               npm cache, node compile cache
 *     launcher.json        launcher settings (owned by this app)
 */

const path = require('node:path');
const fs = require('node:fs');

/** The fnOS appname this package registers as. */
const APPNAME = 'openclaw.studio';

function envPath(name) {
  const raw = process.env[name];
  return raw && raw.trim() ? raw.trim() : null;
}

/**
 * Whether the TRIM_* environment actually belongs to THIS app.
 *
 * fnOS exports these variables to an app's lifecycle scripts, but they leak
 * into any process started from that environment (a shell, a supervisor, a
 * test harness). Blindly trusting `TRIM_APPDEST` therefore risks writing to —
 * or deleting files inside — a completely different application's directory.
 *
 * We only honour TRIM_* when `TRIM_APPNAME` names this app. When launched by
 * an app with no `TRIM_APPNAME` at all, or a different one, we fall back to
 * paths derived from our own data root.
 */
function trustTrimEnv() {
  const name = envPath('TRIM_APPNAME');
  return name === APPNAME;
}

/** The appname fnOS would use for this package. */
function appName() {
  return APPNAME;
}

/**
 * Resolve the app's private data root.
 *
 * Priority:
 *   1. OPENCLAW_STUDIO_DATA_DIR  (explicit override, used by tests/dev)
 *   2. TRIM_PKGHOME/data         (fnOS package home, survives upgrades)
 *   3. <repo>/.data              (fallback so the server can run standalone)
 */
function resolveDataDir() {
  const override = envPath('OPENCLAW_STUDIO_DATA_DIR');
  if (override) return path.resolve(override);

  if (trustTrimEnv()) {
    const pkgHome = envPath('TRIM_PKGHOME');
    if (pkgHome) return path.join(pkgHome, 'data');
  }

  return path.resolve(__dirname, '..', '..', '..', '.data');
}

/** Directory of the deployed app payload (where ui/ and server/ live). */
function resolveAppDest() {
  const override = envPath('OPENCLAW_STUDIO_APPDEST');
  if (override) return path.resolve(override);
  if (trustTrimEnv()) {
    const dest = envPath('TRIM_APPDEST');
    if (dest) return dest;
  }
  return path.resolve(__dirname, '..', '..');
}

/** Directory used for runtime scratch: pid files, sockets, transient logs. */
function resolveVarDir() {
  if (trustTrimEnv()) {
    const pkgVar = envPath('TRIM_PKGVAR');
    if (pkgVar) return pkgVar;
  }
  return path.join(resolveDataDir(), 'var');
}

/** The volume root the app is installed on (e.g. /vol1). */
function resolveVolDir() {
  if (trustTrimEnv()) return envPath('TRIM_APPDEST_VOL') || null;
  return null;
}

/**
 * Path of the unix socket the fnOS portal proxies to.
 *
 * Deliberately kept inside our own payload directory, and never derived from
 * an unverified environment: deleting or replacing a socket that belongs to
 * another app would silently break that app's portal integration.
 */
function resolveSocketPath() {
  const override = envPath('OPENCLAW_STUDIO_SOCKET');
  if (override) return path.resolve(override);
  // Under fnOS the portal looks for the socket beside the app payload.
  if (trustTrimEnv()) return path.join(resolveAppDest(), `${APPNAME}.sock`);
  // Standalone / development: keep scratch files out of the source tree.
  return path.join(resolveVarDir(), `${APPNAME}.sock`);
}

const DATA_DIR = resolveDataDir();
const APP_DEST = resolveAppDest();
const VAR_DIR = resolveVarDir();

const paths = {
  get dataDir() {
    return DATA_DIR;
  },
  get appDest() {
    return APP_DEST;
  },
  get varDir() {
    return VAR_DIR;
  },
  get volDir() {
    return resolveVolDir();
  },

  // Persistent payload
  get runtimeDir() {
    return path.join(DATA_DIR, 'runtime');
  },
  get nodeDir() {
    return path.join(DATA_DIR, 'runtime', 'node');
  },
  get nodeBin() {
    return path.join(DATA_DIR, 'runtime', 'node', 'bin', 'node');
  },
  get npmBin() {
    return path.join(DATA_DIR, 'runtime', 'node', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js');
  },

  get openclawDir() {
    return path.join(DATA_DIR, 'openclaw');
  },
  get openclawBin() {
    return path.join(DATA_DIR, 'openclaw', 'node_modules', 'openclaw', 'openclaw.mjs');
  },
  get openclawPkgJson() {
    return path.join(DATA_DIR, 'openclaw', 'node_modules', 'openclaw', 'package.json');
  },

  get stateDir() {
    return path.join(DATA_DIR, 'ocstate');
  },
  get openclawConfig() {
    return path.join(DATA_DIR, 'ocstate', 'openclaw.json');
  },

  get homeDir() {
    return path.join(DATA_DIR, 'ochome');
  },
  get workspaceDir() {
    return path.join(DATA_DIR, 'workspace');
  },

  get logsDir() {
    return path.join(DATA_DIR, 'logs');
  },
  get cacheDir() {
    return path.join(DATA_DIR, 'cache');
  },
  get npmCacheDir() {
    return path.join(DATA_DIR, 'cache', 'npm');
  },
  get compileCacheDir() {
    return path.join(DATA_DIR, 'cache', 'node-compile');
  },

  // Launcher-owned files
  get settingsFile() {
    return path.join(DATA_DIR, 'launcher.json');
  },
  get gatewayPidFile() {
    return path.join(VAR_DIR, 'gateway.pid');
  },
  get gatewayMetaFile() {
    return path.join(VAR_DIR, 'gateway.meta.json');
  },
  get launcherPidFile() {
    return path.join(VAR_DIR, 'app.pid');
  },
  /** Present only while the user has deliberately stopped the gateway. */
  get gatewayStoppedMarker() {
    return path.join(VAR_DIR, 'gateway.stopped');
  },
  get appSocket() {
    return resolveSocketPath();
  },
  get installLog() {
    return path.join(DATA_DIR, 'logs', 'install.log');
  },
  get gatewayLog() {
    return path.join(DATA_DIR, 'logs', 'gateway.log');
  },
  get pairingLog() {
    return path.join(DATA_DIR, 'logs', 'pairing.log');
  },
  get tasksDir() {
    return path.join(VAR_DIR, 'tasks');
  },

  /** UI directory inside the deployed app payload. */
  get uiDir() {
    return path.join(APP_DEST, 'ui');
  },

  /** Ensure the core directory skeleton exists. */
  ensure() {
    const dirs = [
      DATA_DIR,
      paths.runtimeDir,
      paths.openclawDir,
      paths.stateDir,
      paths.homeDir,
      paths.workspaceDir,
      paths.logsDir,
      paths.cacheDir,
      paths.npmCacheDir,
      paths.compileCacheDir,
      VAR_DIR,
      paths.tasksDir,
    ];
    for (const dir of dirs) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }
    }
  },
};

module.exports = paths;
module.exports.APPNAME = APPNAME;
module.exports.trustTrimEnv = trustTrimEnv;
module.exports.appName = appName;
module.exports.resolveSocketPath = resolveSocketPath;
