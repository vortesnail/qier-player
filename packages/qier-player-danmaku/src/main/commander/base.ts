import { EventEmitter } from '../utils/eventmitter';
import { Danmu, Commander } from '../types';
import Track from '../track';

export default abstract class Base<T extends Danmu> extends EventEmitter {
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

  /**
   * resize
   * @param {Number} [height] 每个轨道高度
   */
  resize(height?: number) {
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
  abstract _findTrack(): number;

  /**
   * 从等待队列中抽取弹幕并放入弹幕
   */
  abstract _extractBarrage(): void;

  /**
   * 渲染函数
   */
  abstract render(): void;

  /**
   * 重置
   */
  abstract reset(): void;
}
