import Image from "next/image";
import { AwardsSidebar } from "@/components/awards/AwardsSidebar";
import { AwardsDetailList } from "@/components/awards/AwardsDetailList";
import { KudosSection } from "@/components/homepage/KudosSection";

export default function AwardsInformationPage() {
  return (
    <div className="bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Layer — hero keyvisual (547px) */}
      <div className="absolute top-0 left-0 right-0 h-[400px] sm:h-[500px] lg:h-[547px] z-0 overflow-hidden">
        <Image
          src="/assets/homepage/keyvisual-bg.jpg"
          alt=""
          width={1440}
          height={547}
          priority
          quality={75}
          sizes="100vw"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — bottom-to-top (0deg) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center gap-15 sm:gap-20 lg:gap-[120px] px-4 sm:px-6 md:px-10 lg:px-36 py-10 sm:py-12 md:py-15 lg:py-24">
        {/* Hero — ROOT FURTHER Logo */}
        <Image
          src="/assets/login/root-further-logo.png"
          alt="ROOT FURTHER - SAA 2025"
          width={338}
          height={150}
          priority
          className="w-[240px] sm:w-[280px] lg:w-[338px] h-auto"
        />

        {/* Title Section */}
        <section className="w-full lg:w-[1152px] max-w-full flex flex-col gap-4">
          <p className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-white leading-8 text-center">
            Sun* Annual Awards 2025
          </p>
          <hr className="border-[#2E3940]" />
          <h1 className="font-[family-name:var(--font-montserrat)] text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px] tracking-[-0.25px] text-center">
            Hệ thống giải thưởng SAA 2025
          </h1>
        </section>

        {/* Awards Content — Two Column Layout */}
        <div className="w-full lg:w-[1152px] max-w-full flex flex-row gap-10 lg:gap-20">
          <AwardsSidebar />
          <AwardsDetailList />
        </div>

        {/* Sun* Kudos Section */}
        <KudosSection />
      </main>
    </div>
  );
}
