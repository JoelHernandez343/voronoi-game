import { Site } from './Site.js';
import { getVoronoi } from './voronoi.js';

class Board {
  constructor(bounds) {
    this.sites = [];
    this.bounds = bounds;
    this.totalArea = bounds[2] * bounds[3];
  }

  isInQuarantine(location) {
    return this.sites.find(site => site.isInQuarantineZone(location));
  }

  isInAttackZone(location) {}

  addSite(site, player, location) {
    this.sites.push(Site.build(site, player, location));
  }

  recalcVoronoi(players) {
    const voronoi = getVoronoi(this.sites, this.bounds);

    players.forEach(player => (player.area = 0));

    this.sites.forEach(site => {
      site.calcArea(voronoi, this.sites.length);
      site.owner.area += site.area;
    });
  }
}

export { Board };
