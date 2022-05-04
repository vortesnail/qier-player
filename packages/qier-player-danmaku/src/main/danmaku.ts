import { EventEmitter } from './utils/eventmitter';
import { dispose, Dispose } from './utils/dispose';
import { RollingCommander, FixedBottomCommander } from './commander';
import { getEle } from './utils/dom';
import { requestAnimationFrame, cancelAnimationFrame } from './utils/common';
import strategy from './strategy';
import Base from './commander/base';
import type {
  Commander,
  DanmakuOptions,
  DanmakuOptionsInit,
  RawDanmu,
  RollingDanmu,
  CommanderMap,
  CommanderMapKey,
  FixedDanmu,
} from './types';
import FixedTopCommander from './commander/fixed-top';

const defaultOpts: DanmakuOptions = {
  tracksCnt: 6,
  trackHeight: 20 * 1.5,
  fontSize: 20,
  fontColor: '#fff',
  duration: 5000,
  zoom: 1,

  eventProxyElement: undefined,
};

export class Danmaku extends EventEmitter implements Dispose {
  el: HTMLElement | null;

  opts: DanmakuOptions;

  commanderMap?: CommanderMap;

  private rAFId: number | null = null;

  constructor(container: HTMLElement | string, opts?: DanmakuOptionsInit) {
    super();

    this.opts = { ...defaultOpts, ...opts };

    this.el = getEle(container);

    if (!this.el) {
      console.error('The container element you are currently passing in is not an HTML element.');
      return;
    }

    // pointer-events 避免容器阻碍下层点击
    this.el.style.pointerEvents = 'none';

    const commanderConfig: Commander = {
      trackWidth: this.el.offsetWidth,
    };
    this.commanderMap = {
      rolling: new RollingCommander(this, this.el, commanderConfig, this.opts),
      'fixed-bottom': new FixedBottomCommander(this, this.el, commanderConfig, this.opts),
      'fixed-top': new FixedTopCommander(this, this.el, commanderConfig, this.opts),
    };

    this.resize();
  }

  resize(width?: number) {
    width = width || this.el!.offsetWidth;
    this.eachManager((manager) => manager.resize(width));
  }

  clear() {
    const fn = strategy.clear;
    return fn(this);
  }

  add(danmu: RawDanmu, type: CommanderMapKey = 'rolling') {
    const fn = strategy.add;
    return fn(this, danmu, type);
  }

  setOpacity(opacity = 1) {
    if (!this.el) return;
    this.el.style.opacity = `${opacity}`;
  }

  setFontSize(zoom = 1) {
    this.opts.zoom = zoom;
  }

  setDuration(duration: number) {
    this.opts.duration = duration;
  }

  setTrackCount(cnt: number) {
    this.opts.tracksCnt = cnt;
  }

  start() {
    if (this.rAFId) return;

    this.rAFId = requestAnimationFrame(this.render.bind(this));
  }

  stop() {
    if (!this.rAFId) return;

    cancelAnimationFrame(this.rAFId);
    this.rAFId = null;
  }

  eachManager(handler: (commander: Base<RollingDanmu> | Base<FixedDanmu>) => any) {
    if (!this.commanderMap) return;
    Object.keys(this.commanderMap).forEach((key) => handler.call(this, this.commanderMap![key as CommanderMapKey]));
  }

  private render() {
    // 遍历每个 commander 执行它们各自的 render 方法
    this.eachManager((manager) => manager.render());

    this.rAFId = requestAnimationFrame(this.render.bind(this));
  }

  dispose(): void {
    if (!this.el) return;
    this.el = null;
    dispose(this);
    this.removeAllListeners();
  }
}
