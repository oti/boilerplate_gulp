'use strict';

const gulp = require('gulp');
const server = require('./task/server');
const html = require('./task/html');
const style = require('./task/style');
const script = require('./task/script');
const image = require('./task/image');
const path = require('./config.json').path;

// watch
const watch = done => {
  gulp.watch([path.src.html_src, './config.json'], gulp.parallel(html))
  gulp.watch([path.src.style], gulp.parallel(style));
  gulp.watch([path.src.script], gulp.parallel(script));
  gulp.watch([path.src.image], gulp.parallel(image));
  done();
}

// npx gulp
gulp.task('default', gulp.series(
  html,
  style,
  script,
  image,
  watch,
  server
));
