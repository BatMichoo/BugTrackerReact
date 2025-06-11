import classes from "./Bug.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ comment }) => {
  return (
    <>
      <div className={classes.comment}>
        <div>{comment.content}</div>
        <p>
          <span>{comment.postedOn}</span>
          <span>{comment.authorName}</span>
        </p>
      </div>
      <div className={classes["comment-actions"]}>
        <FontAwesomeIcon
          icon="pen"
          size="lg"
          aria-hidden="true"
          style={{ color: "lightskyblue" }}
        />
        <FontAwesomeIcon
          icon="times"
          size="2x"
          aria-hidden="true"
          style={{ color: "lightcoral" }}
        />
      </div>
    </>
  );
};

export default Comment;
