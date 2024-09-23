# Quantity Switching {#screen-shot}

When your video is in the `.m3u8` streaming format, you can use hls.js to switch the quality directly on the client side. However, for the `.mp4` container format, you need to prepare multiple video sources of different qualities for users to switch between.

::: tip Tip
Typically, after a user uploads a high-definition video to the website's server, tools like FFmpeg can be used to re-encode and generate videos of different qualities and bitrates.
:::

For example, here are three different quality versions of a video that I have prepared:

```
test-video_1080p.mp4
test-video_720p.mp4
test-video_480p.mp4
```

Then, you can implement this by creating a custom controller item:

```js
import Player from 'qier-player'

const quantity = {
  el: document.createElement('div'),
  init(player) {
    const quantities = [
      {
        id: '1080p',
        label: '1080p HD',
        checked: true,
        dom: null
      },
      {
        id: '720p',
        label: '720p Clear',
        checked: false,
        dom: null
      },
      {
        id: '480p',
        label: '480p Smooth',
        checked: false,
        dom: null
      },
    ]

    this.btn = document.createElement('div')
    this.btn.textContent = quantities[0].label
    this.el.appendChild(this.btn)
    // Filling to prevent loss of popover when cursor leaves the control item
    this.stuffing = document.createElement('div')
    this.stuffing.classList.add('qier-player_controller_quantity_stuffing')
    this.el.appendChild(this.stuffing)

    this.popover = new Popover(this.el)
    this.el.addEventListener('mouseenter', () => {
      this.stuffing.style.display = 'block'
      this.popover.show()
      // This code notifies other popovers to hide immediately
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
            // Note: Changing the src of the video tag this way is not ideal and has bugs. This will be fixed later with an update method.
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

Style code:

```css
.qier-player_controller_quantity {
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
