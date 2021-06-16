import { Delaunay } from 'd3-delaunay';

const getCellPoints = (index, voronoi) => {
  const points = voronoi.cellPolygon(index).map(([x, y]) => ({ x, y }));

  return points;
};

const getCellIndex = (point, voronoi, sitesLength) => {
  const { x, y } = point;

  for (let i = 0; i < sitesLength; ++i) {
    if (voronoi.contains(i, x, y)) {
      return i;
    }
  }
};

const getVoronoi = (sites, bounds) => {
  const delaunay = Delaunay.from(sites.map(({ location: { x, y } }) => [x, y]));
  return delaunay.voronoi(bounds);
};

export { getCellPoints, getCellIndex, getVoronoi };
