const Select = (props) => {
  return (
    <select
      className="input is-small"
      value={props.value}
      onChange={props.onChange}
    >
      {props.children}
    </select>
  );
};

export default Select;
