import { DomNode } from '@Src/main/utils/domNode';
import { isString } from '@Src/main/utils/is';
import { Player } from '@Src/main/player';
import { createEle } from '@Src/main/utils/dom';
import { Tooltip } from '@Src/main/components/tooltip';
import { patch } from '@Src/main/utils/patch';
import { EVENT } from '@Src/main/constants';
import { addDispose, Dispose } from '@Src/main/utils/dispose';
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
      if (!ele.el) ele.el = createEle('div');

      if (ele.mounted) {
        if (ele.tooltip) {
          ele.tooltip.resetPos();
        }
        return;
      }

      let tooltip: Tooltip | undefined;
      if (ele.tip) tooltip = new Tooltip(ele.el, ele.tip);
      if (ele.init) {
        // Do not use Tooltip when there is no tooltip parameter
        if (ele.init.length >= 2 && !tooltip) tooltip = new Tooltip(ele.el);
        ele.init(this.player, tooltip as Tooltip);
      }
      if (ele.dispose) addDispose(this, ele as Dispose);

      ele.mounted = true;
      return ele;
    }
  };

  private onHideControllerEle = (ele: IControllerEle) => {
    if (ele.hide) ele.hide();
  };

  updateTooltipPos() {
    const last = this.controllerEles.length - 1;
    this.controllerEles.forEach((ele, i) => {
      if (ele.tooltip) {
        ele.tooltip.resetPos();
        if (i === 0) {
          ele.tooltip.setLeft();
        } else if (i === last) {
          ele.tooltip.setRight();
        }
      }
    });
  }

  update(nextEles: (string | IControllerEle)[]) {
    if (!nextEles) return;

    const eles: IControllerEle[] = [];
    let shouldUpdate = false;
    nextEles.forEach((ele, i) => {
      ele = this.getControllerEle(ele) as IControllerEle;
      if (!this.controllerEles[i] || this.controllerEles[i].id !== ele.id) {
        shouldUpdate = true;
      }
      if (ele) eles.push(ele);
    });

    if (shouldUpdate) {
      // Dom diff
      patch(this.controllerEles, eles, this.el, {
        mount: this.initControllerEle,
        unmount: this.onHideControllerEle,
      });
      this.controllerEles = eles;
      this.updateTooltipPos();
      this.player.emit(EVENT.CONTROLLER_ELES_UPDATE);
    }
  }
}
