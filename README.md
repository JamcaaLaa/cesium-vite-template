# 介绍

这个项目是 CesiumJS 在 Vite 的三个模板下的最佳新建项目的实践。

- Vanilla
- Vue3
- React18

所有的工程均默认定位到中国上空，且去除了所有 UI 元素。

所有的工程均使用了 `pnpm` 作为包管理器，若你不用 `pnpm` 可以参考着改动。

按需参考，注意 `vite.config.ts` 中的配置规则与使用到的插件。

## 静态文件复制脚本

每个项目均提供了一个 `static-copy.js` 脚本，原理很简单，就是调用 NodeJS 进行文件复制。

每当项目依赖安装完成后，即会执行这个脚本（见 `postinstall` 命令）。

## 关于 `cesium` 为什么是开发依赖（devDependencies）

原因有三：

- `cesium` 包不参与打包
- `CesiumJS` 的库文件和静态资源文件均复制到了 `public/` 文件夹下，并设置了 `CESIUM_BASE_URL`，也即使用外部库的方式加载 CesiumJS
- 项目一般是 App，而不是 Library 发布到 [npmjs.com](https://www.npmjs.com)，所以没必要放在依赖项中，放在开发依赖就可以

# 版本更新问题

若你使用的是 `pnpm`，你可以全部更新：

```sh
pnpm update *
```

也可以单独更新某个依赖，比如 `vite` 或 `cesium`

```sh
pnpm update cesium@1.92.0
pnpm update vite@latest
```

注意，如果你更新的是 `cesium`，必须重新执行一次静态资源文件的复制脚本，即：

```sh
pnpm static-copy
```

# 构建速度与体积

## 开发启动速度

Vanilla

```
vite v2.9.1 dev server running at:

> Local: http://localhost:3000/
> Network: use `--host` to expose

ready in 311ms.
```

Vue

```
vite v2.9.1 dev server running at:

> Local: http://localhost:3000/
> Network: use `--host` to expose

ready in 463ms.
```

React

```
vite v2.9.1 dev server running at:

> Local: http://localhost:3000/
> Network: use `--host` to expose

ready in 513ms.
```

## 体积

Vanilla

```
vite v2.9.1 building for production...
✓ 4 modules transformed.
dist/statics/favicon.63a26457.svg   1.50 KiB
dist/index.html                     0.61 KiB
dist/statics/index.0be17a18.js      1.51 KiB / gzip: 0.85 KiB
dist/statics/index.9d43bca5.css     0.15 KiB / gzip: 0.13 KiB
```

Vue

```
vite v2.9.1 building for production...
✓ 11 modules transformed.
dist/index.html                   0.48 KiB
dist/statics/index.a448db28.css   0.12 KiB / gzip: 0.09 KiB
dist/statics/index.22de33c2.js    52.11 KiB / gzip: 21.01 KiB
```

React

```
vite v2.9.1 building for production...
✓ 26 modules transformed.
dist/statics/favicon.17e50649.svg   1.49 KiB
dist/index.html                     0.52 KiB
dist/statics/index.70c7c9b1.css     0.10 KiB / gzip: 0.09 KiB
dist/statics/index.507309af.js      130.18 KiB / gzip: 42.15 KiB
```