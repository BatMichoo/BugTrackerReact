import { Suspense, useRef, useState } from "react";
import { Await, useSearchParams } from "react-router";
import classes from "./SavedSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Searches from "./Searches";
import Dialog from "../modals/Dialog";
import { createSearch, deleteSearch } from "../../utils/savedSearchAPI";

export default function SavedSearch({ searches }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearches, setSavedSearches] = useState(searches);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const queryString = searchParams.get("filter");

  function enableSearch(queryString) {
    setSearchParams(() => {
      const newParams = new URLSearchParams();

      newParams.set("filter", queryString);

      return newParams;
    });
  }

  async function saveNewSearch(name) {
    const search = await createSearch({ name, queryString });
    setSavedSearches((prev) => [...prev, search]);

    modalRef.current.close();
  }

  async function deleteSavedSearch(id) {
    const result = await deleteSearch(id);

    if (result) {
      if (queryString === savedSearches.find((s) => s.id == id).queryString) {
        setSearchParams(() => new URLSearchParams());
      }
      setSavedSearches((prev) => {
        const searches = [...prev].filter((s) => s.id != id);

        return searches;
      });
    }
  }

  const isNewSearch =
    queryString && !savedSearches.some((s) => s.queryString === queryString);

  return (
    <div className={classes["searches-container"]}>
      <h3>Saved searches</h3>
      <Dialog ref={modalRef}>
        <h4>Save search</h4>
        <input ref={inputRef} type="text" />
        <button
          type="button"
          onClick={async () => await saveNewSearch(inputRef.current.value)}
        >
          Save
        </button>
        <button type="button" onClick={() => modalRef.current.close()}>
          Cancel
        </button>
      </Dialog>
      {savedSearches && savedSearches.length > 0 ? (
        <Searches
          enableSearch={enableSearch}
          searches={savedSearches}
          onDelete={deleteSavedSearch}
        />
      ) : (
        <div> No Saved Searches. </div>
      )}
      <button
        disabled={!isNewSearch}
        type="button"
        className={classes["save-btn"]}
        onClick={() => modalRef.current.showModal()}
      >
        Save current search
      </button>
    </div>
  );
}
