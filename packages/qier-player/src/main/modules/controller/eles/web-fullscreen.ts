import { Tooltip } from '@Src/main/components/tooltip';
import { EVENT } from '@Src/main/constants';
import { I18n, WEB_FULL_SCREEN, WEB_EXIT_FULL_SCREEN } from '@Src/main/features/i18n';
import { Icon } from '@Src/main/features/icons';
import { Player } from '@Src/main/player';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { hide, show } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { IControllerEle } from '..';

class WebFullscreen extends DomNode implements IControllerEle {
  readonly id = 'web-fullscreen';

  private enterIcon!: HTMLElement;

  private exitIcon!: HTMLElement;

  tooltip!: Tooltip;

  init(player: Player, tooltip: Tooltip) {
    this.tooltip = tooltip;
    this.enterIcon = this.el.appendChild(Icon.webEnterFullscreen());
    this.exitIcon = this.el.appendChild(Icon.webExitFullscreen());
    if (player.webFullscreen.isActive) {
      this.enter();
    } else {
      this.exit();
    }
    addDispose(this, player.on(EVENT.WEB_ENTER_FULLSCREEN, this.enter));
    addDispose(this, player.on(EVENT.WEB_EXIT_FULLSCREEN, this.exit));
    addDisposeListener(this, this.el, 'click', player.webFullscreen.toggle);
  }

  private enter = (): void => {
    show(this.exitIcon);
    hide(this.enterIcon);
    this.tooltip.html = I18n.trans(WEB_EXIT_FULL_SCREEN);
  };

  private exit = (): void => {
    hide(this.exitIcon);
    show(this.enterIcon);
    this.tooltip.html = I18n.trans(WEB_FULL_SCREEN);
  };
}

export const webFullscreenControllerEle = () => new WebFullscreen();
