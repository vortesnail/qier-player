# 视频缩略图 {#thumbnail}

现在主流的视频网站都支持一个功能，即光标移动到视频进度条某个位置时，会显示该处的视频内容缩略图，这有益于用户快速定位想要看到的内容时间点，QierPlayer 同样支持这个配置。

QierPlayer 的缩略图使用 `thumbnail` 参数配置，结构如下：

```ts
interface IThumbnail {
  startSecond?: number
  gapSecond?: number
  row?: number
  col?: number
  width?: number
  height?: number
  images?: string[]
}
```

默认值如下：

```ts
const defaultOpts: Required<IThumbnail> = {
  startSecond: 0,
  gapSecond: 5,
  col: 5,
  row: 5,
  width: 160,
  height: 90,
  images: [],
}
```

接下来会教你如何理解上述的配置，并进行实战。

## 原理 {#principle}

在前端关于图片性能优化中，我们通常会使用**雪碧图**来对多个图片进行合并优化，以减少 http 请求连接量，而我们视频的缩略图相当于是提取了视频中的很多帧，将这些帧合并成一个一个的雪碧图。

再根据光标所在的时间计算出要展示当前雪碧图中的哪个位置的图（CSS 的背景定位），而上述的配置就是一些位置及单帧图片大小的信息。

我们看下图：

<img src="/thumbnails/t1.jpg" />

我们可以看到这个雪碧图由 `5 x 4` 的小缩略图组成，一个视频可能有多张雪碧图。

| 参数   | 描述       |
| -------- | ---------- |
| startSecond   | 缩略图制作的开始时间，比如缩略图是视频的第 `0` 秒开始制作的那么，这里就是 `0` |
| gapSecond     | 一张小缩略图时间跨度，如果小缩略图是每 `1` 秒截一张，那么这里就填 `1`    |
| col           | 雪碧图的列数   |
| row           | 雪碧图的行数   |
| width         | 小缩略图的宽   |
| height        | 小缩略图的高 |
| images        | 雪碧图的链接地址数组 |

## 制作缩略图 {#make-thumbnails}

一般来说，用户上传视频至服务端之后，缩略图的制作是服务端进行的，比如 Java 你可以使用 [FFmpeg](https://www.ffmpeg.org/) 或 [JavaCV](https://github.com/bytedeco/javacv)，如果是 Node 你可以使用 [Fluent ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)。

为了方便，在此介绍使用 FFmpeg 的命令行来制作视频缩略图。

::: tip 强大的音视频处理工具
FFmpeg 是一个开源的跨平台音视频处理工具，可以用来对音频和视频进行录制、转换、编辑等多种操作。它支持几乎所有常见的音频和视频格式，可以进行音频、视频的编解码、封装、解封装等操作，还可以进行视频剪辑、合并、压缩、转码、提取音频等高级操作。

总之 FFmpeg 是一个功能丰富、强大而灵活的音视频处理工具，许多播放器都将其作为内核。
:::

首先去 [FFmpeg 官网](https://www.ffmpeg.org/download.html)下载安装，记得选对系统，比如我的是 macOS 就要选  macOS，下载完成后是一个命令行工具（你也可以用过 `brew install ffmepg` 快速安装），我们打开它即可。

然后在终端执行以下命令：

```sh
ffmpeg -i ./test-video.mp4 -vf 'fps=1/1:round=zero:start_time=0,scale=160x90,tile=5x4' t%d.jpg
```

通过上面这个命令生成了一张 `5 x 4` 的雪碧图，小缩略图的尺寸是 `160 x 90`。雪碧图的文件名是 `t1.jpg`。

::: warning 疑问
演示的视频只有 `17` 秒，如果 `1` 秒生成 `1` 张雪碧图，而雪碧图的规格为 `5` 列 `4` 行，所以只会生成一张 `t1.jpg`，如果视频足够长，将会生成多张雪碧图 `t1.jpg、t2.jpg、t3.jpg、t4.jpg...`
:::

解释上面命令的参数：

- `-i` 参数后面是视频文件。
- `-vf` 参数后面跟着过滤器，多个过滤器用 `,` 分开，一个过滤器多个参数使用 `:` 分开。
- `fps=1/1` 表示每 `1` 秒输出 `1` 张图片，`round=zero` 为时间戳向 `0` 取整。
  `start_time=0` 是让它从第 `0` 秒开始截取。
- `scale=160x90` 设置输出图像分辨率大小，`tile=5x4` 将小图用 `5 x 4` 的方式组合在一起。
- `t%d.jpg` 就是文件名，%d 表示按数字递增。

图片生成后，配置如下就可以：

```js
new Player({
  // ...其他配置
  thumbnail: {
    col: 5,
    row: 4,
    startSecond: 0,
    gapSecond: 1,
    images: [
      '/thumbnails/t1.jpg', // 目录根据自己放的位置来重写
    ],
  },
})
```

::: warning 警示
如果你传入的 `thumbnail.images` 配置时空数组，将不会展示小缩略图的框，所以一旦传入，请务必保证图是可访问的。
:::
