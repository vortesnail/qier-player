import { Dispose } from '@Src/main/utils/dispose';
import { removeAllChildNode } from '@Src/main/utils/dom';
import { isHTMLElement, isString } from '@Src/main/utils/is';
import { ToastItem } from './toast-item';

export type Position = 'center' | 'left_top' | 'right_top' | 'left_bottom' | 'right_bottom';

export class Toast implements Dispose {
  private toasts: ToastItem[] = [];

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  show(html: string | HTMLElement, position?: Position, timeout = 3000): ToastItem {
    let toastItem = this.toasts.find((t) => t.position === position);
    if (toastItem) {
      clearTimeout(toastItem.timer);
      if (isHTMLElement(html)) {
        removeAllChildNode(toastItem.el);
        toastItem.el.appendChild(html);
      }
      if (isString(html)) toastItem.el.innerHTML = html;
    } else {
      toastItem = new ToastItem(this.container, html, position);
      this.toasts.push(toastItem);
    }

    if (timeout > 0) {
      toastItem.timer = setTimeout(this.close.bind(this, toastItem), timeout);
    }

    return toastItem;
  }

  close(toastItem?: ToastItem): void {
    if (toastItem) {
      this.toasts = this.toasts.filter((x) => x !== toastItem);
      return toastItem.dispose();
    }

    this.toasts.forEach((item) => item.dispose());
    this.toasts.length = 0;
  }

  dispose(): void {
    if (!this.toasts) return;
    this.close();
    this.toasts = null!;
    this.container = null!;
  }
}
