# OpenClaw 管家 · fnOS 启动器

面向飞牛 fnOS 的 **独立** OpenClaw 一体化启动器。不基于官方或社区版本修改，从零实现，
可与官方启动器并存安装、互不影响。

核心目标只有一个：**在飞牛桌面点开 OpenClaw，浏览器立刻就能用，不需要任何手动批准设备。**

---

## 它是怎么做到「打开即自动注册」的

OpenClaw 的网关只对**受信任的本机（回环）连接**静默批准设备配对。浏览器直接访问
`http://<NAS-IP>:18789/` 属于远程连接，会被挡在「等待批准」页面后面——这是飞牛上使用
OpenClaw 最大的摩擦点。

本项目没有去绕过这个机制，而是让访问**本来就发生在回环上**：

```
浏览器 ──▶ 启动器 (18790 / fnOS 应用套接字) ──▶ 127.0.0.1:18789 网关
                    ↑ 反向代理（含 WebSocket）
```

启动器把 OpenClaw 控制台反向代理到自己的地址下，网关看到的连接来自 `127.0.0.1`，
于是按其自身设计（`gateway.nodes.pairing.autoApproveLocal`）**静默、持久地**完成设备登记。

实测结果（本机 fnOS 1.2.0604）：

```
NEW PAIRED DEVICE — openclaw-control-ui role=operator via=silent
console errors : 0    page errors : 0    failed requests : 0
```

网关认证（令牌）依然强制生效，被自动化的只有设备配对这一步。

同时保留了**轮询自动批准**作为兜底：从局域网直连网关端口时，启动器会轮询配对队列并
自动批准（可在界面中关闭，有角色白名单与速率限制）。

---

## 主要特性

**运行时自持，不依赖飞牛的 Node 版本**

飞牛自带 `nodejs_v24` 为 24.15.0，而 `openclaw@2026.9.5` 要求 `>=24.16.0`。启动器会
自行下载并持有 Node 24.x LTS 到应用数据目录，安装 OpenClaw 前自动解析
`engines.node` 约束，挑选**本机运行时真正兼容的最新稳定版**。升级本应用不会影响
其他飞牛应用，反之亦然。

**首次启动自动就绪**

安装包仅 ~80 KB，不含 OpenClaw。应用启动后自动在后台下载运行时与 OpenClaw
（实测约 40 秒），面板实时显示进度。可在「服务设置」中关闭。

**Fake-IP DNS 兼容**

Clash / sing-box 等会把所有域名解析到 `198.18.0.0/15`，触发 OpenClaw 的 SSRF 防护
（`Blocked: resolves to private/internal/special-use IP address`）。启动器已处理三处：

| 现象 | 处理方式 |
|---|---|
| 远程模型目录被拦截 | 显式声明 `models.catalogRefresh.url`，走网关的「已配置来源」放行路径 |
| 网页抓取、浏览器被拦截 | 放行 `allowRfc2544BenchmarkRange` 与 IPv6 ULA |
| 服务商图标 404 | 由启动器代理层直接获取（仅限图标 CDN 白名单） |

**不碰模型配置**

启动器**不提供模型配置功能**，也不会写入任何模型／服务商配置——从根源上杜绝与 OpenClaw
官方配置互相覆盖。模型请在 OpenClaw 自带控制台的「模型设置」里配置，或直接编辑
`openclaw.json`；本应用只读取它用于诊断展示。

早期版本曾内置模型服务商管理，已移除。仅保留一项网络相关的托管配置：

```
models.catalogRefresh.url    固定为官方目录地址，使其在 Fake-IP DNS 环境下能通过 SSRF 校验
```

这不是模型定义，只是让 OpenClaw 自己的目录刷新能正常工作。

**设备注册：同一浏览器只保留一条**

浏览器把设备身份存在 localStorage 里，按**源（origin）**隔离。这带来两个后果：

- 访问地址变了（IP 换主机名、换了端口）就会被当成**新设备**；
- 同一设备重复注册时，新旧记录会**并存约 60 秒**——OpenClaw 只清理超过
  `PRUNE_RECENT_APPROVAL_GRACE_MS = 60s` 且未在线的旧记录。

所以「只用一个浏览器却看到多条记录」是宽限期内的瞬时状态，不是失控的反复注册。
本应用针对性做了两件事：

1. **固定控制台访问地址**为规范主机（`launcher.publicHost`，留空则取首个局域网 IP），
   使浏览器始终复用同一个源，不会因主机名变化而重新注册；
2. **「清理重复设备」**按钮，按 OpenClaw 自身的分组规则（clientId + clientMode +
   displayName）立即清理，保留最近使用的一条。默认先预检数量再执行。

**配置写入始终经过 OpenClaw 校验**

`openclaw.json` 是 JSON5。启动器不会用 `JSON.parse` 读它（解析失败会导致整个配置被
覆盖），而是先做 JSON5 容错解析，再通过 `openclaw config patch --stdin` 写入——
校验不通过的配置**永远不会落盘**。

---

## 界面

五个面板，深浅色跟随飞牛桌面主题，无构建步骤、无前端依赖。

| 面板 | 内容 |
|---|---|
| **总览** | 部署四步进度、状态卡片、一键安装／启动／打开控制台 |
| **服务设置** | 端口、绑定范围、认证令牌、TLS、端口占用检测、自动启动 |
| **设备与配对** | 自动注册开关、待批准队列、已注册设备、批准方式与记录 |
| **运行日志** | 网关／安装／配对三类日志滚动查看 |
| **高级** | 系统信息、运维操作、原始配置查看 |

截图见 `docs/screenshots/`。

---

## 项目结构

```
├── manifest                  # FPK 元数据
├── app/
│   ├── server/
│   │   ├── index.js          # HTTP 服务、路由、生命周期
│   │   └── lib/
│   │       ├── paths.js      # 路径解析（含 TRIM_* 归属校验）
│   │       ├── openclaw.js   # 运行时与 OpenClaw 安装、配置读写
│   │       ├── gateway.js    # 网关进程管理
│   │       ├── pairing.js    # 自动注册引擎
│   │       ├── proxy.js      # 控制台反向代理 + 图标
│   │       ├── settings.js   # 启动器自身设置
│   │       └── tasks.js      # 长任务管理
│   └── ui/                   # 前端（原生 JS，无构建）
├── cmd/                      # fnOS 生命周期脚本
├── config/                   # privilege / resource
├── wizard/                   # 安装向导
└── scripts/
    ├── build-fpk.sh          # 打包（含 fnpack 失败检测）
    ├── deploy.sh             # 部署到已安装的应用
    ├── make-icons.mjs        # 生成图标
    ├── e2e-pairing.mjs       # 自动注册端到端测试
    ├── e2e-embedded.mjs      # 飞牛桌面内嵌模式全流程测试
    ├── check-desktop.mjs     # 桌面图标 / 打开应用
    ├── check-portal-route.mjs# 门户路由探测（登录态）
    └── ui-smoke.mjs          # 界面渲染测试
```

---

## 构建与安装

```bash
# 生成图标（已提交，通常无需重跑）
node scripts/make-icons.mjs

# 打包，产物在 dist/
./scripts/build-fpk.sh

# 安装到本机
sudo appcenter-cli install-fpk dist/openclaw.studio_1.0.1.fpk \
     --env install.env     # wizard_gateway_port / wizard_web_port
```

> `fnpack build` 打包失败时**仍然返回 0**，因此 `build-fpk.sh` 会检查输出文本而不是退出码；
> 它同时在一个干净的暂存目录中构建（`fnpack` 会复制整个源码目录，包含开发用的
> `.dev/` 会直接失败）。

安装后首次打开应用会自动下载运行时与 OpenClaw，约 1 分钟。之后在飞牛桌面点击
「OpenClaw 工作室」即可。

---

## 测试

两套自动化测试，均针对真实安装的应用运行：

```bash
# 自动注册端到端（真实浏览器，局域网来源）
PLAYWRIGHT_BROWSERS_PATH=.dev/browsers node scripts/e2e-pairing.mjs \
  --api http://127.0.0.1:18790 --url "http://<nas-ip>:18790/control/#token=<token>"

# 五个面板渲染 + 深色主题
PLAYWRIGHT_BROWSERS_PATH=.dev/browsers node scripts/ui-smoke.mjs --base http://127.0.0.1:18790

# 飞牛桌面内嵌模式全流程：登录桌面 → 点图标 → 内嵌界面 → 打开 OpenClaw → 自动注册
PLAYWRIGHT_BROWSERS_PATH=.dev/browsers node scripts/e2e-embedded.mjs
```

两者都会在出现任何控制台错误、页面异常或失败请求时以非零码退出。

---

## 飞牛集成的几个坑

把应用嵌进飞牛桌面（`iframe` + `gatewaySocket` 模式）踩了几个坑，每一个都会让桌面窗口
打不开，全部记在这里，省得后来人重走一遍。

### 1. 不要写 `ctl_stop` 字段

`manifest` 里加上 `ctl_stop = false` 会让飞牛应用中心认为**该应用不可被启动/停止**：

- 应用状态永远停在 `nostart`，即使进程实际在运行；
- `appcenter-cli start` 直接返回 `Failed to launch app. error code 10332`；
- 桌面不生成快捷方式。

官方应用与社区启动器的清单里都没有这个字段。移除后状态立刻变为 `running`，桌面图标正常出现。

### 2. 网关路径前缀不能含点号

应用名可以是 `openclaw.studio`（含点），但 `gatewayPrefix` / `url` 必须用不含点号的路径：

```json
"gatewayPrefix": "/app/openclaw-studio",     // 对
"gatewayPrefix": "/app/openclaw.studio",     // 错：门户对 /app/openclaw.studio 直接 404
```

官方应用与早期社区版都遵循这个规律：应用名可以带点，对外挂载路径不带。
**URL 前缀不需要等于应用名。**

### 3. 门户转发的是完整路径，且不补尾斜杠

这两点必须由应用自己处理：

| 现象 | 原因 | 处理 |
|---|---|---|
| 所有静态资源返回 HTML | 门户把 `/app/openclaw-studio/style.css` **原样**转给应用套接字，不剥离自己的挂载前缀；路径不匹配就落到 SPA 兜底，于是 CSS/JS 全变成 HTML，窗口一片空白 | 服务端剥离 `/app/<name>` 前缀后再路由 |
| 资源 404 到 `/app/style.css` | 桌面 iframe 的地址是 `/app/openclaw-studio`（**没有尾斜杠**），相对路径 `style.css` 于是相对 `/app/` 解析 | 服务端把 `/app/<name>` 302 到 `/app/<name>/` |

第二条最初想在页面里动态插 `<base>` 解决，**行不通**：浏览器的预加载扫描器会在内联脚本执行
之前就去取 `<link>`/`<script>`，此时 `<base>` 还没进 DOM。服务端重定向才是可靠做法。

### 4. 自动注册是事件驱动的，不是轮询

早期实现每 2 秒调一次 `device.pair.list`，而每次调用都要**启动一个完整的 Node 进程**
（实测 1.36 秒 CPU）。空闲时约 17 次/分钟 ≈ **38% 单核持续占用**。

现在改为事件驱动：

```
fs.watch(<state>/state)  ──变化──▶ 去抖 400ms ──▶ 廉价预检（13ms）
                                                   │
                                    有待处理 ──────┴────── 无 ──▶ 什么都不做
                                        │
                                        ▼
                              device.pair.* RPC（1.36s，仅在实际需要时）
```

廉价预检直接以只读方式查一次状态库的待批准数量（13 ms，比 RPC 便宜 100 倍），
**仅作为过滤器使用**——真正的批准仍走公开 RPC。读不到就回退到直接调 RPC，
因此正确性不依赖内部表结构。

三个必须注意的实现细节，每一个都曾造成空跑：

1. **反馈回路**：批准用的 RPC 会让网关写状态库，从而再次触发监听。用去抖 + 最小间隔抑制。
2. **无差别触发**：网关自身的心跳等写入也会触发监听，所以必须靠廉价预检过滤。
3. **过期残留**：超过 5 分钟 TTL 的待批准行仍留在表里但 RPC 会忽略，按数量过滤会一直空跑，
   必须按时间过滤。

实测对比：

| | 旧版轮询 | 现在 |
|---|---|---|
| 空闲 RPC | ~17 次/分钟 | **0** |
| 空闲 CPU | ~38% 单核 | **0%**（75 秒实测 0.03 秒） |
| 响应延迟 | 最多 2 秒 | 约 2.6 秒（去抖后） |

另外要说明：**从局域网直连网关端口时，启动器无法代为批准**——飞牛 OpenClaw 要求
`operator.admin` 权限，而启动器持有的令牌没有该权限。这类请求会在界面上标出，
需在 OpenClaw 自带控制台里批准。正常路径（本机回环）不受影响，由网关自身静默完成。

### 5. 静态资源必须协商缓存，并按版本加指纹

UI 的 JS/CSS 最初带 `Cache-Control: public, max-age=3600`。某次升级改变了接口字段后，
浏览器仍执行**上一版的 app.js** 去读已被移除的字段，界面区域渲染成空白——
代码没错，是新后端配旧前端。

现在改为：

- 所有 UI 资源 `Cache-Control: no-cache`（协商缓存，未变更仍走 304，成本很低）；
- 服务端渲染 `index.html` 时给资源 URL 打上版本指纹（`app.js?v=1.1.2`），
  新版本必然是新 URL，浏览器不可能复用旧脚本。

`no-store` 会牺牲 304 的收益，长时间 `max-age` 会造成上面这种前后端错配，
`no-cache` + ETag 才是这里的正解。

### 排查过程中的一个陷阱

**飞牛在安装时就把 `ui/config` 缓存进应用中心数据库了**，之后修改已安装目录里的
`ui/config` 再重启应用**不会生效**。我一开始按这个方式验证「点号是不是问题」「套接字是不是
必须叫 app.sock」，连测四次都是 404，得出了错误结论。任何 `ui/config` 改动都必须
**卸载后重新安装**才能验证。

判断方法：改掉已安装 `ui/config` 里的 `title`，重启后应用中心里显示的仍是旧标题——
说明用的是缓存。

### 桌面入口最终配置

```json
{
    ".url": {
        "openclaw.studio.Application": {
            "title": "OpenClaw 工作室",
            "icon": "images/icon_{0}.png",
            "type": "iframe",
            "protocol": "",
            "gatewayPrefix": "/app/openclaw-studio",
            "gatewaySocket": "openclaw.studio.sock",
            "url": "/app/openclaw-studio",
            "allUsers": false,
            "control": { "accessPerm": "editable" }
        }
    }
}
```

点击桌面图标即在**飞牛桌面窗口内**打开启动器面板；面板里的「打开 OpenClaw」会在新标签页
打开 OpenClaw 控制台（走启动器端口，控制台的根绝对路径资源才能正确解析），
设备依旧自动注册。

---

## 运维说明

- **数据目录**：`/vol1/@apphome/openclaw.studio/data`（升级不覆盖，卸载默认保留）
- **运行用户**：独立低权限用户 `openclaw.studio`，非 root
- **卸载**：应用中心卸载即可；数据目录会保留，便于重装后继续使用
- **端口**：网关 `18789`、本启动器面板 `18790`（均可修改）

### 已验证的环境

飞牛 fnOS 1.2.0604 · Debian 12 · 内核 6.18.18.c1032-trim · x86_64 · Node 24.21.0 ·
OpenClaw 2026.9.5

---

## 许可证

本项目为独立实现，仅用于学习与自用。OpenClaw 遵循其自身许可证。
