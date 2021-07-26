window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#root');

  const player = new QierPlayer.Player({
    // container: rootEle,
    src: 'https://v-cdn.zjol.com.cn/280443.mp4',
    videoProps: {
      width: 720,
      height: 480,
    },
  });

  player.mount(rootEle);
  player.play();
};
