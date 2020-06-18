module.exports = {
  mode: "production",
  entry: {
    script: "./src/script/script.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/asset/script",
  },
  resolve: {
    extensions: [".js"],
  },
};
