# Shortcut Keys {#shortcut}

QierPlayer comes with common shortcut keys built-in, but they only take effect when the focus is on the player during page access.

You can configure the shortcut key functionality through the `shortcutOptions` parameter.

```ts
interface IShortcut {
  disabled?: boolean
  seekStep?: number
  volumeStep?: number
  showToast?: boolean
  toastDelay?: number
}
```

For example, to disable shortcut keys functionality, you can configure it like this:

```js
import Player from 'qier-player'

const player = new Player({
  src: 'Your video URL',
  shortcutOptions: {
    disabled: true,
  },
})
```

There are 6 default built-in shortcut keys:

| Shortcut Key | Description     |
| ------------ | --------------- |
| Left         | Rewind          |
| Right        | Fast forward    |
| Up           | Increase volume |
| Down         | Decrease volume |
| Esc          | Exit fullscreen |
| Spacebar     | Play or pause   |

The increment size for volume and progress can be controlled using the `seekStep` and `volumeStep` parameters, with default values of `5` and `0.1` respectively.

```js
import Player from 'qier-player'

const player = new Player({
  src: 'Your video URL',
  shortcutOptions: {
    seekStep: 10,
    volumeStep: 0.2,
  },
})
```

`showToast` determines whether to display a tooltip when fast forwarding/rewinding or adjusting the volume, and `toastDelay` determines the duration of the tooltip's presence, defaulting to `500` milliseconds.
