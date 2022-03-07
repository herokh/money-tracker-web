import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerWrapper = (props) => {
  return (
    <DatePicker
      className="input is-small"
      selected={props.selected}
      onChange={props.onChange}
    />
  );
};

export default DatePickerWrapper;
