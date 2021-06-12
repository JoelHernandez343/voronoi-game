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
  static build(type, owner, point) {
    const s = sites[type];

    return new Site({
      type,
      attack: attack[s],
      health: health[s],
      attackRadius: attackRadius[s],
      blockRadius: blockRadius[s],
      owner,
      point,
    });
  }

  constructor({
    attack,
    health,
    attackRadius,
    quarantineRadius,
    type,
    owner,
    point,
  }) {
    this.attack = attack;
    this.health = health;
    this.attackRadius = attackRadius;
    this.quarantineRadius = quarantineRadius;
    this.type = type;
    this.owner = owner;
    this.isDestroyed = false;
    this.point = point;
    this.area = -1;
  }

  reduceHealth(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.isDestroyed = true;
    }
  }

  calcArea(voronoi, sitesLength) {
    const index = getCellIndex(this.point, voronoi, sitesLength);
    const points = getCellPoints(index, voronoi);
    const area = calcArea(points);

    this.area = area;
  }

  isInQuarantineZone({ x, y }) {
    return (
      (x - this.point.x) ** 2 + (y - this.point.y) ** 2 <=
      this.quarantineRadius ** 2
    );
  }

  isInAttackZone({ x, y }) {
    return (
      (x - this.point.x) ** 2 + (y - this.point.y) ** 2 <=
      this.attackRadius ** 2
    );
  }
}

export { Site };
