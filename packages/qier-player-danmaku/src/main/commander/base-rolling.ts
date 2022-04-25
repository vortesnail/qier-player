import Base from './base';
import { dispose, addDisposeListener } from '../utils/dispose';
import type { Danmu, Commander, DanmakuOptionsInit } from '../types';
import { removeEle } from '../utils/dom';

export default abstract class BaseRolling<T extends Danmu> extends Base<T> {
  el: HTMLElement;

  objToElm: WeakMap<T, HTMLElement> = new WeakMap();

  elmToObj: WeakMap<HTMLElement, T> = new WeakMap();

  constructor(el: HTMLElement, config: Commander, options: DanmakuOptionsInit) {
    super(config, options);

    this.el = el;

    const proxyEl = options.eventProxyElement;
    if (proxyEl) {
      addDisposeListener(this, proxyEl, 'mousemove', this.mouseMoveEventHandler.bind(this));
      addDisposeListener(this, proxyEl, 'click', this.mouseClickEventHandler.bind(this));
    }
  }

  mouseMoveEventHandler(e: Event) {
    console.log(1);
  }

  mouseClickEventHandler(e: Event) {
    console.log(1);
  }

  removeElement(target: HTMLElement) {
    this.el.removeChild(target);
  }

  reset(): void {
    this.each((track) => {
      track.each((danmu) => {
        const el = this.objToElm.get(danmu);
        if (!el) {
          return;
        }
        this.removeElement(el);
      });
      track.reset();
    });
  }

  dispose() {
    removeEle(this.el);
    dispose(this);
  }
}
