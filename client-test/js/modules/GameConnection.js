class GameConnection {
  constructor(game) {
    this.game = game;
    this.socket = io();
  }

  bindingEvents() {
    this.socket.on('connected', () => this.onConnected());
    this.socket.on('newGameCreated', () => this.onNewGameCreated());
  }

  onConnected() {
    this.id = this.socket.id;
  }

  onNewGameCreated() {
    this.game.waiting();
  }
}
