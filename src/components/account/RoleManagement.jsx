import { useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRoles } from "../stores/useContexts";
import classes from "./Account.module.css";

const RoleManagement = ({ setRequiredAction }) => {
  const { roles, isLoading: isLoadingRoles } = useRoles();
  const roleRef = useRef(null);

  const handleOnClick = useCallback(
    (action) => {
      const selectedRoleId = roleRef.current.value;
      const selectedRole = roles.find((r) => r.id === selectedRoleId);

      if (selectedRole) {
        setRequiredAction({
          action: action,
          id: selectedRole.id,
          name: selectedRole.name,
        });
      }
    },
    [roles, setRequiredAction],
  );

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
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
            </select>
          )}
          <button onClick={() => handleOnClick("edit-role")}>Edit</button>
          <button onClick={() => handleOnClick("delete-role")}>Delete</button>
        </div>
      </div>
    </section>
  );
};

export default RoleManagement;
