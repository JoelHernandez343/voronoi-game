import { Player } from './Player.js';
import { Board } from './Board.js';

class Room {
  constructor() {
    this.full = false;
    this.players = [];
  }

  getOtherPlayer(player) {
    return this.players.find(p => !p.isEqual(player));
  }

  joinPlayer(playerToJoin, socketId) {
    const player = new Player({ nickname: playerToJoin, socketId });

    if (this.players.find(p => p.isEqual(player))) {
      player.nickname += '(2)';
    }

    this.players.push(player);
    this.full = this.players.length === 2;

    return player;
  }

  beginGame() {
    this.playerInTurn = (Math.random() * 2) | 0;
    this.board = new Board([0, 0, 1000, 1000]);

    return this.players[this.playerInTurn];
  }

  disconnectPlayer(socketId) {
    const index = this.players.findIndex(p => p.socketId === socketId);
    this.players.splice(index, 1);
  }

  playerTurn(turn) {
    // It's not their turn
    if (!this.players[this.playerInTurn].isEqual(turn.player)) {
      return { error: 'EP_NOT_TURN' };
    }

    if (turn.type === 'placement') {
      return this.sitePlacement(turn);
    } else if (turn.type === 'attack') {
      return this.siteAttack(turn);
    }
  }

  sitePlacement({ site, location, player: currentPlayer }) {
    // Check if the player still has sites available of the type
    if (!currentPlayer.checkSite(site)) {
      return { error: 'EP_NOT_SITE' };
    }

    // Check if the site is placed in a quarentine free zone
    if (this.board.isInQuarantineZone(location)) {
      return { error: 'ES_Q_ZONE' };
    }

    // Add the site in sites
    this.board.addSite(site, location, currentPlayer);

    // Recalculate Voronoi
    this.board.recalcVoronoi(this.players);

    return {
      player1: this.players[0],
      player2: this.players[1],
      board: this.board.toJson(),
    };
  }

  siteAttack({ attackedLocation, attackingLocation, player: attacker }) {
    const attackedPlayer = this.getOtherPlayer(attacker);

    const attackingSite = this.board.getSite(attackingLocation, attacker);
    const attackedSite = this.board.getSite(attackedLocation, attackedPlayer);

    // Attacking site does not exits
    if (!attackingSite) {
      return { error: 'ES_ATKR_404' };
    }

    // Attacked site does not exits
    if (!attackedSite) {
      return { error: 'ES_ATKD_404' };
    }

    // Attacked site is not in attaker radius
    if (!attackingSite.isInAttackZone(attackedSite.location)) {
      return { error: 'ES_NOT_ATTK_AREA' };
    }

    attackedSite.reduceHealth(attackingSite.attack);

    let destroyed = null;

    if (attackedSite.isDestroyed) {
      // Remove site
      this.board.removeSite(attackedSite.location);

      // Recalculate Voronoi
      this.board.recalcVoronoi(this.players);

      destroyed = attackedSite.toJson();
    }

    return {
      player1: this.players[0],
      player2: this.players[1],
      board: this.board.toJson(),
      destroyed,
    };
  }
}

export { Room };
