import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function NewComment({ action, cancel }) {
  const inputRef = useRef();
  return (
    <>
      <input type="text" name="content" ref={inputRef} />
      <button
        onClick={async () => await action(inputRef.current.value)}
        type="submit"
      >
        Post
      </button>
      <button onClick={cancel} type="button">
        <FontAwesomeIcon icon="times" color="lightcoral" />
      </button>
    </>
  );
}

export default NewComment;
