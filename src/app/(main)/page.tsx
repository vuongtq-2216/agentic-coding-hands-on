import Image from "next/image";
import { HeroSection } from "@/components/homepage/HeroSection";
import { ContentSection } from "@/components/homepage/ContentSection";
import { AwardsSection } from "@/components/homepage/AwardsSection";
import { KudosSection } from "@/components/homepage/KudosSection";
import { WidgetButton } from "@/components/homepage/WidgetButton";

export default function HomePage() {
  return (
    <div className="bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Layer — keyvisual only covers hero area (top 1392px) */}
      <div className="absolute top-0 left-0 right-0 h-[800px] sm:h-[1000px] lg:h-[1392px] z-0 overflow-hidden">
        <Image
          src="/assets/homepage/keyvisual-bg.jpg"
          alt=""
          width={1512}
          height={1392}
          priority
          quality={75}
          sizes="100vw"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay fading image to dark background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center gap-15 sm:gap-20 lg:gap-[120px] px-4 sm:px-6 md:px-10 lg:px-36 py-10 sm:py-12 md:py-15 lg:py-24">
        <HeroSection />
        <ContentSection />
        <AwardsSection />
        <KudosSection />
      </main>

      {/* Widget Button */}
      <WidgetButton />
    </div>
  );
}
