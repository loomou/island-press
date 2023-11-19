# Island Press

一个基于 Vitejs 的静态站点生成器，使用 React 框架进行渲染。使用Vitejs提供足够快的启动速度，带来良好的开发体验。内置一套默认的文档主题，可以快速搭建一个文档、博客站点，内置 MDX 支持，可以在文档中渲染自定义的 React 组件。

## 快速开始

### 1. 初始化项目

#### 手动安装

手动初始化项目。首先，你可以通过以下命令创建一个新目录：

```bash
mkdir island-press-app && cd island-press-app
```

执行 `npm init -y` 来初始化一个项目。你可以使用 npm、yarn 或 pnpm 安装 IslandPress：

```bash
# npm
npm install island-press
# yarn
yarn add island-press
# pnpm
pnpm add island-press
```

然后通过如下命令创建文件：

```bash
mkdir docs && echo '# Hello World' > docs/index.md
```

在 `package.json` 中加上如下的脚本：

```bash
{
  "scripts": {
    "dev": "island dev docs",
    "build": "island build docs",
    "preview": "island start docs"
  }
}
```

### 2. 启动 Dev Server

通过如下命令启动本地开发服务:

```bash
# npm
npm run dev
# yarn
yarn dev
# pnpm
pnpm dev
```

### 3. 生产环境构建

通过如下命令构建生产环境的产物：

```bash
# npm
npm run build
# yarn
yarn build
# pnpm
pnpm build
```

默认情况下，IslandPress  将会把产物打包到 `docs/build` 目录。

### 4. 本地预览产物

通过如下命令启动本地预览服务:

```bash
# npm
npm run preview
# yarn
yarn preview
# pnpm
pnpm preview
```

这样 IslandPress 将在 `http://localhost:4173` 启动预览服务。

## 约定式路由

### 什么是约定式路由

IslandPress 使用的是文件系统路由，页面的文件路径会简单的映射为路由路径，这样会让整个项目的路由非常直观。

例如，如果在 `docs` 目录中有一个名为 `foo.md` 的文件，则该文件的路由路径将是 `/foo`。

## 映射规则

IslandPress  会自动扫描根目录和所有子目录，并将文件路径映射到路由路径。例如，如果你有以下的文件结构：

```bash
docs
├── foo
│   └── bar.md
└── foo.md
```

> 在之前的入门项目中，启动脚本是 `island dev docs`，所以根目录是 `docs`。

那么 `bar.md` 的路由路径会是 `/foo/bar`，`foo.md` 的路由路径会是 `/foo`。

具体映射规则如下：

|    文件路径     |  路由路径  |
| :-------------: | :--------: |
|   `index.md`    |    `/`     |
|    `/foo.md`    |   `/foo`   |
|  `/foo/bar.md`  | `/foo/bar` |
| `/zoo/index.md` |   `/zoo`   |

## 配置项

### 基础配置

#### base

- Type: `string`

站点标题。这个参数将被用作 HTML 页面的标题。

#### description

- Type: `string`

站点描述。这将用作 HTML 页面的描述。

### 主题配置

#### nav

- Type: `Array`

网站的导航栏。`nav` 配置是 `NavItemWithLink` 的数组，具有以下类型：

```typescript
type NavItemWithLink = {
  // 导航栏文本
  text: string;
  // 导航栏链接
  link: string;
}
```

#### sidebar

- Type: `Object`

网站的侧边栏。配置为一个对象，类型如下：

```typescript
interface Sidebar {
  [path: string]: SidebarGroup[];
}

interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}

type SidebarItem = {
  text: string;
  link: string;
} | {
  text: string;
  link?: string;
  items: SidebarItem[];
};
```