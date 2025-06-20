import Input from "./Input";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  type: "number",
  name: "Id",
  labelTitle: "An Id of a bug.",
  labelText: "Id",
  className: classes.input,
};

const SearchBugIdInput = ({ selectedValue, onChange }) => {
  return <Input {...PROPERTIES} value={selectedValue} onChange={onChange} />;
};

export default SearchBugIdInput;
