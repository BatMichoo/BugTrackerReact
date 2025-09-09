import { getToken } from "./auth";
import { repliesEndpoint } from "./backendEndpoints";

export async function createReply(content, bugId, commentId) {
  const authToken = getToken();

  const replyURL = repliesEndpoint
    .replace("{bugId}", bugId)
    .replace("{commentId}", commentId);

  const response = await fetch(replyURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not create reply." },
      { status: response.status },
    );
  }

  const reply = await response.json();

  return reply;
}

export async function deleteReply(id, bugId, commentId) {
  const authToken = getToken();

  const replyURL = repliesEndpoint
    .replace("{bugId}", bugId)
    .replace("{commentId}", commentId);

  const response = await fetch(replyURL + `/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not delete reply." },
      { status: response.status },
    );
  }

  return true;
}
