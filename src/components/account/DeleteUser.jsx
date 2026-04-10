import { deleteUser } from "../../utils/userAPI";

const DeleteUser = ({ userId, onSuccess, onCleanUp }) => {
  const handleDelete = async () => {
    const result = await deleteUser(userId);
    if (result) onSuccess?.();

    onCleanUp();
  };

  return (
    <div className="section">
      <h3>Confirm Deletion</h3>
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="form-actions">
        <button
          type="button"
          style={{ backgroundColor: "var(--warning)", color: "var(--danger)" }}
          onClick={handleDelete}
        >
          Confirm Delete
        </button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
