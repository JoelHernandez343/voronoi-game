import '../css/App.css';
import '../css/fonts.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import Home from './pages/home/Home.js';
import Loading from './pages/loading/Loading.js';
import NavBar from './components/NavBar.js';
import SideBar from './components/SideBar';
import VerticalNavBar from './components/VerticalNavBar';

const App = () => {
  return (
    <Router>
      <div>
        <BarOrNull />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rules">
            <p>This is rules</p>
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
