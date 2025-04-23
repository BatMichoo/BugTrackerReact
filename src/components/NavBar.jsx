import classes from "./NavBar.module.css";

import { NavLink, useLoaderData } from "react-router";

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
            <li className={classes["nav-item"]}>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {profileName}
              </NavLink>
            </li>
            <li className={classes["nav-item"]}>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Log out
              </NavLink>
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
