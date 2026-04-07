import Image from "next/image";
import type { LeaderboardEntry } from "@/types/kudos";

type LeaderboardBoxProps = {
  entries: LeaderboardEntry[];
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function LeaderboardBox({ entries }: LeaderboardBoxProps) {
  return (
    <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4">
      <h3 className="font-montserrat text-[22px] font-bold text-[#FFEA9E] text-center">
        10 SUNNER NHẬN QUÀ MỚI NHẤT
      </h3>

      {entries.length === 0 ? (
        <p className="font-montserrat text-[16px] text-white/60 text-center py-4">
          Chưa có dữ liệu.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div key={entry.userId} className="flex items-center gap-2">
              {entry.avatarUrl ? (
                <Image
                  src={entry.avatarUrl}
                  alt={entry.fullName}
                  width={64}
                  height={64}
                  className="rounded-full shrink-0 object-cover"
                  style={{ width: 64, height: 64 }}
                />
              ) : (
                <div
                  className="rounded-full shrink-0 flex items-center justify-center font-montserrat text-base font-bold text-white"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#998C5F",
                  }}
                >
                  {getInitials(entry.fullName)}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-montserrat text-[22px] font-bold text-[#FFEA9E] truncate">
                  {entry.fullName}
                </span>
                <span className="font-montserrat text-[16px] text-white truncate">
                  {entry.prizeDescription}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
