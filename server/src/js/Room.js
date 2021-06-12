import { Player } from './Player.js';
import { Site } from './Site.js';
import { getVoronoi } from './voronoi.js';

class Room {
  constructor() {
    this.full = false;
    this.players = [];
  }

  joinPlayer(playerToJoin, socketId) {
    const player = new Player({ nickname: playerToJoin, socketId });

    if (this.players.find(p => player.nickname === p.nickname)) {
      player.nickname += '(2)';
    }

    this.players.push(player);
    this.full = this.players.length === 2;

    return player;
  }

  beginGame() {
    this.playerInTurn = (Math.random() * 2) | 0;
    this.sites = [];

    return this.players[this.playerInTurn];
  }

  disconnectPlayer(socketId) {
    const index = this.players.findIndex(p => p.socketId === socketId);
    this.players.splice(index, 1);
  }

  playerTurn(turn) {
    if (this.players[this.playerInTurn].socketId !== turn.player.socketId) {
      return this._error(`This is not your turn! ${turn.player.nickname}`);
    }

    if (turn.type === 'placement') {
      return this._sitePlacement(turn);
    } else if (turn.type === 'attack') {
      return this._siteAttack(turn);
    }
  }

  _sitePlacement({ site, location }) {
    const currentPlayer = this.players[this.playerInTurn];

    // Check if the player still has sites available of the type
    if (!currentPlayer.checkSite(site)) {
      return this._error(
        `This player ${currentPlayer.nickname} doesn't have anymore sites of this type: ${site}`
      );
    }

    // Check if the site is placed in a quarentine free zone
    if (this.sites.find(site => site.isInQuarantineZone(location))) {
      return this._error(
        `This site: ${site} with this coordinates: ${location} is being placed in a quarantine zone`
      );
    }

    // Add the site in sites
    this.sites.push(Site.build(site, currentPlayer, location));
  }

  _siteAttack({ attackedSite, attackingSite }) {}

  _recalculateVoronoi() {
    const voronoi = getVoronoi(this.sites, [0, 0, 100, 100]);
  }

  _error(error = '') {
    return { error: error };
  }
}

export { Room };
