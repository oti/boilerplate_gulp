'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const path = require('../config.json').path;

const style = () => {
  return gulp.src(path.src.style, {
    sourcemaps: true
  })
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest(path.dist.style, {
      sourcemaps: './sourcemaps'
    }))
    .pipe(browserSync.stream());
}

module.exports = style