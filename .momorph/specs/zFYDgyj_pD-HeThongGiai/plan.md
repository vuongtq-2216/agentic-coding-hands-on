# Implementation Plan: Awards Information (Hệ thống giải)

**Frame**: `zFYDgyj_pD-HeThongGiai`
**Date**: 2026-04-07
**Spec**: `specs/zFYDgyj_pD-HeThongGiai/spec.md`

---

## Summary

Implement the Awards Information detail page (`/awards-information`) showing all 6 SAA 2025 award categories with detailed descriptions, prize counts, and prize values. Features a sticky left sidebar navigation with Intersection Observer scroll-spy, hashtag anchor deep linking from Homepage, and a shared Kudos promotional section. The page reuses the existing `(main)` route group layout (auth header/footer), `KudosSection` component, and extends the award data in `src/data/awards.ts` with detail fields.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr (all already installed)
**Database**: N/A (static content from typed constants)
**Testing**: Vitest (planned)
**State Management**: Local state only (`activeSectionId` in sidebar client component)
**API Style**: None — no API calls for MVP

---

## Constitution Compliance Check

- [x] Follows project coding conventions — PascalCase components, camelCase functions, `@/*` path alias
- [x] Uses approved libraries and patterns — TailwindCSS, Next.js Image, next/font
- [x] Adheres to folder structure guidelines — `(main)/awards-information/`, `components/awards/`
- [x] Meets security requirements — auth via middleware, no secrets exposed
- [x] Follows testing standards — TDD planned

**Violations**: None.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based. Awards-specific components in `src/components/awards/`, reusing shared layout from `(main)/layout.tsx` and `KudosSection` from `src/components/homepage/`
- **Styling Strategy**: TailwindCSS v4 utilities with existing design tokens. Reference width is 1440px (not 1512px like Homepage — use responsive inner containers)
- **Data Source**: Extend existing `src/data/awards.ts` with detail fields (`count`, `unit`, `prizeAmount`, `prizeNote`, `detailDescription`). Single source of truth for both Homepage cards and Awards detail page
- **Server vs Client boundary**:
  - `page.tsx` = Server Component (renders static layout, passes data to components)
  - `AwardsSidebar.tsx` = `"use client"` (Intersection Observer scroll-spy, click-to-scroll, URL hash reading)
  - All other components = Server Components (static display)

### Integration Points

- **Existing Layout**: `src/app/(main)/layout.tsx` already provides auth check + Header + Footer. The page automatically gets "Awards Information" active state via `usePathname()` in NavLinks
- **Reusable Components**: `KudosSection` from Homepage (move to `src/components/shared/` or import from `homepage/`)
- **Shared Data**: `src/data/awards.ts` — extend type + data, Homepage AwardCard remains unaffected (new fields are optional)
- **Award Images**: Reuse from `public/assets/homepage/award-*.png` (same images)

---

## Project Structure

### Source Code (affected areas)

```text
src/
├── app/
│   └── (main)/
│       └── awards-information/
│           └── page.tsx              # NEW: Awards page (Server Component)
├── components/
│   └── awards/
│       ├── AwardsSidebar.tsx         # NEW: "use client" — sticky sidebar with scroll-spy
│       ├── AwardDetailCard.tsx       # NEW: Single award detail card (image + content + meta)
│       └── AwardsDetailList.tsx      # NEW: Renders all 6 AwardDetailCards with section IDs
├── data/
│   └── awards.ts                     # MODIFY: Extend type + data with detail fields
└── components/
    └── icons/
        ├── TargetIcon.tsx            # NEW: Target icon for sidebar items
        ├── DiamondIcon.tsx           # NEW: Diamond icon for prize count label
        └── LicenseIcon.tsx           # NEW: License icon for prize value label
```

### Modified Files

| File | Changes |
|------|---------|
| `src/data/awards.ts` | Extend `AwardCategory` type with `count`, `unit`, `prizeAmount`, `prizeNote`, `detailDescription`. Add values for all 6 entries. Homepage components use same data but only read existing fields. |

### New Files

| File | Purpose |
|------|---------|
| `src/app/(main)/awards-information/page.tsx` | Awards page Server Component — hero, title, sidebar + cards layout, Kudos |
| `src/components/awards/AwardsSidebar.tsx` | `"use client"` — sticky sidebar nav, Intersection Observer scroll-spy, URL hash handling |
| `src/components/awards/AwardDetailCard.tsx` | Single award detail card: image + title + description + count meta + prize meta |
| `src/components/awards/AwardsDetailList.tsx` | Renders 6 AwardDetailCards from data, assigns section IDs for scroll-spy |
| `src/components/icons/TargetIcon.tsx` | Target icon SVG component (24x24) for sidebar items + card titles |
| `src/components/icons/DiamondIcon.tsx` | Diamond icon SVG component (24x24) for "Số lượng giải thưởng" label |
| `src/components/icons/LicenseIcon.tsx` | License icon SVG component (24x24) for "Giá trị giải thưởng" label |

### Dependencies

No new npm dependencies. All required packages already installed.

---

## Implementation Strategy

### Phase 0: Asset Preparation

1. **Download hero keyvisual** for awards page from Figma node `2167:5138` (or verify if Homepage's `keyvisual-bg.jpg` is reusable). Download ROOT FURTHER logo (338x150) from node `2789:12915` (or reuse Homepage's)
2. **Create 3 new icon components**: TargetIcon (sidebar + card titles), DiamondIcon (prize count), LicenseIcon (prize value) — from Figma media items

### Phase 1: Foundation

3. **Extend `src/data/awards.ts`** — Add fields to `AwardCategory` type: `count: number`, `unit: string | null`, `prizeAmount: string`, `prizeNote: string | null`, `detailDescription: string` (longer description for the detail page; the existing `description` field remains for Homepage card summaries). Fill in all 6 entries with full Vietnamese descriptions from Figma design items. Existing Homepage components are unaffected since they only read `id`, `title`, `description`, `imagePath`, `anchor`

### Phase 2: Core Features — US1 (Visual Presentation) + US2 (Sidebar) + US3 (Anchors) [P1 MVP]

All three P1 stories implemented together as a vertical slice.

4. **Create `AwardDetailCard.tsx`** — Server Component: two-column layout (flex-row gap-10). Left: 336x336 image (gold border, rounded-3xl, glow shadow). Right: content panel (flex-col gap-8, backdrop-blur-[32px], rounded-2xl). Content: title (24px gold + TargetIcon) + description (16px white justified, 480px) + separator + count section (DiamondIcon + "Số lượng giải thưởng:" label 24px gold + number 36px white + unit 14px white) + separator + prize section (LicenseIcon + "Giá trị giải thưởng:" label 24px gold + amount 36px white + note 14px white). Special case: Signature 2025 has dual-prize layout with "Hoặc" separator. Responsive: stacks vertically on mobile

5. **Create `AwardsDetailList.tsx`** — Server Component: flex-col gap-20. Maps `AWARD_CATEGORIES` → `AwardDetailCard` for each. Each card wrapper has `id={award.anchor}` for scroll-spy and anchor linking. Full-width separators (1px #2E3940) between cards

6. **Create `AwardsSidebar.tsx`** — `"use client"` component:
   - Renders 6 nav items from `AWARD_CATEGORIES` with TargetIcon + title
   - `activeSectionId` state, initialized from `window.location.hash` or first item
   - Intersection Observer watching all 6 section elements (by ID), with `rootMargin: "-20% 0px -70% 0px"` and `threshold: 0`
   - Click handler: `scrollIntoView({ behavior: 'smooth' })` + set active
   - Active state: gold text + bottom border + text-shadow glow
   - Inactive state: white text, rounded-sm
   - Hover state: bg white/10, 150ms transition
   - CSS `position: sticky; top: 96px` (header height 80px + 16px gap)
   - aria-label, aria-current, keyboard navigation (Enter to scroll)
   - Hidden on mobile (<lg) — TODO: horizontal scroll tabs or dropdown alternative

7. **Create `awards-information/page.tsx`** — Server Component inside `(main)` route group (inherits auth layout):
   - Hero: background image (absolute, gradient overlay 0deg bottom-to-top) + ROOT FURTHER logo (338x150)
   - Title section: "Sun* Annual Awards 2025" subtitle + divider + "Hệ thống giải thưởng SAA 2025" gold heading
   - Main content: flex-row gap-20 — AwardsSidebar (sticky left, 178px) + AwardsDetailList (right, flex-1)
   - KudosSection (reuse from homepage)
   - Responsive: sidebar hidden on mobile, cards full-width

### Phase 3: Extended Features — US4 (Kudos)

8. **Integrate `KudosSection`** — Import from `src/components/homepage/KudosSection.tsx` (reuse as-is). No changes needed to the component.

### Phase 4: Polish

9. **Responsive verification** — Verify at 375px, 768px, 1280px. Mobile: sidebar hidden, cards stack vertically (image on top). Tablet: narrower layout. Desktop: full two-column
10. **Accessibility audit** — Keyboard nav on sidebar items, aria-current, heading hierarchy, focus indicators
11. **Build verification** — `yarn lint` + `yarn build` with zero errors

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Intersection Observer rootMargin tuning | Medium | Low | Start with `-20% 0px -70% 0px`, adjust based on visual testing |
| Award data extension breaking Homepage cards | Low | Medium | New fields are additive — existing components only read existing fields. Type extension uses optional fields or adds to all entries |
| Hero image different from Homepage | Low | Low | Compare Figma nodes; if same, reuse from homepage assets |
| Sidebar sticky overlap with Kudos/Footer | Medium | Medium | Use `self-start` on sidebar and ensure parent container doesn't extend past card list |

### Estimated Complexity

- **Frontend**: Medium (sidebar scroll-spy is the main complexity; rest is static layout)
- **Backend**: None
- **Testing**: Low-Medium (Intersection Observer mocking needed for scroll-spy unit tests)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Sidebar click → scroll to section, scroll-spy → active state update
- [x] **URL anchor**: Hash fragment → initial scroll + active state
- [ ] **External dependencies**: None (static content)
- [x] **User workflows**: Homepage card click → arrive at awards page with correct anchor → sidebar reflects active

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Intersection Observer | Mock in unit tests | Not available in test environment |
| window.location.hash | Mock/set in tests | Control anchor scenarios |
| scrollIntoView | Mock | Verify called with correct arguments |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| AwardsSidebar scroll-spy logic | 90%+ | High |
| AwardDetailCard rendering | 80%+ | High |
| Page composition | 70%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved and reviewed
- [x] `design-style.md` approved and reviewed
- [x] Homepage implemented (provides layout, KudosSection, awards data, images)
- [x] `(main)/layout.tsx` provides auth Header + Footer
- [ ] Hero keyvisual and logo assets verified (reuse from Homepage or download new)
- [ ] New icon components (Target, Diamond, License) created from Figma media

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Begin** implementation

---

## Notes

- The `(main)` route group layout already handles authentication, Header (with NavLinks that auto-detect active path via `usePathname()`), and Footer. The awards page just needs to be `src/app/(main)/awards-information/page.tsx` and it inherits all of that automatically.
- The hero keyvisual on this page (1440x547px) is shorter than the Homepage's (1512x1392px). The gradient is also different (0deg bottom-to-top vs 12deg). Use a separate background section, not the homepage's.
- The ROOT FURTHER logo is smaller here (338x150px vs Homepage's 451x200px). May reuse the same image file but render at different dimensions.
- The sidebar `position: sticky` with `top: 96px` accounts for the 80px header + 16px breathing room. Must also have `self-start` (or `align-self: flex-start`) to prevent stretching to parent height.
- The card text panel uses `backdrop-filter: blur(32px)` — this creates a glass/frosted effect over the dark background. Verify it works on all target browsers (Safari may need `-webkit-backdrop-filter`).
- The Signature 2025 - Creator card has a unique dual-prize layout: "5.000.000 VNĐ (cho giải cá nhân)" + "Hoặc" separator + "8.000.000 VNĐ (cho giải tập thể)". The `AwardDetailCard` component needs conditional rendering for this case.
- Reference width is 1440px (not 1512px). The content area is 1152px (1440 - 144*2 padding). This matches the inner content width pattern used elsewhere.
