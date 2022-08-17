# 介绍

这个项目是 CesiumJS 在 Vite 的三个模板下的最佳新建项目的实践。

- Vanilla
- Vue3
- React18

所有的工程均默认定位到中国上空，且去除了所有 UI 元素。

所有的工程均使用了 `pnpm` 作为包管理器，若你不用 `pnpm` 可以参考着改动。

所有工程均不生成 `package-lock` 文件，即 pnpm 的 `pnpm-lock.yaml`，yarn 的 `yarn.lock`，以及 npm 的 `package-lock.json`，配置见 `.npmrc` 文件。

按需参考，注意 `vite.config.ts` 中的配置规则与使用到的插件。

## 静态文件复制脚本

每个项目均提供了一个 `static-copy.js` 脚本，原理很简单，就是调用 NodeJS 进行文件复制，最后由 vite 在启动开发服务器时访问 `public` 下的 CesiumJS，或 build 时把 `public` 下的 CesiumJS 原封不动复制到分发目录。

每当项目依赖安装完成后，即会执行这个脚本（见 `postinstall` 命令）。

## 关于 `cesium` 为什么是开发依赖（devDependencies）

原因有三：

- `cesium` 包不参与打包
- `CesiumJS` 的库文件和静态资源文件均复制到了 `public/lib/cesium` 文件夹下，并根据环境变量设置了 `CESIUM_BASE_URL`，也即使用外部库的方式加载 CesiumJS
- 项目一般是 App，而不是 Library 发布到 [npmjs.com](https://www.npmjs.com)，所以没必要放在依赖项中，放在开发依赖就可以

# 依赖版本更新问题

若你使用的是 `pnpm`，你可以全部更新：

```sh
pnpm update *@latest
```

也可以单独更新某个依赖，比如 `vite` 或 `cesium`

```sh
pnpm update cesium@latest
pnpm update cesium@1.97
pnpm update vite@latest
```

注意，如果你更新的是 `cesium`，必须重新执行一次静态资源文件的复制脚本，即：

```sh
pnpm static-copy
```

# 构建速度与体积

这就是优势，无论速度与生成产物的体积远远优于打包式。

## 开发启动速度

Vanilla

```
VITE v3.0.8  ready in 264 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Vue

```
VITE v3.0.8  ready in 359 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

React

```
VITE v3.0.8  ready in 426 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 体积

Vanilla

```
vite v3.0.8 building for production...
✓ 4 modules transformed.
dist/favicon.17e50649.svg   1.49 KiB
dist/index.html             0.63 KiB
dist/index.7ae69996.js      1.51 KiB / gzip: 0.85 KiB
dist/index.b4fcc688.css     0.15 KiB / gzip: 0.13 KiB
```

Vue

（因为加入了 pinia 全局状态管理库，所以体积稍大一些）

```
vite v3.0.8 building for production...
✓ 32 modules transformed.
dist/index.html           0.53 KiB
dist/index.f6170881.css   0.31 KiB / gzip: 0.22 KiB
dist/index.4508ce51.js    73.00 KiB / gzip: 28.69 KiB
```

React

```
vite v3.0.8 building for production...
✓ 24 modules transformed.
dist/favicon.17e50649.svg   1.49 KiB
dist/index.html             0.56 KiB
dist/index.e6f8be43.css     0.10 KiB / gzip: 0.09 KiB
dist/index.53365258.js      139.72 KiB / gzip: 45.10 KiB
```