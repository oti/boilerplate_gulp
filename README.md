# Gup Web Dev Boilerplate

Gulp を使ったウェブサイト開発環境のボイラープレートです。

dependencies の過不足は適宜処理してください。

- HTML -> Pug
- CSS -> Sass
- Image -> imagemin
- JS -> Babel + webpack

JS は Babel でコンパイル、webpack でバンドルします。CSS や画像のバンドルはしません。

webpack でも jQuery は使えるのでやりたかったら `npm i jquery` して `import jQuery from "jquery"` したら良いです。

## development

```bash
ndenv install 12.16.1
ndenv rehash
```

```bash
npm ci
npm start
```

`localhost:3000` が起動します。

## build

```bash
npm run build
```

`dist/` にビルドされます。

## configration

ソースやビルドのパスは `config.json` で管理しています。
