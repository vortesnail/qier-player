---
title: 安装
order: 2
toc: content
---

# 安装

## 包安装

npm 下载安装：

```bash
npm i qier-player --save
```

或者你更喜欢 yarn：

```bash
yarn add qier-player
```

接下来在代码中引入即可：

```js
import Player from 'qier-player';

const player = new Player({
  src: '你的视频地址',
});

player.mount('#root');
```

## CDN 服务

通过 `script` 下载 umd 包也是可以的，只需要在 html 文件中的合适位置引入即可。

```html
<script src="https://unpkg.com/qier-player@latest/dist/umd/index.min.js"></script>
```

在使用 CDN 方式时，如果你不通过 ES Module 引入，那么拿到包导出的模块会有所不同，以下是两者比较。

- ES Module 引入

```js
import Player, { Icon, I18n } from 'qier-player';
```

- 全局对象引入

```js
const { Player, Icon, I18n } = window.QierPlayer;
```

一般来说，使用 CDN 时，利用构建工具（比如 Webpack）我们需要将本地安装的 `qier-player` 包剔除于最终的打包文件中。在 Webpack 中我们可以这样做。

```js
externals: {
  'qier-player': 'QierPlayer',
},
```

## 建议

开发时我们一版会基于 React 或者 Vue 来构建应用，为了将 `qier-player` 分包，我们可以这样做。

1. 通过 yarn 或者 npm 安装包至本地，开发时会有良好的代码提示。

```bash
yarn add qier-player
# or
npm i qier-player --save
```

2. 引入 CDN 链接。

```html
<script src="https://unpkg.com/qier-player@latest/dist/umd/index.min.js"></script>
```

3. 剔除包

```js
externals: {
  'qier-player': 'QierPlayer',
},
```
