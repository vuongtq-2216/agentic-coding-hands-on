type UserBadgeProps = {
  badgeType: string | null;
};

export function UserBadge({ badgeType }: UserBadgeProps) {
  if (!badgeType) return null;

  return (
    <span
      className="font-montserrat text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ border: "0.5px solid #FFEA9E" }}
    >
      {badgeType}
    </span>
  );
}
