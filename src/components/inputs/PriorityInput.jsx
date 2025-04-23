import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  labelTitle: "Priority of a bug.",
  labelText: "Priority",
  name: "Priority",
  availableValues: ["", "Low", "Normal", "High", "Critical"],
  className: classes.input,
};

const PrioritySeachInput = ({ selectedValue }) => {
  return <SelectableInput {...PROPERTIES} selectedValue={selectedValue} />;
};

export default PrioritySeachInput;
