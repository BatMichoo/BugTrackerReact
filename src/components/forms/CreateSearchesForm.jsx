import classes from "./CreateSearchesForm.module.css";
import CreateSearchView from "../searches/CreateSearchView";

export default function CreateSearchesForm({ search, onUpdate, onCleanUp }) {
  return (
    <>
      <form className={classes["edit-form"]}>
        <CreateSearchView
          search={search}
          isInEditing={true}
          onCleanUp={onCleanUp}
          onUpdate={onUpdate}
        />
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </form>
    </>
  );
}
