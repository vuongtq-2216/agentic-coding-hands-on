import Image from "next/image";
import type { KudosPost, UserStats, LeaderboardEntry } from "@/types/kudos";
import { createClient } from "@/libs/supabase/server";
import { KudosHero } from "@/components/kudos/KudosHero";
import { KudosFeed } from "@/components/kudos/KudosFeed";
import { StatsSidebar } from "@/components/kudos/StatsSidebar";
import { LeaderboardBox } from "@/components/kudos/LeaderboardBox";
import { HighlightSection } from "@/components/kudos/HighlightSection";
import { SpotlightSection } from "@/components/kudos/SpotlightSection";

type DbProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  department_code: string;
  department_name: string;
  badge_type: string | null;
};

function mapProfile(p: DbProfile) {
  return {
    id: p.id,
    fullName: p.full_name,
    avatarUrl: p.avatar_url,
    departmentCode: p.department_code,
    departmentName: p.department_name,
    badgeType: p.badge_type as KudosPost["sender"]["badgeType"],
  };
}

async function fetchPageData() {
  const supabase = await createClient();

  // Fetch kudos posts with sender/receiver
  const { data: posts } = await supabase
    .from("kudos_posts")
    .select(
      `id, message, category, hashtags, image_urls, is_highlighted, like_count, created_at,
       sender:user_profiles!kudos_posts_sender_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type),
       receiver:user_profiles!kudos_posts_receiver_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type)`
    )
    .order("created_at", { ascending: false })
    .limit(10);

  const kudosPosts: KudosPost[] = (posts || []).map((p) => ({
    id: p.id,
    sender: mapProfile(p.sender as unknown as DbProfile),
    receiver: mapProfile(p.receiver as unknown as DbProfile),
    message: p.message,
    category: p.category,
    hashtags: p.hashtags || [],
    imageUrls: p.image_urls || [],
    isHighlighted: p.is_highlighted,
    likeCount: p.like_count,
    createdAt: p.created_at,
  }));

  // Fetch leaderboard
  const { data: boxes } = await supabase
    .from("secret_boxes")
    .select(
      `user_id, prize_description, opened_at,
       user:user_profiles!secret_boxes_user_id_fkey(id, full_name, avatar_url)`
    )
    .eq("is_opened", true)
    .not("prize_description", "is", null)
    .order("opened_at", { ascending: false })
    .limit(10);

  const leaderboard: LeaderboardEntry[] = (boxes || []).map((b) => ({
    userId: b.user_id,
    fullName: (b.user as unknown as DbProfile)?.full_name || "Unknown",
    avatarUrl: (b.user as unknown as DbProfile)?.avatar_url || null,
    prizeDescription: b.prize_description || "",
    awardedAt: b.opened_at || "",
  }));

  const totalLikes = kudosPosts.reduce((sum, p) => sum + p.likeCount, 0);
  const stats: UserStats = {
    kudosReceived: kudosPosts.length,
    kudosSent: kudosPosts.length,
    heartsReceived: totalLikes,
    heartsMultiplier: 2,
    secretBoxesOpened: leaderboard.length,
    secretBoxesRemaining: 5,
  };

  const nextCursor =
    kudosPosts.length === 10
      ? kudosPosts[kudosPosts.length - 1]?.createdAt
      : null;

  return { kudosPosts, nextCursor, leaderboard, stats };
}

export default async function SunKudosPage() {
  const { kudosPosts, nextCursor, leaderboard, stats } =
    await fetchPageData();

  return (
    <div className="bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute top-0 left-0 right-0 h-[800px] sm:h-[1000px] lg:h-[1392px] z-0 overflow-hidden">
        <Image
          src="/assets/homepage/keyvisual-bg.jpg"
          alt=""
          width={1512}
          height={1392}
          priority
          quality={75}
          sizes="100vw"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(25deg, #00101A 14.74%, rgba(0,18,29,0) 47.8%)",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center gap-[120px] px-4 lg:px-36 py-10 lg:py-24">
        {/* Hero */}
        <KudosHero />

        {/* Highlight Kudos */}
        <HighlightSection />

        {/* Spotlight Board */}
        <SpotlightSection />

        {/* All Kudos Section */}
        <section className="w-full flex flex-col items-center gap-10">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-[family-name:var(--font-montserrat)] text-xl font-bold text-white">
              Sun* Annual Awards 2025
            </span>
            <div className="w-20 h-px bg-[#FFEA9E]" />
            <h2 className="font-[family-name:var(--font-montserrat)] text-4xl lg:text-[57px] font-bold text-[#FFEA9E] text-center leading-tight">
              ALL KUDOS
            </h2>
          </div>

          {/* Feed + Sidebar */}
          <div className="w-full flex flex-col lg:flex-row justify-center gap-10 lg:gap-20">
            {/* Left: Feed */}
            <KudosFeed
              initialPosts={kudosPosts}
              initialCursor={nextCursor}
              currentUserId=""
            />

            {/* Right: Stats + Leaderboard */}
            <div className="flex flex-col gap-6">
              <StatsSidebar stats={stats} />
              <LeaderboardBox entries={leaderboard} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
