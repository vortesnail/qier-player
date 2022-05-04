import { setStyle } from './utils/dom';

export function createDanmu(
  text: string,
  color: string,
  fontSize: number,
  height: number,
  left: number,
  el?: HTMLElement,
) {
  const danmuDom = el || document.createElement('div');
  setStyle(danmuDom, {
    position: 'absolute',
    left: '0px',
    top: '0px',
    height: `${height}px`,
    lineHeight: `${height}px`,
    padding: '0 8px',
    color,
    fontSize: `${fontSize}px`,
    transform: `translateX(${left}px)`,
    textShadow: '#000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0',
    pointerEvents: 'auto',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
  });
  danmuDom.textContent = text;
  return danmuDom;
}

export function setHoverStyle(el: HTMLElement) {
  el.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  el.style.zIndex = '1000';
  el.style.cursor = 'pointer';
}

export function setBlurStyle(el: HTMLElement) {
  el.style.backgroundColor = 'transparent';
  el.style.cursor = 'auto';
}
