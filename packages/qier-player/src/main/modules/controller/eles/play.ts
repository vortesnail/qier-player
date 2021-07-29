import { DomNode } from '@Src/main/utils/domNode';
import { Player } from '@Src/main/player';
import { show, hide } from '@Src/main/utils/dom';
import { Icon } from '@Src/main/features/icons';
import { IControllerEle } from '..';

class Play extends DomNode implements IControllerEle {
  readonly id = 'play';

  private playIcon!: HTMLElement;

  private pauseIcon!: HTMLElement;

  init(player: Player) {
    this.playIcon = this.el.appendChild(Icon.play());
    this.pauseIcon = this.el.appendChild(Icon.pause());
    if (player.paused) {
      this.onPause();
    } else {
      this.onPlay();
    }
    this.el.addEventListener('click', player.toggle);
    // addDisposableListener(this, this.el, 'click', player.toggle);
  }

  private onPlay = () => {
    show(this.pauseIcon);
    hide(this.playIcon);
  };

  private onPause = () => {
    show(this.playIcon);
    hide(this.pauseIcon);
  };
}

export const playControllerEle = () => new Play();
