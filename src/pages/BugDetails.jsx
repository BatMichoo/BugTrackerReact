import { useLoaderData } from "react-router";
import { getBug } from "../utils/bugAPI";
import BugProperty from "../components/bugs/BugProperty";
import Comment from "../components/bugs/Comment";
import classes from "../components/bugs/Bug.module.css";

const TEXT_AREA_GRID_SIZE = {
  rows: 12,
  cols: 50,
};

const BugDetailsPage = () => {
  const bug = useLoaderData();

  return (
    <div className={classes["bug-container"]}>
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
          content={bug.priority}
        />
        <BugProperty
          className={classes.property}
          labelText="Status"
          content={bug.status}
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
    </div>
  );
};

export default BugDetailsPage;

export const loader = async ({ params }) => {
  const bugId = params.bugId;

  if (bugId) {
    const bug = await getBug(bugId);

    return bug;
  }
};
