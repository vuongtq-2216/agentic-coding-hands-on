# Tasks: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-CountdownPrelaunch`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset + Middleware)

**Purpose**: Download background image and enable public route access

- [ ] T001 Download background image from Figma node `2268:35129` using `get_media_file` or `get_figma_image`. Compare with existing `public/assets/homepage/keyvisual-bg.jpg` — if same artwork, reuse; if different, save to `public/assets/prelaunch/bg-image.jpg` | public/assets/prelaunch/
- [ ] T002 Add `"/prelaunch"` to `PUBLIC_ROUTES` array in middleware so the page is publicly accessible without authentication (currently line 4: `const PUBLIC_ROUTES = ["/login", "/auth/callback"]` → add `"/prelaunch"`) | src/middleware.ts

**Checkpoint**: Public route accessible, background image ready

---

## Phase 2: User Story 1 — Prelaunch Countdown Display (Priority: P1) MVP

**Goal**: Full-screen countdown page with "Sự kiện sẽ bắt đầu sau" heading and Days/Hours/Minutes

**Independent Test**: Set `NEXT_PUBLIC_SAA_EVENT_DATE` to a future date → navigate to `/prelaunch` → verify countdown shows correct values and updates every 60s

- [ ] T003 [US1] Create PrelaunchCountdown client component ("use client"): reads `NEXT_PUBLIC_SAA_EVENT_DATE` env var, parses ISO 8601, calculates remaining Days/Hours/Minutes. Updates every 60s via setInterval. Heading: "Sự kiện sẽ bắt đầu sau" (Montserrat 36px bold italic white centered). 3 units in flex-row gap-[60px] centered. Each unit: 2 digit tiles (77x123px, backdrop-blur-[25px], bg-gradient white→white/10, border 0.75px solid #FFEA9E, rounded-xl, opacity-50) + label (Montserrat 36px bold white). Digit text: Montserrat bold ~74px white tabular-nums. Stops at 00/00/00 on expiry. Falls back to 00/00/00 if env var missing/invalid. aria-live="polite". Responsive: tiles 48x77 mobile → 56x90 sm → 64x103 md → 77x123 lg, digit font 44px→54px→62px→74px, label font 20px→24px→28px→36px, heading 24px→28px→32px→36px, gap 24px→36px→48px→60px | src/components/prelaunch/PrelaunchCountdown.tsx
- [ ] T004 [US1] Create prelaunch page (Server Component): full-screen layout `w-screen h-screen bg-[#00101A] flex items-center justify-center relative overflow-hidden`. Background: Next.js `<Image>` absolute inset-0 object-cover z-0 with priority and sizes="100vw". Gradient overlay: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)` absolute inset-0 z-[1]. Content: relative z-10 renders `<PrelaunchCountdown />`. No header, no footer, no navigation | src/app/prelaunch/page.tsx

**Checkpoint**: US1 complete — Prelaunch countdown page functional at `/prelaunch`

---

## Phase 3: Polish & Cleanup

**Purpose**: Verify build, visual check, cleanup

- [ ] T005 [P] Delete old `src/components/login/LanguageSelector.tsx` if still present (was moved to `src/components/layout/LanguageSelector.tsx` during Homepage implementation). Clean up empty `login/` directory if no other files remain | src/components/login/
- [ ] T006 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Verify `/prelaunch` route compiles as dynamic page | project root
- [ ] T007 Visual verification: take screenshot at 375px (mobile), 768px (tablet), 1280px (desktop). Compare with Figma frame in `.momorph/specs/8PJQswPZmU-CountdownPrelaunch/assets/frame.png`. Verify countdown is centered, digit tiles have gold border + glass effect, heading is italic, background image visible with gradient overlay | src/app/prelaunch/page.tsx

**Checkpoint**: Page polished, build clean, visually verified

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **US1 (Phase 2)**: Depends on Phase 1 (middleware must allow `/prelaunch`, bg image must exist)
- **Polish (Phase 3)**: Depends on Phase 2 (page must exist to verify)

### Within Each Phase

- T001 and T002 can run in parallel (different files)
- T003 must complete before T004 (page imports PrelaunchCountdown)
- T005, T006, T007 are sequential

### Parallel Opportunities

**Phase 1**: T001 and T002 can run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (T001-T002)
2. Complete Phase 2 (T003-T004)
3. **STOP and VALIDATE**: Visit `/prelaunch` without auth, verify countdown works
4. Deploy if ready — this is the full MVP

### Single Session Delivery

This entire feature can be completed in one session:
1. Phase 1 + 2 + 3 → ~7 tasks total
2. Build + verify → done

---

## Notes

- The route is `/prelaunch` (not inside a route group) — URL maps directly
- PrelaunchCountdown is separate from Homepage's CountdownTimer due to different tile sizes (77x123 vs 51x82), font sizes (74px vs 49px), and label sizes (36px vs 24px)
- The gradient angle is 18deg (unique to this page — Login uses 90deg/0deg, Homepage uses 12deg)
- Background image may be reusable from `public/assets/homepage/keyvisual-bg.jpg` — compare before downloading duplicate
- Mark tasks complete as you go: `[x]`
