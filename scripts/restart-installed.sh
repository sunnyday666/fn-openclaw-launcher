#!/bin/bash
#
# Restart an installed fnOS app through its own cmd/main.
#
# cmd/main requires the TRIM_* variables fnOS normally supplies, so they are
# reconstructed here. Credentials come from the environment — see deploy.sh.
#
#   export NAS_USER=... NAS_PASS=...

set -euo pipefail

: "${NAS_USER:?set NAS_USER}"
: "${NAS_PASS:?set NAS_PASS}"

APPNAME="${APPNAME:-openclaw.studio}"
APPDEST="/vol1/@appcenter/${APPNAME}"
PKGVAR="/vol1/@appdata/${APPNAME}"
PKGHOME="/vol1/@apphome/${APPNAME}"

TRIM_ENV="TRIM_APPNAME=${APPNAME} TRIM_APPDEST=${APPDEST} TRIM_PKGVAR=${PKGVAR} TRIM_PKGHOME=${PKGHOME} TRIM_TEMP_LOGFILE=/tmp/${APPNAME}.log"

run() {
  sudo -S -u "${APPNAME}" env ${TRIM_ENV} bash "/var/apps/${APPNAME}/cmd/main" "$1" >/dev/null 2>&1
}

echo "${NAS_PASS}" | sudo -S -v
run stop
sleep 4
run start
sleep 10
if echo "${NAS_PASS}" | sudo -S -u "${APPNAME}" env ${TRIM_ENV} bash "/var/apps/${APPNAME}/cmd/main" status; then
  echo "STATUS: running"
else
  echo "STATUS: stopped"
fi
