window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#root');

  // QierPlayer.I18n.setCurrentLang('en-US');
  const player = new QierPlayer.Player({
    // container: rootEle,
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    // src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
    // src: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm',
    videoProps: {},
    themeColor: '#1890ff',
    progressOptions: {
      playedBg: '#1890ff',
      // buffBg: '#000',
      indicator: false,
    },
    thumbnail: {
      col: 2,
      row: 2,
      startSecond: 0,
      gapSecond: 2,
      images: [
        'qier-player/M1.jpg',
        'qier-player/M2.jpg',
        'qier-player/M3.jpg',
        'qier-player/M4.jpg',
        'qier-player/M5.jpg',
        'qier-player/M6.jpg',
        'qier-player/M7.jpg',
        'qier-player/M8.jpg',
      ],
    },
  });

  player.mount(rootEle);
  // player.volume = 0.5;
  // player.play();
};
