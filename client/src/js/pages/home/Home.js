import '../../../css/Home.css';

import MainButton from '../../components/MainButton.js';
import HomeBg from './HomeBg.js';

const Home = () => (
  <div className="home">
    <div className="home-content quicksand text-lg text-gray-100 h-screen md:h-auto md:backdrop-filter md:backdrop-blur-lg p-12 md:rounded-lg md:max-w-3xl md:mx-6 md:top-1/4">
      <h2 className="text-3xl font-bold">Conquista el</h2>
      <h1 className="text-8xl font-bold -m-1.5">Mundo</h1>
      <p>Bienvenido, seleccione alguna opción</p>
      <p className="mb-3"></p>
      <div className="flex space-x-3 justify-center md:justify-start">
        <MainButton icon="sports_esports">Crear juego</MainButton>
        <MainButton icon="supervised_user_circle">Unirse a partida</MainButton>
      </div>
    </div>

    <HomeBg />
  </div>
);

export default Home;
