import classes from "./Bug.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              <FontAwesomeIcon icon="pen" />
          </button>
          <button type="button" onClick={onDeleteClick}>
              <FontAwesomeIcon icon="trash" />
          </button>
        </>
      )}
    </div>
  );
};

export default BugButtons;
