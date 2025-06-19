export function parseFilter(filter) {
  const filters = filter?.split(";") ?? [];

  const parsedFilters = {};

  for (let filt of filters) {
    const pairs = filt.split("_");

    if (pairs.length > 2) {
      parsedFilters.createdOn = {
        date: pairs[1],
        filterOpt: pairs[2],
      };
    } else {
      parsedFilters[pairs[0]] = pairs[1];
    }
  }

  return parsedFilters;
}
