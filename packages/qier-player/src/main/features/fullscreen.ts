import { Player } from '../player';
import { addDisposeListener, dispose, Dispose } from '../utils/dispose';
import { isFunction } from '../utils/is';
import { isIOS } from '../utils/env';
import { addClass, removeClass } from '../utils/dom';
import { EVENT } from '../constants';

const classFull = 'fullscreen';

export class Fullscreen implements Dispose {
  private player: Player;

  private target!: HTMLElement;

  private readonly prefix = this.getPrefix();

  constructor(player: Player) {
    this.player = player;
    addDisposeListener(
      this,
      document,
      this.prefix === 'ms' ? 'MSFullscreenChange' : (`${this.prefix}fullscreenchange` as any),
      () => {
        let evt = '';
        if (this.isActive) {
          this.addClass();
          evt = EVENT.ENTER_FULLSCREEN;
        } else {
          this.removeClass();
          evt = EVENT.EXIT_FULLSCREEN;
        }
        this.player.emit(evt);
        this.player.emit(EVENT.UPDATE_SIZE);
      },
    );

    this.setTarget();
    if (this.isActive) this.addClass();

    // TODO 移动端适配
    this.enableDblclick();
  }

  private getPrefix(): string {
    if (isFunction(document.exitFullscreen)) return '';

    let prefix = '';
    ['webkit', 'moz', 'ms'].forEach((p) => {
      if (
        isFunction((document as any)[`${p}ExitFullscreen`]) ||
        isFunction((document as any)[`${p}CancelFullScreen`])
      ) {
        prefix = p;
      }
    });

    return prefix;
  }

  get requestFullscreen(): Element['requestFullscreen'] {
    return (
      HTMLElement.prototype.requestFullscreen ||
      (HTMLElement.prototype as any).webkitRequestFullscreen ||
      (HTMLElement.prototype as any).mozRequestFullScreen ||
      (HTMLElement.prototype as any).msRequestFullscreen
    );
  }

  get exitFullscreen(): Document['exitFullscreen'] {
    return (
      HTMLDocument.prototype.exitFullscreen ||
      (HTMLDocument.prototype as any).webkitExitFullscreen ||
      (HTMLDocument.prototype as any).cancelFullScreen ||
      (HTMLDocument.prototype as any).mozCancelFullScreen ||
      (HTMLDocument.prototype as any).msExitFullscreen
    );
  }

  get fullscreenElement(): HTMLElement {
    return (
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement ||
      (document as any).webkitFullscreenElement
    );
  }

  get isActive(): boolean {
    return this.fullscreenElement === this.target;
  }

  private addClass(): void {
    addClass(this.player.el, classFull);
  }

  private removeClass(): void {
    removeClass(this.player.el, classFull);
  }

  enableDblclick(): void {
    this.player.video.addEventListener('dblclick', () => this.toggle());
  }

  disableDblclick(): void {
    this.player.video.removeEventListener('dblclick', () => this.toggle());
  }

  setTarget(dom?: HTMLElement, video?: HTMLVideoElement): void {
    this.target = (dom && isIOS ? video : dom) || (isIOS ? this.player.video : this.player.el);
    if (this.isActive) this.enter();
  }

  enter(): void {
    if (isIOS) {
      (this.target as any).webkitEnterFullscreen();
    } else {
      this.requestFullscreen.call(this.target, { navigationUI: 'hide' });
      this.player.emit(EVENT.UPDATE_SIZE);
    }
  }

  exit(): boolean {
    if (!this.isActive) return false;
    if (isIOS) {
      (this.target as any).webkitExitFullscreen();
    } else {
      this.exitFullscreen.call(document);
      this.player.emit(EVENT.UPDATE_SIZE);
    }
    return true;
  }

  toggle = (isClick?: boolean): void => {
    this.player.clearToggleDelay(isClick);

    if (this.isActive) {
      this.exit();
    } else {
      this.enter();
    }
  };

  dispose(): void {
    if (!this.player) return;
    this.player.off(EVENT.ENTER_FULLSCREEN);
    this.player.off(EVENT.EXIT_FULLSCREEN);
    this.disableDblclick();
    this.player = null!;
    dispose(this);
  }
}
