import config   from 'config';
import UAParser from 'ua-parser-js';

const parser = new UAParser();

class Utils {

  screen() {
    return {
      'sp': $(window).innerWidth() <= config.screen.sp,
      'tablet': $(window).innerWidth() <= config.screen.tablet
    }
  }

  sleep(msec) {
    var d = $.Deferred();

    setTimeout(()=> {
      d.resolve();
    }, msec);

    return d.promise();
  }

  ua() {
    return parser.getResult();
  }

  /**
   * ランダムな数(float)
   * @param  {[type]} min 最小値(float)
   * @param  {[type]} max 最大値(float)
   * @return {[type]}     [description]
   */
  random(min, max) {
    return Math.random() * (max - min) + min;
  }


  /**
   * ランダムな数(int)
   * @param  {[type]} min 最小値(float)
   * @param  {[type]} max 最大値(float)
   * @return {[type]}     [description]
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  /**
   * 配列内の値をランダムに取得
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  randomArr(arr) {
    return arr[this.randomInt(0, arr.length - 1)];
  }


  /**
   * 配列のシャッフル
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  shuffle(array) {
    let n = array.length, t, i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

    return array;
  }


  /**
   * 2点間の距離を返す
   * @param  {[type]} x1 [description]
   * @param  {[type]} y1 [description]
   * @param  {[type]} x2 [description]
   * @param  {[type]} y2 [description]
   * @return {[type]}    [description]
   */
  distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }


  /**
   * 角度をラジアンに変換
   * @param  {[type]} degree [description]
   * @return {[type]}        [description]
   */
  radian(degree) {
    return degree * Math.PI / 180;
  }


  /**
   * ラジアンを角度に変換
   * @param  {[type]} radian [description]
   * @return {[type]}        [description]
   */
  degree(radian) {
    return radian / Math.PI / 180;
  }

  debounce(callback, duration) {
    var timer;
    return function(event) {
      clearTimeout(timer);
      timer = setTimeout(function(){
        callback(event);
      }, duration);
    };
  }
};


module.exports = new Utils();
