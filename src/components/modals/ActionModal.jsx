import { useState, useEffect } from "react";
import Modal from "./Modal";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CONFIRM_DURATION = 10000;
const RESULT_DURATION = 1000;

export default function ActionModal({
  action,
  onSuccess,
  cleanUp,
  ref,
  displayContent,
}) {
  const [status, setStatus] = useState("initial");
  const [cancelDuration, setCancelDuration] = useState(CONFIRM_DURATION / 1000);

  let currentModalContent = null;
  let currentModalDuration;

  switch (status) {
    case "initial":
      currentModalContent = (
        <>
          <h3>Are you sure?</h3>
          <div>
            <button onClick={() => setStatus("confirmed")}>
              <FontAwesomeIcon icon="check" color="lightgreen" />
            </button>
            <button onClick={() => setStatus("cancelled")}>
              <FontAwesomeIcon icon="times" color="lightcoral" />
            </button>
          </div>
          <p>
            <FontAwesomeIcon
              icon="info"
              color="blue"
              style={{ marginRight: "0.5em" }}
            />{" "}
            Cancelling in {cancelDuration} sec{cancelDuration > 1 ? "s" : null}.
          </p>
        </>
      );
      currentModalDuration = CONFIRM_DURATION;

      break;
    case "confirmed":
      currentModalContent = displayContent.confirmed;
      currentModalDuration = 999999;
      break;
    case "success":
      currentModalContent = displayContent.success;
      currentModalDuration = RESULT_DURATION;
      break;
    case "failed":
      currentModalContent = displayContent.failed;
      currentModalDuration = RESULT_DURATION;
      break;
    case "cancelled":
      currentModalDuration = 0;
      break;
    default:
      currentModalContent = <p>Loading...</p>; // Fallback
  }

  let borderColor =
    status === "success"
      ? ` ${classes.success}`
      : status === "failed"
        ? ` ${classes.error}`
        : ` ${classes.info}`;

  let animation =
    status === "initial"
      ? ` ${classes["slide-in"]}`
      : status !== "canceled"
        ? ` ${classes["slide-out"]}`
        : undefined;

  // Effect to manage countdown on Confirm state
  useEffect(() => {
    if (status === "initial") {
      const interval = setInterval(() => {
        setCancelDuration((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  // Effect to manage the state transitions and modal opening/closing logic
  useEffect(() => {
    if (status === "confirmed") {
      const performAction = async () => {
        try {
          const success = await action();
          if (success) {
            setStatus("success");
            onSuccess();
          } else {
            setStatus("failed");
          }
        } catch (error) {
          console.error("Error during deletion:", error);
          setStatus("failed");
        }
      };
      performAction();
    }
  }, [status, action]);

  // Effect to manage state reset after completition
  useEffect(() => {
    if (status === "success") {
      let cleanUpTimer;
      cleanUpTimer = setTimeout(() => {
        cleanUp();
      }, currentModalDuration);

      return () => {
        clearTimeout(cleanUpTimer);
      };
    }
  }, [status]);

  return (
    <Modal
      ref={ref}
      duration={currentModalDuration}
      borderColor={borderColor}
      animation={animation}
    >
      <div className={classes["modal-content"]}>{currentModalContent}</div>
    </Modal>
  );
}
