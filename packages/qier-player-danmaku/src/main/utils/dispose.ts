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
