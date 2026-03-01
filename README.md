# Gulp Web Dev Boilerplate

Gulp を使ったウェブサイト開発環境のボイラープレートです。

dependencies の過不足は適宜処理してください。

- HTML -> Pug
- CSS -> sass
- Image -> imagemin
- JS -> Babel + webpack

JS は Babel でコンパイル、webpack でバンドルします。CSS や画像のバンドルはしません。

webpack でも jQuery は使えるのでやりたかったら `npm i -D jquery` して `import { $ } from "jquery"` したら良いです。

## development

```zsh
ndenv install 24.14.0
ndenv rehash
```

```zsh
npm ci
npm start
```

`localhost:3000` が起動します。

もし `No gulpfule found` エラーが出たら、gulp-cli が v3.1.0 になっていない可能性があります。

package-lock.json を削除してから `npm i` を実行すると gulp-cli がアップデートされます。

```zsh
npx gulp -v

CLI version: 3.1.0
Local version: 5.0.1
```

## build

```zsh
npm run build
```

`src/` の中が `dist/` にビルドされます。

## build configration

ソースやビルドのパスは `gulpfile.mjs` に書いてあります。
