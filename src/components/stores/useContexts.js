import { createContext, useContext } from "react";

export const UsersContext = createContext(null);

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}

export const RolesContext = createContext(null);

export function useRoles() {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("useUsers must be used within a RolesProvider");
  }
  return context;
}
