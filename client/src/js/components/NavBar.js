import { Link, useLocation } from 'react-router-dom';
import { github } from '../imports/images.js';

const NavBar = () => {
  const { pathname } = useLocation();

  if (pathname === '/loading') {
    return null;
  }

  return (
    <nav className="fixed z-10 w-full hidden md:block">
      <ul className="flex space-x-24 justify-end items-center py-5 pr-24 quicksand font-semibold text-gray-200">
        <li className={pathname === '/' ? 'border-b-2' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === '/rules' ? 'border-b-2' : ''}>
          <Link to="/rules">Reglas del juego</Link>
        </li>
        <li className={pathname === '/about' ? 'border-b-2' : ''}>
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
  );
};

export default NavBar;
