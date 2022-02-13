import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "production",
  entry: {
    script: "./src/script/script.js",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname + "/asset/script"),
  },
  resolve: {
    extensions: [".js"],
  },
};
