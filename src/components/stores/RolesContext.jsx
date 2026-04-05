import { useState, useEffect, useCallback } from "react";
import { getRoles } from "../../utils/userAPI";
import { RolesContext } from "./useContexts";

export function RolessProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoles = useCallback(() => {
    const refreshRoles = async () => {
      setIsLoading(true);
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Failed to load roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    refreshRoles();
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <RolesContext.Provider value={{ roles, isLoading, refresh: fetchRoles }}>
      {children}
    </RolesContext.Provider>
  );
}
