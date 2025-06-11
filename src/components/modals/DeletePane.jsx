import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CONFIRM_DURATION = 10000;
const RESULT_DURATION = 1000;

export default function DeletePane({ delFunc, onSuccess, cleanUp, ref }) {
  const [status, setStatus] = useState("initial");
  const [cancelDuration, setCancelDuration] = useState(CONFIRM_DURATION / 1000);

  const internalModalRef = useRef();

  let currentModalContent = null;
  let currentModalDuration;

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

      if (internalModalRef.current) {
        internalModalRef.current.open();
      }
      break;
    case "confirmed":
      currentModalContent = <p>Deleting...</p>;
      currentModalDuration = 999999;
      break;
    case "success":
      currentModalContent = (
        <>
          <h3>Delete confirmed!</h3>
          <p>
            <FontAwesomeIcon
              icon="info"
              color="blue"
              style={{ marginRight: "0.5em" }}
            />
            Successfully deleted!
          </p>
        </>
      );
      currentModalDuration = RESULT_DURATION;
      break;
    case "failed":
      currentModalContent = <p>Failed to delete bug!</p>;
      currentModalDuration = RESULT_DURATION;
      break;
    case "cancelled":
      currentModalDuration = 0;
      break;
    default:
      currentModalContent = <p>Loading...</p>; // Fallback
  }
  // Effect to manage the state transitions and modal opening/closing logic
  useEffect(() => {
    if (status === "confirmed") {
      const performDeletion = async () => {
        try {
          const success = await delFunc();
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
      performDeletion();

      if (internalModalRef.current) {
        internalModalRef.current.open();
      }
    } else if (status === "success" || status === "failed") {
      if (internalModalRef.current) {
        internalModalRef.current.open();
      }
    } else if (status === "cancelled") {
      if (internalModalRef.current) {
        internalModalRef.current.close();
      }
    }
  }, [status, delFunc]);

  // Effect to manage state reset after completition
  useEffect(() => {
    let cleanUpTimer;
    cleanUpTimer = setTimeout(() => {
      cleanUp();
    }, currentModalDuration);

    return () => {
      clearTimeout(cleanUpTimer);
    };
  }, [currentModalDuration]);

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

  return (
    <Modal
      ref={ref}
      duration={currentModalDuration}
      borderColor={borderColor}
      animation={animation}
    >
      <div className={classes["del-modal-content"]}>{currentModalContent}</div>
    </Modal>
  );
}
