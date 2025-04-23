import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  labelTitle: "Status of a bug.",
  labelText: "Status",
  name: "Status",
  availableValues: ["", "InProgress", "OnHold", "Fixed"],
  className: classes.input,
};

const StatusInput = ({ selectedValue }) => {
  return <SelectableInput {...PROPERTIES} selectedValue={selectedValue} />;
};

export default StatusInput;
