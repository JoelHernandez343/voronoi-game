import { useState } from 'react';

import '../../../css/Home.css';

import SelectSection from './SelectSection.js';
import JoinGame from './JoinGame.js';
import CreateGame from './CreateGame.js';
import HomeBg from './HomeBg.js';

const Home = () => {
  const [section, setSection] = useState('content');

  const states = {
    section: [section, setSection],
  };

  return (
    <div className="home">
      <div className="home-sections quicksand">
        <div className="overflow-x-hidden">
          <div
            className={`w-full flex relative home-section-left ${
              section === 'content' ? '' : 'home-section-move-to-left'
            }`}
          >
            <SelectSection states={states} />
            {section === 'content' ? null : section === 'create' ? (
              <CreateGame states={states} />
            ) : (
              <JoinGame states={states} />
            )}
          </div>
        </div>
      </div>
      <HomeBg />
    </div>
  );
};

export default Home;
