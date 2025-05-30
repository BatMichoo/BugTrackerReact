import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import * as signalR from "@microsoft/signalr";
import { getToken } from "../../utils/auth";

const SignalRContext = createContext(null);

export const SignalRProvider = ({ children, hubUrl }) => {
  const [connection, setConnection] = useState(null);
  const notificationHandlers = useRef({});

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => {
          const token = getToken();
          return token;
        },
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return 15000;
          }
          return null;
        },
      })
      .configureLogging(signalR.LogLevel.Error)
      .build();

    newConnection.onclose((e) => {
      console.log("SignalR connection closed:", e);
    });

    newConnection.onreconnecting((error) => {
      console.log("SignalR reconnecting:", error);
    });

    newConnection.onreconnected((connectionId) => {
      console.log("SignalR reconnected. New connection ID:", connectionId);
    });

    setConnection(newConnection);
    return () => {
      newConnection.stop();
    };
  }, [hubUrl]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .catch((err) =>
          console.error("Error starting SignalR connection: ", err),
        );
    }
  }, [connection]);

  const on = useCallback(
    (methodName, newHandler) => {
      if (!notificationHandlers.current[methodName]) {
        notificationHandlers.current[methodName] = [];
      }
      notificationHandlers.current[methodName].push(newHandler);

      if (connection) {
        connection.on(methodName, newHandler);
      }
    },
    [connection],
  );

  const off = useCallback(
    (methodName, handlerToRemove) => {
      if (connection) {
        connection.off(methodName, handlerToRemove);
      }
      if (notificationHandlers.current[methodName]) {
        notificationHandlers.current[methodName] = notificationHandlers.current[
          methodName
        ].filter((h) => h !== handlerToRemove);
      }
    },
    [connection],
  );

  useEffect(() => {
    if (connection) {
      Object.keys(notificationHandlers.current).forEach((methodName) => {
        notificationHandlers.current[methodName].forEach((handler) => {
          connection.on(methodName, handler);
        });
      });
    }
  }, [connection]);

  return (
    <SignalRContext.Provider value={{ connection, on, off }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};
