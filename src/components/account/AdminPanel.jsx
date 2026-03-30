import { Suspense, useState } from "react";
import { Await } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserRoles } from "../../utils/auth";
import { getRoles, getUsers } from "../../utils/userAPI";
import classes from "./Account.module.css";

const usersPromise = getUsers();
let rolesPromise = getRoles();

const AdminPanel = ({ setRequiredAction }) => {
  const [selectedUserId, setSelectedUserId] = useState("");

  const hasElevatedAccess =
    getUserRoles().filter((r) => r == "Manager" || r == "Admin").length > 0;

  return (
    hasElevatedAccess && (
      <div className={classes["admin-panel-container"]}>
        <h1>Admin Panel</h1>
        <div className={classes["admin-panel"]}>
          <section className="section">
            <h3>Role Management</h3>
            <div className={classes["role-section"]}>
              <button
                onClick={() => {
                  setRequiredAction({ action: "create-role" });
                  rolesPromise = getRoles();
                }}
              >
                Create
              </button>
              <div className={classes["role-sub-section"]}>
                <Suspense
                  fallback={
                    <FontAwesomeIcon
                      icon="spinner"
                      spinPulse
                      color="var(--text)"
                    />
                  }
                >
                  <Await resolve={rolesPromise}>
                    {(resolved) => (
                      <select id="selected-role">
                        {resolved &&
                          resolved.map((r) => (
                            <option key={r.name} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                      </select>
                    )}
                  </Await>
                </Suspense>
                <button>Edit</button>
                {/* {r.isDeletable ? ( */}
                {/*   <button */}
                {/*     onClick={() => */}
                {/*       setRequiredAction({ */}
                {/*         action: "delete-role", */}
                {/*         id: r.name, */}
                {/*       }) */}
                {/*     } */}
                {/*   > */}
                {/*     DELETE */}
                {/*   </button> */}
                {/* ) : undefined} */}
              </div>
            </div>
          </section>
          <section className="section">
            <h3>User Management</h3>
            <ul className={classes["role-list"]}>
              <Suspense
                fallback={
                  <FontAwesomeIcon
                    icon="spinner"
                    spinPulse
                    size="3x"
                    color="var(--text)"
                  />
                }
              >
                <Await resolve={usersPromise}>
                  {(resolved) => (
                    <>
                      <select
                        className={classes["user-select"]}
                        defaultValue=""
                        onChange={(e) => setSelectedUserId(e.target.value)} // <--- Update state here
                      >
                        <option value="" disabled>
                          Select a User...
                        </option>
                        {resolved &&
                          resolved.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                      </select>

                      <div className={classes["user-actions"]}>
                        {/* Added a class for potential styling */}
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
                </Await>
                {/* <div> */}
                {/*   <button>Add Role</button> */}
                {/*   <button>Remove Role</button> */}
                {/*   <button>Edit username</button> */}
                {/*   <button>Edit email</button> */}
                {/*   <button>DELETE</button> */}
                {/* </div> */}
                {/* <Await resolve={usersPromise}> */}
                {/*   {(resolved) => */}
                {/*     resolved.map((u) => ( */}
                {/*       <li className={classes.user} key={u.id}> */}
                {/*         <h4>{u.name}</h4> */}
                {/*       </li> */}
                {/*     )) */}
                {/*   } */}
                {/* </Await> */}
              </Suspense>
            </ul>
          </section>
        </div>
      </div>
    )
  );
};

export default AdminPanel;
