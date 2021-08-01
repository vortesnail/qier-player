import { DomNode } from '@Src/main/utils/domNode';
import { addClass, removeClass, hide, show } from '@Src/main/utils/dom';

const classLeft = 'tooltip-left';
const classRight = 'tooltip-right';
const classBottom = 'tooltip-bottom';

export class Tooltip extends DomNode {
  constructor(container: HTMLElement, html?: string) {
    addClass(container, 'tooltip');
    super(container, 'div.tooltip_content');
    if (html) this.html = html;
  }

  get html(): string {
    return this.el.innerHTML;
  }

  set html(s: string) {
    this.el.innerHTML = s;
  }

  resetPos(): void {
    removeClass(this.el, classLeft);
    removeClass(this.el, classRight);
    removeClass(this.el, classBottom);
  }

  setBottom(): void {
    addClass(this.el, classBottom);
  }

  setLeft(): void {
    addClass(this.el, classLeft);
  }

  setRight(): void {
    addClass(this.el, classRight);
  }

  hide(): void {
    hide(this.el);
  }

  show(): void {
    show(this.el);
  }
}
