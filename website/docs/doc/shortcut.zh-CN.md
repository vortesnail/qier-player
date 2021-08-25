---
title: 快捷键
order: 4
---

# 快捷键

Qier Player 内置了常用的快捷键，不过它们只有页面访问的在焦点在播放器时才能生效。

可以通过 `shortcutOptions` 参数来配置快捷键功能。

```typescript
interface IShortcut {
  disabled?: boolean;
  seekStep?: number;
  volumeStep?: number;
  showToast?: boolean;
  toastDelay?: number;
}
```

比如禁用快捷键功能可以这样配置。

```js
import Player from 'qier-player';

const player = new Player({
  src: '你的视频地址',
  shortcutOptions: {
    disabled: true,
  },
});
```

默认内置有 6 个快捷键。

| 快捷键   | 描述       |
| -------- | ---------- |
| 左       | 快退       |
| 右       | 快进       |
| 上       | 增加音量   |
| 下       | 降低音量   |
| Esc      | 退出全屏   |
| Spacebar | 播放或暂停 |

音量和进度递增的大小可以通过 `seekStep` 和 `volumeStep` 参数控制，它们的默认值是 `5` 和 `0.1`。

```js
import Player from 'qier-player';

const player = new Player({
  src: '你的视频地址',
  shortcutOptions: {
    seekStep: 10,
    volumeStep: 0.2,
  },
});
```

`showToast` 决定是否显示快进/快退或音量加减时的提示框，`toastDelay` 决定提示框的存在时间，默认 `500` 毫秒。
