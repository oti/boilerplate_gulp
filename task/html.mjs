import gulp from "gulp";
import browserSync from "browser-sync";
import pug from "gulp-pug";
import plumber from "gulp-plumber";

const locals = {
  _siteName: "Gulp Web Dev Boilerplate",
  _siteDesc: "Gulp を使ったウェブサイト開発環境のボイラープレートです。",
  _siteKeywords: "boilerplate, template, webdev, gulp",
  _siteHost: "https://exmaple.com",
  _sitePath: "",
  _siteOGP: "/asset/image/ogp.png",
  _siteStyle: "/asset/style/style.css",
  _siteScript: "/asset/script/script.js",
};

export const html = (src, dest) => {
  return gulp
    .src(src)
    .pipe(plumber())
    .pipe(
      pug({
        locals,
        pretty: true,
      }),
    )
    .pipe(gulp.dest(dest))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
};
