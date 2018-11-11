/* ========================================
//
//   gulp-config.js
//    - gulpfile.jsで使用する設定
//
// ======================================== */

const SRC_ROOT  = './src';
const DEST_ROOT = './htdocs';
const DEST_PATH = ''

let sprites = [
  { dir : `${SRC_ROOT}/images`, name: 'sprite-pc' },
  { dir : `${SRC_ROOT}/images`, name: 'sprite-sp' },
];

// constant
var settings = exports.settings = {
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
  videoFiles : `${SRC_ROOT}/video/**/*.*`,
  docFiles   : `${SRC_ROOT}/doc/**/*.*`,
  jsonFiles  : `${SRC_ROOT}/json/**/*.*`,
  sprites    : getSprites().map((sprite) => sprite.srcFile),
};

var dest = exports.dest = {
  root       : DEST_ROOT,
  path       : DEST_PATH,
  htmlFiles  : `${DEST_ROOT}/**/*.html`,
  htmlDir    : `${DEST_ROOT}${DEST_PATH}/`,
  cssDir     : `${DEST_ROOT}${DEST_PATH}/assets/style`,
  cssFiles   : `${DEST_ROOT}${DEST_PATH}/assets/style/**/*.css`,
  jsDir      : `${DEST_ROOT}${DEST_PATH}/assets/script`,
  jsFiles    : `${DEST_ROOT}${DEST_PATH}/assets/script/**/*.js`,
  imageDir   : `${DEST_ROOT}${DEST_PATH}/assets/image`,
  imageFiles : `${DEST_ROOT}${DEST_PATH}/assets/image/**/*.{png,jpeg,gif,jpg,svg}`,
  videoDir   : `${DEST_ROOT}${DEST_PATH}/assets/video/`,
  docDir     : `${DEST_ROOT}${DEST_PATH}/assets/doc/`,
  jsonDir    : `${DEST_ROOT}${DEST_PATH}/assets/json/`,
};

function getSprites() {
  return sprites.map(sprite => {
    return {
      srcFile: `${sprite.dir}/${sprite.name}`,
      imgName: `${sprite.name}.png`,
      cssName: `_${sprite.name}.scsstyles`,
      imgPath: `/image/${sprite.name}.png`,
      destImg: `${DEST_ROOT}${DEST_PATH}/assets/image`,
      destCSS: `${SRC_ROOT}/style/sprites`,
    }
  });
}
