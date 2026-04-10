import classes from "./Account.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserRoles, removeRoleFromUser } from "../../utils/userAPI";
import { useRoles } from "../stores/useContexts";

function RemoveRoleFromUser({ userId, onCleanUp }) {
  const { roles, refresh } = useRoles();
  const [userRoles, setUserRoles] = useState([]);
  const roleRef = useRef(null);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const fetchedRoles = await getUserRoles(userId);

      setUserRoles(fetchedRoles);
    };

    fetchUserRoles();
  }, [setUserRoles, userId]);
  const handleOnRemove = useCallback(async () => {
    const roleName = roleRef.current.value;

    await removeRoleFromUser(userId, roleName);
    refresh();
    onCleanUp();
  }, [onCleanUp, refresh, userId]);

  const rolesWithNames = roles.filter((r) =>
    userRoles.some((ur) => ur.id === r.id),
  );

  return (
    <div className={classes.form}>
      <h3>Remove Role from User</h3>
      {userRoles.length === 0 ? (
        <p>This user has no roles to remove.</p>
      ) : (
        <div className={classes.control}>
          <label htmlFor="role-remove">Select Role to Remove</label>
          <select id="role-remove" ref={roleRef}>
            {rolesWithNames.map((r) => (
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
          disabled={userRoles.length === 0}
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

export default RemoveRoleFromUser;
