# TKG Boilerplate
=====

小規模のコポサ、LPを作るときによく使う環境です。

## Get Started

Require Node.js v8.11.3

```
ndenv install 8.11.3
ndenv rehash
```

```
yarn
```

## Usage
### development
```
yarn start
```

### build

```
yarn build
```

### release
```
yarn release
```

## Gulp Task

### CSS Build
```
gulp css:preprocessor
gulp css:minify
```

### JS Build
```
gulp js
gulp js:minify
```

### Image Sprite
```
gulp image:sprite
```

### Image Minify
```
gulp image:minify
```
