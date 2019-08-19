# TKG Boilerplate
=====

小規模のコポサ、LPを作るときによく使う環境です。

- Pug
- Sass
- imagemin
- webpack

めんどいっぽいのでCSSと画像をJSでimportすることはしません。

webpackでもjQueryは使えるのでやりたかったら`npm i jquery`して`import jQuery from "jquery"`したら良いです。

## Node.js v12.8.1を要求します

2019-08-19時点でLatestの Node.js v12.8.1 を使います。

```
ndenv install 12.8.1
ndenv rehash
```

```
npm ci
```


## 開発を始める

```
npm start
```

ビルドしてwatchしてサーバーが起動します。

`localhost:3000`