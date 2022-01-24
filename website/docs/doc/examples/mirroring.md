---
title: Video Mirroring
order: 3
group:
  title: Examples
  order: 100
---

# Video Mirroring

Added settings menu item to control whether or not to mirror the screen.

```js
const classMirroring = 'video_mirroring';

const MirroringSettingItem = () => ({
  id: 'mirroring',
  type: 'switch',
  html: 'Mirroring',
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

Simple css style.

```css
.qier-player_video_mirroring {
  transform: scaleX(-1);
}
```
