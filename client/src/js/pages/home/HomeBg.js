import ParallaxImage from '../../components/ParallaxImage.js';

const HomeBg = () => (
  <div className="home-bg">
    <ParallaxImage image="earth" factor={0.005} />
    <ParallaxImage image="cloud01" factor={0.015} />
    <ParallaxImage image="cloud04" factor={0.02} />
    <ParallaxImage image="cloud03" factor={0.05} />
    <ParallaxImage image="swords" factor={0.06} />
    <ParallaxImage image="shield" factor={0.07} />
    <ParallaxImage image="cloud02" factor={0.15} />
  </div>
);

export default HomeBg;
