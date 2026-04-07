import Image from "next/image";
import Link from "next/link";

const FOOTER_NAV_ITEMS = [
  { href: "/", label: "About SAA 2025" },
  { href: "/awards-information", label: "Award Information" },
  { href: "/sun-kudos", label: "Sun* Kudos" },
  { href: "/standards", label: "Tiêu chuẩn chung" },
];

export function Footer({
  variant = "public",
  activePath,
}: {
  variant?: "public" | "auth";
  activePath?: string;
}) {
  if (variant === "public") {
    return (
      <footer className="relative z-10 border-t border-[#2E3940] px-4 sm:px-6 md:px-10 lg:px-[90px] py-6 sm:py-7 md:py-8 lg:py-10 flex items-center justify-center">
        <p className="font-[family-name:var(--font-montserrat-alternates)] text-sm lg:text-base font-bold text-white text-center">
          Bản quyền thuộc về Sun* &copy; 2025
        </p>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 border-t border-[#2E3940] px-4 sm:px-6 md:px-10 lg:px-[90px] py-6 sm:py-7 md:py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-20">
        <Image
          src="/assets/homepage/saa-logo-footer.png"
          alt="SAA 2025 Logo"
          width={69}
          height={64}
          className="w-[52px] h-[48px] lg:w-[69px] lg:h-[64px]"
        />
        <nav className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
          {FOOTER_NAV_ITEMS.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-white px-4 py-2 rounded transition-colors duration-150 ${
                  isActive
                    ? "bg-[rgba(255,234,158,0.1)] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
                    : "hover:bg-[rgba(255,234,158,0.1)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <p className="font-[family-name:var(--font-montserrat-alternates)] text-sm lg:text-base font-bold text-white text-center">
        Bản quyền thuộc về Sun* &copy; 2025
      </p>
    </footer>
  );
}
