import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";

export function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 max-w-full">
      <Link
        href="/awards-information"
        className="w-full sm:w-auto sm:min-w-[200px] lg:w-[276px] h-14 lg:h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 px-6 py-4 font-[family-name:var(--font-montserrat)] text-lg lg:text-[22px] font-bold text-[#00101A] leading-7 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        ABOUT AWARDS
        <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      </Link>
      <Link
        href="/sun-kudos"
        className="w-full sm:w-auto sm:min-w-[200px] lg:w-[276px] h-14 lg:h-[60px] bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-lg flex items-center justify-center gap-2 px-6 py-4 font-[family-name:var(--font-montserrat)] text-lg lg:text-[22px] font-bold text-white leading-7 transition-all duration-150 hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        ABOUT KUDOS
        <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      </Link>
    </div>
  );
}
