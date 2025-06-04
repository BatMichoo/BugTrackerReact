import AccountDropDown from "./AccountDropDown";
import classes from "./NavBar.module.css";

import { NavLink, useLoaderData } from "react-router";
import BugNotificationsPanel from "./notifications/BugNotification";

import { SignalRProvider } from "./stores/SignalRContext";
import { serverEndpoint } from "../utils/backendEndpoints";

import { NotificationContextProvider } from "./stores/NotificationContext";
const NavBar = () => {
  const { profileName } = useLoaderData();

  return (
    <div className={classes.navBar}>
      <ul className={classes["nav-list"]}>
        {profileName ? (
          <>
            <li className={classes["nav-item"]}>
              <NavLink
                to="/workflow"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Workflow
              </NavLink>
            </li>
            <li>
              <SignalRProvider hubUrl={serverEndpoint + "/notifs"}>
                <NotificationContextProvider>
                  <BugNotificationsPanel />
                </NotificationContextProvider>
              </SignalRProvider>
            </li>
            <li className={classes["nav-item"]}>
              <AccountDropDown />
            </li>
          </>
        ) : (
          <>
            <li className={classes["nav-item"]}>
              <NavLink
                to="/login"
                end
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Log in
              </NavLink>
            </li>
            <li className={classes["nav-item"]}>
              <NavLink
                to="/register"
                end
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
