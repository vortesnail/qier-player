import BaseRolling from './base-rolling';
import { RollingDanmu, Commander } from '../types';

class RollingCommander extends BaseRolling<RollingDanmu> {
  add(danmu: RollingDanmu): boolean {
    const trackId = this.findTrack();
    if (trackId === -1) {
      return false;
    }

    // TODO 创建弹幕DOM
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

  extractBarrage(): void {
    console.log('_extractBarrage');
  }

  render(): void {
    console.log('render');
  }
}

export default RollingCommander;
