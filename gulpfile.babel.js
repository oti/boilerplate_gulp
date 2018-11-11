/* ========================================
//
//   gulpfile.babel.js
//    - build system の設定
//
// ======================================== */

// load modules
import run          from 'run-sequence';
import gulp         from 'gulp';
import browserSync  from 'browser-sync';
import pluginLoader from 'gulp-load-plugins';

// load configuration
import config       from './gulp-config';

let $        = pluginLoader();
let src      = config.src;
let dest     = config.dest;
let settings = config.settings;

// define tasks
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['css:preprocessor', 'doc:copy', 'video:copy', 'json:copy', 'js:copy', 'js:webpack', 'image:sprite', 'image:minify', 'html']);
gulp.task('release', ['image:sprite', 'image:minify', 'html', 'doc:copy', 'json:copy', 'video:copy', 'js:copy']);

/**
 * watch task
 */
gulp.task('watch', () => {
  $.watch(src.htmlFiles , () => run('html'));
  $.watch(src.cssFiles  , () => run('css:preprocessor'));
  $.watch(src.jsFiles   , () => run('js:webpack'));
  $.watch(src.imageFiles, () => run('image:minify'));

  src.sprites.forEach((spriteDir) => {
    $.watch(spriteDir, () => run('image:sprite'));
  });
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: dest.root
    },
    startPath: dest.path
  });
});

/**
 * html task
 */
gulp.task('html', () => {
  return gulp.src(src.htmlFiles)
    .pipe($.plumber())
    .pipe($.filter((file) => !/\/_/.test(file.path)))
    .pipe($.pug({
      pretty: !process.env.NODE_ENV
    }))
    .pipe(gulp.dest(dest.htmlDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * videoをdestにコピーするだけのタスク
 */
gulp.task('video:copy', () => {
  gulp.src(src.videoFiles)
    .pipe(gulp.dest(dest.videoDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * docをdestにコピーするだけのタスク
 */
gulp.task('doc:copy', () => {
  gulp.src(src.docFiles)
    .pipe(gulp.dest(dest.docDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * JSをdestにコピーするだけのタスク
 */
gulp.task('js:copy', () => {
  gulp.src(src.jsDir + '/others/**/*.js')
    .pipe(gulp.dest(dest.jsDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * jsonをdestにコピーするだけのタスク
 */
gulp.task('json:copy', () => {
  gulp.src(src.jsonFiles)
    .pipe(gulp.dest(dest.jsonDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * js:webpack task
 */
gulp.task('js:webpack', () => {
  gulp.src(src.jsDir)
    .pipe($.webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(dest.jsDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/**
 * js:linter task
 */
gulp.task('js:linter', () => {
  gulp.src(src.jsFiles)
    .pipe($.plumber())
    .pipe(gulp.dest(dest.jsDir))
    .pipe($.filter((file) => !/lib/.test(file.path)))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});


/**
 * css:preprocessor task
 */
gulp.task('css:preprocessor', () => {
  return gulp.src(src.cssFiles)
    .pipe($.plumber())
    .pipe($.filter(file => !/\/_/.test(file.path)))
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.combineMq({
        beautify: true
    }))
    .pipe(gulp.dest(dest.cssDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * css:minify task
 */
gulp.task('css:minify', ['css:preprocessor'], () => {
  gulp.src(dest.cssFiles)
    .pipe($.csso())
    .pipe(gulp.dest(dest.cssDir));
});

/**
 * image:minify task
 */
gulp.task('image:minify', () => {
  var dir = [src.imageFiles];
  settings.spritesmith.forEach((sprite) => {
    dir.push('!' + sprite.srcFile + '/*');
  });

  gulp.src(dir)
    .pipe($.plumber())
    .pipe($.changed( dest.imageDir ))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive      : true,
      interlaced       : true
    }))
    .pipe(gulp.dest(dest.imageDir));
});


/**
 * image:sprite task
 */
gulp.task('image:sprite', () => {
  settings.spritesmith.forEach((sprite) => {
    var options = {
      imgName: sprite.imgName,
      cssName: sprite.cssName,
      imgPath: sprite.imgPath
    };
    var spriteData = gulp.src(`${sprite.srcFile}/*.png`)
      .pipe($.plumber())
      .pipe($.spritesmith(options));

    spriteData.img.pipe(gulp.dest(sprite.destImg));
    spriteData.css.pipe(gulp.dest(sprite.destCSS));
  });
});
