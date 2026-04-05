import { useState } from "react";
import { buildQueryString, parseFilter } from "../../utils/searchParamsService";
import classes from "./SavedSearch.module.css";
import { updateSearch } from "../../utils/savedSearchAPI";
import { useUsers } from "../stores/useContexts";

export default function EditSearch({ search, onRefresh, onCleanUp }) {
  const { users } = useUsers();

  const SEARCH_TYPES = {
    id: { type: "number", label: "Bug ID" },
    title: { type: "text", label: "Title" },
    assignedTo: {
      type: "select",
      label: "Assigned To",
      options: users.map((u) => ({ value: u.id, label: u.name })),
    },
    createdBy: {
      type: "select",
      label: "Created By",
      options: users.map((u) => ({ value: u.id, label: u.name })),
    },
    createdOn: { type: "date", label: "Created On" },
    priority: {
      type: "select",
      label: "Priority",
      options: [
        { value: "0", label: "Low" },
        { value: "1", label: "Normal" },
        { value: "2", label: "High" },
        { value: "3", label: "Critical" },
      ],
    },
    status: {
      type: "select",
      label: "Status",
      options: [
        { value: "0", label: "In Progress" },
        { value: "1", label: "On Hold" },
        { value: "2", label: "Fixed" },
      ],
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedSearch, setEditedSearch] = useState({ ...search });
  const [filters, setFilters] = useState(
    parseFilter(editedSearch?.queryString ?? ""),
  );

  const defaultFilterKey = Object.keys(SEARCH_TYPES)[0];
  const [newFilterKey, setNewFilterKey] = useState(defaultFilterKey);
  const [newFilterValue, setNewFilterValue] = useState("");

  const handleNameChange = (event) => {
    setEditedSearch((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleAddFilter = () => {
    if (!newFilterKey || newFilterValue === "") return;

    setFilters((prev) => ({
      ...prev,
      [newFilterKey]: newFilterValue,
    }));

    if (SEARCH_TYPES[newFilterKey].type === "select") {
      setNewFilterValue(SEARCH_TYPES[newFilterKey].options[0]?.value || "");
    } else {
      setNewFilterValue("");
    }
  };

  const handleRemoveFilter = (keyToRemove) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[keyToRemove];
      return updatedFilters;
    });
  };

  const handleFilterKeyChange = (e) => {
    const key = e.target.value;
    setNewFilterKey(key);

    if (SEARCH_TYPES[key].type === "select") {
      setNewFilterValue(SEARCH_TYPES[key].options[0]?.value || "");
    } else {
      setNewFilterValue("");
    }
  };

  const onSaveSearch = async () => {
    const queryString = buildQueryString(filters);

    const searchToSave = {
      ...editedSearch,
      queryString,
    };

    try {
      const updatedSearch = await updateSearch(searchToSave);

      if (updatedSearch) onRefresh();
    } catch (e) {
      console.log(e);
    } finally {
      onCleanUp();
    }
  };

  const selectedTypeConfig = SEARCH_TYPES[newFilterKey];

  return (
    <div className={`section ${classes.search}`}>
      <header className={classes.searchHeader}>
        {isEditing ? (
          <div className={classes.inputGroup}>
            <label htmlFor="search-name">Search Name</label>
            <input
              id="search-name"
              type="text"
              value={editedSearch.name}
              onChange={handleNameChange}
              autoFocus
            />
          </div>
        ) : (
          <h3>{editedSearch.name}</h3>
        )}
      </header>

      <div className={classes.searchDetails}>
        <h4>Filters</h4>
        {Object.keys(filters).length === 0 ? (
          <p>No filters applied.</p>
        ) : (
          <ul className={classes.filterList}>
            {Object.entries(filters).map(([key, value]) => {
              const label = SEARCH_TYPES[key]?.label || key;
              let displayValue = value;

              if (SEARCH_TYPES[key]?.type === "select") {
                const option = SEARCH_TYPES[key].options.find(
                  (opt) => opt.value === String(value),
                );
                if (option) displayValue = option.label;
              }

              return (
                <li key={key} className={classes.filterItem}>
                  <span>
                    <strong>{label}:</strong> {displayValue}
                  </span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFilter(key)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {isEditing && (
          <div className={classes.addFilterSection}>
            <h4>Add New Filter</h4>
            <div className={classes.filterControls}>
              <select value={newFilterKey} onChange={handleFilterKeyChange}>
                {Object.entries(SEARCH_TYPES).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>

              {selectedTypeConfig.type === "select" ? (
                <select
                  value={newFilterValue}
                  onChange={(e) => setNewFilterValue(e.target.value)}
                >
                  {selectedTypeConfig.options.length === 0 && (
                    <option value="" disabled>
                      Loading options...
                    </option>
                  )}
                  {selectedTypeConfig.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={selectedTypeConfig.type}
                  value={newFilterValue}
                  onChange={(e) => setNewFilterValue(e.target.value)}
                  placeholder={`Enter ${selectedTypeConfig.label.toLowerCase()}`}
                />
              )}

              <button type="button" onClick={handleAddFilter}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={classes.searchActions}>
        {isEditing ? (
          <button type="button" onClick={onSaveSearch}>
            Save Changes
          </button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button type="button" onClick={onCleanUp}>
          {isEditing ? "Cancel" : "Close"}
        </button>
      </div>
    </div>
  );
}
