import { useState } from "react";
import { updateUser } from "../../utils/userAPI";

// TODO: Add backend endpoints

const AdminEditUserForm = ({ userId, field, onCleanUp }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(userId, { [field]: value });
    onCleanUp();
  };

  return (
    <form onSubmit={handleSubmit} className="section">
      <h3>Edit {field}</h3>
      <input
        type={field === "email" ? "email" : "text"}
        placeholder={`New ${field}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit">Update</button>
        <button type="button" onClick={onCleanUp}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminEditUserForm;
