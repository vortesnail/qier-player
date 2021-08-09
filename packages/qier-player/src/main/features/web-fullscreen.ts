import { EVENT } from '../constants';
import { Player } from '../player';
import { Dispose } from '../utils/dispose';
import { addClass, containClass, removeClass } from '../utils/dom';

const classFull = 'web_fullscreen';

export class WebFullscreen implements Dispose {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  get isActive(): boolean {
    return containClass(this.player.el, classFull);
  }

  enter(): void {
    addClass(this.player.el, classFull);
    this.player.emit(EVENT.WEB_ENTER_FULLSCREEN);
    this.player.emit(EVENT.UPDATE_SIZE);
  }

  exit(): boolean {
    if (!this.isActive) return false;
    removeClass(this.player.el, classFull);
    this.player.emit(EVENT.WEB_EXIT_FULLSCREEN);
    this.player.emit(EVENT.UPDATE_SIZE);
    return true;
  }

  toggle = (): void => {
    if (this.isActive) {
      this.exit();
    } else {
      this.enter();
    }
  };

  dispose(): void {
    if (!this.player) return;
    this.player.off(EVENT.WEB_ENTER_FULLSCREEN);
    this.player.off(EVENT.WEB_EXIT_FULLSCREEN);
    this.player = null!;
  }
}
