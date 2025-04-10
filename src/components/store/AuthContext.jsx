import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const BASE_ENDPOINT = "https://localhost:7272/users";

const ENDPOINTS = {
  login: BASE_ENDPOINT + "/login",
  register: BASE_ENDPOINT + "/register",
  signOut: BASE_ENDPOINT + "/logout",
};

export const AuthContext = createContext({
  authToken: "",
  isLoggedIn: false,
  profile: {
    name: "",
    id: "",
  },
  register: async () => {},
  login: async (email, password) => {},
  signOut: async () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const [profile, setProfile] = useState({});

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

    const decodedToken = jwtDecode(token);

    setProfile({
      name: decodedToken["unique_name"],
      id: decodedToken.sub,
    });

    return { error: null };
  }

  const ctxValue = {
    authToken: authToken,
    isLoggedIn: authToken !== "",
    profile: profile,
    register: () => {},
    login: login,
    signOut: () => {},
  };

  return <AuthContext value={ctxValue}>{children}</AuthContext>;
};
