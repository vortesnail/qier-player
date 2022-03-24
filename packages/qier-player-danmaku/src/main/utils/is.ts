import { RollingDanmu } from '../types';

const { toString } = Object.prototype;

export function isString(o: any): o is string {
  return typeof o === 'string' || toString.call(o) === '[object String]';
}

export function isBool(o: any): o is boolean {
  return o === true || o === false || toString.call(o) === '[object Boolean]';
}

export function isFunction(o: any): o is Function {
  return typeof o === 'function' || toString.call(o) === '[object Function]';
}

export function isNumber(o: any): o is number {
  return typeof o === 'number' || toString.call(o) === '[object Number]';
}

export function isHTMLElement(o: any): o is HTMLElement {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
}

export function isRollingDanmu(o: any): o is RollingDanmu {
  return Object.prototype.hasOwnProperty.call(o, 'speed') && Object.prototype.hasOwnProperty.call(o, 'offset');
}
