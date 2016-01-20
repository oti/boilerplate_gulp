# website-dev-startkit

ウェブサイト作るときによくある自動化タスクをプリセットしたスタートキット。

これですべてができるというものではなくて、これをベースにタスクを足したり引いたりして使う用のもの。

これをクローンして `.git` 以外をプロジェクトルートにコピーし、新たに `git init` して使う。

## HTML

Jadeを使用。

- [gulp-jade](https://www.npmjs.com/package/gulp-jade)

```
gulp jade
```

## CSS

プリルロセッサーはSassを使用。Autoprefixerで下位ブラウザ対応。gulp-merge-media-queriesでMedia Queriesの記述をファイルの後ろにまとめている。

- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-autprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-merge-media-queries](https://www.npmjs.com/package/gulp-merge-media-queries)

```
gulp sass
```

## JS

中間言語なし。JSHintで構文チェック。ターミナルの整形ツールにjshint-stylishを使っている。

jQueryなどのライブラリは `src/js/vendor/` に格納し、`htdocs/js/vendor.js` に結合圧縮される想定。自分で書いたJSは圧縮だけして個別に出力する。

- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
- [jshint-stylish](https://github.com/sindresorhus/jshint-stylish)

```
gulp jsVendor // -> build vendor.js
gulp js // -> build your custom js
```

## img

`src/img/` 配下をすべて個別に圧縮して `htdocs/img/` に出力する。

- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)

```
gulp imagemin
```

## ローカルサーバー

browser-sync使用。でローカルサーバー起動とライブリロード

- [brower-sync](https://www.npmjs.com/package/browser-sync)

```
gulp server
```

## 監視

gulp-watch使用。

- [gulp-watch](https://www.npmjs.com/package/gulp-watch)

```
gulp watch
```

## ビルド

jade, scssコンパイルとjs, imgの圧縮だけするタスク

```
gulp build
```

## npm run script

```
npm start
```

呼び出しているのは `gulp default` タスクで、`gulp build`、`gulp server`、`gulp watch`を実行している。
