# Methods {#functions}

The created instance has many callable methods, which you can inspect by logging it in the console:

```js
const player = new Player({...})
console.log(player)
```

## `mount(container?: IPlayerOptions['container']): void`

Mounts the player to a specified container. If the `container` parameter was not provided during initialization, it is required when calling this function.

## `play(): Promise<void> | void`

Starts playing the video, invoking the native event of the `video` element.

## `pause(): void`

Pauses video playback, invoking the native event of the `video` element.

## `seek(seconds: number): void`

Seeks to a specified time in the video, equivalent to setting `player.currentTime`.

## `incVolume(v = this.options.shortcutOptions.volumeStep): void`

Increases the volume by the value set in `volumeStep`.

## `decVolume(v = this.options.shortcutOptions.volumeStep): void`

Decreases the volume by the value set in `volumeStep`.

## `forward(v = this.options.shortcutOptions.seekStep): void`

Fast-forwards the video by the amount specified in `seekStep`.

## `rewind(v = this.options.shortcutOptions.seekStep): void`

Rewinds the video by the amount specified in `seekStep`.

## `toggle(): void`

Toggles between play and pause.

## `toggleVolume(): void`

Toggles the mute state.

## `dispose(): void`

Destroys the player.
