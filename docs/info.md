# 项目分析报告 (Project Analysis Report)

## 1. 概述 (Overview)
`The page` 是一个异构的 Monorepo，包含四个独立子项目，旨在构建一个多元化的个人网站。

| 项目/目录 | 作用 | 源码位置 | Build输出位置 | 技术栈关键点 |
| :--- | :--- | :--- | :--- | :--- |
| **HomePage** | 网站主页 | `/HomePage` | `/HomePage/dist` | **Gulp**, Pug, Less, ES6 |
| **Gallery** | 在线相册 | `/AnimatedGallery-main` | `/AnimatedGallery-main/dist` | **Rsbuild**, React 17, Web Workers |
| **Projects** | 作品集 | `/projects` | `/projects/dist` | **Rsbuild**, React 19, Framer Motion |
| **About** | 终端页 | `/about` | `/about/dist` (demo) | **nwb**, React 16, Styled Components |

---

## 2. 详细技术栈 (Detailed Tech Stack)

### 2.1 HomePage (主页)
传统静态页面构建工作流。
*   **Core**: HTML5, jQuery (推断), ES6+
*   **Templating**: **Pug** (前 Jade) -用于模块化 HTML。
*   **Styling**: **Less** - CSS 预处理器。
*   **Build Tool**: **Gulp 4**
    *   `gulp-pug`: 编译 pug。
    *   `gulp-less`: 编译 less。
    *   `gulp-babel`: JS 转译。
    *   `gulp-clean-css` / `gulp-uglify`: 资源压缩。

### 2.2 Gallery (相册 - AnimatedGallery)
高性能图片展示应用，注重动效和加载性能。
*   **Core**: **React 17**
*   **Build Tool**: **Rsbuild** (基于 Rspack 的高性能构建工具) - *注意：已被确认为最新源码*。
*   **Key Libraries**:
    *   `react-blurhash` & `blurhash`: 生成和展示模糊占位图。
    *   `react-images`: 灯箱（Lightbox）效果。
    *   `resize-observer-polyfill`: 响应式监听。
    *   `sharp`: (Build time) 后端图片处理库，用于生成 blurhash 和压缩图片。
    *   **Web Workers**: 之前的脚本使用了 Worker 线程并行处理图片哈希。
*   **Data Source**: 本地 `public/photos` 目录，通过脚本生成元数据。

### 2.3 Projects (作品集 - FolioSpace)
现代化、高交互性的单页应用。
*   **Core**: **React 19** (Rc/Beta), **TypeScript**
*   **Build Tool**: **Rsbuild**
*   **Styling & UI**:
    *   CSS Modules / Global CSS
    *   **Framer Motion**: 复杂的页面过渡和元素动画。
    *   **GSAP**: 高性能动画补充。
*   **Quality**: ESLint 9, Prettier.

### 2.4 About (关于我)
终端模拟器风格的组件库/页面。
*   **Core**: **React 16**
*   **Build Tool**: **nwb** (React 组件开发工具包)
*   **Styling**: **Styled Components** (CSS-in-JS)。
*   **Architecture**:
    *   设计为一个可发布的 npm package (`about`)。
    *   包含一个 `demo` 应用用于展示。
    *   `commands.js` 定义了终端指令逻辑。

## 3. 项目依赖关系 (Dependencies)
*   各子项目相互独立，无共享的 `node_modules`（非 Workspace 模式）。
*   **部署依赖**: 最终通过构建脚本将各子项目的 `dist` 目录聚合到根目录的特定路径下发布。

## 4. 开发注意事项
*   **Node 版本**: 由于项目跨度大（React 16 到 19），需注意 Node.js 版本兼容性。建议使用 Node 18+ 或使用 nvm 管理。
*   **构建顺序**: Gallery 需要先运行图片处理脚本 (`npm run photos`) 再构建应用。
