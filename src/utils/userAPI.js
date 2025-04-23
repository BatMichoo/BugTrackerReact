import { getToken } from "./auth";
import { usersEndpoint } from "./backendEndpoints";

export const getUsers = async () => {
  const authToken = getToken();

  const response = await fetch(usersEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch users." },
      { status: response.status }
    );
  }

  const users = await response.json();

  return users;
};
