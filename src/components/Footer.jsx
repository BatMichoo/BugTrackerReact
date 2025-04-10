import classes from "./Footer.module.css";
import { Link } from "react-router";

const BUG_TRACKER_GITHUB_LINK = "https://github.com/BatMichoo/BugTrackerReact";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>
        © 2025{" "}
        <span>
          <Link to="/">
            <span>Bug Tracker</span>
          </Link>
        </span>
        . All rights reserved.
      </p>
      <p>Privacy Policy</p>
      <div>
        <a href={BUG_TRACKER_GITHUB_LINK} target="_blank">
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
