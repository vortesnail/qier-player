<h1 align="center">
  <img src="https://i0.hdslb.com/bfs/album/d72f47cd98c9fb6287d7eaf002695de4f53de6f2.png" height="200" width="200"/>
  <p align="center" style="font-size: 0.5em">一款轻量且精致的、基于React的H5视频播放器</p>
</h1>

[![GitHub](https://img.shields.io/github/license/vortesnail/qier-player)](https://github.com/vortesnail/qier-player/blob/master/LICENSE) [![Travis (.org)](https://img.shields.io/travis/vortesnail/qier-player)]() [![npm package](https://img.shields.io/npm/v/qier-player)](https://www.npmjs.com/package/qier-player) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/qier-player/1.2.8)](https://www.npmjs.com/package/qier-player) [![GitHub stars](https://img.shields.io/github/stars/vortesnail/qier-player)](https://github.com/vortesnail/qier-player/stargazers)

## 介绍
qier-player 是一个基于 React 编写的在线视频播放器组件，界面简洁，操作流畅，具有大部分视频播放器的基础功能。支持视频清晰度的切换，提供了原画、4K、2K、1080P、720P、480P 的视频源接口。

## 功能
在获取播放器焦点时（点击视频界面，不包括控制栏）:
- 方向键(上)：音量增加
- 方向键(下)：音量减少
- 方向键(左)：快退3秒
- 方向键(右)：快进3秒
- 空格键(space)：暂停/播放

[演示官网](https://vortesnail.github.io/qier-player-demo/)(tip: 演示的视频没有放cdn，下载比较慢，比较卡，需要等它加载完)

## 示例
![整体样式](https://i0.hdslb.com/bfs/album/dc46482ec425ebf78f8501fb44f05f8b01cbda4b.png)


## 快速开始
#### 安装
```bash
npm install --save qier-player
```
#### 使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
import QierPlayer from 'qier-player';

ReactDOM.render(<QierPlayer srcOrigin="你的视频地址" language="zh" />, document.getElementById('root'));
```

## 接口
| 参数  |  说明 | 类型  | 默认值  |
| ------------ | ------------ | ------------ | ------------ |
| `width`  | 设置视频宽度 `width`  | number  |  740 |
| `height`  | 设置视频高度 `height`  | number  |  420 |
| `language`  | 语言选择，'en' 为英文或 'zh' 为中文  | string  |  'en' |
| `showVideoQuality`  | 用于控制是否显示清晰度选项  | boolean  |  false |
| `themeColor`  | 用于改变主题颜色，目前只支持16进制颜色  | string  |  '#f23300' |
| `src480p`  |  用于提供清晰度为 480P 的视频源切换 | boolean &#124; string   | false  |
| `src720p`  |  用于提供清晰度为 720P 的视频源切换 | boolean &#124; string   | false  |
| `src1080p`  |  用于提供清晰度为 1080P 的视频源切换 | boolean &#124; string   | false  |
| `src2k`  |  用于提供清晰度为 2K 的视频源切换 | boolean &#124; string   | false  |
| `src4k`  |  用于提供清晰度为 4K 的视频源切换 | boolean &#124; string   | false  |
| `srcOrigin`  |  用于提供清晰度为 origin(原画) 的视频源切换，如果仅有一个视频播放源，建议配置此选项，其它全设置为 false | boolean &#124; string   | false  |

## 近期更新记录
### 1.2.3 (2019-11-06)
- 暴露了 width 和 height 接口
- 现在开发者可自己决定视频的长度和宽度

### 1.2.2 (2019-11-04)
- 增加主题色修改接口
- 增加语言选项接口，'en'为英文，'zh'为中文

### 1.1.2 (2019-11-01)
- 在鼠标悬浮在视频页面上时，隔1.8s后控制栏和鼠标隐藏

### 1.1.1 (2019-10-29)
- 在视频找不到时，增加提示“抱歉！视频找不到了  (｡ ́︿ ̀｡)”
- 在视频正在加载时，增加提示动画“正在缓冲...”
- 修复了自定义快捷键与浏览器快捷键的冲突bug

### 1.1.0 (2019-10-28)
- 实现了在获取视频播放界面焦点时，可使用的快捷键，包括音量增减、视频进度、暂停播放
- 音量增减时会有音量框的跳出提示

### 1.0.5 (2019-10-25)
- 实现全屏状态下，鼠标移至播放器边缘时，控制栏隐藏

### 1.0.4 (2019-10-24)
- 调整了不同浏览器对视频格式的兼容性
- 修复全屏之后，控制栏长宽不变的问题
- 修复全屏之后，点击屏幕某些区域不可暂停/播放问题

### 1.0.3 (2019-10-20)
- 实现播放速度调节功能
- 实现关灯模式
- 实现移入/移出播放器，控制器的显示与隐藏
- v1.0.3


## 特别感谢
- 感谢[kaiseixd](https://github.com/kaiseixd)在遇到困难时提供的灵感
- 感谢[screenfull](https://github.com/sindresorhus/screenfull.js/)这个插件及作者本人
- 感谢[iconfont](https://www.iconfont.cn/)无私的图标制作者