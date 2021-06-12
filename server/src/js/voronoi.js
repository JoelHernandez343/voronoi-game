import { Delaunay } from 'd3-delaunay';

const getCellPoints = (index, voronoi) => {
  const points = voronoi.cellPolygon(index).map(([x, y]) => ({ x, y }));
  points.pop();
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

const calcArea = points => {
  let area = 0;
  const n = points.length - 1;

  for (let i = 0; i <= n - 1; ++i) {
    area += points[i].x * points[i + 1].y;
  }

  area += points[n].x * points[0].y;

  for (let i = 0; i <= n - 1; ++i) {
    area -= points[i + 1].x * points[i].y;
  }

  area -= points[0].x * points[n].y;

  return Math.abs(area) * 0.5;
};

const getVoronoi = (sites, bounds) => {
  const delaunay = Delaunay.from(sites.map(({ point: { x, y } }) => [x, y]));
  return delaunay.voronoi(bounds);
};

export { getCellPoints, getCellIndex, calcArea, getVoronoi };
