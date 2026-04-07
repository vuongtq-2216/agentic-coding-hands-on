import Image from "next/image";
import { PrelaunchCountdown } from "@/components/prelaunch/PrelaunchCountdown";

export default function PrelaunchPage() {
  return (
    <div className="bg-[#00101A] w-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/homepage/keyvisual-bg.jpg"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <PrelaunchCountdown />
      </div>
    </div>
  );
}
