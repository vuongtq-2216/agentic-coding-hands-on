import { AWARD_CATEGORIES } from "@/data/awards";
import { AwardCard } from "./AwardCard";

export function AwardsSection() {
  return (
    <section className="w-full lg:w-[1224px] max-w-full flex flex-col gap-10 lg:gap-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <p className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-white leading-8">
          Sun* annual awards 2025
        </p>
        <hr className="border-[#2E3940]" />
        <h2 className="font-[family-name:var(--font-montserrat)] text-4xl sm:text-[42px] md:text-[48px] lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px] tracking-[-0.25px]">
          Hệ thống giải thưởng
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
        {AWARD_CATEGORIES.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </section>
  );
}
