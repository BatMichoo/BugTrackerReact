import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";

const VALUES = [
  {
    name: "",
    value: "",
  },
  {
    name: "In Progress",
    value: 0,
  },
  {
    name: "On Hold",
    value: 1,
  },
  {
    name: "Fixed",
    value: 2,
  },
];

const PROPERTIES = {
  labelTitle: "Status of a bug.",
  labelText: "Status",
  name: "Status",
  availableValues: VALUES,
  className: classes.input,
};

const StatusInput = ({ selectedValue }) => {
  return <SelectableInput {...PROPERTIES} selectedValue={selectedValue} />;
};

export default StatusInput;
