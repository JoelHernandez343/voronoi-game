import express from 'express';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import http from 'http';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ioConfig } from './io.js';

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server);

    this.rooms = {};

    this.PORT = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
    this.ioConfig();
  }

  ioConfig() {
    ioConfig(this.io, this.rooms);
  }

  routes() {
    this.app.use(express.static(path.join(__dirname, '../public')));

    this.app.get('/', (req, res) => res.sendFile('public/index.html'));

    this.app.get('/api/', (req, res) => res.send({ ans: 'fuck u' }));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.server.listen(this.PORT, () =>
      console.log(`Listening to port ${this.PORT}`)
    );
  }
}

export default Server;
