window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#app');

  const player = new QierPlayer.Player({
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  });

  player.mount(rootEle);

  // 创建弹幕的容器
  const danmuWrapper = document.createElement('div');
  danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0';
  player.el.appendChild(danmuWrapper);

  // 弹幕实例
  const danmaku = new QierPlayerDanmaku(danmuWrapper, {});
};
