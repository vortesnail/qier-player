import { EventEmitter } from './utils/eventmitter';
import { addDispose, dispose, Dispose } from './utils/dispose';

export interface DanmakuOptions {
  maxTrack: 4;
  fontsize?: number;
}

export class Danmaku extends EventEmitter implements Dispose {
  el: HTMLElement;

  constructor(container: HTMLDivElement | string, private _opts?: DanmakuOptions) {
    super();
    this.el = document.createElement('div');
  }

  dispose(): void {
    this.el = null!;
  }
}
