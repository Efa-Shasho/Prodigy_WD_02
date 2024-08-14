import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); 
      }, 10);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lapStopwatch = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const getSeconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div className="stopwatch ">
      <h1 className='font-mono text-4xl  font-bold text-blue-500'> Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startStopwatch} className='bg-lime-400 text-white rounded-full'>Start</button>
        <button onClick={stopStopwatch} className='bg-red-600 text-white rounded-full'>Pause</button>
        <button onClick={resetStopwatch} className='bg-blue-500 text-white rounded-full'>Reset</button>
        <button onClick={lapStopwatch} className='bg-orange-500 text-white rounded-full'>Lap</button>
      </div>
      <table className="laps bg-slate-500 text-white ">
        <thead>
          <tr>
            <th>Lap</th>
            <th>Time</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap, index) => (
            <tr key={index}>
              <td>{laps.length - index}</td>
              <td>{formatTime(lap - (laps[index - 1] || 0))}</td>
              <td>{formatTime(lap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .laps {
          width: 100%;
          border-collapse: collapse;
        }
        .laps th, .laps td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        .laps th {
          background-color: #010101;        }
      `}</style>
    </div>
  );
};

export default Stopwatch;
