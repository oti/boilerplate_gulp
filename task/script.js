"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const path = require("../config.json").path;

const script = () => {
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

module.exports = script;
