import { getToken } from "./auth";

const serverEndpoint = "https://localhost:7272/bugs";

export const getBugs = async () => {
  const authToken = getToken();

  const response = await fetch(serverEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch bugs." },
      { status: response.status }
    );
  }

  const bugs = await response.json();

  return bugs;
};

export const getBug = async (bugId) => {
  const authToken = getToken();

  const response = await fetch(serverEndpoint + `/${bugId}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch bug." },
      { status: response.status }
    );
  }

  const bug = await response.json();

  return bug;
};
