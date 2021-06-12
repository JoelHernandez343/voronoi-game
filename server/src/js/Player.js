class Player {
  constructor({ nickname, socketId }) {
    this.nickname = nickname;
    this.socketId = socketId;
    this.sites = {
      castle: 1,
      tower: 7,
      barrack: 10,
      catapult: 5,
    };
    this.area = 0;
  }

  checkSite(site) {
    return this.sites[site] > 0;
  }

  consumeSite(site) {
    if (this.sites[site] === 0) {
      return false;
    }

    this.sites[site] -= 1;
    return true;
  }
}

export { Player };
