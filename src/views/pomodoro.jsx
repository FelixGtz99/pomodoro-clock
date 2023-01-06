import { useState, useEffect } from "react";

function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [point, setPoint] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const isShortBreak = isBreak && point > 0 && point < 4;
  const isLongBreak = isBreak && point >= 4;
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) return;

      if (seconds) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(59);
        if (minutes) {
          setMinutes(minutes - 1);
        } else {
          if (!isBreak) {
            setPoint(point + 1);
            setIsRunning(false);
            setIsBreak(true);
            setSeconds(0);
        
          } else {
            setIsRunning(false);
            setIsBreak(false);
            setSeconds(0);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const onClickTimer = () => {
    setMinutes(25)
    if (isShortBreak) setMinutes(5);
    if (isLongBreak) setMinutes(15);
    if (!isBreak && point === 4) setPoint(4);
    
    setIsRunning(!isRunning);
  };
  return (
    <main>
      <div className="container max-w-4xl h-96 m-auto mt-6 relative bg-blue-400 text-center  p-10 rounded-full ">
        {isShortBreak ? (
          <div className=" mt-3 text-4xl text-white">Short Break</div>
        ) : (
          ""
        )}
        {isLongBreak ? (
          <div className=" mt-3 text-4xl text-white">Long Break</div>
        ) : (
          ""
        )}

        <div className="text-white  text-6xl  mt-3">
          {minutes}:{String(seconds).padStart(2, "0")}
        </div>

        <button
          className="pl-5 pr-5 pt-2 pb-2 w-32 bg-violet-600 text-3xl wi text-white mt-5 rounded"
          onClick={onClickTimer}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
      </div>
    </main>
  );
}

export default Pomodoro;
