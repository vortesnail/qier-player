import { EventEmitter } from './utils/eventmitter';
import { IPlayerOptions } from './types';
import { defaultSetting, processOptions } from './options';
import { createEle, getEle } from './utils/dom';
import { setVideoAttrs, setCssVariables, registerNamedMap, markingEvent } from './helper';
import { Controller, IControllerEle } from './modules/controller';
import { CLASS_PREFIX } from './constants';
import { adsorb } from './utils/freUse';
import { I18n } from './features/i18n';

export class Player extends EventEmitter {
  container: HTMLElement | null;

  el: HTMLDivElement;

  options: Required<IPlayerOptions>;

  readonly video: HTMLVideoElement;

  readonly controller: Controller;

  private prevVolume = 0.5;

  private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

  constructor(opts?: IPlayerOptions) {
    super();
    this.options = processOptions(opts);
    this.container = getEle(this.options.container);
    this.el = createEle(`div.${CLASS_PREFIX}`, { tabindex: 0 }, '');
    this.video = createEle('video.video');

    if (this.options.src) this.options.videoProps.src = this.options.src;
    setVideoAttrs(this.video, this.options.videoProps);
    setCssVariables(this.el, this.options);
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

    defaultSetting(this);
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

  get buffered(): TimeRanges {
    return this.video.buffered;
  }

  get paused(): boolean {
    return this.video.paused;
  }

  get volume(): number {
    return this.video.volume;
  }

  set volume(n: number) {
    this.video.volume = adsorb(n);
    if (this.muted && n > 0) this.muted = false;
  }

  get muted(): boolean {
    return this.video.muted || this.volume === 0;
  }

  set muted(v: boolean) {
    this.video.muted = v;
    if (v) this.volume = 0;
  }

  play(): Promise<void> | void {
    return this.video.play();
  }

  pause(): void {
    this.video.pause();
  }

  seek(seconds: number): void {
    this.video.currentTime = adsorb(seconds, 0, this.duration);
  }

  toggle = () => {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  };

  toggleVolume(): void {
    if (this.muted) {
      this.volume = this.prevVolume || 1;
    } else {
      this.prevVolume = this.volume;
      this.volume = 0;
    }
  }

  videoClickToggle() {
    this.video.addEventListener('click', this.toggle);
  }

  cancellVideoClickToggle() {
    this.video.removeEventListener('click', this.toggle);
  }

  eachBuffer(fn: (start: number, end: number) => boolean | void): void {
    for (let l = this.buffered.length, i = l - 1; i >= 0; i--) {
      if (fn(this.buffered.start(i), this.buffered.end(i))) {
        break;
      }
    }
  }

  registerControllerEle(ele: IControllerEle, id?: string): void {
    this.controllerNameMap[id || ele.id] = ele;
  }

  getControllerEle(id: string): IControllerEle | undefined {
    return this.controllerNameMap[id] as IControllerEle;
  }

  static I18n = I18n;
}
