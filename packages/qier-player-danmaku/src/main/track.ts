import { Danma } from './types';

interface TrackForEachHandler<T extends Danma> {
  (track: T, index: number, array: T[]): void;
}

export default class Track<T extends Danma> {
  danmas: T[] = [];

  offset = 0;

  forEach(handler: TrackForEachHandler<T>) {
    for (let i = 0; i < this.danmas.length; ++i) {
      handler(this.danmas[i], i, this.danmas);
    }
  }

  push(...items: T[]) {
    this.danmas.push(...items);
  }

  removeTop() {
    this.danmas.shift();
  }

  remove(index: number) {
    if (index < 0 || index >= this.danmas.length) {
      return;
    }
    this.danmas.splice(index, 1);
  }

  reset() {
    this.danmas = [];
    this.offset = 0;
  }
}
