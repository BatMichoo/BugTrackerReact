import Input from "./Input.jsx";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "Email address.",
  labelText: "Email",
  name: "email",
  type: "email",
  required: true,
  className: classes["login-input"],
};

const EmailLoginInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default EmailLoginInput;
