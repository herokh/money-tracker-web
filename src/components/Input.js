const Input = (props) => {
  return (
    <input
      className="input is-small"
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoComplete="off"
    />
  );
};

export default Input;
