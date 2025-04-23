import { getExpiration } from "../utils/auth";

const LogoutPage = () => {
  const authExpiration = getExpiration();

  return <div>Current login expires at: {authExpiration.toString()}</div>;
};

export default LogoutPage;

export const action = () => {};
