import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { useEffect, useImperativeHandle, useState, useRef } from "react";

const INTERVAL = 30; //ms

export default function Modal({ duration, children, ref, borderColor, animation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [timePassed, setTimePassed] = useState(0);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
        setTimePassed(0);
      },
      close() {
        setIsOpen(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setTimePassed(0);
      },
    };
  });

  // Effect for the progress bar interval
  useEffect(() => {
    if (isOpen) {
      intervalRef.current = setInterval(() => {
        setTimePassed((prev) => prev + INTERVAL);
      }, INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimePassed(0);
      }
    };
  }, [isOpen]);

  // Effect for the auto-close timer
  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, duration);
    }

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setTimePassed(0);
    };
  }, [isOpen, duration]);

  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modal + borderColor + animation}>
      {children}
      <progress
        className={classes["modal-progress"] + borderColor}
        value={timePassed}
        max={duration}
      />
    </div>,
    document.getElementById("modal-root"),
  );
}
