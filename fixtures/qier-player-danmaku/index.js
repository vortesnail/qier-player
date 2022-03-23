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
  danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0';
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
    text: 'i am vortesnail',
    color: '#1890ff',
  });
};
