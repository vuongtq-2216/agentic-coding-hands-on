"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { KudosPost } from "@/types/kudos";
import { fetchKudosFeed } from "@/services/kudos";
import { KudosCard } from "./KudosCard";

type KudosFeedProps = {
  initialPosts: KudosPost[];
  initialCursor: string | null;
  currentUserId: string;
};

function LoadingSkeleton() {
  return (
    <div className="w-full lg:w-[680px] bg-[#FFF8E1]/50 rounded-3xl p-10 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#FFEA9E]/40" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-[#FFEA9E]/40 rounded" />
            <div className="w-20 h-3 bg-[#FFEA9E]/40 rounded" />
          </div>
        </div>
        <div className="w-8 h-8 rounded bg-[#FFEA9E]/40" />
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#FFEA9E]/40" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-[#FFEA9E]/40 rounded" />
            <div className="w-20 h-3 bg-[#FFEA9E]/40 rounded" />
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-[#FFEA9E]/40" />
      <div className="w-full h-24 bg-[#FFEA9E]/40 rounded-xl" />
      <div className="w-full h-px bg-[#FFEA9E]/40" />
      <div className="flex justify-between">
        <div className="w-16 h-6 bg-[#FFEA9E]/40 rounded" />
        <div className="w-24 h-6 bg-[#FFEA9E]/40 rounded" />
      </div>
    </div>
  );
}

export function KudosFeed({
  initialPosts,
  initialCursor,
  currentUserId,
}: KudosFeedProps) {
  const [posts, setPosts] = useState<KudosPost[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialCursor !== null);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetchKudosFeed(cursor ?? undefined);
      setPosts((prev) => [...prev, ...response.data]);
      setCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
    } catch {
      // Silently fail — user can scroll again to retry
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, cursor]);

  useEffect(() => {
    const node = observerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="w-full lg:w-[680px] flex items-center justify-center py-20">
        <p className="font-montserrat text-[18px] text-white/60 text-center">
          Chưa có kudos nào. Hãy là người đầu tiên gửi lời cảm ơn!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[680px] flex flex-col gap-6">
      {posts.map((post) => (
        <KudosCard
          key={post.id}
          kudos={post}
          currentUserId={currentUserId}
        />
      ))}
      {isLoading && <LoadingSkeleton />}
      {hasMore && <div ref={observerRef} className="h-4" />}
    </div>
  );
}
