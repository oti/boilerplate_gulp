import gulp from "gulp";
import browserSync from "browser-sync";
import imagemin from "gulp-imagemin";
import changed from "gulp-changed";
import { path } from "../config.json";

export const image = () => {
  return gulp
    .src(path.src.image)
    .pipe(changed(path.dist.image))
    .pipe(gulp.dest(path.dist.image))
    .pipe(
      imagemin([imagemin.mozjpeg({ quality: 80 }), imagemin.optipng()], {
        verbose: true,
      })
    )
    .pipe(browserSync.stream());
};
