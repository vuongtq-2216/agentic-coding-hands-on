import Image from "next/image";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { LicenseIcon } from "@/components/icons/LicenseIcon";
import type { AwardCategory } from "@/data/awards";

function PrizeSection({
  label,
  amount,
  note,
}: {
  label: string;
  amount: string;
  note: string | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <LicenseIcon className="w-6 h-6 text-[#FFEA9E] shrink-0" />
        <span className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-[#FFEA9E] leading-8">
          {label}
        </span>
      </div>
      <p className="font-[family-name:var(--font-montserrat)] text-2xl lg:text-4xl font-bold text-white leading-[44px]">
        {amount}
      </p>
      {note && (
        <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white leading-5 tracking-[0.1px]">
          {note}
        </p>
      )}
    </div>
  );
}

export function AwardDetailCard({ award }: { award: AwardCategory }) {
  const hasDualPrize = award.secondPrizeAmount;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* Award Image */}
      <div className="w-full max-w-[336px] mx-auto lg:mx-0 shrink-0">
        <div className="w-full aspect-square rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] overflow-hidden">
          <Image
            src={award.imagePath}
            alt={award.title}
            width={336}
            height={336}
            className="w-full h-full object-cover mix-blend-screen"
          />
        </div>
      </div>

      {/* Content Panel */}
      <div className="flex flex-col gap-8 backdrop-blur-[32px] rounded-2xl flex-1">
        {/* Title */}
        <div className="flex items-center gap-4">
          <TargetIcon className="w-6 h-6 text-[#FFEA9E] shrink-0" />
          <h2 className="font-[family-name:var(--font-montserrat)] text-xl lg:text-2xl font-bold text-[#FFEA9E] leading-8">
            {award.title}
          </h2>
        </div>

        {/* Description */}
        <p className="font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-white leading-6 tracking-wide text-justify max-w-[480px]">
          {award.detailDescription}
        </p>

        {/* Separator */}
        <hr className="border-[#2E3940]" />

        {/* Count Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <DiamondIcon className="w-6 h-6 text-[#FFEA9E] shrink-0" />
            <span className="font-[family-name:var(--font-montserrat)] text-lg lg:text-2xl font-bold text-[#FFEA9E] leading-8">
              Số lượng giải thưởng:
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-montserrat)] text-2xl lg:text-4xl font-bold text-white leading-[44px]">
              {String(award.count).padStart(2, "0")}
            </span>
            {award.unit && (
              <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-white leading-5 tracking-[0.1px]">
                {award.unit}
              </span>
            )}
          </div>
        </div>

        {/* Separator */}
        <hr className="border-[#2E3940]" />

        {/* Prize Section */}
        <PrizeSection
          label="Giá trị giải thưởng:"
          amount={award.prizeAmount}
          note={award.prizeNote}
        />

        {/* Dual Prize (Signature 2025 only) */}
        {hasDualPrize && (
          <>
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-[#2E3940]" />
              <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#2E3940]">
                Hoặc
              </span>
              <hr className="flex-1 border-[#2E3940]" />
            </div>
            <PrizeSection
              label="Giá trị giải thưởng:"
              amount={award.secondPrizeAmount!}
              note={award.secondPrizeNote ?? null}
            />
          </>
        )}
      </div>
    </div>
  );
}
