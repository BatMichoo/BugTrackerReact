import { useCallback, useRef, useState } from "react";
import { Form, useActionData } from "react-router";
import classes from "./LoginForm.module.css";
import EmailLoginInput from "../inputs/EmailLoginInput.jsx";
import PasswordLoginInput from "../inputs/PasswordLoginInput.jsx";

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

const LoginForm = ({ buttonText }) => {
  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    password: " ",
  });

  const actionData = useActionData();

  const emailTimerRef = useRef(null);
  const passwordTimerRef = useRef(null);

  const emailHandleOnChange = useCallback((event) => {
    const value = event.target.value;

    if (emailTimerRef.current) {
      clearTimeout(emailTimerRef.current);
    }

    emailTimerRef.current = setTimeout(() => {
      const error = validateEmail(value);
      setValidationErrors((prevState) => ({ ...prevState, email: error }));
    }, 300);
  }, []);

  const passwordHandleOnChange = useCallback((event) => {
    const value = event.target.value;

    if (passwordTimerRef.current) {
      clearTimeout(passwordTimerRef.current);
    }

    passwordTimerRef.current = setTimeout(() => {
      const error = validatePassword(value);
      setValidationErrors((prevState) => ({ ...prevState, password: error }));
    }, 300);
  }, []);

  return (
    <Form method="POST" className={classes["login-form"]}>
      <EmailLoginInput
        onChange={emailHandleOnChange}
        validationError={validationErrors.email}
      />
      <PasswordLoginInput
        onChange={passwordHandleOnChange}
        validationError={validationErrors.password}
      />
      {actionData?.error && (
        <div className={classes.error}>{actionData.error}</div>
      )}
      <button
        disabled={!!validationErrors.email || !!validationErrors.password}
      >
        {buttonText}
      </button>
    </Form>
  );
};

export default LoginForm;
