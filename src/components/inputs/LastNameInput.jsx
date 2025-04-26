import Input from "./Input";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "Last name.",
  labelText: "Last name",
  name: "last-name",
  type: "text",
  required: true,
  className: classes["login-input"],
};

const LastNameInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default LastNameInput;
