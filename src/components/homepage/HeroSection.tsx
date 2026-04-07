import Image from "next/image";
import { CountdownTimer } from "./CountdownTimer";
import { EventInfo } from "./EventInfo";
import { CTAButtons } from "./CTAButtons";

export function HeroSection() {
  return (
    <section className="w-full lg:w-[1224px] max-w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
      <Image
        src="/assets/login/root-further-logo.png"
        alt="ROOT FURTHER - SAA 2025"
        width={451}
        height={200}
        priority
        className="w-[280px] sm:w-[360px] md:w-[400px] lg:w-[451px] h-auto"
      />
      <CountdownTimer />
      <EventInfo />
      <CTAButtons />
    </section>
  );
}
