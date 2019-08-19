'use strict'

const browserSync = require('browser-sync');
const path = require('../config.json').path;

const server = done => {
  browserSync.init({
    ui: false,
    server: {
      baseDir: path.doc_root
    },
    port: 3000,
    startPath: '/',
    open: true
  }, done)
}

module.exports = server