import classes from "./CreateSearchesForm.module.css";
import { deleteSearch } from "../../utils/savedSearchAPI";

export default function DeleteSearchForm({ searchId, onSuccess, onCleanUp }) {
  async function onConfirm() {
    const response = await deleteSearch(searchId);

    if (response) {
      onSuccess((prev) => {
        const updated = [...prev].filter((s) => s.id != searchId);

        return updated;
      });
      onCleanUp();
    }
  }

  return (
    <>
      <form className={classes["edit-form"]}>
        <p>Are you sure you want to delete this saved search?</p>
        <button type="button" onClick={onConfirm}>
          Delete
        </button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </form>
    </>
  );
}
