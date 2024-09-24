<div align="center">
  <a href="https://github.com/vortesnail/qier-player">
    <img src="website/docs/public/logo.svg" height="140" width="140" />
  </a>
  <h4>QierPlayer</h4>
  <br />
  <a href="https://www.npmjs.com/package/qier-player">
    <img src="https://img.shields.io/npm/v/qier-player?style=flat-square&logo=npm" />
  </a>
  <a href="https://unpkg.com/qier-player@latest/dist/umd/index.min.js">
    <img
      src="http://img.badgesize.io/https://unpkg.com/qier-player@latest/dist/umd/index.min.js?compression=gzip&style=flat-square"
      alt="Gzip Size"
    />
  </a>
  <a href="https://app.codacy.com/project/badge/Grade/042def878d8f49039cd4cde757fa1e5c">
    <img src="https://img.shields.io/codacy/grade/042def878d8f49039cd4cde757fa1e5c?logo=codacy&style=flat-square" />
  </a>
</div>

<div align="center">
  <a href="https://github.com/vortesnail/qier-player/blob/master/README-zh-Cn.md">
    简体中文
  </a>
  &#124; English
</div>

## Introduction

QierPlayer is a simple and easy-to-use H5 video player with a highly customizable UI and rich features, supporting Danmaku (bullet comments).

## Documentation and Demo

[QierPlayer Documentation](https://vortesnail.github.io/qier-player/guide/what-is-qier-player)

## Screenshots

<div align="center">
  <img src="./website/docs/public/screenshot.png" style="max-width:620px;" />
</div>

## Quick Start

### Installation

Install via npm:

```shell
npm install qier-player
# or
yarn add qier-player
# or
pnpm install qier-player
```

### Usage

```js
import Player from 'qier-player';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
});

player.mount('#app');
```

## Danmaku

The Danmaku feature is available as a separate library [@qier-player/danmaku](https://www.npmjs.com/package/@qier-player/danmaku). It is essentially independent of the video player and only requires a container.

### Installation

Install via npm:

```shell
npm install @qier-player/danmaku
# or
yarn add @qier-player/danmaku
# or
pnpm install @qier-player/danmaku
```

### Usage

```js
import Player, { EVENT } from 'qier-player';
import Danmaku from '@qier-player/danmaku';

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
});

player.mount('#app');

// Create a container for Danmaku
const danmuWrapper = document.createElement('div');
danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;';
player.el.appendChild(danmuWrapper);

// Danmaku instance
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
    text: 'The weather is nice today, hello everyone',
    color: '#fff',
  },
  'rolling',
);
```

For more detailed usage, refer to [Danmaku](https://vortesnail.github.io/qier-player/guide/danmaku).
