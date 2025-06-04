import { getToken } from "./auth";
import { notifEndpoint } from "./backendEndpoints";

export async function markRead(id) {
  const authToken = getToken();

  await fetch(notifEndpoint + `?id=${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
  });
}
