import Base from './base';
import { dispose, addDisposeListener } from '../utils/dispose';
import type { Danmu, Commander, DanmakuOptionsInit } from '../types';
import { removeEle } from '../utils/dom';
import { setBlurStyle, setHoverStyle } from '../helper';
import { EVENT } from '../constants';
import { Danmaku } from '../danmaku';

export default abstract class BaseRolling<T extends Danmu> extends Base<T> {
  el: HTMLElement;

  objToElm: WeakMap<T, HTMLElement> = new WeakMap();

  elmToObj: WeakMap<HTMLElement, T> = new WeakMap();

  staticDanmu: T | null = null;

  constructor(readonly danmaku: Danmaku, el: HTMLElement, config: Commander, options: DanmakuOptionsInit) {
    super(config, options);

    this.el = el;

    const proxyEl = options.eventProxyElement;
    if (proxyEl) {
      addDisposeListener(this, proxyEl, 'mouseover', this.mouseOverEventHandler.bind(this));
      addDisposeListener(this, proxyEl, 'mouseout', this.mouseOutEventHandler.bind(this));
      addDisposeListener(this, proxyEl, 'click', this.mouseClickEventHandler.bind(this));
    }
  }

  mouseOverEventHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (!target) {
      return;
    }

    const newStaticDanmu = this.elmToObj.get(target);
    const oldStaticDanmu = this.staticDanmu;

    if (newStaticDanmu === oldStaticDanmu) {
      return;
    }

    this.staticDanmu = null;

    if (newStaticDanmu) {
      this.staticDanmu = newStaticDanmu;
      newStaticDanmu.static = true;
      setHoverStyle(target);
      this.danmaku.emit(EVENT.HOVER, newStaticDanmu, target);
    }
  }

  mouseOutEventHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (!target) {
      return;
    }

    const staticDanmu = this.elmToObj.get(target);

    this.staticDanmu = null;

    if (staticDanmu) {
      staticDanmu.static = false;
      const oldStaticEle = this.objToElm.get(staticDanmu);
      oldStaticEle && setBlurStyle(oldStaticEle);
      this.danmaku.emit(EVENT.BLUR, staticDanmu, oldStaticEle);
    }
  }

  mouseClickEventHandler(e: Event) {
    const target = e.target as HTMLElement;
    const danmu = this.elmToObj.get(target);
    if (danmu) {
      this.danmaku.emit(EVENT.CLICK, danmu, target);
    }
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
