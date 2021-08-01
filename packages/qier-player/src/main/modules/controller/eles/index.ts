import { DomNode } from '@Src/main/utils/domNode';
import { isString } from '@Src/main/utils/is';
import { Player } from '@Src/main/player';
import { createEle } from '@Src/main/utils/dom';
import { Tooltip } from '@Src/main/components/tooltip';
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
      this.updateTooltipPos();
      this.el.appendChild(frag);
    }
  }

  private getControllerEle(ele: IControllerEle | string): IControllerEle | void {
    if (ele === 'spacer') return this.spacer;
    if (isString(ele)) ele = this.player.getControllerEle(ele) as IControllerEle;
    // if (!item || (item.isSupport && !item.isSupport(this.player))) return;
    return ele;
  }

  private initControllerEle = (ele: IControllerEle | string): IControllerEle | void => {
    ele = this.getControllerEle(ele) as IControllerEle;

    if (ele) {
      if (!ele.el) ele.el = createEle();

      let tooltip: Tooltip | undefined;
      if (ele.tip) tooltip = new Tooltip(ele.el, ele.tip);
      if (ele.init) {
        if (!tooltip) tooltip = new Tooltip(ele.el);
        ele.init(this.player, tooltip);
      }

      ele.mounted = true;
      return ele;
    }
  };

  updateTooltipPos() {
    const last = this.controllerEles.length - 1;
    this.controllerEles.forEach((item, i) => {
      if (item.tooltip) {
        item.tooltip.resetPos();
        if (i === 0) {
          item.tooltip.setLeft();
        } else if (i === last) {
          item.tooltip.setRight();
        }
      }
    });
  }
}
