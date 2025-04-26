import RegisterForm from "../components/forms/RegisterForm";
import { register } from "../utils/auth";
import { redirect } from "react-router";

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const registerInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    username: formData.get("username"),
    age: formData.get("age"),
  };

  try {
    const response = await register(registerInfo);

    if (!response.error) {
      return redirect("/login");
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Response(JSON.stringify({ message: "Registration failed." }), {
      status: 422,
    });
  }
};
