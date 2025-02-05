"use client";
import { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("June 27, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 justify-center mb-2 text-md">
      ⌚{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s until June 27, 2025
    </div>
  );
};

export default Countdown;
