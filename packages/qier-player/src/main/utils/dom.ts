import { isString, isHTMLElement } from './is';
import { CLASS_PREFIX } from '../constants';

export function createEle<T extends HTMLElement>(
  tag = 'div',
  attrs?: Record<string, any>,
  classPrefix = CLASS_PREFIX,
): T {
  const ele = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      const value = attrs[attr];
      if (value === undefined) return;

      if (attr === 'className') {
        ele.className = `${classPrefix}_${value}`;
      } else if (attr === 'id' || /^on\w+$/.test(attr)) {
        (ele as any)[attr] = value;
      } else {
        ele.setAttribute(attr, value);
      }
    });
  }

  return ele as T;
}

export function getEle(el: HTMLElement | string | undefined | null): HTMLElement | null {
  if (!el) return null;
  if (isString(el)) return document.querySelector(el);
  if (isHTMLElement(el)) return el;

  throw new Error('The container element you are currently passing in is not an HTML element');
}
