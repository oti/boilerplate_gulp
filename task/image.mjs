import gulp from "gulp";
import browserSync from "browser-sync";
import changed from "gulp-changed";
import imagemin, { mozjpeg, optipng } from "gulp-imagemin";

export const image = (src, dest) => {
  return gulp
    .src(src)
    .pipe(changed(dest))
    .pipe(
      imagemin([mozjpeg({ quality: 80 }), optipng()], {
        verbose: true,
      })
    )
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
};
