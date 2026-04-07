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
    <div className="w-[48px] h-[77px] sm:w-[56px] sm:h-[90px] md:w-[64px] md:h-[103px] lg:w-[77px] lg:h-[123px] rounded-xl border-[0.75px] border-[#FFEA9E] opacity-50 backdrop-blur-[25px] flex items-center justify-center bg-gradient-to-b from-white to-white/10">
      <span className="font-[family-name:var(--font-montserrat)] text-[44px] sm:text-[54px] md:text-[62px] lg:text-[74px] font-bold text-white tabular-nums">
        {digit}
      </span>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 lg:gap-[21px]">
      <div className="flex gap-3 lg:gap-[21px]">
        <DigitTile digit={value[0]} />
        <DigitTile digit={value[1]} />
      </div>
      <span className="font-[family-name:var(--font-montserrat)] text-xl sm:text-2xl md:text-[28px] lg:text-4xl font-bold text-white leading-[48px]">
        {label}
      </span>
    </div>
  );
}

export function PrelaunchCountdown() {
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
    <div className="flex flex-col items-center gap-6" aria-live="polite">
      <h1 className="font-[family-name:var(--font-montserrat)] text-2xl sm:text-[28px] md:text-[32px] lg:text-4xl font-bold italic text-white text-center leading-[48px]">
        Sự kiện sẽ bắt đầu sau
      </h1>
      <div className="flex gap-6 sm:gap-9 md:gap-12 lg:gap-[60px] items-center justify-center">
        <CountdownUnit value={timeLeft.days} label="DAYS" />
        <CountdownUnit value={timeLeft.hours} label="HOURS" />
        <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
      </div>
    </div>
  );
}
