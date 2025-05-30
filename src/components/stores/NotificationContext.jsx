import { createContext, useState, useEffect } from "react";
import { useSignalR } from "./SignalRContext";

export const NotificationContext = createContext({
  notifications: [],
  markRead: (id) => {},
});

export function NotificationContextProvider({ children }) {
  const { on, off } = useSignalR();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleBugAssignment = (notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    };

    on("new-assigned-bug", handleBugAssignment);

    return () => {
      off("new-assigned-bug", handleBugAssignment);
    };
  }, [on, off]);

  function markRead(id) {
    const notif = notifications.find((n) => n.id == id);

    notif.isRead = true;
  }

  const ctxValue = {
    notifications,
    markRead,
  };

  return <NotificationContext value={ctxValue}>{children}</NotificationContext>;
}
