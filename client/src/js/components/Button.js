import '../../css/Button.css';

const Button = ({
  icon,
  children,
  onClick,
  formMethod,
  type = 'button',
  extraClass = '',
  extraStyle = {},
}) => (
  <button
    className={`bttn quicksand h-8 flex align-center items-center ease-in-out duration-150 text-gray-100 ${extraClass}`}
    style={{ ...extraStyle }}
    formMethod={formMethod}
    onClick={onClick}
    type={type}
  >
    <span className="material-icon">{icon}</span>
    <span className={children ? 'px-3 text-base' : ''}>{children}</span>
  </button>
);

export default Button;
