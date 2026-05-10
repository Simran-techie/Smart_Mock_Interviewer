// ============================================================
// useTimer.js — Custom hook for countdown timer
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";

const useTimer = (initialSeconds = 120, onTimeUp = () => {}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newSeconds = initialSeconds) => {
    setIsRunning(false);
    setSecondsLeft(newSeconds);
  }, [initialSeconds]);

  const restart = useCallback((newSeconds = initialSeconds) => {
    setSecondsLeft(newSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, onTimeUp]);

  // Format seconds as MM:SS
  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const percentage = (secondsLeft / initialSeconds) * 100;
  const isWarning = secondsLeft <= 30;
  const isDanger = secondsLeft <= 10;

  return { secondsLeft, formatted, percentage, isWarning, isDanger, isRunning, start, pause, reset, restart };
};

export default useTimer;
