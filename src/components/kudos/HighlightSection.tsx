import { HighlightCarousel } from "./HighlightCarousel";

export function HighlightSection() {
  return (
    <section className="w-full flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col gap-4">
        <p className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-white leading-8">
          Sun* Annual Awards 2025
        </p>
        <hr className="border-[#2E3940]" />
        <h2 className="font-[family-name:var(--font-montserrat)] text-3xl sm:text-4xl lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px] tracking-[-0.25px]">
          HIGHLIGHT KUDOS
        </h2>
      </div>

      {/* Carousel */}
      <HighlightCarousel />
    </section>
  );
}
