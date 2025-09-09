import { useEffect, useState } from "react";
import { getSearches } from "../../utils/savedSearchAPI";
import classes from "./EditSearchesForm.module.css";
import SavedSearchView from "../searches/SavedSearchView";

export default function EditSearchesForm({ onCleanUp }) {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    async function fetchSearches() {
      const searches = await getSearches();

      setSearches(searches);
    }

    fetchSearches();
  }, []);

  return (
    <>
      <form className={classes["edit-form"]}>
        <ul>
          {searches.map((s) => {
            return (
              <li key={s.id}>
                <SavedSearchView search={s} />
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </form>
    </>
  );
}
