import { jwtDecode } from "jwt-decode";

const TOKEN_NAME = "bt_token";
const AUTH_EXPIRATION_KEY = "bt_expiration";
const PROFILE_NAME_KEY = "bt_profile_name";
const BASE_ENDPOINT = "https://localhost:7272/users";

const ENDPOINTS = {
  login: BASE_ENDPOINT + "/login",
  register: BASE_ENDPOINT + "/register",
  signOut: BASE_ENDPOINT + "/logout",
};

export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_NAME);

  if (!token) {
    return "";
  }

  return token;
};

const saveToken = (token) => {
  sessionStorage.setItem(TOKEN_NAME, token);
};

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_NAME);
};

const saveExpiration = (expiration) => {
  sessionStorage.setItem(AUTH_EXPIRATION_KEY, expiration);
};

const retrieveExpiration = () => {
  const expiration = sessionStorage.getItem(AUTH_EXPIRATION_KEY);

  return expiration;
};

export const getExpiration = () => {
  const expiration = retrieveExpiration();

  if (!expiration) {
    return -1;
  }

  return expiration;
};

const saveProfileInfo = (profileInfo) => {
  sessionStorage.setItem(PROFILE_NAME_KEY, profileInfo.name);
};

export const getProfileName = () => {
  const name = sessionStorage.getItem(PROFILE_NAME_KEY);

  return name;
};

export const login = async (loginInfo) => {
  const email = loginInfo.email;
  const password = loginInfo.password;

  const response = await fetch(ENDPOINTS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return false;
  }

  const authData = await response.json();

  const token = authData.token;

  saveToken(token);

  const decodedToken = jwtDecode(token);
  const name = decodedToken["unique_name"];

  saveProfileInfo({ name });
  saveExpiration(decodedToken.exp);

  return true;
};

export const logout = async () => {
  const response = await fetch(ENDPOINTS.logout);

  if (!response.ok) {
    return false;
  }

  return true;
};
