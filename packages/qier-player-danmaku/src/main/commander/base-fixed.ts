import { Danmaku } from '../danmaku';
import { createDanmu } from '../helper';
import Track from '../track';
import type { Commander, DanmakuOptionsInit, FixedDanmu } from '../types';
import { isEmptyArray } from '../utils/is';
import BaseRolling from './base-rolling';

export default abstract class BaseFixed extends BaseRolling<FixedDanmu> {
  protected elHeight: number;

  constructor(readonly danmaku: Danmaku, el: HTMLElement, config: Commander, options: DanmakuOptionsInit) {
    super(danmaku, el, config, options);

    this.elHeight = el.offsetHeight;
  }

  add(danmu: FixedDanmu): boolean {
    const trackId = this.findTrack();
    if (trackId === -1) {
      return false;
    }
    const { text, size, color, offset } = danmu;
    const danmuDom = createDanmu(text, color, size, this.trackHeight, offset);
    this.el.appendChild(danmuDom);
    const width = danmuDom.offsetWidth;

    // 计算位置
    const track = this.tracks[trackId];
    const trackWidth = this.trackWidth;
    // 居中
    const danmuOffset = (trackWidth - width) / 2;
    const normalizedDanmu = { ...danmu, offset: danmuOffset, duration: this.duration, width };

    this.objToElm.set(normalizedDanmu, danmuDom);
    this.elmToObj.set(danmuDom, normalizedDanmu);
    track.push(normalizedDanmu);
    return true;
  }

  findTrack(): number {
    let idx = -1;
    for (let i = 0; i < this.tracks.length; ++i) {
      if (isEmptyArray(this.tracks[i].danmus)) {
        idx = i;
        break;
      }
    }
    return idx;
  }

  extractDanmu(): void {
    let isAdded: boolean;
    for (let i = 0; i < this.waitingQueue.length; ) {
      isAdded = this.add(this.waitingQueue[i]);
      // 若有一次无法添加成功，说明无轨道可用，终止剩余弹幕的 add 尝试
      if (!isAdded) {
        break;
      }
      this.waitingQueue.shift();
    }
  }

  removeElementFromTrack(track: Track<FixedDanmu>, removedIdx: number) {
    const danmu = track.danmus[removedIdx];
    if (!danmu) {
      return;
    }
    const danmuDom = this.objToElm.get(danmu)!;
    this.objToElm.delete(danmu);
    this.elmToObj.delete(danmuDom);
    this.removeElement(danmuDom);
  }
}
