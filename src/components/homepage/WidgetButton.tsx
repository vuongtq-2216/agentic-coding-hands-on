"use client";

import { useEffect, useRef, useState } from "react";
import { PenIcon } from "@/components/icons/PenIcon";

export function WidgetButton() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className="fixed bottom-6 right-3 lg:right-[19px] z-40">
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-[#101417] border border-[#998C5F] rounded-lg py-3 px-4 min-w-[160px] shadow-lg">
          <p className="text-sm text-white/60 font-[family-name:var(--font-montserrat)]">
            Coming soon
          </p>
        </div>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Hành động nhanh"
        className="w-[80px] h-[48px] lg:w-[106px] lg:h-[64px] bg-[#FFEA9E] rounded-full flex items-center justify-center gap-2 px-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-[0.98]"
      >
        <PenIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#00101A]" />
        <span className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-[#00101A]">
          /
        </span>
      </button>
    </div>
  );
}
