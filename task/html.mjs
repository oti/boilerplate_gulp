import gulp from "gulp";
import browserSync from "browser-sync";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import config from "../config.json";
const { path } = config;

export const html = () => {
  return gulp
    .src([path.src.html, path.src.html_ignore])
    .pipe(plumber())
    .pipe(
      pug({
        locals: config,
        pretty: true,
      })
    )
    .pipe(gulp.dest(path.dist.html))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};
