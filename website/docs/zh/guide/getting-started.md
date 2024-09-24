# 快速开始 {#getting-started}

## 安装 {#installation}

通过[安装章节](./installation)，大家应该知道各种安装方式，现在假如我们是基于 ES Module 引入。

::: code-group

```sh [npm]
$ npm install qier-player
```

```sh [pnpm]
$ pnpm install qier-player
```

```sh [yarn]
$ yarn add qier-player
```

:::

## 开始使用 {#started}

```js
import Player from 'qier-player'

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
})

player.mount(document.body)
```

首先我们导入 `Player`，创建实例，接着传入视频地址，调用 `mount` 方法将它挂载到 `body` 元素下。

`mount` 方法可以将播放器实际产生的 DOM 元素挂载到指定 DOM 元素下，它接收一个参数，可以是一个字符串（选择器）或一个实际的 DOM 元素。当是字符串时，内部实现通过 `document.querySelector` 方法寻找到实际的 DOM 元素。

## 获取相关 DOM 元素 {#get-doms}

在执行 `mount` 方法后，可以通过实例访问内部的成员，以下是可能被经常访问的：

- **被挂载的元素**：通过 `container` 可访问。
- **播放器根元素**：通过 `el` 可访问。
- **video**：通过 `video` 可访问。

```js
import Player from 'qier-player'

const player = new Player({
  src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
})

player.mount(document.body)

console.log(player.container) // document.body
console.log(player.el)
console.log(player.video)
```

## 实例属性和方法 {#instance-properties-functions}

在我们新建实例 `player` 之后，有许多成员属性是可以供我们读取的。

比如以下代码可实现自动播放，`10` 秒后自动暂停。

```js
player.muted = true // 静音
player.play() // 播放

setTimeout(() => {
  player.pause() // 暂停
}, 10000)
```

如果我们在控制台打印 `player` 实例，展开后你会发现有许多的成员属性，详情请点击[属性](../api/properties)和[方法](../api/functions)查看。

## 事件监听 {#instance-bus}

`player` 有下面 5 个事件相关的方法。

| 方法                              | 描述                               |
| --------------------------------- | ---------------------------------- |
| emit(evt: string, ...args: any[]) | 派发事件                           |
| on(evt: string, fn?: Function)    | 监听事件                           |
| once(evt: string, fn?: Function)  | 监听事件，回调函数仅调用一次即注销 |
| off(evt: string, fn?: Function)   | 注销事件监听                       |
| removeAllListeners(evt?: string)  | 注销所有事件监听                   |

你可以使用这些方法监听内置事件。

```js
import Player, { EVENT } form 'qier-player'

const player = new Player()

player.on(EVENT.PLAY, () => {
  console.log('开始播放')
})
```

`EVENT.PLAY` 本质上就是一个字符串，采用大驼峰命名法为 `Play`。

你也可以自定义监听事件。

```js
import Player, { EVENT } form 'qier-player'

const player = new Player()

// 派发事件
player.emit('CustomEvent')
// 监听事件并执行回调函数
player.on('CustomEvent', () => {
  console.log('自定义事件已触发')
})
```

更多内置事件请查看[事件](/zh/api/events)。

## 销毁 {#instance-destroy}

`player` 及所有组件都实现了 `Dispose` 接口，也就是拥有 `dispose` 方法，调用该方法将会销毁该对象及其 DOM 元素。

```js
player.mount(document.body)
// 5 秒后销毁 player 及其 DOM 元素
setTimeout(() => player.dispose(), 5000)
```

## 多层级 {#muti-level}

该播放器有 6 个不同功能的层级组成，每个层级有自己的 `z-index`。

| 层级              | z-indx | 描述                             |
| ----------------- | ------ | -------------------------------- |
| video 视频元素    | -      | video 元素没有设置 z-index       |
| poster 海报       | 10     | 视频海报                         |
| loading 加载中    | 20     | 视频加载时出现的加载中指示器元素 |
| controller 控制条 | 30     | 视频底部控制条                   |
| menu 右键菜单     | 40     | 右键视频元素弹出的菜单           |
| toast 提示框      | 50     | 提示框                           |

除了 `video` 元素，其它的功能组件都是采用**绝对定位**，在后续提供插件功能之后，开发者可以自己决定将 `z-index` 设置合适的数值，以避免不必要的遮挡。

## 问题 & 新功能 {#questions}

如果你遇到 BUG、想要新功能或者有使用上的问题，欢迎发起 [issue](https://github.com/vortesnail/qier-player/issues/new/choose)。
