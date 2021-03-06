import { Room } from './Room.js';
import { Player } from './Player.js';

const bindGameEvents = (io, socket, rooms) => {
  socket.emit('connected', { message: 'You are connected!' });
  socket.on('createGame', data => createGame({ data, socket, io, rooms }));
  socket.on('joinToGame', data => joinToGame({ data, socket, io, rooms }));
  socket.on('ready', data => ready({ data, socket, rooms, io }));
  socket.on('playerTurn', data => playerTurn({ data, socket, rooms, io }));
  socket.on('disconnect', () => disconnect({ rooms, socket, io }));
};

const createGame = ({ data, socket, io, rooms }) => {
  if (checkIfJoined(socket)) return;

  const room = createRoomNumber(io);

  socket.join(room);

  rooms[room] = new Room(room);
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
  const players = rooms[data.room].joinPlayer(
    new Player({ nickname: data.nickname, socketId: socket.id })
  );

  io.sockets.in(data.room).emit('playerJoinedRoom', { players });
};

const ready = ({ data, rooms, socket, io }) => {
  const room = getCurrentRoom(socket);

  const player = {
    nickname: data.nickname,
    socketId: socket.id,
  };

  const firstState = rooms[room].readyPlayer(player);

  if (firstState) {
    io.sockets.in(room).emit('beginGame', firstState);
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

const disconnect = ({ rooms, socket, io }) => {
  console.log('User has disconnected!', socket.id);

  const room = getSocketRoom(socket, rooms);

  if (!room) {
    return;
  }

  const error = rooms[room].disconnectPlayer(socket.id);

  io.sockets.in(room).emit('error', error);

  deleteRoom(rooms, room, io);
  console.log('Cleaned up room');
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

const getCurrentRoom = socket =>
  Array.from(socket.rooms.keys()).filter(key => key.length === 4)[0];

const getSocketRoom = (socket, rooms) => {
  const entrie = Object.entries(rooms).find(entry =>
    entry[1].players.find(p => p.socketId === socket.id)
  );

  return entrie ? entrie[0] : undefined;
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
