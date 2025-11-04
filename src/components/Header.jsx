import classes from "./Header.module.css";

import { Link } from "react-router";
import NavBar from "./NavBar";
import ThemeToggle from "../utils/theme.jsx";

const Header = () => {
  return (
    <header>
      <div className={classes.logo}>
        <ThemeToggle />
      </div>
      <div className={classes.title}>
        <Link to="/">
          <h3>Bug Tracker</h3>
        </Link>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
