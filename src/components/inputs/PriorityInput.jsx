import SelectableInput from "./SelectableInput";

const props = {
  labelTitle: "Priority of a bug.",
  labelText: "Priority",
  name: "Priority",
  availableValues: ["", "Low", "Normal", "High", "Critical"],
};

const PrioritySeachInput = ({ selectedValue }) => {
  return <SelectableInput {...props} selectedValue={selectedValue} />;
};

export default PrioritySeachInput;
