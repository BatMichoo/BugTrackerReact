import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { getProfileName } from "../utils/auth";
import { UsersProvider } from "./stores/UsersContext";
import { RolesProvider } from "./stores/RolesContext";

const RootLayout = () => {
  return (
    <>
      <UsersProvider>
        <RolesProvider>
          <Header />
          <Outlet />
          <Footer />
        </RolesProvider>
      </UsersProvider>
    </>
  );
};

export default RootLayout;

export const loader = async () => {
  const profileName = getProfileName();

  return { profileName };
};
