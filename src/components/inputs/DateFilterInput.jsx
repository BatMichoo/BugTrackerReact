import SelectableInput from "./SelectableInput.jsx";
import classes from "../forms/BugSearchForm.module.css";

const VALUES = [
  {
    name: "Before Inclusive",
    value: "<=",
  },
  {
    name: "Before",
    value: "<",
  },
  {
    name: "On",
    value: "=",
  },
  {
    name: "After",
    value: ">",
  },
  {
    name: "After Inclusive",
    value: ">=",
  },
];

const PROPERTIES = {
  labelTitle: "Date Filters.",
  labelText: "Date Filters",
  name: "date-filters",
  type: "date",
  className: classes.input,
  selectedValue: "=",
  availableValues: VALUES,
};

const DateFilterInput = () => {
  return <SelectableInput {...PROPERTIES} />;
};

export default DateFilterInput;
