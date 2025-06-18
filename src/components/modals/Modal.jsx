import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { useEffect, useImperativeHandle, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INTERVAL = 20; //ms
const CONFIRM_DURATION = 10000;
export const RESULT_DURATION = 1000;

export default function Modal({
  ref,
  displayContent,
  action,
  onSuccess,
  cleanUp,
}) {
  const [status, setStatus] = useState(null);
  const [prgBarTimePassed, setPrgBarTimePassed] = useState(0);
  const [cancelDuration, setCancelDuration] = useState(CONFIRM_DURATION / 1000);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setStatus("initial");
        setPrgBarTimePassed(0);
      },
      close() {
        setStatus(null);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setPrgBarTimePassed(0);
      },
    };
  });

  // Effect to manage countdown on Confirm state
  useEffect(() => {
    let interval;
    if (status === "initial") {
      interval = setInterval(() => {
        setCancelDuration((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      setCancelDuration(CONFIRM_DURATION / 1000);
    };
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
  }, [status]);

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

  // Effect for the progress bar interval
  useEffect(() => {
    if (status !== null) {
      intervalRef.current = setInterval(() => {
        setPrgBarTimePassed((prev) => prev + INTERVAL);
      }, INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPrgBarTimePassed(0);
      }
    };
  }, [status]);

  // Effect for the auto-close timer
  useEffect(() => {
    if (status !== null) {
      timerRef.current = setTimeout(() => {
        setStatus(null);
        cleanUp();
      }, currentModalDuration);
    }

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setPrgBarTimePassed(0);
    };
  }, [status]);

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
      currentModalContent = <p>Loading...</p>;
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

  if (!status) return null;

  return createPortal(
    <div className={classes.modal + borderColor + animation}>
      <div className={classes["modal-content"]}>{currentModalContent}</div>
      <progress
        className={classes["modal-progress"] + borderColor}
        value={prgBarTimePassed}
        max={currentModalDuration}
      />
    </div>,
    document.getElementById("modal-root"),
  );
}
