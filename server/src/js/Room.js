import { Board } from './Board.js';

const colors = {
  red: '#C7003922',
  blue: '#3049CB22',
};

class Room {
  constructor(id) {
    this.id = id;
    this.full = false;
    this.players = [];
  }

  getPlayer(player) {
    return this.players.find(p => p.isEqual(player));
  }

  getOtherPlayer(player) {
    return this.players.find(p => !p.isEqual(player));
  }

  setOtherPlayer() {
    this.playerInTurn = this.playerInTurn === 0 ? 1 : 0;
  }

  reduceTurn() {
    this.turns -= 1;
    if (this.turns <= 0) {
      this.finished = true;
    }
  }

  joinPlayer(player) {
    if (this.players.find(p => p.nickname === player.nickname)) {
      player.nickname += '(2)';
    }

    this.players.push(player);
    this.full = this.players.length === 2;

    return this.players;
  }

  readyPlayer(player) {
    this.players.find(p => p.isEqual(player)).ready = true;

    return this.players[0].ready && this.players[1].ready
      ? this.beginGame()
      : false;
  }

  beginGame() {
    const random = (Math.random() * 2) | 0;

    this.players[0].color = random === 0 ? colors.blue : colors.red;
    this.players[1].color = random === 0 ? colors.red : colors.blue;

    this.playerInTurn = random;
    this.board = new Board([0, 0, 800, 500]);
    this.turns = 20;
    this.finished = false;

    console.log(this.playerInTurn);

    return this.returnData();
  }

  disconnectPlayer(socketId) {
    const index = this.players.findIndex(p => p.socketId === socketId);
    const [playerDisconnected] = this.players.splice(index, 1);

    this.turns = 0;
    this.finished = true;

    return {
      error: 'EP_DISCONNECTED',
      playerDisconnected,
      finished: this.finished,
    };
  }

  playerTurn(turn) {
    // If not all players ready, error
    if (!this.players[0].ready || !this.players[1].ready) {
      return { error: 'EP_NOT_READY' };
    }

    // If finished, error
    if (this.finished) {
      return { error: 'ER_NOT_GAME' };
    }

    // It's not their turn
    if (!this.players[this.playerInTurn].isEqual(turn.player)) {
      return { error: 'EP_NOT_TURN' };
    }

    this.setOtherPlayer();
    this.reduceTurn();

    if (turn.type === 'placement') {
      return this.sitePlacement(turn);
    } else if (turn.type === 'attack') {
      return this.siteAttack(turn);
    }
  }

  sitePlacement({ site, location, player }) {
    // Get instance of player
    const currentPlayer = this.getPlayer(player);

    // Check if the player still has sites available of the type
    if (!currentPlayer.checkSite(site)) {
      return { error: 'EP_NOT_SITE' };
    }

    // Check if the site is placed in a quarentine free zone
    if (this.board.isInQuarantineZone(location)) {
      return { error: 'ES_Q_ZONE' };
    }

    // Consume site
    currentPlayer.consumeSite(site);

    // Add the site in sites
    this.board.addSite(site, location, currentPlayer);

    // Recalculate Voronoi
    this.board.recalcVoronoi(this.players);

    const siteCreated = { type: site, location };

    return this.finished
      ? this.returnData({ siteCreated, winner: this.calcWinner() })
      : this.returnData({ siteCreated });
  }

  siteAttack({ attackedLocation, attackingLocation, player }) {
    // Get instances of players
    const attacker = this.getPlayer(player);
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

    let siteDestroyed = null;

    if (attackedSite.isDestroyed) {
      // Remove site
      this.board.removeSite(attackedSite.location);

      // Recalculate Voronoi
      this.board.recalcVoronoi(this.players);

      siteDestroyed = attackedSite.toJson();
    }

    return this.finished
      ? this.returnData({ siteDestroyed, winner: this.calcWinner() })
      : this.returnData({ siteDestroyed });
  }

  calcWinner() {
    const maxArea = this.players.reduce(
      (maxArea, p) => (p.area > maxArea ? p.area : maxArea),
      -1
    );

    return this.players.find(p => p.area === maxArea);
  }

  returnData(customData) {
    return {
      players: this.players,
      board: this.board.toJson(),
      playerInTurn: this.players[this.playerInTurn],
      turns: this.turns,
      finished: this.finished,
      ...customData,
    };
  }
}

export { Room };
