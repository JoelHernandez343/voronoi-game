import { io } from 'socket.io-client';
import Board from './Board';

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
    this.socket.on('beginGame', data => this.beginGame(data));
    this.socket.on('waitingForTurn', data => this.waitingForTurn(data));
    this.socket.on('gameFinished', data => this.finishedGame(data));
  }

  waiting({ room, player }) {
    const [, setCode] = this.states.code;
    const [, setLocalPlayer] = this.states.localPlayer;

    setCode(room);
    setLocalPlayer(player);

    this.history.push('/loading');
  }

  updateWaiting({ players }) {
    const [, setLocalPlayer] = this.states.localPlayer;
    const [, setOpponentPlayer] = this.states.opponentPlayer;

    const index = players.findIndex(p => p.socketId === this.socket.id);

    setLocalPlayer(players[index]);
    setOpponentPlayer(players[index === 0 ? 1 : 0]);

    this.socket.emit('ready', { nickname: players[index].nickname });
  }

  createGame(player) {
    this.socket.emit('createGame', player);
  }

  joinToGame(data) {
    this.socket.emit('joinToGame', data);
  }

  beginGame(data) {
    this.history.push('/game');

    this.setNewData(data);
  }

  playerTurn({ nickname, turn }) {
    const request = {
      nickname,
      turn,
    };

    this.socket.emit('playerTurn', request);
  }

  waitingForTurn(data) {
    console.log(data);
    this.setNewData(data);
  }

  setNewData({ players, board, playerInTurn, turns, finished }) {
    const [, setPlayerInTurn] = this.states.playerInTurn;
    const [, setBoard] = this.states.board;
    const [, setTurnsNumber] = this.states.turnsNumber;
    const [, setFinished] = this.states.finished;

    this.setPlayers(players);

    setPlayerInTurn(playerInTurn.socketId);
    setBoard(new Board(board));
    setTurnsNumber(turns);
    setFinished(finished);
  }

  setPlayers(players) {
    const [, setLocalPlayer] = this.states.localPlayer;
    const [, setOpponentPlayer] = this.states.opponentPlayer;

    const index = players.findIndex(p => p.socketId === this.socket.id);

    setLocalPlayer(players[index]);
    setOpponentPlayer(players[index === 0 ? 1 : 0]);
  }

  finishedGame(data) {
    console.log(this.states);

    const [, setWinner] = this.states.winner;

    setWinner(data.winner);

    this.setNewData(data);
    this.history.push('/endgame');
  }
}

export default Game;
