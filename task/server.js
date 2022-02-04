import browserSync from "browser-sync";
import { path } from "../config.json";

export const server = (done) => {
  browserSync.init(
    {
      ui: false,
      server: {
        baseDir: path.doc_root,
      },
      port: 3000,
      startPath: "/",
      open: true,
    },
    done
  );
};
