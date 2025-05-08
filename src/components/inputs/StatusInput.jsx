import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";
import { STATUS_ENUMS } from "../../utils/bugEnums";

const PROPERTIES = {
  labelTitle: "Status of a bug.",
  labelText: "Status",
  name: "Status",
  availableValues: STATUS_ENUMS,
  className: classes.input,
};

const StatusInput = ({ selectedValue }) => {
  return <SelectableInput {...PROPERTIES} selectedValue={selectedValue} />;
};

export default StatusInput;
