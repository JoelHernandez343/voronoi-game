import dotenv from 'dotenv';
import Server from './js/server.js';

dotenv.config(process.env);

const server = new Server();
server.listen();
