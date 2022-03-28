import { EventEmitter } from './utils/eventmitter';
import { addDispose, dispose, Dispose } from './utils/dispose';
import { RollingCommander } from './commander';
import { getEle } from './utils/dom';
import { requestAnimationFrame, cancelAnimationFrame } from './utils/common';
import strategy from './strategy';
import Base from './commander/base';
import { Commander, DanmakuOptions, RawDanmu, RollingDanmu, CommanderMap, CommanderMapKey } from './types';

const defaultOpts: DanmakuOptions = {
  tracksCnt: 6,
  trackHeight: 20 * 1.5,
  fontSize: 20,
  fontColor: '#fff',
  duration: 5000,
  zoom: 1,

  eventProxyElement: undefined,
};

type DanmakuOptionsInit = Partial<DanmakuOptions>;

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
      trackCnt: this.opts.tracksCnt,
      trackWidth: this.el.offsetWidth,
      trackHeight: this.opts.trackHeight,
      duration: this.opts.duration,
    };
    this.commanderMap = {
      rolling: new RollingCommander(this.el, commanderConfig),
    };
  }

  add(danmu: RawDanmu, type: CommanderMapKey = 'rolling') {
    const fn = strategy.add;
    return fn(this, danmu, type);
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

  private eachManager(handler: (commander: Base<RollingDanmu>) => any) {
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
