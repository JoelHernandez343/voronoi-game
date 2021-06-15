class Player {
  constructor({ nickname, socketId, sites, area }) {
    this.nickname = nickname;
    this.socketId = socketId;
    this.sites = sites ?? {
      castle: 1,
      tower: 7,
      barrack: 10,
      catapult: 5,
    };
    this.area = area ?? 0;
  }

  checkSite(type) {
    return this.sites[type] > 0;
  }

  consumeSite(type) {
    if (this.sites[type] === 0) {
      return false;
    }

    this.sites[type] -= 1;
    return true;
  }

  isEqual(player) {
    return (
      this.nickname === player.nickname && this.socketId === player.socketId
    );
  }
}

export { Player };
