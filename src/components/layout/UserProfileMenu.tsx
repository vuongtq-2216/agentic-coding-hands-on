"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { UserIcon } from "@/components/icons/UserIcon";

export function UserProfileMenu({
  isAdmin = false,
  signOut,
}: {
  isAdmin?: boolean;
  signOut: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleSignOut() {
    startTransition(() => {
      signOut();
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Tài khoản"
        aria-expanded={isOpen}
        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center border border-[#998C5F] rounded cursor-pointer transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2"
      >
        <UserIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#101417] border border-[#998C5F] rounded-lg py-2 min-w-[180px] shadow-lg z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-white font-[family-name:var(--font-montserrat)] hover:bg-white/10 transition-colors"
          >
            Profile
          </a>
          {isAdmin && (
            <a
              href="/admin"
              className="block px-4 py-2 text-sm text-white font-[family-name:var(--font-montserrat)] hover:bg-white/10 transition-colors"
            >
              Admin Dashboard
            </a>
          )}
          <hr className="my-1 border-[#2E3940]" />
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className="w-full text-left px-4 py-2 text-sm text-white font-[family-name:var(--font-montserrat)] hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Đang đăng xuất..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
