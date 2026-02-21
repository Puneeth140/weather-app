'use client';
import { useState, useEffect } from 'react';
import style from './DigitalClock.module.css'

export default function DigitalClock({ timezoneOffset }: { timezoneOffset?: number }) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // If a timezoneOffset (in seconds) is provided, calculate target city time
      // Otherwise, show local system time
      if (timezoneOffset !== undefined) {
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetDate = new Date(utc + (1000 * timezoneOffset));
        setTime(targetDate.toLocaleTimeString('en-GB', { hour12: false }));
      } else {
        setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return (
    <div className={style.clockWrapper}>
      <span className={style.clocklabel}>{timezoneOffset !== undefined ? 'TARGET_LOC_TIME' : 'SYS_CHRONO'}</span>
      <div className={style.clockdigits}>{time || '00:00:00'}</div>
    </div>
  );
}