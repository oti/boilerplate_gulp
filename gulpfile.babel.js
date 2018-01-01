import browserSync  from 'browser-sync';
import gulp         from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat       from 'gulp-concat';
import csso         from 'gulp-csso';
import filter       from 'gulp-filter';
import imagemin     from 'gulp-imagemin';
import jshint       from 'gulp-jshint';
import cmq          from 'gulp-merge-media-queries';
import plumber      from 'gulp-plumber';
import pug          from 'gulp-pug';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';
import watch        from 'gulp-watch';
import stylish      from 'jshint-stylish';
import run          from 'run-sequence';

const SRC_ROOT  = './src';
const DIST_ROOT = './dist';

const config = {
  port: 3000,
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'ie >= 9',
      'iOS 8',
      'Android 4.1'
    ]
  },
  src: {
    root       : SRC_ROOT,
    htmlFiles  : `${SRC_ROOT}/html/**/*.pug`,
    cssDir     : `${SRC_ROOT}/style`,
    cssFiles   : `${SRC_ROOT}/style/**/*.scss`,
    jsDir      : `${SRC_ROOT}/script`,
    jsFiles    : `${SRC_ROOT}/script/**/*.js`,
    jslib      : `${SRC_ROOT}/script/lib/**/*.js`,
    imageDIr   : `${SRC_ROOT}/image`,
    imageFiles : `${SRC_ROOT}/image/**/*.{png,jpg,jpeg,gif,ico}`
  },
  dest: {
    root       : DIST_ROOT,
    htmlFiles  : `${DIST_ROOT}/**/*.html`,
    cssDir     : `${DIST_ROOT}/style`,
    cssFiles   : `${DIST_ROOT}/style/**/*.css`,
    jsDir      : `${DIST_ROOT}/script`,
    jsFiles    : `${DIST_ROOT}/script/**/*.js`,
    imageDir   : `${DIST_ROOT}/image`,
    imageFiles : `${DIST_ROOT}/image/**/*.{png,jpg,jpeg,gif,ico}`
  }
};

const src  = config.src;
const dist = config.dest;

// server & browser sync
gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: dist.root,
      proxy: 'localhost:'+config.port
    }
  });
});

// browser sync reload
gulp.task('reload', function(){
  browserSync.reload();
});

// Pug
gulp.task('html', () => {
  return gulp.src(src.htmlFiles)
    .pipe(plumber())
    .pipe(filter((file) => !/\/_/.test(file.path)))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dist.root))
    .pipe(browserSync.stream());
});

// vendor js concat & uglify
gulp.task('jslib', () => {
  return gulp.src(src.jslib)
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(uglify({output:{comments: /^!/}}))
    .pipe(gulp.dest(dist.jsDir))
    .pipe(browserSync.stream());
});

// lint js
gulp.task('jshint', () => {
  return gulp.src(src.jsFiles)
    .pipe(plumber())
    .pipe(filter((file) => !/lib/.test(file.path)))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browserSync.stream());
});

// imagemin
gulp.task('image', () => {
  return gulp.src(src.imageFiles)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive      : true,
      interlaced       : true
    }))
    .pipe(gulp.dest(dist.imageDir))
    .pipe(browserSync.stream());
});

// sass
gulp.task('style', () => {
  return gulp.src(src.cssFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: config.autoprefixer.browsers}))
    .pipe(cmq())
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.cssDir))
    .pipe(browserSync.stream());
});

// watch
gulp.task('watch', () => {
  watch([src.htmlFiles],  (e) => gulp.start(['html', 'reload']));
  watch([src.jsFiles],    (e) => gulp.start(['jshint']));
  watch([src.jslib],      (e) => gulp.start(['jslib']));
  watch([src.cssFiles],   (e) => gulp.start(['style']));
  watch([src.imageFiles], (e) => gulp.start(['image']));
});


// build
// - only compile
gulp.task('build', (callback) => run(['html', 'style', 'image', 'jshint', 'jslib'], callback));

// default
//  - local development task
gulp.task('default', (callback) => run(['build', 'server', 'watch'], callback));
