import React, { useState, useEffect } from 'react'

function Timer({ seconds, start }: { seconds: number, start: boolean }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft || !start) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [start, timeLeft]);

  return <div className={`conversation-ui-timer ${!start && 'conversation-ui-timer--faded'}`}>
      {`${Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0')}:${(timeLeft % 60)
      .toString()
      .padStart(2, '0')}`}
    </div>;
}

export default Timer