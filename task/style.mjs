import gulp from "gulp";
import browserSync from "browser-sync";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob-use-forward";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import plumber from "gulp-plumber";

const sass = gulpSass(dartSass);

export const style = (src, dest) => {
  return gulp
    .src(src, {
      sourcemaps: true,
    })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "compressed",
      }),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(csso())
    .pipe(
      gulp.dest(dest, {
        sourcemaps: "./sourcemaps",
      }),
    )
    .pipe(browserSync.stream());
};
