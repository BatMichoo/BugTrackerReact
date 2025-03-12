import logo from "../assets/react.svg";

import { use, useState } from "react";
import { AuthContext } from "./store/AuthContext";
import LoginForm from "./forms/LoginForm";

const Header = () => {
  const { isLoggedIn, login } = use(AuthContext);
  const [isInLogin, setIsInLogin] = useState(false);

  function handleOnLogin() {}

  return (
    <header id="header">
      <div>
        <img src={logo} className="logo" />
      </div>
      <div className="title">
        <h3>Bug Tracker</h3>
      </div>
      <div className="nav-bar">
        <ul id="nav-list">
          {isLoggedIn ? (
            <li className="nav-item">
              <button>Workflow</button>
            </li>
          ) : isInLogin ? (
            <li className="nav-item">
              <LoginForm />
            </li>
          ) : (
            <li className="nav-item">
              <button onClick={() => setIsInLogin(true)}>Login</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
