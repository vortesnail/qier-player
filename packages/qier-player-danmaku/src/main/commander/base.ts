import { EventEmitter } from '../utils/eventmitter';
import { Danma, Commander } from '../types';
import Track from '../track';

export default abstract class Base<T extends Danma> extends EventEmitter {
  protected trackHeight: number;

  protected duration: number;

  protected trackCnt: number;

  protected tracks: Track<T>[] = [];

  waitingQueue: T[] = [];

  constructor(config: Commander) {
    super();
    this.trackHeight = config.trackHeight;
    this.duration = config.duration;
    this.trackCnt = config.trackCnt;

    for (let i = 0; i < config.trackCnt; ++i) {
      this.tracks[i] = new Track();
    }
  }
}
