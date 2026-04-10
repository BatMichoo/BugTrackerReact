import { login } from "../utils/auth";
import LoginForm from "../components/forms/LoginForm";

const BUTTON_TEXT = "Login";

const LoginPage = () => {
  return <LoginForm buttonText={BUTTON_TEXT} />;
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
      window.location.href = "/";
      return null;
    }

    return { error: "Invalid credentials." };
  } catch (error) {
    console.log(error);
    throw new Response(JSON.stringify({ message: "Authentication failed." }), {
      status: 422,
    });
  }
};
