import classes from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <div className={classes.error}>
      <h1>Something went wrong!</h1>
      <h2>{error.status}</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
