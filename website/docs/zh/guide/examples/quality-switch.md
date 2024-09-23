# 画质切换 {#screen-shot}

当你的视频是 `.m3u8` 这种流媒体格式，可以使用 hls.js 直接在客户端进行清晰度的切换，而对于 `.mp4` 这种容器格式，我们就要准备多个清晰度的视频源，以供用户切换。

::: tip 提示
一般用户上传一个高清的视频到视频网站的服务端后，可以使用比如 FFmpeg 这种工具来重新编解码生成不同清晰度、码率的视频。
:::

比如我现在准备的视频有以下三种清晰度的视频：

```
test-video_1080p.mp4
test-video_720p.mp4
test-video_480p.mp4
```

然后通过自定义一个控制器项来实现：

```js
import Player from 'qier-player'

const quantity = {
  el: document.createElement('div'),
  init(player) {
    const quantities = [
      {
        id: '1080p',
        label: '1080p 高清',
        checked: true,
        dom: null
      },
      {
        id: '720p',
        label: '720p 清晰',
        checked: false,
        dom: null
      },
      {
        id: '480p',
        label: '480p 流畅',
        checked: false,
        dom: null
      },
    ]

    this.btn = document.createElement('div')
    this.btn.textContent = quantities[0].label
    this.el.appendChild(this.btn)
    // 填充以防光标离开控制项弹框就丢失
    this.stuffing = document.createElement('div')
    this.stuffing.classList.add('qier-player_controller_quantity_stuffing')
    this.el.appendChild(this.stuffing)

    this.popover = new Popover(this.el)
    this.el.addEventListener('mouseenter', () => {
      this.stuffing.style.display = 'block'
      this.popover.show()
      // 这段代码是通知其他弹框应该立即消失
      player.emit(EVENT.POPOVER_SHOW_CHANGE);
    })
    this.el.addEventListener('mouseleave', () => {
      this.stuffing.style.display = 'none'
      this.popover.hide()
    })
    this.el.classList.add('qier-player_controller_quantity')

    const quantityWrapper = document.createElement('div')

    quantities.forEach((item) => {
      const quantityItem = document.createElement('div')
      quantityItem.classList.add('qier-player_controller_quantity_item')
      quantityItem.setAttribute('data-id', item.id)
      quantityItem.innerText = item.label
      item.dom = quantityItem
      quantityWrapper.appendChild(quantityItem)

      quantityItem.addEventListener('click', (e) => {
        e.stopPropagation()
        if (e.target) {
          const targetDom = e.target as HTMLElement
          const id = targetDom.getAttribute('data-id')
          const checkedItem = quantities.find(item => item.id === id)
          if (!checkedItem.checked) {
            quantities.forEach(item => {
              item.checked = false
              item.dom.classList.remove('qier-player_controller_quantity_item--active')
            })
            checkedItem.checked = true
            item.dom.classList.add('qier-player_controller_quantity_item--active')
            this.btn.textContent = item.label
            // 提示：这里使用 video 标签更改 src 的方式不友好，还有 bug，后续会修复，提供一个更新的方法
            player.video.src = `/test-video_${item.id}.mp4`
          }
        }
      })
    })

    this.popover.panelEl.appendChild(quantityWrapper);
  }
}

const player = new Player({
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', quantity, 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
})

player.mount(document.body)
```

样式代码：

```css
.qier-player_controller_quantity) {
  position: relative;
  height: 100%;
  padding: 6px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
}

.qier-player_controller_quantity_item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  width: 128px;
  position: relative;
}

.qier-player_controller_quantity_item:hover {
  color: var(--theme-color);
  background: rgba(255, 255, 255, 0.2);
}

.qier-player_controller_quantity_item--active {
  color: var(--theme-color);
}

.qier-player_controller_quantity_item--active::before {
  margin-right: 16px;
  margin-bottom: 4px;
  margin-left: 10px;
  opacity: 1;
  content: '';
  display: inline-block;
  width: 5px;
  height: 12px;
  border-right: 1px solid var(--theme-color);
  border-bottom: 1px solid var(--theme-color);
  transform: rotate(45deg);
  position: absolute;
  left: 4px;
}

.qier-player_controller_quantity_stuffing {
  position: absolute;
  bottom: 100%;
  left: 0;
  display: none;
  width: 100%;
  padding: 20px 0;
}
```
