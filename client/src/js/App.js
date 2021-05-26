import '../css/App.css';
import '../css/fonts.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home.js';
import Loading from './pages/loading/Loading.js';
import NavBar from './components/NavBar.js';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rules">
            <p>This is about</p>
          </Route>
          <Route exact path="/about">
            <p>This is about</p>
          </Route>
          <Route exact path="/loading">
            <Loading />
          </Route>
          <Route path="/*">
            <p>This is 404</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
