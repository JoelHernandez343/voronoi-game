import { getId } from './tools.js';
import { Game } from './Game.js';

class App {
  constructor() {
    this.game = new Game();

    getId('btnCreateGame').addEventListener('click', () => {
      const player = {
        id: 'Joelcito123',
      };

      this.game.createGame(player);
    });

    getId('btnJoinGame').addEventListener('click', () => {
      const player = {
        id: 'Rebeca123',
      };
      const room = '8391';

      this.game.joinToGame(room, player);
    });
  }
}

export { App };
