import { EventEmitter } from './utils/eventmitter';
import { IController, IPlayerOptions } from './types';
import { defaultSetting, processOptions } from './options';
import { createEle, getEle, removeEle } from './utils/dom';
import { setVideoAttrs, setCssVariables, registerNamedMap, markingEvent } from './helper';
import { Controller, IControllerEle } from './modules/controller';
import { CLASS_PREFIX, EVENT, TIME } from './constants';
import { adsorb } from './utils/freUse';
import { addDispose, dispose, Dispose } from './utils/dispose';
import { ISettingItem } from './modules/controller/eles/settings';
import { isString } from './utils/is';
import { Rect } from './utils/rect';
import { WebFullscreen } from './features/web-fullscreen';
import { Fullscreen } from './features/fullscreen';
import { Poster } from './modules/poster';
import { Loading } from './modules/loading';
import { IMenuItem, Menu } from './modules/menu';
import { Toast } from './modules/toast';
import { Shortcut } from './features/shortcut';

export class Player extends EventEmitter implements Dispose {
  container: HTMLElement | null;

  el: HTMLDivElement;

  options: Required<IPlayerOptions>;

  readonly video: HTMLVideoElement;

  toggleDelayTimer: NodeJS.Timeout | null;

  toggleDelayFlag: boolean;

  readonly rect: Rect;

  readonly poster: Poster;

  readonly loading: Loading;

  readonly webFullscreen: WebFullscreen;

  readonly fullscreen: Fullscreen;

  readonly menu: Menu;

  readonly toast: Toast;

  readonly shortcut: Shortcut;

  readonly controller: Controller;

  private prevVolume = 0.5;

  private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

  private readonly settingNamedMap: Record<string, ISettingItem> = Object.create(null);

  private readonly menuNamedMap: Record<string, IMenuItem> = Object.create(null);

  readonly settingItems: ISettingItem[];

  constructor(opts?: IPlayerOptions) {
    super();
    this.options = processOptions(opts);
    this.container = getEle(this.options.container);
    this.el = createEle(`div.${CLASS_PREFIX}`, { tabindex: 0 }, undefined, '');
    this.video = createEle('video.video');

    if (this.options.src) this.options.videoProps.src = this.options.src;
    setVideoAttrs(this.video, this.options.videoProps);
    setCssVariables(this.el, this.options);
    markingEvent(this);
    this.el.appendChild(this.video);

    registerNamedMap(this);

    this.rect = addDispose(this, new Rect(this.el, this));
    this.webFullscreen = addDispose(this, new WebFullscreen(this));
    this.fullscreen = addDispose(this, new Fullscreen(this));
    this.poster = addDispose(this, new Poster(this.el, this));
    this.loading = addDispose(this, new Loading(this.el, this));
    this.toast = addDispose(this, new Toast(this.el));
    this.shortcut = addDispose(this, new Shortcut(this, this.options.shortcutOptions.disabled));

    this.settingItems = this.options.settings
      .map((item) => {
        if (isString(item)) return this.settingNamedMap[item];
        return item;
      })
      .filter(Boolean);

    this.controller = new Controller(this, this.el);

    this.menu = addDispose(
      this,
      new Menu(
        this.el,
        this,
        this.options.menus
          ?.map((item) => {
            if (isString(item)) return this.menuNamedMap[item];
            return item;
          })
          ?.filter(Boolean) || [],
      ),
    );

    // To prevent click and double-click events of video elements from conflicting.
    this.toggleDelayFlag = false;
    this.toggleDelayTimer = null;
    this.videoClickToggle();

    this.emit(EVENT.AFTER_INIT);
  }

  mount(container?: IPlayerOptions['container']): void {
    if (container) this.container = getEle(container) || this.container;
    if (!this.container) return;
    this.container.appendChild(this.el);
    defaultSetting(this);
    this.emit(EVENT.MOUNTED);
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

  get loaded(): boolean {
    return this.video.readyState >= 3;
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

  get ended(): boolean {
    return this.video.ended;
  }

  get playing(): boolean {
    return !this.paused && !this.ended;
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

  get loop(): boolean {
    return this.video.loop;
  }

  set loop(v: boolean) {
    this.video.loop = v;
  }

  get playbackRate(): number {
    return this.video.playbackRate;
  }

  set playbackRate(n: number) {
    this.video.playbackRate = n;
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

  incVolume(v = this.options.shortcutOptions.volumeStep): void {
    this.volume += v!;
  }

  decVolume(v = this.options.shortcutOptions.volumeStep): void {
    this.volume -= v!;
  }

  forward(v = this.options.shortcutOptions.seekStep): void {
    this.currentTime += v!;
  }

  rewind(v = this.options.shortcutOptions.seekStep): void {
    this.currentTime -= v!;
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
    this.video.addEventListener('click', this.delayToggle);
  }

  cancellVideoClickToggle() {
    this.video.removeEventListener('click', this.delayToggle);
  }

  delayToggle = () => {
    this.toggleDelayTimer = setTimeout(() => {
      if (!this.toggleDelayFlag) {
        this.toggle();
      }
      this.toggleDelayFlag = false;
    }, TIME.CLICK_TOGGLE_DELAY);
  };

  clearToggleDelay = (isClick?: boolean) => {
    this.toggleDelayTimer && clearTimeout(this.toggleDelayTimer);
    this.toggleDelayTimer = null;
    if (isClick) {
      this.toggleDelayFlag = false;
    } else {
      this.toggleDelayFlag = true;
    }
  };

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
    return this.controllerNameMap[id];
  }

  registerSettingItem(item: ISettingItem, id?: string): void {
    this.settingNamedMap[id || item.id] = item;
  }

  getSettingItem(id: string): ISettingItem | undefined {
    return this.settingNamedMap[id];
  }

  registerMenuItem(item: IMenuItem, id?: string): void {
    this.menuNamedMap[id || item.id!] = item;
  }

  getMenuItem(id: string): IMenuItem | undefined {
    return this.menuNamedMap[id];
  }

  updateControllerEles(eles: Parameters<Controller['updateEles']>[0], key: keyof IController): void {
    this.controller.updateEles(eles, key);
  }

  dispose(): void {
    if (!this.el) return;
    this.emit(EVENT.BEFORE_DISPOSE);
    dispose(this);
    this.removeAllListeners();
    removeEle(this.el);
    this.el = null!;
    this.container = null;
    this.clearToggleDelay();
    this.emit(EVENT.AFTER_DISPOSE);
  }
}
