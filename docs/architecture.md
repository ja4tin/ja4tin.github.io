# 系统架构 (Architecture)

## 项目概览
本项目是一个个人主页 Monorepo，包含多个子项目，展示个人简介、作品集、相册等。

## 目录结构
- `homepage/`: 主页，使用 Gulp + Pug + Less 构建。基于 WebGL Fluid Simulation 背景。
- `gallery/`: 相册，React 应用，原名 AnimatedGallery。
- `projects/`: 作品集展示，React 应用。
- `about/`: 个人简介，基于 React 的终端模拟器 (Terminal UI)。
- `docs/`: 项目文档。
- `deploy.sh`: 统一部署脚本。

## 技术栈
- **包管理器**: pnpm (全项目统一)
- **构建工具**:
    - Homepage: Gulp
    - Gallery: Rsbuild (推测/待确认) / CRA
    - Projects: Rsbuild (推测/待确认)
    - About: nwb
- **前端技术**:
    - React (Gallery, Projects, About)
    - Pug/Less/Vanilla JS (Homepage)
    - WebGL (Homepage Background)

## 部署架构
- 所有子项目构建输出被汇总至 `dist/` 目录。
- `deploy.sh` 负责串行构建所有子项目并整合。
- 最终产物可部署至 GitHub Pages 或任何静态 Web 服务器。

## 关键依赖
- **资源**: 本地化 `assets/` (如鼠标指针)，移除对 `cdn.jsdelivr.net` 的部分依赖。
- **配置**: 各子项目独立配置 (`config.json`, `package.json`)。
