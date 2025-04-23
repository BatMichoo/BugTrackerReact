import { getToken } from "./auth";
import { bugsEndpoint } from "./backendEndpoints";

const FILTER_SEPARATORS = {
  keyValue: "_",
  filter: ";",
};

export const getBugs = async (filters) => {
  const authToken = getToken();

  let filter = "";

  if (filters !== undefined) {
    filter = `?filter=${filters}`;
  }

  const response = await fetch(bugsEndpoint + filter, {
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

  const response = await fetch(bugsEndpoint + `/${bugId}`, {
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

export const createFilters = (filterQuery) => {
  let filter = "";

  for (const [key, value] of Object.entries(filterQuery)) {
    if (value) {
      filter += `${key}${FILTER_SEPARATORS.keyValue}${value}${FILTER_SEPARATORS.filter}`;
    }
  }

  return filter;
};
