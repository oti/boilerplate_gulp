import gulp from "gulp";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import babel from "gulp-babel";
import uglify from "gulp-uglify-es";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "../webpack.config.js";

export const script = (_, dest) => {
  return plumber()
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(babel())
    .pipe(uglify({}))
    .pipe(gulp.dest(dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};
