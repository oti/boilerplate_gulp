'use strict';

// load plugins
var gulp = require('gulp');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-merge-media-queries');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

// load config
var config  = require('./config.json', 'utf8');


// server & browser sync
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: config.dist,
      proxy: config.proxy
    }
  });
});

// Jade
gulp.task('jade', function() {
  return gulp.src(config.src + 'jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

// vendor js concat & uglify
gulp.task('jsVendor', function() {
  return gulp.src(config.src + 'js/vendor/**/*.js')
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest(config.dist + 'js/'))
    .pipe(browserSync.stream());
});

// custom js
gulp.task('js', function() {
  return gulp.src(config.src + 'js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist + 'js/'))
    .pipe(sourcemaps.write('./'))
    .pipe(browserSync.stream());
});

// imagemin
gulp.task('imagemin', function() {
  return gulp.src(config.src + 'img/**/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist + 'img'))
    .pipe(browserSync.stream());
});

// sass
gulp.task('sass', function() {
  return gulp.src(config.src + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: config.browserSupport
    }))
    .pipe(cmq({
      log: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist + 'css'))
    .pipe(browserSync.stream());
});

// copy:font
gulp.task('copy:font', function() {
  return gulp.src(config.src + 'font/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(config.dist + 'font'))
    .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function() {
  watch([config.src + 'jade/**/*.jade'], function(e) {
    gulp.start(['jade']);
  });

  watch([config.src + 'js/*.js'], function(e) {
    gulp.start(['js']);
  });

  watch([config.src + 'js/vendor/*.js'], function(e) {
    gulp.start(['jsVendor']);
  });

  watch([config.src + 'scss/**/*.scss'], function(e) {
    gulp.start(['sass']);
  });

  watch([config.src + 'img/**/*'], function(e) {
    gulp.start(['imagemin']);
  });

  watch([config.src + 'font/**/*'], function(e) {
    gulp.start(['copy:font']);
  });
});


// build
// - only compile
gulp.task('build', function(callback) {
  runSequence(['jade', 'sass', 'imagemin', 'copy:font', 'jsVendor', 'js'], callback);
});

// default
//  - local development task
gulp.task('default', function(callback) {
  runSequence(['build', 'server', 'watch'], callback);
});
