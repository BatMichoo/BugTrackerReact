import { createContext } from "react";
import { deleteSearch, getSearches } from "../../utils/savedSearchAPI";

export const SavedSearchContext = createContext({
  getSearches: () => {},
  saveSearch: () => {},
  deleteSearch: () => {},
  updateSearch: () => {},
});

export default function SavedSearchContextProvider({ children }) {
  function fetchSearches() {
    return getSearches();
  }

  function removeSearch(id) {
    return deleteSearch(id);
  }

  const ctxValue = {
    getSearches: fetchSearches,
    deleteSearch: removeSearch,
  };
  return <SavedSearchContext value={ctxValue}>{children}</SavedSearchContext>;
}
