import { NavLink, Link } from "react-router";
import classes from "./NavBar.module.css";
import { useState } from "react";

const AccountDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={classes["nav-item"]}>
        Account
        {isOpen && (
          <div className={classes["nav-menu"]}>
            <ul>
              <li>
                <Link to="/account">Open</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};

export default AccountDropDown;
