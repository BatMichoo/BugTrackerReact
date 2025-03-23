import logo from "../assets/react.svg";
import classes from "./Header.module.css";

import { use, useState } from "react";
import { AuthContext } from "./store/AuthContext";
import LoginForm from "./forms/LoginForm";
import { Link, NavLink } from "react-router";

const Header = () => {
  const { isLoggedIn, login } = use(AuthContext);
  const [isInLogin, setIsInLogin] = useState(false);

  function handleOnLogin() {}

  return (
    <header id="header">
      <div>
        <Link to="/">
          <img src={logo} className={classes.logo} />
        </Link>
      </div>
      <div className={classes.title}>
        <Link to="/">
          <h3>Bug Tracker</h3>
        </Link>
      </div>
      <div className={classes.navBar}>
        <ul id="nav-list">
          {isLoggedIn ? (
            <li className={classes.navItem}>
              <NavLink
                to="/workflow"
                end
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Workflow
              </NavLink>
            </li>
          ) : (
            <li className={classes.navItem}>
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
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
