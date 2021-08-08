import { Popover } from '@Src/main/components/popover';
import { Switch } from '@Src/main/components/switch';
import { EVENT, TIME } from '@Src/main/constants';
import { Icon } from '@Src/main/features/icons';
import { Player } from '@Src/main/player';
import { addDispose, addDisposeListener } from '@Src/main/utils/dispose';
import { addClass, createEle, getElementSize, removeClass } from '@Src/main/utils/dom';
import { DomNode } from '@Src/main/utils/domNode';
import { IControllerEle } from '..';

export interface ISettingItemOption<T = any> {
  html?: string;
  selectedText?: string;
  value?: T;
}

export interface ISettingItem<T = any> {
  id?: any;
  html?: string;
  type?: 'switch' | 'select';
  checked?: boolean;
  options?: ISettingItemOption<T>[];
  value?: T;
  init?: (player: Player, item: ISettingItem) => void;
  change?: (value: T, player: Player, item: ISettingItem) => void;
  _switch?: Switch;
  _selectedEl?: HTMLElement;
  _optionEls?: HTMLElement[];
  _optionEl?: HTMLElement;
  [key: string]: any;
}

const classActive = 'controller_settings_active';
const classOptionActive = 'controller_settings_option_active';

class Settings extends DomNode implements IControllerEle {
  readonly id = 'settings';

  private player!: Player;

  private popoverTimer!: NodeJS.Timeout;

  private items!: ISettingItem[];

  private popover!: Popover;

  private stuffing!: HTMLElement;

  private homeEl!: HTMLElement;

  private currentOptionEl!: HTMLElement;

  init(player: Player) {
    this.player = player;
    addClass(this.el, 'controller_settings');
    this.items = player.settingItems;
    this.el.appendChild(Icon.settings());

    this.stuffing = this.el.appendChild(createEle('div.controller_settings_stuffing'));

    this.popover = new Popover(this.el, { willChange: 'width, height' });
    this.homeEl = this.popover.panelEl.appendChild(createEle('div'));

    addDisposeListener(this, this.el, 'mouseenter', () => {
      this.show();
    });
    addDisposeListener(this, this.el, 'mouseleave', () => {
      this.tryHide();
    });
    addDispose(
      this,
      player.on(EVENT.MOUNTED, () => this.showHomePage()),
    );

    this.items.forEach((item) => item.init && item.init(player, item));
    this.renderHome();
  }

  private renderHome(): void {
    this.items.forEach((item) => {
      const el =
        !item._switch && !item._selectedEl && !item._optionEl ? createEle('div.controller_settings_item') : null;

      if (el) {
        el.appendChild(createEle(undefined, undefined, item.html));
        if (item.type !== 'switch') el.appendChild(createEle('div.spacer'));
      }

      if (item.type === 'switch') {
        if (!item._switch) item._switch = new Switch(el!, item.checked);
      }

      if (item.type === 'select') {
        if (!item.options || !item.options.length) return;
        if (!item._selectedEl) {
          addClass(el!, 'controller_settings_item_select');
          item._selectedEl = el!.appendChild(createEle('div', { 'data-selected': true }));
        }
        const opt = item.options.find((x) => x.value === item.value);
        if (!opt) return;
        item._selectedEl.innerHTML = opt.selectedText || opt.html || '';
      }

      if (item._optionEl) {
        item._optionEl.style.display = 'none';
      }

      if (el) {
        el.addEventListener('click', this.onItemClick(item));
        this.homeEl.appendChild(el);
      }
    });
  }

  private renderOptions(): void {
    this.items.forEach((item) => {
      if (item.type !== 'select') return;

      if (!item._optionEl) {
        item._optionEl = this.popover.panelEl.appendChild(createEle('div'));
        // TODO 兼容移动端时再写这部分逻辑
        // const back = item._optionEl.appendChild(
        //   createEle('div.controller_settings_item.controller_settings_item_back'),
        // );
        // back.innerHTML = item.html || '';
        // back.addEventListener('click', this.back(item));
      }

      if (!item._optionEls && item.options) {
        item._optionEls = item.options.map((opt) => {
          const optEl = item._optionEl!.appendChild(createEle('div.controller_settings_option', undefined, opt.html));
          optEl.addEventListener('click', this.onOptionClick(item, opt));
          return optEl;
        });
      }

      item._optionEls?.forEach((optEl, i) => {
        removeClass(optEl, classOptionActive);
        if (item.value === item.options![i].value) {
          addClass(optEl, classOptionActive);
        }
      });

      item._optionEl.style.display = 'none';
    });
  }

  private onItemClick = (item: ISettingItem) => () => {
    if (item.type === 'switch') {
      item.checked = !item.checked;
      item._switch?.toggle(item.checked);
      if (item.change) item.change(item.checked, this.player, item);
    }

    if (item.type === 'select') {
      this.renderOptions();
      this.showOptionPage(item._optionEl as HTMLElement);
    }
  };

  // private back = (item: ISettingItem) => () => {
  //   this.showHomePage(item._optionEl);
  // };

  private onOptionClick = (item: ISettingItem, option: ISettingItemOption) => () => {
    if (item.value !== option.value) {
      item.value = option.value;
      if (item.change) item.change(option.value, this.player, item);
    }
    // TODO 移动端不隐藏，拥有返回按钮，pc 端点击之后直接隐藏
    this.hide();
    this.renderHome();
    this.showHomePage(item._optionEl as HTMLElement);
  };

  private showHomePage(opt?: HTMLElement): void {
    if (opt) opt.style.display = 'none';

    this.homeEl.style.display = '';

    const { width, height } = getElementSize(this.homeEl);

    this.popover.injectPanelStyle({
      width: `${width}px`,
      height: `${height + 10}px`, // 10 for padding
    });
  }

  private showOptionPage(opt: HTMLElement): void {
    this.homeEl.style.display = 'none';
    opt.style.display = '';

    const { width, height } = getElementSize(opt);

    this.popover.injectPanelStyle({
      width: `${width}px`,
      height: `${height + 10}px`,
    });

    this.currentOptionEl = opt;
  }

  show = () => {
    this.renderHome();
    this.stuffing.style.display = 'block';
    this.popover.show();
    this.homeEl.style.display = 'block';
    addClass(this.el, classActive);
    this.popoverTimer && clearTimeout(this.popoverTimer);
  };

  tryHide(): void {
    this.popoverTimer && clearTimeout(this.popoverTimer);
    this.popoverTimer = setTimeout(() => {
      this.hide();
    }, TIME.POPOVER_HIDE);
  }

  hide = () => {
    this.stuffing.style.display = 'none';
    this.popover.hide();
    this.homeEl.style.display = 'none';
    removeClass(this.el, classActive);

    if (this.currentOptionEl) {
      setTimeout(() => this.showHomePage(this.currentOptionEl), 200);
    }
  };
}

export const settingControllerEle = () => new Settings();
