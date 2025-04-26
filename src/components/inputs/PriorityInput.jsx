import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";

const VALUES = [
  {
    name: "",
    value: "",
  },
  {
    name: "Low",
    value: 0,
  },
  {
    name: "Normal",
    value: 1,
  },
  {
    name: "High",
    value: 2,
  },
  {
    name: "Critical",
    value: 3,
  },
];

const PROPERTIES = {
  labelTitle: "Priority of a bug.",
  labelText: "Priority",
  name: "Priority",
  availableValues: VALUES,
  className: classes.input,
};

const PrioritySeachInput = ({ selectedValue }) => {
  return <SelectableInput {...PROPERTIES} selectedValue={selectedValue} />;
};

export default PrioritySeachInput;
