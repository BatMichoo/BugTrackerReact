import { getToken } from "./auth";
import { usersEndpoint } from "./backendEndpoints";

const changePasswordEndpoint = usersEndpoint + "/change-password";

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
      { status: response.status },
    );
  }

  const users = await response.json();

  return users;
};

export async function changePassword(passwords) {
  const authToken = getToken();

  const response = await fetch(changePasswordEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(passwords),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not change password." },
      { status: response.status },
    );
  }

  return true;
}
