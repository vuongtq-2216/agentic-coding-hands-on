# Feature Specification: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-06
**Status**: Draft

---

## Overview

The Homepage SAA is the authenticated landing page of the SAA 2025 (Sun Annual Awards) platform. After a successful Google OAuth login, users are redirected here. The screen uses a dark theme consistent with the Login screen and presents the full SAA 2025 event experience through a series of vertically stacked sections: a sticky navigation header with user controls, a full-bleed hero/keyvisual section with countdown timer and dual CTAs, a "Root Further" content explanation area, a 6-card awards grid showcasing the award categories, a Sun* Kudos promotional section, and a site-wide footer. A floating widget button provides persistent quick-action access from any scroll position.

The countdown timer is the primary dynamic element, counting down to the event date configured via the `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable. It updates every minute, displaying zero-padded Days, Hours, and Minutes. All other content is statically rendered at build time or sourced from environment configuration. The page requires authentication; unauthenticated users are redirected to the Login screen by middleware.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homepage Visual Presentation & Navigation (Priority: P1)

As an authenticated user redirected from the Login screen, I want to see a visually compelling homepage with clear event branding, navigation, and content sections so that I can understand the SAA 2025 platform and navigate to relevant areas.

**Why this priority**: This is the first screen all authenticated users see. Visual fidelity, correct section rendering, and functional navigation are the core value of this page.

**Independent Test**: Render the page with a valid Supabase session. Verify all visual sections (header, hero, content, awards, kudos, footer, widget) are present, correctly positioned, and match the Figma design at desktop (1440px), tablet (768px), and mobile (375px) viewports.

**Acceptance Scenarios**:

1. **Given** an authenticated user navigates to the Homepage, **When** the page renders, **Then** all seven major sections are visible: sticky header (A1), hero/keyvisual (3.5), content section (B4), awards section (C1+C2), Sun* Kudos section (D1), floating widget button (6), and footer (7).
2. **Given** the page has rendered at desktop (>= 1280px), **When** the user views the awards section, **Then** 6 award cards are displayed in a 3-column, 2-row grid layout.
3. **Given** the page has rendered at tablet (768px), **When** the user views the awards section, **Then** the award cards reflow to a 2-column grid layout.
4. **Given** the page has rendered at mobile (< 640px), **When** the user views the awards section, **Then** the award cards stack into a single-column layout.
5. **Given** the page has rendered, **When** the user scrolls down the page, **Then** the header remains sticky at the top of the viewport.
6. **Given** an unauthenticated user attempts to access the Homepage URL directly, **When** middleware evaluates the request, **Then** the user is redirected to the Login screen.

---

### User Story 2 - Countdown Timer (Priority: P1)

As an authenticated user viewing the homepage, I want to see a live countdown to the SAA 2025 event so that I know how much time remains before the awards ceremony.

**Why this priority**: The countdown is the primary dynamic element of the hero section and drives urgency for event participation. It is integral to the hero layout.

**Independent Test**: Set `NEXT_PUBLIC_SAA_EVENT_DATE` to a date 2 days, 5 hours, and 30 minutes in the future. Render the countdown component. Verify it displays "02" / "05" / "30" for Days / Hours / Minutes. Advance the clock by 1 minute and verify the display updates to "02" / "05" / "29".

**Acceptance Scenarios**:

1. **Given** `NEXT_PUBLIC_SAA_EVENT_DATE` is set to a future date, **When** the homepage renders, **Then** the countdown displays the correct remaining Days, Hours, and Minutes with zero-padding (e.g., "02", "05", "30").
2. **Given** the countdown is displayed, **When** one minute elapses, **Then** the minutes value decrements by 1 without a full page reload (client-side interval).
3. **Given** `NEXT_PUBLIC_SAA_EVENT_DATE` is set to a future date, **When** the remaining time is less than 1 day, **Then** the Days field displays "00" and the Hours and Minutes continue counting down normally.
4. **Given** the countdown reaches zero (event date has passed), **When** the timer evaluates, **Then** all fields display "00" / "00" / "00" and the timer interval stops (no negative values).
5. **Given** `NEXT_PUBLIC_SAA_EVENT_DATE` is not set or is invalid, **When** the component renders, **Then** the countdown section displays "00" / "00" / "00" as a safe fallback.
6. **Given** the countdown is active, **When** the user views the digits, **Then** each digit uses a distinct "digital numbers" font style distinguishing it from body text.

---

### User Story 3 - Awards Section Interaction (Priority: P1)

As an authenticated user browsing the homepage, I want to see the 6 award categories and click on any card to learn more about that specific award so that I can understand what awards are available and how to participate.

**Why this priority**: The awards grid is the primary content section driving users to the Awards Information page, which is a core platform feature.

**Independent Test**: Render the awards section with 6 cards. Verify each card displays its image, title, description, and "Chi tiet" link. Click "Chi tiet" on the "Top Talent" card and verify navigation to the Awards Information page with the correct hashtag anchor (e.g., `/awards-information#top-talent`).

**Acceptance Scenarios**:

1. **Given** the homepage awards section is rendered, **When** the user views it, **Then** 6 award cards are displayed with the heading "He thong giai thuong" (awards system): Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, and MVP.
2. **Given** an award card is displayed, **When** the user views it, **Then** each card shows: a category image, the award title, a short description, and a "Chi tiet" link with a right-arrow indicator.
3. **Given** the user hovers over an award card, **When** the cursor enters the card area, **Then** the card displays a visual hover effect (elevation change, border highlight, or subtle scale transform).
4. **Given** the user clicks the "Chi tiet" link on any award card, **When** the click event fires, **Then** the user is navigated to the Awards Information page with a URL hashtag anchor corresponding to that award category (e.g., `/awards-information#top-project`).
5. **Given** the awards section heading is displayed, **When** the user views it, **Then** the heading "He thong giai thuong" is styled consistently with the Figma design and visually separates from the content section above.

---

### User Story 4 - Header Navigation & User Controls (Priority: P2)

As an authenticated user, I want to use the header navigation to move between platform sections and access my profile controls so that I can efficiently navigate the application.

**Why this priority**: Navigation is essential for usability but the homepage itself is functional without interactive header controls. Users can still view all homepage content.

**Independent Test**: Render the header with a valid session. Verify nav links for "About SAA 2025", "Awards Information", and "Sun* Kudos" are present with correct `href` values. Click the user profile icon and verify the dropdown appears with role-appropriate options.

**Acceptance Scenarios**:

1. **Given** the header is rendered, **When** the user views the navigation links, **Then** three links are displayed: "About SAA 2025" (links to homepage / scroll to top), "Awards Information" (links to awards information page), and "Sun* Kudos" (links to Sun* Kudos page).
2. **Given** the user is on the Homepage, **When** the header renders, **Then** the "About SAA 2025" nav link displays in its "selected" visual state (active indicator) while the other links display in their "normal" state.
3. **Given** a nav link is in its "normal" state, **When** the user hovers over it, **Then** it transitions to the "hover" visual state with a smooth transition (150ms ease-in-out).
4. **Given** the user clicks the notification bell icon, **When** the click event fires, **Then** a notification panel overlay opens displaying the user's notifications.
5. **Given** the user has unread notifications, **When** the header renders, **Then** a badge indicator (dot or count) is visible on the notification bell icon.
6. **Given** the user has zero unread notifications, **When** the header renders, **Then** no badge indicator is displayed on the notification bell icon.
7. **Given** the user clicks the language selector ("VN"), **When** the dropdown opens, **Then** available language options are displayed and the user can select a different language.
8. **Given** the user clicks the profile icon, **When** the dropdown opens, **Then** it displays options including "Profile" and "Sign out". If the user has an admin role, an "Admin Dashboard" option is also shown.
9. **Given** the user clicks "Sign out" in the profile dropdown, **When** the sign-out action completes, **Then** the Supabase session is destroyed (cookies cleared) and the user is redirected to the Login screen.

---

### User Story 5 - Sun* Kudos Section (Priority: P2)

As an authenticated user viewing the homepage, I want to see a promotional section for Sun* Kudos so that I can learn about the Kudos feature and navigate to it.

**Why this priority**: The Kudos section is a secondary content area that promotes a companion feature. It is not required for the core homepage experience.

**Independent Test**: Render the Kudos section. Verify it displays the title, description text, and a "Chi tiet" CTA button. Click the button and verify navigation to the Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the homepage is rendered, **When** the user scrolls to the Kudos section, **Then** a promotional card is displayed with the Sun* Kudos title, descriptive text about the Kudos feature, and a "Chi tiet" CTA button.
2. **Given** the user views the Kudos section, **When** the Kudos card renders, **Then** it uses the distinct Kudos branding (SVN-Gotham font for logo text per design) and is visually differentiated from the awards section above.
3. **Given** the user clicks the "Chi tiet" button in the Kudos section, **When** the click event fires, **Then** the user is navigated to the Sun* Kudos page.

---

### User Story 6 - Widget Button (Priority: P3)

As an authenticated user anywhere on the homepage, I want a floating action button available for quick actions so that I can access common tasks without scrolling.

**Why this priority**: The widget button is a convenience feature. All actions it provides are accessible through other navigation paths.

**Independent Test**: Render the page and verify the widget button is fixed at the bottom-right corner. Click it and verify a quick-action menu appears. Scroll the page and verify the button remains in position.

**Acceptance Scenarios**:

1. **Given** the homepage is rendered, **When** the user views any scroll position, **Then** a pill-shaped gold floating action button is visible fixed at the bottom-right corner of the viewport.
2. **Given** the widget button is visible, **When** the user clicks it, **Then** a quick-action menu expands from the button with available shortcuts.
3. **Given** the quick-action menu is open, **When** the user clicks outside the menu or clicks the button again, **Then** the menu closes.
4. **Given** the page is scrolled, **When** the user scrolls up or down, **Then** the widget button remains fixed at its viewport position without jitter or layout shift.

---

### Edge Cases

- **Countdown reaches zero**: All countdown fields display "00" and the interval is cleared. No negative numbers are shown. Consider showing a post-event message or hiding the countdown section entirely.
- **Images fail to load**: All `<Image>` components MUST have descriptive `alt` attributes. The hero section MUST have a dark fallback background color (#00101A) so text and CTAs remain readable if the keyvisual image fails. Award card images MUST show a placeholder or graceful fallback.
- **User has no notifications**: The notification bell icon renders without a badge. Clicking it opens the panel with an empty state message (e.g., "No notifications").
- **Backend is unreachable**: If notification or profile endpoints fail, the UI MUST degrade gracefully: the notification badge does not appear, and the profile dropdown shows cached data or a minimal fallback. Error toasts MUST NOT expose internal details (OWASP).
- **Invalid `NEXT_PUBLIC_SAA_EVENT_DATE`**: The countdown component displays "00/00/00" without crashing. A console warning is logged in development mode.
- **User session expires during page view**: When the next server-side request (navigation, API call) detects an expired session, middleware redirects to Login. The countdown (client-side) continues functioning until the next navigation.
- **Very long award descriptions**: Text is truncated with ellipsis or clamped to a maximum number of lines to maintain card height consistency across the grid.
- **Rapid widget button clicks**: Debounce the toggle to prevent flicker. Only one menu instance is rendered at a time.
- **Keyboard-only navigation**: All interactive elements (nav links, CTAs, cards, widget, dropdowns) MUST be focusable and operable via keyboard (Tab, Enter, Escape).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| A1 | Header | Sticky dark navigation bar with semi-transparent background (rgba(16,20,23,0.8)), contains logo, nav links, notification bell, language selector, profile icon | Fixed at top on scroll; nav links have selected/hover/normal states |
| A1.1 | SAA Logo | SAA 2025 event logo at left of header | Click: navigates to homepage (scroll to top) |
| A1.2 | Nav Links | "About SAA 2025", "Awards Information", "Sun* Kudos" | Click: navigate to respective pages; selected state for current page; hover state with transition |
| A1.3 | Notification Bell | Bell icon with optional badge indicator | Click: opens notification panel overlay |
| A1.4 | Language Selector | "VN" with flag icon and chevron | Click: opens language dropdown |
| A1.5 | Profile Icon | User avatar or default icon | Click: opens profile dropdown with Profile, Sign out, Admin Dashboard (role-based) |
| 3.5 | Hero / Keyvisual | Full-bleed background image with left-to-right and bottom-to-top gradient overlays, dark atmosphere | Static background, content overlaid |
| 3.5.1 | ROOT FURTHER Logo | Event branding logo image centered in hero | Static display |
| B1 | Countdown Timer | Three-field countdown (Days / Hours / Minutes) with digital number font, zero-padded, labeled | Updates every 60 seconds client-side; stops at zero |
| B2 | Event Info | Event date, time, and venue text below countdown. Content: "Thời gian: 26/12/2025", time "18h30", "Địa điểm: Âu Cơ Art Center", description "Tường thuật trực tiếp qua sóng Livestream". Values are configurable via env vars or constants. | Static display |
| B3 | Hero CTAs | Two buttons: "ABOUT AWARDS" (primary gold filled) and "ABOUT KUDOS" (outlined/ghost) | Click: navigate to Awards Information and Sun* Kudos pages respectively; hover effects |
| B4 | Content Section | "Root Further" explanation text with centered logo images describing the event philosophy. Includes a centered English quote "A tree with deep roots fears no storm" with Vietnamese subtitle "(Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)". Multiple paragraphs of Vietnamese body text explaining the "Root Further" theme. | Static display |
| C1 | Awards Header | Section heading "He thong giai thuong" (awards system) | Static display |
| C2 | Award Card List | 6 cards in responsive grid (3x2 desktop, 2x3 tablet, 1x6 mobile): Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP | Card hover: elevation/highlight effect; "Chi tiet" link click: navigates to Awards Information page with hashtag anchor |
| D1 | Sun* Kudos Section | Promotional card with title (SVN-Gotham font), description, "Chi tiet" CTA button | Button click: navigates to Sun* Kudos page |
| 6 | Widget Button | Pill-shaped gold floating action button, fixed bottom-right | Click: toggles quick-action menu; persists across scroll |
| 7 | Footer | Dark footer with SAA logo (69x64px), four nav links ("About SAA 2025", "Award Information", "Sun* Kudos", "Tiêu chuẩn chung"), and copyright text ("Bản quyền thuộc về Sun* © 2025"). The current page link is highlighted with a gold-tinted background and text-shadow glow. | Nav link clicks navigate to respective pages; active page link has highlighted state |

### Navigation Flow

- **From**: Login screen (screen `GzbNeVGJHz`) after successful Google OAuth redirect
- **To — Awards Information page**: Via header nav "Awards Information" link, hero CTA "ABOUT AWARDS" button, or award card "Chi tiet" links (with hashtag anchors)
- **To — Sun* Kudos page**: Via header nav "Sun* Kudos" link, hero CTA "ABOUT KUDOS" button, or Kudos section "Chi tiet" button
- **To — Homepage (self)**: Via header nav "About SAA 2025" link or SAA logo click (scroll to top)
- **To — Profile page**: Via profile dropdown "Profile" option
- **To — Admin Dashboard**: Via profile dropdown "Admin Dashboard" option (role-based, only visible to admin users)
- **To — Login screen**: Via profile dropdown "Sign out" option (session destroyed, redirect)
- **To — Notification panel**: Via notification bell click (overlay, not a page navigation)
- **To — Language dropdown**: Via language selector click (overlay)
- **To — Quick-action menu**: Via widget button click (overlay)

### Visual Requirements

- **Responsive breakpoints**: Default mobile (< 640px), `sm` (>= 640px), `md` tablet (>= 768px), `lg` desktop (>= 1024px), `xl` large desktop (>= 1280px) — per constitution TailwindCSS defaults
- **Animations/Transitions**: Nav link hover state (150ms ease-in-out), award card hover (200ms ease-in-out elevation/scale), CTA button hover (150ms ease-in-out lift + shadow), widget button menu expand/collapse (200ms ease-in-out), countdown digit change (no animation, instant update), profile/notification dropdown open (150ms fade-in)
- **Accessibility**: WCAG AA color contrast for all text on dark backgrounds; keyboard navigation for all interactive elements (Tab order: header links -> hero CTAs -> award cards -> kudos CTA -> widget -> footer links); `aria-label` attributes on icon-only buttons (notification bell, profile, widget); visible focus indicators; skip-to-content link; screen reader announcements for countdown updates via `aria-live="polite"`
- **Touch targets**: All clickable elements MUST meet minimum 44x44px touch target size on mobile per constitution

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST require authentication. Unauthenticated users MUST be redirected to the Login screen via middleware before the page renders.
- **FR-002**: Page MUST display a sticky header with the SAA 2025 logo, three navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos"), notification bell, language selector, and user profile icon.
- **FR-003**: The "About SAA 2025" nav link MUST display in its "selected" visual state when the user is on the Homepage. Other nav links MUST display in "normal" state.
- **FR-004**: Navigation links MUST transition between normal, hover, and selected states with smooth visual transitions.
- **FR-005**: The hero section MUST display a full-bleed background keyvisual image with gradient overlays (left-to-right and bottom-to-top using #00101A) for text readability.
- **FR-006**: The countdown timer MUST display remaining Days, Hours, and Minutes until the event date specified by `NEXT_PUBLIC_SAA_EVENT_DATE`, zero-padded to 2 digits minimum.
- **FR-007**: The countdown timer MUST update every 60 seconds on the client side without requiring a page reload.
- **FR-008**: The countdown timer MUST display "00" for all fields and stop the interval when the event date has passed or the environment variable is missing/invalid. The "Coming soon" subtitle MUST be hidden when the countdown reaches zero or the event has passed.
- **FR-009**: The hero section MUST display two CTA buttons: "ABOUT AWARDS" (primary gold, navigates to Awards Information page) and "ABOUT KUDOS" (outlined, navigates to Sun* Kudos page).
- **FR-010**: The awards section MUST display exactly 6 award category cards: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, and MVP.
- **FR-011**: Each award card MUST display a category image, title, short description, and a "Chi tiet" link that navigates to the Awards Information page with a URL hashtag anchor corresponding to the specific award category.
- **FR-012**: The awards grid MUST be responsive: 3 columns on desktop (>= 1024px), 2 columns on tablet (>= 768px), 1 column on mobile (< 768px).
- **FR-013**: The Sun* Kudos section MUST display a promotional card with title, description, and a "Chi tiet" CTA button that navigates to the Sun* Kudos page.
- **FR-014**: A floating widget button (pill-shaped, gold) MUST be fixed at the bottom-right of the viewport and toggle a quick-action menu on click.
- **FR-015**: The footer MUST display the SAA logo (69x64px), four navigation links ("About SAA 2025", "Award Information", "Sun* Kudos", "Tiêu chuẩn chung"), and copyright text ("Bản quyền thuộc về Sun* © 2025"). The currently active page link MUST display in a highlighted state (gold-tinted background with text-shadow glow).
- **FR-016**: The user profile icon dropdown MUST display "Profile" and "Sign out" options for all users. If the authenticated user has an admin role, an "Admin Dashboard" option MUST also be displayed.
- **FR-017**: Clicking "Sign out" in the profile dropdown MUST destroy the Supabase session (clear httpOnly cookies) and redirect the user to the Login screen.
- **FR-018**: The notification bell MUST display a badge indicator when the user has unread notifications and no badge when there are zero unread notifications.

### Technical Requirements

- **TR-001**: The Homepage page (`src/app/(main)/page.tsx` or equivalent) MUST be a Next.js Server Component. Authentication status MUST be verified server-side before rendering.
- **TR-002**: The countdown timer MUST be implemented as a `"use client"` component since it requires `setInterval`, `useState`, and `useEffect` hooks for client-side time updates.
- **TR-003**: The event date MUST be configured via the `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable (ISO 8601 format, e.g., `2025-12-15T18:00:00+07:00`). The countdown component MUST parse this value client-side.
- **TR-004**: All images (hero keyvisual, ROOT FURTHER logo, award card images, Kudos imagery) MUST use the Next.js `<Image>` component with responsive `sizes` and appropriate `priority` for above-the-fold images.
- **TR-005**: Fonts MUST be loaded via `next/font/google` (Montserrat, Montserrat Alternates) and `next/font/local` for any custom fonts (Digital Numbers for countdown digits, SVN-Gotham for Kudos logo text if not available on Google Fonts).
- **TR-006**: All components MUST be compatible with the Cloudflare Workers edge runtime via OpenNext. No Node.js-only APIs in server components or API routes.
- **TR-007**: Authentication MUST be enforced via `src/middleware.ts` using the existing Supabase middleware pattern (`src/libs/supabase/middleware.ts`). The middleware MUST check for a valid session and redirect unauthenticated requests to `/login`.
- **TR-008**: The Header and Footer components MUST be extracted as shared layout components (e.g., in `src/components/layout/`) and reused between the Homepage and other authenticated pages. The Login screen's simpler header/footer should be refactored to share common elements where applicable.
- **TR-009**: Award category data (title, description, image path, hashtag anchor) MUST be defined as a typed constant array in a dedicated data file (e.g., `src/constants/awards.ts` or `src/data/awards.ts`) for maintainability.
- **TR-010**: The page MUST achieve a Lighthouse performance score >= 85 on desktop. Hero keyvisual image MUST use `priority` loading; below-the-fold images MUST use lazy loading.

### Key Entities

- **User Session**: Managed by Supabase Auth via `@supabase/ssr`; stored in httpOnly cookies; contains user ID, email, access token, refresh token, and user role metadata.
- **Award Categories** (static data): Array of 6 objects, each containing `id`, `title`, `description`, `imagePath`, and `anchor` (URL hashtag). Initially hardcoded as a typed constant; may be migrated to Supabase table in future iteration.
- **Event Configuration**: Event date sourced from `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable (ISO 8601). Event venue, time, and livestream info sourced from additional env vars or typed constants: `NEXT_PUBLIC_SAA_EVENT_TIME` (e.g., "18h30"), `NEXT_PUBLIC_SAA_EVENT_DATE_DISPLAY` (e.g., "26/12/2025"), `NEXT_PUBLIC_SAA_EVENT_VENUE` (e.g., "Âu Cơ Art Center"), livestream description as constant.

---

## State Management

### Local State

| State | Component | Type | Initial | Purpose |
|-------|-----------|------|---------|---------|
| isCountdownExpired | CountdownTimer | boolean | false | Tracks whether the countdown has reached zero to stop the interval |
| days | CountdownTimer | string | "00" | Current zero-padded days remaining |
| hours | CountdownTimer | string | "00" | Current zero-padded hours remaining |
| minutes | CountdownTimer | string | "00" | Current zero-padded minutes remaining |
| isNotificationOpen | Header (NotificationBell) | boolean | false | Controls notification panel visibility |
| notificationCount | Header (NotificationBell) | number | 0 | Number of unread notifications for badge display |
| isLanguageOpen | Header (LanguageSelector) | boolean | false | Controls language dropdown visibility |
| isProfileOpen | Header (ProfileMenu) | boolean | false | Controls profile dropdown visibility |
| isWidgetOpen | WidgetButton | boolean | false | Controls quick-action menu visibility |

### Global State

No global client-side state store is required. User session data is managed entirely by Supabase Auth via httpOnly cookies (server-side, not client-accessible). Session data needed for rendering (e.g., user role for Admin Dashboard option) is read server-side and passed as props to client components.

### UI States

**Default State**: All sections rendered, countdown active, header nav in normal state with "About SAA 2025" selected, all dropdowns closed, widget menu closed.

**Countdown Expired State**: All countdown fields show "00", interval cleared. Optional: display a post-event message in place of countdown or hide the countdown section.

**Header Dropdown States** (mutually exclusive — opening one closes others):
- Notification panel open: overlay below bell icon with notification list or empty state
- Language dropdown open: overlay below language selector with language options
- Profile dropdown open: overlay below profile icon with menu items

**Widget Menu Open State**: Quick-action menu expanded above the widget button with available shortcuts. Clicking outside or on the button toggles it closed.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/notifications | GET | Fetch unread notification count and list for the authenticated user | New (predicted) |
| /api/notifications/read | PATCH | Mark notifications as read | New (predicted) |
| /api/user/profile | GET | Fetch authenticated user profile data (name, avatar, role) for header display | New (predicted) |
| /auth/signout | POST | Server action or route handler that calls `supabase.auth.signOut()` and clears session cookies | New (predicted) |
| Supabase session refresh | — | Handled automatically by `@supabase/ssr` middleware on each request | Exists (middleware) |

**Note**: For the initial implementation, notification count may return a static 0 (no notification backend yet), and user profile data (name, avatar URL, role) may be read directly from the Supabase Auth user metadata (`user.user_metadata`) without a dedicated API endpoint.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated users are served the Homepage after login without errors. Unauthenticated users are always redirected to Login.
- **SC-002**: The countdown timer displays the correct remaining time (within 1-minute accuracy) relative to `NEXT_PUBLIC_SAA_EVENT_DATE` and updates every 60 seconds.
- **SC-003**: All 6 award card "Chi tiet" links navigate to the Awards Information page with the correct hashtag anchor for the respective award category.
- **SC-004**: Homepage achieves a Lighthouse performance score >= 85 on desktop and >= 70 on mobile.
- **SC-005**: All visual elements match the Figma design with < 5% pixel deviation at desktop (1440px) viewport.
- **SC-006**: The page is fully responsive and visually verified at mobile (375px), tablet (768px), and desktop (1280px) widths.
- **SC-007**: All interactive elements (nav links, CTAs, award cards, widget button, dropdowns) are keyboard-accessible and meet WCAG AA contrast requirements.
- **SC-008**: Zero authentication tokens or session data exposed in client-side JavaScript, localStorage, or URL parameters (OWASP compliance, verified via browser DevTools).
- **SC-009**: Header and Footer components are shared and reused between Homepage and other authenticated pages (no duplication).

---

## Out of Scope

- Awards Information page details and implementation (separate specification; this spec only defines navigation links to it)
- Sun* Kudos page details and implementation (separate specification; this spec only defines navigation links to it)
- Notification panel content, logic, and backend (this spec only defines the bell icon with badge and open/close interaction)
- Admin Dashboard page and role management (this spec only defines the conditional dropdown menu item)
- Profile page implementation (this spec only defines the dropdown link)
- Language dropdown full implementation and i18n text management (this spec only defines the selector trigger)
- Widget button quick-action menu items and their destinations (detailed in a separate specification)
- Real-time notification delivery (WebSocket/Supabase Realtime) — initial implementation uses REST polling or static badge
- Award category data migration to Supabase database (initial implementation uses static typed constants)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen specification exists (`.momorph/specs/GzbNeVGJHz-Login/spec.md`)
- [x] Login screen implemented (provides OAuth flow and redirect to Homepage)
- [x] Supabase middleware auth check configured in `src/middleware.ts` — already exists from Login implementation
- [ ] Shared Header/Footer layout components extracted from Login screen or created new
- [ ] API specifications available (`.momorph/API.yml`) — notification and profile endpoints defined as predicted in this spec
- [ ] Assets downloaded from Figma: hero keyvisual image, ROOT FURTHER logo, award category images (6), Sun* Kudos card imagery, widget button icon, notification bell icon, profile default icon
- [ ] `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable configured in `.env.development` and wrangler environment
- [ ] Custom fonts available: Digital Numbers font file for countdown digits, SVN-Gotham font file for Kudos logo text (if not available via Google Fonts)

---

## Notes

- The Header and Footer from the Login screen (simpler variants with fewer controls) should be refactored into shared layout components. The authenticated Header (used here) extends the Login Header with nav links, notification bell, and profile icon. Consider a `src/components/layout/Header.tsx` that accepts a `variant` prop ("auth" | "public") or conditionally renders controls based on session presence.
- The countdown event date MUST come from the `NEXT_PUBLIC_SAA_EVENT_DATE` environment variable (ISO 8601 format). This allows different environments (dev, staging, production) to target different dates without code changes. The prefix `NEXT_PUBLIC_` is required because the countdown runs client-side.
- The Digital Numbers font (or similar digital/LCD style font) is used exclusively for the countdown digits to create a timer aesthetic. Load via `next/font/local` if a custom font file, or `next/font/google` if available.
- The SVN-Gotham font is used for the Sun* Kudos logo text styling per the Figma design. This may require a local font file loaded via `next/font/local`.
- Award categories are defined as a static typed constant array for the initial implementation. Each entry includes: `id` (string slug, e.g., "top-talent"), `title` (Vietnamese display name), `description` (short Vietnamese text), `imagePath` (path to card image in `public/assets/homepage/`), and `anchor` (URL hash fragment for Awards Information page). This enables easy migration to a database-backed source later.
- Assets should be placed in `public/assets/homepage/` following the convention established by the Login screen (`public/assets/login/`).
- Supabase SSR clients (`src/libs/supabase/client.ts`, `server.ts`, `middleware.ts`) already exist from the Login implementation and MUST be reused.
- The profile dropdown "Admin Dashboard" option visibility depends on the user's role stored in Supabase Auth user metadata (`user.user_metadata.role` or `user.app_metadata.role`). The role check MUST happen server-side, and the result passed as a prop to avoid exposing role logic on the client.
- Refer to `design-style.md` in this directory (when created) for all visual specifications, design tokens, color values, typography, and component-level styles extracted from the Figma design.
