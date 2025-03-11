import SelectableInput from "./SelectableInput";

const props = {
  labelTitle: "Status of a bug.",
  labelText: "Status",
  name: "Status",
  availableValues: ["", "InProgress", "OnHold", "Fixed"],
};

const StatusInput = ({ selectedValue }) => {
  return <SelectableInput {...props} selectedValue={selectedValue} />;
};

export default StatusInput;
