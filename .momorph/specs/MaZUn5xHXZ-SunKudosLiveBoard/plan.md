# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-SunKudosLiveBoard`
**Date**: 2026-04-07
**Spec**: `specs/MaZUn5xHXZ-SunKudosLiveBoard/spec.md`

---

## Summary

Implement the Sun* Kudos Live Board (`/sun-kudos`) — the most complex screen in the SAA 2025 platform. A social recognition board where employees send appreciation (kudos) to each other. Features: kudos feed with infinite scroll, send-kudos form dialog, highlight carousel with filters, spotlight board visualization, personal stats sidebar with secret box, like/unlike with optimistic updates, copy permalink, user search with autocomplete, and a top-10 leaderboard. Requires Supabase database tables, 11 API routes, file upload to Supabase Storage, and multiple client-side interactive components.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: Supabase PostgreSQL — new tables: `kudos_posts`, `kudos_likes`, `user_profiles` (extended), `secret_boxes`
**Testing**: Vitest (planned)
**State Management**: Local state per component + optimistic updates for likes
**API Style**: Next.js Route Handlers (GET/POST/DELETE) + Server Actions

---

## Constitution Compliance Check

- [x] Follows project coding conventions — PascalCase, camelCase, `@/*` path alias
- [x] Uses approved libraries and patterns — Supabase, TailwindCSS, Next.js Image, next/font
- [x] Adheres to folder structure — `(main)/sun-kudos/`, `components/kudos/`, `types/`, `services/`
- [x] Meets security requirements — auth via middleware, XSS prevention, input validation, OWASP
- [x] Follows testing standards — TDD planned

**Violations**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| D3.js or vis.js for Spotlight | Required for network graph visualization; no native alternative | Static image (loses interactivity) |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based in `src/components/kudos/`. Many client components due to interactivity (carousel, infinite scroll, likes, forms, search, visualization)
- **Data Fetching**: Server Component page fetches initial data (first page of feed, highlights, stats). Client components handle pagination, real-time interactions, and filters
- **Server vs Client boundary**:
  - `page.tsx` = Server Component (fetches initial data, renders shell)
  - `KudosFeed.tsx` = `"use client"` (infinite scroll, like toggling)
  - `KudosCard.tsx` = Server Component (static card, receives data as props; like button is a client child)
  - `SendKudosDialog.tsx` = `"use client"` (form with file upload)
  - `HighlightCarousel.tsx` = `"use client"` (carousel navigation, filters)
  - `SpotlightBoard.tsx` = `"use client"` (D3/Canvas visualization)
  - `StatsSidebar.tsx` = partial client (secret box button is client child)
  - `SearchAutocomplete.tsx` = `"use client"` (debounced search)

### Backend Approach

- **API Routes**: Next.js Route Handlers in `src/app/api/kudos/`, `src/app/api/secret-box/`, `src/app/api/users/`
- **Database**: Supabase PostgreSQL via `@supabase/supabase-js`. All queries use server-side Supabase client (no RLS bypass — use service role for admin operations, user client for user-scoped queries)
- **File Upload**: Supabase Storage bucket `kudos-images` for image attachments
- **Pagination**: Cursor-based using `created_at` + `id` composite cursor

### Integration Points

- **Existing Layout**: `src/app/(main)/layout.tsx` provides auth Header ("Sun* Kudos" active via `usePathname()`) + Footer
- **Existing Types**: Extend `src/types/` with `kudos.ts`
- **Existing Services**: `src/libs/supabase/server.ts`, `src/libs/supabase/client.ts`
- **Existing Icons**: Reuse `ArrowRightIcon`, `PenIcon` etc.; create new icons (Heart, Send, CopyLink, Gift, Search)

---

## Project Structure

### Source Code

```text
src/
├── app/
│   ├── (main)/
│   │   └── sun-kudos/
│   │       └── page.tsx              # NEW: Kudos page (Server Component)
│   └── api/
│       ├── kudos/
│       │   ├── route.ts             # NEW: GET (feed) + POST (create)
│       │   ├── highlights/
│       │   │   └── route.ts         # NEW: GET highlighted kudos
│       │   ├── stats/
│       │   │   └── route.ts         # NEW: GET user stats
│       │   ├── spotlight/
│       │   │   └── route.ts         # NEW: GET spotlight data
│       │   ├── upload-image/
│       │   │   └── route.ts         # NEW: POST image upload
│       │   └── [id]/
│       │       └── like/
│       │           └── route.ts     # NEW: POST (like) + DELETE (unlike)
│       ├── secret-box/
│       │   └── open/
│       │       └── route.ts         # NEW: POST open secret box
│       ├── users/
│       │   └── search/
│       │       └── route.ts         # NEW: GET search users
│       └── sunner-leaderboard/
│           └── route.ts             # NEW: GET top 10 prize recipients
├── components/
│   └── kudos/
│       ├── KudosHero.tsx            # NEW: Hero banner with title + KUDOS logo
│       ├── SendKudosBar.tsx         # NEW: "use client" — pill input bar, opens dialog
│       ├── SendKudosDialog.tsx      # NEW: "use client" — form modal with recipient, message, hashtags, images
│       ├── SearchAutocomplete.tsx   # NEW: "use client" — debounced user search
│       ├── HighlightSection.tsx     # NEW: Section header + carousel container
│       ├── HighlightCarousel.tsx    # NEW: "use client" — carousel with arrows, pagination, filter dropdowns
│       ├── HighlightCard.tsx        # NEW: Featured kudos card (528px, gold border)
│       ├── SpotlightSection.tsx     # NEW: Section header + visualization container
│       ├── SpotlightBoard.tsx       # NEW: "use client" — D3/Canvas network visualization
│       ├── KudosFeed.tsx            # NEW: "use client" — infinite scroll feed container
│       ├── KudosCard.tsx            # NEW: Kudos post card (680px, cream bg)
│       ├── KudosCardSender.tsx      # NEW: Sender/receiver row with avatars + badges
│       ├── LikeButton.tsx           # NEW: "use client" — heart toggle with optimistic update
│       ├── CopyLinkButton.tsx       # NEW: "use client" — clipboard copy + toast
│       ├── ImageGallery.tsx         # NEW: Horizontal image thumbnails (5 max)
│       ├── StatsSidebar.tsx         # NEW: Stats box + secret box button
│       ├── SecretBoxButton.tsx      # NEW: "use client" — open secret box action
│       ├── LeaderboardBox.tsx       # NEW: Top 10 sunner leaderboard
│       └── UserBadge.tsx            # NEW: Badge pill (Rising/Legend/New/Super Hero)
├── icons/
│   ├── HeartIcon.tsx               # NEW: Heart (outlined + filled variants)
│   ├── SendIcon.tsx                # NEW: Send arrow icon
│   ├── CopyLinkIcon.tsx            # NEW: Link/copy icon
│   ├── GiftIcon.tsx                # NEW: Gift icon for secret box
│   └── SearchIcon.tsx              # NEW: Search magnifier icon
├── types/
│   └── kudos.ts                    # NEW: KudosPost, UserProfile, UserStats, SecretBox, KudosLike types
├── services/
│   └── kudos.ts                    # NEW: API client functions (fetchKudos, createKudos, likeKudos, etc.)
└── data/
    └── awards.ts                   # EXISTS — unchanged
```

### Database Schema (Supabase)

```sql
-- User profiles extension
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  department_code TEXT,
  department_name TEXT,
  badge_type TEXT CHECK (badge_type IN ('Rising Hero', 'Legend Hero', 'New Hero', 'Super Hero'))
);

-- Kudos posts
CREATE TABLE kudos_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES user_profiles(id),
  receiver_id UUID NOT NULL REFERENCES user_profiles(id),
  message TEXT NOT NULL,
  category TEXT,
  hashtags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  is_highlighted BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT no_self_kudos CHECK (sender_id != receiver_id)
);

-- Kudos likes (join table)
CREATE TABLE kudos_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudos_id UUID NOT NULL REFERENCES kudos_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kudos_id, user_id)
);

-- Secret boxes
CREATE TABLE secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  is_opened BOOLEAN DEFAULT false,
  prize_description TEXT,
  opened_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_kudos_posts_created_at ON kudos_posts(created_at DESC);
CREATE INDEX idx_kudos_posts_highlighted ON kudos_posts(is_highlighted) WHERE is_highlighted = true;
CREATE INDEX idx_kudos_likes_kudos_id ON kudos_likes(kudos_id);
CREATE INDEX idx_kudos_likes_user_id ON kudos_likes(user_id);
CREATE INDEX idx_secret_boxes_user_id ON secret_boxes(user_id);
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| d3 | ^7 | Spotlight board network visualization (or alternative: vis-network) |
| @types/d3 | ^7 | TypeScript types for D3 |

All other dependencies already installed.

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add kudos-specific design tokens (card-bg #FFF8E1, sidebar-bg #00070C, message-bg, hashtag red, etc.) |
| `package.json` | Add D3.js dependency |

---

## Implementation Strategy

### Phase 0: Asset Preparation + Foundation

1. Download assets: hero keyvisual bg, KUDOS logo image/font, badge icons
2. Create new icon components: HeartIcon, SendIcon, CopyLinkIcon, GiftIcon, SearchIcon
3. Create `src/types/kudos.ts` with all type definitions
4. Create `src/services/kudos.ts` with API client functions
5. Add kudos design tokens to `globals.css`
6. Install D3.js: `yarn add d3 @types/d3`

### Phase 1: Database + API (Backend-first)

7. Create Supabase migration: `user_profiles`, `kudos_posts`, `kudos_likes`, `secret_boxes` tables + indexes
8. Create Supabase Storage bucket `kudos-images`
9. Create `GET /api/kudos` — cursor-based feed pagination
10. Create `POST /api/kudos` — create kudos post with validation
11. Create `GET /api/kudos/highlights` — highlighted kudos with hashtag/department filters
12. Create `GET /api/kudos/stats` — user stats aggregate
13. Create `POST /api/kudos/[id]/like` + `DELETE` — like/unlike toggle
14. Create `GET /api/kudos/spotlight` — graph data for visualization
15. Create `POST /api/secret-box/open` — open box, return prize
16. Create `GET /api/users/search` — user search autocomplete
17. Create `POST /api/kudos/upload-image` — image upload to Supabase Storage
18. Create `GET /api/sunner-leaderboard` — top 10 most recent prize recipients
19. Seed test data: 20+ kudos posts, 10 users, 5 highlighted, 5 secret boxes, 10 leaderboard entries

### Phase 2: Core UI — US1 (Feed) + US2 (Send) [P1 MVP]

20. Create `KudosCard.tsx` — the core card component
21. Create `KudosCardSender.tsx` — sender/receiver row with avatars + badges
22. Create `UserBadge.tsx` — badge pill component
23. Create `ImageGallery.tsx` — horizontal thumbnail gallery
24. Create `LikeButton.tsx` — heart toggle with optimistic update
25. Create `CopyLinkButton.tsx` — clipboard copy + toast
26. Create `KudosFeed.tsx` — infinite scroll container using Intersection Observer
27. Create `SendKudosBar.tsx` — pill-shaped input bar trigger
28. Create `SendKudosDialog.tsx` — full form modal (recipient autocomplete, message, hashtags, images, submit)
29. Create `SearchAutocomplete.tsx` — debounced user search with dropdown
30. Create `KudosHero.tsx` — hero banner with title, KUDOS logo, input bars
31. Create `sun-kudos/page.tsx` — page assembly with initial data fetch

### Phase 3: Extended UI — US3 (Carousel) + US4 (Stats) [P1/P2]

32. Create `HighlightCard.tsx` — featured card variant (528px, gold border 4px)
33. Create `HighlightCarousel.tsx` — carousel with arrows, pagination, filter dropdowns
34. Create `HighlightSection.tsx` — section header + carousel
35. Create `StatsSidebar.tsx` — stats box + secret box button
36. Create `SecretBoxButton.tsx` — gold button with gift icon, opens box
37. Create `LeaderboardBox.tsx` — top 10 leaderboard

### Phase 4: Spotlight — US5 [P2]

38. Create `SpotlightBoard.tsx` — D3/Canvas network visualization
39. Create `SpotlightSection.tsx` — section header + board

### Phase 5: Polish — US6-US8 + Cross-cutting [P2/P3]

40. Verify like/unlike optimistic updates + rollback
41. Verify copy link clipboard functionality + toast
42. Verify search autocomplete debouncing + keyboard nav
43. Responsive verification at 375px, 768px, 1280px
44. Accessibility audit: keyboard nav, aria-labels, focus management
45. `yarn lint` + `yarn build`

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight D3 visualization complexity | High | High | Start with simplified static rendering; iterate to interactive. Use lazy loading to avoid blocking page load |
| Supabase Storage image upload on Cloudflare Workers | Medium | High | Verify `@supabase/supabase-js` Storage API works on edge runtime. Fallback: upload via client-side directly to Supabase |
| Infinite scroll performance with many cards | Medium | Medium | Use virtualization (react-window) if feed exceeds 100 cards. Cursor-based pagination prevents duplicates |
| Send dialog form complexity | Medium | Medium | Use React 19 `useActionState` for form state. Break into sub-components (RecipientPicker, HashtagInput, ImageUploader) |
| Database schema design | Low | High | Start simple; add indexes. Consider materialized views for stats if performance degrades |
| Carousel touch support | Low | Medium | Use CSS scroll-snap or Embla Carousel library for robust mobile support |

### Estimated Complexity

- **Frontend**: Very High (20+ components, many client-side, carousel, visualization, infinite scroll, form with file upload)
- **Backend**: High (11 API routes, 4 database tables, file upload, cursor pagination)
- **Testing**: High (many interaction flows, optimistic updates, edge cases)

---

## Integration Testing Strategy

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase DB | Real DB (local Docker) | Constitution requires real integration tests |
| Supabase Storage | Mock or local bucket | Avoid real file uploads in tests |
| Intersection Observer | Mock | Not available in test env |
| Clipboard API | Mock | Not available in test env |
| D3.js | Mock or skip | Canvas-based; hard to test visually |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| API route handlers | 90%+ | High |
| KudosCard rendering | 80%+ | High |
| SendKudosDialog form | 85%+ | High |
| Like/unlike optimistic | 90%+ | High |
| Feed infinite scroll | 80%+ | High |
| Carousel navigation | 70%+ | Medium |
| Spotlight board | 50%+ | Low (visual) |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved
- [x] `design-style.md` approved
- [x] `(main)/layout.tsx` provides auth Header + Footer
- [x] Supabase local Docker running
- [ ] D3.js installed
- [ ] Supabase database migration applied
- [ ] Supabase Storage bucket created
- [ ] Test data seeded
- [ ] Assets downloaded from Figma

---

## Notes

- **Phased delivery recommended**: Phase 1 (DB + API) → Phase 2 (Feed + Send = MVP) → Phase 3 (Carousel + Stats) → Phase 4 (Spotlight) → Phase 5 (Polish). Each phase is independently deployable.
- The Spotlight board is the riskiest component. Consider deferring to a later sprint if D3 integration proves too complex for the initial delivery.
- Image uploads should go directly from client → Supabase Storage (bypassing the Next.js server) for performance. The API route `/api/kudos/upload-image` generates a signed upload URL.
- The `(main)/layout.tsx` already detects the active nav link via `usePathname()`, so "Sun* Kudos" will automatically show as active.
- For MVP, the feed can use simple client-side `fetch` with cursor pagination. Server Components can pre-render the first page. Subsequent pages load on scroll.
- The form dialog should use React portals for proper z-index layering and body scroll locking.
- Consider extracting `SectionHeader` (subtitle + divider + title) as a shared component — it's used by Highlight, Spotlight, and All Kudos sections, and also exists on the Awards Information page.
