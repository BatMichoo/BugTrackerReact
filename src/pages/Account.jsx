import classes from "../components/account/Account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useEffect, useRef, useState } from "react";
import Dialog from "../components/modals/Dialog";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import EditSearchesForm from "../components/forms/EditSearchesForm";
import { getRoles } from "../utils/auth";
import { getSearches } from "../utils/savedSearchAPI";
import { Await } from "react-router";
import { getUsers } from "../utils/userAPI";

const usersPromise = getUsers();

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

  const hasElevatedAccess =
    getRoles().filter((r) => r == "Manager" || r == "Admin").length > 0;

  let dialogContent;

  function cleanUp() {
    setRequiredAction(undefined);
  }

  switch (requiredAction) {
    case "password":
      dialogContent = <ChangePasswordForm onCleanUp={cleanUp} />;
      break;
    case "edit-search":
      dialogContent = <EditSearchesForm onCleanUp={cleanUp} />;
      break;
    case "delete-search":
      dialogContent = <EditSearchesForm onCleanUp={cleanUp} />;
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
        <section className={classes["acc-section"]}>
          <h3>Account Settings</h3>
          <button onClick={() => setRequiredAction("password")} type="button">
            Change Password
          </button>
        </section>
        <section className={classes["search-section"]}>
          <h3>Saved Search Settings</h3>
          <select id="selected-search">
            {searches.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button>Edit</button>
          <button>Delete</button>
        </section>
      </div>
      {hasElevatedAccess ? (
        <div>
          <h3>Admin Panel</h3>
          <Suspense
            fallback={
              <FontAwesomeIcon
                icon="spinner"
                spinPulse
                size="3x"
                color="black"
              />
            }
          >
            <Await resolve={usersPromise}>
              {(resolved) => resolved.map((u) => <p key={u.id}>{u.name}</p>)}
            </Await>
          </Suspense>
        </div>
      ) : undefined}
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
