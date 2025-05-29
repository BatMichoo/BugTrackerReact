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
  let formattedDate;

  if (selectedValue) {
    const dateObj = new Date(selectedValue);
    const year = dateObj.getFullYear();
    // Month is 0-indexed, so add 1
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    formattedDate = `${year}-${month}-${day}`;
  }

  return (
    <Input {...PROPERTIES} defaultValue={formattedDate}>
      {children}
    </Input>
  );
};

export default CreatedOnInput;
