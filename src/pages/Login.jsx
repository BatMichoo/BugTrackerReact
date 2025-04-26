import { login } from "../utils/auth";
import { redirect } from "react-router";
import LoginForm from "../components/forms/LoginForm";

const BUTTON_TEXT = "Login";

const LoginPage = () => {
  return (
    <div>
      <LoginForm buttonText={BUTTON_TEXT} />
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

  try {
    const success = await login(loginInfo);

    if (success) {
      return redirect("/");
    }

    return { error: "Invalid credentials." };
  } catch (error) {
    console.log(error);
    throw new Response(JSON.stringify({ message: "Authentication failed." }), {
      status: 422,
    });
  }
};
