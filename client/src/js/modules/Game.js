import { io } from 'socket.io-client';

class Game {
  constructor() {
    this.connect();
    this.history = null;
    this.states = null;
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

  waiting({ room }) {
    this.room = room;

    console.log(this.states);

    const [, setCode] = this.states['code'];

    setCode(room);

    this.history.push('/loading');
  }

  updateWaiting(data) {
    console.log('Updating waiting', data);
  }

  createGame(player) {
    this.socket.emit('createGame', player);
  }

  joinToGame(room, player) {
    const data = { room, player };

    this.socket.emit('joinToGame', data);
  }
}

export { Game };
