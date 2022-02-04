import gulp from "gulp";
import browserSync from "browser-sync";
import nodeSass from "node-sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import plumber from "gulp-plumber";
import { path } from "../config.json";

const sass = gulpSass(nodeSass);

export const style = () => {
  return gulp
    .src(path.src.style, {
      sourcemaps: true,
    })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
      })
    )
    .pipe(csso())
    .pipe(
      gulp.dest(path.dist.style, {
        sourcemaps: "./sourcemaps",
      })
    )
    .pipe(browserSync.stream());
};
