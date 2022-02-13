import gulp from "gulp";

import { serve } from "./task/serve.mjs";
import { html } from "./task/html.mjs";
import { style } from "./task/style.mjs";
import { script } from "./task/script.mjs";
import { image } from "./task/image.mjs";

const path = {
  doc_root: "dist/",
  src: {
    html: "src/html/**/*.pug",
    html_ignore: "!src/html/_partial/**.pug",
    style: "src/style/**/*.scss",
    script: "src/script/**/*.js",
    image: "src/image/**/*.{jpg,png,gif,svg}",
  },
  dest: {
    html: "dist/",
    style: "dist/asset/style",
    script: "dist/asset/script",
    image: "dist/asset/image",
  },
};

export const b = (done) => serve(done, path.doc_root);
export const h = () =>
  html([path.src.html, path.src.html_ignore], path.dest.html);
export const c = () => style(path.src.style, path.dest.style);
export const i = () => image(path.src.image, path.dest.image);
export const s = () => script(undefined, path.dest.script);

export const w = (done) => {
  gulp.watch([path.src.html], h);
  gulp.watch([path.src.style], c);
  gulp.watch([path.src.script], i);
  gulp.watch([path.src.image], s);
  done();
};

// npx gulp build
export const build = gulp.series(h, c, i, s);

// npx gulp
export default gulp.series(build, w, b);
