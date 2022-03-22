# Usage

``` sh
npx degit openspacing/cesium-vite-template#main my-proj-name

# or you use other package manager
pnpx degit openspacing/cesium-vite-template#main my-proj-name
```

# Introduction

This is a `Hello World` project for CesiumJS using Vite bundler and VanillaJS (with Typescript support).

Considering that CesiumJS must use some static assets that can be copy from its `Build/` directory, I write an simple nodejs script to copy them into `public/` directory. 

When after dependencies installed will run the script (`static-copy.js`), or when you change CesiumJS version, please rerun `static-copy` script :

``` sh
pnpm static-copy

npm run static-copy

yarn static-copy
```

... to copy the static assets from cesium dependency folder.

**Remind that it always use unminified build version.** Considering to use environment variables (such as `VITE_IS_MINIFY` or `USING_COMPRESS_VERSION`) to control which build version to use.