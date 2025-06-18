import { useState } from "react";
import { Form, useActionData } from "react-router";
import classes from "./LoginForm.module.css";
import EmailLoginInput from "../inputs/EmailLoginInput.jsx";
import PasswordLoginInput from "../inputs/PasswordLoginInput.jsx";
import FirstNameInput from "../inputs/FirstNameInput.jsx";
import LastNameInput from "../inputs/LastNameInput.jsx";
import UsernameInput from "../inputs/UsernameInput.jsx";
import AgeInput from "../inputs/AgeInput.jsx";

const MIN_PASSWORD_LENGTH = 6;

function validateEmail(email) {
  if (email !== "" && (email === null || !email.includes("@"))) {
    return "Invalid email.";
  }

  return undefined;
}

function validatePassword(password) {
  if (
    password !== "" &&
    (password === null || password.length < MIN_PASSWORD_LENGTH)
  ) {
    return "Password must be at least " + MIN_PASSWORD_LENGTH + " characters.";
  }

  return undefined;
}

const RegisterForm = () => {
  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    password: " ",
  });

  const actionData = useActionData();

  function emailHandleOnChange(event) {
    const error = validateEmail(event.target.value);

    setValidationErrors((prevState) => {
      return { ...prevState, email: error };
    });
  }

  function passwordHandleOnChange(event) {
    const error = validatePassword(event.target.value);

    setValidationErrors((prevState) => {
      return { ...prevState, password: error };
    });
  }

  return (
    <Form method="POST" className={classes["login-form"]}>
      <FirstNameInput />
      <LastNameInput />
      <UsernameInput />
      <EmailLoginInput
        onChange={emailHandleOnChange}
        validationError={validationErrors.email}
      />
      <PasswordLoginInput
        onChange={passwordHandleOnChange}
        validationError={validationErrors.password}
      />
      <AgeInput />
      {actionData?.error && <div>{actionData.error}</div>}
      <button disabled={validationErrors.email || validationErrors.password}>
        Register
      </button>
    </Form>
  );
};

export default RegisterForm;
