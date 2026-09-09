# OpenClaw 启动器

基于飞牛官方启动器修改，由晴川维护发布的社区版 OpenClaw 一键部署方案，自动跟随 OpenClaw 最新稳定版，适配飞牛 NAS 环境。

## 安装

从 [Releases](https://github.com/sunnyday666/fn-openclaw-launcher/releases) 下载最新 `.fpk` 文件，在飞牛应用中心 → 手动安装即可。

首次启动会自动从 npm 安装与本机 Node 版本兼容的最新 OpenClaw（约 1-2 分钟），安装完成后浏览器访问控制台，信任自签名证书即可使用。

## 核心特性

**版本管理**
- 自动解析本机 Node 版本，从 registry 选取满足 `engines.node` 约束的最新稳定版
- 当前环境（Node 24.15）自动选择 2026.9.2，不会因 Node 版本不满足而启动失败

**网络适配**
- 网关直接 TLS（`--bind lan` + 门户证书），浏览器直连 `https://NAS:端口/control`
- 放行 RFC2544 / IPv6 ULA，兼容 Clash、sing-box 等 fake-IP DNS 环境
- 显式声明 model catalog URL，远程模型目录走 SSRF 放行路径

**自动化运维**
- 设备配对自动批准（每 10s 轮询 pending 请求，精确批准）
- 渠道插件免审安装（`--force + --accept-capabilities`）
- 频道配置自愈（qqbot `allowFrom` 非法项自动修正）
- 启动时自动剥离旧版不识别的配置键

**UI 修复**
- 静态文件 charset=utf-8，解决中文厂商名乱码
- 移除启动器内置的推广弹窗组件

## 内置模型厂商预设

启动器内置 15 个模型厂商连接预设，用户也可在控制台「模型配置」页面自行添加其他 OpenAI 兼容服务。

| 厂商 | Provider ID | 接口类型 |
|---|---|---|
| 阿里云百炼 | `bailian` / `bailian-coding` | OpenAI 兼容 |
| Anthropic | `anthropic` | Anthropic Messages |
| Google | `google` | Google Generative AI |
| MiniMax | `minimax` / `minimax-cn` | Anthropic Messages |
| Kimi Coding | `kimi-coding` | Anthropic Messages |
| Mistral | `mistral` | OpenAI 兼容 |
| Moonshot | `moonshot` | OpenAI 兼容 |
| OpenAI | `openai` | OpenAI Responses |
| Ollama（本地） | `ollama` | Ollama |
| OpenRouter | `openrouter` | OpenAI 兼容 |
| Together | `together` | OpenAI 兼容 |
| xAI | `xai` | OpenAI 兼容 |
| 智谱 GLM | `zai` | OpenAI 兼容 |

## 模型目录

内置 1131 个模型的离线快照作为兜底，涵盖主流云端和本地模型。在线环境下模型目录会从 catalog.openclaw.ai 自动刷新。

## 项目结构

```
├── manifest                      # FPK 元数据（应用名、版本、依赖）
├── app/
│   ├── server/index.js           # 监控器后端（Bun，14K+ 行打包代码）
│   ├── ui/                       # 前端 SPA（React + Semi Design）
│   └── config/                   # 引导快照、权限、提示词
├── cmd/
│   ├── main                      # 进程生命周期（start/stop/status）
│   ├── install_callback          # 安装回调（版本解析 + bun add）
│   ├── upgrade_callback          # 升级回调（模型快照播种）
│   ├── uninstall_init            # 卸载前清理（精确 PID 终止）
│   └── ...
├── config/
│   ├── bootstrap/                # 模型目录离线快照
│   ├── openclaw-version.env      # OPENCLAW_VERSION=latest
│   ├── privilege                 # 运行用户配置
│   └── resource                  # 数据共享配置
└── wizard/uninstall              # 卸载向导
```

## 构建

```bash
# 依赖：nodejs_v24 + bunjs
fnpack build -d .
# 输出：openclaw.launcher.fpk
```

## 版本历史

| 版本 | 说明 |
|---|---|
| v1.0 | 重命名为 `openclaw.launcher`，避免与官方冲突；Shell 脚本健壮性修复；安装包移至 Releases |
| v0.2.7 | 安全移除启动器内推广组件；Charset 修复；设备配对改进；视觉模型自动修复 |
| v0.2.2 | 全面适配 OpenClaw 2026.9.1：版本跟随、配置 schema、网关 TLS、fake-IP 放行 |

## 许可证

基于飞牛官方启动器修改，由晴川维护发布，由晴川维护发布，仅用于学习和自用。OpenClaw 本身遵循其官方许可证，详见 [OpenClaw](https://github.com/openclaw/openclaw)。
