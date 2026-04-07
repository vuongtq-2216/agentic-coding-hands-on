"use client";

import { useState } from "react";

const SUGGESTED_HASHTAGS = [
  "#Dedicated", "#Inspiring", "#Leadership", "#Teamwork",
  "#Creative", "#ProblemSolver", "#Quality", "#Innovation",
  "#Mentoring", "#Excellence",
];

export function HashtagSelector({
  hashtags,
  onChange,
}: {
  hashtags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function addTag(tag: string) {
    const normalized = tag.startsWith("#") ? tag : `#${tag}`;
    if (hashtags.length >= 5 || hashtags.includes(normalized)) return;
    onChange([...hashtags, normalized]);
    setInputValue("");
    setShowInput(false);
  }

  function removeTag(tag: string) {
    onChange(hashtags.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hashtags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-3 py-1 bg-[rgba(255,234,158,0.2)] border border-[#FFEA9E] rounded-full text-sm font-bold text-[#00101A] font-[family-name:var(--font-montserrat)]"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="ml-1 text-[#D4271D] hover:text-red-700 font-bold cursor-pointer"
            aria-label={`Xóa ${tag}`}
          >
            ×
          </button>
        </span>
      ))}

      {hashtags.length < 5 && (
        <>
          {showInput ? (
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim()) {
                    e.preventDefault();
                    addTag(inputValue.trim());
                  }
                  if (e.key === "Escape") setShowInput(false);
                }}
                placeholder="Nhập hashtag..."
                autoFocus
                className="w-[160px] h-10 border border-[#998C5F] rounded-lg px-3 text-sm font-[family-name:var(--font-montserrat)] text-[#00101A] focus:outline-2 focus:outline-[#FFEA9E]"
              />
              {inputValue.length > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#998C5F] rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                  {SUGGESTED_HASHTAGS.filter(
                    (h) =>
                      h.toLowerCase().includes(inputValue.toLowerCase()) &&
                      !hashtags.includes(h)
                  ).map((h) => (
                    <button
                      key={h}
                      onClick={() => addTag(h)}
                      className="w-full text-left px-3 py-2 text-sm font-[family-name:var(--font-montserrat)] hover:bg-[rgba(255,234,158,0.1)] cursor-pointer"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-2 h-12 border border-[#998C5F] rounded-lg px-2 py-1 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg text-[#999]">+</span>
              <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-bold text-[#999] leading-4 tracking-wide">
                Hashtag
                <br />
                Tối đa 5
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
