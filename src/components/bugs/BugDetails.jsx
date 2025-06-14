import BugProperty from "./BugProperty";
import Comment from "./Comment";
import classes from "./Bug.module.css";
import BugButtons from "./BugButtons";
import { useNavigate } from "react-router";
import { PRIORITY_MAPPING, STATUS_MAPPING } from "../../utils/bugEnums";
import { deleteBug } from "../../utils/bugAPI";
import { useEffect, useRef, useState } from "react";
import NewComment from "./NewComment";
import { createComment, deleteComment } from "../../utils/commentAPI";
import DeletePane from "../modals/DeletePane";

const TEXT_AREA_GRID_SIZE = {
  rows: 12,
  cols: 50,
};

const BugDetails = ({ bug }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState(bug.comments);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleOnEdit = () => {
    navigate("edit");
  };

  const handleOnDelete = async (bugId) => {
    const response = await deleteBug(bugId);

    if (response) {
      navigate("../..");
    }
  };

  useEffect(() => {
    if (commentToDeleteId !== null) {
      if (modalRef.current) {
        modalRef.current.open();
      }
    }
  }, [commentToDeleteId]);

  function handleOnDeleteComment(commentId) {
    setComments((prev) => {
      return prev.filter((c) => c.id !== commentId);
    });
  }

  async function handleNewCommentSubmit(content) {
    const comment = await createComment(content, bug.id);

    setComments((prevC) => [...prevC, comment]);

    setIsAddingComment(false);
  }

  return (
    <div className={classes.bug}>
      {commentToDeleteId != null ? (
        <DeletePane
          delFunc={async () => deleteComment(commentToDeleteId, bug.id)}
          ref={modalRef}
          onSuccess={() => handleOnDeleteComment(commentToDeleteId)}
          cleanUp={() => setCommentToDeleteId(null)}
        />
      ) : null}
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
            disabled
            rows={TEXT_AREA_GRID_SIZE.rows}
            cols={TEXT_AREA_GRID_SIZE.cols}
            defaultValue={bug.description}
          ></textarea>
        </div>
        <BugButtons
          isEditing={false}
          onEditClick={handleOnEdit}
          onDeleteClick={async () => await handleOnDelete(bug.id)}
        />
        <div className={classes["comments-container"]}>
          <h2>Comments</h2>
          {comments.length > 0 ? (
            <ul className={classes["comments-list"]}>
              {comments.map((c) => (
                <li key={c.id}>
                  <Comment
                    comment={c}
                    onDelete={() => setCommentToDeleteId(c.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>You're the first to possibly leave a comment!</p>
          )}
          {isAddingComment ? (
            <NewComment
              action={handleNewCommentSubmit}
              cancel={() => setIsAddingComment(false)}
            />
          ) : (
            <button type="button" onClick={() => setIsAddingComment(true)}>
              Add new Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugDetails;
