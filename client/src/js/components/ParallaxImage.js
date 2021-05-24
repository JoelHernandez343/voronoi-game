import { useEffect } from 'react';

import * as images from '../imports/images.js';

import { docquery } from '../tools/index.js';

const ParallaxImage = ({ image, factor, customClass = '' }) => {
  const className = customClass || `home-bg-${image}`;

  useEffect(() => {
    const trackingMove = createTrackingMove(factor, className);

    window.addEventListener('mousemove', trackingMove);

    return () => {
      window.removeEventListener('mousemove', trackingMove);
    };
  }, [image, factor, className]);

  return (
    <div>
      <img src={images[image]} alt="" className={`${className} reference`} />
      <img src={images[image]} alt="" className={`${className} movable`} />
    </div>
  );
};

const createTrackingMove = (factor, className) => e => {
  if (window.innerWidth < 767) {
    return;
  }

  const movable = docquery(`.${className}.movable`);
  const reference = docquery(`.${className}.reference`);

  const { x, y, height, width } = reference.getBoundingClientRect();

  const cx = width / 2 + x;
  const cy = height / 2 + y;

  movable.style.position = 'absolute';
  movable.style.left = 0;
  movable.style.top = 0;

  const mX = e.clientX;
  const mY = e.clientY;

  const dx = (mX - cx) * factor;
  const dy = (mY - cy) * factor;

  movable.style.transform = `translate3d(${x + dx}px, ${y + dy}px, 0)`;
};
export default ParallaxImage;
