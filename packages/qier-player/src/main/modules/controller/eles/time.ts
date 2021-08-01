import { EVENT } from '@Src/main/constants';
import { Player } from '@Src/main/player';
import { addDispose } from '@Src/main/utils/dispose';
import { addClass, createEle } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { formatTime } from '@Src/main/utils/freUse';
import { IControllerEle } from '..';

export class Time extends DomNode implements IControllerEle {
  readonly id = 'time';

  private playedText!: HTMLSpanElement;

  private slashText!: HTMLSpanElement;

  private totalText!: HTMLSpanElement;

  init(player: Player) {
    addClass(this.el, 'controller_time');

    this.playedText = this.el.appendChild(createEle('span'));
    this.slashText = this.el.appendChild(createEle('span'));
    this.totalText = this.el.appendChild(createEle('span'));

    this.played = player.currentTime;
    this.total = player.duration;

    addDispose(
      this,
      player.on(EVENT.TIME_UPDATE, () => {
        this.played = player.currentTime;
      }),
    );
    this.slash = ' / ';
    addDispose(
      this,
      player.on(EVENT.DURATION_CHANGE, () => {
        this.total = player.duration;
      }),
    );
  }

  private set played(n: number) {
    this.playedText.textContent = formatTime(n);
  }

  private set slash(s: string) {
    this.slashText.textContent = s;
  }

  private set total(n: number) {
    this.totalText.textContent = formatTime(n);
  }
}

export const timeControllerEle = () => new Time();
