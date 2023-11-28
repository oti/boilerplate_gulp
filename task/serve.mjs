import browserSync from "browser-sync";

export const serve = (done, baseDir) => {
  browserSync.init(
    {
      server: {
        baseDir,
      },
    },
    done,
  );
};
