# 属性 {#properties}

创建的实例有许多属性可供读写，你可以在控制台打印后查看：

```js
const player = new Player({...})
console.log(player)
```

## `container: HTMLElement`

播放器容器标签元素（`container` 参数或 `mount()` 传入的参数）。

## `el: HTMLDivElement`

播放器本身最外层标签元素，即类名为 `qier-player` 的元素。

## `video: HTMLVideoElement`

播放器 `video` 标签元素。

## `options: IPlayerOptions`

传入的播放器所有配置项和默认的配置项，合并成一个对象。

## `rect: Rect`

播放器尺寸相关。

- `rect.width` 播放器宽度，只可读。
- `rect.height` 播放器高度，只可读。
- `rect.x` 播放器横坐标，只可读。
- `rect.y` 播放器纵坐标，只可读。
- `rect.update` 更新播放器尺寸。

尽量不要调用 `player.rect.update()` 方法，而是触发 `UpdateSize` 事件， `player.emit('UpdateSize')`。

## `poster: Poster`

播放器海报。

- `poster.el` 海报最外层标签元素。
- `poster.isActive` 是否显示播放器海报，只可读。
- `poster.show` 显示播放器海报方法。
- `poster.hide` 隐藏播放器海报方法。

## `loading: Loading`

播放器的加载指示器。

- `loading.el` 播放器加载指示器最外层标签元素。
- `loading.isActive` 是否展示播放器加载指示器，只可读。
- `loading.show` 显示播放器加载指示器方法。
- `loading.hide` 隐藏播放器加载指示器方法。

## `webFullscreen: WebFullscreen`

播放器网页全屏。

- `webFullscreen.isActive` 播放器是否处于网页全屏状态，只可读。
- `webFullscreen.enter` 播放器进入网页全屏状态的方法。
- `webFullscreen.exit` 播放器退出网页全屏状态的方法。
- `webFullscreen.toggle` 进入或退出播放器网页全屏状态的方法。

## `fullscreen: Fullscreen`

播放器全屏。

- `fullscreen.isActive` 播放器是否处于全屏状态，只可读。
- `fullscreen.enter` 播放器进入全屏状态的方法。
- `fullscreen.exit` 播放器退出全屏状态的方法。
- `fullscreen.toggle` 进入或退出播放器全屏状态的方法。
- `fullscreen.enableDblclick` 启用双击进入播放器全屏。
- `fullscreen.disableDblclick` 禁用双击进入播放器全屏。

## `menu: Menu`

播放器右键菜单。

- `menu.el` 右键菜单最外层标签元素。
- `menu.isActive` 右键菜单是否打开，只可读。
- `menu.show` 显示右键菜单方法。
- `menu.hide` 隐藏右键菜单方法。

## `toast: Toast`

播放器提示弹框。

- `toast.show` 显示一个提示弹框。
- `toast.close` 关闭一个提示弹框。

使用方式：

```ts
show(html: string | HTMLElement, position?: Position, timeout = 3000)
close(toastItem?: ToastItem)
```

类型签名：

```ts
type Position = 'center' | 'left_top' | 'right_top' | 'left_bottom' | 'right_bottom'

interface ToastItem {
  el: HTMLElement
  dispose: () => void
}
```

## `shortcut: Shortcut`

播放器快捷键。

- `shortcut.register` 注册自定义快捷键处理器。
- `shortcut.unregister` 注销自定义快捷键处理器。
- `shortcut.enable` 启用快捷键。
- `shortcut.disable` 禁用快捷键。

使用方式：

```ts
register(code: number, handler: ShortcutHandler)
unregister(code: number)
```

类型签名：

```ts
type ShortcutHandler = (player: Player) => void;
```

## `controller: Controller`

播放器控制器。

- `controller.show` 显示播放器控制器。
- `controller.hide` 隐藏播放器控制器。

## `settingItems: ISettingItem[]`

播放器的设置菜单项，详情见 [ISettingItem](./parameters#parameters-ISettingItem)

## `currentTime: number`

设置当前播放的时间位置，该属性可以同时被获取和设置新的值。

比如跳转到第 `8` 秒：

```ts
player.currentTime = 8
```

## `loaded: boolean`

指示视频是否加载成功，只可读。

## `duration: number`

获取当前视频总时长，只可读。

## `buffered: TimeRanges`

视频已加载的范围，只可读，可查看 [MDN buffered](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered)。

## `paused: boolean`

视频当前是否暂停，只可读。

## `ended: boolean`

视频当前是否播放结束，只可读。

## `playing: boolean`

视频当前是否正在播放，只可读。

## `volume: number`

视频音量大小，该属性可以同时被获取和设置新的值，范围是 `0～1`。

比如音量设置音量 `90%`：

```ts
player.volume = 0.9
```

## `muted: boolean`

视频是否静音，该属性可以同时被获取和设置新的值。

比如将视频设置为静音：

```ts
player.muted = true
```

## `loop: boolean`

视频是否循环播放，该属性可以同时被获取和设置新的值。

比如将视频设置播放结束后重新播放：

```ts
player.loop = true
```

## `playbackRate: number`

视频播放速率，该属性可以同时被获取和设置新的值。

比如将视频播放速率调为 `2` 倍播放：

```ts
player.playbackRate = 2
```
