class Player {
  constructor({ nickname, socketId, sites, area, percentage, color }) {
    this.nickname = nickname;
    this.socketId = socketId;
    this.sites = sites ?? {
      castle: 1,
      tower: 5,
      barrack: 5,
      catapult: 2,
    };
    this.area = area ?? 0;
    this.percentage = percentage ?? 0.0;
    this.ready = false;
    this.color = color ?? '#C70039';
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
