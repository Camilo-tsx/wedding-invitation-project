"use client";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

export const CountdownTimer = ({
  targetDate,
  title = "Faltan",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="h-auto py-15 px-5 max-w-[80%] w-[80%] border-[3px] border-[#efefef] rounded-xl bg-transparent shadow-lg shadow-white flex flex-col items-center">
      <h3
        style={{ fontFamily: "'Parisienne', cursive" }}
        className="mb-6 text-4xl"
      >
        {title}
      </h3>

      <div className="flex flex-row gap-x-2">
        <div className="flex flex-col items-center justify-center text-center gap-y-2 w-16">
          <span
            className="text-4xl tabular-nums font-bold leading-none"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {timeLeft.days.toString().padStart(2, "0")}
          </span>
          <p className="text-md" style={{ fontFamily: "'Lora', serif" }}>
            DIAS
          </p>
        </div>

        {/* HORAS */}
        <div className=" flex flex-col items-center justify-center text-center gap-y-2 w-16">
          <span
            className="text-4xl tabular-nums font-bold leading-none"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <p className="text-md" style={{ fontFamily: "'Lora', serif" }}>
            HORAS
          </p>
        </div>

        {/* HORAS */}
        <div className=" flex flex-col items-center justify-center text-center gap-y-2 w-16">
          <span
            className="text-4xl tabular-nums font-bold leading-none"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <p className="text-md" style={{ fontFamily: "'Lora', serif" }}>
            MIN
          </p>
        </div>
      </div>
    </div>
  );
};
