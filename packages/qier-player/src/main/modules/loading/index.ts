import { CLASS_PREFIX, EVENT } from '@Src/main/constants';
import { Player } from '@Src/main/player';
import { addDispose } from '@Src/main/utils/dispose';
import { addChildren, addClass, hide, show } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { repeatStr } from '@Src/main/utils/freUse';

export class Loading extends DomNode {
  private showTimer!: NodeJS.Timeout | null;

  private startWaitingTime = 0;

  constructor(container: HTMLElement, private player: Player) {
    super(container, '.loading');
    this.hide();
    if (player.options.loadingOptions.spinner) {
      addChildren(this.el, [player.options.loadingOptions.spinner]);
    } else {
      addChildren(this.el, this.getSpinner());
    }

    addDispose(this, player.on(EVENT.CANPLAY, this.hide));
    addDispose(
      this,
      player.on(EVENT.WAITING, () => {
        if (!this.player.currentTime) return;
        this.tryShow();
      }),
    );
    addDispose(
      this,
      player.on(EVENT.STALLED, () => {
        const curTime = this.player.currentTime;
        if (!curTime) return;

        let shouldShow = true;
        this.player.eachBuffer((start, end) => {
          if (start <= curTime && end > curTime) {
            shouldShow = false;
            return true;
          }
        });

        if (shouldShow) this.tryShow();
      }),
    );
  }

  private getSpinner(): string | Array<Node> | undefined {
    const { type } = this.player.options.loadingOptions;
    if (type === 'wave') {
      addClass(this.el, 'loading_wave');
      return repeatStr('<div></div>', 5);
    }
    if (type === 'circle') {
      addClass(this.el, 'loading_circle');
      return `<div>
            <div class="${CLASS_PREFIX}_loading_circle_container">
              <div class="${CLASS_PREFIX}_loading_circle_rotator">
                <div class="${CLASS_PREFIX}_loading_circle_left">
                  <div class="${CLASS_PREFIX}_loading_circle_circle"></div>
                </div>
                <div class="${CLASS_PREFIX}_loading_circle_right">
                  <div class="${CLASS_PREFIX}_loading_circle_circle"></div>
                </div>
              </div>
            </div>
          </div>`;
    }
  }

  get isActive(): boolean {
    return this.el.style.display !== 'none';
  }

  private _checkCanplay = (): void => {
    if (this.startWaitingTime !== this.player.currentTime) {
      this.hide();
      this.clearTimeout();
      this.player.off(EVENT.TIME_UPDATE, this._checkCanplay);
    }
  };

  private checkCanplay(): void {
    this.startWaitingTime = this.player.currentTime;
    this.player.off(EVENT.TIME_UPDATE, this._checkCanplay);
    this.player.on(EVENT.TIME_UPDATE, this._checkCanplay);
  }

  private tryShow(): void {
    this.checkCanplay();
    this.clearTimeout();
    this.showTimer = setTimeout(this.show, 300);
  }

  private clearTimeout = (): void => {
    this.showTimer && clearTimeout(this.showTimer);
    this.showTimer = null;
  };

  show = (): void => {
    show(this.el);
    this.player.emit(EVENT.LOADING_SHOW);
  };

  hide = () => {
    hide(this.el);
    this.player.emit(EVENT.LOADING_HIDE);
  };
}
