import { getToken } from "./auth";
import { commentsEndpoint } from "./backendEndpoints";

export async function createComment(content, bugId) {
  const authToken = getToken();

  const commentURL = commentsEndpoint.replace("{bugId}", bugId);

  const response = await fetch(commentURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      bugId,
    }),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not create bug." },
      { status: response.status }
    );
  }

  const comment = await response.json();

  return comment;
}
