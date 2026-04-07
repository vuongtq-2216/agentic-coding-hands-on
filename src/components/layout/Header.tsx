import Image from "next/image";

export function Header({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 h-16 lg:h-20 bg-[rgba(16,20,23,0.8)] backdrop-blur-sm px-4 sm:px-6 md:px-10 lg:px-36 flex items-center justify-between">
      <div className="flex items-center gap-4 lg:gap-16">
        <Image
          src="/assets/login/saa-logo.png"
          alt="SAA 2025 Logo"
          width={52}
          height={48}
          className="w-10 h-9 lg:w-[52px] lg:h-[48px]"
        />
        {left}
      </div>
      <div className="flex items-center gap-4">
        {right}
      </div>
    </header>
  );
}
