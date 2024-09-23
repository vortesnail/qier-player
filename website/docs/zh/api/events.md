# 事件 {#events}

播放器内部会抛出许多事件，你可以通过 `player.on`、`player.once` 方法进行监听，你也可以通过 `player.emit` 触发自定义或者已经定义的事件，事件名为大驼峰形式的字符串。

可以引入 `qier-player` 导出的 `EVENT` 对象来访问这些事件名。

```ts
import Player, { EVENT } from 'qier-player'

const player = new Player(...)
console.log(EVENT.CONTROLLER_SHOW)
console.log('ControlShow') // 与上面一样的字符串

const noop = () => {}

player.on(EVENT.CONTROLLER_SHOW, noop)
player.once(EVENT.CONTROLLER_SHOW, noop)
player.off(EVENT.CONTROLLER_SHOW, noop)
player.emit(EVENT.CONTROLLER_SHOW)
```

## 事件列表

| 事件名称      | 描述                           | 枚举值 |
| -------------- | ------------------------------ | ----------------------- |
| Play       | 播放视频                     | EVENT.PLAY |
| Pause       | 暂停播放视频                     | EVENT.PAUSE |
| Ended       | 视频结束                     | EVENT.ENDED |
| TimeUpdate       | 视频当前时间变更                     | EVENT.TIME_UPDATE |
| Progess       | 已下载视频范围变更                     | EVENT.PROGRESS |
| DurationChange       | 视频总时长变更                     | EVENT.DURATION_CHANGE |
| VolumeChange       | 音量大小变更                     | EVENT.VOLUME_CHANGE |
| Waiting       | 视频等待状态                     | EVENT.WAITING |
| Stalled       | 视频加载状态                     | EVENT.STALLED |
| Canplay       | 视频可播放状态                     | EVENT.CANPLAY |
| LoadedMetadata       | 视频源数据加载状态                     | EVENT.LOADED_METADATA |
| RateChange       | 视频播放速率变更                     | EVENT.RATE_CHANGE |
| Error       | 发生错误                     | EVENT.ERROR |
| Seeked       | 视频跳转                     | EVENT.SEEKED |
| ControlShow       | 控制器展示                     | EVENT.CONTROLLER_SHOW |
| ControlHide       | 控制器隐藏                     | EVENT.CONTROLLER_HIDE |
| UpdateSize       | 播放器尺寸变更                     | EVENT.UPDATE_SIZE |
| WebEnterFullscreen       | 进入网页全屏                     | EVENT.WEB_ENTER_FULLSCREEN |
| WebExitFullscreen       | 退出网页全屏                     | EVENT.WEB_EXIT_FULLSCREEN |
| EnterFullscreen       | 进入全屏                     | EVENT.ENTER_FULLSCREEN |
| ExitFullscreen       | 退出全屏                     | EVENT.EXIT_FULLSCREEN |
| EnterPip       | 进入画中画模式                    | EVENT.ENTER_PIP |
| ExitPip       | 退出画中画模式                    | EVENT.EXIT_PIP |
| Mounted       | 播放器已挂载                    | EVENT.MOUNTED |
| AfterInit       | 初始化完成                    | EVENT.AFTER_INIT |
| BeforeDispose       | 播放器销毁之前                    | EVENT.BEFORE_DISPOSE |
| AfterDispose       | 播放器销毁之后                    | EVENT.AFTER_DISPOSE |
| PopoverShowChange       | 弹框展示状态变更                    | EVENT.POPOVER_SHOW_CHANGE |
| ControllerElesUpdate       | 控制栏元素变更                    | EVENT.CONTROLLER_ELES_UPDATE |
| LoadingShow       | 加载指示器展示                    | EVENT.LOADING_SHOW |
| LoadingHide       | 加载指示器隐藏                    | EVENT.LOADING_HIDE |
