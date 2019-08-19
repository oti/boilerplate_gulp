# TKG Boilerplate

小規模のコポサ、LPを作るときによく使う環境です。あくまでベースなので過不足は適宜処理してください。

## コンパイルに利用している技術

- HTML -> Pug
- CSS -> Sass
- 画像 -> imagemin
- JS -> webpack

めんどいっぽいので CSS と画像を JS でバンドルすることはしません。

本ボイラープレートではwebpackにはあくまでモダンなJS開発プラットフォームとしての動作を期待しています。

webpack でも jQuery は使えるのでやりたかったら`npm i jquery`して`import jQuery from "jquery"`したら良いです。

## Node.js は v12.8.1 を利用

2019-08-19 時点で Latest の Node.js v12.8.1 を使います。漢は黙って Latest

```
ndenv install 12.8.1
ndenv rehash
```

```
npm ci
```

## 開発を始めるには

npm ru-script から `start` コマンドを呼び出してください。

```
npm start
```

各種コンパイルをして、watch とローカルサーバー `localhost:3000` が起動します。
