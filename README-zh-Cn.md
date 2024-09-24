<div align="center">
  <a href="https://github.com/vortesnail/qier-player">
    <img src="website/docs/public/logo.svg" height="140" width="140"/>
  </a>
  <h4>QierPlayer</h4>
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
</div>

<div align="center">
   <a href="https://github.com/vortesnail/qier-player/blob/master/README.md">
    English
  </a>
  &#124; 简体中文
</div>

## 介绍

QierPlayer 是一个简单易用的 h5 视频播放器，UI 高度可定制化且功能丰富，支持弹幕。

## 文档及 Demo

[QierPlayer 文档](https://vortesnail.github.io/qier-player/zh/guide/what-is-qier-player)

## 截图

<div align="center">
  <img src="./website/docs/public/screenshot.png" style="max-width:620px;">
</div>

## 快速开始

### 安装

npm 包安装:

```shell
npm install qier-player
# 或
yarn add qier-player
# 或
pnpm install qier-player
```

### 使用

```js
import Player from 'qier-player';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
});

player.mount('#app');
```

## 弹幕

弹幕功能作为一个独立的库 [@qier-player/danmaku](https://www.npmjs.com/package/@qier-player/danmaku) 使用，本质上与视频播放器没有必然联系，仅需要的是一个容器。

### 安装

npm 包安装:

```shell
npm install @qier-player/danmaku
# 或
yarn add @qier-player/danmaku
# 或
pnpm install @qier-player/danmaku
```

### 使用

```js
import Player, { EVENT } from 'qier-player';
import Danmaku from '@qier-player/danmaku';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
});

player.mount('#app');

// 创建弹幕的容器
const danmuWrapper = document.createElement('div');
danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;';
player.el.appendChild(danmuWrapper);

// 弹幕实例
const danmaku = new Danmaku(danmuWrapper, {
  eventProxyElement: danmuWrapper,
});

player.on(EVENT.PLAY, () => {
  danmaku.start();
});

player.on(EVENT.PAUSE, () => {
  danmaku.stop();
});

danmaku.add(
  {
    text: '今天天气不错，大家好',
    color: '#fff',
  },
  'rolling',
);
```

更详细的用法参考[弹幕](https://vortesnail.github.io/qier-player/guide/danmaku)
