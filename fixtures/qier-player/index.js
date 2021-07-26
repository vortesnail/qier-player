window.onload = function () {
  console.log(QierPlayer);
  const rootEle = document.querySelector('#root');

  const player = new QierPlayer.Player({
    container: rootEle,
  });
};
