import { createEle } from './dom';

export class DomNode {
  el: HTMLElement;

  constructor(container?: HTMLElement, tag?: string, attrs?: Record<string, any>, classPrefix?: string) {
    this.el = createEle(tag, attrs, classPrefix);
    if (container) container.appendChild(this.el);
  }

  injectStyle(style: Partial<CSSStyleDeclaration>): void {
    Object.assign(this.el.style, style);
  }
}
