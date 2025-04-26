import { Form, redirect } from "react-router";
import { getExpiration, logout } from "../utils/auth";

const LogoutPage = () => {
  const authExpiration = getExpiration();

  return (
    <Form method="POST">
      <div>Current login expires at: {authExpiration.toString()}</div>
      <button type="submit">Log out</button>
    </Form>
  );
};

export default LogoutPage;

export const action = async () => {
  await logout();

  return redirect("../");
};
