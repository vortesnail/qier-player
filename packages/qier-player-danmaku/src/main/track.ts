import { Danmu } from './types';

interface TrackForEachHandler<T extends Danmu> {
  (track: T, index: number, array: T[]): void;
}

export default class Track<T extends Danmu> {
  danmus: T[] = [];

  offset = 0;

  forEach(handler: TrackForEachHandler<T>) {
    for (let i = 0; i < this.danmus.length; ++i) {
      handler(this.danmus[i], i, this.danmus);
    }
  }

  push(...items: T[]) {
    this.danmus.push(...items);
  }

  removeTop() {
    this.danmus.shift();
  }

  remove(index: number) {
    if (index < 0 || index >= this.danmus.length) {
      return;
    }
    this.danmus.splice(index, 1);
  }

  reset() {
    this.danmus = [];
    this.offset = 0;
  }
}
