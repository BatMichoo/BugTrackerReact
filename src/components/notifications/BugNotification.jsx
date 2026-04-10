import { useState, use } from "react";
import { Link } from "react-router";
import classes from "../NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationContext } from "../stores/useContexts";

function BugNotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const context = use(NotificationContext);
  const notifications = context.notifications;

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ position: "relative" }} onClick={handleOnClick}>
      <FontAwesomeIcon icon="bell" aria-hidden="true" />
      {unreadNotifs > 0 && (
        <span className={classes["notification-badge"]}>{unreadNotifs}</span>
      )}
      {isOpen && (
        <div className={classes["ntf-menu"]}>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((n) => {
                let className = classes.ntf;
                if (!n.isRead) {
                  className += ` ${classes["ntf-unread"]}`;
                }
                return (
                  <li key={n.id} className={className}>
                    {!!n.bugId ? (
                      <Link
                        to={`workflow/bugs/${n.bugId}`}
                        onClick={async () => await context.markRead(n.id)}
                      >
                        You've been assigned a new Bug
                      </Link>
                    ) : (
                      <span>You've been assigned a new role!</span>
                    )}
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
