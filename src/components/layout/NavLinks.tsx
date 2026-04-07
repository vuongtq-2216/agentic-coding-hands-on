"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "About SAA 2025" },
  { href: "/awards-information", label: "Awards Information" },
  { href: "/sun-kudos", label: "Sun* Kudos" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 tracking-[0.1px] px-4 py-4 rounded transition-all duration-150 ${
              isActive
                ? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
                : "text-white hover:bg-[rgba(255,234,158,0.1)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
