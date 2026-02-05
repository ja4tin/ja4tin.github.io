# 项目进展 (Progress)

## 当前状态

- **阶段**: 重构与更新 (Rebranding & Refactoring)
- **目标**: 统一视觉风格，规范化工程结构。

## 已完成事项

- [x] **目录重命名**: `HomePage` -> `homepage`, `AnimatedGallery-main` -> `gallery`.
- [x] **构建工具**: 统一使用 `pnpm`，更新 `deploy.sh`。
- [x] **清理**: 删除未使用的 build artifacts 和 `.DS_Store`。
- [x] **视觉统一**:
  - 下载并本地化鼠标指针 (`default.cur`, `pointer.cur`) 此前依赖 CDN。
  - 统一所有子项目的 Favicon。
- [x] **Gallery 配置**: 更新 `gallery/package.json` 中的作者信息和 CDN 路径 (`./photos/`)。
- [x] **Projects**: 替换 `public/index.html` 中的 Manifest 和 ServiceWorker 链接为 `ja4tin.com`。
- [x] **Homepage**: 移除 `head.pug` 中的外部字体引用，移除 `scripts.pug` 中的外部日志脚本。
- [x] **验证**: 运行完整构建流程，所有子项目构建成功。

## 构建结果

```
🎉 All projects built successfully!
📂 Output directory: /Users/ja4tin/Desktop/Github/The page/dist
```

### 各子项目状态

| 项目 | 状态 | 备注 |
|------|------|------|
| Homepage | ✅ | Gulp 构建成功 |
| Gallery | ✅ | Rsbuild 构建成功 |
| Projects | ✅ | Rsbuild 构建成功 |
| About | ✅ | NWB 构建成功 |

---

## 2024-01-14: 修复自定义光标样式

### 问题描述
Gallery 和 Projects 页面的自定义光标 (`.cur` 文件) 无法加载，浏览器控制台显示 404 错误。

### 根因分析
Rsbuild 构建时，CSS 文件生成在 `dist/[project]/static/css/` 目录，而光标文件位于 `dist/[project]/static/image/`。

原配置 `assetPrefix: './'` 导致 CSS 中生成的路径为 `./static/image/xxx.cur`，这相对于 CSS 文件位置解析为 `/static/css/static/image/xxx.cur`（错误路径）。

### 解决方案
将 `gallery/rsbuild.config.mjs` 和 `projects/rsbuild.config.mjs` 中的 `assetPrefix` 从 `'./'` 改为 `'auto'`，让 Rsbuild 自动计算正确的相对路径。

修复后，CSS 中的路径变为 `../../static/image/xxx.cur`，正确指向光标文件。

### 验证结果
- Gallery 页面：✅ 自定义光标正常显示
- Projects 页面：✅ 自定义光标正常显示
- 控制台：无 404 错误

---

## 2026-02-05: 隐私清理与项目更新

### 主要变更
1.  **用户体验优化**:
    *   优化 `TitleSlide` 中的 `mailto:` 链接处理，避免打开空白页。
    *   在 Projects 页面新增 `Invoice` 项目展示，并将其位置调整至左上方，避免遮挡。
    *   扩大 Projects 页面的全局概览（Overview）视野（Scale 4.5 -> 6.0）。
    *   在 About 页面的终端中新增 `invoice` 命令，支持快速打开报销工具。
2.  **文档更新**:
    *   在 `README.md` 中新增「添加新项目指南」。
