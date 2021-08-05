import { IThumbnail } from '@Src/main/types';
import { addDispose } from '@Src/main/utils/dispose';
import { createEle } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { adsorb, formatTime } from '@Src/main/utils/freUse';
import { Rect } from '@Src/main/utils/rect';

export interface ThumbImg {
  url: string;
  x: number;
  y: number;
}

const defaultOpts: Required<IThumbnail> = {
  startSecond: 0,
  gapSecond: 5,
  col: 5,
  row: 5,
  width: 160,
  height: 90,
  images: [],
};

export class Thumbnail extends DomNode {
  private opts = defaultOpts;

  private preImgEl?: HTMLElement;

  private timeTagEl: HTMLElement;

  private onePreImgNums?: number;

  private rect: Rect;

  constructor(container: HTMLElement, opts: IThumbnail) {
    super(container, 'div.progress_thumb');

    this.updateOptions(opts);

    this.timeTagEl = this.el.appendChild(createEle('div.progress_thumb_time'));
    this.timeTagEl.textContent = '0:00';

    this.rect = addDispose(this, new Rect(this.el));
  }

  private getCurrentThumb(second: number): ThumbImg | void {
    const preImgIndex = Math.floor(
      (second - this.opts.startSecond) / ((this.onePreImgNums || 1) * this.opts.gapSecond),
    );
    const imgIndex = Math.floor(
      ((second - this.opts.startSecond) % ((this.onePreImgNums || 1) * this.opts.gapSecond)) / this.opts.gapSecond,
    );
    const url = this.opts.images[preImgIndex];

    if (!url) return;

    const x = ((imgIndex % this.opts.col) % this.opts.col) * this.opts.width;
    const y = (Math.floor(imgIndex / this.opts.col) % this.opts.row) * this.opts.height;

    return { url, x, y };
  }

  updateOptions(opts: IThumbnail): void {
    Object.assign(this.opts, opts);

    if (!this.opts.images.length) return;

    if (!this.preImgEl) {
      this.preImgEl = this.el.appendChild(createEle('div.progress_thumb_img'));
    }
    this.preImgEl.style.width = `${this.opts.width}px`;
    this.preImgEl.style.height = `${this.opts.height}px`;
    this.onePreImgNums = this.opts.row * this.opts.col;
  }

  updatePos(seconds: number, x: number, maxX: number) {
    this.timeTagEl.textContent = formatTime(seconds);

    if (this.preImgEl) {
      const thumb = this.getCurrentThumb(seconds);
      if (thumb) {
        this.preImgEl.style.backgroundImage = `url(${thumb.url})`;
        this.preImgEl.style.backgroundPosition = `-${thumb.x}px -${thumb.y}px`;
      }
    } else {
      this.rect.update();
    }

    const half = this.rect.width / 2;

    this.injectStyle({
      left: `${adsorb(x - half, 0, Math.max(0, maxX - 2 * half))}px`,
    });
  }
}
