# Tasks: Homepage SAA

**Frame**: `i87tDx10uM-HomepageSAA`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5, US6)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download Figma assets, source custom fonts, create icon components

- [ ] T001 Download media files from Figma using `get_media_file` / `get_figma_image` tools for all homepage assets (footer logo 69x64, root-text-logo, further-text-logo, 6 award card images, kudos-bg, kudos-illustration, keyvisual-bg if different from login) | public/assets/homepage/
- [ ] T002 Source custom font files: Digital Numbers (for countdown digits) and SVN-Gotham (for Kudos logo text). Place in `src/fonts/` directory | src/fonts/
- [ ] T003 [P] Create ArrowRightIcon SVG component (16x16, white, stroke-based right arrow) | src/components/icons/ArrowRightIcon.tsx
- [ ] T004 [P] Create NotificationIcon SVG component (24x24, white bell icon) | src/components/icons/NotificationIcon.tsx
- [ ] T005 [P] Create PenIcon SVG component (24x24, dark #00101A, pencil/edit icon) | src/components/icons/PenIcon.tsx
- [ ] T006 [P] Create UserIcon SVG component (24x24, white, default user silhouette) | src/components/icons/UserIcon.tsx

**Checkpoint**: All assets downloaded, fonts sourced, icon components ready

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Add homepage design tokens (colors: notification #D4271D, kudos-bg #0F0F0F, kudos-text #DBD1C1, glow #FAE287, secondary-btn-bg rgba(255,234,158,0.10); spacing: main-gap 120px, section-gap 80px, award-card-gap 80px, countdown-units-gap 40px; shadows: award-card glow, widget glow, nav-selected text-shadow; gradients: hero overlay 12deg, countdown tile) as CSS variables under `@theme inline` in globals.css per design-style.md | src/app/globals.css
- [ ] T008 Add Digital Numbers and SVN-Gotham fonts via `next/font/local`, expose as CSS variables `--font-digital-numbers` and `--font-svn-gotham` | src/app/layout.tsx
- [ ] T009 Create typed award category data array (6 entries: { id: string, title: string, description: string, imagePath: string, anchor: string } for Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP) | src/data/awards.ts
- [ ] T010 Add event env vars to `.env.development`: `NEXT_PUBLIC_SAA_EVENT_DATE` (ISO 8601, e.g., `2025-12-26T18:30:00+07:00`), `NEXT_PUBLIC_SAA_EVENT_DATE_DISPLAY` (`26/12/2025`), `NEXT_PUBLIC_SAA_EVENT_TIME` (`18h30`), `NEXT_PUBLIC_SAA_EVENT_VENUE` (`Âu Cơ Art Center`) | .env.development

**Checkpoint**: Foundation ready — design tokens, fonts, award data, env vars all in place

---

## Phase 3: Layout Refactoring (Shared Components)

**Purpose**: Refactor Header/Footer from Login into auth-aware shared components. BLOCKS on Phase 2.

- [ ] T011 Refactor Header component: accept children props for left/right sections. Public variant (Login): logo + LanguageSelector. Auth variant (Homepage): logo + NavLinks + controls. Standardize bg to `rgba(16,20,23,0.8)` across both screens. Add responsive: h-16 mobile → h-20 desktop, px-4 mobile → px-36 desktop | src/components/layout/Header.tsx
- [ ] T012 [P] Create NavLinks client component ("use client"): flex items-center gap-6. Three links: "About SAA 2025", "Awards Information", "Sun* Kudos". Accepts `activePath` prop. States: selected (text #FFEA9E, border-bottom 1px solid #FFEA9E, text-shadow glow), hover (bg rgba(255,234,158,0.1)), normal (text white). Montserrat 14px/20px bold. Transition 150ms ease-in-out. Hidden on mobile (<md), shown on md+ | src/components/layout/NavLinks.tsx
- [ ] T013 [P] Create NotificationBell client component ("use client"): 40x40 button with NotificationIcon. Conditional red badge (#D4271D, 8px circle, absolute top-0 right-0) when `count > 0`. Click toggles dropdown placeholder ("Coming soon"). Badge count from prop (0 for MVP). Focus: outline 2px solid white/50. Responsive: 32x32 on mobile | src/components/layout/NotificationBell.tsx
- [ ] T014 [P] Create UserProfileMenu client component ("use client"): 40x40 button with UserIcon or avatar image. Border: 1px solid #998C5F, radius 4px. Click toggles dropdown with "Profile" link, "Sign out" button (calls signOut server action), conditional "Admin Dashboard" link (shown when `isAdmin` prop is true). Dropdown: bg #101417, border #998C5F, rounded-lg, shadow. Focus: outline 2px solid white/50. Responsive: 32x32 on mobile | src/components/layout/UserProfileMenu.tsx
- [ ] T015 Move LanguageSelector from `src/components/login/` to `src/components/layout/`. No logic changes, only file location | src/components/layout/LanguageSelector.tsx
- [ ] T016 [P] Create MobileMenu client component ("use client"): hamburger icon button visible only on mobile (<md). Toggles slide-out drawer overlay with NavLinks (vertical), NotificationBell, LanguageSelector, UserProfileMenu. Uses aria-expanded, Escape key to close, click-outside to close. Drawer: bg #00101A, full height, z-50, transition transform 200ms | src/components/layout/MobileMenu.tsx
- [ ] T017 Refactor Footer component: accept `activePath` prop and `variant` ("public" | "auth"). Public (Login): centered copyright only. Auth (Homepage): flex justify-between — left: logo (69x64) + nav links (4 links: "About SAA 2025", "Award Information", "Sun* Kudos", "Tiêu chuẩn chung", gap-12), right: copyright. Active link: bg rgba(255,234,158,0.1) + text-shadow glow. Responsive: column layout on mobile, row on desktop | src/components/layout/Footer.tsx
- [ ] T018 Update Login page: adjust Header usage (pass LanguageSelector as child, no nav links), adjust Footer usage (variant="public"), update LanguageSelector import from `@/components/login/LanguageSelector` to `@/components/layout/LanguageSelector`. Verify Login page still works correctly after refactoring | src/app/(auth)/login/page.tsx

**Checkpoint**: Shared layout components ready. Login page verified working.

---

## Phase 4: User Story 1 + User Story 2 + User Story 3 — Visual Presentation + Countdown + Awards (Priority: P1) MVP

**Goal**: Complete working homepage with all visual sections, live countdown, and clickable award cards

**Independent Test (US1)**: Render page with valid session → all 7 sections visible, responsive at 375px/768px/1280px

**Independent Test (US2)**: Set event date 2 days ahead → countdown shows "02/05/30", updates after 60s

**Independent Test (US3)**: Click "Chi tiết" on Top Talent → navigates to `/awards-information#top-talent`

### App Infrastructure (US1)

- [ ] T019 [US1] Create main app layout (Server Component): read Supabase session, extract user role from `user.user_metadata.role` or `user.app_metadata.role`, render auth Header (with NavLinks, NotificationBell count=0, LanguageSelector, UserProfileMenu with isAdmin prop, MobileMenu) + children + auth Footer (variant="auth", activePath from pathname). Redirect to `/login` if no user | src/app/(main)/layout.tsx
- [ ] T020 [US1] Create signOut server action: create server Supabase client, call `supabase.auth.signOut()`, redirect to `/login` | src/app/(main)/actions.ts
- [ ] T021 [US1] Delete root page.tsx to resolve route conflict with `(main)/page.tsx`. Middleware already handles unauthenticated redirect to `/login` | src/app/page.tsx

### Hero Components (US1 + US2)

- [ ] T022 [P] [US2] Create CountdownTimer client component ("use client"): reads `NEXT_PUBLIC_SAA_EVENT_DATE` env var, parses ISO 8601, calculates remaining days/hours/minutes. Updates every 60s via setInterval. Zero-pads to 2 digits. Shows "Coming soon" text (Montserrat 24px bold white) above countdown — hidden when expired. 3 units (Days/Hours/Minutes) in flex-row gap-10. Each unit: 116x128px, flex-col gap-[14px], 2 digit tiles (51.2x81.92px, backdrop-blur-[16.64px], bg-gradient white→white/10, border 0.5px solid #FFEA9E, rounded-lg, opacity-50) with digit text (Digital Numbers ~49px white) + label (Montserrat 24px bold white). Stops at 00/00/00 on expiry. Falls back to 00/00/00 if env var missing/invalid. Responsive: smaller tiles on mobile (36x58px, 32px font) | src/components/homepage/CountdownTimer.tsx
- [ ] T023 [P] [US1] Create EventInfo component: displays configurable event info from env vars. Row layout: "Thời gian:" label (white 16px bold) + date value (gold #FFEA9E 24px bold), gap 60px. Second item: "Địa điểm:" label + venue value. Description line: "Tường thuật trực tiếp qua sóng Livestream" (white 16px bold). Width: 637px max-w-full, flex-col gap-2. Responsive: labels 14px, values 18px on mobile | src/components/homepage/EventInfo.tsx
- [ ] T024 [P] [US1] Create CTAButtons component: flex-row gap-10, width 570px max-w-full. Primary "ABOUT AWARDS" button: 276x60px, bg #FFEA9E, rounded-lg, Montserrat 22px bold #00101A, ArrowRightIcon 24x24, Link to `/awards-information`. Secondary "ABOUT KUDOS" button: same size, bg rgba(255,234,158,0.10), border 1px solid #998C5F, text white, ArrowRightIcon. Hover primary: translateY(-2px) + shadow. Hover secondary: bg → #FFEA9E, text → #00101A. Focus: outline 2px solid #FFEA9E. Responsive: flex-col on mobile, full-width buttons, 18px font | src/components/homepage/CTAButtons.tsx
- [ ] T025 [US1] Create HeroSection component: composes ROOT FURTHER logo (Image 451px, priority) + CountdownTimer + EventInfo + CTAButtons. Flex-col gap-10, width 1224px max-w-full. Responsive: logo max-w 280px mobile → 451px desktop | src/components/homepage/HeroSection.tsx

### Content Section (US1)

- [ ] T026 [US1] Create ContentSection component: width 1152px max-w-full, rounded-lg, padding 120px 104px, flex-col gap-8. Contains: centered logo group (Root text logo 189x67 + Further text logo 290x67, Images), body text (hardcoded Vietnamese marketing text, Montserrat 24px/32px bold white, text-justify), centered English quote ("A tree with deep roots fears no storm") with Vietnamese subtitle in italic/center style. Responsive: padding 40px 24px mobile, text 18px/28px mobile | src/components/homepage/ContentSection.tsx

### Awards Section (US3)

- [ ] T027 [P] [US3] Create AwardCard component: accepts `{ id, title, description, imagePath, anchor }` props. Card: flex-col gap-6, cursor-pointer. Image: 336x336 aspect-square, rounded-3xl, border 1px solid #FFEA9E, box-shadow gold glow, overflow-hidden, Next.js Image. Title: Montserrat 24px regular #FFEA9E. Description: Montserrat 16px regular white, line-clamp-2. "Chi tiết" link: Montserrat 16px medium white, flex items-center gap-1, ArrowRightIcon, Link to `/awards-information#${anchor}`. Card hover: translateY(-4px), enhanced glow shadow (0 8px 8px rgba(0,0,0,0.25), 0 0 12px #FAE287), transition 200ms ease-out. Responsive: width 100% mobile, max-w 336px centered | src/components/homepage/AwardCard.tsx
- [ ] T028 [US3] Create AwardsSection component: width 1224px max-w-full, flex-col gap-20. Header: subtitle "Sun* annual awards 2025" (Montserrat 24px bold white) + divider (1px #2E3940 full-width) + title "Hệ thống giải thưởng" (Montserrat 57px/64px bold #FFEA9E, tracking -0.25px). Grid: 3 columns desktop (repeat(3, 336px)), 2 columns md, 1 column mobile, gap-20 lg / gap-10 sm / gap-10 mobile. Renders 6 AwardCards from `src/data/awards.ts`. Responsive title: 36px mobile → 42px sm → 48px md → 57px lg | src/components/homepage/AwardsSection.tsx

### Page Assembly (US1)

- [ ] T029 [US1] Create Homepage page (Server Component): check auth session (if not authenticated, redirect to `/login`). Compose full layout — BackgroundLayer (absolute keyvisual Image with gradient overlay per design-style.md: linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, transparent 48.92%)), Main content (relative z-10, flex-col items-center gap-[120px] px-36 py-24, responsive): HeroSection + ContentSection + AwardsSection + KudosSection placeholder + WidgetButton placeholder. Apply all responsive breakpoints from design-style.md (px-4 mobile → px-36 desktop, gap-[60px] mobile → gap-[120px] desktop) | src/app/(main)/page.tsx

**Checkpoint**: US1 + US2 + US3 complete — Homepage renders with full visual design, live countdown, clickable award cards

---

## Phase 5: User Story 4 + User Story 5 + User Story 6 — Header Nav + Kudos + Widget (Priority: P2/P3)

**Goal**: Add interactive header navigation polish, Kudos promotional section, floating widget

**Independent Test (US4)**: Click profile → dropdown with "Profile"/"Sign out" appears. Click "Sign out" → redirected to Login

**Independent Test (US5)**: Kudos section visible with title, description, "Chi tiết" → navigates to `/sun-kudos`

**Independent Test (US6)**: Widget button fixed bottom-right, click → menu opens, click outside → closes

### Kudos Section (US5)

- [ ] T030 [P] [US5] Create KudosSection component: width 1224px max-w-full, height 500px, flex items-center justify-center. Inner: 1120x500px, bg image (kudos-bg.jpg) + fallback #0F0F0F, rounded-2xl, overflow-hidden, relative, flex. Left content (457px, flex-col gap-8, z-10, padding): subtitle "Phong trào ghi nhận" (24px bold white), title "Sun* Kudos" (57px/64px bold #FFEA9E), description (16px bold white, text-justify), CTA button (127x56, bg #FFEA9E, rounded, Montserrat 16px bold #00101A + ArrowRightIcon, Link to `/sun-kudos`). Right: KUDOS logo text (SVN-Gotham 96px #DBD1C1 tracking -0.13em) + illustration Image (264x219). Responsive: flex-col on mobile, left 100% width, hide illustration, title 36px | src/components/homepage/KudosSection.tsx

### Widget (US6)

- [ ] T031 [P] [US6] Create WidgetButton client component ("use client"): position fixed, bottom-6, right-[19px], z-40. Shadow: gold glow (0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287). Inner: 106x64px, bg #FFEA9E, rounded-full (pill), flex items-center gap-2 px-4. Contains PenIcon (24x24) + "/" text (Montserrat 24px bold #00101A) + SAA mini icon. Click toggles quick-action menu overlay above button ("Coming soon" placeholder). Click-outside closes. Hover: scale(1.05). Active: scale(0.98). Responsive: right-3 mobile, 80x48px | src/components/homepage/WidgetButton.tsx

### Header Polish (US4)

- [ ] T032 [US4] Refine header interaction states in page context: verify NavLinks selected/hover transitions work with router path, NotificationBell renders badge=0 correctly, UserProfileMenu dropdown opens/closes with click-outside and Escape key, sign-out action works end-to-end (clears session → redirects to Login). Verify dropdowns are mutually exclusive (opening one closes others) | src/components/layout/

### Page Update (US5 + US6)

- [ ] T033 [US5] Update Homepage page: replace KudosSection placeholder with actual KudosSection component | src/app/(main)/page.tsx
- [ ] T034 [US6] Update Homepage page: replace WidgetButton placeholder with actual WidgetButton component | src/app/(main)/page.tsx

**Checkpoint**: US4 + US5 + US6 complete — Full header interactivity, Kudos section, Widget button

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refinements affecting multiple stories

- [ ] T035 [P] Verify responsive design at 5 breakpoints (375px, 640px, 768px, 1024px, 1280px): check mobile hamburger menu, awards grid columns (1→2→3), CTA button stacking (column→row), countdown digit sizing (36px→51px tiles), footer column→row layout, header nav hidden/shown, Kudos section column→row | src/app/(main)/page.tsx
- [ ] T036 [P] Accessibility audit: keyboard navigation Tab order (header links → hero CTAs → award cards → kudos CTA → widget → footer links), aria-labels on icon buttons ("Thông báo" on bell, "Tài khoản" on profile, "Hành động nhanh" on widget), aria-live="polite" on CountdownTimer for screen reader updates, visible focus indicators (2px solid #FFEA9E/white on dark bg), Escape key closes all dropdowns/menus, skip-to-content link, touch targets >= 44x44px on mobile | src/app/(main)/page.tsx
- [ ] T037 [P] Performance audit: run Lighthouse (target >= 85 desktop, >= 70 mobile), verify hero keyvisual + ROOT FURTHER logo use `priority` loading, all below-fold images (award cards, kudos) use lazy loading, fonts loaded via next/font (no FOUT), page loads < 3s on simulated 3G | src/app/(main)/page.tsx
- [ ] T038 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Remove unused code (empty `src/components/login/` directory after LanguageSelector move, any dead imports). Verify all imports use `@/*` alias | project root

**Checkpoint**: All user stories complete, polished, and ready for merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 completion (assets + fonts + icons needed)
- **Layout Refactoring (Phase 3)**: Depends on Phase 2 (design tokens + fonts needed for components)
- **US1+US2+US3 (Phase 4)**: Depends on Phase 3 (Header/Footer refactored, layout components ready)
- **US4+US5+US6 (Phase 5)**: Depends on Phase 4 (page must exist before adding Kudos/Widget/polish)
- **Polish (Phase 6)**: Depends on Phase 5 (all features must be in place)

### Within Each Phase

- Tasks marked [P] within a phase can run in parallel
- Non-[P] tasks must run sequentially in listed order
- Layout refactoring (T011) should complete before NavLinks/NotificationBell/UserProfileMenu (T012-T014) are integrated
- Hero components (T022-T024) can be built in parallel, then composed by HeroSection (T025)
- AwardCard (T027) must complete before AwardsSection (T028)
- Page assembly (T029) depends on all component tasks in Phase 4

### Parallel Opportunities

**Phase 1**: T003, T004, T005, T006 can all run in parallel (after T001 downloads assets)

**Phase 3**: T012, T013, T014, T016 can run in parallel (different files, no shared dependencies)

**Phase 4**: T022, T023, T024, T027 can run in parallel (independent components, different files)

**Phase 5**: T030, T031 can run in parallel (independent sections)

**Phase 6**: T035, T036, T037 can all run in parallel (independent audit tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2 + Phase 3
2. Complete Phase 4 (US1 + US2 + US3 — Visual + Countdown + Awards)
3. **STOP and VALIDATE**: Test countdown, visual fidelity at 3 breakpoints, award card navigation
4. Deploy if ready — this is the MVP

### Incremental Delivery

1. Phase 1 + Phase 2 + Phase 3 → Foundation + Layout ready
2. Phase 4 (US1 + US2 + US3) → Test → Deploy (MVP)
3. Phase 5 (US4 + US5 + US6) → Test → Deploy (Enhanced)
4. Phase 6 (Polish) → Test → Deploy (Production-ready)

---

## Notes

- Commit after each task or logical group of tasks
- Run `yarn lint` before moving to next phase
- The `(main)` route group means the URL is `/`, not `/(main)/`
- Delete `src/app/page.tsx` in Phase 4 step T021 to avoid route conflict
- Server Action `signOut()` is co-located with the main layout at `src/app/(main)/actions.ts`
- LanguageSelector moves from `login/` to `layout/` — update all imports
- Header bg standardized to `rgba(16,20,23,0.8)` from Figma data (Login had `rgba(11,15,18,0.8)`)
- Award card links navigate to `/awards-information#anchor` — page doesn't exist yet, documented as known limitation
- CountdownTimer must be "use client" — it needs setInterval for live updates
- All responsive values reference design-style.md breakpoints (Mobile < 640px, sm 640-767px, md 768-1023px, lg >= 1024px)
- Digital Numbers and SVN-Gotham are custom fonts requiring `next/font/local` — source TTF/OTF files before Phase 2
- Mark tasks complete as you go: `[x]`
