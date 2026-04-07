"use client";

import { useEffect, useRef, useState } from "react";
import { FlagVNIcon } from "@/components/icons/FlagVNIcon";
import { FlagENIcon } from "@/components/icons/FlagENIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

type Lang = "VN" | "EN";

const LANGUAGES: { code: Lang; flag: React.ReactNode; label: string }[] = [
  { code: "VN", flag: <FlagVNIcon className="w-6 h-6" />, label: "VN" },
  { code: "EN", flag: <FlagENIcon className="w-6 h-6" />, label: "EN" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Lang>("VN");
  const ref = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find((l) => l.code === selectedLang)!;

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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleSelect(code: Lang) {
    setSelectedLang(code);
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Chọn ngôn ngữ"
        className="flex items-center gap-0.5 px-4 py-4 rounded cursor-pointer transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2"
      >
        {selected.flag}
        <span className="hidden sm:inline font-[family-name:var(--font-montserrat)] text-base font-bold text-white tracking-[0.15px]">
          {selected.label}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 text-white transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-activedescendant={`lang-${selectedLang}`}
          className="absolute right-0 top-full mt-1 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col shadow-lg transition-opacity duration-150"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === selectedLang;
            return (
              <button
                key={lang.code}
                id={`lang-${lang.code}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center gap-1 px-4 py-4 cursor-pointer transition-colors duration-150 font-[family-name:var(--font-montserrat)] text-base font-bold text-white tracking-[0.15px] focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 ${
                  isSelected
                    ? "bg-[rgba(255,234,158,0.2)] rounded-sm"
                    : "bg-transparent rounded hover:bg-white/10"
                }`}
              >
                {lang.flag}
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
