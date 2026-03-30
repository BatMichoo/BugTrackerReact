import { getToken } from "./auth";
import { usersEndpoint, rolesEndpoint } from "./backendEndpoints";

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

export async function getUser(userId) {
  const authToken = getToken();
  const response = await fetch(`${usersEndpoint}/${userId}`, {
    headers: { Authorization: "Bearer " + authToken },
  });

  if (!response.ok) {
    throw new Error("Could not fetch user details.");
  }

  return await response.json();
}

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

export async function getRoles() {
  const authToken = getToken();

  const response = await fetch(rolesEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch roles." },
      { status: response.status },
    );
  }

  const roles = await response.json();

  return roles;
}

export async function createRole(roleName) {
  const authToken = getToken();

  const response = await fetch(rolesEndpoint + `?roleName=${roleName}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not create role." },
      { status: response.status },
    );
  }

  const role = await response.json();

  return role;
}

export async function deleteRole(roleName) {
  const authToken = getToken();

  const response = await fetch(rolesEndpoint + `?roleName=${roleName}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not delete role." },
      { status: response.status },
    );
  }

  const role = await response.json();

  return role;
}

export async function addRoleToUser(userId, roleName) {
  const authToken = getToken();
  const url = `${usersEndpoint}/assign-role?userId=${userId}&role=${roleName}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + authToken },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.errorMessage || "Could not assign role.");
  }

  return true;
}

export async function removeRoleFromUser(userId, roleName) {
  const authToken = getToken();
  const url = `${usersEndpoint}/unassign-role?userId=${userId}&role=${roleName}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + authToken },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.errorMessage || "Could not remove role.");
  }

  return true;
}
