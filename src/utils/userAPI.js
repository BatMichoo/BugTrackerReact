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

  try {
    const response = await fetch(changePasswordEndpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwords),
    });

    if (!response.ok) {
      return { error: await response.json() };
    }
    return { ok: true };
  } catch (error) {
    console.log(error);
    return new Response(
      { message: "Could not change password." },
      { status: 400 },
    );
  }
}
