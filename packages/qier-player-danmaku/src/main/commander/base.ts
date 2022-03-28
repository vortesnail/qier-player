import { EventEmitter } from '../utils/eventmitter';
import { Danmu, Commander } from '../types';
import Track from '../track';

interface EachCommanderHandler<T extends Danmu> {
  (track: Track<T>, index: number, array: Track<T>[]): void;
}

export default abstract class Base<T extends Danmu> extends EventEmitter {
  protected trackWidth: number;

  protected trackHeight: number;

  protected duration: number;

  protected trackCnt: number;

  protected tracks: Track<T>[] = [];

  waitingQueue: T[] = [];

  constructor(config: Commander) {
    super();

    this.trackWidth = config.trackWidth;
    this.trackHeight = config.trackHeight;
    this.duration = config.duration;
    this.trackCnt = config.trackCnt;

    for (let i = 0; i < config.trackCnt; ++i) {
      this.tracks[i] = new Track();
    }
  }

  /**
   * 遍历所有轨道并回调
   */
  each(handler: EachCommanderHandler<T>) {
    for (let i = 0; i < this.tracks.length; ++i) {
      handler(this.tracks[i], i, this.tracks);
    }
  }

  /**
   * resize
   * @param {Number} [height] 每个轨道高度
   */
  resize(width?: number, height?: number) {
    if (width) {
      this.trackWidth = width;
    }
    if (height) {
      this.trackHeight = height;
    }
  }

  /**
   * 添加弹幕到等待队列
   * @param {Object} danmu 弹幕对象
   * @return {Boolean} 是否添加成功
   */
  abstract add(danmu: T): boolean;

  /**
   * 寻找合适的轨道
   * @return {Number} 合适轨道的下标
   */
  abstract findTrack(): number;

  /**
   * 从等待队列中抽取弹幕并放入弹幕
   */
  abstract extractDanmu(): void;

  /**
   * 渲染函数
   */
  abstract render(): void;

  /**
   * 重置清空
   */
  abstract reset(): void;
}
