import classes from "./Dialog.module.css";

export default function Dialog({ ref, children }) {
  return (
    <dialog
      className={classes.dialog}
      ref={ref}
      onClose={() => ref.current.close()}
    >
      {children}
    </dialog>
  );
}
