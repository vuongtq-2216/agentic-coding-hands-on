# Tasks: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-SunKudosLiveBoard`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US8)
- **|**: File path affected

---

## Phase 1: Setup (Assets + Foundation)

**Purpose**: Download assets, create icons, define types, add design tokens, install dependencies

- [ ] T001 Download Figma assets: hero keyvisual bg, KUDOS logo image, badge icons (Rising/Legend/New/Super Hero). Save to `public/assets/sun-kudos/` | public/assets/sun-kudos/
- [ ] T002 Install D3.js for spotlight visualization: `yarn add d3 @types/d3` | package.json
- [ ] T003 [P] Create HeartIcon SVG component (24x24, outlined + filled variants via `filled` boolean prop, currentColor) | src/components/icons/HeartIcon.tsx
- [ ] T004 [P] Create SendIcon SVG component (32x32, arrow icon for sender→receiver in cards) | src/components/icons/SendIcon.tsx
- [ ] T005 [P] Create CopyLinkIcon SVG component (24x24, link/chain icon) | src/components/icons/CopyLinkIcon.tsx
- [ ] T006 [P] Create GiftIcon SVG component (24x24, gift box for secret box button) | src/components/icons/GiftIcon.tsx
- [ ] T007 [P] Create SearchIcon SVG component (24x24, magnifier glass) | src/components/icons/SearchIcon.tsx
- [ ] T008 Create `src/types/kudos.ts` with all type definitions: `KudosPost` (id, sender, receiver, message, category, hashtags, imageUrls, isHighlighted, likeCount, createdAt), `UserProfile` (id, fullName, avatarUrl, departmentCode, departmentName, badgeType), `UserStats` (kudosReceived, kudosSent, heartsReceived, heartsMultiplier, secretBoxesOpened, secretBoxesRemaining), `SecretBox` (id, isOpened, prizeDescription, openedAt), `KudosLike` (id, kudosId, userId), `LeaderboardEntry` (userId, fullName, avatarUrl, prizeDescription, awardedAt), `BadgeType` union ("Rising Hero" | "Legend Hero" | "New Hero" | "Super Hero" | null) | src/types/kudos.ts
- [ ] T009 Create `src/services/kudos.ts` with API client functions: `fetchKudosFeed(cursor?, limit?)`, `createKudos(data)`, `fetchHighlights(hashtag?, department?, page?)`, `fetchUserStats()`, `likeKudos(id)`, `unlikeKudos(id)`, `fetchSpotlightData()`, `openSecretBox()`, `fetchLeaderboard()`, `searchUsers(query)`, `uploadKudosImage(file)` — all use `fetch()` with proper auth headers | src/services/kudos.ts
- [ ] T010 Add kudos design tokens to globals.css: `--color-card-bg: #FFF8E1`, `--color-sidebar-bg: #00070C`, `--color-message-bg: rgba(255,234,158,0.4)`, `--color-input-bg: rgba(255,234,158,0.1)`, `--color-text-hashtag: #D4271D`, `--color-text-gray: #999999`, `--radius-input-pill: 68px`, `--radius-kudos-card: 24px`, `--radius-sidebar-box: 17px`, `--radius-message-box: 12px`, `--radius-thumbnail: 18px`, `--radius-spotlight: 47px` | src/app/globals.css

**Checkpoint**: Foundation ready — types, services, icons, tokens all in place

---

## Phase 2: Database + API (Backend)

**Purpose**: Create DB tables, storage bucket, and all API route handlers. BLOCKS all UI work.

- [ ] T011 Create Supabase migration: `user_profiles` table (id UUID PK refs auth.users, full_name TEXT, avatar_url TEXT, department_code TEXT, department_name TEXT, badge_type TEXT CHECK enum), `kudos_posts` table (id UUID PK, sender_id FK, receiver_id FK, message TEXT NOT NULL, category TEXT, hashtags TEXT[], image_urls TEXT[], is_highlighted BOOLEAN DEFAULT false, like_count INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now(), CHECK sender_id != receiver_id), `kudos_likes` table (id UUID PK, kudos_id FK CASCADE, user_id FK, created_at, UNIQUE(kudos_id, user_id)), `secret_boxes` table (id UUID PK, user_id FK, is_opened BOOLEAN DEFAULT false, prize_description TEXT, opened_at TIMESTAMPTZ). Add indexes on created_at DESC, is_highlighted, kudos_id, user_id | supabase/migrations/
- [ ] T012 Create Supabase Storage bucket `kudos-images` with public read access and authenticated write | Supabase dashboard or CLI
- [ ] T013 Seed test data: 10 user profiles (varied departments + badge types), 20+ kudos posts (mix of highlighted/normal, varied hashtags, some with images), 15 kudos likes, 10 secret boxes (5 opened, 5 unopened), 10 leaderboard entries | supabase/seeds/
- [ ] T014 [P] Create `GET /api/kudos` route handler: cursor-based pagination using `created_at` + `id`. Query params: `cursor`, `limit` (default 10), `hashtag`, `user_id`. Joins sender/receiver profiles. Returns `{ data: KudosPost[], nextCursor: string | null }`. Auth required | src/app/api/kudos/route.ts
- [ ] T015 [P] Create `POST /api/kudos` route handler: create kudos post. Body: `{ receiverId, message, category?, hashtags?, imageUrls? }`. Validates: receiverId exists and != sender, message non-empty (max 2000 chars), hashtags max 10, imageUrls max 5. Returns created post. Auth required | src/app/api/kudos/route.ts
- [ ] T016 [P] Create `GET /api/kudos/highlights` route handler: fetch highlighted posts. Query params: `hashtag`, `department`, `page`, `limit`. Filters by is_highlighted=true + optional filters. Returns paginated result with total pages | src/app/api/kudos/highlights/route.ts
- [ ] T017 [P] Create `GET /api/kudos/stats` route handler: aggregate stats for authenticated user — COUNT kudos received, COUNT kudos sent, SUM likes on received posts, COUNT secret boxes opened/remaining. Returns `UserStats` | src/app/api/kudos/stats/route.ts
- [ ] T018 [P] Create `POST /api/kudos/[id]/like` + `DELETE /api/kudos/[id]/like` route handlers: like inserts into kudos_likes + increments like_count, unlike deletes + decrements. Returns updated like_count. Auth required. Idempotent | src/app/api/kudos/[id]/like/route.ts
- [ ] T019 [P] Create `GET /api/kudos/spotlight` route handler: returns `{ totalKudos: number, nodes: [{ userId, name, avatarUrl, x, y }], edges: [{ from, to, weight }] }`. Aggregates from kudos_posts grouped by sender/receiver pairs | src/app/api/kudos/spotlight/route.ts
- [ ] T020 [P] Create `POST /api/kudos/upload-image` route handler: accepts multipart/form-data, validates file type (JPEG/PNG/GIF/WebP) and size (max 5MB), uploads to Supabase Storage `kudos-images` bucket, returns public URL | src/app/api/kudos/upload-image/route.ts
- [ ] T021 [P] Create `POST /api/secret-box/open` route handler: finds first unopened secret box for user, marks as opened with timestamp, generates/assigns prize_description, returns box data. Returns error if no boxes available. Auth required | src/app/api/secret-box/open/route.ts
- [ ] T022 [P] Create `GET /api/sunner-leaderboard` route handler: returns top 10 most recent prize recipients from secret_boxes WHERE is_opened=true, joined with user_profiles. Returns `LeaderboardEntry[]` | src/app/api/sunner-leaderboard/route.ts
- [ ] T023 [P] Create `GET /api/users/search` route handler: search user_profiles by full_name ILIKE. Query params: `q` (min 2 chars), `limit` (default 10). Returns matching `UserProfile[]`. Auth required | src/app/api/users/search/route.ts

**Checkpoint**: All API routes functional, test data seeded

---

## Phase 3: User Story 1 — Kudos Feed Display (Priority: P1)

**Goal**: Kudos feed with infinite scroll, sender/receiver info, messages, hashtags, images, likes

**Independent Test**: Navigate to `/sun-kudos` → see feed of kudos cards → scroll to load more → verify card content

- [ ] T024 [P] [US1] Create UserBadge component: pill-shaped badge (~109x19px, border 0.5px solid #FFEA9E, rounded-full). Accepts `badgeType` prop. Text ~11px Montserrat bold white. Renders badge name or null if no badge | src/components/kudos/UserBadge.tsx
- [ ] T025 [P] [US1] Create KudosCardSender component: flex-row with sender info (avatar 64px round + name 16px #00101A + dept code 14px #999 + dot separator + UserBadge), SendIcon (32x32), receiver info (same structure). Accepts `sender: UserProfile` + `receiver: UserProfile` props | src/components/kudos/KudosCardSender.tsx
- [ ] T026 [P] [US1] Create ImageGallery component: flex-row gap-4, up to 5 thumbnails (88x88px, rounded-[18px], border 1px #998C5F, Next.js Image, object-cover). Accepts `imageUrls: string[]` prop. Click opens lightbox (deferred — just display for now) | src/components/kudos/ImageGallery.tsx
- [ ] T027 [P] [US1] Create LikeButton client component ("use client"): HeartIcon (filled when liked) + like count (24px #00101A). Accepts `kudosId`, `initialCount`, `initialLiked`. Optimistic toggle: increment/decrement instantly, call like/unlike API, rollback on failure. 200ms scale bounce animation on toggle | src/components/kudos/LikeButton.tsx
- [ ] T028 [P] [US1] Create CopyLinkButton client component ("use client"): CopyLinkIcon + "Copy Link" text (16px #00101A). Clicks copies `{origin}/sun-kudos?kudos={id}` to clipboard via navigator.clipboard.writeText(). Shows brief toast "Đã sao chép link!" for 3s. Fallback for unsupported browsers | src/components/kudos/CopyLinkButton.tsx
- [ ] T029 [US1] Create KudosCard component: 680px wide, bg #FFF8E1, rounded-3xl, padding 40px 40px 16px 40px. Contains: KudosCardSender row → gold divider (#FFEA9E 1px) → timestamp (16px #999) + category label (16px #00101A) + edit icon (only if sender=currentUser) → message box (border #FFEA9E, bg rgba(255,234,158,0.4), rounded-xl, px-6 py-4, text 20px #00101A justify) → ImageGallery (if images) → hashtags (16px red #D4271D) → gold divider → action row (LikeButton + CopyLinkButton). Accepts `kudos: KudosPost`, `currentUserId: string` props | src/components/kudos/KudosCard.tsx
- [ ] T030 [US1] Create KudosFeed client component ("use client"): flex-col gap-6, width 680px. Renders KudosCard for each post. Intersection Observer at bottom triggers `fetchKudosFeed(cursor)` for infinite scroll. Shows loading skeleton during fetch. Empty state message "Chưa có kudos nào" when feed is empty. Manages `kudosFeed[]`, `feedCursor`, `hasMorePosts`, `isFeedLoading`, `likedPosts` state | src/components/kudos/KudosFeed.tsx

**Checkpoint**: Feed displays cards with all content, infinite scroll works

---

## Phase 4: User Story 2 — Send Kudos (Priority: P1)

**Goal**: Click input bar → dialog opens → fill form → submit creates new kudos at top of feed

**Independent Test**: Click send bar → dialog opens → select recipient, type message, add hashtags → submit → new card at top of feed

- [ ] T031 [P] [US2] Create SearchAutocomplete client component ("use client"): accepts `onSelect(user)` callback. Input with debounce 300ms, calls searchUsers API. Dropdown shows matching profiles (avatar + name + dept). Click selects, Escape closes. Reusable for both hero search and dialog recipient picker | src/components/kudos/SearchAutocomplete.tsx
- [ ] T032 [US2] Create SendKudosDialog client component ("use client"): modal overlay with form. Fields: RecipientPicker (SearchAutocomplete), message textarea (max 2000 chars), hashtag input (add tags, max 10), image upload (max 5 files, 5MB each, validates type, uploads to API, shows progress/preview), category dropdown. Submit button calls createKudos API. Loading/disabled state during submit. Validation errors inline. Close on backdrop click/Escape with unsaved changes confirmation. Focus trap | src/components/kudos/SendKudosDialog.tsx
- [ ] T033 [US2] Create SendKudosBar component: pill-shaped bar (738x72px, border 1px #998C5F, bg rgba(255,234,158,0.1), rounded-[68px], padding 24px 16px, PenIcon + placeholder text "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"). Click opens SendKudosDialog. Manages `isSendDialogOpen` state | src/components/kudos/SendKudosBar.tsx

**Checkpoint**: Full send-kudos flow working end-to-end

---

## Phase 5: User Story 1 + 2 — Page Assembly (P1 MVP)

**Goal**: Assemble the full page with hero, feed, and send functionality

- [ ] T034 [US1] Create KudosHero component: hero banner with title "Hệ thống ghi nhận và cảm ơn" (36px gold), KUDOS logo (140px beige #DBD1C1 or image), SendKudosBar + search bar side-by-side (flex-row gap). Background: keyvisual + gradient overlay linear-gradient(25deg, #00101A 14.74%, transparent 47.8%) | src/components/kudos/KudosHero.tsx
- [ ] T035 [US1] Create sun-kudos page (Server Component) inside `(main)` route group: fetches initial feed data (first 10 posts) + user stats server-side. Renders: BackgroundLayer (keyvisual + gradient) → KudosHero → placeholder for HighlightSection → placeholder for SpotlightSection → AllKudosSection (flex-row gap-20: KudosFeed left + placeholder sidebar right). Pass initial data as props to client components | src/app/(main)/sun-kudos/page.tsx

**Checkpoint**: MVP page renders with hero + feed + send kudos dialog

---

## Phase 6: User Story 3 — Highlight Kudos Carousel (Priority: P1)

**Goal**: Featured kudos carousel with filters and navigation

**Independent Test**: View HIGHLIGHT section → see featured cards → click arrows to navigate → apply hashtag filter → carousel updates

- [ ] T036 [P] [US3] Create HighlightCard component: 528px wide, border 4px solid #FFEA9E, bg #FFF8E1, rounded-2xl, padding 24px 24px 16px 24px. Same internal structure as KudosCard but with: sender/receiver in compact layout, message box narrower (432px), "Xem chi tiết" + "Copy Link" buttons + heart. Timestamp + category label | src/components/kudos/HighlightCard.tsx
- [ ] T037 [US3] Create HighlightCarousel client component ("use client"): horizontal carousel of HighlightCards. Prev/next arrow buttons (48x48). Pagination "2/5" indicator (28px #999). Filter dropdowns: "Hashtag" + "Phòng ban" (border #998C5F, bg rgba(255,234,158,0.1), rounded). Manages carouselPage, selectedHashtag, selectedDepartment state. Fetches from highlightsAPI with filters. Touch swipe support on mobile | src/components/kudos/HighlightCarousel.tsx
- [ ] T038 [US3] Create HighlightSection component: SectionHeader ("Sun* Annual Awards 2025" subtitle + divider + "HIGHLIGHT KUDOS" title 57px gold) + HighlightCarousel. Replace placeholder in page | src/components/kudos/HighlightSection.tsx

**Checkpoint**: Carousel functional with filters and navigation

---

## Phase 7: User Story 4 — Stats Sidebar + Secret Box (Priority: P2)

**Goal**: Personal stats display + secret box interaction + leaderboard

**Independent Test**: View sidebar → see kudos received/sent/hearts counts → click "Mở Secret Box" → box opens → leaderboard shows entries

- [ ] T039 [P] [US4] Create SecretBoxButton client component ("use client"): gold button (374x60px, bg #FFEA9E, rounded-lg, GiftIcon + "Mở Secret Box" text 22px #00101A). Click calls openSecretBox API. Disabled when remaining=0 (opacity 0.5). Loading state during API call. Shows result dialog/toast with prize description | src/components/kudos/SecretBoxButton.tsx
- [ ] T040 [P] [US4] Create LeaderboardBox component: dark container (bg #00070C, border #998C5F, rounded-[17px], padding 24px). Title "10 SUNNER NHẬN QUÀ MỚI NHẤT" (22px gold, centered). List of entries: avatar 64px + name 22px gold + prize 16px white. Gap 16px between entries. Fetches from leaderboard API | src/components/kudos/LeaderboardBox.tsx
- [ ] T041 [US4] Create StatsSidebar component: flex-col gap-6, width 422px. Stats box (dark bg #00070C, border #998C5F, rounded-[17px], padding 24px): stat rows (label 22px white + value 32px gold, justify-between) for kudos received, sent, hearts (with x2 badge), divider #2E3940, secret boxes opened/remaining. SecretBoxButton. Below: LeaderboardBox. Replace placeholder in page | src/components/kudos/StatsSidebar.tsx

**Checkpoint**: Stats sidebar with all values + working secret box + leaderboard

---

## Phase 8: User Story 5 — Spotlight Board (Priority: P2)

**Goal**: Interactive D3 visualization of kudos network

**Independent Test**: View SPOTLIGHT section → see "388 KUDOS" count → see network graph → search for user → pan/zoom

- [ ] T042 [US5] Create SpotlightBoard client component ("use client"): D3.js force-directed graph or Canvas rendering. Container 1157x548px, rounded-[47px], border #998C5F. Shows total "N KUDOS" count (36px white). Renders avatar nodes and connection edges. Search bar (219px, pill shape) highlights matching user. Pan/zoom controls. Lazy-loaded. Fallback for render failures | src/components/kudos/SpotlightBoard.tsx
- [ ] T043 [US5] Create SpotlightSection component: SectionHeader ("SPOTLIGHT BOARD" title) + SpotlightBoard. Replace placeholder in page | src/components/kudos/SpotlightSection.tsx

**Checkpoint**: Spotlight visualization renders with data

---

## Phase 9: User Story 6 + 7 + 8 — Like/Copy/Search/Leaderboard (Priority: P2/P3)

**Goal**: Verify and polish all interaction features

- [ ] T044 [US6] Verify LikeButton optimistic updates: click like → count +1 immediately → API confirms → verify. Click again → unlike → count -1 → API confirms. Simulate API failure → verify rollback | src/components/kudos/LikeButton.tsx
- [ ] T045 [US6] Verify CopyLinkButton: click → clipboard contains correct URL → toast shows and auto-dismisses after 3s. Test fallback on unsupported browser | src/components/kudos/CopyLinkButton.tsx
- [ ] T046 [US8] Integrate hero SearchAutocomplete: search bar in KudosHero (381x72px, pill shape, SearchIcon + "Tìm kiếm profile Sunner"). Types → debounced dropdown → click result navigates to user profile or filters feed | src/components/kudos/KudosHero.tsx
- [ ] T047 [US3] Verify "Xem chi tiết" button on HighlightCard: click scrolls to corresponding card in ALL KUDOS feed or opens detail modal | src/components/kudos/HighlightCard.tsx

**Checkpoint**: All interactions verified

---

## Phase 10: Polish & Cross-Cutting

**Purpose**: Responsive, accessibility, performance, build

- [ ] T048 [P] Verify responsive design at 375px (mobile), 768px (tablet), 1280px (desktop): hero stacks vertically, input bars full-width, carousel single card, feed full-width below sidebar, sidebar below feed on mobile, section titles scale (57px→32px), image gallery wraps. Footer/header responsive | src/app/(main)/sun-kudos/page.tsx
- [ ] T049 [P] Accessibility audit: keyboard navigation through all interactive elements (Tab order: hero inputs → carousel arrows → filter dropdowns → feed cards → like buttons → copy links → sidebar → footer), `aria-label` on icon buttons (heart, copy, arrows, gift, search, close), `aria-live="polite"` on feed updates + like counts, focus trap in SendKudosDialog, Escape closes all dialogs/dropdowns, touch targets >= 44x44px | all components
- [ ] T050 [P] XSS audit: verify ALL user-generated content (messages, hashtags, names) rendered as text via React (never dangerouslySetInnerHTML). Verify image URLs are from trusted Supabase Storage domain only | src/components/kudos/KudosCard.tsx
- [ ] T051 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Verify `/sun-kudos` route compiles. Verify all other routes still work (Homepage, Awards, Prelaunch, Login) | project root

**Checkpoint**: All features complete, polished, accessible, build clean

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Backend)**: Depends on Phase 1 (types needed for API routes)
- **Phase 3 (US1 Feed)**: Depends on Phase 2 (API routes needed for data)
- **Phase 4 (US2 Send)**: Depends on Phase 2 (POST API needed) + Phase 3 (KudosCard component reused)
- **Phase 5 (Page Assembly)**: Depends on Phase 3 + 4 (feed + send components needed)
- **Phase 6 (US3 Carousel)**: Depends on Phase 5 (page must exist)
- **Phase 7 (US4 Stats)**: Can run in parallel with Phase 6 (different column)
- **Phase 8 (US5 Spotlight)**: Depends on Phase 5 (page must exist), independent of Phase 6-7
- **Phase 9 (US6-8)**: Depends on all prior phases
- **Phase 10 (Polish)**: Depends on all features

### Within Each Phase

Tasks marked [P] can run in parallel. Non-[P] tasks are sequential.

### Parallel Opportunities

**Phase 1**: T003-T007 all parallel (different icon files)
**Phase 2**: T014-T023 all parallel (different API route files, after T011-T013)
**Phase 3**: T024-T028 parallel (different component files), T029 depends on T024-T028, T030 depends on T029
**Phase 6-7-8**: Can run in parallel (different sections of the page)
**Phase 10**: T048-T050 parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Phase 1 + Phase 2 → Backend ready
2. Phase 3 + Phase 4 + Phase 5 → Feed + Send = **deployable MVP**
3. **STOP and VALIDATE**: Send a kudos, verify it appears in feed, verify likes work

### Incremental Delivery

1. Phase 1-5 → MVP (Feed + Send)
2. Phase 6 → Carousel (Enhanced)
3. Phase 7 → Stats + Secret Box (Engagement)
4. Phase 8 → Spotlight (Visual wow)
5. Phase 9-10 → Polish (Production-ready)

---

## Notes

- The page uses the `(main)` route group layout — inherits auth Header ("Sun* Kudos" active) + Footer automatically
- Image uploads go client → Supabase Storage directly (bypass server for performance). API route generates signed upload URL
- Cursor-based pagination prevents duplicate posts when new items are added at the top
- The Spotlight board is the riskiest component — defer if D3 integration proves complex
- Cards use warm cream bg #FFF8E1 — very different from the dark page bg #00101A
- Badges (Rising/Legend/New/Super Hero) are per-user, not per-post
- The x2 hearts multiplier is displayed from API data — frontend just renders the value
- Reference width 1440px (same as Awards page)
- Mark tasks complete as you go: `[x]`
