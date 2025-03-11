import logo from "../assets/react.svg";

const Header = () => {
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
          <li className="nav-item">
            <button>Workflow</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
