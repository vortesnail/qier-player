---
title: Shortcuts
order: 4
---

# Shortcuts

Qier Player has built-in commonly used shortcut keys, but they can only take effect when the page access is focused on the player.

The shortcut can be configured through the `shortcutOptions` parameter.

```typescript
interface IShortcut {
  disabled?: boolean;
  seekStep?: number;
  volumeStep?: number;
  showToast?: boolean;
  toastDelay?: number;
}
```

For example, the function of disabling shortcut keys can be configured like this.

```js
import Player from 'qier-player';

const player = new Player({
  src: 'Your video address',
  shortcutOptions: {
    disabled: true,
  },
});
```

There are 6 built-in shortcut keys by default.

| Shortcut | Description      |
| -------- | ---------------- |
| Left     | Rewind           |
| Right    | Forward          |
| Up       | Increase volume  |
| Down     | lower the volume |
| Esc      | Exit Fullscreen  |
| Spacebar | Play or pause    |

The volume and progress increment can be controlled by the `seekStep` and `volumeStep` parameters, their default values ​​are `5` and `0.1`.

```js
import Player from 'qier-player';

const player = new Player({
  src: 'Your video address',
  shortcutOptions: {
    seekStep: 10,
    volumeStep: 0.2,
  },
});
```

`showToast` determines whether to display the prompt box when fast forward/rewind or volume increase and decrease, and `toastDelay` determines the existence time of the prompt box. The default is `500` milliseconds.
