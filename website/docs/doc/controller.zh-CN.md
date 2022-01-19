---
title: 控制器
order: 6
---

# 控制器

在播放器的底部有供用户进行播放（暂停）、音量调节、全屏等操作的一系列控制项，也包括了播放进度条。

## 配置

可以通过 `controller` 参数来配置控制器每项的位置，渲染与否等，它是一个对象，包含 `progress` 和 `eles` 两个可配置项，前者是**进度条**，后者是**常规控制项**，可自定义添加新的控制项。

默认设置如下：

```js
new Player({
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
});
```

上面代码中的数组内都是每一项内置控制项的 `id`，它们在数组中的位置决定了视图上它们的位置。

比较特别的是 `id` 为 `spacer` 控制项，它可以将控制项分成两部分。比如想把音量按钮放到左侧，只需将 `volume` 字符串放到 `spacer` 左侧即可。

```js
eles: ['play', 'time',  'volume', 'spacer', 'settings', 'web-fullscreen', 'fullscreen'],
```

## 内置控制项

| 控制项 id      | 描述                           |
| -------------- | ------------------------------ |
| progress       | 视频进度条                     |
| play           | 播放/暂停                      |
| time           | 视频时间显示                   |
| spacer         | 用来将控制项布局分成左右两部分 |
| volume         | 音量调节                       |
| settings       | 设置                           |
| web-fullscreen | 网页全屏                       |
| fullscreen     | 全屏                           |

## 自定义控制项

控制项是可以自定义的，：

```typescript
interface IControllerEle {
  el: HTMLElement; // 控制项的 DOM 元素
  id?: any; // 控制项的唯一 id
  tip?: string; // 控制项的提示字符串
  tooltip?: Tooltip; // 提示组件对象
  mounted?: boolean; // 控制项是否已经挂载
  init?: (player: Player, tooltip: Tooltip) => void; // 控制项在初始化时会调用
  dispose?: () => void; // 销毁
  [key: string]: any;
}
```

`tip` 参数是一个字符串，当鼠标移到对应控制项上时会显示这个提示字符串。

```js
const control = {
  id: 'control',
  tip: '控制项',
  init(player) {
    const textDom = document.createElement('span');
    textDom.innerText = '控';
    this.el.appendChild(textDom);
  },
};
```

## 更新控制项

提供了内置的方法 `updateControllerEles()` 来动态更新控制条项。

```js
const player = new Player({ ... })

player.updateControllerEles(['play', 'spacer', 'settings'], 'eles')
```

第一个参数是新的控制项数组，第二个参数要更新的配置项，这里为 `eles`，也就是最下面的控制栏配置。

## 注册和获取控制项

`player` 实例提供了两个方法来注册和获取菜单项对象。

### 注册

#### `registerControllerEle(ele: IControllerEle, id?: string)`

使用该方法注册控制项，然后使用 `id` 字符串访问，一般只会在自定义插件中会使用。

### 获取

#### `getControllerEle(id: string)`

使用该方法获取指定 `id` 的控制项。

```js
const control = { ... }
const player = new Player({ ... });
// 注册
player.registerControllerEle(control, 'control');
// 获取
const controlTmp = player.getControllerEle('control');

if (controlTmp) {
  console.log(controlTmp)
}
```

上面即注册我们自己定义的控制项，也可以获取内置的控制项，比如播放的类实例。

```js
console.log(player.getControllerEle('play'));
```

⚠️ 其中 `spacer` 控制项比较特殊，通过 `getControlItem('spacer')` 并不能获取到它的实例。

## 更多例子

- [画质切换](/zh-CN/doc/examples/quality-switch)
