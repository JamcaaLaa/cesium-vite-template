import { defineConfig, loadEnv } from 'vite'
import { resolve as resolvePath } from 'path'
import htmlConfig from 'vite-plugin-html-config'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default ({ mode: VITE_MODE }: { mode: string }) => {
  const env = loadEnv(VITE_MODE, process.cwd())
  console.log('VITE_MODE: ', VITE_MODE)
  console.log('ENV: ', env)

  const plugins = []
  const htmlConfigHeaderScripts = []

  // ******* Always use external CesiumJS in production mode *******
  // ******* 总是在 production 模式外部化 CesiumJS 库（可以用CDN代替，后续考虑使用环境变量） *******
  if (VITE_MODE === 'production') {
    const externalConfig = viteExternalsPlugin({
      cesium: 'Cesium'
    })
    plugins.push(externalConfig)
    htmlConfigHeaderScripts.push({
      src: './Cesium.js'
    })
  }

  // ******* Always use external CesiumJS's style util official package output. *******
  // ******* 直到官方 CesiumJS 包导出样式文件前，都使用外部样式 *******
  plugins.push(
    htmlConfig({
      links: [
        {
          rel: 'stylesheet',
          href: './Widgets/widgets.css'
        }
      ]
    })
  )

  return defineConfig({
    root: './',
    build: {
      assetsDir: 'statics',
      minify: ['false'].includes(env.VITE_IS_MINIFY) ? false : true
    },
    plugins: plugins,
    resolve: {
      alias: {
        '@': resolvePath(__dirname, 'src')
      }
    }
  })
}
