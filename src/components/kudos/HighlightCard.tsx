import type { KudosPost } from "@/types/kudos";
import { KudosCardSender } from "./KudosCardSender";
import { LikeButton } from "./LikeButton";
import { CopyLinkButton } from "./CopyLinkButton";

export function HighlightCard({ kudos }: { kudos: KudosPost }) {
  return (
    <div className="w-[320px] sm:w-[400px] lg:w-[528px] shrink-0 border-4 border-[#FFEA9E] bg-[#FFF8E1] rounded-2xl p-4 sm:p-5 lg:p-6 lg:pb-4 flex flex-col gap-4">
      {/* Sender / Receiver */}
      <KudosCardSender sender={kudos.sender} receiver={kudos.receiver} />

      {/* Divider */}
      <hr className="border-[#FFEA9E]" />

      {/* Content */}
      <div className="flex flex-col gap-3">
        <span className="font-[family-name:var(--font-montserrat)] text-sm text-[#999] tracking-wide">
          {new Date(kudos.createdAt).toLocaleDateString("vi-VN")}
        </span>

        {kudos.category && (
          <span className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] tracking-wide">
            {kudos.category}
          </span>
        )}

        <div className="border border-[#FFEA9E] bg-[rgba(255,234,158,0.4)] rounded-xl px-4 sm:px-6 py-4">
          <p className="font-[family-name:var(--font-montserrat)] text-sm sm:text-base lg:text-xl font-bold text-[#00101A] leading-7 lg:leading-8 text-justify line-clamp-4">
            {kudos.message}
          </p>
        </div>

        {/* Hashtags */}
        {kudos.hashtags.length > 0 && (
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#D4271D] tracking-wide line-clamp-1">
            {[...new Set(kudos.hashtags)].join(" ")}
          </p>
        )}
      </div>

      {/* Divider */}
      <hr className="border-[#FFEA9E]" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CopyLinkButton kudosId={kudos.id} />
        </div>
        <LikeButton
          kudosId={kudos.id}
          initialCount={kudos.likeCount}
          initialLiked={false}
        />
      </div>
    </div>
  );
}
