import { useState, useEffect } from "react";
import { getUsers } from "../../utils/userAPI";
import { UsersContext } from "./useContexts";
import { getToken } from "../../utils/auth";

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!getToken();

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      loadUsers();
    }
  }, [isLoggedIn]);

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : id;
  };

  return (
    <UsersContext.Provider
      value={{
        // @ts-ignore
        users,
        isLoading,
        getUserName,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
