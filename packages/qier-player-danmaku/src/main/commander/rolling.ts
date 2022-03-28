import BaseRolling from './base-rolling';
import { createDanmu } from '../helper';
import { RollingDanmu, Commander } from '../types';
import { isEmptyArray } from '../utils/is';
import { TIME_PER_FRAME } from '../constants';
import { getArrayLast } from '../utils/get';
import Track from '../track';

class RollingCommander extends BaseRolling<RollingDanmu> {
  private get defaultSpeed(): number {
    return (this.trackWidth / this.duration) * TIME_PER_FRAME;
  }

  private get randomSpeed(): number {
    return 0.8 + Math.random() * 1.2;
  }

  add(danmu: RollingDanmu): boolean {
    const trackId = this.findTrack();
    if (trackId === -1) {
      return false;
    }

    const { text, color, size, translateX } = danmu;
    const danmuDom = createDanmu(text, color, size, translateX);
    this.el.appendChild(danmuDom);
    const width = danmuDom.offsetWidth;

    // 根据追及问题，计算弹幕的速度
    const track = this.tracks[trackId];
    const trackOffset = track.offset;
    const trackWidth = this.trackWidth;
    let speed: number;
    if (isEmptyArray(track.danmus)) {
      speed = this.defaultSpeed * this.randomSpeed;
    } else {
      const { speed: preSpeed } = getArrayLast<RollingDanmu>(track.danmus);
      speed = (trackWidth * preSpeed) / trackOffset;
    }
    // 防止速度过快一闪而过，最大值只能为平均速度的 2 倍
    speed = Math.min(speed, this.defaultSpeed * 2);
    const normalizedDanmu = { ...danmu, translateX: trackWidth, speed, width };
    this.objToElm.set(normalizedDanmu, danmuDom);
    this.elmToObj.set(danmuDom, normalizedDanmu);
    track.push(normalizedDanmu);
    track.offset = trackWidth + normalizedDanmu.width * 1.2;

    return true;
  }

  findTrack(): number {
    const failCode = -1;
    let idx = failCode;
    let max = -Infinity;
    this.each((track, index) => {
      const trackOffset = track.offset;
      if (trackOffset > this.trackWidth) {
        return failCode;
      }
      const t = this.trackWidth - trackOffset;
      // 策略为找到剩余空间最大的轨道进行插入
      if (t > max) {
        idx = index;
        max = t;
      }
    });
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

  render(): void {
    this.extractDanmu();
    const objToElm = this.objToElm;
    const trackHeight = this.trackHeight;
    this.each((track, trackIdx) => {
      let shouldRemove = false;
      let removeIndex = -1;
      track.each((danmu, danmuIdx) => {
        if (!objToElm.has(danmu)) {
          return;
        }
        if (danmu.static) {
          return;
        }
        const danmuDom = objToElm.get(danmu)!;
        const offset = danmu.translateX;
        danmuDom.style.transform = `translate(${offset}px, ${trackIdx * trackHeight}px)`;
        // 每一帧后弹幕的偏移量都会减少 speed 大小的距离
        danmu.translateX -= danmu.speed;
        if (danmu.translateX < 0 && Math.abs(danmu.translateX) > danmu.width) {
          shouldRemove = true;
          removeIndex = danmuIdx;
        }
      });
      track.updateOffset();
      if (shouldRemove) {
        this.removeElementFromTrack(track, removeIndex);
        track.remove(removeIndex);
      }
    });
  }

  removeElementFromTrack(track: Track<RollingDanmu>, removedIdx: number) {
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

export default RollingCommander;
