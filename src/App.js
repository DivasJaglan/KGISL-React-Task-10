import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [isRunning]);

  const handleButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
    } else if (time === 0) {
      setIsRunning(true);
    } else {
      setTime(0);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="container text-center p-5 shadow-lg">
      <div className="fs-4 mb-3">{formatTime(time)}</div>
      <button onClick={handleReset} className="rounded-2 mx-1">
        Reset
      </button>
      <button onClick={handleButtonClick} className="rounded-2 mx-2">
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default App;
