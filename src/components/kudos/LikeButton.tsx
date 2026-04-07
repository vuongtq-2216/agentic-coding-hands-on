"use client";

import { useState, useCallback } from "react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { likeKudos, unlikeKudos } from "@/services/kudos";

type LikeButtonProps = {
  kudosId: string;
  initialCount: number;
  initialLiked: boolean;
};

export function LikeButton({
  kudosId,
  initialCount,
  initialLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [bouncing, setBouncing] = useState(false);

  const handleToggle = useCallback(async () => {
    const wasLiked = liked;
    const prevCount = count;

    // Optimistic update
    setLiked(!wasLiked);
    setCount(wasLiked ? prevCount - 1 : prevCount + 1);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 200);

    try {
      if (wasLiked) {
        await unlikeKudos(kudosId);
      } else {
        await likeKudos(kudosId);
      }
    } catch {
      // Rollback on failure
      setLiked(wasLiked);
      setCount(prevCount);
    }
  }, [liked, count, kudosId]);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 transition-transform duration-200"
      style={{
        transform: bouncing ? "scale(1.15)" : "scale(1)",
      }}
      type="button"
    >
      <HeartIcon
        filled={liked}
        className={liked ? "text-red-500" : "text-[#00101A]"}
      />
      <span className="font-montserrat text-[24px] font-bold text-[#00101A]">
        {count}
      </span>
    </button>
  );
}
