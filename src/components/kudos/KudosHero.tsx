import { SendKudosBar } from "./SendKudosBar";
import { SearchIcon } from "@/components/icons/SearchIcon";

export function KudosHero() {
  return (
    <section className="w-full flex flex-col items-center gap-6">
      <h2 className="font-montserrat text-[36px] font-bold text-[#FFEA9E] text-center">
        Hệ thống ghi nhận và cảm ơn
      </h2>

      <div className="font-montserrat font-bold text-[72px] lg:text-[140px] text-[#DBD1C1] tracking-[-0.13em] leading-none text-center select-none">
        KUDOS
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
        <SendKudosBar />
        <div className="w-full lg:w-[381px] h-[72px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] rounded-[68px] px-6 py-4 flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,234,158,0.15)] transition">
          <SearchIcon className="w-6 h-6 text-white shrink-0" />
          <span className="font-montserrat text-[16px] font-bold text-white truncate">
            Tìm kiếm profile Sunner
          </span>
        </div>
      </div>
    </section>
  );
}
