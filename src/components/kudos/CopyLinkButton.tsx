"use client";

import { useState, useCallback } from "react";
import { CopyLinkIcon } from "@/components/icons/CopyLinkIcon";

type CopyLinkButtonProps = {
  kudosId: string;
};

export function CopyLinkButton({ kudosId }: CopyLinkButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async () => {
    const url = `${window.location.origin}/sun-kudos?kudos=${kudosId}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, [kudosId]);

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2"
        type="button"
      >
        <CopyLinkIcon className="text-[#00101A]" />
        <span className="font-montserrat text-[16px] font-bold text-[#00101A]">
          Copy Link
        </span>
      </button>
      {showToast && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#00101A] text-white text-sm font-montserrat rounded-lg whitespace-nowrap">
          Đã sao chép link!
        </div>
      )}
    </div>
  );
}
