# Feature Specification: Countdown - Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-06
**Status**: Draft

---

## Overview

The Countdown - Prelaunch page is a standalone teaser/holding page displayed before the SAA 2025 platform officially launches. It shows a full-screen dark-themed background with the SAA keyvisual artwork and a centered countdown timer counting down to the event start date. The page has no header, no footer, no navigation — just the countdown.

**Launch gate**: The platform launch state is controlled by `NEXT_PUBLIC_IS_LAUNCHED` environment variable:
- When `NEXT_PUBLIC_IS_LAUNCHED=false` (pre-launch): ALL routes (`/`, `/login`, etc.) redirect to `/prelaunch`. Only `/prelaunch` is accessible.
- When `NEXT_PUBLIC_IS_LAUNCHED=true` (post-launch): `/prelaunch` redirects to `/login`. Normal auth flow resumes (Login → Homepage).

This gate logic lives in `src/middleware.ts` and is evaluated on every request. To launch the platform, simply change `NEXT_PUBLIC_IS_LAUNCHED=true` in the environment and redeploy.

The countdown timer reads the event date from the `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable and displays remaining Days, Hours, and Minutes with zero-padded two-digit displays in a digital number font. The heading text is "Sự kiện sẽ bắt đầu sau" (Vietnamese for "The event will start in").

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Prelaunch Countdown Display (Priority: P1)

As a visitor to the SAA 2025 platform before launch, I want to see a visually striking countdown page so that I know when the event will begin and feel the anticipation.

**Why this priority**: This is the sole purpose of the page — the entire screen is the countdown. Without it, there is no prelaunch experience.

**Independent Test**: Set `NEXT_PUBLIC_SAA_EVENT_DATE` to a future date. Navigate to the prelaunch URL. Verify the countdown displays correct Days/Hours/Minutes with the heading "Sự kiện sẽ bắt đầu sau". Advance the clock by 1 minute and verify the minutes value decrements.

**Acceptance Scenarios**:

1. **Given** `NEXT_PUBLIC_SAA_EVENT_DATE` is set to a future date, **When** the prelaunch page loads, **Then** the heading "Sự kiện sẽ bắt đầu sau" is displayed centered above a countdown timer showing Days, Hours, and Minutes with zero-padding.
2. **Given** the countdown is displayed, **When** one minute elapses, **Then** the minutes value decrements by 1 without a page reload (client-side interval).
3. **Given** the countdown reaches zero, **When** the timer evaluates, **Then** all fields display "00" / "00" / "00" and the interval stops.
4. **Given** `NEXT_PUBLIC_SAA_EVENT_DATE` is not set or invalid, **When** the page loads, **Then** the countdown displays "00" / "00" / "00" as a safe fallback.
5. **Given** the page loads, **When** the user views the background, **Then** a full-bleed keyvisual artwork image with gradient overlay creates a dark atmospheric scene behind the countdown.
6. **Given** the page is viewed at different screen sizes, **When** the viewport changes, **Then** the countdown remains centered and digit tiles scale responsively.
7. **Given** `NEXT_PUBLIC_IS_LAUNCHED=false`, **When** a visitor navigates to `/` or `/login` or any other route, **Then** they are redirected to `/prelaunch`.
8. **Given** `NEXT_PUBLIC_IS_LAUNCHED=true`, **When** a visitor navigates to `/prelaunch`, **Then** they are redirected to `/login`.
9. **Given** `NEXT_PUBLIC_IS_LAUNCHED=false`, **When** a visitor navigates directly to `/prelaunch`, **Then** the page renders normally without redirect loops.

---

### Edge Cases

- **Countdown reaches zero**: All fields show "00", interval clears. No client-side redirect — to launch the platform, change `NEXT_PUBLIC_IS_LAUNCHED=true` and redeploy. Middleware will then redirect `/prelaunch` → `/login`.
- **Invalid date**: Falls back to "00/00/00" without crashing.
- **Background image fails to load**: Dark fallback background (#00101A) ensures text remains readable.
- **Very small viewport**: Countdown tiles shrink proportionally, maintaining readability.
- **`NEXT_PUBLIC_IS_LAUNCHED` not set**: Treated as `false` (pre-launch mode). All routes redirect to `/prelaunch`.
- **Auth callback during pre-launch**: `/auth/callback` also redirects to `/prelaunch` — OAuth flow is blocked during pre-launch.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| BG | Background Image | Full-bleed keyvisual artwork (same as Login/Homepage) | Static, behind all content |
| Gradient | Gradient Overlay | linear-gradient(18deg, ...) overlay for text readability | Static overlay |
| Title | Heading Text | "Sự kiện sẽ bắt đầu sau" — Montserrat 36px bold italic white, centered | Static display |
| Timer | Countdown Timer | 3 units (Days/Hours/Minutes) with 2 digit tiles each | Updates every 60 seconds client-side |
| 1 | Days Unit | Two digit tiles + "DAYS" label | Auto-updates |
| 2 | Hours Unit | Two digit tiles + "HOURS" label | Auto-updates |
| 3 | Minutes Unit | Two digit tiles + "MINUTES" label | Auto-updates |

### Navigation Flow

- **From**: Direct URL entry (public, no auth required)
- **To**: No navigation from this page. External redirect to Login when platform launches.
- **No header, no footer, no links** — this is a standalone holding page.

### Visual Requirements

- **Responsive breakpoints**: Mobile-first per constitution TailwindCSS defaults
- **Animations/Transitions**: No explicit animations beyond countdown value changes (instant update)
- **Accessibility**: WCAG AA contrast (white on dark), aria-live="polite" on countdown for screen readers, semantic HTML

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST display a full-viewport centered countdown timer with heading "Sự kiện sẽ bắt đầu sau".
- **FR-002**: Countdown MUST display remaining Days, Hours, and Minutes until `NEXT_PUBLIC_SAA_EVENT_DATE`, zero-padded to 2 digits.
- **FR-003**: Countdown MUST update every 60 seconds on the client side without page reload.
- **FR-004**: Countdown MUST display "00" for all fields and stop when the event date has passed or env var is missing/invalid.
- **FR-005**: Page MUST NOT require authentication — it is publicly accessible.
- **FR-006**: Page MUST display a full-bleed background image with gradient overlay per design-style.md.
- **FR-007**: Page MUST have NO header, footer, or navigation elements.
- **FR-008**: When `NEXT_PUBLIC_IS_LAUNCHED=false`, middleware MUST redirect ALL non-prelaunch routes to `/prelaunch`.
- **FR-009**: When `NEXT_PUBLIC_IS_LAUNCHED=true`, middleware MUST redirect `/prelaunch` to `/login` and resume normal auth flow.
- **FR-010**: When `NEXT_PUBLIC_IS_LAUNCHED` is not set, the system MUST default to pre-launch mode (same as `false`).

### Technical Requirements

- **TR-001**: Page route: `src/app/(prelaunch)/page.tsx` or `src/app/prelaunch/page.tsx` — must be a public route excluded from middleware auth redirect.
- **TR-002**: The countdown MUST be a `"use client"` component (requires setInterval, useState, useEffect).
- **TR-003**: Event date MUST be configured via `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable (ISO 8601 format).
- **TR-004**: Background image MUST use Next.js `<Image>` with `priority` and responsive `sizes="100vw"`.
- **TR-005**: The page MUST be compatible with Cloudflare Workers edge runtime.
- **TR-006**: Middleware `src/middleware.ts` MUST be updated to exclude the prelaunch route from auth redirect (add to PUBLIC_ROUTES array).

### Key Entities

- **Event Configuration**: Event date from `NEXT_PUBLIC_SAA_EVENT_DATE` env var (shared with Homepage countdown).
- **Launch Gate**: `NEXT_PUBLIC_IS_LAUNCHED` env var (`"true"` = launched, anything else = pre-launch). Controls middleware routing for the entire platform.

---

## State Management

### Local State (CountdownTimer — `"use client"` component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| days | string | "00" | Zero-padded days remaining |
| hours | string | "00" | Zero-padded hours remaining |
| minutes | string | "00" | Zero-padded minutes remaining |
| expired | boolean | false | Whether countdown has reached zero |

### Global State

No global state. No authentication. No session.

---

## API Dependencies

None. This page has no API calls. All data comes from the environment variable.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The countdown displays correct remaining time (within 1-minute accuracy) relative to `NEXT_PUBLIC_SAA_EVENT_DATE`.
- **SC-002**: All visual elements match the Figma design with < 5% pixel deviation at desktop (1512px).
- **SC-003**: The page loads within 2 seconds on a 3G connection (optimized background image).
- **SC-004**: The page is fully responsive and centered at mobile (375px), tablet (768px), and desktop (1280px).

---

## Out of Scope

- Authentication or session management (page is public)
- Header, footer, or navigation
- Redirect logic when countdown reaches zero (handled externally)
- Language selector or i18n

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen implemented (provides middleware pattern and shared assets)
- [x] `NEXT_PUBLIC_SAA_EVENT_DATE` already configured in `.env.development`
- [ ] Prelaunch route added to middleware PUBLIC_ROUTES
- [ ] Background image asset (can reuse homepage/login keyvisual or download specific one)

---

## Notes

- This page can potentially reuse the `CountdownTimer` component from the Homepage with minor styling adjustments (larger tiles: 77x123px vs 51x82px, larger font: ~74px vs ~49px, larger labels: 36px vs 24px).
- The background image may be the same keyvisual used on Login/Homepage or a different crop. Check Figma node `2268:35129` vs Login's `662:14389` and Homepage's `2167:9028`.
- The prelaunch route should be the app's initial landing page before launch. After launch, redirect `/prelaunch` to `/login` or `/`.
- The gradient overlay angle is 18deg (different from Homepage's 12deg and Login's 90deg/0deg).
- Digit tiles are larger on this page (77x123px) compared to the Homepage countdown (51x82px). The Digital Numbers font is also larger (~74px vs ~49px). Consider making the existing CountdownTimer accept size props or create a separate PrelaunchCountdown component.
- Refer to `design-style.md` for all visual specifications.
