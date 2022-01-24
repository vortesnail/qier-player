---
title: 设置菜单
order: 7
---

# 设置菜单

设置菜单是[控制器](/zh-CN/doc/controller)其中的一项 `settings`。

当你在控制器中配置了这一项，你就能自定义添加设置菜单项。目前播放器的默认配置为：

```js
new Player({
  settings: ['mirroring', 'speed'],
});
```

即**镜像**和**播放速度**，如果你不喜欢，你也可以通过配置数组中的某一项而去掉它们。

如果你想自定义设置项，这里的设置项接口定义需要你注意。

## 自定义设置菜单项

```typescript
interface ISettingItemOption<T = any> {
  html?: string; // 选项的显示文本
  selectedText?: string; // 被选中时显示的文本，不填写会使用 html
  value?: T; // 表示该项的值
}

interface ISettingItem<T = any> {
  id?: any; // 设置项唯一 id
  html?: string; // 设置项的显示文本
  type?: 'switch' | 'select'; // 类型
  checked?: boolean; // 是否被选中
  options?: ISettingItemOption<T>[]; // 选项配置
  value?: T; // 当前选中的值，与 options 中的 value 对应
  init?: (player: Player, item: ISettingItem) => void; // 初始化调用
  change?: (value: T, player: Player, item: ISettingItem) => void; // 选项变化时调用
  [key: string]: any;
}
```

`html` 就是在设置菜单项显示的文本，如，`speed` 中的 `html` 是“播放速度”。

设置菜单项目前有两种类型，`switch` 和 `select`，不同类型的菜单项，它们所使用的配置不太一样。

## switch

`switch` 使用到的配置项是 `checked`。当用户点击修改该项的值时会调用 `change` 函数，第一个参数就是新 `checked` 的值，值得注意的是，你不需要自己在 `change` 函数中去手动对 `checked` 取反，在调用 `change` 前，内部就将 `checked` 更新完成了。

## select

`select` 使用到的配置项为 `options`。举个简单的例子，内置的播放速度的源码是这样的。

```js
const speedSettingItem = () => ({
  id: 'speed',
  type: 'select',
  html: '播放速度',
  value: 1,
  options: [
    { value: 0.25, html: '0.25' },
    { value: 0.5, html: '0.5' },
    { value: 1, html: '正常' },
    { value: 1.5, html: '1.5' },
    { value: 2, html: '2' },
  ],
  init(player) {
    player.playbackRate = 1;
  },
  change(value, player) {
    player.playbackRate = value;
    this.value = value;
  },
});
```

是不是很简单呢？😊

## 注册和获取设置菜单项

`player` 实例提供了两个方法来注册和获取菜单项对象。

### registerSettingItem(item: ISettingItem, id?: string)

注册设置菜单项。

### getSettingItem(id: string)

获取设置菜单项。

```js
const player = new Player({ ... })
const speed = player.getSettingItem('speed')
console.log(speed)
```

## 更多例子

- [镜像画面](/zh-CN/doc/examples/mirroring)
