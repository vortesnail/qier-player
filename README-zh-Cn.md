<div align="center">
  <a href="https://github.com/vortesnail/qier-player">
    <img src="website/public/img/logo.svg" height="140" width="140"/>
  </a>
  <h4>qier-player</h4>
  <br>
	<a href="https://www.npmjs.com/package/qier-player">
		<img src="https://img.shields.io/npm/v/qier-player?style=flat-square&logo=npm">
	</a>
	<a href="https://unpkg.com/qier-player@latest/dist/umd/index.min.js">
    <img
      src="http://img.badgesize.io/https://unpkg.com/qier-player@latest/dist/umd/index.min.js?compression=gzip&style=flat-square"
      alt="Gzip Size">
	</a>
	<a href="https://app.codacy.com/project/badge/Grade/042def878d8f49039cd4cde757fa1e5c">
		<img src="https://img.shields.io/codacy/grade/042def878d8f49039cd4cde757fa1e5c?logo=codacy&style=flat-square">
	</a>
  	<a href="https://github.com/umijs/dumi">
		<img src="https://img.shields.io/badge/docs%20by-dumi-blue?logo=dumi&style=flat-square">
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
  <img src="./website/public/img/screenshot-shadow.png" style="max-width:620px;">
</div>

## 快速开始

### 安装

npm 包安装:

```bash
npm install --save qier-player
# 或
yarn add qier-player
```

### 使用

```js
import Player from 'qier-player';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
});
player.mount('#app');
```
