import '../../css/Button.css';

const Button = ({ icon, children, onClick }) => (
  <button
    className="bttn quicksand h-8 flex align-center items-center ease-in-out duration-150"
    onClick={onClick}
  >
    <span className="material-icon">{icon}</span>
    <span className={children ? 'px-3 text-base' : ''}>{children}</span>
  </button>
);

export default Button;
