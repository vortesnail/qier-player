# Video Screenshot {#screen-shot}

Video screenshots are one of the commonly used features. Here’s how to capture the current frame for a screenshot using the right-click menu:

```js
import Player from 'qier-player'

const screenshot = {
  html: 'Screenshot',
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

Of course, you can also use server-side tools (like `ffmpeg`) to take screenshots and generate accessible `URLs` for users to download.
