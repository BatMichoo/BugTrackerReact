import { useCallback, useRef } from "react";
import { addRoleToUser } from "../../utils/userAPI";
import classes from "./Account.module.css";
import { useRoles } from "../stores/useContexts";

const AddRoleToUserForm = ({ userId, onCleanUp }) => {
  const { roles } = useRoles();
  const roleRef = useRef(null);

  const handleOnAdd = useCallback(async () => {
    const roleName = roleRef.current.value;

    await addRoleToUser(userId, roleName);

    onCleanUp();
  }, [onCleanUp, userId]);

  return (
    <div className={classes.form}>
      <h3>Assign Role to User</h3>
      <div className={classes.control}>
        <label htmlFor="role-select">Select Role</label>
        <select id="role-select" ref={roleRef}>
          {roles.map((r) => (
            /* IMPORTANT: value is r.name, not r.id */
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.actions}>
        <button type="submit" onClick={handleOnAdd}>
          Add Role
        </button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRoleToUserForm;
