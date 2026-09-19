#!/bin/bash
#
# Build the fnOS application package (FPK).
#
# `fnpack build` copies its *entire* source directory to a temp dir before
# packing, and it prints "Packing failed." while still exiting 0 — so this
# script stages only the files that belong in the package and greps the output
# instead of trusting the exit status.

set -euo pipefail
umask 022

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${ROOT}/dist"
STAGE="$(mktemp -d /tmp/openclaw-studio-build.XXXXXX)"
chmod 755 "${STAGE}"

cleanup() { rm -rf "${STAGE}"; }
trap cleanup EXIT

APPNAME="$(awk -F= '/^appname/{gsub(/[ \t]/,"",$2);print $2}' "${ROOT}/manifest")"
VERSION="$(awk -F= '/^version/{gsub(/[ \t]/,"",$2);print $2}' "${ROOT}/manifest")"

echo "==> staging package files (${APPNAME} ${VERSION})"
mkdir -p "${STAGE}"

# Everything the FPK should contain — nothing else.
cp "${ROOT}/manifest" "${STAGE}/"
cp "${ROOT}/ICON.PNG" "${STAGE}/"
cp "${ROOT}/ICON_256.PNG" "${STAGE}/"
cp -r "${ROOT}/config" "${STAGE}/config"
cp -r "${ROOT}/cmd" "${STAGE}/cmd"
cp -r "${ROOT}/wizard" "${STAGE}/wizard"
# Stamp the version into the payload before copying: fnOS keeps `manifest`
# outside the app directory, so the running server cannot read it via a
# relative path. Writing it into app/ means it rides along with every copy.
cat >"${ROOT}/app/version.json" <<JSON
{
  "appname": "${APPNAME}",
  "version": "${VERSION}",
  "builtAt": "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
}
JSON

cp -r "${ROOT}/app" "${STAGE}/app"

# Never ship editor/OS junk.
find "${STAGE}" \( -name '.DS_Store' -o -name 'Thumbs.db' -o -name '*.swp' -o -name '*~' \) -delete

# Normalise modes: fnOS derives the run user from the appname and the packer
# preserves whatever modes it finds, so set them here instead of inheriting a
# restrictive umask from the build shell.
find "${STAGE}" -type d -exec chmod 755 {} +
find "${STAGE}" -type f -exec chmod 644 {} +
chmod 755 "${STAGE}"/cmd/*

echo "==> package contents"
( cd "${STAGE}" && find . -type f | sort | sed 's|^\./|    |' )

echo
echo "==> running fnpack build (${APPNAME} ${VERSION})"

LOG="$(mktemp)"
( cd "${STAGE}" && fnpack build -d . ) >"${LOG}" 2>&1 || true
cat "${LOG}"

# fnpack exits 0 even when packing fails — inspect the output instead.
if grep -qi 'packing failed' "${LOG}"; then
    echo
    echo "!! fnpack reported a failure (see above)" >&2
    rm -f "${LOG}"
    exit 1
fi

FPK="${STAGE}/${APPNAME}.fpk"
if [ ! -f "${FPK}" ]; then
    echo "!! expected artifact not found: ${FPK}" >&2
    rm -f "${LOG}"
    exit 1
fi

mkdir -p "${OUT_DIR}"
TARGET="${OUT_DIR}/${APPNAME}_${VERSION}.fpk"
cp "${FPK}" "${TARGET}"
rm -f "${LOG}"

echo
echo "==> built ${TARGET}"
ls -lh "${TARGET}"
echo
echo "    install with:  appcenter-cli install-fpk ${TARGET}"
