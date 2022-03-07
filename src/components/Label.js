const Label = (props) => {
  return (
    <label className="has-text-grey-dark is-size-7" style={props.style}>
      {props.name}
    </label>
  );
};

export default Label;
