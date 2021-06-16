import { Room } from './Room.js';
import { Player } from './Player.js';

const bindGameEvents = (io, socket, rooms) => {
  socket.emit('connected', { message: 'You are connected!' });
  socket.on('createGame', data => createGame({ data, socket, io, rooms }));
  socket.on('joinToGame', data => joinToGame({ data, socket, io, rooms }));
  socket.on('ready', data => ready({ data, socket, rooms, io }));
  socket.on('playerTurn', data => playerTurn({ data, socket, rooms, io }));
  socket.on('disconnect', () => disconnect({ rooms, socket }));
};

const createGame = ({ data, socket, io, rooms }) => {
  if (checkIfJoined(socket)) return;

  const room = createRoomNumber(io);

  socket.join(room);
  rooms[room] = new Room();
  const player = rooms[room].joinPlayer(
    new Player({ nickname: data.nickname, socketId: socket.id })
  );

  socket.emit('newGameCreated', { room, player });
};

const joinToGame = ({ data, io, socket, rooms }) => {
  if (checkIfJoined(socket)) return;

  if (!io.sockets.adapter.rooms.has(data.room)) {
    socket.emit('error', { error: 'ER_404' });
    return;
  }

  if (rooms[data.room].full) {
    socket.emit('error', { error: 'ER_FULL' });
    return;
  }

  socket.join(data.room);
  const player = rooms[data.room].joinPlayer(
    new Player({ nickname: data.nickname, socketId: socket.id })
  );
  io.sockets.in(data.room).emit('playerJoinedRoom', { player });
};

const ready = ({ data, rooms, socket, io }) => {
  const room = getCurrentRoom(socket);

  const player = {
    nickname: data.nickname,
    socketId: socket.id,
  };

  const firstState = rooms[room].readyPlayer(player);
  io.sockets.in(room).emit('playerReady', { player });

  if (firstState) {
    io.sockets.in(room).emit('waitingForTurn', firstState);
  }
};

const playerTurn = ({ data, rooms, io, socket }) => {
  if (!checkIfJoined(socket)) {
    socket.emit('error', { error: 'EP_WITHOUT_ROOM' });
    return;
  }

  const room = getCurrentRoom(socket);

  const turn = {
    player: {
      nickname: data.nickname,
      socketId: socket.id,
    },
    ...data.turn,
  };

  const state = rooms[room].playerTurn(turn);

  if (state.finished) {
    io.sockets.in(room).emit('gameFinished', state);
    deleteRoom(rooms, room, io);
  } else {
    io.sockets.in(room).emit('waitingForTurn', state);
  }
};

const disconnect = ({ rooms, socket }) => {
  console.log('User has disconnected!');
  if (!checkIfJoined(socket)) {
    return;
  }

  const room = getCurrentRoom(socket);
  const error = rooms[room].disconnectPlayer(socket.id);

  io.sockets.in(room).emit('error', error);

  deleteRoom(rooms, room, io);
};

const checkIfJoined = socket => {
  if (socket.rooms.size < 2) {
    return false;
  }

  const room = Array.from(socket.rooms.keys()).filter(
    key => key.length === 4
  )[0];

  console.log('Already connected to room');
  socket.emit('error', { error: 'EP_ALREADY_CONNECTED', room });
  return true;
};

const getCurrentRoom = socket => {
  return Array.from(socket.rooms.keys()).filter(key => key.length === 4)[0];
};

const createRoomNumber = io => {
  let room;

  do {
    room = `${(Math.random() * 9999) | 0}`.padStart(4, '0');
  } while (io.sockets.adapter.rooms.has(room));

  return room;
};

const deleteRoom = (rooms, room, io) => {
  delete rooms[room];
  io.sockets.socketsLeave(room);
};

export { bindGameEvents };
