import { EventEmitter } from './utils/eventmitter';
import { addDispose, dispose, Dispose } from './utils/dispose';
import { RollingCommander } from './commander';
import { getEle } from './utils/dom';
import { DanmakuOptions } from './types';

const defaultOpts: DanmakuOptions = {
  tracksCnt: 4,
  trackHeight: 20 * 1.5,
  fontSize: 20,
  duration: 5000,
};

type DanmakuOptionsInit = Partial<DanmakuOptions>;

export class Danmaku extends EventEmitter implements Dispose {
  el: HTMLElement | null;

  opts: DanmakuOptions;

  constructor(container: HTMLDivElement | string, opts?: DanmakuOptionsInit) {
    super();

    this.opts = { ...defaultOpts, ...opts };

    this.el = getEle(container);

    if (!this.el) {
      console.error('The container element you are currently passing in is not an HTML element.');
      return;
    }

    // pointer-events 避免容器阻碍下层点击
    this.el.style.pointerEvents = 'none';

    const rollingCommander = new RollingCommander();
  }

  dispose(): void {
    this.el = null!;
  }
}
