import '../../css/Input.css';

const Input = ({
  maxLength,
  name,
  id,
  type = 'text',
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      maxLength={maxLength}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className="input quicksand font-bold rounded w-full my-2 py-2 px-4 text-gray-100 leading-tight ease-in-out duration-150"
    ></input>
  );
};

export default Input;
