import { useEffect, useState } from "react";
import classes from "./SavedSearch.module.css";

export default function Searches({ searches, enableSearch }) {
  const [savedSearches, setSavedSearches] = useState();

  useEffect(() => {
    setSavedSearches(searches);
  }, [searches]);

  return (
    <ul className={classes["search-list"]}>
      {savedSearches &&
        savedSearches.map((s) => (
          <li key={s.name}>
            <button type="button" onClick={() => enableSearch(s)}>
              {s.name}
            </button>
          </li>
        ))}
    </ul>
  );
}
