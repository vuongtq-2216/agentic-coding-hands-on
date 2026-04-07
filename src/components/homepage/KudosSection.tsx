import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";

export function KudosSection() {
  return (
    <section className="w-full lg:w-[1224px] max-w-full flex items-center justify-center">
      <div className="w-full lg:w-[1120px] min-h-[400px] lg:h-[500px] bg-[#0F0F0F] rounded-2xl overflow-hidden relative flex flex-col lg:flex-row">
        {/* Background image */}
        <Image
          src="/assets/homepage/kudos-bg.png"
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="(max-width: 1024px) 100vw, 1120px"
        />

        {/* Left content */}
        <div className="relative z-10 w-full lg:w-[457px] flex flex-col gap-6 lg:gap-8 justify-center p-6 sm:p-8 lg:p-12">
          <p className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-white leading-8">
            Phong trào ghi nhận
          </p>
          <h2 className="font-[family-name:var(--font-montserrat)] text-4xl sm:text-[48px] lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px]">
            Sun* Kudos
          </h2>
          <div className="font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-white leading-6 tracking-wide text-justify">
            <p className="font-bold text-xs lg:text-sm text-white/80 mb-2">
              ĐIỂM MỚI CỦA SAA 2025
            </p>
            <p>
              Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được đưa
              ra và dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào
              tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận,
              cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất
              liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người
              đạt giải.
            </p>
          </div>
          <Link
            href="/sun-kudos"
            className="inline-flex items-center gap-2 w-fit px-4 py-3 lg:px-4 lg:py-4 bg-[#FFEA9E] rounded font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-[#00101A] tracking-[0.15px] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Chi tiết
            <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>
        </div>

        {/* Right content - KUDOS logo */}
        <div className="relative z-10 hidden lg:flex flex-1 items-center justify-center">
          <span className="font-[family-name:var(--font-montserrat)] text-[72px] lg:text-[96px] font-bold text-[#DBD1C1] tracking-[-0.13em] leading-none opacity-80">
            KUDOS
          </span>
        </div>
      </div>
    </section>
  );
}
