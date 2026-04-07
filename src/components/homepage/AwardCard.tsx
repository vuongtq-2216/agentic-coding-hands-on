import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import type { AwardCategory } from "@/data/awards";

export function AwardCard({ award }: { award: AwardCategory }) {
  const href = `/awards-information#${award.anchor}`;

  return (
    <div className="w-full max-w-[336px] mx-auto flex flex-col gap-6 cursor-pointer group transition-transform duration-200 ease-out hover:-translate-y-1">
      <Link href={href} className="block">
        <div className="w-full aspect-square rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] overflow-hidden transition-shadow duration-200 group-hover:shadow-[0_8px_8px_0_rgba(0,0,0,0.25),0_0_12px_0_#FAE287]">
          <Image
            src={award.imagePath}
            alt={award.title}
            width={336}
            height={336}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={href}>
          <h3 className="font-[family-name:var(--font-montserrat)] text-xl lg:text-2xl font-normal text-[#FFEA9E] leading-8">
            {award.title}
          </h3>
        </Link>
        <p className="font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-normal text-white leading-6 tracking-wide line-clamp-2">
          {award.description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 py-4 font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-medium text-white tracking-[0.15px] hover:text-[#FFEA9E] transition-colors"
        >
          Chi tiết
          <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>
      </div>
    </div>
  );
}
