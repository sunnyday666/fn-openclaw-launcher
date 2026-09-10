# Node.js v24.21.0 安装包（OpenClaw 专用）

`openclaw.node` —— 一个一次性的飞牛应用包，把官方 **Node.js v24.21.0 (linux-x64)** 装进系统
`nodejs_v24` 应用的运行时目录，并补齐官方 Node 二进制必需的 **libatomic.so.1**。

## 为什么需要它

| 项目 | 版本 |
| --- | --- |
| 飞牛应用中心 `nodejs_v24` 自带 | **24.15.0** |
| `openclaw@2026.9.3` 要求 | `>=24.16.0 <25 \|\| >=26.1.0` |

Node 低于 24.16 时，启动器只能解析并安装偏旧的 OpenClaw 版本（当前为 2026.9.2）。
本包把 Node 升到 **24.21.0 LTS**，与系统同大版本，原生模块 ABI 完全兼容。

另外，官方 Node 二进制硬依赖 `libatomic.so.1`，而 fnOS 精简 rootfs 里没有这个库
（飞牛自带的 Node 是自行编译的，不需要它）。直接用官方二进制会报：

```
error while loading shared libraries: libatomic.so.1: cannot open shared object file
```

本包已内置该库，安装时放进 `/usr/lib/x86_64-linux-gnu/`（ld.so 内置搜索路径，
无需 `ldconfig` 也能生效），并执行一次 `ldconfig`。

## 构建

```bash
# 依赖：fnpack
./fetch-vendor.sh          # 下载并校验官方 Node tarball（约 32MB，不入库）
fnpack build -d .          # 输出 openclaw.node.fpk
```

> **发布约定**：上传到 Releases 时改名为 **`openclaw.node_<version>.fpk`**
> （例如 `openclaw.node_1.0.0.fpk`），避免不同版本同名无法区分。

## 安装行为

1. 定位 `/var/apps/nodejs_v24/target`（软链到 `/vol1/@appcenter/nodejs_v24`）
2. 若无 `libatomic.so.1`，安装到 `/usr/lib/x86_64-linux-gnu/`（失败则退回 `/usr/local/lib/x86_64-linux-gnu/`）
3. 把原版 Node 运行时打包备份到 `/var/apps/openclaw.node/home/backup/`（文件名附带原版本号）
4. 解包并覆盖 `nodejs_v24` 的运行时，最后用 `node --version` 校验，版本不符即报错

> **注意**：本包会覆盖系统 `nodejs_v24` 应用中的 Node 运行时。若之后在应用中心升级
> `nodejs_v24`，覆盖会被还原，需要重新安装本包。

安装日志：`/var/log/apps/openclaw.node.log`（与飞牛其他应用一致，由应用中心以 root 身份
执行 `cmd/install_callback` 并收集其输出）。

## 卸载行为

- 仅当 `nodejs_v24` 当前版本仍是本包装上的 `v24.21.0` 时才还原原版备份
  （避免覆盖用户后来手动升级的版本）；还原采用「先解到临时目录校验，再整体替换」
- 仅在成功还原后移除本包安装的 `libatomic.so.1`

## 本地测试

安装脚本支持通过环境变量指向沙箱目录干跑，生产环境无需设置：

```bash
TRIM_APPDEST=/tmp/sb/appdest \
TRIM_PKGHOME=/tmp/sb/apphome \
OPENCLAW_NODE_NODEJS_APP=/tmp/sb/apps/nodejs_v24 \
OPENCLAW_NODE_ATOMIC_DIRS=/tmp/sb/atomic \
OPENCLAW_NODE_SKIP_ROOT_CHECK=1 \
LD_LIBRARY_PATH=/tmp/sb/atomic \
bash cmd/install_callback
```
