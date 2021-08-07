import { EVENT, TIME } from '@Src/main/constants';
import { Icon } from '@Src/main/features/icons';
import { Player } from '@Src/main/player';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { addClass, createEle, hide, show, getEventPath } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { Drag } from '@Src/main/utils/drag';
import { adsorb } from '@Src/main/utils/freUse';
import { Rect } from '@Src/main/utils/rect';
import { IControllerEle } from '..';

class Volume extends DomNode implements IControllerEle {
  readonly id = 'volume';

  private volumeIcon!: HTMLElement;

  private mutedIcon!: HTMLElement;

  private stuffing!: HTMLElement;

  private bars!: HTMLElement;

  private barWrapper!: HTMLElement;

  private percent!: HTMLElement;

  private percentage!: HTMLElement;

  private dot!: HTMLElement;

  private player!: Player;

  private rect!: Rect;

  private barsTimer!: NodeJS.Timeout;

  init(player: Player) {
    this.player = player;

    addClass(this.el, 'controller_volume');
    this.volumeIcon = this.el.appendChild(Icon.volume());
    this.mutedIcon = this.el.appendChild(Icon.muted());

    this.stuffing = this.el.appendChild(createEle('div.controller_volume_stuffing'));

    this.bars = this.el.appendChild(createEle('div.controller_volume_bars'));
    this.percent = this.bars.appendChild(createEle('span.controller_volume_percent'));

    this.barWrapper = this.bars.appendChild(createEle('div.controller_volume_bar_wrapper'));
    const volumeBar = this.barWrapper.appendChild(createEle('div.controller_volume_bar'));
    volumeBar.appendChild(createEle('div.controller_volume_bar_bg'));
    this.percentage = volumeBar.appendChild(createEle('div.controller_volume_bar_percentage'));
    this.dot = volumeBar.appendChild(createEle('div.controller_volume_bar_dot'));
    this.dot.appendChild(createEle('div.controller_volume_bar_dot_inner'));

    this.rect = new Rect(this.barWrapper, player);

    addDispose(this, player.on(EVENT.VOLUME_CHANGE, this.onVolumeChange));
    addDispose(this, new Drag(this.barWrapper, this.onDragStart, this.onDragging));
    addDisposeListener(this, this.el, 'click', (ev: MouseEvent) => {
      const evPaths = getEventPath(ev);
      if (evPaths.includes(this.bars) || evPaths.includes(this.stuffing)) return;
      player.toggleVolume();
    });
    addDisposeListener(this, this.el, 'mouseenter', (ev: MouseEvent) => {
      this.showBars();
    });
    addDisposeListener(this, this.el, 'mouseleave', (ev: MouseEvent) => {
      this.tryHideBars();
    });

    this.onVolumeChange();
  }

  private onDragStart = (ev: PointerEvent) => {
    this.rect.update();
    this.onDragging(ev);
  };

  private onDragging = (ev: PointerEvent) => {
    const y = this.rect.height - (ev.pageY - this.rect.y);
    const v = adsorb(y / this.rect.height);
    this.player.volume = v;
  };

  private onVolumeChange = () => {
    if (this.player.muted) {
      this.mute();
    } else {
      this.unmute();
    }
    this.percent.innerHTML = Math.floor(this.player.volume * 100).toString();
    this.percentage.style.transform = `scaleY(${this.player.volume})`;
    this.dot.style.bottom = `${adsorb(this.player.volume * this.rect.height, 0, this.rect.height || 0)}px`;
  };

  mute(): void {
    show(this.mutedIcon);
    hide(this.volumeIcon);
  }

  unmute(): void {
    show(this.volumeIcon);
    hide(this.mutedIcon);
  }

  showBars(): void {
    this.stuffing.style.display = 'block';
    this.bars.style.display = 'block';
    this.onVolumeChange();
    this.barsTimer && clearTimeout(this.barsTimer);
  }

  tryHideBars(): void {
    clearTimeout(this.barsTimer);
    this.barsTimer = setTimeout(() => {
      this.hideBars();
    }, TIME.POPOVER_HIDE);
  }

  hideBars(): void {
    this.stuffing.style.display = 'none';
    this.bars.style.display = 'none';
  }
}

export const volumeControllerEle = () => new Volume();
