import { isString, isBool, isHTMLElement } from './is';
import { CLASS_PREFIX } from '../constants';
import { Dispose } from './dispose';

// e.g. 'div#id.className' to get 'div', 'id', '.className'
const SELECTOR_REGEX = /([\w-]+)?(?:#([\w-]+))?((?:\.(?:[\w-]+))*)/;

export function createEle<T extends HTMLElement>(
  tag?: string,
  attrs?: Record<string, any>,
  classPrefix = CLASS_PREFIX,
): T {
  const diviTag = classPrefix === '' ? '' : '_';

  let match: string[] = [];
  if (tag) match = SELECTOR_REGEX.exec(tag) || [];

  const ele = document.createElement(match[1] || 'div');

  if (match[2]) ele.id = match[2];
  if (match[3]) ele.className = match[3].replace(/\./g, ` ${classPrefix}${diviTag}`).trim();

  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      const value = attrs[attr];
      if (value === undefined) return;
      if (/^on\w+$/.test(attr)) {
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

export function show(node: HTMLElement | SVGElement): void {
  node.style.display = '';
}

export function hide(node: HTMLElement | SVGElement): void {
  node.style.display = 'none';
}

export function addClass<T extends Element>(dom: T, cls = '', prefix = CLASS_PREFIX): T {
  cls = cls.trim();
  if (!cls) return dom;
  if (dom.classList) {
    cls.split(' ').forEach((c) => dom.classList.add(`${prefix}_${c}`));
  } else {
    const oldCls = (dom.className && (dom.className as any).baseVal) || '';
    dom.setAttribute(
      'class',
      (oldCls ? `${oldCls} ` : '') +
        cls
          .split(' ')
          .map((c) => prefix + c)
          .join(' '),
    );
  }
  return dom;
}

const svgNS = 'http://www.w3.org/2000/svg';

export function createSvg(cls?: string, d?: string, viewBox = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  if (cls) addClass(svg, cls);
  if (d) {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttributeNS(null, 'd', d);
    svg.appendChild(path);
  }
  return svg;
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