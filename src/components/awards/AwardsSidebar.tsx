"use client";

import { useEffect, useRef, useState } from "react";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { AWARD_CATEGORIES } from "@/data/awards";

export function AwardsSidebar() {
  const [activeSectionId, setActiveSectionId] = useState(
    AWARD_CATEGORIES[0].anchor
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize from URL hash + setup Intersection Observer
  useEffect(() => {
    // Read initial hash
    const hash = window.location.hash.slice(1);
    const validAnchors = AWARD_CATEGORIES.map((a) => a.anchor);
    if (hash && validAnchors.includes(hash)) {
      setActiveSectionId(hash);
      // Scroll to section after render
      setTimeout(() => {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    // Setup Intersection Observer for scroll-spy
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    // Observe all award sections
    for (const award of AWARD_CATEGORIES) {
      const el = document.getElementById(award.anchor);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  function handleClick(anchor: string) {
    setActiveSectionId(anchor);
    document
      .getElementById(anchor)
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Danh mục giải thưởng"
      className="hidden lg:flex flex-col gap-4 w-[178px] sticky top-[96px] self-start"
    >
      {AWARD_CATEGORIES.map((award) => {
        const isActive = activeSectionId === award.anchor;
        return (
          <button
            key={award.id}
            onClick={() => handleClick(award.anchor)}
            aria-current={isActive ? "true" : undefined}
            className={`flex items-center gap-2 px-4 py-4 text-left font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 tracking-[0.25px] transition-all duration-150 cursor-pointer ${
              isActive
                ? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
                : "text-white rounded hover:bg-white/10"
            }`}
          >
            <TargetIcon className="w-5 h-5 shrink-0" />
            <span>{award.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
