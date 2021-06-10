import { bindGameEvents } from './game-connection.js';

import { Server } from 'socket.io';

const ioConfig = (io = new Server(), rooms = {}) =>
  io.on('connection', socket => bindGameEvents(io, socket, rooms));

export { ioConfig };
