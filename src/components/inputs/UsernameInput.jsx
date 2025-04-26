import Input from "./Input";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "User name.",
  labelText: "User name",
  name: "username",
  type: "text",
  required: true,
  className: classes["login-input"],
};

const UsernameInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default UsernameInput;
