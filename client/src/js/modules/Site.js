import { icons24x24 } from '../imports/icons.js';

import { getCellIndex, getCellPoints } from './voronoi.js';

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
const name = ['Castillo', 'Torre', 'Cuartel', 'Catapulta'];

const getInfoSite = site => {
  const s = sites[site];

  return {
    type: site,
    name: name[s],
    attack: attack[s],
    health: health[s],
    attackRadius: attackRadius[s],
    quarantineRadius: quarantineRadius[s],
  };
};

class Site {
  constructor({
    type,
    owner,
    attack,
    health,
    location,
    attackRadius,
    quarantineRadius,
  }) {
    this.type = type;
    this.owner = owner;
    this.attack = attack;
    this.health = health;
    this.location = location;
    this.attackRadius = attackRadius;
    this.quarantineRadius = quarantineRadius;
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

  renderOnCanvas(canvas, voronoi, sitesLength) {
    const index = getCellIndex(this.location, voronoi, sitesLength);
    const points = getCellPoints(index, voronoi);

    this.renderCell(canvas, points);
    this.renderIcon(canvas);
    this.renderQuarentineZone(canvas);
  }

  renderCell(canvas, points) {
    const ctx = canvas.getContext('2d');
    const pnts = [...points];
    const begin = pnts.shift();

    ctx.beginPath();
    ctx.fillStyle = this.owner.color;
    ctx.strokeStyle = this.owner.color;

    ctx.moveTo(begin.x, begin.y);
    pnts.forEach(p => ctx.lineTo(p.x, p.y));

    ctx.fill();
    ctx.stroke();
  }

  renderIcon(canvas) {
    const ctx = canvas.getContext('2d');

    const iconData = icons24x24[`${this.type}24x24`];

    const icon = new Image();
    icon.src = iconData;

    icon.onload = () => {
      const [dx, dy] = [this.location.x - 8, this.location.y - 8];
      ctx.drawImage(icon, dx, dy, 16, 16);
    };
  }

  renderQuarentineZone(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = 'black';

    ctx.arc(
      this.location.x,
      this.location.y,
      this.quarantineRadius,
      0,
      2 * Math.PI,
      false
    );

    ctx.stroke();
  }

  renderQAttackZone(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = 'red';

    ctx.arc(
      this.location.x,
      this.location.y,
      this.attackRadius,
      0,
      2 * Math.PI,
      false
    );

    ctx.stroke();
  }
}

export { getInfoSite };
export default Site;
