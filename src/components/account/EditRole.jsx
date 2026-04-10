import { useCallback, useRef } from "react";
import { useRoles } from "../stores/useContexts";
import { updateRole } from "../../utils/userAPI";

// TODO: Add permissions
const EditRole = ({ roleId, roleName, onCleanUp }) => {
  const { refresh } = useRoles();
  const inputRef = useRef(null);

  const handleOnEdit = useCallback(async () => {
    const newName = inputRef.current.value;

    const success = await updateRole({
      id: roleId,
      oldName: roleName,
      newName: newName,
    });

    if (success) refresh();

    onCleanUp();
  }, [onCleanUp, refresh, roleId, roleName]);

  return (
    <>
      <p>
        <h3>Role name:</h3>
        <input type="text" ref={inputRef} defaultValue={roleName} />
      </p>
      <button className="danger" onClick={handleOnEdit}>
        Edit
      </button>
      <button onClick={onCleanUp}>Cancel</button>
    </>
  );
};

export default EditRole;
