import { createContext, useState } from "react";

const BASE_ENDPOINT = "https://localhost:7272/users";

const ENDPOINTS = {
  login: BASE_ENDPOINT + "/login",
  register: BASE_ENDPOINT + "/register",
  signOut: BASE_ENDPOINT + "/logout",
};

export const AuthContext = createContext({
  authToken: "",
  isLoggedIn: false,
  register: async () => {},
  login: async (email, password) => {},
  signOut: async () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  async function login(email, password) {
    const response = await fetch(ENDPOINTS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: "Authentication failed." };
    }

    const authData = await response.json();

    const token = authData.token;

    setAuthToken(token);

    return { error: null };
  }

  const ctxValue = {
    authToken: authToken,
    isLoggedIn: authToken !== "",
    register: () => {},
    login: login,
    signOut: () => {},
  };

  return <AuthContext value={ctxValue}>{children}</AuthContext>;
};
