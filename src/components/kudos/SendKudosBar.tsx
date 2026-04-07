"use client";

import { useState } from "react";
import { PenIcon } from "@/components/icons/PenIcon";
import { SendKudosDialog } from "./SendKudosDialog";

export function SendKudosBar({
  currentUserId = "",
}: {
  currentUserId?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        type="button"
        className="w-full lg:w-[738px] h-[72px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] rounded-[68px] px-6 py-4 flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,234,158,0.15)] transition"
      >
        <PenIcon className="w-6 h-6 text-white shrink-0" />
        <span className="font-[family-name:var(--font-montserrat)] text-base font-bold text-white truncate">
          Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?
        </span>
      </button>

      <SendKudosDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          setIsDialogOpen(false);
          // TODO: refresh feed
        }}
        currentUserId={currentUserId}
      />
    </>
  );
}
