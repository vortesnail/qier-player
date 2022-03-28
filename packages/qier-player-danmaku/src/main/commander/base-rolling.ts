import Base from './base';
import { Danmu, Commander } from '../types';

export default abstract class BaseRolling<T extends Danmu> extends Base<T> {
  el: HTMLElement;

  objToElm: WeakMap<T, HTMLElement> = new WeakMap();

  elmToObj: WeakMap<HTMLElement, T> = new WeakMap();

  constructor(el: HTMLElement, config: Commander) {
    super(config);

    this.el = el;

    const wrapper = config.eventProxyElement;
  }

  removeElement(target: HTMLElement) {
    this.el.removeChild(target);
  }

  reset(): void {
    console.log('reset');
  }
}
