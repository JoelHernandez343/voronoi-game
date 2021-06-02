import { Server } from 'socket.io';

const ioConfig = (io = new Server()) => {
  io.on('connection', socket => {
    console.log('Someone has connected son!');
  });
};

export { ioConfig };
