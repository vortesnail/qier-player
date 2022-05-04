import { TIME_PER_FRAME } from '../constants';
import { Danmaku } from '../danmaku';
import type { Commander, DanmakuOptionsInit } from '../types';
import BaseFixed from './base-fixed';

class FixedBottomCommander extends BaseFixed {
  constructor(readonly danmaku: Danmaku, el: HTMLElement, config: Commander, options: DanmakuOptionsInit) {
    super(danmaku, el, config, options);
  }

  render(): void {
    this.extractDanmu();
    const objToElm = this.objToElm;
    const trackHeight = this.trackHeight;
    const trackCnt = this.tracksCnt;
    const elHeight = this.el.offsetHeight;
    const yBase = elHeight - trackCnt * trackHeight;
    this.each((track, trackIdx) => {
      const danmu = track.danmus[0];
      if (!danmu) {
        return;
      }
      const danmuDom = objToElm.get(danmu);
      if (!danmuDom) {
        return;
      }
      if (danmu.static) {
        return;
      }
      const { offset } = danmu;
      const y = yBase + trackIdx * trackHeight;
      danmuDom.style.transform = `translate(${offset}px, ${y}px)`;
      danmu.duration -= TIME_PER_FRAME;
      if (danmu.duration <= 0) {
        this.removeElementFromTrack(track, 0);
        track.remove(0);
      }
    });
  }
}

export default FixedBottomCommander;
