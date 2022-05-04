import { Danmaku } from './danmaku';
import { RawDanmu, RollingDanmu, FixedDanmu, CommanderMapKey } from './types';

export interface Strategy {
  clear(danmaku: Danmaku): void;
  add(danmaku: Danmaku, danmu: RawDanmu, type: CommanderMapKey): void;
}

const strategy: Strategy = {
  clear(danmaku: Danmaku): void {
    danmaku.eachManager((manager) => manager.reset());
  },
  add(danmaku: Danmaku, rowDanmu: RawDanmu, type: CommanderMapKey = 'rolling'): void {
    if (!danmaku.commanderMap) return;

    const { text, color = danmaku.opts.fontColor, size = danmaku.opts.fontSize } = rowDanmu;
    const fontColor = color;
    const fontSize = size * danmaku.opts.zoom;
    const trackWidth = danmaku.el!.offsetWidth;
    const duration = danmaku.opts.duration;

    if (type === 'rolling') {
      const danmu: RollingDanmu = {
        text,
        color: fontColor,
        size: fontSize,
        speed: 0,
        width: 0,
        offset: trackWidth,
      };
      danmaku.commanderMap[type].waitingQueue.push(danmu);
    } else {
      const danmu: FixedDanmu = {
        text,
        color: fontColor,
        size: fontSize,
        duration,
        width: 0,
        offset: trackWidth,
      };
      danmaku.commanderMap[type].waitingQueue.push(danmu);
    }
  },
};

export default strategy;
