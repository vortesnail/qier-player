# 参数 {#parameters}

传入播放器构造函数的参数，在初始化播放器时可传入：

```js
import Player from 'qier-player'

const player = new Player({
  src: '/test-video_1080p.mp4',
})

console.log('player parameters', player.options)

player.mount(document.body)
```

## 参数解释

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| container       | 播放器挂载的容器元素，同 `mount` 方法传入的参数，如果 `mount` 没有传入参数时，将使用该参数，当该参数为字符串时，将会自动查找对应元素       | `string \| HTMLElement` |
| video       | 自行传入的 `video` 标签元素       | `HTMLVideoElement` |
| src       | 视频地址，传入给 `video` 标签元素的 `src` 属性       | `string` |
| themeColor       | 主题色，会影响整个播放器的视觉主题色       | `string` |
| videoProps       | `video` 标签元素的属性       | `Record<string, any`> |
| posterOptions       | 海报相关配置，详见 [IPosterOptions](#parameters-IPosterOptions)       | `IPosterOptions` |
| loadingOptions       | 加载指示器相关配置，详见 [ILoadingOptions](#parameters-ILoadingOptions)       | `ILoadingOptions` |
| controller       | 控制器相关配置，详见 [IController](#parameters-IController)       | `IController` |
| progressOptions       | 进度条相关配置，详见 [IProgressOptions](#parameters-IProgressOptions)       | `IProgressOptions` |
| thumbnail       | 缩略图相关配置，详见 [IThumbnail](#parameters-IThumbnail)       | `IThumbnail` |
| settings       | 设置菜单相关配置，详见 [ISettingItem](#parameters-ISettingItem)       | `(ISettingItem \| string)[]` |
| menus       | 右键菜单相关配置，详见 [IMenuItem](#parameters-IMenuItem)       | `(IMenuItem \| string)[]` |
| showDefaultMenu       | 用于决定是否显示**原生右键菜单**，值为 `true` 时，将在第二次单击时显示浏览器的原生右键菜单，而不是我们自己配置的播放器右键菜单。值为 `false` 时，将始终不显示浏览器右键菜单。    | `boolean` |
| shortcutOptions       | 快捷键相关配置，详见 [IShortcut](#parameters-IShortcut)       | `IShortcut` |

## IPosterOptions {#parameters-IPosterOptions}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| disabled       | 是否禁用海报       | `boolean` |
| url       | 海报图片的链接地址       | `string` |
| autoFill       | 海报图片是否自动填满视频整个容器       | `boolean` |
| bgColor       | 海报图片背景颜色，如果你的图片是有透明信息的，这个配置有必要填       | `string` |

## ILoadingOptions {#parameters-ILoadingOptions}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| disabled       | 是否禁用加载指示器       | `boolean` |
| spinner       | 自定义指示器       | `HTMLElement` |
| type       | 内置的指示器动画，两个动画可选择       | `wave \| circle` |

## IController {#parameters-IController}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| progress       | 进度条配置       | `(IControllerEle | string)[]` |
| eles       | 控制栏配置       | `(IControllerEle | string)[]` |

```ts
interface IControllerEle {
  el: HTMLElement;
  id?: any;
  tip?: string;
  tooltip?: Tooltip;
  mounted?: boolean;
  init?: (player: Player, tooltip: Tooltip) => void;
  dispose?: () => void;
  [key: string]: any;
}
```

## IProgressOptions {#parameters-IProgressOptions}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| dot       | 当前进度条末端的点，可自己写一个元素替换       | `HTMLElement` |
| playedBg       | 已经播放过的进度条颜色       | `string` |
| buffBg       | 缓存的进度条的颜色       | `string` |
| indicator       | 是否展示光标在进度条上的指示器       | `boolean` |

## IThumbnail {#parameters-IThumbnail}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| startSecond       | 缩略图开始时间       | `number` |
| gapSecond       | 缩略图生成的间隔时间       | `number` |
| row       | 雪碧图图行数       | `number` |
| col       | 雪碧图图列数       | `number` |
| width       | 缩略图宽度       | `number` |
| height       | 缩略图高度      | `number` |
| images       | 雪碧图链接数组      | `string[]` |

## ISettingItem {#parameters-ISettingItem}

```ts
interface ISettingItem<T = any> {
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
```

```ts
interface ISettingItemOption<T = any> {
  html?: string;
  selectedText?: string;
  value?: T;
}
```

详细用法可参考[自定义设置菜单项](../guide/setting-menu#setting-menu-custom-menu-item)

## IMenuItem {#parameters-IMenuItem}

```ts
interface IMenuItem {
  id?: string;
  html?: string;
  hidden?: boolean;
  disabled?: boolean;
  checked?: boolean;
  init?: (player: Player, item: IMenuItem) => void;
  show?: (player: Player, item: IMenuItem) => void;
  click?: (player: Player, item: IMenuItem) => void;
}
```

详细用法可参考[右键菜单](../guide/menu)

## IShortcut {#parameters-IShortcut}

| 参数名   | 描述       | 类型       |
| -------- | ---------- | ---------- |
| disabled       | 是否禁用快捷键       | `boolean` |
| seekStep       | 使用快捷键时，单次快进、快退的步长，比如 `5` 秒      | `number` |
| volumeStep       | 使用快捷键时，单次增加、减少的音量，比如 `0.1`       | `number` |
| showToast       | 使用快捷键时，是否展示弹框标识当前操作       | `boolean` |
| toastDelay       | 使用快捷键时，弹框的存在时长       | `number` |

## 默认值

```ts
const defaultOptions = {
  posterOptions: {
    disabled: true,
    autoFill: true,
  },
  loadingOptions: {
    disabled: false,
    type: 'circle',
  },
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
  settings: ['mirroring', 'speed'],
  menus: ['loop'],
  showDefaultMenu: true,
  videoProps: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
  },
  progressOptions: {
    indicator: true,
  },
  shortcutOptions: {
    disabled: false,
    seekStep: 5,
    volumeStep: 0.1,
    showToast: true,
    toastDelay: 500,
  },
}
```
