import SelectableInput from "./SelectableInput";

const props = {
  labelTitle: "An user assigned to a bug.",
  labelText: "Assigned To",
  name: "AssignedTo",
};

const AssignedToInput = ({ selectedValue, availableValues }) => {
  return (
    <SelectableInput
      {...props}
      selectedValue={selectedValue}
      availableValues={availableValues}
    />
  );
};

export default AssignedToInput;
