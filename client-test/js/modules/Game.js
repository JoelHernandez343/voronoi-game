class Game {
  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io();
    this.bindingEvents();
  }

  bindingEvents() {
    this.socket.on('connected', data => console.log(data));
    this.socket.on('newGameCreated', data => this.waiting(data));
    this.socket.on('playerJoinedRoom', data => this.updateWaiting(data));
    this.socket.on('error', data => console.log(data));
  }

  waiting(data) {
    console.log('We are waiting', data);
  }

  updateWaiting(data) {
    console.log('Updating waiting', data);
  }

  createGame(player) {
    const data = { player };

    this.socket.emit('createGame', data);
  }

  joinToGame(room, player) {
    const data = { room, player };

    this.socket.emit('joinToGame', data);
  }
}

export { Game };
