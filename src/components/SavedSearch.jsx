import { Suspense } from "react";
import { Await, useSearchParams } from "react-router";
import classes from "./SavedSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SavedSearchContext } from "./stores/SavedSearchContext";

export default function SavedSearch({ searches }) {
  const [_, setSearchParams] = useSearchParams();

  function enableSearch(search) {
    setSearchParams(() => {
      const newParams = new URLSearchParams();

      newParams.set("filter", search.queryString);

      return newParams;
    });
  }

  return (
    <div className={classes["searches-container"]}>
      <h3>Saved searches</h3>
      <Suspense
        fallback={
          <FontAwesomeIcon icon="spinner" spinPulse size="3x" color="black" />
        }
      >
        <Await resolve={searches}>
          {(searches) => {
            return searches && searches.length > 0 ? (
              <ul className={classes["search-list"]}>
                {searches.map((s) => (
                  <li key={s.name}>
                    <button type="button" onClick={() => enableSearch(s)}>
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div> No Saved Searches. </div>
            );
          }}
        </Await>
      </Suspense>
      <button disabled type="button" className={classes["save-btn"]}>
        Save current search
      </button>
    </div>
  );
}
