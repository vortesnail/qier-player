# 镜像画面 {#mirroring}

添加设置菜单项来控制是否将画面镜像的功能：

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

样式代码：

```css
.qier-player_video_mirroring {
  transform: scaleX(-1);
}
```
