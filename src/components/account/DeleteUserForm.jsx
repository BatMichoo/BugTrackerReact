import { useState } from "react";
// import { deleteUser } from "../../utils/userAPI";
import classes from "./Account.module.css";

function DeleteUserForm({ userId, onSuccess, onCleanUp }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await deleteUser(userId);
      if (onSuccess) onSuccess(); // Trigger refresh in parent if needed
      onCleanUp();
    } catch (err) {
      alert("Failed to delete user.");
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.form}>
      <h3>Delete User?</h3>
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>

      <div className={classes.actions}>
        <button type="button" onClick={onCleanUp} disabled={isLoading}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="danger" // Assuming you have a global .danger class
        >
          {isLoading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    </div>
  );
}

export default DeleteUserForm;
