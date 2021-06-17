import '../css/App.css';
import '../css/fonts.css';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Home from './pages/home/Home.js';
import GamePage from './pages/game/GamePage.js';
import Loading from './pages/loading/Loading.js';
import EndGame from './pages/endgame/EndGame.js';

// Components
import SideBar from './components/SideBar';
import NavBar from './components/NavBar.js';
import VerticalNavBar from './components/VerticalNavBar';

// Modules
import Game from './modules/Game.js';
import Board from './modules/Board.js';

const game = new Game();

const App = () => {
  const history = useHistory();

  const [code, setCode] = useState('YYYY');
  const [playerInTurn, setPlayerInTurn] = useState('iouVSDFGDSfDs');
  const [localPlayer, setLocalPlayer] = useState({
    nickname: 'UserPlaceholder1',
    socketId: 'iouVSDFGDSfDs',
    sites: {
      castle: 1,
      tower: 7,
      barrack: 10,
      catapult: 5,
    },
    area: 0,
    percentage: 0,
    color: '',
  });

  const [opponentPlayer, setOpponentPlayer] = useState({
    nickname: 'UserPlaceholder2',
    socketId: 'iouVSDFGDSasdss',
    sites: {
      castle: 1,
      tower: 7,
      barrack: 10,
      catapult: 5,
    },
    area: 0,
    percentage: 0,
    color: '',
  });

  const [status, setStatus] = useState({ status: 'waiting' });

  const [board, setBoard] = useState(
    new Board({
      totalArea: 20000,
      bounds: [0, 0, 800, 500],
      sites: [],
    })
  );

  const [turnsNumber, setTurnsNumber] = useState(0);

  const [finished, setFinished] = useState(false);

  const [winner, setWinner] = useState({
    nickname: 'UserPlaceholder1',
    socketId: 'iouVSDFGDSfDs',
    sites: {
      castle: 1,
      tower: 7,
      barrack: 10,
      catapult: 5,
    },
    area: 0,
    percentage: 0,
  });

  const states = {
    code: [code, setCode],
    board: [board, setBoard],
    status: [status, setStatus],
    winner: [winner, setWinner],
    finished: [finished, setFinished],
    localPlayer: [localPlayer, setLocalPlayer],
    turnsNumber: [turnsNumber, setTurnsNumber],
    playerInTurn: [playerInTurn, setPlayerInTurn],
    opponentPlayer: [opponentPlayer, setOpponentPlayer],
  };

  game.history = history;
  game.states = states;

  return (
    <div>
      <BarOrNull />
      <Switch>
        <Route exact path="/">
          <Home game={game} />
        </Route>
        <Route exact path="/rules">
          <p>This is rules</p>
        </Route>
        <Route exact path="/about">
          <p>This is about</p>
        </Route>
        <Route exact path="/loading">
          <Loading code={code} />
        </Route>
        <Route exact path="/game">
          <GamePage game={game} states={states} />
        </Route>
        <Route exact path="/endgame">
          <EndGame states={states} />
        </Route>
        <Route path="/*">
          <p>This is 404</p>
        </Route>
      </Switch>
    </div>
  );
};

const BarOrNull = () => {
  const { pathname } = useLocation();

  if (
    pathname === '/loading' ||
    pathname === '/game' ||
    pathname === '/endgame'
  ) {
    return null;
  }

  return (
    <>
      <NavBar />
      <SideBar extraClass="md:hidden">
        <VerticalNavBar />
      </SideBar>
    </>
  );
};

export default App;
