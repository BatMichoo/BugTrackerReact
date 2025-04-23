import SelectableInput from "./SelectableInput.jsx";
import classes from "../forms/BugSearchForm.module.css";

const DATE_AVAILABLE_FILTERS = [
  "Before",
  "Before Incl",
  "On",
  "After",
  "After Incl",
];

const PROPERTIES = {
  labelTitle: "Date Filters.",
  labelText: "Date Filters",
  name: "date-filters",
  type: "date",
  className: classes.input,
  selectedValue: "On",
  availableValues: DATE_AVAILABLE_FILTERS,
};

const DateFilterInput = () => {
  return <SelectableInput {...PROPERTIES} />;
};

export default DateFilterInput;
