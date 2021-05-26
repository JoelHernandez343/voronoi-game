import { Link, useLocation } from 'react-router-dom';

import '../../css/VerticalNavBar.css';
import { github } from '../imports/images.js';

const VerticalNavBar = ({ states }) => {
  const [opened, setOpened] = states.opened;
  const onClick = () => setOpened(!opened);

  const { pathname } = useLocation();

  return (
    <nav className="quicksand text-gray-200">
      <h1 className="text-3xl font-bold mb-3">Menú</h1>
      <ul className="font-semibold space-y-1">
        <VerticalLink
          pathname={pathname}
          route="/"
          icon="home"
          title="Home"
          onClick={onClick}
        />
        <VerticalLink
          pathname={pathname}
          route="/rules"
          icon="gavel"
          title="Reglas del juego"
          onClick={onClick}
        />
        <VerticalLink
          pathname={pathname}
          route="/about"
          icon="info"
          title="Sobre"
          onClick={onClick}
        />

        <li className="vnavb-link flex border-t">
          <a
            href="https://github.com/JoelHernandez343/voronoi-game"
            className="flex-grow flex items-center space-x-4 p-2 h-12"
            target="_blank"
            rel="noopener noreferrer"
            title="Fork me on github"
          >
            <img className="w-6" src={github} alt="" />
            <span>Fork me on github</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const VerticalLink = ({ pathname, route, icon, title, onClick }) => (
  <li className="vnavb-link flex" onClick={onClick}>
    <Link to={route} className="flex-grow flex items-center space-x-4 p-2 h-12">
      <span className="material-icon text-3xl w-8">
        {pathname === route ? icon : ''}
      </span>
      <span>{title}</span>
    </Link>
  </li>
);

export default VerticalNavBar;
