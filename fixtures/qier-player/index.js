window.onload = function () {
  // console.log(QierPlayer);
  const rootEle = document.querySelector('#root');

  const player = new QierPlayer.Player({
    // container: rootEle,
    src: 'https://v-cdn.zjol.com.cn/280443.mp4',
    // src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
    // src: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm',
    videoProps: {},
  });

  player.mount(rootEle);
  // player.play();
};
