import { Room } from './Room.js';

const bindGameEvents = (io, socket, rooms) => {
  socket.emit('connected', { message: 'You are connected!' });
  socket.on('createGame', data => createGame({ data, socket, io, rooms }));
  socket.on('joinToGame', data => joinToGame({ data, socket, io, rooms }));
  socket.on('disconnect', () => console.log('User has disconnected!'));
};

const createGame = ({ data, socket, io, rooms }) => {
  if (checkIfJoined(socket)) return;
  let room;
  do {
    room = `${(Math.random() * 9999) | 0}`.padStart(4, '0');
  } while (io.sockets.adapter.rooms.has(room));

  socket.join(room);
  rooms[room] = new Room();
  const player = rooms[room].joinPlayer(data.player, socket.id);

  socket.emit('newGameCreated', { room, player });
};

const joinToGame = ({ data, io, socket, rooms }) => {
  if (checkIfJoined(socket)) return;

  if (!io.sockets.adapter.rooms.has(data.room)) {
    socket.emit('error', { message: "This room doesn't exits." });
    return;
  }

  if (rooms[data.room].full) {
    socket.emit('error', { message: 'This room is full.' });
    return;
  }

  socket.join(data.room);
  const player = rooms[data.room].joinPlayer(data.player, socket.id);
  io.sockets.in(data.room).emit('playerJoinedRoom', { player });

  console.log(rooms);
};

const checkIfJoined = socket => {
  if (socket.rooms.size < 2) {
    return false;
  }

  const room = Array.from(socket.rooms.keys()).filter(
    key => key.length === 4
  )[0];

  console.log('Already connected to room');
  socket.emit('error', { message: 'Already connected', room });
  return true;
};

export { bindGameEvents };
