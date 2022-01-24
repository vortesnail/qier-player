---
title: 镜像画面
order: 3
group:
  title: 例子
  order: 100
---

# 镜像画面

添加设置菜单项来控制是否将画面镜像的功能。

```js
const classMirroring = 'video_mirroring';

const MirroringSettingItem = () => ({
  id: 'mirroring',
  type: 'switch',
  html: '镜像画面',
  checked: false,
  init(player) {
    player.video.classList.remove('qier-player_video_mirroring');
  },
  change(value, player) {
    player.video.classList.toggle('qier-player_video_mirroring', value);
  },
});

const player = new Player({
  settings: [MirroringSettingItem, 'speed'],
});
player.mount(document.body);
```

简单样式。

```css
.qier-player_video_mirroring {
  transform: scaleX(-1);
}
```
