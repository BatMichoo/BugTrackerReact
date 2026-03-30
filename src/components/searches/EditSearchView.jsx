import { useState } from "react";
import { parseFilter } from "../../utils/searchParamsService";
import classes from "./SavedSearch.module.css";
import { updateSearch } from "../../utils/savedSearchAPI";

export default function EditSearchView({
  search,
  onUpdate,
  onCleanUp,
  isInEditing = false,
}) {
  const [isEditing, setIsEditing] = useState(isInEditing);
  const kvp = parseFilter(search?.queryString ?? "");
  const savedSearch = { ...search };

  function handleChange(event) {
    const { name, value } = event.target;
    savedSearch[name] = value;
  }

  async function onSaveSearch() {
    await updateSearch(savedSearch);

    setIsEditing(false);
    onCleanUp();
  }

  return (
    <div className={classes.search}>
      <h3>
        {isEditing ? (
          <>
            <input
              type="hidden"
              id="search-id"
              defaultValue={savedSearch?.id}
            />
            <label>Name</label>
            <input
              type="text"
              defaultValue={savedSearch?.name}
              onChange={handleChange}
              name="name"
            />
          </>
        ) : (
          <span>{search?.name}</span>
        )}
      </h3>
      {Object.keys(kvp).length > 0
        ? Object.keys(kvp).map((k) => {
            return (
              <div key={k}>
                <div>
                  {isEditing ? (
                    <p>
                      <label>Type</label>
                      <input
                        type="text"
                        defaultValue={k}
                        name="type"
                        onChange={handleChange}
                      />
                    </p>
                  ) : (
                    <span>{k}</span>
                  )}
                  {isEditing ? (
                    <p>
                      <label>Value</label>
                      <input
                        type="text"
                        defaultValue={kvp[k]}
                        name="value"
                        onChange={handleChange}
                      />
                    </p>
                  ) : (
                    <span>{kvp[k]}</span>
                  )}
                </div>
                {isEditing ? (
                  <button
                    type="button"
                    onClick={async () => await onSaveSearch()}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => onUpdate(search)}>Update</button>
                    <button type="button" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            );
          })
        : undefined}
    </div>
  );
}
