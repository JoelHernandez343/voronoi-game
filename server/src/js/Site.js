import { getCellIndex, getCellPoints, calcArea } from './voronoi.js';

const sites = {
  castle: 0,
  tower: 1,
  barrack: 2,
  catapult: 3,
};
const attack = [20, 15, 5, 10];
const health = [100, 50, 25, 15];
const attackRadius = [20, 50, 30, 60];
const quarantineRadius = [150, 75, 50, 50];

class Site {
  constructor(type, owner, location) {
    const s = sites[type];

    this.area = -1;
    this.type = type;
    this.owner = owner;
    this.attack = attack[s];
    this.health = health[s];
    this.location = location;
    this.isDestroyed = false;
    this.attackRadius = attackRadius[s];
    this.quarantineRadius = quarantineRadius[s];
  }

  reduceHealth(damage) {
    if (this.health > 0) {
      this.health -= damage;
    }

    this.isDestroyed = this.health <= 0;
  }

  calcArea(voronoi, sitesLength) {
    const index = getCellIndex(this.location, voronoi, sitesLength);
    const points = getCellPoints(index, voronoi);
    const area = calcArea(points);

    this.area = area;
  }

  isInQuarantineZone({ x, y }) {
    return (
      (x - this.location.x) ** 2 + (y - this.location.y) ** 2 <=
      this.quarantineRadius ** 2
    );
  }

  isInAttackZone({ x, y }) {
    return (
      (x - this.location.x) ** 2 + (y - this.location.y) ** 2 <=
      this.attackRadius ** 2
    );
  }

  isSameLocation({ x, y }) {
    return x === this.location.x && y === this.location.y;
  }

  toJson() {
    return {
      type: this.type,
      attack: this.attack,
      health: this.health,
      location: this.location,
      attackRadius: this.attackRadius,
      quarantineRadius: this.quarantineRadius,
      owner: {
        nickname: this.owner.nickname,
        socketId: this.owner.socketId,
        color: this.owner.color,
      },
    };
  }
}

export { Site };
