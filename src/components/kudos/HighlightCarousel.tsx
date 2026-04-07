"use client";

import { useEffect, useState } from "react";
import type { KudosPost } from "@/types/kudos";
import { HighlightCard } from "./HighlightCard";
import { fetchHighlights } from "@/services/kudos";

export function HighlightCarousel() {
  const [posts, setPosts] = useState<KudosPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHashtag, setSelectedHashtag] = useState<string | undefined>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const res = await fetchHighlights(selectedHashtag, undefined, page, 3);
        setPosts(res.data);
        setTotalPages(res.totalPages);
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [page, selectedHashtag]);

  const allHashtags = [...new Set(posts.flatMap((p) => p.hashtags))];

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setSelectedHashtag(undefined); setPage(1); }}
          className={`px-4 py-2 border border-[#998C5F] rounded font-[family-name:var(--font-montserrat)] text-sm font-bold transition-colors cursor-pointer ${
            !selectedHashtag ? "bg-[rgba(255,234,158,0.3)] text-[#00101A]" : "bg-[rgba(255,234,158,0.1)] text-white"
          }`}
        >
          Tất cả
        </button>
        {allHashtags.slice(0, 5).map((tag) => (
          <button
            key={tag}
            onClick={() => { setSelectedHashtag(tag); setPage(1); }}
            className={`px-4 py-2 border border-[#998C5F] rounded font-[family-name:var(--font-montserrat)] text-sm font-bold transition-colors cursor-pointer ${
              selectedHashtag === tag ? "bg-[rgba(255,234,158,0.3)] text-[#00101A]" : "bg-[rgba(255,234,158,0.1)] text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Carousel */}
      {isLoading ? (
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[528px] h-[400px] bg-white/5 rounded-2xl animate-pulse shrink-0" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center font-[family-name:var(--font-montserrat)] text-lg text-white/40 py-10">
          Không tìm thấy kudos nổi bật nào
        </p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {posts.map((post) => (
            <div key={post.id} className="snap-start">
              <HighlightCard kudos={post} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-12 h-12 flex items-center justify-center rounded text-white text-2xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            aria-label="Trang trước"
          >
            ‹
          </button>
          <span className="font-[family-name:var(--font-montserrat)] text-[28px] font-bold text-[#999]">
            {page}/{totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded text-white text-2xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            aria-label="Trang sau"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
