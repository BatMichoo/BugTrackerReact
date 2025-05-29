import classes from "./Bug.module.css";

const BugButtons = ({ isEditing, onEditClick, onDeleteClick, onCancel }) => {
  return (
    <div className={classes["button-container"]}>
      {isEditing ? (
        <>
          <button type="submit">Save</button>
          <button onClick={onCancel} type="button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={onEditClick}>
            Edit
          </button>
          <button type="button" onClick={onDeleteClick}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BugButtons;
