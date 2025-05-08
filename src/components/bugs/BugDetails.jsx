import BugProperty from "./BugProperty";
import Comment from "./Comment";
import classes from "./Bug.module.css";
import BugButtons from "./BugButtons";
import { useNavigate } from "react-router";
import { PRIORITY_MAPPING, STATUS_MAPPING } from "../../utils/bugEnums";

const TEXT_AREA_GRID_SIZE = {
  rows: 12,
  cols: 50,
};

const BugDetails = ({ bug }) => {
  const navigate = useNavigate();
  const handleOnEdit = () => {
    navigate("edit");
  };

  return (
    <>
      <h1>{bug.title}</h1>
      <div className={classes["bug-details"]}>
        <BugProperty
          className={classes.property}
          labelText="ID"
          content={bug.id}
        />
        <BugProperty
          className={classes.property}
          labelText="Priority"
          content={PRIORITY_MAPPING[bug.priority]}
        />
        <BugProperty
          className={classes.property}
          labelText="Status"
          content={STATUS_MAPPING[bug.status]}
        />
        <BugProperty
          className={classes.property}
          labelText="Created By"
          content={bug.createdBy.name}
        />
        <BugProperty
          className={classes.property}
          labelText="Created On"
          content={bug.createdOn}
        />
        <BugProperty
          className={classes.property}
          labelText="Assigned To"
          content={bug.assignedTo?.name ? bug.assignedTo?.name : "N/A"}
        />
        <BugProperty
          className={classes.property}
          labelText="Last Updated By"
          content={bug.lastUpdatedBy.name}
        />
        <BugProperty
          className={classes.property}
          labelText="Last Updated On"
          content={bug.lastUpdatedOn}
        />
      </div>
      <div className={classes["content-container"]}>
        <div className={classes.description}>
          <label>Description</label>
          <textarea
            rows={TEXT_AREA_GRID_SIZE.rows}
            cols={TEXT_AREA_GRID_SIZE.cols}
            defaultValue={bug.description}
          ></textarea>
        </div>
        <div className={classes["comments-container"]}>
          <label>Comments</label>
          <ul className={classes["comments-list"]}>
            {bug.comments.map((c) => (
              <Comment comment={c} />
            ))}
          </ul>
        </div>
      </div>
      <BugButtons isEditing={false} onEditClick={handleOnEdit} />
    </>
  );
};

export default BugDetails;
