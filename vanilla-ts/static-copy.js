import copy from 'recursive-copy'
import del from 'del'

const baseDir = `node_modules/cesium/Build/CesiumUnminified`
const targets = [
  'Assets/**/*',
  'ThirdParty/**/*',
  'Widgets/**/*',
  'Workers/**/*',
  'Cesium.d.ts',
  'Cesium.js',
  'Cesium.js.map'
]

del(targets.map((src) => `public/${src}`))
copy(baseDir, `public`, {
  expand: true,
  overwrite: true,
  filter: targets
})