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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal, { RESULT_DURATION } from "../modals/Modal";
import { getPermissions, getUserId } from "../../utils/auth";

const TEXT_AREA_GRID_SIZE = {
  rows: 12,
  cols: 50,
};

const BUG_MODAL_CONTENT = {
  confirmed: <p>Deleting...</p>,
  success: (
    <>
      <h3>Delete confirmed!</h3>
      <p>
        <FontAwesomeIcon
          icon="info"
          color="blue"
          style={{ marginRight: "0.5em" }}
        />
        Successfully deleted bug!
      </p>
    </>
  ),
  failed: <p>Failed to delete bug!</p>,
};

const COMM_MODAL_CONTENT = {
  confirmed: <p>Deleting...</p>,
  success: (
    <>
      <h3>Delete confirmed!</h3>
      <p>
        <FontAwesomeIcon
          icon="info"
          color="blue"
          style={{ marginRight: "0.5em" }}
        />
        Successfully deleted comment!
      </p>
    </>
  ),
  failed: <p>Failed to delete comment!</p>,
};

const BugDetails = ({ bug }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState(bug.comments);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [requiresRedirect, setRequiresRedirect] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  const userId = getUserId();
  const canDelete =
    getPermissions().filter((p) => p == "Delete") || bug.createdBy == userId;

  const handleOnEdit = () => {
    navigate("edit");
  };

  useEffect(() => {
    if (commentToDeleteId !== null || isDeleting) {
      if (modalRef.current) {
        modalRef.current.open();
      }
    }
  }, [commentToDeleteId, isDeleting]);

  useEffect(() => {
    let timeOut;
    if (requiresRedirect) {
      timeOut = setTimeout(() => {
        setRequiresRedirect(false);
        navigate("../..");
      }, RESULT_DURATION);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [requiresRedirect]);

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
      {commentToDeleteId != null || isDeleting ? (
        <Modal
          action={
            isDeleting
              ? async () => await deleteBug(bug.id)
              : async () => await deleteComment(commentToDeleteId, bug.id)
          }
          ref={modalRef}
          onSuccess={
            isDeleting
              ? () => setRequiresRedirect(true)
              : () => handleOnDeleteComment(commentToDeleteId)
          }
          cleanUp={
            isDeleting
              ? () => {
                setIsDeleting(false);
              }
              : () => setCommentToDeleteId(null)
          }
          displayContent={isDeleting ? BUG_MODAL_CONTENT : COMM_MODAL_CONTENT}
        />
      ) : null}
      <h1>{bug.title}</h1>
      <div className="section">
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
      </div>
      <div className={classes["content-container"]}>
        <div className={classes.description}>
          <h2>Description</h2>
          <textarea
            className="section"
            disabled
            rows={TEXT_AREA_GRID_SIZE.rows}
            cols={TEXT_AREA_GRID_SIZE.cols}
            defaultValue={bug.description}
          ></textarea>
        </div>
        <BugButtons
          isEditing={false}
          onEditClick={handleOnEdit}
          onDeleteClick={() => setIsDeleting(true)}
          canDelete={canDelete}
        />
        <div className={classes["comments-container"]}>
          <h2>Comments</h2>
          {comments.length > 0 ? (
            <ul className={classes["comments-list"]}>
              {comments.map((c) => (
                <li key={c.id} className="section">
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
