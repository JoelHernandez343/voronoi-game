// import { App } from './modules/App.js';
import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6';

window.addEventListener('load', () => {
  // const app = new App();

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const delaunay = Delaunay.from([
    [30, 50],
    [50, 50],
    [80, 50],
  ]);
  const voronoi = delaunay.voronoi([0, 0, 100, 100]);

  context.beginPath();
  delaunay.render(context);
  context.strokeStyle = '#ccc';
  context.stroke();

  context.beginPath();
  delaunay.renderPoints(context);
  context.fill();

  context.beginPath();
  voronoi.render(context);
  context.stroke();
});
