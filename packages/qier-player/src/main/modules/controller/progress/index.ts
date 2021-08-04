import { EVENT } from '@Src/main/constants';
import { Player } from '@Src/main/player';
import { addDispose } from '@Src/main/utils/dispose';
import { addClass, createEle } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { Drag } from '@Src/main/utils/drag';
import { adsorb } from '@Src/main/utils/freUse';
import { Rect } from '@Src/main/utils/rect';
import { IControllerEle } from '..';

class Progress extends DomNode implements IControllerEle {
  readonly id = 'progress';

  private player!: Player;

  private bars!: HTMLElement;

  private buffBar!: HTMLElement;

  private playedBar!: HTMLElement;

  private dot!: HTMLElement;

  private rect!: Rect;

  private dragging = false;

  init(player: Player) {
    this.player = player;
    addClass(this.el, 'progress');

    this.bars = this.el.appendChild(createEle('div.progress_bars'));
    this.buffBar = this.bars.appendChild(createEle('div.progress_buff'));
    this.playedBar = this.bars.appendChild(createEle('div.progress_played'));
    this.dot = this.el.appendChild(createEle('div.progress_dot'));
    this.dot.appendChild(player.options.progressOptions?.dot || createEle('div.progress_dot_inner'));

    this.rect = addDispose(this, new Rect(this.bars, player));

    addDispose(this, new Drag(this.el, this.onDragStart, this.onDragging, this.onDragEnd));
    addDispose(this, player.on(EVENT.TIME_UPDATE, this.updatePlayedBar));
    addDispose(this, player.on(EVENT.PROGRESS, this.updateBufBar));
  }

  private setPlayedBarLength(percentage: number): void {
    this.playedBar.style.transform = `scaleX(${adsorb(percentage)})`;
    this.dot.style.left = `${adsorb(percentage * this.rect.width, 0, this.rect.width || 0)}px`;
  }

  private setBuffBarLength(percentage: number): void {
    this.buffBar.style.transform = `scaleX(${adsorb(percentage)})`;
  }

  private onDragStart = (ev: PointerEvent) => {
    this.dragging = true;
    this.rect.update();
    this.onDragging(ev);
  };

  private onDragging = (ev: PointerEvent) => {
    const x = ev.pageX - this.rect.x;
    this.setPlayedBarLength(x / this.rect.width);
    // this.updateThumbnail(ev.pageX);
  };

  private onDragEnd = (ev: PointerEvent) => {
    this.dragging = false;
    this.player.seek(this.getCurrentTime(ev.pageX));
  };

  private updatePlayedBar = (): void => {
    if (this.dragging) return;
    this.setPlayedBarLength(this.player.currentTime / this.player.duration);
  };

  private updateBufBar = (): void => {
    const buffLen = this.player.buffered.length;

    if (!buffLen) return this.setBuffBarLength(0);

    const curTime = this.player.currentTime;
    let percentage = 0;

    this.player.eachBuffer((start, end) => {
      if (start <= curTime && end >= curTime) {
        percentage = end / this.player.duration;
        return true;
      }
    });

    this.setBuffBarLength(percentage);
  };

  private getCurrentTime(x: number): number {
    return adsorb((x - this.rect.x) / this.rect.width) * this.player.duration;
  }
}

export const progressControllerEle = () => new Progress();
