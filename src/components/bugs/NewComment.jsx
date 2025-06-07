import { useRef } from "react";

function NewComment({ action }) {
  const inputRef = useRef();
  return (
    <>
      <input type="text" name="content" ref={inputRef} />
      <button onClick={async () => await action(inputRef.current.value)} type="submit">Post</button>
    </>
  );
}

export default NewComment;
