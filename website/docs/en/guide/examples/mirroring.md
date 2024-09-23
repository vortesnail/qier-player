# Mirroring {#mirroring}

Add a setting menu item to control the mirror image feature:

```js
const classMirroring = 'video_mirroring';

const MirroringSettingItem = () => ({
  id: 'mirroring',
  type: 'switch',
  html: 'Mirror Image',
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

Style code:

```css
.qier-player_video_mirroring {
  transform: scaleX(-1);
}
```
