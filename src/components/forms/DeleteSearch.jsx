import { useCallback } from "react";
import { deleteSearch } from "../../utils/savedSearchAPI";

export default function DeleteSearch({ searchId, onDelete, onCleanUp }) {
  const handleOnDelete = useCallback(async () => {
    const success = await deleteSearch(searchId);

    if (success) {
      onDelete();
    }
    onCleanUp();
  }, [onCleanUp, onDelete, searchId]);

  return (
    <>
      <p>Are you sure you want to delete this saved search?</p>
      <button type="button" onClick={handleOnDelete}>
        Delete
      </button>
      <button type="button" onClick={onCleanUp}>
        Cancel
      </button>
    </>
  );
}
