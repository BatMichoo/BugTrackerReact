import { Suspense } from "react";
import { Await, useSearchParams } from "react-router";
import classes from "./SavedSearch.module.css";

export default function SavedSearch({ searchPromise }) {
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
      <Suspense fallback={<div>Loading saved searches...</div>}>
        <Await resolve={searchPromise}>
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
              <div> No Results. </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
