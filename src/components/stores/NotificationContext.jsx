import { useState, useEffect, useCallback } from "react";
import { markRead as utilsMarkRead } from "../../utils/notif";
import { useSignalR } from "../stores/SignalRContext.jsx";
import { NotificationContext } from "./useContexts.js";

export function NotificationContextProvider({ children }) {
  const { on, off } = useSignalR();
  const [notifications, setNotifications] = useState([]);

  const handleNewNotification = useCallback((notification) => {
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications,
    ]);
  }, []);

  useEffect(() => {
    on("new-assigned-bug", handleNewNotification);
    on("new-assigned-role", handleNewNotification);

    return () => {
      off("new-assigned-bug", handleNewNotification);
      off("new-assigned-role", handleNewNotification);
    };
  }, [on, off, handleNewNotification]);

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
