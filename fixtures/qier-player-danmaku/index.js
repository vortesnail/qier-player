window.onload = function () {
  console.log(QierPlayer);
  const { Player, EVENT } = QierPlayer;
  const rootEle = document.querySelector('#app');

  const player = new Player({
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  });

  player.mount(rootEle);

  // 创建弹幕的容器
  const danmuWrapper = document.createElement('div');
  danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;';
  player.el.appendChild(danmuWrapper);

  // 弹幕实例
  const danmaku = new QierPlayerDanmaku(danmuWrapper, {});

  // setInterval(() => {
  //   danmaku.add({
  //     text: 'i am vortesnail',
  //     color: '#1890ff',
  //   });
  // }, 3000);

  player.on(EVENT.PLAY, () => {
    danmaku.start();
  });

  player.on(EVENT.PAUSE, () => {
    danmaku.stop();
  });

  danmaku.add({
    text: '耐高温是要干嘛？',
    color: '#fff',
  });

  danmaku.add({
    text: '小哥哥你好啊',
    color: '#fff',
  });

  danmaku.add({
    text: '不想再写代码了，想躺平',
    color: '#fff',
  });

  danmaku.add({
    text: '我的天呐',
    color: '#fff',
  });

  danmaku.add({
    text: '我是个彩色弹幕',
    color: '#1890ff',
  });

  danmaku.add({
    text: '哈哈哈哈哈哈笑死了',
    color: '#1890ff',
  });

  danmaku.add({
    text: '你去大西瓜',
    color: '#0f0',
  });

  setTimeout(() => {
    danmaku.add({
      text: '我爱你',
      color: '#0f0',
    });
  }, 5000);
};
