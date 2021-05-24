import '../../css/Button.css';

import * as icons from '../imports/icons';

const MainButton = ({ icon, children }) => (
  <button className="bttn quicksand w-60 h-16">
    <img src={icons[icon]} alt="" />
    {children}
  </button>
);

export default MainButton;
