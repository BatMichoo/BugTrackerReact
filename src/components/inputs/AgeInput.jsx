import Input from "./Input";
import classes from "../forms/LoginForm.module.css";

const PROPERTIES = {
  labelTitle: "Age.",
  labelText: "Age",
  name: "age",
  type: "number",
  required: false,
  className: classes["login-input"],
};

const AgeInput = ({ onChange, validationError }) => {
  return (
    <Input onChange={onChange} {...PROPERTIES}>
      {validationError && validationError !== " " && (
        <p className={classes.error}>{validationError}</p>
      )}
    </Input>
  );
};

export default AgeInput;
