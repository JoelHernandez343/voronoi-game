class Room {
  constructor() {
    this.full = false;
    this.players = [];
  }

  joinPlayer(playerToJoin, socketId) {
    const player = { ...playerToJoin, socketId };

    for (const p of this.players) {
      if (player.id === p.id) {
        player.id += '(2)';
        break;
      }
    }

    this.players.push(player);
    this.full = this.players.length === 2;

    return player;
  }

  disconnectPlayer(socketId) {
    const index = this.players.findIndex(p => p.socketId === socketId);
    this.players.splice(index, 1);
  }
}

export { Room };
