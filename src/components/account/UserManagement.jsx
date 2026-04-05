import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUsers } from "../stores/useContexts";
import classes from "./Account.module.css";

const UserManagement = ({ setRequiredAction }) => {
  const { users, isLoading: isLoadingUsers } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState("");

  return (
    <section className="section">
      <h3>User Management</h3>
      <ul className={classes["role-list"]}>
        {isLoadingUsers ? (
          <FontAwesomeIcon
            icon="spinner"
            spinPulse
            size="3x"
            color="var(--text)"
          />
        ) : (
          <>
            <select
              className={classes["user-select"]}
              defaultValue=""
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="" disabled>
                Select a User:
              </option>
              {users &&
                users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
            </select>

            <div className={classes["user-actions"]}>
              <button
                disabled={!selectedUserId}
                onClick={() =>
                  setRequiredAction({
                    action: "admin-add-role",
                    userId: selectedUserId,
                  })
                }
              >
                Add Role
              </button>
              <button
                disabled={!selectedUserId}
                onClick={() =>
                  setRequiredAction({
                    action: "admin-remove-role",
                    userId: selectedUserId,
                  })
                }
              >
                Remove Role
              </button>
              <button
                disabled={!selectedUserId}
                onClick={() =>
                  setRequiredAction({
                    action: "admin-edit-username",
                    userId: selectedUserId,
                  })
                }
              >
                Edit username
              </button>
              <button
                disabled={!selectedUserId}
                onClick={() =>
                  setRequiredAction({
                    action: "admin-edit-email",
                    userId: selectedUserId,
                  })
                }
              >
                Edit email
              </button>
              <button
                className="danger"
                disabled={!selectedUserId}
                onClick={() =>
                  setRequiredAction({
                    action: "admin-delete-user",
                    userId: selectedUserId,
                  })
                }
              >
                DELETE
              </button>
            </div>
          </>
        )}
      </ul>
    </section>
  );
};

export default UserManagement;
