import Site from './Site.js';
import { getVoronoi } from './voronoi.js';

class Board {
  constructor({ sites, bounds, totalArea }) {
    this.sites = sites.map(site => new Site(site));
    this.bounds = bounds;
    this.totalArea = totalArea;
  }

  isInQuarantineZone(location) {
    return this.sites.find(site => site.isInQuarantineZone(location));
  }

  isInAttackZone({ x, y }) {
    return (
      (x - this.location.x) ** 2 + (y - this.location.y) ** 2 <=
      this.attackRadius ** 2
    );
  }

  renderOnCanvas(canvas) {
    const voronoi = getVoronoi(this.sites, this.bounds);

    // Render all sites first
    this.sites.forEach(site =>
      site.renderOnCanvas(canvas, voronoi, this.sites.length)
    );
  }
}

export default Board;
