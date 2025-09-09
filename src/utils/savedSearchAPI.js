import { getToken } from "./auth";
import { searchesEndpoint } from "./backendEndpoints";

export const createSearch = async (newSearch) => {
  const authToken = getToken();

  const response = await fetch(searchesEndpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSearch),
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not create saved search." },
      { status: response.status },
    );
  }

  const search = await response.json();

  return search;
};

export const getSearches = async () => {
  const authToken = getToken();

  const response = await fetch(searchesEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch saved searches." },
      { status: response.status },
    );
  }

  const searches = await response.json();

  return searches;
};

export const getSearch = async (seachId) => {
  const authToken = getToken();

  const response = await fetch(searchesEndpoint + `/${seachId}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not fetch saved search." },
      { status: response.status },
    );
  }

  const search = response.json();

  return search;
};

export const updateSearch = async (updatedSearch) => {
  const authToken = getToken();

  try {
    const response = await fetch(searchesEndpoint, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSearch),
    });

    if (!response.ok) {
      return new Response(
        { message: "Could not update saved search." },
        { status: response.status },
      );
    }

    const search = await response.json();

    return search;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSearch = async (searchId) => {
  const authToken = getToken();

  const response = await fetch(searchesEndpoint + `/${searchId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  if (!response.ok) {
    return new Response(
      { message: "Could not delete saved search." },
      { status: response.status },
    );
  }

  return true;
};
