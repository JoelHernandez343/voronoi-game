class Game {
  constructor() {}

  connect() {
    this.socket = io();
  }

  bindingEvents() {
    this.socket.on('connected', () => (this.id = this.socket.id));
    this.socket.on('newGameCreated', data => this.waiting(data));
    this.socket.on('playerJoinedRoom', data => this.updateWaiting(data));
  }

  waiting(data) {
    console.log('We are waiting', data);
  }

  updateWaiting(data) {
    console.log('Updating waiting', data);
  }

  createGame() {
    data = {
      playerId: 'Joelcito123',
    };

    this.socket.emit('createGame', data);
  }

  joinToGame() {
    data = {
      playerId: 'Rebeca',
      room: '1234',
    };

    this.socket.emit('joinToGame', data);
  }
}
