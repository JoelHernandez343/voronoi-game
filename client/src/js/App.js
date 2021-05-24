import '../css/App.css';
import '../css/fonts.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home.js';

const App = () => (
  <Router>
    <div>
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
