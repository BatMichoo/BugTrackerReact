import Input from "./Input";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "First name.",
  labelText: "First name",
  name: "first-name",
  type: "text",
  required: true,
  className: classes["login-input"],
};

const FirstNameInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default FirstNameInput;
