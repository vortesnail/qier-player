# Parameters {#parameters}

Parameters passed to the player constructor can be provided during player initialization:

```js
import Player from 'qier-player'

const player = new Player({
  src: '/test-video_1080p.mp4',
})

console.log('player parameters', player.options)

player.mount(document.body)
```

## Parameter Descriptions

| Parameter Name | Description | Type |
| -------------- | ----------- | ---- |
| container | The container element where the player is mounted, the same as the parameter passed to the `mount` method. If no parameter is provided to `mount`, this will be used. When this parameter is a string, it will automatically find the corresponding element. | `string \| HTMLElement` |
| video | The `video` tag element provided by the user. | `HTMLVideoElement` |
| src | The video URL, passed to the `src` attribute of the `video` tag element. | `string` |
| themeColor | The theme color that will affect the visual theme of the entire player. | `string` |
| videoProps | Properties for the `video` tag element. | `Record<string, any>` |
| posterOptions | Configuration related to the poster, see [IPosterOptions](#parameters-IPosterOptions) for details. | `IPosterOptions` |
| loadingOptions | Configuration related to the loading indicator, see [ILoadingOptions](#parameters-ILoadingOptions) for details. | `ILoadingOptions` |
| controller | Configuration related to the controller, see [IController](#parameters-IController) for details. | `IController` |
| progressOptions | Configuration related to the progress bar, see [IProgressOptions](#parameters-IProgressOptions) for details. | `IProgressOptions` |
| thumbnail | Configuration related to thumbnails, see [IThumbnail](#parameters-IThumbnail) for details. | `IThumbnail` |
| settings | Configuration related to the settings menu, see [ISettingItem](#parameters-ISettingItem) for details. | `(ISettingItem \| string)[]` |
| menus | Configuration related to the right-click menu, see [IMenuItem](#parameters-IMenuItem) for details. | `(IMenuItem \| string)[]` |
| showDefaultMenu | Determines whether to show the **native right-click menu**. When set to `true`, the browser's native right-click menu will be shown on the second click instead of the custom player right-click menu. When set to `false`, the browser's right-click menu will never be displayed. | `boolean` |
| shortcutOptions | Configuration related to keyboard shortcuts, see [IShortcut](#parameters-IShortcut) for details. | `IShortcut` |

## IPosterOptions {#parameters-IPosterOptions}

| Parameter Name | Description | Type |
| -------------- | ----------- | ---- |
| disabled | Whether to disable the poster. | `boolean` |
| url | The URL of the poster image. | `string` |
| autoFill | Whether the poster image automatically fills the entire video container. | `boolean` |
| bgColor | The background color for the poster image. This is necessary if your image has transparency. | `string` |

## ILoadingOptions {#parameters-ILoadingOptions}

| Parameter Name | Description | Type |
| -------------- | ----------- | ---- |
| disabled | Whether to disable the loading indicator. | `boolean` |
| spinner | Custom indicator. | `HTMLElement` |
| type | Built-in indicator animations, two animations to choose from. | `wave \| circle` |

## IController {#parameters-IController}

| Parameter Name | Description | Type |
| -------------- | ----------- | ---- |
| progress | Progress bar configuration. | `(IControllerEle | string)[]` |
| eles | Control bar configuration. | `(IControllerEle | string)[]` |

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

| Parameter Name | Description | Type |
|----------------|-------------|------|
| dot            | Element to represent the end of the progress bar; can be a custom element | `HTMLElement` |
| playedBg       | Color of the already played portion of the progress bar | `string` |
| buffBg         | Color of the buffered portion of the progress bar | `string` |
| indicator       | Whether to show an indicator on the progress bar | `boolean` |

## IThumbnail {#parameters-IThumbnail}

| Parameter Name | Description | Type |
|----------------|-------------|------|
| startSecond    | Start time for the thumbnail | `number` |
| gapSecond      | Interval time for thumbnail generation | `number` |
| row            | Number of rows in the sprite sheet | `number` |
| col            | Number of columns in the sprite sheet | `number` |
| width          | Width of the thumbnail | `number` |
| height         | Height of the thumbnail | `number` |
| images         | Array of sprite sheet links | `string[]` |

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

For detailed usage, refer to [Custom Setting Menu Items](../guide/setting-menu#setting-menu-custom-menu-item).

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

For detailed usage, refer to [Context Menu](../guide/menu).

## IShortcut {#parameters-IShortcut}

| Parameter Name | Description | Type |
|----------------|-------------|------|
| disabled       | Whether the shortcut is disabled | `boolean` |
| seekStep       | Step length for fast forward or rewind when using shortcuts, e.g., `5` seconds | `number` |
| volumeStep     | Step size for increasing or decreasing volume with shortcuts, e.g., `0.1` | `number` |
| showToast      | Whether to display a toast notification indicating the current action | `boolean` |
| toastDelay     | Duration for which the toast notification is displayed | `number` |

## Default Values

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
