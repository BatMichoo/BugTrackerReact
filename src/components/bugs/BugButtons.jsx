import classes from "./Bug.module.css";

const BugButtons = ({ isEditing, onClick }) => {
  return (
    <div className={classes["button-container"]}>
      {isEditing ? (
        <button type="submit">Save</button>
      ) : (
        <button type="button" onClick={onClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default BugButtons;
