window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#root');

  // const customSpinner = document.createElement('div');
  // customSpinner.innerText = 'I am spinner.';

  // QierPlayer.I18n.setCurrentLang('en-US');

  // function createIcon(html, noCls) {
  //   const div = document.createElement('div');
  //   div.innerHTML = html;
  //   if (!noCls) div.classList.add('qier-player_icon');
  //   return (cls) => {
  //     if (cls) {
  //       div.classList.add(cls);
  //     }
  //     return div;
  //   };
  // }

  // const full = `<svg t="1629012136356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1558" width="24" height="24"><path d="M635.74473493 467.23103573l94.7739808 0 0 76.34792-94.7739808 0 0-76.34792Z" p-id="1559"></path><path d="M635.74473493 351.38731627l94.7739808 0 0 73.71406613-94.7739808 0 0-73.71406613Z" p-id="1560"></path><path d="M496.19633173 467.23103573l92.1412192 0 0 76.34792-92.1412192 0 0-76.34792Z" p-id="1561"></path><path d="M817.13135253 35.50933867L206.86755627 35.50933867c-87.29484053 0-158.0847072 73.42262933-158.0847072 163.99532373L48.782848 814.4227296c0 90.5923424 72.3572992 174.06793173 161.66273173 174.06793173l603.08591787 0c89.30543253 0 161.68237973-83.49523627 161.68237973-174.06793173L975.21387733 199.50466347C975.21496853 108.9330592 904.44693227 35.50933867 817.13135253 35.50933867zM543.5838688 193.41285333c12.26330133 22.82927893 24.56808107 52.65415253 36.87176853 89.51718934-15.80312213 5.26770773-33.37342613 12.30368747-52.67489173 21.05991466-7.0359808-31.59423787-17.550656-60.55571307-31.58550507-86.88333546L543.5838688 193.41285333zM393.5218816 590.977408l-10.5343232 123.7441888c-3.5387296 35.10349547-18.89869227 56.15358613-46.0809792 63.21030613-27.22158187 6.97703787-54.88632427 12.2436544-82.9331008 15.78238294-3.5387296-22.83910293-9.66983467-44.76350613-18.4358848-65.8234208 40.370112 1.76827307 66.68790933 1.3163808 78.99268907-1.31747307 12.2436544-2.63385387 19.2807264-14.47582613 21.05009066-35.54447253l10.5343232-131.6468416L219.73556373 559.38207893c6.99668587-56.16231893 10.5343232-116.708208 10.5343232-181.67696426l118.49831254 0 0-97.40783467c-57.9415072 0-103.60006507 0.90487573-136.91454934 2.63385387l0-47.39736c28.04677653 1.77918827 55.2880064 2.63385387 81.60580374 2.63385386l105.33013546 0c-1.76936427 28.10681067-2.65459307 56.20270507-2.65459306 84.2494816 0 28.09698667 0.88522773 60.56553707 2.65459306 97.42857387L277.67816213 419.8456832l-5.26770773 94.784896 128.99224853 0C397.8639744 539.217216 395.25085973 564.63996267 393.5218816 590.977408zM817.4129664 698.92938987c-35.1427904-1.71915413-64.9589312-2.63385387-89.52701227-2.63385387l-92.1412192 0c0 40.4017664 0.8437504 78.98177387 2.63385387 115.85463467l-52.65415253 0c1.72897813-40.40940693 2.61420587-78.99159787 2.61420586-115.85463467l-102.6755424 0c-28.08607147 1.78027947-52.65415253 3.5387296-73.72389013 5.27753067l0-50.03012267c21.06973867 1.75844907 45.63781867 3.5278144 73.72389013 5.25679253l102.6755424 0 0-71.09112853L443.54218027 585.70860907c1.72897813-43.84880747 2.63385387-91.24616747 2.63385386-142.1713408 0-50.8957024-0.90487573-94.784896-2.63385386-131.6457504l192.20255466 0c15.80312213-36.8619456 29.8150496-74.57964693 42.13947627-113.221872 19.2610784 8.80643627 39.46523627 16.70799787 60.53606613 23.70468373-17.5724864 19.33093653-34.21935893 49.15580907-50.02138986 89.51718933l92.1412192 0c-1.76936427 33.36251093-2.63385387 78.11619307-2.63385387 134.26978027 0 56.19288107 0.8644896 102.6853664 2.63385387 139.5484032L635.74473493 585.70970027l0 71.09112853 89.50736534 0c22.7987168 0 53.51864107-0.8644896 92.16086613-2.63385387L817.4129664 698.92938987z" p-id="1562"></path><path d="M496.19633173 351.38731627l92.1412192 0 0 73.71406613-92.1412192 0 0-73.71406613Z" p-id="1563"></path></svg>`;
  // const registerIcon = QierPlayer.Player.Icon.register;
  // registerIcon('enterFullscreen', createIcon(full));

  const pip = {
    html: '画中画',
    init() {
      // 初始化是判断浏览器是否不支持画中画，不支持则隐藏该菜单项
      this.hidden = !document.pictureInPictureEnabled;
    },
    show(player, item) {
      item.checked = document.pictureInPictureElement === player.video;
    },
    click(player, menuItem) {
      if (player.video.readyState < 3) return; // 视频还没加载成功
      if (document.pictureInPictureElement !== player.video) {
        player.video.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
        menuItem.checked = false;
      }
      this.show(player, menuItem);
    },
  };

  const control = {
    id: 'control',
    tip: '控制项',
    init(player) {
      const textDom = document.createElement('span');
      textDom.innerText = '控';
      this.el.appendChild(textDom);
    },
  };

  const player = new QierPlayer.Player({
    // container: rootEle,
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    // src: 'https://vortesnail.github.io/qier-player/test-video_1080p.mp4',
    // src: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm',
    // src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    videoProps: {},
    // themeColor: '#1890ff',
    posterOptions: {
      disabled: false,
      url: 'https://img1.baidu.com/it/u=202515423,1882536880&fm=26&fmt=auto&gp=0.jpg',
      // autoFill: false,
      // bgColor: '#000',
    },
    loadingOptions: {
      disabled: true,
      // spinner: customSpinner,
      // type: 'wave',
    },
    controller: {
      progress: ['progress'],
      eles: ['play', 'time', 'spacer', 'volume', 'settings', control, 'web-fullscreen', 'fullscreen'],
    },
    progressOptions: {
      // playedBg: '#1890ff',
      // buffBg: '#000',
      indicator: true,
    },
    // settings: [{ html: '切换', type: 'switch' }, 'mirroring', 'speed'],
    menus: ['loop', pip],
    // showDefaultMenu: false,
    shortcutOptions: {
      disabled: false,
      toastDelay: 500,
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

  player.registerMenuItem(pip, 'pip');
  const pipa = player.getMenuItem('pip');

  if (pipa) {
    pipa.disabled = true;
    pipa.html = '画中画（已被禁用）';
  }
  console.log(player);
  // player.volume = 0.5;
  // player.play();

  // player.updateControllerEles(['play', 'spacer', 'settings'], 'eles');

  // 注册
  player.registerControllerEle(control, 'control');
  // 获取
  const controla = player.getControllerEle('control');

  if (controla) {
    console.log(controla);
  }

  console.log(player.getControllerEle('play'));
};
