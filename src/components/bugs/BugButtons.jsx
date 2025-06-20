import classes from "./Bug.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BugButtons = ({
  isEditing,
  onEditClick,
  onDeleteClick,
  onCancel,
  canDelete,
}) => {
  return (
    <div className={classes["button-container"]}>
      {isEditing ? (
        <>
          <button type="submit">
            <FontAwesomeIcon icon="floppy-disk" color="lightblue" />
          </button>
          <button onClick={onCancel} type="button">
            <FontAwesomeIcon icon="times" color="lightcoral" />
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={onEditClick}>
            <FontAwesomeIcon icon="pen" color="lightblue" />
          </button>
          {canDelete ? (
            <button type="button" onClick={onDeleteClick}>
              <FontAwesomeIcon icon="trash" color="lightcoral" />
            </button>
          ) : undefined}
        </>
      )}
    </div>
  );
};

export default BugButtons;
