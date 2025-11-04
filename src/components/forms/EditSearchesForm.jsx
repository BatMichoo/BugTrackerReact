import classes from "./EditSearchesForm.module.css";
import SavedSearchView from "../searches/SavedSearchView";

export default function EditSearchesForm({ search, onUpdate, onCleanUp }) {
  return (
    <>
      <form className={classes["edit-form"]}>
        <SavedSearchView search={search} isInEditing={true} />
        <button onClick={() => onUpdate(search)}>Update</button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </form>
    </>
  );
}
