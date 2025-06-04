import { createContext, useState, useEffect } from "react";
import { markRead as utilsMarkRead } from "../../utils/notif";
import { useSignalR } from "../stores/SignalRContext.jsx";

export const NotificationContext = createContext({
  notifications: [],
  markRead: async (id) => {},
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

  async function markRead(id) {
    await utilsMarkRead(id);
    setNotifications((prevNotifs) => {
      const notifs = [...prevNotifs];
      const notif = notifs.find((n) => n.id == id);
      notif.isRead = true;
      return notifs;
    });
  }

  const ctxValue = {
    notifications,
    markRead,
  };

  return <NotificationContext value={ctxValue}>{children}</NotificationContext>;
}
