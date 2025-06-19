import SelectableInput from "./SelectableInput";
import classes from "../forms/BugSearchForm.module.css";
import { PRIORITY_ENUMS } from "../../utils/bugEnums";

const PROPERTIES = {
  labelTitle: "Priority of a bug.",
  labelText: "Priority",
  name: "Priority",
  availableValues: PRIORITY_ENUMS,
  className: classes.input,
};

const PrioritySeachInput = ({ selectedValue, onChange }) => {
  return (
    <SelectableInput
      {...PROPERTIES}
      selectedValue={selectedValue}
      onChange={onChange}
    />
  );
};

export default PrioritySeachInput;
