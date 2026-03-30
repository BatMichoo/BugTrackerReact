import { useState } from "react";
import classes from "./Account.module.css";
import { Suspense } from "react";
import { Await } from "react-router";

export function RoleManagement({
  rolesPromise,
  setRequiredAction,
  onRefreshRoles,
}) {
  const [selectedRoleId, setSelectedRoleId] = useState("");

  return (
    <section className="section">
      <h3>Role Management</h3>
      <div className={classes["role-section"]}>
        <button
          onClick={() => {
            setRequiredAction({ action: "create-role" });
            if (onRefreshRoles) onRefreshRoles();
          }}
        >
          Create
        </button>
        <div className={classes["role-sub-section"]}>
          <Suspense
            fallback={
              <FontAwesomeIcon icon="spinner" spinPulse color="var(--text)" />
            }
          >
            <Await resolve={rolesPromise}>
              {(resolved) => {
                const currentRoleId =
                  selectedRoleId || (resolved?.[0]?.id ?? "");
                const selectedRole = resolved?.find(
                  (r) => r.id === currentRoleId,
                );

                return (
                  <>
                    <select
                      id="selected-role"
                      value={currentRoleId}
                      onChange={(e) => setSelectedRoleId(e.target.value)}
                    >
                      {resolved &&
                        resolved.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                    </select>
                    <button>Edit</button>
                    {selectedRole?.isDeletable ? (
                      <button
                        onClick={() =>
                          setRequiredAction({
                            action: "delete-role",
                            id: selectedRole.name,
                          })
                        }
                      >
                        DELETE
                      </button>
                    ) : undefined}
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
