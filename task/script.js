import gulp from "gulp";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import babel from "gulp-babel";
import uglify from "gulp-uglify-es";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "../webpack.config.js";
import { path } from "../config.json";

export const script = () => {
  return plumber()
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(babel())
    .pipe(uglify({}))
    .pipe(gulp.dest(path.dist.script))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};
