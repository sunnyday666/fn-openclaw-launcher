#!/bin/bash
#
# Deploy the current source into an *installed* fnOS app and restart it.
# Useful for iterating without a full uninstall/reinstall cycle.
#
# Credentials are never hard-coded. Export them first:
#
#   export NAS_HOST=192.168.1.10
#   export NAS_USER=admin
#   export NAS_PASS='...'          # consumed via sshpass -e, never in argv
#
# Usage: scripts/deploy.sh [--rebuild]

set -euo pipefail
umask 022

: "${NAS_HOST:?set NAS_HOST to the fnOS address}"
: "${NAS_USER:?set NAS_USER to an fnOS account with sudo}"
: "${NAS_PASS:?set NAS_PASS to that account's password}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APPNAME="$(awk -F= '/^appname/{gsub(/[ \t]/,"",$2);print $2}' "${ROOT}/manifest")"
APP="/vol1/@appcenter/${APPNAME}"

# `sshpass -e` reads the password from SSHPASS, keeping it out of `ps`.
export SSHPASS="${NAS_PASS}"
SSH=(sshpass -e ssh -o StrictHostKeyChecking=accept-new "${NAS_USER}@${NAS_HOST}")
REMOTE_SUDO="echo \"\$SSHPASS_REMOTE\" | sudo -S"

if [ "${1:-}" = "--rebuild" ]; then
    "${ROOT}/scripts/build-fpk.sh" >/dev/null
    echo "rebuilt fpk"
fi

echo "==> syncing payload to ${APP} on ${NAS_HOST}"
tar czf /tmp/openclaw-studio-payload.tgz -C "${ROOT}" app
"${SSH[@]}" "sudo -S tar xzf /tmp/openclaw-studio-payload.tgz -C '${APP}' --strip-components=1 \
  && sudo -S chown -R '${APPNAME}' '${APP}' \
  && sudo -S chmod -R a+rX '${APP}' \
  && echo synced" <<<"${NAS_PASS}"

# cmd/main is only valid with fnOS's TRIM_* environment, so drive the restart
# through the App Center CLI instead.
echo "==> restarting app"
"${SSH[@]}" "sudo -S appcenter-cli stop '${APPNAME}' >/dev/null 2>&1 || true" <<<"${NAS_PASS}"
sleep 3
"${SSH[@]}" "sudo -S appcenter-cli start '${APPNAME}' 2>&1 | tail -2" <<<"${NAS_PASS}"
echo "done"
