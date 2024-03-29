import { Tooltip } from '@Src/main/components/tooltip';
import { EVENT } from '@Src/main/constants';
import { I18n, EXIT_FULL_SCREEN, FULL_SCREEN } from '@Src/main/features/i18n';
import { Icon } from '@Src/main/features/icons';
import { Player } from '@Src/main/player';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { hide, show } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { IControllerEle } from '..';

class Fullscreen extends DomNode implements IControllerEle {
  readonly id = 'fullscreen';

  private player!: Player;

  private exitIcon!: HTMLElement;

  private enterIcon!: HTMLElement;

  tooltip!: Tooltip;

  mounted!: false;

  init(player: Player, tooltip: Tooltip) {
    this.player = player;
    this.tooltip = tooltip;
    this.enterIcon = this.el.appendChild(Icon.enterFullscreen());
    this.exitIcon = this.el.appendChild(Icon.exitFullscreen());
    if (player.fullscreen.isActive) {
      this.enter();
    } else {
      this.exit();
    }
    addDispose(this, player.on(EVENT.ENTER_FULLSCREEN, this.enter));
    addDispose(this, player.on(EVENT.EXIT_FULLSCREEN, this.exit));
    addDisposeListener(this, this.el, 'click', () => player.fullscreen.toggle(true));
  }

  private enter = (): void => {
    show(this.exitIcon);
    hide(this.enterIcon);
    this.tooltip.html = I18n.trans(EXIT_FULL_SCREEN);

    if (this.mounted) {
      this.player.updateControllerEles(
        this.player.options.controller.eles.filter((ele) => ele !== 'web-fullscreen'),
        'eles',
      );
    }
  };

  private exit = (): void => {
    hide(this.exitIcon);
    show(this.enterIcon);
    this.tooltip.html = I18n.trans(FULL_SCREEN);

    if (this.mounted) {
      this.player.updateControllerEles(this.player.options.controller.eles, 'eles');
    }
  };
}

export const fullscreenControllerEle = () => new Fullscreen();
