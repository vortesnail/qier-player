# 视频截图 {#screen-shot}

视频截图是常用的功能之一，接下来演示通过右键菜单采集当前帧进行截图功能：

```js
import Player from 'qier-player'

const screenshot = {
  html: '截图',
  click(player) {
    const canvas = document.createElement('canvas')
    canvas.width = player.video.videoWidth
    canvas.height = player.video.videoHeight
    canvas.getContext('2d').drawImage(player.video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      let dataURL = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = dataURL
      link.download = `qier-player.${player.currentTime}.jpg`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(dataURL)
    })
  }
}

const player = new Player({
  menus: ['loop', screenshot],
})

player.mount(document.body)
```

当然你也可以通过服务端的相关工具（比如 `ffmpeg`）来进行截图，生成可访问的 `url` 来返回给用户进行下载。
