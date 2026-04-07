"use client";

import { useEffect, useMemo, useState } from "react";

function calculateTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    expired: false,
  };
}

function DigitTile({ digit }: { digit: string }) {
  return (
    <div className="w-[36px] h-[58px] sm:w-[42px] sm:h-[68px] lg:w-[51px] lg:h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E] opacity-50 backdrop-blur-[16px] flex items-center justify-center bg-gradient-to-b from-white to-white/10">
      <span className="font-[family-name:var(--font-montserrat)] text-[32px] sm:text-[40px] lg:text-[49px] font-bold text-white tabular-nums">
        {digit}
      </span>
    </div>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 lg:gap-[14px]">
      <div className="flex gap-2 lg:gap-[14px]">
        <DigitTile digit={value[0]} />
        <DigitTile digit={value[1]} />
      </div>
      <span className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg lg:text-2xl font-bold text-white">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const eventDateStr = process.env.NEXT_PUBLIC_SAA_EVENT_DATE;
  const targetDate = useMemo(
    () => (eventDateStr ? new Date(eventDateStr) : null),
    [eventDateStr]
  );
  const isValidDate = targetDate && !isNaN(targetDate.getTime());

  const [timeLeft, setTimeLeft] = useState(() =>
    isValidDate
      ? calculateTimeLeft(targetDate)
      : { days: "00", hours: "00", minutes: "00", expired: true }
  );

  useEffect(() => {
    if (!isValidDate || timeLeft.expired) return;

    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(targetDate);
      setTimeLeft(newTime);
      if (newTime.expired) clearInterval(interval);
    }, 60000);

    return () => clearInterval(interval);
  }, [isValidDate, targetDate, timeLeft.expired]);

  return (
    <div className="flex flex-col gap-4" aria-live="polite">
      {!timeLeft.expired && (
        <p className="font-[family-name:var(--font-montserrat)] text-lg sm:text-xl lg:text-2xl font-bold text-white">
          Coming soon
        </p>
      )}
      <div className="flex gap-4 sm:gap-6 lg:gap-10">
        <CountdownUnit value={timeLeft.days} label="DAYS" />
        <CountdownUnit value={timeLeft.hours} label="HOURS" />
        <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
      </div>
    </div>
  );
}
