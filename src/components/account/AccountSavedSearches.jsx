import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Account.module.css";
import { Suspense, useCallback, useRef } from "react";
import { SEARCHES_INTERNAL_ENDPOINT } from "../../utils/backendEndpoints";

const AccountSavedSearches = ({ setRequiredAction, searches, isLoading }) => {
  const selectRef = useRef(null);

  const handleOnClick = useCallback(
    (event, action) => {
      event.stopPropagation();

      const searchId = selectRef.current.value;
      setRequiredAction({ action: action, id: searchId });
    },
    [setRequiredAction],
  );

  return (
    <section className={"section " + classes["search-settings"]}>
      <div className={classes["search-settings-header"]}>
        <h2>Saved Search Settings</h2>
        <button onClick={() => setRequiredAction({ action: "add-search" })}>
          New Saved Search
        </button>
      </div>

      <div className={classes["selected-search-container"]}>
        {isLoading ? (
          <FontAwesomeIcon icon="spinner" spinPulse color="var(--text)" />
        ) : (
          <select id="selected-search" ref={selectRef}>
            {searches.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
        <button
          className="warning"
          onClick={(e) => handleOnClick(e, "edit-search")}
        >
          Edit
        </button>
        <button
          className="danger"
          onClick={(e) => handleOnClick(e, "delete-search")}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default AccountSavedSearches;
