import { isString, isBool, isHTMLElement } from './is';
import { CLASS_PREFIX } from '../constants';
import { Dispose } from './dispose';

// e.g. 'div#id.className' to get 'div', 'id', '.className'
const SELECTOR_REGEX = /([\w-]+)?(?:#([\w-]+))?((?:\.(?:[\w-]+))*)/;

export function createEle<T extends HTMLElement>(
  tag?: string,
  attrs?: Record<string, any>,
  children?: string | Array<Node>,
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

  if (children) {
    if (isString(children)) {
      ele.innerHTML = children;
    } else {
      children.forEach((c) => ele.appendChild(c));
    }
  }

  return ele as T;
}

export function addChildren(container: HTMLElement, child?: string | Array<Node>): void {
  if (!child) return;
  if (isString(child)) {
    container.innerHTML = child;
  } else {
    child.forEach((c) => container.appendChild(c));
  }
}

export function getEle(el: HTMLElement | string | undefined | null): HTMLElement | null {
  if (!el) return null;
  if (isString(el)) return document.querySelector(el);
  if (isHTMLElement(el)) return el;

  throw new Error('The container element you are currently passing in is not an HTML element');
}

export function removeEle(el: Element): void {
  if (!el) return;
  if (el.remove) {
    el.remove();
  } else if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
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

export function removeClass<T extends Element>(dom: T, cls: string, prefix = CLASS_PREFIX): T {
  dom.classList.remove(`${prefix}_${cls}`);
  return dom;
}

export function containClass(dom: Element, cls: string, prefix = CLASS_PREFIX): boolean {
  return dom.classList.contains(`${prefix}_${cls}`);
}

export function toggleClass(dom: Element, cls: string, force?: boolean, prefix = CLASS_PREFIX): boolean {
  cls = `${prefix}_${cls}`;
  if (force) {
    dom.classList.add(cls);
    return true;
  }
  if (force === false) {
    dom.classList.remove(cls);
    return true;
  }
  return dom.classList.toggle(cls, force);
}

const svgNS = 'http://www.w3.org/2000/svg';

export function createSvg(cls?: string, d?: string, viewBox = '0 0 1024 1024'): SVGSVGElement {
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

export function getEventPath(ev: Event): EventTarget[] {
  return (ev as any).path || ev.composedPath();
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

export function getElementSize(dom: HTMLElement): Pick<DOMRect, 'width' | 'height'> {
  const clone = dom.cloneNode(true) as HTMLElement;
  clone.style.position = 'absolute';
  clone.style.opacity = '0';
  clone.removeAttribute('hidden');

  const parent = dom.parentNode || document.body;
  parent.appendChild(clone);

  const rect = clone.getBoundingClientRect();

  parent.removeChild(clone);

  return {
    width: rect.width,
    height: rect.height,
  };
}
