import { addClass, createEle, removeClass } from '../utils/dom';
import { DomNode } from '../utils/domNode';

const classActive = 'popover_active';

export class Popover extends DomNode {
  readonly panelEl: HTMLElement;

  constructor(container: HTMLElement, style?: Partial<CSSStyleDeclaration>, left?: boolean) {
    super(container, '.popover');
    this.panelEl = this.el.appendChild(createEle('div.popover_panel'));

    if (style) this.injectPanelStyle(style);

    if (left) addClass(this.panelEl, 'popover_panel_left');
  }

  injectPanelStyle(style: Partial<CSSStyleDeclaration>): void {
    Object.assign(this.panelEl.style, style);
  }

  show() {
    addClass(this.el, classActive);
  }

  hide() {
    removeClass(this.el, classActive);
  }
}
