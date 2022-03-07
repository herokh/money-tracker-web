const Button = (props) => {
  return (
    <button
      className={`button is-small ${props.className}`}
      onClick={props.onClick ? props.onClick : void 0}
    >
      {props.name}
    </button>
  );
};

export default Button;
