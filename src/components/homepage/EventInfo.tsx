export function EventInfo() {
  const dateDisplay =
    process.env.NEXT_PUBLIC_SAA_EVENT_DATE_DISPLAY || "26/12/2025";
  const venue = process.env.NEXT_PUBLIC_SAA_EVENT_VENUE || "Âu Cơ Art Center";

  return (
    <div className="max-w-full flex flex-col gap-2">
      <div className="flex flex-wrap gap-4 sm:gap-8 lg:gap-15">
        <p className="font-[family-name:var(--font-montserrat)]">
          <span className="text-sm lg:text-base font-bold text-white">
            Thời gian:{" "}
          </span>
          <span className="text-base lg:text-2xl font-bold text-[#FFEA9E]">
            {dateDisplay}
          </span>
        </p>
        <p className="font-[family-name:var(--font-montserrat)]">
          <span className="text-sm lg:text-base font-bold text-white">
            Địa điểm:{" "}
          </span>
          <span className="text-base lg:text-2xl font-bold text-[#FFEA9E]">
            {venue}
          </span>
        </p>
      </div>
      <p className="font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-white tracking-wide">
        Tường thuật trực tiếp qua sóng Livestream
      </p>
    </div>
  );
}
