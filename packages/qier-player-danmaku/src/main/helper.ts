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
