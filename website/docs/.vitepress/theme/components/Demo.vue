<template>
  <div :class="['outer', { simple: simple }]">
    <h2 v-if="!simple" class="title">{{ TITLE_MAP[lang].title }}</h2>
    <div :class="['content', { simple: simple }]">
      <div ref="playerContainerRef" class="player-container"></div>
      <div v-if="!simple" class="danmu-container">
        <input class="danmu-input" type="text" @input="handleDanmuTextChange" :value="danmuText" :placeholder="TITLE_MAP[lang].danmuPlaceholder"/>
        <input class="danmu-color" type="color" @change="handleDanmuColorChange" :value="danmuColor" />
        <button @click="handleSendDanmu">{{ TITLE_MAP[lang].send }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, withDefaults } from 'vue';
import { useData } from 'vitepress';
// import Player, { I18n, Popover, EVENT } from 'qier-player';
// import Danmaku from '@qier-player/danmaku';
import type { RawDanmu } from '@qier-player/danmaku/dist/es/main/types';
import { danmusData } from './danmus'

const TITLE_MAP = {
  'zh-CN': {
    title: '在线演示',
    send: '发送弹幕',
    danmuPlaceholder: '请输入弹幕'
  },
  'en-US': {
    title: 'Online Demo',
    send: 'Send Danmu',
    danmuPlaceholder: 'Please input content'
  },
};

interface Props {
  simple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  simple: false,
})

const playerContainerRef = ref();
const player = ref<any>(null);
const PlayerClass = ref<any>(null);
const I18nClass = ref<any>(null);
const PopoverClass = ref<any>(null);
const EVENTClass = ref<any>(null);
const DanmakuClass = ref<any>(null);
const danmaku = ref<any>(null);

const { isDark, lang } = useData();
const danmuText = ref<string>('')
const danmuColor = ref<string>('#0abbed')

const initPlayer = () => {
  const pip = {
    html: '画中画',
    init() {
      // 初始化是判断浏览器是否不支持画中画，不支持则隐藏该菜单项
      this.hidden = !document.pictureInPictureEnabled;
    },
    show(player, item) {
      item.checked = document.pictureInPictureElement === player.video;
    },
    click(player, menuItem) {
      if (player.video.readyState < 3) return; // 视频还没加载成功
      if (document.pictureInPictureElement !== player.video) {
        player.video.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
        menuItem.checked = false;
      }
      this.show(player, menuItem);
    },
  };

  const screenshot = {
    html: '截图',
    click(player) {
      const canvas = document.createElement('canvas')
      canvas.width = player.video.videoWidth
      canvas.height = player.video.videoHeight
      canvas.getContext('2d')?.drawImage(player.video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
          let dataURL = URL.createObjectURL(blob!)
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

  const quantity = {
    el: document.createElement('div'),
    init(player) {
      const quantities: { id: string, label: string, checked: boolean, dom: null | HTMLElement }[] = [
        {
          id: '1080p',
          label: '1080p HD',
          checked: true,
          dom: null
        },
        {
          id: '720p',
          label: '720p',
          checked: false,
          dom: null
        },
        {
          id: '480p',
          label: '480p',
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

      this.popover = new PopoverClass.value(this.el)
      this.el.addEventListener('mouseenter', () => {
        this.stuffing.style.display = 'block'
        this.popover.show()
        // 这段代码是通知其他弹框应该立即消失
        player.emit(EVENTClass.value.POPOVER_SHOW_CHANGE);
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
        if (item.checked) {
          quantityItem.classList.add('qier-player_controller_quantity_item--active')
        }

        quantityItem.setAttribute('data-id', item.id)
        quantityItem.innerText = item.label
        item.dom = quantityItem
        quantityWrapper.appendChild(quantityItem)

        quantityItem.addEventListener('click', (e) => {
          e.stopPropagation()
          if (e?.target) {
            const targetDom = e.target as HTMLElement
            const id = targetDom.getAttribute('data-id')
            const checkedItem = quantities.find(item => item.id === id!)!
            if (!checkedItem.checked) {
              quantities.forEach(item => {
                item.checked = false
                item.dom?.classList.remove('qier-player_controller_quantity_item--active')
              })
              checkedItem.checked = true
              item.dom?.classList.add('qier-player_controller_quantity_item--active')
              this.btn.textContent = item.label
              player.video.src = `/qier-player/test-video_${item.id}.mp4`
            }
          }
        })
      })

      this.popover.panelEl.appendChild(quantityWrapper);
    }
  }

  player.value = new PlayerClass.value({
    src: '/qier-player/test-video_1080p.mp4',
    menus: ['loop', pip, screenshot],
    controller: {
      progress: ['progress'],
      eles: ['play', 'time', 'spacer', quantity, 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
    },
    thumbnail: {
      col: 5,
      row: 4,
      startSecond: 0,
      gapSecond: 1,
      images: [
        '/thumbnails/t1.jpg',
      ],
    },
  });

  player.value.mount(playerContainerRef.value);

  player.value?.on(EVENTClass.value.TIME_UPDATE, () => {
    if (danmaku.value && player.value) {
      const curDanmus = danmusData.filter(d => {
        return d.timestatamp >= player.value!.currentTime &&
          d.timestatamp - player.value!.currentTime <= 0.4
      })
      curDanmus.forEach(d => {
        const danmuObj: RawDanmu = {
          text: d.text,
          color: d.color
        }
        danmaku.value!.add(danmuObj, d.position)
        d.checked = true
      })
    }
  })

  if (!props.simple) {
    initDanmaku();
  }
};

const initDanmaku = () => {
  if (!player.value) return
  // 创建弹幕的容器
  const danmuWrapper = document.createElement('div');
  danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;';
  player.value.el.appendChild(danmuWrapper);

  danmaku.value = new DanmakuClass.value(danmuWrapper, {
    // @ts-ignore
    eventProxyElement: danmuWrapper,
    duration: 15000
  })

  player.value.on(EVENTClass.value.PLAY, () => {
    danmaku.value?.start();
  });

  player.value.on(EVENTClass.value.PAUSE, () => {
    danmaku.value?.stop();
  });
}

onMounted(() => {
  import('qier-player').then((m1) => {
    const { Player, I18n, Popover, EVENT } = m1
    import('@qier-player/danmaku').then((m2) => {
      PlayerClass.value = Player
      I18nClass.value = I18n
      PopoverClass.value = Popover
      EVENTClass.value = EVENT
      DanmakuClass.value = m2.default
      initPlayer();
    })
  })
});

watch(
  () => lang.value,
  () => {
    if (I18nClass.value) {
      I18nClass.value.setCurrentLang(lang.value);
      if (player.value) {
        player.value.dispose();
        player.value = null;
        initPlayer();
      }
    }
  },
  {
    immediate: true,
  },
);

const handleSendDanmu = () => {
  if (danmaku.value && danmuText.value) {
    const danmuObj: RawDanmu = {
      text: danmuText.value,
      color: danmuColor.value
    }
    danmaku.value.add(danmuObj, 'rolling')
    danmuText.value = ''
  }
};

const handleDanmuTextChange = (e) => {
  danmuText.value = e.target.value
};

const handleDanmuColorChange = (e) => {
  danmuColor.value = e.target.value
};
</script>

<style scoped>
.outer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.outer.simple {
  margin: 0;
}

.title {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
}

.content {
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.content.simple {
  padding: 0;
}

.player-container {
  max-width: 1152px;
  flex: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
}

.danmu-container {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #000;
  height: 50px;
  padding-left: 10px;
  color: #fff;
}

.danmu-container .danmu-input {
  flex: 1;
  background-color: hsla(0, 0%, 100%, .1);
  margin-right: 10px;
  height: 36px;
  font-size: 14px;
  padding: 0 8px;
  border-radius: 1px;
}

.danmu-container .danmu-color {
  margin-right: 10px;
  height: 44px;
  width: 40px;
  border: 0;
}

.danmu-container button {
  width: 120px;
  height: 36px;
  background-color: var(--theme-color);
  border-radius: 1px;
}

.danmu-container button:hover {
  background-color: var(--c-blue-2);
}

:deep(.qier-player_controller_quantity) {
  position: relative;
  height: 100%;
  padding: 6px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
}

:deep(.qier-player_controller_quantity_item) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  width: 128px;
  position: relative;
}

:deep(.qier-player_controller_quantity_item:hover) {
  color: var(--theme-color);
  background: rgba(255, 255, 255, 0.2);
}

:deep(.qier-player_controller_quantity_item--active) {
  color: var(--theme-color);
}

:deep(.qier-player_controller_quantity_item--active::before) {
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

:deep(.qier-player_controller_quantity_stuffing) {
  position: absolute;
  bottom: 100%;
  left: 0;
  display: none;
  width: 100%;
  padding: 20px 0;
}
</style>
