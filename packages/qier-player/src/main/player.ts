import { PlayerOptions } from './types';
import { processOptions } from './options';
import { createEle, getEle } from './utils/dom';
import { setVideoAttrs } from './helper';

export class Player {
  container: HTMLElement | null;

  el: HTMLDivElement;

  options: Required<PlayerOptions>;

  readonly video: HTMLVideoElement;

  constructor(opts?: PlayerOptions) {
    this.options = processOptions(opts);
    this.container = getEle(this.options.container);
    this.el = createEle('div', { tabindex: 0 });
    this.video = createEle('video');

    if (this.options.src) this.options.videoProps.src = this.options.src;
    setVideoAttrs(this.video, this.options.videoProps);
    this.el.appendChild(this.video);
  }

  mount(container?: PlayerOptions['container']): void {
    if (container) this.container = getEle(container) || this.container;
    if (!this.container) return;
    this.container.appendChild(this.el);
  }

  play(): Promise<void> | void {
    return this.video.play();
  }

  pause(): void {
    this.video.pause();
  }
}
