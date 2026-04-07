# Implementation Plan: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-CountdownPrelaunch`
**Date**: 2026-04-06
**Spec**: `specs/8PJQswPZmU-CountdownPrelaunch/spec.md`

---

## Summary

Implement a standalone full-screen prelaunch countdown page. The page shows a full-bleed background image with gradient overlay and a centered countdown timer (Days/Hours/Minutes) with the heading "Sự kiện sẽ bắt đầu sau". No header, footer, navigation, or authentication. The countdown reuses the same `NEXT_PUBLIC_SAA_EVENT_DATE` env var as the Homepage. The page needs its own countdown component with larger digit tiles (77x123px, font ~74px) compared to the Homepage's smaller version (51x82px, font ~49px).

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4 (all already installed)
**Database**: N/A
**Testing**: Vitest (planned)
**State Management**: Local state only (countdown values)
**API Style**: None — no API calls

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — PascalCase components, camelCase functions, `@/*` path alias
- [x] Uses approved libraries and patterns — TailwindCSS, next/font, Next.js Image
- [x] Adheres to folder structure guidelines — `(prelaunch)/` route group or `prelaunch/` route
- [x] Meets security requirements — public page, no auth tokens exposed
- [x] Follows testing standards — TDD planned

**Violations**: None.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: One new page component + one new `PrelaunchCountdown` client component. The prelaunch countdown is separate from the Homepage's `CountdownTimer` because the tile sizes, font sizes, and label sizes are significantly different. Extracting a shared base would add unnecessary complexity for two simple components.
- **Styling Strategy**: TailwindCSS v4 utilities. Responsive via mobile-first breakpoints.
- **Data Fetching**: None. Env var `NEXT_PUBLIC_SAA_EVENT_DATE` read client-side.
- **Server vs Client boundary**:
  - `page.tsx` = Server Component (renders the static layout shell)
  - `PrelaunchCountdown.tsx` = `"use client"` (setInterval for live countdown)

### Backend Approach

None. No API calls. No auth.

### Integration Points

- **Middleware**: Add `/prelaunch` to `PUBLIC_ROUTES` array in `src/middleware.ts`
- **Env var**: Reuses existing `NEXT_PUBLIC_SAA_EVENT_DATE` from `.env.development`
- **Background image**: Download from Figma node `2268:35129` or reuse existing keyvisual

---

## Project Structure

### Source Code (affected areas)

```text
src/
├── app/
│   └── prelaunch/
│       └── page.tsx              # NEW: Prelaunch page (Server Component shell)
├── components/
│   └── prelaunch/
│       └── PrelaunchCountdown.tsx # NEW: "use client" — large countdown timer
└── middleware.ts                  # MODIFY: Add "/prelaunch" to PUBLIC_ROUTES

public/
└── assets/
    └── prelaunch/
        └── bg-image.jpg          # NEW: Background image (or symlink to existing keyvisual)
```

### Modified Files

| File | Changes |
|------|---------|
| `src/middleware.ts` | Add `"/prelaunch"` to `PUBLIC_ROUTES` array (line 4) |

### Dependencies

No new npm dependencies. All required packages already installed.

---

## Implementation Strategy

### Phase 0: Asset Preparation

1. **Download background image** from Figma node `2268:35129` using `get_media_file` or `get_figma_image`. Compare with existing `public/assets/homepage/keyvisual-bg.jpg` — if identical, reuse; if different, save to `public/assets/prelaunch/bg-image.jpg`.

### Phase 1: Foundation

2. **Update middleware** — Add `"/prelaunch"` to `PUBLIC_ROUTES` in `src/middleware.ts` so the page is publicly accessible without authentication.

### Phase 2: Core Features — US1 (Prelaunch Countdown) [P1 MVP]

3. **Create `PrelaunchCountdown.tsx`** — `"use client"` component with larger tile styling:
   - Reads `NEXT_PUBLIC_SAA_EVENT_DATE`, calculates Days/Hours/Minutes
   - Updates every 60s via setInterval, stops at zero
   - Heading: "Sự kiện sẽ bắt đầu sau" (Montserrat 36px bold italic white centered)
   - 3 units in flex-row gap-[60px]: Days, Hours, Minutes
   - Each unit: 2 digit tiles (77x123px, backdrop-blur-[25px], gradient bg, border 0.75px solid #FFEA9E, rounded-xl, opacity-50) + label (Montserrat 36px bold white)
   - Digit text: Montserrat bold ~74px white (tabular-nums fallback for Digital Numbers font)
   - Responsive: tiles scale down on mobile (48x77 → 56x90 → 64x103 → 77x123)
   - Falls back to "00/00/00" if env var missing/invalid
   - `aria-live="polite"` for screen reader updates

4. **Create `prelaunch/page.tsx`** — Server Component shell:
   - Full-screen layout: `w-screen h-screen bg-[#00101A] flex items-center justify-center relative overflow-hidden`
   - Background: `<Image>` absolute inset-0, object-cover, z-0, priority
   - Gradient overlay: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`
   - Content: relative z-10, renders `<PrelaunchCountdown />`
   - No header, no footer, no navigation

5. **Cleanup** — Delete `src/components/login/LanguageSelector.tsx` if still present (was moved to `layout/` during Homepage implementation). Verify the `login/` directory is clean.

### Phase 3: Polish

6. **Verify build** — `yarn lint` + `yarn build` with zero errors
7. **Visual verification** — Screenshot at 375px, 768px, 1280px, compare with Figma frame

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Background image too large | Low | Medium | Download at 1x scale, quality 75 via Next.js Image |
| Digital Numbers font unavailable | Already known | Low | Use Montserrat bold with tabular-nums — close visual match |

### Estimated Complexity

- **Frontend**: Low (1 page, 1 component, 1 middleware line)
- **Backend**: None
- **Testing**: Low (countdown logic can be tested with fake timers)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: PrelaunchCountdown → env var parsing → display update
- [ ] **External dependencies**: None
- [ ] **Data layer**: N/A
- [x] **User workflows**: Visit /prelaunch → see countdown → verify updates

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| setInterval | Fake timers | Control time progression |
| NEXT_PUBLIC_SAA_EVENT_DATE | Mock env | Test various date scenarios |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| PrelaunchCountdown logic | 90%+ | High |
| Page rendering | 70%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved
- [x] `design-style.md` approved
- [x] `NEXT_PUBLIC_SAA_EVENT_DATE` configured in `.env.development`
- [ ] Background image downloaded from Figma

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Begin** implementation (very small scope — can complete in one session)

---

## Notes

- This is a ~30 minute implementation. Only 2 new files + 1 line middleware change.
- The `PrelaunchCountdown` is intentionally separate from the Homepage's `CountdownTimer` — different tile sizes (77x123 vs 51x82), font sizes (74px vs 49px), label sizes (36px vs 24px), and unique heading. Extracting a shared abstraction would overcomplicate two simple components.
- The prelaunch page uses `src/app/prelaunch/page.tsx` (NOT inside a route group) so the URL is literally `/prelaunch`. This is simpler than `(prelaunch)` and the explicit path makes middleware exclusion clear.
- The gradient angle (18deg) is unique to this page — different from Login (90deg) and Homepage (12deg).
