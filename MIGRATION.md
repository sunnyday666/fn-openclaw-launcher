# 关于本次仓库内容替换

本仓库原先托管的是社区版 **OpenClaw 启动器**（`openclaw.launcher` v1.0.6）。

自本次提交起，仓库内容替换为独立实现的 **OpenClaw 管家**（fnOS 启动器）。
两者不是同一份代码：新项目从零实现，不基于官方或社区版本修改。

**旧版本仍然可以取回**，并非被删除：

```bash
git fetch --tags
git checkout legacy-launcher-v1.0.6      # 归档标签
# 或查看历史
git log legacy-launcher-v1.0.6
```

旧的发布标签（`v1.0.0` … `v1.0.6`、`node-v1.0.0`）与历史提交全部保留。
