import { useState, useEffect } from "react";
import { getUsers } from "../../utils/userAPI";
import { UsersContext } from "./useContexts";

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    loadUsers();
  }, []);

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : id;
  };

  return (
    <UsersContext.Provider value={{ users, isLoading, getUserName }}>
      {children}
    </UsersContext.Provider>
  );
}
