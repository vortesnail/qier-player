import { Danmaku } from './danmaku';
import { RawDanmu, RollingDanmu, FixedDanmu, CommanderMapKey } from './types';

export interface Strategy {
  clear(danmaku: Danmaku): void;
  add(danmaku: Danmaku, danmu: RawDanmu, type: CommanderMapKey): void;
  render(danmaku: Danmaku): void;
}

const strategy: Strategy = {
  clear(danmaku: Danmaku): void {
    console.log(123);
  },
  add(danmaku: Danmaku, rowDanmu: RawDanmu, type: CommanderMapKey = 'rolling'): void {
    if (!danmaku.commanderMap) return;

    const { text, color = danmaku.opts.fontColor, size = danmaku.opts.fontSize } = rowDanmu;
    const fontColor = color;
    const fontSize = size * danmaku.opts.zoom;
    // const trackWidth = danmaku.el!.offsetWidth;

    if (type === 'rolling') {
      const danmu: RollingDanmu = {
        text,
        color: fontColor,
        size: fontSize,
        speed: 0,
      };
      danmaku.commanderMap[type].waitingQueue.push(danmu);
    } else {
      console.log(1);
    }
  },
  render(danmaku: Danmaku): void {
    console.log(222);
  },
};

export default strategy;
