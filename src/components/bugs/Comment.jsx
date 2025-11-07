import { useRef, useState } from "react";
import classes from "./Bug.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateComment, updateLikes } from "../../utils/commentAPI";
import { getProfileName } from "../../utils/auth";
import { createReply, deleteReply } from "../../utils/replyAPI";

const Comment = ({ comment, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [savedComment, setSavedComment] = useState(comment);
  const userName = getProfileName();

  const newCommentRef = useRef();
  const newReplyRef = useRef();

  async function saveComment() {
    const newContent = newCommentRef.current.value;

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

  async function addReply() {
    const replyContent = newReplyRef.current.value;
    const newReply = await createReply(replyContent, comment.bugId, comment.id);

    setSavedComment((prev) => {
      const newC = { ...prev };
      const replies = [...newC.replies, newReply];
      newC.replies = replies;

      return newC;
    });

    setIsReplying(false);
  }

  async function removeReply(id) {
    const success = await deleteReply(id, savedComment.bugId, savedComment.id);

    if (success) {
      setSavedComment((prev) => {
        const newC = { ...prev };
        newC.replies = newC.replies.filter((reply) => reply.id !== id);

        return newC;
      });
    }
  }

  return (
    <>
      <div className={classes.comment}>
        {isEditing ? (
          <textarea
            rows={3}
            defaultValue={savedComment.content}
            ref={newCommentRef}
          />
        ) : (
          <div>{savedComment.content}</div>
        )}
        <div>
          <p>
            <span>{savedComment.postedOn}</span>
            <span>{savedComment.authorName}</span>
          </p>
          <ul>
            {savedComment.replies &&
              savedComment.replies.map((r) => {
                return (
                  <li key={r.id} className={classes.reply}>
                    <span>{r.content}</span>
                    <span>
                      <i>
                        <br />
                        {" - "}
                        {r.authorName}
                      </i>
                    </span>
                    {userName == savedComment.authorName ? (
                      <button
                        type="button"
                        onClick={async () => await removeReply(r.id)}
                      >
                        Delete
                      </button>
                    ) : undefined}
                  </li>
                );
              })}
          </ul>
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
          icon="reply"
          size="lg"
          aria-hidden="true"
          style={{ color: "var(--info)", cursor: "pointer" }}
          onClick={
            isReplying ? () => setIsReplying(false) : () => setIsReplying(true)
          }
        />
        {userName == savedComment.authorName ? (
          <FontAwesomeIcon
            className={classes["comment-edit"]}
            icon={isEditing ? "floppy-disk" : "pen"}
            style={{ color: "var(--warning)", cursor: "pointer" }}
            size="lg"
            aria-hidden="true"
            onClick={isEditing ? () => saveComment : () => setIsEditing(true)}
          />
        ) : null}
        {userName == savedComment.authorName ? (
          <FontAwesomeIcon
            icon="times"
            size="2x"
            aria-hidden="true"
            style={{ color: "var(--danger)", cursor: "pointer" }}
            onClick={isEditing ? () => setIsEditing(false) : () => onDelete()}
          />
        ) : null}
      </div>
      {isReplying ? (
        <div>
          <input type="text" ref={newReplyRef} />
          <button type="button" onClick={addReply}>
            Reply
          </button>
        </div>
      ) : undefined}
    </>
  );
};

export default Comment;
