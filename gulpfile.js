import gulp from 'gulp'
import del from 'del'
import gulpIgnore from 'gulp-ignore'

const taskName = process.argv[2]

console.log(`=== Task: ${taskName} will running ===`)

const targets = [
  'Assets/**/*',
  'ThirdParty/**/*',
  'Widgets/**/*',
  'Workers/**/*',
  'Cesium.d.ts',
  'Cesium.js',
  'Cesium.js.map'
]

const staticCopyTask = () => {
  del(targets.map((src) => `public/${src}`))

  const baseDir = `node_modules/cesium/Build/CesiumUnminified`

  return gulp
    .src([`${baseDir}/!(Scene)/**/*`, `${baseDir}/Cesium*`])
    .pipe(gulpIgnore.exclude(`${baseDir}/Scene`))
    .pipe(gulp.dest('public'))
}
staticCopyTask.displayName = 'static-copy'
staticCopyTask.description = '复制 CesiumJS 的静态文件到 demo/public 目录下'

export { staticCopyTask }
