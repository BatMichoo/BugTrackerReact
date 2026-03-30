import { useEffect, useState } from "react";
import { getRoles, addRoleToUser } from "../../utils/userAPI";
import classes from "./Account.module.css";

function AddRoleToUserForm({ userId, onCleanUp }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleName, setSelectedRoleName] = useState(""); // Changed to Name
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
      const data = await getRoles();
      setRoles(data);
      // The backend returns RoleView { Name, IsDeletable }, so use Name
      if (data.length > 0) setSelectedRoleName(data[0].name);
    }
    fetchRoles();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await addRoleToUser(userId, selectedRoleName);
      onCleanUp();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h3>Assign Role to User</h3>
      <div className={classes.control}>
        <label htmlFor="role-select">Select Role</label>
        <select
          id="role-select"
          value={selectedRoleName}
          onChange={(e) => setSelectedRoleName(e.target.value)}
        >
          {roles.map((r) => (
            /* IMPORTANT: value is r.name, not r.id */
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
          Add Role
        </button>
      </div>
    </form>
  );
}

export default AddRoleToUserForm;
