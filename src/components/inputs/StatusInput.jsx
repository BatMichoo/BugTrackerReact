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

const StatusInput = ({ selectedValue, onChange }) => {
  return (
    <SelectableInput
      {...PROPERTIES}
      selectedValue={selectedValue}
      onChange={onChange}
    />
  );
};

export default StatusInput;
