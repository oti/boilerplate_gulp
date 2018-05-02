/* ========================================
//
//   gulp-config.js
//    - gulpfile.jsで使用する設定
//
// ======================================== */

import _ from 'underscore';

const SRC_ROOT  = './src';
const DEST_ROOT = './htdocs';

let sprites = [
  { dir : `${SRC_ROOT}/image`, name: 'sprite-pc' },
  { dir : `${SRC_ROOT}/image`, name: 'sprite-sp' },
];

// constant
var settings = exports.settings = {
  browserslist: [
    'last 2 versions',
    'IE >= 10',
    'iOS >= 8',
    'Android >= 4.2'
  ],
  spritesmith: getSprites()
};

var src = exports.src = {
  root       : SRC_ROOT,
  htmlFiles  : `${SRC_ROOT}/html/**/*.pug`,
  cssDir     : `${SRC_ROOT}/style`,
  cssFiles   : `${SRC_ROOT}/style/**/*.scss`,
  jsDir      : `${SRC_ROOT}/script`,
  jsFiles    : `${SRC_ROOT}/script/**/*.js`,
  imageDIr   : `${SRC_ROOT}/image`,
  imageFiles : `${SRC_ROOT}/image/**/*.{png,jpeg,gif,jpg,svg}`,
  sprites    : getSprites().map((sprite) => sprite.srcFile),
};

var dest = exports.dest = {
  root        : DEST_ROOT,
  htmlFiles   : `${DEST_ROOT}/**/*.html`,
  cssDir      : `${DEST_ROOT}/style`,
  cssFiles    : `${DEST_ROOT}/style/**/*.css`,
  jsDir       : `${DEST_ROOT}/script`,
  jsFiles     : `${DEST_ROOT}/script/**/*.js`,
  imageDir    : `${DEST_ROOT}/image`,
  imageFiles  : `${DEST_ROOT}/image/**/*.{png,jpeg,gif,jpg,svg}`
};

function getSprites() {
  return _.map(sprites, (sprite) => {
    return {
      srcFile: `${sprite.dir}/${sprite.name}`,
      imgName: `${sprite.name}.png`,
      cssName: `_${sprite.name}.scss`,
      imgPath: `/image/${sprite.name}.png`,
      destImg: `${DEST_ROOT}/image`,
      destCSS: `${SRC_ROOT}/style/sprite`
    }
  });
}
