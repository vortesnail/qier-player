# Video Thumbnail {#thumbnail}

Most mainstream video platforms now support a feature that displays a thumbnail of the video content when the cursor hovers over a specific position on the video progress bar. This helps users quickly locate the desired content. QierPlayer also supports this configuration.

Thumbnails in QierPlayer are configured using the `thumbnail` parameter, structured as follows:

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

The default values are as follows:

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

Next, we will explain how to understand the above configuration and apply it in practice.

## Principle {#principle}

In frontend image performance optimization, we often use **sprites** to combine multiple images, reducing the number of HTTP requests. The thumbnails for our videos effectively extract many frames from the video and combine them into sprite images.

The position of the displayed image is calculated based on the cursor's position in time (using CSS background positioning), and the above configuration provides information about the positions and dimensions of the individual frame images.

Let's take a look at the image below:

<img src="/thumbnails/t1.jpg" />

We can see that this sprite is composed of `5 x 4` small thumbnails; a video may have multiple sprite images.

| Parameter   | Description       |
| ----------- | ----------------- |
| startSecond | The starting time for thumbnail creation; for example, if the thumbnail starts at `0` seconds, this will be `0`. |
| gapSecond   | The time span for each small thumbnail; if one is captured every `1` second, this will be `1`. |
| col         | The number of columns in the sprite.   |
| row         | The number of rows in the sprite.   |
| width       | The width of each small thumbnail.   |
| height      | The height of each small thumbnail.  |
| images      | An array of URLs for the sprite images. |

## Creating Thumbnails {#make-thumbnails}

Generally, after a user uploads a video to the server, the thumbnail generation is handled server-side. For Java, you can use [FFmpeg](https://www.ffmpeg.org/) or [JavaCV](https://github.com/bytedeco/javacv); for Node, you can use [Fluent ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

To make things easier, we will introduce how to use FFmpeg via the command line to create video thumbnails.

::: tip Powerful Audio and Video Processing Tool
FFmpeg is an open-source, cross-platform audio and video processing tool that can be used for recording, converting, editing, and more. It supports nearly all common audio and video formats and can perform a variety of operations, including encoding, decoding, packaging, unpackaging, cutting, merging, compressing, transcoding, and extracting audio.

In short, FFmpeg is a rich-featured, powerful, and flexible tool for audio and video processing, and many players use it as their core.
:::

First, go to the [FFmpeg official website](https://www.ffmpeg.org/download.html) to download and install it, making sure to select the right version for your system (for example, if you are using macOS, select macOS). Once downloaded, you will have a command-line tool (you can also quickly install it via `brew install ffmpeg`). Open the tool.

Then, execute the following command in the terminal:

```sh
ffmpeg -i ./test-video.mp4 -vf 'fps=1/1:round=zero:start_time=0,scale=160x90,tile=5x4' t%d.jpg
```

This command generates a `5 x 4` sprite image with small thumbnails sized at `160 x 90`. The sprite file is named `t1.jpg`.

::: warning Note
The demo video is only `17` seconds long. If a sprite is generated every `1` second, and the sprite specification is `5` columns and `4` rows, only one `t1.jpg` will be created. If the video is long enough, multiple sprites will be generated: `t1.jpg`, `t2.jpg`, `t3.jpg`, `t4.jpg...`
:::

Explanation of the command parameters:

- `-i` specifies the video file.
- `-vf` is followed by the filter; multiple filters are separated by `,`, and multiple parameters for a filter are separated by `:`.
- `fps=1/1` means to output `1` image every `1` second, `round=zero` rounds the timestamp to `0`. `start_time=0` starts capturing from `0` seconds.
- `scale=160x90` sets the output image resolution, and `tile=5x4` arranges the small images in a `5 x 4` grid.
- `t%d.jpg` specifies the file name, with `%d` indicating a numeric increment.

After generating the images, you can configure them as follows:

```js
new Player({
  // ...other configurations
  thumbnail: {
    col: 5,
    row: 4,
    startSecond: 0,
    gapSecond: 1,
    images: [
      '/thumbnails/t1.jpg', // Adjust the directory based on your placement
    ],
  },
})
```

::: warning Caution
If you pass an empty array to `thumbnail.images`, the small thumbnail frames will not display, so once you do pass it, please ensure the images are accessible.
:::
