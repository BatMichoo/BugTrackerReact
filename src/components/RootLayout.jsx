import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { getProfileName } from "../utils/auth";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

export const loader = async () => {
  const profileName = getProfileName();

  return { profileName };
};
