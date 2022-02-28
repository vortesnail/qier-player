window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#app');

  const player = new QierPlayer.Player({
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  });

  player.mount(rootEle);
};
