import classes from "./SavedSearch.module.css";

export default function Searches({ searches, enableSearch, onDelete }) {
  return (
    <ul className={classes["search-list"]}>
      {searches.map((s) => (
        <li key={s.name}>
          <button
            title="Delete with Shift left click"
            type="button"
            onClick={(e) =>
              e.shiftKey ? onDelete(s.id) : enableSearch(s.queryString)
            }
          >
            {s.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
