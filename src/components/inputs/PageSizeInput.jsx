import classes from "../forms/BugSearchForm.module.css";
import SelectableInput from "./SelectableInput.jsx";

const PROPERTIES = {
  type: "number",
  name: "pageSizeInput",
  className: classes.input,
  availableValues: [
    {
      name: "10",
      value: 10,
    },
    {
      name: "25",
      value: 25,
    },
    {
      name: "50",
      value: 50,
    },
  ],
};

const PageSizeInput = ({ selectedValue, onChange }) => {
  if (!PROPERTIES.availableValues.find((v) => v.value == selectedValue)) {
    PROPERTIES.availableValues.push({
      name: selectedValue,
      value: selectedValue,
    });
  }

  return (
    <SelectableInput
      selectedValue={selectedValue}
      {...PROPERTIES}
      onChange={onChange}
    />
  );
};

export default PageSizeInput;
