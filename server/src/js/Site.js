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
const blockRadius = [30, 15, 10, 10];

class Site {
  static build(type, owner, x, y) {
    const s = sites[type];

    return new Site({
      type,
      attack: attack[s],
      health: health[s],
      attackRadius: attackRadius[s],
      blockRadius: blockRadius[s],
      owner: {
        socketId: owner.socketId,
        name: owner.name,
      },
      x,
      y,
    });
  }

  constructor({
    attack,
    health,
    attackRadius,
    blockRadius,
    type,
    owner,
    x,
    y,
  }) {
    this.attack = attack;
    this.health = health;
    this.attackRadius = attackRadius;
    this.blockRadius = blockRadius;
    this.type = type;
    this.owner = owner;
    this.isDestroyed = false;
    this.point = { x, y };
  }

  reduceHealth(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.isDestroyed = true;
    }
  }

  getArea(voronoi, sites) {
    const index = getCellIndex(this.point, voronoi, sites);
    const points = getCellPoints(index, voronoi);
    const area = calcArea(points);

    return area;
  }
}

export { Site };
