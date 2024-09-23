# Properties {#properties}

The created instance has many properties that can be read and written. You can log them in the console to inspect:

```js
const player = new Player({...})
console.log(player)
```

## `container: HTMLElement`

The container element for the player (provided as the `container` parameter or passed in `mount()`).

## `el: HTMLDivElement`

The outermost element of the player, which has the class name `qier-player`.

## `video: HTMLVideoElement`

The `video` tag element for the player.

## `options: IPlayerOptions`

An object that combines all the configuration options passed to the player with the default options.

## `rect: Rect`

Properties related to the player’s dimensions.

- `rect.width`: The width of the player (read-only).
- `rect.height`: The height of the player (read-only).
- `rect.x`: The horizontal coordinate of the player (read-only).
- `rect.y`: The vertical coordinate of the player (read-only).
- `rect.update`: Method to update the player's dimensions.

It's best to avoid calling `player.rect.update()` directly; instead, trigger the `UpdateSize` event using `player.emit('UpdateSize')`.

## `poster: Poster`

The player’s poster image.

- `poster.el`: The outermost element for the poster.
- `poster.isActive`: Whether the poster is displayed (read-only).
- `poster.show`: Method to show the poster.
- `poster.hide`: Method to hide the poster.

## `loading: Loading`

The loading indicator for the player.

- `loading.el`: The outermost element for the loading indicator.
- `loading.isActive`: Whether the loading indicator is displayed (read-only).
- `loading.show`: Method to show the loading indicator.
- `loading.hide`: Method to hide the loading indicator.

## `webFullscreen: WebFullscreen`

Web fullscreen functionality for the player.

- `webFullscreen.isActive`: Whether the player is in web fullscreen mode (read-only).
- `webFullscreen.enter`: Method to enter web fullscreen mode.
- `webFullscreen.exit`: Method to exit web fullscreen mode.
- `webFullscreen.toggle`: Method to toggle web fullscreen mode.

## `fullscreen: Fullscreen`

Fullscreen functionality for the player.

- `fullscreen.isActive`: Whether the player is in fullscreen mode (read-only).
- `fullscreen.enter`: Method to enter fullscreen mode.
- `fullscreen.exit`: Method to exit fullscreen mode.
- `fullscreen.toggle`: Method to toggle fullscreen mode.
- `fullscreen.enableDblclick`: Enable double-click to enter fullscreen mode.
- `fullscreen.disableDblclick`: Disable double-click to enter fullscreen mode.

## `menu: Menu`

The right-click context menu for the player.

- `menu.el`: The outermost element for the right-click menu.
- `menu.isActive`: Whether the right-click menu is open (read-only).
- `menu.show`: Method to show the right-click menu.
- `menu.hide`: Method to hide the right-click menu.

## `toast: Toast`

The toast notification for the player.

- `toast.show`: Method to display a toast notification.
- `toast.close`: Method to close a toast notification.

Usage:

```ts
show(html: string | HTMLElement, position?: Position, timeout = 3000)
close(toastItem?: ToastItem)
```

Type signatures:

```ts
type Position = 'center' | 'left_top' | 'right_top' | 'left_bottom' | 'right_bottom'

interface ToastItem {
  el: HTMLElement
  dispose: () => void
}
```

## `shortcut: Shortcut`

Keyboard shortcut functionality for the player.

- `shortcut.register`: Register a custom shortcut handler.
- `shortcut.unregister`: Unregister a custom shortcut handler.
- `shortcut.enable`: Enable shortcuts.
- `shortcut.disable`: Disable shortcuts.

Usage:

```ts
register(code: number, handler: ShortcutHandler)
unregister(code: number)
```

Type signatures:

```ts
type ShortcutHandler = (player: Player) => void;
```

## `controller: Controller`

The player controller.

- `controller.show`: Method to display the player controller.
- `controller.hide`: Method to hide the player controller.

## `settingItems: ISettingItem[]`

The settings menu items for the player; see [ISettingItem](./parameters#parameters-ISettingItem) for details.

## `currentTime: number`

The current playback position, which can be both retrieved and set.

For example, to jump to the 8-second mark:

```ts
player.currentTime = 8
```

## `loaded: boolean`

Indicates whether the video has loaded successfully (read-only).

## `duration: number`

The total duration of the current video (read-only).

## `buffered: TimeRanges`

The ranges of the video that have been loaded (read-only). See [MDN buffered](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered) for more information.

## `paused: boolean`

Indicates whether the video is currently paused (read-only).

## `ended: boolean`

Indicates whether the video has finished playing (read-only).

## `playing: boolean`

Indicates whether the video is currently playing (read-only).

## `volume: number`

The volume level of the video, which can be both retrieved and set. The range is from `0 to 1`.

For example, to set the volume to 90%:

```ts
player.volume = 0.9
```

## `muted: boolean`

Indicates whether the video is muted, which can be both retrieved and set.

For example, to mute the video:

```ts
player.muted = true
```

## `loop: boolean`

Indicates whether the video should loop, which can be both retrieved and set.

For example, to set the video to replay after it ends:

```ts
player.loop = true
```

## `playbackRate: number`

The playback speed of the video, which can be both retrieved and set.

For example, to set the playback speed to 2x:

```ts
player.playbackRate = 2
```
