import Input from "./Input.jsx";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "Password.",
  labelText: "Password",
  name: "password",
  type: "password",
  required: true,
  className: classes["login-input"],
};

const PasswordLoginInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default PasswordLoginInput;
