module.exports = {
  mode: 'production',
  entry: {
    script: './src/script/script.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/script'
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  }
}
