import Input from "./Input";
import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  type: "text",
  name: "Title",
  labelTitle: "A title of a bug.",
  labelText: "Title",
  className: classes.input,
};

const TitleInput = ({ selectedValue }) => {
  return <Input {...PROPERTIES} defaultValue={selectedValue} />;
};

export default TitleInput;
