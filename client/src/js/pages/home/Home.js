import { useState } from 'react';

import '../../../css/Home.css';

import SelectSection from './SelectSection.js';
import JoinGame from './JoinGame.js';
import CreateGame from './CreateGame.js';
import HomeBg from './HomeBg.js';
import Button from './../../components/Button.js';

const Home = ({ game }) => {
  const [section, setSection] = useState('content');
  const [movingRight, setMovingRight] = useState(false);

  const states = {
    section: [section, setSection],
    movingRight: [movingRight, setMovingRight],
  };

  return (
    <div className="home flex items-center">
      <div className="home-description quicksand text-lg w-full text-gray-100 min-h-screen md:min-h-0 lg:pl-52 lg:max-w-3xl">
        <div className="pb-10 px-10 pt-60 md:pt-10 lg:p-0">
          <p className="text-6xl md:text-9xl text-center">
            <span className="material-icon">local_police</span>
          </p>

          <h2 className="text-3xl font-bold text-center">Conquista el</h2>
          <h1 className="text-8xl font-bold -ml-1.5 mb-3 text-center">Mundo</h1>

          <div className="">
            <h3 className="text-xl text-center">Pre-Alpha-v0.5</h3>
            <h3 className="text-xl font-black text-blue-800 text-center">
              <a
                href="https://github.com/JoelHernandez343/voronoi-game"
                target="_blank"
                rel="noopener noreferrer"
                title="Fork me on github"
              >
                Por Joel Harim Hernández Javier
              </a>
            </h3>
          </div>

          <p className="leading-relaxed font-semibold mb-4 text">
            <strong>Conquista el mundo</strong> es un juego de estrategia
            multijugador de dos personas que controlan 2 reinos distintos. El
            juego consiste en dominar la mayor parte del tablero mediante la
            colocación de sitios que tienen un área de influencia.
          </p>
        </div>

        <div className="home-sections p-10 lg:rounded-lg">
          <div className="overflow-x-hidden">
            <div
              className={`w-full flex relative home-section-original ${
                movingRight ? 'home-section-move-to-right' : ''
              }`}
            >
              <SelectSection states={states} />
              <div className="w-full flex-grow-0 flex-shrink-0 pl-px">
                <Button icon="arrow_back" onClick={() => setMovingRight(false)}>
                  Regresar
                </Button>
                {section === 'create' ? (
                  <CreateGame states={states} game={game} />
                ) : section === 'join' ? (
                  <JoinGame states={states} game={game} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeBg />
    </div>
  );
};

export default Home;
