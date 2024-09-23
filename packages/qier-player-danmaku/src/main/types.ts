import Base from './commander/base';

export interface DanmakuOptions {
  tracksCnt: number;
  trackHeight: number;
  fontSize: number;
  fontColor: string;
  duration: number;
  zoom: number;

  eventProxyElement?: HTMLElement; // 弹幕交互的事件代理 dom 元素
}

export type DanmakuOptionsInit = Partial<DanmakuOptions>;
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
  offset: number;
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
}

export interface CommanderMap {
  rolling: Base<RollingDanmu>;
  'fixed-top': Base<FixedDanmu>;
  'fixed-bottom': Base<FixedDanmu>;
}

export type CommanderMapKey = keyof CommanderMap;
