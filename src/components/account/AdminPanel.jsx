import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLoggedInUserRoles } from "../../utils/auth";
import classes from "./Account.module.css";
import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";

const AdminPanel = ({ setRequiredAction }) => {
  const hasElevatedAccess =
    getLoggedInUserRoles().filter((r) => r == "Manager" || r == "Admin")
      .length > 0;

  return (
    hasElevatedAccess && (
      <div className={classes["admin-panel-container"]}>
        <h1>Admin Panel</h1>
        <div className={classes["admin-panel"]}>
          <RoleManagement setRequiredAction={setRequiredAction} />
          <UserManagement setRequiredAction={setRequiredAction} />
        </div>
      </div>
    )
  );
};

export default AdminPanel;
