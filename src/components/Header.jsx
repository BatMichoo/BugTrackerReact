import logo from "../assets/react.svg";
import classes from "./Header.module.css";

import { Link } from "react-router";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
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
