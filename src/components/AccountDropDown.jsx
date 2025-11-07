import { NavLink, useNavigate, useRevalidator } from "react-router";
import classes from "./NavBar.module.css";
import { useRef, useState } from "react";
import { logout } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./modals/Modal";

const MODAL_CONTENT = {
  confirmed: "",
  success: (
    <>
      <h3>Log out confirmed!</h3>
      <p>
        <FontAwesomeIcon
          icon="info"
          color="blue"
          style={{ marginRight: "0.5em" }}
        />
        Successfully logged out!
      </p>
    </>
  ),
  failed: (
    <p>
      Could <strong>NOT</strong> log out!
    </p>
  ),
};

const AccountDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const modalRef = useRef();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  function startLogOut() {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }

  return (
    <>
      <Modal
        ref={modalRef}
        action={logout}
        onSuccess={() => navigate("/").then(revalidator.revalidate)}
        cleanUp={() => { }}
        displayContent={MODAL_CONTENT}
      />
      <div
        style={{ position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Account
        </NavLink>
        {isOpen && (
          <div className={classes["nav-menu"]}>
            <ul>
              <li>
                <div onClick={() => startLogOut()}>Logout</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountDropDown;
