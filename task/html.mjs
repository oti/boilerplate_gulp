import gulp from "gulp";
import browserSync from "browser-sync";
import pug from "gulp-pug";
import plumber from "gulp-plumber";

export const html = (src, dest) => {
  return gulp
    .src(src)
    .pipe(plumber())
    .pipe(
      pug({
        locals: {
          // pug に値を渡したい時はここに。
        },
        pretty: true,
      })
    )
    .pipe(gulp.dest(dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};
