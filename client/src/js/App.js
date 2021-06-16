import '../css/App.css';
import '../css/fonts.css';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';

// Components
import Home from './pages/home/Home.js';
import Loading from './pages/loading/Loading.js';
import NavBar from './components/NavBar.js';
import SideBar from './components/SideBar';
import VerticalNavBar from './components/VerticalNavBar';

// Modules
import { Game } from './modules/Game.js';

const game = new Game();

const App = () => {
  const history = useHistory();

  const [code, setCode] = useState('YYYY');

  const states = {
    code: [code, setCode],
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
        <Route path="/*">
          <p>This is 404</p>
        </Route>
      </Switch>
    </div>
  );
};

const BarOrNull = () => {
  const { pathname } = useLocation();

  if (pathname === '/loading') {
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
