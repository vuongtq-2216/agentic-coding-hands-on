"use client";

import { useEffect, useState, useTransition } from "react";
import { loginWithGoogle } from "@/app/(auth)/login/actions";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Spinner } from "@/components/ui/Spinner";
import { type ErrorCode, ERROR_MESSAGES } from "@/types/auth";

export function LoginButton({ error }: { error?: string }) {
  const [isPending, startTransition] = useTransition();
  const [showError, setShowError] = useState(!!error);

  useEffect(() => {
    if (!error) return;
    setShowError(true);
    const timer = setTimeout(() => setShowError(false), 8000);
    return () => clearTimeout(timer);
  }, [error]);

  const errorMessage = error
    ? ERROR_MESSAGES[error as ErrorCode] ?? ERROR_MESSAGES.unknown
    : null;

  function handleLogin() {
    setShowError(false);
    startTransition(() => {
      loginWithGoogle();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {showError && errorMessage && (
        <div
          className="max-w-[480px] bg-red-500/15 border border-red-500 rounded-lg px-4 py-3 transition-opacity duration-200"
          role="alert"
        >
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-red-300">
            {errorMessage}
          </p>
        </div>
      )}
      <button
        onClick={handleLogin}
        disabled={isPending}
        aria-label="Đăng nhập bằng Google"
        className="w-full sm:w-[305px] h-14 sm:h-[60px] bg-[#FFEA9E] rounded-lg px-6 py-4 flex items-center gap-2 cursor-pointer transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none"
      >
        <span className="font-[family-name:var(--font-montserrat)] text-lg sm:text-[22px] font-bold text-[#00101A] leading-7">
          {isPending ? "Logging in..." : "LOGIN With Google"}
        </span>
        {isPending ? (
          <Spinner className="w-6 h-6 text-[#00101A]" />
        ) : (
          <GoogleIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
