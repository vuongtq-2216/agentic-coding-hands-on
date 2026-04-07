# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-HomepageSAA`
**Date**: 2026-04-06
**Spec**: `specs/i87tDx10uM-HomepageSAA/spec.md`

---

## Summary

Implement the authenticated Homepage SAA as the main landing page after login. The page features a full-bleed hero with a real-time countdown timer, event information, dual CTA buttons, a "Root Further" content section, a 6-card awards grid, a Sun\* Kudos promotional section, a floating widget button, and a shared authenticated header/footer with navigation, notifications, and user profile controls. The countdown is driven by `NEXT_PUBLIC_SAA_EVENT_DATE` env var and updates every minute client-side. Award cards link to the Awards Information page with hashtag anchors. The existing Login screen header/footer are refactored into shared layout components with auth-variant support.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: N/A (Supabase Auth manages user data; award categories are static constants)
**Testing**: To be configured (Vitest recommended)
**State Management**: Local state only (countdown, dropdown toggles); session via httpOnly cookies
**API Style**: Next.js Server Actions + Route Handlers

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — PascalCase components, camelCase functions, `@/*` path alias
- [x] Uses approved libraries and patterns — Supabase Auth, TailwindCSS, next/font, Next.js Image
- [x] Adheres to folder structure guidelines — `(main)/`, `components/`, `libs/supabase/`
- [x] Meets security requirements — httpOnly cookies, middleware auth, OWASP error handling, role check server-side
- [x] Follows testing standards — TDD planned, acceptance tests defined in spec

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Custom font files (Digital Numbers, SVN-Gotham) | Required by Figma design for countdown digits and Kudos logo text; not available on Google Fonts | Using standard Montserrat (visual mismatch) |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based. Homepage-specific components in `src/components/homepage/`, shared layout in `src/components/layout/`, shared UI in `src/components/ui/`
- **Styling Strategy**: TailwindCSS v4 utilities with design tokens as CSS variables in `globals.css`. Responsive via mobile-first Tailwind breakpoints
- **Data Fetching**: Server Component reads auth session at page level. Countdown runs client-side. Award data from typed constants. No API calls for MVP (notifications/profile deferred)
- **Server vs Client boundary**:
  - `page.tsx` = Server Component (reads auth session, reads user role from metadata, passes props)
  - `CountdownTimer.tsx` = `"use client"` (setInterval, useState, useEffect)
  - `NavLinks.tsx` = `"use client"` (active state tracking, hover)
  - `NotificationBell.tsx` = `"use client"` (dropdown toggle)
  - `UserProfileMenu.tsx` = `"use client"` (dropdown toggle, sign-out action)
  - `WidgetButton.tsx` = `"use client"` (menu toggle)
  - `LanguageSelector.tsx` = Already exists as `"use client"`

### Backend Approach

- **Sign-out**: Server Action in `src/app/(main)/actions.ts` — calls `supabase.auth.signOut()` and redirects to `/login`
- **Notifications/Profile**: Deferred to future iteration. MVP reads user metadata from Supabase Auth session server-side. Notification count hardcoded to 0
- **Middleware**: Existing `src/middleware.ts` already handles auth redirects. No changes needed — `/` is already a protected route

### Integration Points

- **Existing Services**: `src/libs/supabase/server.ts` (createServerClient), `src/libs/supabase/middleware.ts` (updateSession)
- **Shared Components**: Header and Footer refactored from Login screen into auth-aware variants. LanguageSelector, Spinner, and icon components reused
- **Reusable from Login**: SAA logo, VN flag icon, ChevronDown icon, background pattern (dark theme + gradients), font configuration

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/i87tDx10uM-HomepageSAA/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma frame screenshot
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx            # NEW: Main app layout — auth header + footer wrapper
│   │   ├── page.tsx              # NEW: Homepage SAA (Server Component)
│   │   └── actions.ts            # NEW: Server Action: signOut()
│   ├── layout.tsx                # MODIFY: Add Digital Numbers + SVN-Gotham fonts
│   └── globals.css               # MODIFY: Add homepage design tokens
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # REFACTOR: Auth-aware header (nav + controls)
│   │   ├── Footer.tsx            # REFACTOR: Auth-aware footer (nav links + active state)
│   │   ├── NavLinks.tsx          # NEW: Header nav links with selected/hover states
│   │   ├── MobileMenu.tsx        # NEW: "use client" — hamburger icon + slide-out drawer for mobile nav
│   │   ├── NotificationBell.tsx  # NEW: Bell icon with badge + dropdown placeholder
│   │   ├── UserProfileMenu.tsx   # NEW: Avatar + dropdown (Profile/Sign out/Admin)
│   │   └── LanguageSelector.tsx  # MOVED from login/ — shared language selector
│   ├── homepage/
│   │   ├── HeroSection.tsx       # Hero with ROOT FURTHER logo
│   │   ├── CountdownTimer.tsx    # "use client" — countdown to event date
│   │   ├── EventInfo.tsx         # Date/time/venue display
│   │   ├── CTAButtons.tsx        # ABOUT AWARDS + ABOUT KUDOS buttons
│   │   ├── ContentSection.tsx    # Root Further explanation text
│   │   ├── AwardsSection.tsx     # Awards header + grid
│   │   ├── AwardCard.tsx         # Individual award card
│   │   ├── KudosSection.tsx      # Sun* Kudos promotional card
│   │   └── WidgetButton.tsx      # "use client" — floating action button
│   ├── icons/
│   │   ├── ArrowRightIcon.tsx    # NEW: Arrow right for card links + CTAs
│   │   ├── NotificationIcon.tsx  # NEW: Bell icon SVG
│   │   ├── PenIcon.tsx           # NEW: Pen/edit icon for widget
│   │   └── UserIcon.tsx          # NEW: Default user profile icon
│   ├── login/
│   │   └── (LanguageSelector.tsx removed — moved to layout/)
│   └── ui/
│       └── Spinner.tsx           # EXISTS — reuse
├── data/
│   └── awards.ts                 # NEW: Award categories static data (typed constant array)
├── types/
│   └── auth.ts                   # EXISTS — may extend with user role type
└── middleware.ts                  # EXISTS — no changes needed

public/
└── assets/
    └── homepage/
        ├── saa-logo.png              # Header logo (can reuse login's)
        ├── saa-logo-footer.png       # Footer logo (69x64)
        ├── root-further-logo.png     # Can reuse from login
        ├── root-text-logo.png        # Content section "Root" text
        ├── further-text-logo.png     # Content section "Further" text
        ├── keyvisual-bg.jpg          # Background artwork (may reuse login's)
        ├── award-top-talent.jpg      # Award card images (6)
        ├── award-top-project.jpg
        ├── award-top-project-leader.jpg
        ├── award-best-manager.jpg
        ├── award-signature-creator.jpg
        ├── award-mvp.jpg
        ├── kudos-bg.jpg              # Kudos section background
        └── kudos-illustration.png    # Kudos section illustration
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Add Digital Numbers and SVN-Gotham fonts via `next/font/local` |
| `src/app/globals.css` | Add homepage-specific design tokens (section gaps, countdown, awards, kudos colors) |
| `src/app/page.tsx` | REPLACE content — convert from placeholder to redirect: unauthenticated → `/login`, authenticated → render nothing (handled by `(main)/page.tsx`). **NOTE**: Both `src/app/page.tsx` and `src/app/(main)/page.tsx` resolve to `/` in Next.js App Router, causing a conflict. Solution: DELETE `src/app/page.tsx` entirely and use `(main)/page.tsx` as the sole `/` route. The middleware already handles unauthenticated redirects. |
| `src/components/layout/Header.tsx` | Refactor to accept `variant` prop or session-based conditional rendering for nav links + controls |
| `src/components/layout/Footer.tsx` | Refactor to accept active page prop for highlighted nav link state |
| `src/app/(auth)/login/page.tsx` | Update Header/Footer imports after refactor; update LanguageSelector import from `@/components/login/LanguageSelector` to `@/components/layout/LanguageSelector` |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/ssr | ^0.8.0 | Already installed — Supabase SSR auth |
| @supabase/supabase-js | ^2.90.1 | Already installed — Supabase client |
| next | 15.5.9 | Already installed — Framework |
| tailwindcss | ^4 | Already installed — Styling |

No new npm dependencies required. Custom font files (Digital Numbers, SVN-Gotham) must be sourced and placed in `src/fonts/` or `public/fonts/`.

---

## Implementation Strategy

### Phase 0: Asset Preparation

Download all media files from Figma using `get_media_file` / `get_figma_image` tools:
- Footer logo (69x64) → `public/assets/homepage/saa-logo-footer.png`
- Root text logo → `public/assets/homepage/root-text-logo.png`
- Further text logo → `public/assets/homepage/further-text-logo.png`
- Award card images (6) → `public/assets/homepage/award-*.jpg`
- Kudos background → `public/assets/homepage/kudos-bg.jpg`
- Kudos illustration → `public/assets/homepage/kudos-illustration.png`
- Keyvisual BG → may reuse `public/assets/login/keyvisual-bg.jpg` if same image

Source custom font files:
- Digital Numbers font → `src/fonts/DigitalNumbers-Regular.ttf`
- SVN-Gotham font → `src/fonts/SVN-Gotham-Book.ttf` (or similar weight)

Create new SVG icon components:
- `ArrowRightIcon.tsx`, `NotificationIcon.tsx`, `PenIcon.tsx`, `UserIcon.tsx`

### Phase 1: Foundation (Setup + Infrastructure)

1. **Update `globals.css`** — Add homepage design tokens from design-style.md (section gaps, countdown, awards grid, Kudos, glow shadows)
2. **Update `layout.tsx`** — Add Digital Numbers + SVN-Gotham fonts via `next/font/local`
3. **Create `src/data/awards.ts`** — Typed award category data array (6 entries: id, title, description, imagePath, anchor). Uses `src/data/` directory for static data files, consistent with constitution's `services/` and `utils/` convention for non-component code
4. **Add event env vars to `.env.development`** — `NEXT_PUBLIC_SAA_EVENT_DATE` (ISO 8601, e.g., `2025-12-26T18:30:00+07:00`), `NEXT_PUBLIC_SAA_EVENT_DATE_DISPLAY` (e.g., `26/12/2025`), `NEXT_PUBLIC_SAA_EVENT_TIME` (e.g., `18h30`), `NEXT_PUBLIC_SAA_EVENT_VENUE` (e.g., `Âu Cơ Art Center`)
5. **Create new icon components** — ArrowRightIcon, NotificationIcon, PenIcon, UserIcon

### Phase 2: Layout Refactoring (Shared Components)

6. **Refactor `Header.tsx`** — Extract into auth-aware variant: public header (Login) shows logo + LanguageSelector; auth header (Homepage) shows logo + NavLinks + NotificationBell + LanguageSelector + UserProfileMenu. Use `variant` prop or render conditionally based on passed props. **NOTE**: Login uses `rgba(11,15,18,0.8)` and Homepage uses `rgba(16,20,23,0.8)` for header bg. Standardize to Homepage value `rgba(16,20,23,0.8)` (from actual Figma node data) across both screens
7. **Create `NavLinks.tsx`** — Client component with selected/hover/normal states per design-style.md. Accepts `activePath` prop
8. **Create `NotificationBell.tsx`** — Client component: bell icon + conditional badge, dropdown placeholder (panel deferred). Badge count passed as prop (0 for MVP)
9. **Create `UserProfileMenu.tsx`** — Client component: avatar/icon + dropdown with Profile/Sign out/(Admin Dashboard). Accepts `isAdmin` boolean prop. Sign-out calls server action
10. **Move `LanguageSelector.tsx`** from `login/` to `layout/` (shared)
11. **Create `MobileMenu.tsx`** — Client component: hamburger icon (visible only on mobile < md), toggles a slide-out drawer containing nav links, notification, language, and profile. Hidden on tablet+ where header shows full nav. Uses `aria-expanded`, focus trap, and Escape key to close
12. **Refactor `Footer.tsx`** — Add nav links (4 links: "About SAA 2025", "Award Information", "Sun* Kudos", "Tiêu chuẩn chung"), active page highlighting, footer logo (69x64). Accepts `activePath` prop
13. **Update Login page** — Adjust Header/Footer imports after refactoring; update LanguageSelector import path

### Phase 3: Core Features — US1 (Visual Presentation) + US2 (Countdown) + US3 (Awards) [P1 MVP]

All three P1 stories are implemented together as a vertical slice.

14. **Create `(main)/layout.tsx`** — Main app layout wrapping auth header + footer around children. Reads session server-side, passes user data (role, avatar) as props to Header components
15. **Create `(main)/actions.ts`** — Server Action `signOut()` for profile dropdown
16. **Create `CountdownTimer.tsx`** — Client component: reads `NEXT_PUBLIC_SAA_EVENT_DATE`, calculates remaining Days/Hours/Minutes, updates every 60s via setInterval. Hides "Coming soon" on expiry. Uses Digital Numbers font for digits. Each digit rendered in individual tile with backdrop-blur + gradient bg per design-style.md
17. **Create `EventInfo.tsx`** — Static component displaying event info from env vars: `NEXT_PUBLIC_SAA_EVENT_DATE_DISPLAY` ("26/12/2025"), `NEXT_PUBLIC_SAA_EVENT_TIME` ("18h30"), `NEXT_PUBLIC_SAA_EVENT_VENUE` ("Âu Cơ Art Center"). Livestream description ("Tường thuật trực tiếp qua sóng Livestream") hardcoded as constant. Labels in white 16px, values in gold 24px per design-style.md
18. **Create `CTAButtons.tsx`** — Primary "ABOUT AWARDS" + secondary "ABOUT KUDOS" with Link navigation and hover states per design-style.md. Each button includes text + ArrowRightIcon (24x24) per Figma design. Primary: bg #FFEA9E, text #00101A. Secondary: bg gold/10%, border #998C5F, text white, hover → matches primary
19. **Create `HeroSection.tsx`** — Composes ROOT FURTHER logo + CountdownTimer + EventInfo + CTAButtons within a flex-col container (1224px max-width, gap: 40px)
20. **Create `ContentSection.tsx`** — Root/Further text logos (centered) + body text. Body text is hardcoded Vietnamese content in the component (static marketing text, not user-generated). Includes centered English quote ("A tree with deep roots fears no storm") with Vietnamese subtitle. Multiple paragraphs of body text in Montserrat 24px/32px bold white, text-align: justify
21. **Create `AwardCard.tsx`** — Reusable card: image (336x336, rounded-3xl, gold border + glow shadow), title (Montserrat 24px regular gold), description (Montserrat 16px regular white, max 2 lines with ellipsis), "Chi tiết" link with ArrowRightIcon. Accepts award data as props. Link navigates to `/awards-information#<anchor>`. Hover: translateY(-4px) + enhanced glow
22. **Create `AwardsSection.tsx`** — Awards header (subtitle "Sun* annual awards 2025" + divider #2E3940 + title "Hệ thống giải thưởng" in 57px gold) + responsive grid of 6 AwardCards from `src/data/awards.ts`
23. **Create `(main)/page.tsx`** — Homepage Server Component: auth check (redirect if not authenticated), compose all sections — BackgroundLayer (keyvisual image + gradient overlay) + HeroSection + ContentSection + AwardsSection + KudosSection + WidgetButton. Apply responsive breakpoints per design-style.md
24. **Delete `src/app/page.tsx`** — This file MUST be deleted because both it and `(main)/page.tsx` resolve to `/`, causing a Next.js route conflict. The middleware already handles unauthenticated → `/login` redirect, so no root page.tsx is needed. The `(main)/page.tsx` becomes the sole handler for `/`

### Phase 4: Extended Features — US4 (Header Nav) + US5 (Kudos) + US6 (Widget) [P2/P3]

25. **Create `KudosSection.tsx`** — Promotional card: inner container 1120x500px, bg image + #0F0F0F fallback, rounded-2xl. Left: subtitle "Phong trào ghi nhận" + title "Sun* Kudos" (57px gold) + description (16px bold white, justify) + CTA button (127x56, bg gold, rounded-sm). Right: KUDOS logo (SVN-Gotham 96px #DBD1C1) + illustration (264x219). CTA navigates to `/sun-kudos`
26. **Create `WidgetButton.tsx`** — Client component: fixed bottom-6 right-[19px] z-40, pill shape (106x64, bg gold, rounded-full, gold glow shadow). Contains PenIcon + "/" text + KudosLogoIcon. Toggles quick-action menu on click, click-outside to close. Menu content is placeholder ("Coming soon")
27. **Refine header interaction states** — Ensure NavLinks selected/hover transitions, NotificationBell badge, UserProfileMenu dropdown (border: 1px solid #998C5F, radius: 4px per design-style.md) with role-based options all work correctly

### Phase 5: Polish & Cross-Cutting

28. **Responsive verification** — Verify all breakpoints (375px, 640px, 768px, 1024px, 1280px) match design-style.md responsive specs. Specifically verify: mobile hamburger menu, awards grid column count, CTA button stacking, countdown digit sizing, footer column layout
29. **Accessibility audit** — Keyboard navigation (Tab order), aria-labels on icon buttons (notification bell, profile, widget), aria-live="polite" on countdown, focus indicators on dark bg, skip-to-content link, Escape key closes all dropdowns
30. **Performance** — Lighthouse audit (target >= 85 desktop, >= 70 mobile). Hero images with `priority`, below-fold images lazy, font preloading for Digital Numbers + SVN-Gotham
31. **Code cleanup** — Run `yarn lint`, `yarn build`, remove unused code (old `src/app/page.tsx`, empty `login/` directory after LanguageSelector move), verify all imports clean

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Custom fonts (Digital Numbers, SVN-Gotham) not available | Medium | Medium | Source from free font repositories or use closest Google Font alternatives. Digital Numbers could substitute with "DS-Digital" or similar LCD font |
| Header refactoring breaks Login page | Medium | High | Test Login page after each Header change. Use component composition (props/slots) to avoid breaking existing usage |
| Large keyvisual image performance | Low | Medium | Compress to WebP/AVIF, use responsive `sizes`, set `quality={75-85}`, verify Lighthouse |
| Award card hashtag navigation to non-existent page | Low | Low | Links point to `/awards-information#anchor` — page doesn't exist yet. Use placeholder or dead link with console warning. Document as known limitation |
| Countdown timezone issues | Medium | Medium | Parse event date with timezone from ISO 8601 string. Use `new Date()` which respects timezone offset. Test across timezones |
| Mobile hamburger menu complexity | Medium | Medium | Keep drawer simple: reuse NavLinks + controls in vertical layout. Use CSS transitions for drawer animation. Focus trap via `useRef` + keyboard event listener |

### Estimated Complexity

- **Frontend**: High (many components, responsive grid, countdown logic, header refactoring, shared layout)
- **Backend**: Low (one server action for sign-out, no API endpoints for MVP)
- **Testing**: Medium (countdown timer unit tests, component rendering, responsive verification)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Header nav state → page routing, CountdownTimer → env var parsing, AwardCard → Link navigation
- [x] **External dependencies**: Supabase Auth session (middleware redirect, sign-out)
- [ ] **Data layer**: N/A — no database operations for MVP
- [x] **User workflows**: Login → Homepage → navigate to awards/kudos, Sign out flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown timer updates, nav active state, dropdown toggles, award card click navigation |
| Service ↔ Service | Yes | Middleware auth redirect, sign-out server action → session clear → redirect |
| App ↔ External API | No | Notifications/profile deferred to future |
| App ↔ Data Layer | No | Static data only |
| Cross-platform | Yes | Responsive layout at mobile/tablet/desktop, touch targets |

### Test Environment

- **Environment type**: Local (Next.js dev server + Supabase local via Docker)
- **Test data strategy**: Mock Supabase session for component tests; real session for E2E
- **Isolation approach**: Fresh browser context per E2E test; component-level mocking for unit tests

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth SDK | Mock in unit tests | Isolate component behavior from auth service |
| Next.js router | Mock in unit tests | Test navigation without full routing |
| setInterval (countdown) | Fake timers | Control time progression in tests |
| next/font/local | Skip in tests | Font loading not relevant for logic tests |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user sees all homepage sections rendered correctly
   - [ ] Countdown displays correct values and updates after 60s
   - [ ] Award card "Chi tiết" navigates to Awards Information with correct anchor
   - [ ] CTA buttons navigate to correct pages
   - [ ] Sign-out clears session and redirects to Login
   - [ ] Header nav shows "About SAA 2025" as selected

2. **Error Handling**
   - [ ] Invalid/missing `NEXT_PUBLIC_SAA_EVENT_DATE` shows "00/00/00" safely
   - [ ] Unauthenticated user on Homepage is redirected to Login
   - [ ] Sign-out failure shows error toast (OWASP-compliant message)

3. **Edge Cases**
   - [ ] Countdown reaches zero — displays "00", hides "Coming soon", stops interval
   - [ ] Award card description overflow — text truncated with ellipsis
   - [ ] Widget button double-click — single menu instance
   - [ ] Header dropdowns are mutually exclusive
   - [ ] Responsive: awards grid reflows correctly at each breakpoint

### Tooling & Framework

- **Test framework**: Vitest (to be installed)
- **Supporting tools**: @testing-library/react, MSW (for API mocking if needed)
- **CI integration**: `yarn test` in CI pipeline before merge

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| CountdownTimer logic | 90%+ | High |
| Shared Header/Footer | 80%+ | High |
| Homepage page rendering | 80%+ | High |
| Award card navigation | 85%+ | High |
| Dropdown components | 70%+ | Medium |
| Widget button | 60%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved — reviewed and complete
- [x] `design-style.md` approved — reviewed with Figma data verification
- [x] Login screen implemented (provides auth flow, shared components, design tokens)
- [x] Middleware auth configured in `src/middleware.ts`
- [ ] Custom font files sourced: Digital Numbers, SVN-Gotham
- [ ] Figma media file downloads for homepage assets
- [ ] `NEXT_PUBLIC_SAA_EVENT_DATE` env var configured

### External Dependencies

- Supabase Auth (session management, user metadata for role check)
- Figma media files (via MoMorph `get_media_file` tool)
- Custom font files (Digital Numbers, SVN-Gotham)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The `(main)` route group replaces the existing root `page.tsx`. All authenticated pages go inside `(main)/`, and the layout provides the shared auth header/footer. The `(auth)` group (login) has its own simpler layout
- The Header refactoring is the trickiest part — it must work for both Login (public variant: logo + language) and Homepage (auth variant: logo + nav + controls). Design using composition: `<Header left={...} right={...}>` or conditional props
- The Footer similarly needs variants: Login footer (copyright only) vs Auth footer (logo + nav links + copyright). Again, use composition or conditional rendering
- Award category data is hardcoded as a typed array in `src/data/awards.ts`. Each entry has: `id`, `title`, `description`, `imagePath`, `anchor`. This enables easy migration to Supabase in future
- The homepage hero can potentially reuse the same keyvisual background image from the Login screen if they're identical. Compare the Figma node IDs before downloading duplicates
- The 1512px reference width from the Figma design is wider than Login's 1440px. Use `max-w-full` with responsive inner containers (1224px for content, 1152px for content card, 1120px for Kudos) instead of a fixed page max-width
- Event info values (date, time, venue) should be configurable. Use `NEXT_PUBLIC_SAA_EVENT_*` env vars for display strings, or define as typed constants in a config file
- The notification panel and widget menu contents are out of scope for this implementation. Create the UI shells (dropdown container, menu container) but fill with placeholder content ("Coming soon" or empty state)
