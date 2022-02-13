import gulp from "gulp";
import { server } from "./task/server.mjs";
import { html } from "./task/html.mjs";
import { style } from "./task/style.mjs";
import { script } from "./task/script.mjs";
import { image } from "./task/image.mjs";
import { path } from "./config.json";

// watch
const watch = (done) => {
  gulp.watch([path.src.html_src, "./config.json"], gulp.parallel(html));
  gulp.watch([path.src.style], gulp.parallel(style));
  gulp.watch([path.src.script], gulp.parallel(script));
  gulp.watch([path.src.image], gulp.parallel(image));
  done();
};

// npx gulp
gulp.task("default", gulp.series(html, style, script, image, watch, server));

// npx gulp build
gulp.task("build", gulp.series(html, style, script, image));
