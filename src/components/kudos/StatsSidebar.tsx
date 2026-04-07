import type { UserStats } from "@/types/kudos";
import { GiftIcon } from "@/components/icons/GiftIcon";

type StatsSidebarProps = {
  stats: UserStats | null;
};

function StatRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: number;
  badge?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-montserrat text-[22px] font-bold text-white">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="font-montserrat text-[32px] font-bold text-[#FFEA9E]">
          {value}
        </span>
        {badge && (
          <span
            className="font-montserrat text-[11px] font-bold text-white px-2 py-0.5 rounded-full"
            style={{ border: "0.5px solid #FFEA9E" }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full lg:w-[422px] flex flex-col gap-6">
      <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="w-48 h-6 bg-white/10 rounded" />
            <div className="w-12 h-8 bg-[#FFEA9E]/20 rounded" />
          </div>
        ))}
      </div>
      <div className="w-full h-[60px] bg-[#FFEA9E]/30 rounded-lg animate-pulse" />
    </div>
  );
}

export function StatsSidebar({ stats }: StatsSidebarProps) {
  if (!stats) return <LoadingSkeleton />;

  return (
    <div className="w-full lg:w-[422px] flex flex-col gap-6">
      <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4">
        <StatRow label="Số Kudos bạn nhận được:" value={stats.kudosReceived} />
        <StatRow label="Số Kudos bạn đã gửi:" value={stats.kudosSent} />
        <StatRow
          label="Số tim bạn nhận được:"
          value={stats.heartsReceived}
          badge={
            stats.heartsMultiplier > 1
              ? `x${stats.heartsMultiplier}`
              : undefined
          }
        />
        <div className="border-t border-[#2E3940]" />
        <StatRow
          label="Số Secret Box bạn đã mở:"
          value={stats.secretBoxesOpened}
        />
        <StatRow
          label="Số Secret Box chưa mở:"
          value={stats.secretBoxesRemaining}
        />
      </div>

      <button
        type="button"
        className="w-full h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
      >
        <GiftIcon className="text-[#00101A]" />
        <span className="font-montserrat text-[22px] font-bold text-[#00101A]">
          Mở Secret Box
        </span>
      </button>
    </div>
  );
}
