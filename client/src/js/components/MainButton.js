import '../../css/MainButton.css';

const MainButton = ({ icon, children }) => (
  <button className="bttn quicksand w-44 flex align-center items-center flex-col">
    <span className="material-icon mt-4 mb-2 text-6xl">{icon}</span>
    <span className="flex-grow flex-shrink flex items-center my-2">
      {children}
    </span>
  </button>
);

export default MainButton;
