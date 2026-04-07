"use client";

import { useEffect, useRef, useState } from "react";
import { NotificationIcon } from "@/components/icons/NotificationIcon";

export function NotificationBell({ count = 0 }: { count?: number }) {
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
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Thông báo"
        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded cursor-pointer transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2"
      >
        <NotificationIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        {count > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4271D] rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#101417] border border-[#998C5F] rounded-lg py-3 px-4 min-w-[200px] shadow-lg">
          <p className="text-sm text-white/60 font-[family-name:var(--font-montserrat)]">
            Chưa có thông báo
          </p>
        </div>
      )}
    </div>
  );
}
