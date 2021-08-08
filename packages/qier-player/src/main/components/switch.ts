import { addDisposeListener } from '../utils/dispose';
import { toggleClass, containClass } from '../utils/dom';
import { DomNode } from '../utils/domNode';

const activeClass = 'switch_active';

export class Switch extends DomNode {
  constructor(container: HTMLElement, value?: boolean, change?: (v: boolean) => void) {
    super(container, '.switch');
    this.toggle(value || false);

    // if (change) {
    //   addDisposeListener(this, this.el, 'click', () => {
    //     this.toggle();
    //     change(containClass(this.el, activeClass));
    //   });
    // }
  }

  toggle(value?: boolean): void {
    toggleClass(this.el, activeClass, value);
  }
}
