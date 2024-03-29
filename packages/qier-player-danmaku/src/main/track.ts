import { Danmu } from './types';
import { isRollingDanmu } from './utils/is';

interface TrackForEachHandler<T extends Danmu> {
  (track: T, index: number, array: T[]): void;
}

export default class Track<T extends Danmu> {
  danmus: T[] = [];

  offset = 0;

  each(handler: TrackForEachHandler<T>) {
    for (let i = 0; i < this.danmus.length; ++i) {
      handler(this.danmus[i], i, this.danmus);
    }
  }

  push(...items: T[]) {
    this.danmus.push(...items);
  }

  remove(index: number) {
    if (index < 0 || index >= this.danmus.length) {
      return;
    }
    this.danmus.splice(index, 1);
  }

  updateOffset() {
    const lastDanmu = this.danmus[this.danmus.length - 1];
    if (lastDanmu && isRollingDanmu(lastDanmu)) {
      const { speed } = lastDanmu;
      this.offset -= speed;
    }
  }

  reset() {
    this.danmus = [];
    this.offset = 0;
  }
}
