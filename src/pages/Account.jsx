import classes from "../components/account/Account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Await, useFetcher } from "react-router";
import Dialog from "../components/modals/Dialog";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import CreateRole from "../components/forms/CreateRole";
import AddRoleToUserForm from "../components/account/AddRoleToUserForm";
import RemoveRoleFromUserForm from "../components/account/RemoveRoleFromUserForm";
import AdminPanel from "../components/account/AdminPanel";
import DeleteUserForm from "../components/account/DeleteUserForm";
import AdminEditUserForm from "../components/account/AdminEditUserForm";
import AccountSavedSearches from "../components/account/AccountSavedSearches";
import CreateSearchView from "../components/searches/CreateSearchView";
import EditSearch from "../components/searches/EditSearchView";
import DeleteSearch from "../components/forms/DeleteSearch";
import { SEARCHES_INTERNAL_ENDPOINT } from "../utils/backendEndpoints";
import { getProfileName } from "../utils/auth";

function AccountPage() {
  const [requiredAction, setRequiredAction] = useState(undefined);
  const fetcher = useFetcher();
  const dialogRef = useRef(null);

  let dialogContent;

  const cleanUp = useCallback(() => {
    setRequiredAction(undefined);
  }, []);

  const handleRefreshSearches = useCallback(() => {
    fetcher.load(SEARCHES_INTERNAL_ENDPOINT);
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(SEARCHES_INTERNAL_ENDPOINT);
    }
  }, [fetcher]);

  const searches = fetcher.data || [];
  const isSearchesLoading = fetcher.state === "loading";

  let action = requiredAction && requiredAction.action;
  let search = undefined;

  switch (action) {
    case "password":
      dialogContent = <ChangePasswordForm onCleanUp={cleanUp} />;
      break;
    case "edit-search":
      search = searches.find((s) => s.id == requiredAction.id);
      dialogContent = (
        <EditSearch
          search={search}
          onRefresh={handleRefreshSearches}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "delete-search":
      search = searches.find((s) => s.id == requiredAction.id);
      dialogContent = (
        <DeleteSearch
          searchId={requiredAction.id}
          onDelete={handleRefreshSearches}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "add-search":
      dialogContent = (
        <CreateSearchView
          onCreate={handleRefreshSearches}
          onCleanUp={cleanUp}
        />
      );
      break;
    case "create-role":
      dialogContent = <CreateRole onCleanUp={cleanUp} />;
      break;
    case "edit-role":
      dialogContent = <CreateRole onCleanUp={cleanUp} />;
      break;
    case "delete-role":
      dialogContent = <CreateRole onCleanUp={cleanUp} />;
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

  const profile = getProfileName();

  return (
    <div className={classes["acc-container"]}>
      <Dialog ref={dialogRef}>{dialogContent}</Dialog>
      <h1>{profile}'s Account</h1>
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
        <AccountSavedSearches
          setRequiredAction={setRequiredAction}
          searches={searches}
          isLoading={isSearchesLoading}
        />
      </div>
      <AdminPanel setRequiredAction={setRequiredAction} />
    </div>
  );
}

export default AccountPage;
