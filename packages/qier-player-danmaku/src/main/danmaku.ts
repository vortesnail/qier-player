import { EventEmitter } from './utils/eventmitter';
import { addDispose, dispose, Dispose } from './utils/dispose';
import { RollingCommander } from './commander';
import { getEle } from './utils/dom';
import strategy from './strategy';
import { Commander, DanmakuOptions, RawDanmu, CommanderMap, CommanderMapKey } from './types';

const defaultOpts: DanmakuOptions = {
  tracksCnt: 4,
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

  dispose(): void {
    this.el = null!;
  }
}
