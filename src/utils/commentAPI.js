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
      { status: response.status },
    );
  }

  const comment = await response.json();

  return comment;
}

export async function updateComment(comment) {
  const authToken = getToken();

  const commentURL = commentsEndpoint.replace("{bugId}", comment.bugId);

  const response = await fetch(commentURL, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not update comment." },
      { status: response.status },
    );
  }

  const newComment = await response.json();

  return newComment;
}

export async function deleteComment(id, bugId) {
  const authToken = getToken();

  const commentURL = commentsEndpoint.replace("{bugId}", bugId);

  const response = await fetch(commentURL + `/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not delete comment." },
      { status: response.status },
    );
  }

  return true;
}

export async function updateLikes(id, bugId, op) {
  const authToken = getToken();

  const commentURL = commentsEndpoint.replace("{bugId}", bugId);
  const operation = op ? `?operation=${op}` : "";

  const response = await fetch(commentURL + `/${id}/react${operation}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not react to comment." },
      { status: response.status },
    );
  }

  const likes = await response.json();

  return likes;
}
