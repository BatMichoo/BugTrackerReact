import Input from "./Input";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  type: "date",
  name: "CreatedOn",
  labelTitle: "A date of creation of a bug.",
  labelText: "Created On",
  className: classes.input,
};

const CreatedOnInput = ({ selectedValue, children }) => {
  return (
    <Input {...PROPERTIES} defaultValue={selectedValue}>
      {children}
    </Input>
  );
};

export default CreatedOnInput;
