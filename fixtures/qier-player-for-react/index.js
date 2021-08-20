window.onload = function () {
  const e = React.createElement;
  console.log(QierPlayerForReact);

  ReactDOM.render(
    e(QierPlayerForReact, {
      style: { width: '100%', height: '100%' },
      className: 'videoaaaaaaaa',
      options: { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    }),
    document.querySelector('#app'),
  );
};
