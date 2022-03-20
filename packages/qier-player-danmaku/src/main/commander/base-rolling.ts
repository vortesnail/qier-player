import Base from './base';
import { Danmu, Commander } from '../types';

export default abstract class BaseRolling<T extends Danmu> extends Base<T> {
  el: HTMLElement;

  constructor(el: HTMLElement, config: Commander) {
    super(config);

    this.el = el;

    const wrapper = config.eventProxyElement;
  }

  reset(): void {
    console.log('reset');
  }
}
