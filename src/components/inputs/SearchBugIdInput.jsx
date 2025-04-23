import Input from "./Input";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  type: "number",
  name: "Id",
  labelTitle: "An Id of a bug.",
  labelText: "Id",
  className: classes.input,
};

const SearchBugIdInput = () => {
  return <Input {...PROPERTIES} />;
};

export default SearchBugIdInput;
