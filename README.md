# Gulp Web Dev Boilerplate

Gulp を使ったウェブサイト開発環境のボイラープレートです。

dependencies の過不足は適宜処理してください。

- HTML -> Pug
- CSS -> node-sass
- Image -> imagemin
- JS -> Babel + webpack

JS は Babel でコンパイル、webpack でバンドルします。CSS や画像のバンドルはしません。

webpack でも jQuery は使えるのでやりたかったら `npm i jquery` して `import jQuery from "jquery"` したら良いです。

## development

```zsh
ndenv install 16.13.2
ndenv rehash
```

```zsh
npm ci
npm start
```

`localhost:3000` が起動します。

もし `No gulpfule found` エラーが出たら、gulp-cli が v2.3.0 になっていない可能性があります。

package-lock.json を削除してから `npm i` を実行し、gulp-cli をアップデートしてください。

```zsh
npx gulp -v

CLI version: 2.3.0
Local version: 4.0.2
```

## build

```zsh
npm run build
```

`dist/` にビルドされます。

## configration

ソースやビルドのパスは `config.json` で管理しています。
