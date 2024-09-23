# 方法 {#functions}

创建的实例有许多方法可供掉用，你可以在控制台打印后查看：

```js
const player = new Player({...})
console.log(player)
```

## `mount(container?: IPlayerOptions['container']): void`

播放器挂载的容器，如果初始化时没有传入 `container` 参数，那么调用该函数时的参数为必传。

## `play(): Promise<void> | void`

播放播放视频，调用的是 `video` 元素的原生事件。

## `pause(): void`

暂停播放视频，调用的是 `video` 元素的原生事件。

## `seek(seconds: number): void`

跳转到播放的指定时间，和设置 `player.currentTime` 相同作用。

## `incVolume(v = this.options.shortcutOptions.volumeStep): void`

增加音量，步长为 `volumeStep` 设置的值。

## `decVolume(v = this.options.shortcutOptions.volumeStep): void`

降低音量，步长为 `volumeStep` 设置的值。

## `forward(v = this.options.shortcutOptions.seekStep): void`

快进，步长为 `seekStep` 设置的值。

## `rewind(v = this.options.shortcutOptions.seekStep): void`

快退，步长为 `seekStep` 设置的值。

## `toggle(): void`

播放或暂停视频。

## `toggleVolume(): void`

切换静音状态。

## `dispose(): void`

销毁播放器。
