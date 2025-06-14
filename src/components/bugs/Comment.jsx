import { useRef, useState } from "react";
import classes from "./Bug.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateComment, updateLikes } from "../../utils/commentAPI";

const Comment = ({ comment, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedComment, setSavedComment] = useState(comment);

  const ref = useRef();

  async function saveComment() {
    const newContent = ref.current.value;

    let newComment = { ...comment };
    newComment.content = newContent;

    newComment = await updateComment(newComment);

    if (newComment) {
      setSavedComment(newComment);
    }

    setIsEditing(false);
  }

  async function likeComment() {
    const likes = await updateLikes(savedComment.id, savedComment.bugId, null);

    setSavedComment((prev) => {
      const newC = { ...prev };

      newC.likes = likes;

      return newC;
    });
  }

  async function dislikeComment() {
    const likes = await updateLikes(savedComment.id, savedComment.bugId, "-");

    setSavedComment((prev) => {
      const newC = { ...prev };

      newC.likes = likes;

      return newC;
    });
  }

  return (
    <>
      <div className={classes.comment}>
        {isEditing ? (
          <textarea rows={3} defaultValue={savedComment.content} ref={ref} />
        ) : (
          <div>{savedComment.content}</div>
        )}
        <div>
          <p>
            <span>{savedComment.postedOn}</span>
            <span>{savedComment.authorName}</span>
          </p>
          <div className={classes["likes-container"]}>
            <span>{savedComment.likes}</span>
            <FontAwesomeIcon
              icon="thumbs-up"
              size="lg"
              aria-hidden="true"
              color="yellowgreen"
              onClick={async () => likeComment()}
            />
            <FontAwesomeIcon
              icon="thumbs-down"
              size="lg"
              aria-hidden="true"
              color="lightcoral"
              onClick={async () => dislikeComment()}
            />
          </div>
        </div>
      </div>
      <div className={classes["comment-actions"]}>
        <FontAwesomeIcon
          className={classes["comment-edit"]}
          icon={isEditing ? "floppy-disk" : "pen"}
          size="lg"
          aria-hidden="true"
          onClick={isEditing ? saveComment : () => setIsEditing(true)}
        />
        <FontAwesomeIcon
          icon="times"
          size="2x"
          aria-hidden="true"
          style={{ color: "lightcoral", cursor: "pointer" }}
          onClick={isEditing ? () => setIsEditing(false) : () => onDelete()}
        />
      </div>
    </>
  );
};

export default Comment;
