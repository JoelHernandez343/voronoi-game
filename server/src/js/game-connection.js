const bindGameEvents = (io, socket) => {
  socket.emit('connected', { message: 'You are connected!' });
  socket.on('createGame', () => createGame({ socket }));
  socket.on('joinToGame', data => joinToGame({ data, socket, io }));
};

const createGame = ({ socket }) => {
  const room = (Math.random() * 9999) | 0;

  socket.emit('newGameCreated', { room, id: socket.id });
  socket.join(`${room}`);
};

const joinToGame = ({ data, io, socket }) => {
  if (!io.sockets.adapter.rooms.has(data.room)) {
    socket.emit('error', { message: "This room doesn't exits." });
    return;
  }

  socket.join(data.room);
  io.sockets.in(data.room).emit('playerJoinedRoom', { ...data, id: socket.i });
};

export { bindGameEvents };
