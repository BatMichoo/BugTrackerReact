import { useState, use } from "react";
import { Link } from "react-router";
import classes from "../NavBar.module.css";
import { NotificationContext } from "../stores/NotificationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BugNotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = use(NotificationContext).notifications;

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={classes["nav-item"]}
      style={{ position: "relative" }}
      onClick={handleOnClick}
    >
      <FontAwesomeIcon icon="bell" aria-hidden="true" />
      {notifications.length > 0 && (
        <span className={classes["notification-badge"]}>
          {notifications.length}
        </span>
      )}
      {isOpen && (
        <div className={classes["ntf-menu"]}>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((n) => {
                return (
                  <li key={n.bugId} className={classes.ntf}>
                    <Link to={`workflow/bugs/${n.bugId}`}>
                      You've been assigned a new Bug
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>No new notifications.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BugNotificationsPanel;
