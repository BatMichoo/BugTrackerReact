import { getProfileName } from "../utils/auth";
import classes from "./NavBar.module.css";

import { NavLink } from "react-router";

const NavBar = () => {
  const name = getProfileName() ?? undefined;

  return (
    <div className={classes.navBar}>
      <ul className={classes["nav-list"]}>
        {name ? (
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
                {name}
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
