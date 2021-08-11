import { IControllerEle } from '../modules/controller';

export type TElement = Pick<IControllerEle, 'el' | 'id'>;

function isSameElement(a: TElement | null, b: TElement | null): boolean {
  if (!a || !b) return false;
  return a === b || a.id === b.id;
}

function findSameElement(list: (TElement | null)[], element: TElement) {
  return list.findIndex((item) => item && isSameElement(item, element));
}

export function patch(
  oldElements: (TElement | null)[],
  newElements: (TElement | null)[],
  container: HTMLElement,
  op: {
    mount?: (element: TElement) => void;
    unmount?: (element: TElement) => void;
  } = {},
) {
  let oldStartIdx = 0;
  let oldEndIdx = oldElements.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newElements.length - 1;

  let oldStartEle = oldElements[oldStartIdx];
  let oldEndEle = oldElements[oldEndIdx];
  let newStartEle = newElements[newStartIdx];
  let newEndEle = newElements[newEndIdx];

  while (isSameElement(oldStartEle, newStartEle)) {
    oldStartEle = oldElements[++oldStartIdx];
    newStartEle = newElements[++newStartIdx];
  }

  while (isSameElement(oldEndEle, newEndEle)) {
    oldEndEle = oldElements[--oldEndIdx];
    newEndEle = newElements[--newEndIdx];
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartEle === null) {
      oldStartEle = oldElements[++oldStartIdx];
    } else if (oldEndEle === null) {
      oldEndEle = oldElements[--oldEndIdx];
    } else if (newStartEle === null) {
      newStartEle = oldElements[++newStartIdx];
    } else if (newEndEle === null) {
      newEndEle = oldElements[--newEndIdx];
    } else if (isSameElement(oldStartEle, newStartEle)) {
      oldStartEle = oldElements[++oldStartIdx];
      newStartEle = newElements[++newStartIdx];
    } else if (isSameElement(oldStartEle, newEndEle)) {
      container.insertBefore(oldStartEle.el, oldEndEle.el);
      container.insertBefore(oldStartEle.el, oldEndEle.el.nextSibling);
      oldStartEle = oldElements[++oldStartIdx];
      newEndEle = newElements[--newEndIdx];
    } else if (isSameElement(oldEndEle, newStartEle)) {
      container.insertBefore(oldEndEle.el, oldStartEle.el);
      oldEndEle = oldElements[--oldEndIdx];
      newStartEle = newElements[++newStartIdx];
    } else if (isSameElement(oldEndEle, newEndEle)) {
      oldEndEle = oldElements[--oldEndIdx];
      newEndEle = newElements[--newEndIdx];
    } else {
      const findIndex = findSameElement(oldElements, newStartEle);
      if (findIndex === -1) {
        if (op.mount) {
          op.mount(newStartEle);
        }
        container.insertBefore(newStartEle.el, oldStartEle.el);
      } else {
        const oldElement = oldElements[findIndex];
        container.insertBefore(oldElement!.el, oldStartEle.el);
        oldElements[findIndex] = null;
      }
      newStartEle = newElements[++newStartIdx];
    }
  }

  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (op.unmount) {
        op.unmount(oldElements[i]!);
      }
      oldElements[i] && container.removeChild(oldElements[i]!.el);
    }
  } else if (newStartIdx <= newEndIdx) {
    const before = newElements[newEndIdx + 1] ? newElements[newEndIdx + 1]!.el : null;

    for (let i = newStartIdx; i <= newEndIdx; i++) {
      if (op.mount) {
        op.mount(newElements[i]!);
      }
      container.insertBefore(newElements[i]!.el, before);
    }
  }
}
