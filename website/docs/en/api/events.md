# Events {#events}

The player will emit various events, which you can listen to using the `player.on` and `player.once` methods. You can also trigger custom or predefined events using `player.emit`, with event names in CamelCase format.

You can import the `EVENT` object from `qier-player` to access these event names.

```ts
import Player, { EVENT } from 'qier-player'

const player = new Player(...)
console.log(EVENT.CONTROLLER_SHOW)
console.log('ControlShow') // Equivalent string

const noop = () => {}

player.on(EVENT.CONTROLLER_SHOW, noop)
player.once(EVENT.CONTROLLER_SHOW, noop)
player.off(EVENT.CONTROLLER_SHOW, noop)
player.emit(EVENT.CONTROLLER_SHOW)
```

## Event List

| Event Name      | Description                           | Enum Value                  |
| ---------------- | ------------------------------------- | --------------------------- |
| Play             | Play video                           | EVENT.PLAY                  |
| Pause            | Pause video                          | EVENT.PAUSE                 |
| Ended            | Video has ended                      | EVENT.ENDED                 |
| TimeUpdate       | Current time updated                 | EVENT.TIME_UPDATE           |
| Progress         | Downloaded video range updated       | EVENT.PROGRESS              |
| DurationChange   | Total video duration changed          | EVENT.DURATION_CHANGE       |
| VolumeChange     | Volume level changed                  | EVENT.VOLUME_CHANGE         |
| Waiting          | Video is in waiting state            | EVENT.WAITING               |
| Stalled          | Video is loading                     | EVENT.STALLED               |
| CanPlay          | Video can be played                  | EVENT.CANPLAY               |
| LoadedMetadata    | Video source data loaded             | EVENT.LOADED_METADATA       |
| RateChange       | Playback rate changed                 | EVENT.RATE_CHANGE           |
| Error            | An error occurred                    | EVENT.ERROR                 |
| Seeked           | Video has been seeked                | EVENT.SEEKED                |
| ControlShow      | Controller displayed                  | EVENT.CONTROLLER_SHOW       |
| ControlHide      | Controller hidden                     | EVENT.CONTROLLER_HIDE       |
| UpdateSize       | Player size updated                   | EVENT.UPDATE_SIZE           |
| WebEnterFullscreen | Entered web fullscreen              | EVENT.WEB_ENTER_FULLSCREEN  |
| WebExitFullscreen  | Exited web fullscreen                | EVENT.WEB_EXIT_FULLSCREEN   |
| EnterFullscreen   | Entered fullscreen                   | EVENT.ENTER_FULLSCREEN      |
| ExitFullscreen    | Exited fullscreen                    | EVENT.EXIT_FULLSCREEN       |
| EnterPip        | Entered Picture-in-Picture mode      | EVENT.ENTER_PIP            |
| ExitPip         | Exited Picture-in-Picture mode       | EVENT.EXIT_PIP             |
| Mounted          | Player has been mounted              | EVENT.MOUNTED               |
| AfterInit       | Initialization complete              | EVENT.AFTER_INIT           |
| BeforeDispose    | Before player is destroyed           | EVENT.BEFORE_DISPOSE       |
| AfterDispose     | After player is destroyed            | EVENT.AFTER_DISPOSE        |
| PopoverShowChange | Popover display state changed        | EVENT.POPOVER_SHOW_CHANGE   |
| ControllerElesUpdate | Controller elements updated       | EVENT.CONTROLLER_ELES_UPDATE |
| LoadingShow      | Loading indicator displayed          | EVENT.LOADING_SHOW          |
| LoadingHide      | Loading indicator hidden             | EVENT.LOADING_HIDE          |
