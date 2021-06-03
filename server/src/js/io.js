import { bindGameEvents } from './game-connection.js';

const ioConfig = io =>
  io.on('connection', socket => bindGameEvents(io, socket));

export { ioConfig };
