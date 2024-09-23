# 右键菜单 {#menu}

在播放器上点击鼠标右键时，会出现一个菜单，用于提供一些便捷的操作（或信息展示）。

## 配置 {#menu-property}

可根据 `menus` 和 `showDefaultMenu` 来对菜单进行配置，默认配置如下：

```js
new Player({
  menus: ['loop'],
  showDefaultMenu: true,
})
```

- `menus` 默认只有 1 个菜单项，即**循环播放**。当你手动将其设置为空数组时，右键菜单将不会出现。
- `showDefaultMenu` 是用于决定是否显示**原生右键菜单**，值为 `true` 时，将在第二次单击时显示浏览器的原生右键菜单，而不是我们自己配置的播放器右键菜单。值为 `false` 时，将始终不显示浏览器右键菜单。

## 自定义菜单项 {#custom-menu-item}

右键菜单支持自定义菜单项，每一个菜单项的类型如下：

```typescript
interface IMenuItem {
  id?: string // 菜单项的唯一 id
  html?: string // 菜单项文字
  hidden?: boolean // 是否可见
  disabled?: boolean // 是否禁用
  checked?: boolean // 是否为选中状态
  init?: (player: Player, item: IMenuItem) => void // 初始化时会调用一次
  show?: (player: Player, item: IMenuItem) => void // 每次右键菜单展示时会调用
  click?: (player: Player, item: IMenuItem) => void // 每次单击该项时会调用
}
```

::: warning
html 属性，会直接通过 innerHTML 插入 html 字符串生成 DOM，不会经过安全处理，需要自己保障字符串安全。
:::

你可以尝试添加一个**画中画**功能来初步体验开发自己的菜单项。

```js
const pip = {
  html: '画中画',
  init() {
    // 初始化是判断浏览器是否不支持画中画，不支持则隐藏该菜单项
    this.hidden = !document.pictureInPictureEnabled
  },
  show(player, item) {
    item.checked = document.pictureInPictureElement === player.video
  },
  click(player, menuItem) {
    if (player.video.readyState < 3) return // 视频还没加载成功
    if (document.pictureInPictureElement !== player.video) {
      player.video.requestPictureInPicture()
    } else {
      document.exitPictureInPicture()
      menuItem.checked = false
    }
    this.show(player, menuItem)
  },
}

new Player({
  menus: ['loop', pip],
})
```

上面的逻辑中，我们先定义了一个菜单项对象，然后在配置时直接将其加入到数组中即可，你可以随意调整顺序。这时候你在播放器上右键鼠标唤出菜单，即可看到`画中画`选项。

::: warning 无法满足需求？
如果当前暴露出来的菜单项接口在你的开发中无法得到满足，欢迎提 <a href="https://github.com/vortesnail/qier-player/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=">issue</a>。
:::

## 注册和获取菜单项 {#register-get-menu-item}

`player` 实例提供了两个方法来注册和获取菜单项对象。

### 注册 {#register-menu-item}

#### `registerMenuItem(item: IMenuItem, id?: string)`

使用该方法注册菜单项，然后使用 `id` 字符串访问，一般只会在自定义插件中会使用。

### 获取 {#get-menu-item}

#### `getMenuItem(id: string)`

使用该方法获取指定 `id` 的菜单项。

```js
const pip = { ... }
const player = new Player({ ... })
// 注册
player.registerMenuItem(pip, 'pip')
// 获取
const pipTmp = player.getMenuItem('pip')
// 修改
if (pipTmp) {
  pipTmp.disabled = true
  pipTmp.html = '画中画（已被禁用）'
}
```

任何时机去改变菜单项的配置都可以，在下一次右键菜单显示时，配置项会得到更新。

## 更多例子 {#menu-more-example}

- [视频截图](./examples/video-screenshot)
