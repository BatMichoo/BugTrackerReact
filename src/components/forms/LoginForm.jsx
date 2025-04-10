import { useRef, useState, use } from "react";
import { AuthContext } from "../store/AuthContext";
import Input from "../inputs/Input.jsx";
import Button from "../buttons/Button.jsx";
import { Form } from "react-router";

const minPasswordLength = 6;

function validateInputs(email, password) {
  const errors = [];

  if (email === null || !email.includes("@")) {
    errors.push("Invalid email.");
  }

  if (password === null || password.length < minPasswordLength) {
    errors.push(
      "Password must be at least " + minPasswordLength + " characters."
    );
  }

  return errors;
}

const LoginForm = ({}) => {
  const [loginInfo, setLoginInfo] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = use(AuthContext);

  async function handleLogin() {
    const errors = validateInputs(loginInfo.email, loginInfo.password);

    if (errors.length === 0) {
      const response = await login(loginInfo.email, loginInfo.password);

      if (response.errors) {
        setLoginInfo((prevState) => {
          return { ...prevState, errors: response.errors };
        });
      }
    } else {
      setLoginInfo((prevState) => {
        return { ...prevState, errors: errors };
      });
    }
  }

  function emailHandleOnChange() {
    setLoginInfo((prevState) => {
      return { ...prevState, email: emailRef.current.value };
    });
  }

  function passwordHandleOnChange() {
    setLoginInfo((prevState) => {
      return { ...prevState, password: passwordRef.current.value };
    });
  }

  return (
    <Form method="POST">
      <div>
        <Input
          labelTitle="Email address."
          labelText="Email"
          required={true}
          ref={emailRef}
          name="email"
          type="email"
          onChange={emailHandleOnChange}
        />
        <Input
          labelTitle="Password."
          labelText="Password"
          required={true}
          ref={passwordRef}
          name="password"
          type="password"
          onChange={passwordHandleOnChange}
        />
      </div>
      {loginInfo.errors && (
        <div>
          <ul className="errors">
            {loginInfo.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <button>Login</button>
    </Form>
  );
};
export default LoginForm;
