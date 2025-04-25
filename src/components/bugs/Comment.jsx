import classes from "./Bug.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={classes.comment} key={comment.id}>
      <div>{comment.content}</div>
      <p>
        <span>{comment.postedOn}</span>
        <span>{comment.authorName}</span>
      </p>
    </div>
  );
};

export default Comment;
