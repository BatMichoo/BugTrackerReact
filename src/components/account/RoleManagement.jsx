import { useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRoles } from "../stores/useContexts";
import classes from "./Account.module.css";

const RoleManagement = ({ setRequiredAction }) => {
  const { roles, isLoading: isLoadingRoles } = useRoles();
  const roleRef = useRef(null);

  const handleRoleEdit = useCallback(() => {
    const selectedRoleId = roleRef.current.value;
    setRequiredAction({ action: "edit-role", id: selectedRoleId });
  }, [setRequiredAction]);

  return (
    <section className="section">
      <h3>Role Management</h3>
      <div className={classes["role-section"]}>
        <button onClick={() => setRequiredAction({ action: "create-role" })}>
          Create
        </button>
        <div className={classes["role-sub-section"]}>
          {isLoadingRoles ? (
            <FontAwesomeIcon icon="spinner" spinPulse color="var(--text)" />
          ) : (
            <select id="selected-role" ref={roleRef}>
              {roles &&
                roles.map((r) => (
                  <option key={r.name} value={r.id}>
                    {r.name}
                  </option>
                ))}
            </select>
          )}
          <button onClick={handleRoleEdit}>Edit</button>
        </div>
      </div>
    </section>
  );
};

export default RoleManagement;
