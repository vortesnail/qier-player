export class Player {
  print() {
    console.log('Welcome to use qier-player!');
  }

  create() {
    const videoElement = document.createElement('div');
    videoElement.className = 'qier-player';
    document.body.appendChild(videoElement);
  }

  static Player = Player;
}
