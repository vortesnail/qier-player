import { isString, isHTMLElement } from './is';

export function getEle(el: HTMLElement | string | undefined | null): HTMLElement | null {
  if (!el) return null;
  if (isString(el)) return document.querySelector(el);
  if (isHTMLElement(el)) return el;

  return null;
}
