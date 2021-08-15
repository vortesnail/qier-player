import { EVENT } from '@Src/main/constants';
import { Player } from '@Src/main/player';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { addClass, createEle, hide, show } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';

export class Poster extends DomNode {
  private url?: string;

  constructor(container: HTMLElement, private player: Player) {
    super(container, '.poster');
    const opts = player.options.posterOptions;
    this.url = opts?.url;
    this.hide();

    if (opts?.disabled) return;

    this.show();

    if (this.url) {
      const posterImg = createEle<HTMLImageElement>('img.poster_img');
      posterImg.src = this.url;
      if (opts?.autoFill) {
        addClass(posterImg, 'poster_img_fill');
      }
      this.el.appendChild(posterImg);
    }

    addDisposeListener(this, this.el, 'click', () => {
      if (player.loaded) {
        this.hide();
      } else {
        player.loading.show();
      }
      player.play();
    });

    addDispose(this, player.on(EVENT.CANPLAY, this.tryHide));
    addDispose(this, player.on(EVENT.LOADED_METADATA, this.tryHide));
  }

  get isActive(): boolean {
    return this.el.style.display !== 'none';
  }

  private tryHide = () => {
    this.hide();
  };

  show() {
    show(this.el);
  }

  hide() {
    hide(this.el);
  }
}
