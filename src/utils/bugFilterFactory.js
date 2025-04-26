export const FILTER_SEPARATORS = {
  keyValue: "_",
  filter: ";",
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
