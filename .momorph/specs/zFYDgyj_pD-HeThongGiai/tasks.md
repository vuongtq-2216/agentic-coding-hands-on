# Tasks: Awards Information (Hệ thống giải)

**Frame**: `zFYDgyj_pD-HeThongGiai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets + Icons)

**Purpose**: Download assets and create icon components needed by award cards and sidebar

- [ ] T001 Download hero keyvisual background image for awards page from Figma (or verify if `public/assets/homepage/keyvisual-bg.jpg` is reusable — compare Figma nodes). Download ROOT FURTHER logo (338x150) if different from Homepage's. Save to `public/assets/awards/` | public/assets/awards/
- [ ] T002 [P] Create TargetIcon SVG component (24x24, currentColor stroke) — used for sidebar nav items and card titles | src/components/icons/TargetIcon.tsx
- [ ] T003 [P] Create DiamondIcon SVG component (24x24, currentColor stroke) — used for "Số lượng giải thưởng" label | src/components/icons/DiamondIcon.tsx
- [ ] T004 [P] Create LicenseIcon SVG component (24x24, currentColor stroke) — used for "Giá trị giải thưởng" label | src/components/icons/LicenseIcon.tsx

**Checkpoint**: Assets ready, icon components created

---

## Phase 2: Foundation (Data Extension)

**Purpose**: Extend award data model — BLOCKS all user story work

- [ ] T005 Extend `AwardCategory` type in `src/data/awards.ts` with new fields: `count: number`, `unit: string | null`, `prizeAmount: string`, `prizeNote: string | null`, `detailDescription: string`. Fill all 6 entries with data from Figma: Top Talent (count:10, unit:"Đơn vị", prize:"7.000.000 VNĐ", note:"cho mỗi giải thưởng", long Vietnamese description), Top Project (count:2, unit:"Tập thể", prize:"15.000.000 VNĐ", note:"cho mỗi giải thưởng"), Top Project Leader (count:3, unit:"Cá nhân", prize:"7.000.000 VNĐ", note:"cho mỗi giải thưởng"), Best Manager (count:1, unit:"Cá nhân", prize:"10.000.000 VNĐ", note:null), Signature 2025 Creator (count:1, unit:"Cá nhân", prize:"5.000.000 VNĐ", note:"cho giải cá nhân", secondPrize:"8.000.000 VNĐ", secondNote:"cho giải tập thể"), MVP (count:1, unit:null, prize:"15.000.000 VNĐ", note:null). Ensure Homepage AwardCard component is unaffected (reads only existing fields) | src/data/awards.ts

**Checkpoint**: Award data extended, Homepage still works

---

## Phase 3: User Story 1 + User Story 2 + User Story 3 — Visual + Sidebar + Anchors (Priority: P1) MVP

**Goal**: Complete awards page with visual presentation, scroll-spy sidebar, and hashtag anchor deep linking

**Independent Test (US1)**: Navigate to `/awards-information` → all sections render (hero, title, sidebar, 6 cards, Kudos, footer)

**Independent Test (US2)**: Click sidebar "Top Project" → page scrolls to Top Project section, sidebar updates active state

**Independent Test (US3)**: Navigate to `/awards-information#best-manager` → page scrolls to Best Manager, sidebar shows "Best Manager" active

### Award Card Component (US1)

- [ ] T006 [US1] Create AwardDetailCard component: two-column layout (flex-row gap-10, responsive flex-col on mobile). Left: 336x336 Next.js Image (border 0.955px solid #FFEA9E, rounded-3xl, shadow glow, mix-blend-mode screen). Right: content panel (flex-col gap-8, backdrop-blur-[32px], rounded-2xl). Content: title row (TargetIcon 24x24 + title text Montserrat 24px/32px bold gold) + description (Montserrat 16px/24px bold white, text-justify, max-w-[480px]) + separator (1px #2E3940) + count section (DiamondIcon + "Số lượng giải thưởng:" label 24px gold + count number 36px/44px white + unit 14px white) + separator + prize section (LicenseIcon + "Giá trị giải thưởng:" label 24px gold + amount 36px/44px white + note 14px white). Special case for Signature 2025: dual-prize layout with "Hoặc" separator (#2E3940 text + divider) between individual and team prizes. Accepts `AwardCategory` data as props | src/components/awards/AwardDetailCard.tsx

### Award List Component (US1)

- [ ] T007 [US1] Create AwardsDetailList component: flex-col gap-20. Maps `AWARD_CATEGORIES` from `src/data/awards.ts` → renders `AwardDetailCard` for each. Each card wrapper has `id={award.anchor}` attribute for scroll-spy targeting and anchor linking. Full-width separator (1px #2E3940, 853px) between cards | src/components/awards/AwardsDetailList.tsx

### Sidebar Component (US2 + US3)

- [ ] T008 [US2] Create AwardsSidebar client component ("use client"): w-[178px], position sticky top-[96px] (80px header + 16px gap), self-start, flex-col gap-4. Renders 6 nav items from `AWARD_CATEGORIES` data (TargetIcon 24x24 + title, Montserrat 14px/20px bold). State: `activeSectionId` (string), initialized from `window.location.hash` (after mount) or defaults to first item ("top-talent"). Intersection Observer: observes all 6 section elements by ID, rootMargin "-20% 0px -70% 0px", threshold 0 — updates `activeSectionId` when section enters viewport. Click handler: `document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' })` + set active. Active state: text #FFEA9E, border-bottom 1px solid #FFEA9E, text-shadow glow. Inactive: text white, rounded. Hover: bg white/10, 150ms transition. Keyboard: Enter key triggers scroll. `<nav aria-label="Danh mục giải thưởng">`, active item has `aria-current="true"`. Hidden on mobile (<lg) | src/components/awards/AwardsSidebar.tsx

### Page Assembly (US1 + US2 + US3)

- [ ] T009 [US1] Create awards-information page (Server Component) inside `(main)` route group — inherits auth layout with Header ("Awards Information" active) + Footer. Page structure: BackgroundLayer (absolute, keyvisual image + gradient overlay linear-gradient(0deg, #00101A -4.23%, transparent 52.79%)) + Main content (relative z-10, px-36 py-24, flex-col gap-[120px]): HeroSection (ROOT FURTHER logo 338x150 with priority Image) + TitleSection ("Sun* Annual Awards 2025" subtitle 24px white + divider 1px #2E3940 + "Hệ thống giải thưởng SAA 2025" heading 57px gold) + AwardsContent (flex-row gap-20: AwardsSidebar left + AwardsDetailList right) + KudosSection (reuse from `src/components/homepage/KudosSection.tsx`). Responsive: sidebar hidden on mobile, cards full-width | src/app/(main)/awards-information/page.tsx

**Checkpoint**: US1 + US2 + US3 complete — Awards page renders, sidebar works, anchors work

---

## Phase 4: User Story 4 — Sun* Kudos Section (Priority: P2)

**Goal**: Kudos section displays correctly with CTA navigation

**Independent Test (US4)**: Scroll past all award cards → Sun* Kudos section visible → click "Chi tiết" → navigates to `/sun-kudos`

- [ ] T010 [US4] Verify KudosSection integration on awards page: confirm the `KudosSection` component imported from Homepage renders correctly on the awards page (1152x500px, bg image + dark fallback, left content, right KUDOS logo, "Chi tiết" CTA button linking to `/sun-kudos`). No code changes expected — just verification that the shared component works in this context | src/app/(main)/awards-information/page.tsx

**Checkpoint**: US4 complete — Kudos section functional

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive verification, accessibility, build check

- [ ] T011 [P] Verify responsive design at 3 breakpoints (375px mobile, 768px tablet, 1280px desktop): sidebar hidden on mobile (<lg), award cards stack vertically (image on top + content below), title section scales (57px→36px heading), hero logo scales, proper padding (16px mobile → 144px desktop). Footer and header render correctly at all sizes | src/app/(main)/awards-information/page.tsx
- [ ] T012 [P] Accessibility audit: sidebar `<nav>` has `aria-label="Danh mục giải thưởng"`, active item has `aria-current="true"`, keyboard Tab through sidebar items → Enter activates scroll, heading hierarchy (h1 for page title, h2 for award card titles), visible focus indicators (2px solid #FFEA9E), touch targets >= 44x44px on sidebar items | src/components/awards/AwardsSidebar.tsx
- [ ] T013 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Verify `/awards-information` route compiles. Verify Homepage still works (award data extension didn't break anything) | project root

**Checkpoint**: All user stories complete, polished, build clean

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (icons needed for components)
- **US1+US2+US3 (Phase 3)**: Depends on Phase 2 (extended award data needed)
- **US4 (Phase 4)**: Depends on Phase 3 (page must exist)
- **Polish (Phase 5)**: Depends on Phase 4 (all features must be in place)

### Within Each Phase

- T002, T003, T004 can run in parallel (different icon files)
- T006 and T008 can start in parallel (different component files), but T007 depends on T006 (uses AwardDetailCard)
- T009 depends on T006, T007, T008 (page composes all components)
- T011, T012 can run in parallel (independent audits)

### Parallel Opportunities

**Phase 1**: T002 + T003 + T004 all parallel

**Phase 3**: T006 + T008 parallel (different files); T007 after T006; T009 after all

**Phase 5**: T011 + T012 parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2
2. Complete Phase 3 (US1 + US2 + US3 — Visual + Sidebar + Anchors)
3. **STOP and VALIDATE**: Visit `/awards-information`, click sidebar, test anchors from Homepage
4. Deploy if ready — this is the MVP

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 → Test → Deploy (MVP)
3. Phase 4 → Verify Kudos → Deploy (Enhanced)
4. Phase 5 → Polish → Deploy (Production-ready)

---

## Notes

- The `(main)` route group layout provides auth Header + Footer automatically — no need to render them in the page
- Award card images can be reused from `public/assets/homepage/award-*.png` — same images
- The Signature 2025 - Creator card needs special dual-prize rendering (conditional in AwardDetailCard)
- Sidebar `position: sticky` needs `align-self: flex-start` to prevent stretching to parent height
- The hero background gradient is 0deg (bottom-to-top), different from Homepage (12deg)
- Reference width is 1440px, content area is 1152px (1440 - 144*2)
- Mark tasks complete as you go: `[x]`
