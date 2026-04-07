export function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="12" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V20" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8C12 8 12 5 9 4C6 3 6 6 6 6C6 6 6 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8C12 8 12 5 15 4C18 3 18 6 18 6C18 6 18 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
