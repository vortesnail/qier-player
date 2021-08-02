import { Player } from '@Src/main/player';
import { DomNode } from '@Src/main/utils/domNode';
import { createEle, removeClass, addClass } from '@Src/main/utils/dom';
import { Tooltip } from '@Src/main/components/tooltip';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { EVENT } from '@Src/main/constants';
import { ControllerEle } from './eles';

export interface IControllerEle {
  el: HTMLElement;
  id?: any;
  tip?: string;
  mounted?: boolean;
  init?: (player: Player, tooltip: Tooltip) => void;
  [key: string]: any;
}

const classHide = 'controller_hide';
const classGradientBottomHide = 'controller_gradient_bottom_hide';
const classControllEleHide = 'controller_ele_hide';

export class Controller extends DomNode {
  private readonly gradientBottom: HTMLElement;

  private showTimer!: NodeJS.Timeout;

  private delayHideTime = 3000;

  private controllerEles: ControllerEle[] = [];

  constructor(private player: Player, container: HTMLElement) {
    super(container, 'div.controller');
    this.gradientBottom = container.appendChild(createEle('div.controller_gradient_bottom'));

    this.controllerEles[0] = addDispose(this, new ControllerEle(player, this.el, player.options.controller.eles));

    addDispose(
      this,
      player.on(EVENT.PAUSE, () => {
        this.show();
      }),
    );
    addDispose(
      this,
      player.on(EVENT.PLAY, () => {
        this.showThenFade();
      }),
    );

    addDisposeListener(this, player.el, 'mousemove', this.showThenFade);
    // The reason for not using `hide` is that we don't want to hide the controller when we pause.
    addDisposeListener(this, player.el, 'mouseleave', this.tryHide);
    // Here fo prevents the controller from being hidden because of the `autoplay` setting.
    this.showThenFade();
  }

  show = (): void => {
    removeClass(this.el, classHide);
    removeClass(this.gradientBottom, classGradientBottomHide);
    // removeClass(this.controllerEles[0].el, classControllEleHide);
    this.player.el.style.cursor = '';
    this.player.emit(EVENT.CONTROLLER_SHOW);
  };

  hide = (): void => {
    addClass(this.el, classHide);
    addClass(this.gradientBottom, classGradientBottomHide);
    // addClass(this.controllerEles[0].el, classControllEleHide);
    this.player.el.style.cursor = 'none';
    this.player.emit(EVENT.CONTROLLER_HIDE);
  };

  showThenFade = (): void => {
    this.show();
    clearTimeout(this.showTimer);
    this.showTimer = setTimeout(this.tryHide, this.delayHideTime);
  };

  tryHide = (): void => {
    if (this.player.video.played.length && !this.player.paused) {
      this.hide();
    }
  };
}
