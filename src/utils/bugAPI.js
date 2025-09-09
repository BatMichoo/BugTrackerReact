import { getToken } from "./auth";
import { bugsEndpoint } from "./backendEndpoints";

export const createBug = async (newBug) => {
  const authToken = getToken();

  const response = await fetch(bugsEndpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBug),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not create bug." },
      { status: response.status },
    );
  }

  const bug = await response.json();

  return bug;
};

export const getBugs = async (queryString) => {
  const authToken = getToken();

  const response = await fetch(bugsEndpoint + queryString, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch bugs." },
      { status: response.status },
    );
  }

  const bugs = await response.json();

  return bugs;
};

export const getBug = async (bugId, isFullyIncluded) => {
  const authToken = getToken();
  const inclString = isFullyIncluded ? "?isFullyIncluded=true" : "";

  const response = await fetch(bugsEndpoint + `/${bugId}` + inclString, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch bug." },
      { status: response.status },
    );
  }

  const bug = await response.json();

  return bug;
};

export const updateBug = async (updatedBug) => {
  const authToken = getToken();

  try {
    const response = await fetch(bugsEndpoint, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBug),
    });

    if (!response.ok) {
      return new Response(
        { message: "Could not update bug." },
        { status: response.status },
      );
    }

    const bug = await response.json();

    return bug;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBug = async (bugId) => {
  const authToken = getToken();

  const response = await fetch(bugsEndpoint + `/${bugId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not delete bug." },
      { status: response.status },
    );
  }

  return true;
};
