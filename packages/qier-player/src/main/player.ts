import { PlayerOptions } from './types';
import { processOptions } from './options';
import { getEle } from './utils/dom';

export class Player {
  container: HTMLElement | null;

  el: HTMLDivElement;

  options: Required<PlayerOptions>;

  readonly video: HTMLVideoElement;

  constructor(opts?: PlayerOptions) {
    this.options = processOptions(opts);
    this.container = getEle(this.options.container);
    // 创建 qier-player div 元素
    this.el = document.createElement('div');
    this.el.className = 'qier-player';
    // 创建 video 元素
    this.video = document.createElement('video');
    this.video.src = 'https://v-cdn.zjol.com.cn/280443.mp4';
    this.video.autoplay = true;
    this.video.muted = true;
    // 添加
    this.el.appendChild(this.video);
    // 挂载至 container
    this.container?.appendChild(this.el);
  }
}
