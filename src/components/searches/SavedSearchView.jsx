import { useState } from "react";
import { parseFilter } from "../../utils/searchParamsService";
import classes from "./SavedSearch.module.css";

export default function SavedSearchView({ search, isInEditing = false }) {
  const [isEditing, setIsEditing] = useState(isInEditing);
  const kvp = parseFilter(search.queryString);
  return (
    <div className={classes.search}>
      <h3>
        {isEditing ? (
          <>
            <label>Name</label>
            <input type="text" defaultValue={search.name} />
          </>
        ) : (
          <span>{search.name}</span>
        )}
      </h3>
      {Object.keys(kvp).map((k) => {
        return (
          <div key={k}>
            <div>
              {isEditing ? (
                <p>
                  <label>Type</label>
                  <input type="text" defaultValue={k} />
                </p>
              ) : (
                <span>{k}</span>
              )}
              {isEditing ? (
                <p>
                  <label>Value</label>
                  <input type="text" defaultValue={kvp[k]} />
                </p>
              ) : (
                <span>{kvp[k]}</span>
              )}
            </div>
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
