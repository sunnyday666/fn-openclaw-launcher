#!/bin/bash

### 下载并校验构建 openclaw.node 所需的官方 Node 运行时。
### 该 tarball 约 32MB，不入库，构建前先跑一次本脚本。

set -e

NODE_VERSION="v24.21.0"
DIST_NAME="node-${NODE_VERSION}-linux-x64"

cd "$(dirname "$0")"

VENDOR_DIR="app/vendor"
TARBALL="${VENDOR_DIR}/${DIST_NAME}.tar.xz"

# 官方 Node v24.21.0 linux-x64 的 sha256（来自 SHASUMS256.txt）
EXPECTED_SHA256="fd8e59d5a511510f6a298afb548f18c7d2b1be404d8b4a27d94fbe49f56cb2d6"

MIRRORS=(
    "https://cdn.npmmirror.com/binaries/node"
    "https://nodejs.org/dist"
)

mkdir -p "${VENDOR_DIR}"

if [ -f "${TARBALL}" ]; then
    actual="$(sha256sum "${TARBALL}" | awk '{print $1}')"
    if [ "${actual}" = "${EXPECTED_SHA256}" ]; then
        echo "已存在且校验通过：${TARBALL}"
        exit 0
    fi
    echo "已存在但校验不通过，重新下载：${TARBALL}"
    rm -f "${TARBALL}"
fi

for base in "${MIRRORS[@]}"; do
    url="${base}/${NODE_VERSION}/${DIST_NAME}.tar.xz"
    echo "下载 ${url} ..."
    if curl -fsSL --retry 2 --connect-timeout 20 -o "${TARBALL}.part" "${url}"; then
        actual="$(sha256sum "${TARBALL}.part" | awk '{print $1}')"
        if [ "${actual}" = "${EXPECTED_SHA256}" ]; then
            mv -f "${TARBALL}.part" "${TARBALL}"
            echo "校验通过：${TARBALL}"
            exit 0
        fi
        echo "校验失败（期望 ${EXPECTED_SHA256}，实际 ${actual}），换下一个镜像"
    else
        echo "下载失败，换下一个镜像"
    fi
    rm -f "${TARBALL}.part"
done

echo "错误：所有镜像都下载失败，无法构建。" >&2
exit 1
