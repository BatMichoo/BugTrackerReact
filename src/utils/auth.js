import { jwtDecode } from "jwt-decode";
import { usersEndpoint } from "./backendEndpoints";

const TOKEN_NAME = "bt_token";
const AUTH_EXPIRATION_KEY = "bt_expiration";
const PROFILE_NAME_KEY = "bt_profile_name";
const BASE_ENDPOINT = usersEndpoint;

const ENDPOINTS = {
  login: BASE_ENDPOINT + "/login",
  register: BASE_ENDPOINT + "/register",
  signOut: BASE_ENDPOINT + "/logout",
};

export const getPermissions = () => {
  const decodedToken = jwtDecode(getToken());

  const permissions = decodedToken["Permissions"].split(", ");

  return permissions;
};

export function getRoles() {
  const decodedToken = jwtDecode(getToken());

  const roles =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ].split(", ");

  return roles;
}
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
  const expDate = new Date(expiration * 1000); //convert to milliseconds from seconds in JWT

  sessionStorage.setItem(AUTH_EXPIRATION_KEY, expDate.toISOString());
};

const clearExpiration = () => {
  sessionStorage.removeItem(AUTH_EXPIRATION_KEY);
};

const retrieveExpiration = () => {
  const expiration = sessionStorage.getItem(AUTH_EXPIRATION_KEY);

  const expDate = new Date(expiration);

  return expDate;
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

const clearProfileName = () => {
  sessionStorage.removeItem(PROFILE_NAME_KEY);
};

export function getUserId() {
  const token = getToken();

  const userId = jwtDecode(token).sub;

  return userId;
}
export const login = async (loginInfo) => {
  const response = await fetch(ENDPOINTS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
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

  clearToken();
  clearExpiration();
  clearProfileName();

  return true;
};

export const register = async (registerInfo) => {
  const response = await fetch(ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  });

  if (!response.ok) {
    return { error: await response.json() };
  }

  return await response.json();
};
