import classes from "../components/account/Account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useEffect, useRef, useState } from "react";
import { Await } from "react-router";
import Dialog from "../components/modals/Dialog";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import CreateSearchesForm from "../components/forms/CreateSearchesForm";
import EditSearchesForm from "../components/forms/EditSearchesForm";
import { getSearches, deleteSearch } from "../utils/savedSearchAPI";
import CreateRoleForm from "../components/forms/CreateRole";
import DeleteSearchForm from "../components/forms/DeleteSearchForm";
import AddRoleToUserForm from "../components/account/AddRoleToUserForm";
import RemoveRoleFromUserForm from "../components/account/RemoveRoleFromUserForm";

function AccountPage() {
  const [requiredAction, setRequiredAction] = useState(undefined);
  const [searches, setSearches] = useState([]);
  const dialogRef = useRef();

  async function fetchSearches() {
    const searches = await getSearches();

    setSearches(searches);
  }

  useEffect(() => {
    fetchSearches();
  }, []);

  let dialogContent;

  function cleanUp() {
    setRequiredAction(undefined);
  }

  let action = requiredAction && requiredAction.action;
  let search = undefined;

  switch (action) {
    case "password":
      dialogContent = <ChangePasswordForm onCleanUp={cleanUp} />;
      break;
    case "edit-search":
      search = searches.find((s) => s.id == requiredAction.id);
      dialogContent = (
        <EditSearchesForm
          search={search}
          onUpdate={setSearches}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "delete-search":
      search = searches.find((s) => s.id == requiredAction.id);
      dialogContent = (
        <DeleteSearchForm
          searchId={requiredAction.id}
          onSuccess={setSearches}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "add-search":
      dialogContent = <CreateSearchesForm onCleanUp={cleanUp} />;
      break;
    case "create-role":
      dialogContent = <CreateRoleForm onCleanUp={cleanUp} />;
      break;
    case "delete-role":
      dialogContent = <CreateRoleForm onCleanUp={cleanUp} />;
      break;
    case "admin-add-role":
      // Placeholder: You'll need a form that takes a userId and lets you pick a role
      dialogContent = (
        <AddRoleToUserForm userId={requiredAction.userId} onCleanUp={cleanUp} />
      );
      break;
    case "admin-remove-role":
      dialogContent = (
        <RemoveRoleFromUserForm
          userId={requiredAction.userId}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "admin-edit-username":
      dialogContent = (
        <AdminEditUserForm
          userId={requiredAction.userId}
          field="username"
          onCleanUp={cleanUp}
        />
      );
      break;
    case "admin-edit-email":
      dialogContent = (
        <AdminEditUserForm
          userId={requiredAction.userId}
          field="email"
          onCleanUp={cleanUp}
        />
      );
      break;
    case "admin-delete-user":
      dialogContent = (
        <DeleteUserForm
          userId={requiredAction.userId}
          onSuccess={() => {
            /* logic to refresh user list */
          }}
          onCleanUp={cleanUp}
        />
      );
      break;
    default:
      dialogContent = undefined;
      break;
  }

  useEffect(() => {
    if (requiredAction) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [requiredAction]);

  return (
    <div className={classes["acc-container"]}>
      <Dialog ref={dialogRef}>{dialogContent}</Dialog>
      <h1>Account</h1>
      <div className={classes["settings-container"]}>
        <section className={classes["acc-settings"] + " section"}>
          <h2>Account Settings</h2>
          <button
            onClick={() => setRequiredAction({ action: "password" })}
            type="button"
          >
            Change Password
          </button>
          <button
            onClick={() => setRequiredAction({ action: "username" })}
            type="button"
          >
            Change Username
          </button>
          <button
            onClick={() => setRequiredAction({ action: "email" })}
            type="button"
          >
            Change Email
          </button>
        </section>
        <section className={"section " + classes["search-settings"]}>
          <div className={classes["search-settings-header"]}>
            <h2>Saved Search Settings</h2>
            <button onClick={() => setRequiredAction({ action: "add-search" })}>
              New Saved Search
            </button>
          </div>
          <div className={classes["selected-search-container"]}>
            <select id="selected-search">
              {searches.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              className="warning"
              onClick={() => {
                const searchId =
                  document.getElementById("selected-search").value;
                setRequiredAction({ action: "edit-search", id: searchId });
              }}
            >
              Edit
            </button>
            <button
              className="danger"
              onClick={() => {
                const searchId =
                  document.getElementById("selected-search").value;
                setRequiredAction({ action: "delete-search", id: searchId });
              }}
            >
              Delete
            </button>
          </div>
        </section>
      </div>
      <AdminPanel setRequiredAction={setRequiredAction} />
    </div>
  );
}

export default AccountPage;

// export async function action({ request }) {
//   const data = await request.formData();
//
//   const oldPassword = data.get("oldPassword");
//   const newPassword = data.get("newPassword");
//
//   const passwords = {
//     oldPassword,
//     newPassword,
//   };
//
//   try {
//     await changePassword(passwords);
//   } catch (error) {
//     throw new Response(
//       JSON.stringify({ message: "Could not change password." }),
//       {
//         status: 400,
//       },
//     );
//   }
// }
