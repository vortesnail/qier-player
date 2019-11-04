<h1 align="center">
  <img src="https://i0.hdslb.com/bfs/album/d72f47cd98c9fb6287d7eaf002695de4f53de6f2.png" height="200" width="200"/>
  <p align="center" style="font-size: 0.5em">A lightweight and sophisticated React-based H5 video player</p>
</h1>

[![GitHub](https://img.shields.io/github/license/vortesnail/qier-player)](https://github.com/vortesnail/qier-player/blob/master/LICENSE) [![npm package](https://img.shields.io/npm/v/qier-player)](https://www.npmjs.com/package/qier-player) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/qier-player)](https://www.npmjs.com/package/qier-player) [![GitHub stars](https://img.shields.io/github/stars/vortesnail/qier-player)](https://github.com/vortesnail/qier-player/stargazers)

[简体中文](https://github.com/vortesnail/qier-player/blob/master/README-zh-Hans.md) &#124; English

## Introduction
Qier-player is a web video player component based on the React with a simple interface and smooth operation which supports the most functions of other player. Note that, Qier-player can switch the video clarity and provide the video source interface of original video, 4K, 2K, 1080P, 720P and 480P.


## Feature
Video should be on focused, then:

- `Top` arrow keys: volume increase
-	`Bottom` arrow keys: volume reduction
-	`Left` arrow keys: Rewind 3 seconds
-	`Right` arrow keys: fast forward 3 seconds
-	`Space` keys: pause/play


Here is [Demo official website](https://vortesnail.github.io/qier-player-demo/), click me to check

## example
![example](https://i0.hdslb.com/bfs/album/dc46482ec425ebf78f8501fb44f05f8b01cbda4b.png)


## Quick Start
#### Install
```bash
npm install --save qier-player
```
#### Use
```js
import React from 'react';
import ReactDOM from 'react-dom';
import QierPlayer from 'qier-player';

ReactDOM.render(<QierPlayer srcOrigin="Your video addedress"/>, document.getElementById('root'));
```

## 接口
| Parameter  |  Description | Types  | Defaults  |
| ------------ | ------------ | ------------ | ------------ |
| language  | language option:'en' is English and  'zh' is Chinese  | string  |  'en' |
| showVideoQuality  | Control the display and hide of the sharpness options  | boolean  |  false |
| themeColor  | Change the theme color (currently only supports hexadecimal color)  | string  |  '#f23300' |
| src480p  | 480P source option | boolean &#124; string   | false  |
| src720p  | 720P source option | boolean &#124; string   | false  |
| src1080p  |  1080P source option | boolean &#124; string   | false  |
| src2k  |  2K source option | boolean &#124; string   | false  |
| src4k  |  4K source option | boolean &#124; string   | false  |
| srcOrigin  |  origin source option(If no other option, it is recommended to configure this option, all other settings are false) | boolean &#124; string   | false  |

## Recent update history
### 1.2.2 (2019-11-04)
- Added theme colour modification interface
- Added language change API, 'en' is English, 'zh' is Chinese

### 1.1.2 (2019-11-01)
-	Added auto hide function：When the mouse is hovering over the video page, the controller and mouse are hidden after 1.8s.

### 1.1.1 (2019-10-29)
- Added the prompt "Sorry! The video could not be found (. ́< ̀.)" When the video addedress is not found,
- Added a hint animation "Buffering..." while the video is loading
- Fixed a bug where custom shortcuts conflicted with browser shortcuts


## Acknowledgements
- Thanks to [kaiseixd](https://github.com/kaiseixd) for his inspiration when I was in trouble.
- Thanks to the [screenfull](https://github.com/sindresorhus/screenfull.js/) plugin and the its author.
- Thanks to fanzy for tranlsating README
- Thanks to [iconfont](https://www.iconfont.cn/) as an unselfish icon creator.