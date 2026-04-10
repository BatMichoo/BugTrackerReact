import { useCallback } from "react";
import { deleteRole } from "../../utils/userAPI";
import { useRoles } from "../stores/useContexts";

const DeleteRole = ({ roleName, onCleanUp }) => {
  const { refresh } = useRoles();

  const handleOnDelete = useCallback(async () => {
    const success = await deleteRole(roleName);

    if (success) refresh();

    onCleanUp();
  }, [onCleanUp, refresh, roleName]);

  return (
    <>
      <h3>Are you sure you want to delete this role?</h3>
      <button className="danger" onClick={handleOnDelete}>
        Delete
      </button>
      <button onClick={onCleanUp}>Cancel</button>
    </>
  );
};

export default DeleteRole;
