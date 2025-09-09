import { Suspense, useEffect, useRef, useState } from "react";
import { Await, useSearchParams } from "react-router";
import classes from "./SavedSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Searches from "./Searches";
import Dialog from "../modals/Dialog";
import { createSearch } from "../../utils/savedSearchAPI";

export default function SavedSearch({ searchesPromise }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(null);
  const modalRef = useRef();
  const inputRef = useRef();

  function enableSearch(search) {
    setSearchParams(() => {
      const newParams = new URLSearchParams();

      newParams.set("filter", search.queryString);

      return newParams;
    });
  }

  async function saveNewSearch(queryString, name) {
    await createSearch({ name, queryString });

    setIsSaving(false);
  }

  useEffect(() => {
    if (isSaving) {
      modalRef.current.showModal();
      // } else if (isSaving !== null) {
      //   modalRef.current.close();
    }
  }, [isSaving]);

  return (
    <div className={classes["searches-container"]}>
      <h3>Saved searches</h3>
      {isSaving ? (
        <Dialog ref={modalRef}>
          <h4>Save search</h4>
          <input ref={inputRef} type="text" />
          <button
            type="button"
            onClick={async () =>
              await saveNewSearch(
                searchParams.get("filter"),
                inputRef.current.value,
              )
            }
          >
            Save
          </button>
          <button type="button" onClick={() => setIsSaving(false)}>
            Cancel
          </button>
        </Dialog>
      ) : undefined}
      <Suspense
        fallback={
          <FontAwesomeIcon icon="spinner" spinPulse size="3x" color="black" />
        }
      >
        <Await resolve={searchesPromise}>
          {(searches) => {
            return searches && searches.length > 0 ? (
              <Searches enableSearch={enableSearch} searches={searches} />
            ) : (
              <div> No Saved Searches. </div>
            );
          }}
        </Await>
      </Suspense>
      <button
        disabled={!searchParams.get("filter")}
        type="button"
        className={classes["save-btn"]}
        onClick={() => setIsSaving(true)}
      >
        Save current search
      </button>
    </div>
  );
}
