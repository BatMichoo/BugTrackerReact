import { useEffect, useState } from "react";
import { getUser, removeRoleFromUser } from "../../utils/userAPI";
import classes from "./Account.module.css";

function RemoveRoleFromUserForm({ userId, onCleanUp }) {
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserRoles() {
      try {
        const user = await getUser(userId);
        // Assuming user.roles is an array of strings like ["Admin", "Manager"]
        // based on standard Identity UserViewModel mapping
        const roles = user.roles || [];
        setUserRoles(roles);
        if (roles.length > 0) setSelectedRoleName(roles[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserRoles();
  }, [userId]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedRoleName) return;

    setIsLoading(true);
    try {
      await removeRoleFromUser(userId, selectedRoleName);
      onCleanUp();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h3>Remove Role from User</h3>
      {userRoles.length === 0 ? (
        <p>This user has no roles to remove.</p>
      ) : (
        <div className={classes.control}>
          <label htmlFor="role-remove">Select Role to Remove</label>
          <select
            id="role-remove"
            value={selectedRoleName}
            onChange={(e) => setSelectedRoleName(e.target.value)}
          >
            {userRoles.map((roleName) => (
              <option key={roleName} value={roleName}>
                {roleName}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || userRoles.length === 0}
          className="danger"
        >
          Remove
        </button>
      </div>
    </form>
  );
}

export default RemoveRoleFromUserForm;
