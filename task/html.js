"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const config = require("../config.json");
const path = config.path;

const html = () => {
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

module.exports = html;
