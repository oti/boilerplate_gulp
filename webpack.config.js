module.exports = {
  mode: 'production',

  // メインのJS
  entry: './src/script/script.js',
  // 出力ファイル
  output: {
    filename: 'script.js'
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  }
}