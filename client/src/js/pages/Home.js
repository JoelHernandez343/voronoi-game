import '../../css/Home.css';

import ParallaxImage from '../components/ParallaxImage.js';

const Home = () => (
  <div className="home">
    <div className="home-content">
      <p>This is home bro</p>
    </div>
    <div className="home-bg">
      <ParallaxImage image="world" factor={0.01} />
    </div>
  </div>
);

export default Home;
