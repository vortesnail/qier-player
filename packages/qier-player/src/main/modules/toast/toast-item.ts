import { addClass } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { isHTMLElement, isString } from '@Src/main/utils/is';
import { Position } from '.';

export class ToastItem extends DomNode {
  timer!: any;

  readonly position!: Position;

  constructor(container: HTMLElement, html: string | HTMLElement, position: Position = 'center') {
    super(container, '.toast');
    this.position = position;
    addClass(this.el, `toast_${position}`);
    if (isHTMLElement(html)) this.el.appendChild(html);
    if (isString(html)) this.el.innerHTML = html;
  }

  dispose(): void {
    super.dispose();
    clearTimeout(this.timer);
  }
}
