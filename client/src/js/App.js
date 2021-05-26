import '../css/App.css';
import '../css/fonts.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { github } from './imports/images.js';

import Home from './pages/home/Home.js';

const App = () => (
  <Router>
    <div>
      <nav className="fixed z-10 w-full">
        <ul className="flex space-x-24 justify-end items-center py-5 pr-24 quicksand font-semibold text-gray-200">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rules">Reglas del juego</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
          <li>
            <a
              href="https://github.com/JoelHernandez343/voronoi-game"
              target="_blank"
              rel="noopener noreferrer"
              title="Fork me on github"
            >
              <img className="w-6" src={github} alt="" />
            </a>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <p>This is about</p>
        </Route>
        <Route path="/*">
          <p>This is 404</p>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
