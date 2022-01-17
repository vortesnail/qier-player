import { Player } from '../player';
import { addDisposeListener, dispose, Dispose } from '../utils/dispose';
import { createEle } from '../utils/dom';
import { isNumber, isString } from '../utils/is';
import { FORWARD, I18n, REWIND, SECOND, SECONDS } from './i18n';
import { Icon } from './icons';

export type ShortcutHandler = (player: Player) => void;

const keyboardMap: Record<string | number, number> = {
  Escape: 27,
  Space: 32,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
} as const;

export class Shortcut implements Dispose {
  private map: Record<number, ShortcutHandler>;

  private timeout!: number;

  constructor(private player: Player, disabled?: boolean) {
    this.map = Object.create(null);

    const { seekStep, showToast, toastDelay } = this.player.options.shortcutOptions;
    this.timeout = toastDelay || 500;

    const showVolume: ShortcutHandler = (p) => {
      const icon = createEle<HTMLDivElement>('.toast_icon');
      const volumeIcon = Icon.volume();
      const muteIcon = Icon.muted();
      const span = createEle('span');
      span.innerHTML = `${Math.round(p.volume * 100)}%`;

      if (Math.floor(p.volume * 10) <= 0) {
        icon.appendChild(muteIcon);
      } else {
        icon.appendChild(volumeIcon);
      }

      icon.appendChild(span);
      p.toast.show(icon, 'center', this.timeout);
    };

    this.register(keyboardMap.Escape, (p) => {
      if (!p.fullscreen.exit()) p.webFullscreen.exit();
    });
    this.register(keyboardMap.Space, (p) => p.toggle());
    // left
    this.register(keyboardMap.ArrowLeft, (p) => {
      p.rewind();
      showToast &&
        p.toast.show(
          `${I18n.trans(REWIND)} ${seekStep} ${seekStep! > 1 ? I18n.trans(SECONDS) : I18n.trans(SECOND)}`,
          'center',
          this.timeout,
        );
    });
    // top
    this.register(keyboardMap.ArrowUp, (p) => {
      p.incVolume();
      showToast && showVolume(p);
    });
    // right
    this.register(keyboardMap.ArrowRight, (p) => {
      p.forward();
      showToast &&
        p.toast.show(
          `${I18n.trans(FORWARD)} ${seekStep} ${seekStep! > 1 ? I18n.trans(SECONDS) : I18n.trans(SECOND)}`,
          'center',
          this.timeout,
        );
    });
    // down
    this.register(keyboardMap.ArrowDown, (p) => {
      p.decVolume();
      showToast && showVolume(p);
    });

    if (!disabled) this.enable();
  }

  private onKeyDown = (ev: KeyboardEvent) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) return;

    // TODO 后面如果加入了弹幕到控制栏，需要再做处理。
    // const focused = document.activeElement;
    // if (focused) {
    //   const tag = focused.tagName.toLowerCase();
    //   const editable = focused.getAttribute('contenteditable');
    //   if (editableTagNames.indexOf(tag) > -1 || editable || editable === '') {
    //     return;
    //   }
    // }

    const code = ev.code || ev.keyCode || ev.which;

    if (!isNumber(code) && !isString(code)) return;

    let handled = false;
    const handler = this.map[keyboardMap[code]] || this.map[code as number];
    if (handler) {
      handler(this.player);
      handled = true;
      this.player.controller.showThenFade();
    }

    if (handled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  register(code: number, handler: ShortcutHandler): void {
    this.map[code] = handler;
  }

  unregister(code: number): boolean {
    return delete this.map[code];
  }

  enable(): void {
    this.disable();
    addDisposeListener(this, this.player.el, 'keydown', this.onKeyDown);
  }

  dispose(): void {
    if (!this.map) return;
    dispose(this);
    this.map = null!;
  }

  disable(): void {
    dispose(this);
  }
}
