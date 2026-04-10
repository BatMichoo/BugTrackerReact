import { useState, useEffect, useCallback } from "react";
import { getRoles } from "../../utils/userAPI";
import { RolesContext } from "./useContexts";
import { getLoggedInUserRoles } from "../../utils/auth";

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasElevatedAccess =
    getLoggedInUserRoles().filter((r) => r == "Manager" || r == "Admin")
      .length > 0;

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
    if (hasElevatedAccess) {
      fetchRoles();
    }
  }, [fetchRoles, hasElevatedAccess]);

  return (
    <RolesContext.Provider value={{ roles, isLoading, refresh: fetchRoles }}>
      {children}
    </RolesContext.Provider>
  );
}
