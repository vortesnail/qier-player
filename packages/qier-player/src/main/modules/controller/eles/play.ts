import { DomNode } from '@Src/main/utils/domNode';
import { Player } from '@Src/main/player';
import { show, hide } from '@Src/main/utils/dom';
import { Icon } from '@Src/main/features/icons';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { EVENT } from '@Src/main/constants';
import { Tooltip } from '@Src/main/components/tooltip';
import { I18n, PLAY, PAUSE } from '@Src/main/features/i18n';
import { IControllerEle } from '..';

class Play extends DomNode implements IControllerEle {
  readonly id = 'play';

  private playIcon!: HTMLElement;

  private pauseIcon!: HTMLElement;

  tooltip!: Tooltip;

  init(player: Player, tooltip: Tooltip) {
    this.tooltip = tooltip;
    this.playIcon = this.el.appendChild(Icon.play());
    this.pauseIcon = this.el.appendChild(Icon.pause());

    if (player.paused) {
      this.onPause();
    } else {
      this.onPlay();
    }

    addDispose(this, player.on(EVENT.PLAY, this.onPlay));
    addDispose(this, player.on(EVENT.PAUSE, this.onPause));
    addDisposeListener(this, this.el, 'click', player.toggle);
  }

  private onPlay = () => {
    show(this.pauseIcon);
    hide(this.playIcon);
    this.tooltip.html = I18n.trans(PAUSE);
  };

  private onPause = () => {
    show(this.playIcon);
    hide(this.pauseIcon);
    this.tooltip.html = I18n.trans(PLAY);
  };
}

export const playControllerEle = () => new Play();
