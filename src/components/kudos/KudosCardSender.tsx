import Image from "next/image";
import type { UserProfile } from "@/types/kudos";
import { SendIcon } from "@/components/icons/SendIcon";
import { UserBadge } from "./UserBadge";

type KudosCardSenderProps = {
  sender: UserProfile;
  receiver: UserProfile;
};

function getInitials(name: string | undefined | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function PersonBlock({ user }: { user: UserProfile }) {
  const name = user?.fullName || "Unknown";
  return (
    <div className="flex items-center gap-3 min-w-0">
      {user?.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-full shrink-0 object-cover"
          style={{
            width: 64,
            height: 64,
            border: "1.869px solid white",
          }}
        />
      ) : (
        <div
          className="rounded-full shrink-0 flex items-center justify-center font-montserrat text-base font-bold text-white"
          style={{
            width: 64,
            height: 64,
            border: "1.869px solid white",
            backgroundColor: "#998C5F",
          }}
        >
          {getInitials(user?.fullName)}
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] truncate">
          {name}
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-[family-name:var(--font-montserrat)] text-sm text-[#999]">
            {user?.departmentCode || ""}
          </span>
          {user.badgeType && (
            <>
              <span className="text-[#999]">·</span>
              <UserBadge badgeType={user.badgeType} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function KudosCardSender({ sender, receiver }: KudosCardSenderProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <PersonBlock user={sender} />
      <SendIcon className="w-8 h-8 text-[#FFEA9E] shrink-0" />
      <PersonBlock user={receiver} />
    </div>
  );
}
