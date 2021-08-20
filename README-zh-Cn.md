<div align="center">
  <a href="https://github.com/vortesnail/qier-player">
   <img src="website/static/img/logo.svg" height="140" width="140"/>
  </a>
  <h4>qier-player</h4>
  <br>
	<a href="https://www.npmjs.com/package/qier-player">
		<img src="https://img.shields.io/npm/v/qier-player?style=flat-square&logo=npm">
	</a>
	<a href="https://unpkg.com/qier-player@latest/dist/umd/index.min.js">
		<img src="https://img.shields.io/bundlephobia/minzip/qier-player?label=gzip%20size&style=flat-square">
	</a>
	<a href="https://app.codacy.com/project/badge/Grade/042def878d8f49039cd4cde757fa1e5c">
		<img src="https://img.shields.io/codacy/grade/042def878d8f49039cd4cde757fa1e5c?logo=codacy&style=flat-square">
	</a>
</div>

<div align="center">
   <a href="https://github.com/vortesnail/qier-player/blob/master/README.md">
    English
  </a>
  &#124; 简体中文
</div>

## 介绍

`qier-player` 简单易用的 h5 视频播放器，UI 高度可定制化且功能丰富。

## 截图

<div align="center">
  <img src="./website/static/img/screenshot.png" style="width:520px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
</div>

## 快速开始

### 安装

npm 包安装:

```bash
npm install --save qier-player
# 或
yarn add qier-player
```

当然你也可以使用 CDN 服务：

```html
<script src="https://unpkg.com/qier-player@latest/dist/umd/index.min.js"></script>
```

### 使用

```js
import Player from 'qier-player';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
});
player.mount('#app');
```

## 生态

| Name | version | gzip size |
| --- | --- | --- |
| [qier-player-for-react]() | [![npm](https://img.shields.io/npm/v/@qier-player/react?logo=npm&style=flat-square)](https://www.npmjs.com/package/@qier-player/react) | [![gzip size](https://img.shields.io/bundlephobia/minzip/@qier-player/react?label=gzip%20size&style=flat-square)](https://unpkg.com/@qier-player/react@2.0.1/dist/umd/index.min.js) |

## Future features

- `@qier-player/vue` for Vue developer.
- `@qier-player/danmaku` plungin.
