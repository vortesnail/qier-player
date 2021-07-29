import { DomNode } from '@Src/main/utils/domNode';
import { isString } from '@Src/main/utils/is';
import { Player } from '@Src/main/player';
import { createEle } from '@Src/main/utils/dom';
import { IControllerEle } from '..';
import { spacerControllerEle } from './spacer';

export class ControllerEle extends DomNode {
  private controllerEles: IControllerEle[] = [];

  private spacer = spacerControllerEle();

  constructor(private player: Player, container: HTMLElement, ctEles?: (IControllerEle | string)[]) {
    super(container, 'div.controller_ele');
    if (ctEles) {
      const frag = document.createDocumentFragment();
      ctEles.forEach((ele) => {
        ele = this.initControllerEle(ele) as IControllerEle;
        if (ele) {
          frag.appendChild(ele.el);
          this.controllerEles.push(ele);
        }
      });
      this.el.appendChild(frag);
    }
  }

  private getControllerEle(ele: IControllerEle | string): IControllerEle | void {
    if (ele === 'spacer') return this.spacer;
    if (isString(ele)) ele = this.player.getControllerEle(ele) as IControllerEle;
    // if (!item || (item.isSupport && !item.isSupport(this.player))) return;
    return ele;
  }

  // eslint-disable-next-line consistent-return
  private initControllerEle = (ele: IControllerEle | string): IControllerEle | void => {
    ele = this.getControllerEle(ele) as IControllerEle;

    if (ele) {
      if (!ele.el) ele.el = createEle();

      if (ele.init) {
        ele.init(this.player);
      }

      return ele as IControllerEle;
    }
  };
}
