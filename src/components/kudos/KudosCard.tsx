import type { KudosPost } from "@/types/kudos";
import { KudosCardSender } from "./KudosCardSender";
import { ImageGallery } from "./ImageGallery";
import { LikeButton } from "./LikeButton";
import { CopyLinkButton } from "./CopyLinkButton";

type KudosCardProps = {
  kudos: KudosPost;
  currentUserId: string;
};

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function KudosCard({ kudos, currentUserId }: KudosCardProps) {
  return (
    <div className="w-full lg:w-[680px] bg-[#FFF8E1] rounded-3xl flex flex-col gap-4 px-6 py-6 lg:px-10 lg:pt-10 lg:pb-4">
      {/* Sender → Receiver */}
      <KudosCardSender sender={kudos.sender} receiver={kudos.receiver} />

      <hr className="border-[#FFEA9E]" />

      {/* Timestamp + Category */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-montserrat text-[16px] text-[#999]">
          {formatTimestamp(kudos.createdAt)}
        </span>
        {kudos.category && (
          <span className="font-montserrat text-[16px] text-[#00101A]">
            {kudos.category}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="border border-[#FFEA9E] bg-[rgba(255,234,158,0.4)] rounded-xl px-6 py-4">
        <p className="font-montserrat text-[20px] font-bold text-[#00101A] text-justify">
          {kudos.message}
        </p>
      </div>

      {/* Images */}
      {kudos.imageUrls.length > 0 && (
        <ImageGallery imageUrls={kudos.imageUrls} />
      )}

      {/* Hashtags */}
      {kudos.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {[...new Set(kudos.hashtags)].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="font-[family-name:var(--font-montserrat)] text-base font-bold text-[#D4271D]"
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      )}

      <hr className="border-[#FFEA9E]" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <LikeButton
          kudosId={kudos.id}
          initialCount={kudos.likeCount}
          initialLiked={false}
        />
        <CopyLinkButton kudosId={kudos.id} />
      </div>
    </div>
  );
}
