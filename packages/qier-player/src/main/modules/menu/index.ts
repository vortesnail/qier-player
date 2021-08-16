import { Player } from '@Src/main/player';
import { addDisposeListener } from '@Src/main/utils/dispose';
import { addClass, createEle, hide, removeAllChildNode, show } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { Rect } from '@Src/main/utils/rect';

export interface IMenuItem {
  id?: string;
  html?: string;
  hidden?: boolean;
  disabled?: boolean;
  checked?: boolean;
  init?: (player: Player, item: IMenuItem) => void;
  show?: (player: Player, item: IMenuItem) => void;
  click?: (player: Player, item: IMenuItem) => void;
}

export class Menu extends DomNode {
  private rect: Rect;

  private willShowDefault = false;

  constructor(container: HTMLElement, private player: Player, private items: IMenuItem[]) {
    super(container, '.menu');
    this.hide();

    this.rect = new Rect(this.el, player);

    this.items?.forEach((item) => item.init?.(player, item));

    addDisposeListener(this, player.el, 'contextmenu', (ev: MouseEvent) => {
      this.hide();
      if (ev.target !== this.player.video) return;
      if (!this.willShowDefault) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.renderItems()) {
          this.show();
          this.rect.update();
          this.player.rect.update();

          const { width, height } = this.rect;
          const { x, y } = this.player.rect;
          const { innerWidth, innerHeight } = window;
          const { clientX, clientY } = ev;

          let left = clientX - x;
          let top = clientY - y;

          if (clientX + width > innerWidth) left = innerWidth - width;
          if (clientY + height > innerHeight) top = innerHeight - height;

          this.injectStyle({ left: `${left}px`, top: `${top}px` });
        }
      }

      if (player.options.showDefaultMenu) {
        this.willShowDefault = !this.willShowDefault;
      } else {
        this.willShowDefault = false;
      }
    });

    addDisposeListener(this, document, 'click', () => {
      this.hide();
      this.willShowDefault = false;
    });
  }

  private getItemDoms(): HTMLElement[] {
    return this.items
      .filter((item) => item && !item.hidden)
      .map((item) => {
        const el = createEle('div.menu_item');
        item.show?.(this.player, item);
        if (item.html) el.innerHTML = item.html;
        if (item.disabled) addClass(el, 'menu_item_disabled');
        if (item.checked) addClass(el, 'menu_item_checked');
        if (item.click) {
          el.addEventListener('click', () => item.click?.(this.player, item));
        }
        return el;
      });
  }

  private renderItems(): boolean {
    const items = this.getItemDoms();
    if (!items.length) return false;
    removeAllChildNode(this.el);
    const frag = document.createDocumentFragment();
    items.forEach((dom) => frag.appendChild(dom));
    this.el.appendChild(frag);
    return true;
  }

  hide = (): void => {
    hide(this.el);
  };

  show = (): void => {
    show(this.el);
  };

  get isActive(): boolean {
    return this.el.style.display !== 'none';
  }
}
