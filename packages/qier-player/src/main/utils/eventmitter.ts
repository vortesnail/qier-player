import { Dispose } from './dispose';

export class EventEmitter {
  private _events: Record<string, Array<Function>>;

  constructor() {
    this._events = Object.create(null);
  }

  emit(evt: string, ...args: any[]): boolean {
    if (!this._events[evt]) return false;

    const fns = [...this._events[evt]];
    fns.forEach((fn) => {
      fn.apply(this, args);
    });

    return true;
  }

  on(evt: string, fn?: Function): Dispose {
    if (typeof fn !== 'function') {
      throw new TypeError('The event-triggered callback must be a function.');
    }

    if (!this._events[evt]) {
      this._events[evt] = [fn];
    } else {
      this._events[evt].push(fn);
    }

    return { dispose: this.off.bind(this, evt, fn) };
  }

  once(evt: string, fn?: Function): Dispose {
    const execFn = () => {
      fn?.apply(this);
      this.off(evt, execFn);
    };

    return this.on(evt, execFn);
  }

  off(evt: string, fn?: Function): this {
    if (!this._events[evt]) return this;
    if (!fn) {
      this._events[evt] && (this._events[evt].length = 0);
      return this;
    }

    let cb;
    const cbLen = this._events[evt].length;
    for (let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i];
      if (cb === fn) {
        this._events[evt].splice(i, 1);
        break;
      }
    }

    return this;
  }

  removeAllListeners(evt: string): this {
    if (evt) {
      this._events[evt] && (this._events[evt].length = 0);
    } else {
      this._events = Object.create(null);
    }

    return this;
  }
}
