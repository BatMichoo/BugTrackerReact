import { useState } from "react";
import { parseFilter } from "../../utils/searchParamsService";
import classes from "./SavedSearch.module.css";

export default function SavedSearchView({ search }) {
  const [isEditing, setIsEditing] = useState(false);
  const kvp = parseFilter(search.queryString);
  return (
    <div className={classes.search}>
      <h3>{search.name}</h3>
      {Object.keys(kvp).map((k) => {
        return (
          <div key={k}>
            <p>
              {isEditing ? (
                <input type="text" defaultValue={k} />
              ) : (
                <span>{k}</span>
              )}
              <span>{kvp[k]}</span>
            </p>
            {isEditing ? (
              <button type="button" onClick={() => setIsEditing(false)}>
                Save
              </button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
