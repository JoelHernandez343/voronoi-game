import { Delaunay } from 'd3-delaunay';

const delaunay = Delaunay.from([
  [80, 50],
  [30, 50],
  [50, 50],
]);
const voronoi = delaunay.voronoi([0, 0, 100, 100]);

const length = delaunay.points.length / 2;

const getCellPoints = (index, voronoi) => {
  const points = voronoi.cellPolygon(index).map(([x, y]) => ({ x, y }));
  points.pop();
  return points;
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

const getCellIndex = ({ point: { x, y }, voronoi, sites }) => {
  for (let i = 0; i < sites; ++i) {
    if (voronoi.contains(i, x, y)) {
      return i;
    }
  }
};

for (let i = 0; i < length; ++i) {
  const points = getCellPoints(i, voronoi);
  console.log(points);
  console.log(calcArea(points));
}

// console.log('Hello world');
// for (const item of voronoi.cellPolygons()) {
//   console.log(item);
// }

// const points = [
//   { x: 0, y: 0 },
//   { x: 1, y: 0 },
//   { x: 1, y: 1 },
//   { x: 0, y: 1 },
// ];

// console.log(calcArea(points));
