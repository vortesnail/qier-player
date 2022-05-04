window.onload = function () {
  const danmus = [
    {
      text: '在干嘛？',
      color: '#fff',
    },
    {
      text: '睡不着',
      color: '#fff',
    },
    {
      text: '压力太大了，现在的年轻人',
      color: '#fff',
    },
    {
      text: '我是说在座的各位都是好样的',
      color: '#fff',
    },
    {
      text: '大家有没有想过一个很严重的问题，就是非常严重的那种！',
      color: '#0f0',
    },
    {
      text: '我每天晚上都失眠，不知道该怎么办了。',
      color: '#fff',
    },
    {
      text: '生活是美好的，只属于少部分人',
      color: '#00f',
    },
    {
      text: '大家不要那么悲观嘛，撸起袖子加油干，要学会感恩啊。',
      color: '#f00',
    },
    {
      text: '啊啊啊啊啊啊啊啊，我快笑死了。',
      color: '#0f0',
    },
    {
      text: '无敌是多么寂寞啊',
      color: '#0f0',
    },
    {
      text: '不想上班吃什么？',
      color: '#0f0',
    },
    {
      text: '哈哈哈哈哈哈哈哈哈哈哈哈',
      color: '#0f0',
    },
    {
      text: '这个游戏实在是太完美了',
      color: '#f00',
    },
    {
      text: '我们都是同一条船的人了',
      color: '#fff',
    },
    {
      text: '真的没啥好说的',
      color: '#fff',
    },
    {
      text: '不是很清楚你们在想什么，好好做人不好嘛？',
      color: '#fff',
    },
    {
      text: '建议去看心理医生',
      color: '#fff',
    },
    {
      text: '人生得意须尽欢，莫使金樽空对月',
      color: '#fff',
    },
    {
      text: '如果有的选，我不想再来这个世界',
      color: '#fff',
    },
    {
      text: '加油，奥利给',
      color: '#fff',
    },
    {
      text: '要相信有光！',
      color: '#0f0',
    },
    {
      text: '起飞',
      color: '#0f0',
    },
    {
      text: '大家好啊，我是渣渣辉',
      color: '#fff',
    },
    {
      text: '如果有一天，我老无所依',
      color: '#fff',
    },
    {
      text: '写代码能创造什么价值',
      color: '#fff',
    },
    {
      text: '快乐时光就要开始啦！',
      color: '#fff',
    },
  ];

  console.log(QierPlayer);
  const { Player, EVENT } = QierPlayer;
  const rootEle = document.querySelector('#app');

  const player = new Player({
    src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
    // src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  });

  player.mount(rootEle);

  // 创建弹幕的容器
  const danmuWrapper = document.createElement('div');
  danmuWrapper.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;';
  player.el.appendChild(danmuWrapper);

  // 弹幕实例
  const danmaku = new QierPlayerDanmaku(danmuWrapper, {
    eventProxyElement: danmuWrapper,
  });

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

  const genDanmu = (time, danmu) => {
    if (!danmu) return;
    setTimeout(() => {
      danmaku.add(danmu, 'fixed-bottom');
    }, time);
  };

  setInterval(() => {
    for (let i = 0; i < Math.random() * 2; i++) {
      const danmu = danmus.shift();
      genDanmu(Math.random() * 2 * 1000, danmu);
    }
  }, 1000);

  danmaku.on('click', (danmu, ele) => {
    console.log(danmu, ele);
  });
};
