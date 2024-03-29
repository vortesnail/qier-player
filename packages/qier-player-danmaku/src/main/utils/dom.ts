import { isString, isHTMLElement } from './is';
import { Dispose } from './dispose';

export function getEle(el: HTMLElement | string | undefined | null): HTMLElement | null {
  if (!el) return null;
  if (isString(el)) return document.querySelector(el);
  if (isHTMLElement(el)) return el;

  return null;
}

export function camel2line(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function setStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  let cssText = ';';
  for (const key in style) {
    cssText += `${camel2line(key)}: ${style[key]};`;
  }
  el.style.cssText = cssText;
}

export function removeEle(el: Element): void {
  if (!el) return;
  if (el.remove) {
    el.remove();
  } else if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

export class DomListener implements Dispose {
  constructor(
    private node: EventTarget,
    private type: string,
    private handler: (e: any) => void,
    private options?: boolean | AddEventListenerOptions,
  ) {
    // 对于 options 的支持暂未判断
    node.addEventListener(type, handler, this.options);
  }

  dispose(): void {
    if (!this.handler) return;
    this.node.removeEventListener(this.type, this.handler, this.options);
    this.node = null!;
    this.handler = null!;
    this.options = null!;
  }
}
