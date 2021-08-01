import { EventEmitter } from './utils/eventmitter';
import { IPlayerOptions } from './types';
import { processOptions } from './options';
import { createEle, getEle } from './utils/dom';
import { setVideoAttrs, registerNamedMap, markingEvent } from './helper';
import { Controller, IControllerEle } from './modules/controller';
import { CLASS_PREFIX } from './constants';
import { adsorb } from './utils/freUse';

export class Player extends EventEmitter {
  container: HTMLElement | null;

  el: HTMLDivElement;

  options: Required<IPlayerOptions>;

  readonly video: HTMLVideoElement;

  readonly controller: Controller;

  private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

  constructor(opts?: IPlayerOptions) {
    super();
    this.options = processOptions(opts);
    this.container = getEle(this.options.container);
    this.el = createEle(`div.${CLASS_PREFIX}`, { tabindex: 0 }, '');
    this.video = createEle('video.video');

    if (this.options.src) this.options.videoProps.src = this.options.src;
    setVideoAttrs(this.video, this.options.videoProps);
    markingEvent(this);
    this.el.appendChild(this.video);

    registerNamedMap(this);

    this.controller = new Controller(this, this.el);

    this.videoClickToggle();
  }

  mount(container?: IPlayerOptions['container']): void {
    if (container) this.container = getEle(container) || this.container;
    if (!this.container) return;
    this.container.appendChild(this.el);
  }

  get currentTime(): number {
    return this.video.currentTime;
  }

  set currentTime(n: number) {
    if (!this.duration) return;
    const diff = n - this.video.currentTime;
    if (!diff) return;
    this.video.currentTime = adsorb(n, 0, this.duration);
  }

  get duration(): number {
    return this.video.duration || 0;
  }

  get paused(): boolean {
    return this.video.paused;
  }

  play(): Promise<void> | void {
    return this.video.play();
  }

  pause(): void {
    this.video.pause();
  }

  toggle = () => {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  };

  videoClickToggle() {
    this.video.addEventListener('click', this.toggle);
  }

  cancellVideoClickToggle() {
    this.video.removeEventListener('click', this.toggle);
  }

  registerControllerEle(ele: IControllerEle, id?: string): void {
    this.controllerNameMap[id || ele.id] = ele;
  }

  getControllerEle(id: string): IControllerEle | undefined {
    return this.controllerNameMap[id] as IControllerEle;
  }
}
