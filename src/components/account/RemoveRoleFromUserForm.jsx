import classes from "./Account.module.css";
import { useRoles } from "../stores/useContexts";
import { useCallback, useRef } from "react";
import { removeRoleFromUser } from "../../utils/userAPI";

function RemoveRoleFromUserForm({ userId, onCleanUp }) {
  const { roles } = useRoles();
  const roleRef = useRef(null);

  const handleOnRemove = useCallback(async () => {
    const roleName = roleRef.current.value;

    await removeRoleFromUser(userId, roleName);
    onCleanUp();
  }, [userId]);

  return (
    <div className={classes.form}>
      <h3>Remove Role from User</h3>
      {roles.length === 0 ? (
        <p>This user has no roles to remove.</p>
      ) : (
        <div className={classes.control}>
          <label htmlFor="role-remove">Select Role to Remove</label>
          <select id="role-remove" ref={roleRef}>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={classes.actions}>
        <button
          type="submit"
          disabled={roles.length === 0}
          className="danger"
          onClick={handleOnRemove}
        >
          Remove
        </button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveRoleFromUserForm;
