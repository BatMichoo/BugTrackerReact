import { login } from "../utils/auth";
import { redirect } from "react-router";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const loginInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const success = await login(loginInfo);

  if (success) {
    return redirect("/");
  }

  return { message: "Authentication failed.", status: 422 };
};
