# The Page - 个人主页 Monorepo

一个精心设计的个人主页项目，包含多个子页面，采用现代前端技术栈构建。

## Ja4tin.com[https://ja4tin.com]

## 📁 项目结构

```
The page/
├── homepage/     # 主页入口
├── gallery/      # 照片画廊
├── projects/     # 项目展示
├── about/        # 关于我（终端风格）
├── dist/         # 构建输出目录
└── deploy.sh     # 统一构建脚本
```

## 🛠️ 技术栈概览

| 子项目 | 框架 | 构建工具 | 主要技术 |
| ------ | ---- | -------- | -------- |
| Homepage | 原生 JS | Gulp | Pug, LESS, WebGL |
| Gallery | React 17 | Rsbuild | BlurHash, Masonry |
| Projects | React 19 | Rsbuild | TypeScript, GSAP, Framer Motion |
| About | React 16 | NWB (Webpack) | Styled Components |

---

## 🏠 Homepage

入口页面，展示个人简介和导航链接。

### 技术栈

- **模板引擎**: [Pug](https://pugjs.org/)
- **样式预处理**: [LESS](https://lesscss.org/)
- **构建工具**: [Gulp 4](https://gulpjs.com/)
- **动画效果**: WebGL 流体模拟
- **图标**: 阿里巴巴 iconfont

### 主要依赖

| 包名 | 用途 |
| ---- | ---- |
| gulp-pug | Pug 模板编译 |
| gulp-less | LESS 编译 |
| gulp-babel | ES6+ 转译 |
| gulp-uglify | JS 压缩 |
| gulp-htmlmin | HTML 压缩 |
| gulp-cssnano | CSS 压缩 |
| gulp-autoprefixer | CSS 前缀自动补全 |

---

## 🖼️ Gallery

基于 React 的照片展示页面，支持懒加载和模糊占位符。

### 技术栈

- **框架**: React 17
- **构建工具**: [Rsbuild](https://rsbuild.dev/)
- **图片处理**: Sharp, BlurHash

### 主要依赖

| 包名 | 用途 |
| ---- | ---- |
| react-images | 图片灯箱效果 |
| react-blurhash | 模糊占位符 |
| blurhash | 生成模糊哈希 |
| sharp | 图片处理/压缩 |
| image-size | 获取图片尺寸 |
| resize-observer-polyfill | 响应式布局 |

### 图片预处理

Gallery 包含自定义脚本 `scripts/update.js`，用于：
- 自动生成 BlurHash 占位符
- 计算图片尺寸
- 导出 `photos.js` 数据文件

---

## 💼 Projects

交互式项目展示页面，使用 impress.js 实现 3D 幻灯片效果。

### 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: [Rsbuild](https://rsbuild.dev/)
- **动画库**: GSAP, Framer Motion
- **幻灯片**: [impress.js](https://impress.js.org/)

### 主要依赖

| 包名 | 用途 |
| ---- | ---- |
| react | UI 框架 |
| framer-motion | 声明式动画 |
| gsap | 高性能动画 |
| impress.js | 3D 幻灯片（CDN） |
| @types/react | TypeScript 类型 |

### 外部资源

- Google Fonts (Inter 字体)
- Font Awesome 图标
- Google Analytics

---

## 👤 About

终端风格的个人介绍页面，支持交互式命令。

### 技术栈

- **框架**: React 16
- **构建工具**: [NWB](https://github.com/insin/nwb) (基于 Webpack 4)
- **样式方案**: Styled Components

### 主要依赖

| 包名 | 用途 |
| ---- | ---- |
| styled-components | CSS-in-JS 样式 |
| react-transition-group | 过渡动画 |
| prop-types | Props 类型检查 |

### 内置命令

终端支持多种交互命令，如：
- `help` - 显示帮助
- `intro` - 个人介绍
- `skill` - 技能列表
- `contact` - 联系方式

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
# 进入各子项目目录安装
cd homepage && pnpm install
cd ../gallery && pnpm install
cd ../projects && pnpm install
cd ../about && pnpm install
```

### 开发模式

```bash
# Homepage
cd homepage && pnpm dev

# Gallery
cd gallery && pnpm dev

# Projects
cd projects && pnpm dev

# About
cd about && pnpm dev
```

### 构建生产版本

```bash
# 一键构建所有子项目
./deploy.sh
```

构建输出位于 `dist/` 目录。

### 本地预览

```bash
cd dist
python3 -m http.server 8080
# 访问 http://localhost:8080
```

---

## 📦 部署

`dist/` 目录可直接部署到任意静态托管服务：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

---

## 📄 许可证

LGPL-3.0
