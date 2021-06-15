import { Site } from './Site.js';
import { getVoronoi } from './voronoi.js';

class Board {
  constructor(bounds) {
    this.sites = [];
    this.bounds = bounds;
    this.totalArea = bounds[2] * bounds[3];
  }

  isInQuarantineZone(location) {
    return this.sites.find(site => site.isInQuarantineZone(location));
  }

  getSite(location, owner) {
    return this.sites.find(
      site => site.owner.isEqual(owner) && site.isSameLocation(location)
    );
  }

  addSite(type, location, player) {
    this.sites.push(new Site(type, player, location));
  }

  removeSite(location) {
    const index = this.sites.findIndex(site => site.isSameLocation(location));

    this.sites.splice(index, 1);
  }

  recalcVoronoi(players) {
    const voronoi = getVoronoi(this.sites, this.bounds);

    players.forEach(player => (player.area = 0));

    this.sites.forEach(site => {
      site.calcArea(voronoi, this.sites.length);
      site.owner.area += site.area;
    });
  }

  toJson() {
    return {
      bounds: this.bounds,
      totalArea: this.totalArea,
      sites: this.sites.map(site => site.toJson()),
    };
  }
}

export { Board };
