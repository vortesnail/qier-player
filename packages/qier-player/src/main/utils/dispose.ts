import { DomListener } from './dom';

export interface Dispose {
  dispose: () => void;
}

const disposeMap: Map<any, Array<Dispose>> = new Map();

export function getDisposeMap(): Map<any, Array<Dispose>> {
  return disposeMap;
}

export function addDispose<T extends Dispose>(key: any, d: T): T {
  if (!disposeMap.has(key)) disposeMap.set(key, []);
  disposeMap.get(key)?.push(d);
  return d;
}

export function dispose(key: any): void {
  if (disposeMap.has(key)) {
    disposeMap.get(key)?.forEach((item) => item.dispose());
    disposeMap.delete(key);
  }
}

export function addDisposeListener<K extends keyof GlobalEventHandlersEventMap>(
  key: any,
  node: EventTarget,
  type: K,
  handler: (event: GlobalEventHandlersEventMap[K]) => void,
  useCapture?: boolean,
): DomListener;
export function addDisposeListener(
  key: any,
  node: EventTarget,
  type: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions,
): DomListener {
  const domListener = new DomListener(node, type, handler, options);
  if (key) addDispose(key, domListener);
  return domListener;
}
