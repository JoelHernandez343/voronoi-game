import '../../css/SideBar.css';

import { useState, cloneElement } from 'react';

import Button from './Button.js';

const SideBar = ({ left = false, z = 10, extraClass = '', children }) => {
  const [opened, setOpened] = useState(false);

  const bttnPosition = left ? 'justify-start' : 'justify-end';

  const classSideSection = left
    ? `-left-full ${opened ? 'sb-move-to-right' : ''}`
    : `-right-full ${opened ? 'sb-move-to-left' : ''}`;

  const states = {
    opened: [opened, setOpened],
  };

  return (
    <div
      className={`fixed flex flex-row w-full overflow-x-hidde ${extraClass}`}
      style={{ zIndex: z }}
    >
      <div className={`p-5 w-full relative flex ${bttnPosition}`}>
        <Button
          icon="menu_open"
          extraStyle={{ zIndex: z + 1 }}
          onClick={() => setOpened(!opened)}
        />
      </div>
      <div
        className={`w-full md:max-w-sm sb bg-gray-400 absolute h-screen max-h-screen overflow-y-auto p-10 ${classSideSection}`}
      >
        {cloneElement(children, { states })}
      </div>
    </div>
  );
};

export default SideBar;
