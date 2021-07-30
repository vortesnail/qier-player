import { Player } from '@Src/main/player';
import { DomNode } from '@Src/main/utils/domNode';
import { createEle } from '@Src/main/utils/dom';
import { ControllerEle } from './eles';

export interface IControllerEle {
  el: HTMLElement;
  id?: any;
  init?: (player: Player) => void;
  [key: string]: any;
}

export class Controller extends DomNode {
  private readonly gradientBottom: HTMLElement;

  private controllerEles: ControllerEle[] = [];

  constructor(player: Player, container: HTMLElement) {
    super(container, 'div.controller');
    this.gradientBottom = container.appendChild(createEle('div.controller_gradient_bottom'));

    this.controllerEles[0] = new ControllerEle(player, this.el, player.options.controller.items);
  }
}