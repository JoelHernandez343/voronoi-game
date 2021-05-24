import { useEffect } from 'react';

import * as images from '../imports/images.js';

import { docquery } from '../tools/index.js';

const ParallaxImage = ({ image, factor }) => {
  useEffect(() => {
    const trackingMove = createTrackingMove(image, factor);

    window.addEventListener('mousemove', trackingMove);

    return () => {
      window.removeEventListener('mousemove', trackingMove);
    };
  }, [image, factor]);

  return (
    <div>
      <img
        src={images[image]}
        alt=""
        className={`home-bg-${image} reference`}
      />
      <img src={images[image]} alt="" className={`home-bg-${image} movable`} />
    </div>
  );
};

const createTrackingMove = (name, factor) => e => {
  const movable = docquery(`.home-bg-${name}.movable`);
  const reference = docquery(`.home-bg-${name}.reference`);

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
