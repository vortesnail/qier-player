import Base from './commander/base';

export interface DanmakuOptions {
  tracksCnt: number;
  trackHeight: number;
  fontSize: number;
  fontColor: string;
  duration: number;
  zoom: number;

  eventProxyElement?: HTMLHtmlElement; // 弹幕交互的事件代理 dom 元素
}

export interface RawDanmu {
  text: string;
  color?: string;
  size?: number;
}

export interface Danmu {
  text: string;
  color: string;
  size: number;
  width: number;
  translateX: number;
  static?: boolean; // 静止
}

export interface RollingDanmu extends Danmu {
  speed: number;
}

export interface FixedDanmu extends Danmu {
  duration: number;
}

export interface Commander {
  trackWidth: number;
  trackHeight: number;
  duration: number;
  trackCnt: number;

  eventProxyElement?: HTMLHtmlElement;
}

export interface CommanderMap {
  rolling: Base<RollingDanmu>;
  // 'fixed-top': Base<FixedBarrageObejct>
  // 'fixed-bottom': Base<FixedBarrageObejct>
}

export type CommanderMapKey = keyof CommanderMap;
