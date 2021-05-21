import express from 'express';
import cors from 'cors';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.get('/', (req, res) =>
      res.sendFile(`${__dirname}/public/index.html`)
    );

    this.app.get('/api/', (req, res) => res.send({ ans: 'fuck u' }));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.PORT, () =>
      console.log(`Listening to port ${this.PORT}`)
    );
  }
}

export default Server;
