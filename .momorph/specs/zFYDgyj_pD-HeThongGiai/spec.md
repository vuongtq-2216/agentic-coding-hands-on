# Feature Specification: Awards Information (He Thong Giai)

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `He Thong Giai`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The Awards Information page (`/awards-information`) is the dedicated awards detail page of the SAA 2025 (Sun Annual Awards) platform. It provides authenticated users with comprehensive information about the six award categories, including descriptions, prize counts, and prize values. The page is accessible from the Homepage via the header navigation "Awards Information" link, the hero CTA "ABOUT AWARDS" button, or the individual award card "Chi tiet" links (which include hashtag anchors for deep linking to specific award sections).

The page features a dark-themed layout consistent with the platform's visual identity. At the top, a hero/keyvisual section displays the "ROOT FURTHER" branding logo on a gradient-overlaid background. Below the hero, a title section introduces the awards system heading. The main content area uses a two-column layout: a sticky left sidebar navigation lists the 6 award categories (with scroll-spy-driven active state highlighting), and the right column presents detailed award cards for each category in a vertically stacked arrangement. At the bottom, a Sun* Kudos promotional section and the shared site footer complete the page.

The sidebar navigation provides click-to-scroll behavior (smooth scrolling to the corresponding award section) and scroll-spy functionality (the active sidebar item updates automatically as the user scrolls through the award sections). When users arrive via a Homepage hashtag anchor link (e.g., `/awards-information#top-talent`), the page scrolls to the targeted award section and activates the corresponding sidebar item.

All content is static for the MVP. Award data is sourced from a typed constant data file shared with the Homepage award cards. The page requires authentication; unauthenticated users are redirected to the Login screen by middleware.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Awards Page Visual Presentation (Priority: P1)

As an authenticated user navigating to the Awards Information page, I want to see all award categories presented with detailed information in a visually compelling layout so that I can understand each award's purpose, prize count, and prize value.

**Why this priority**: This is the core purpose of the page. All visual sections must render correctly for the page to fulfill its informational function.

**Independent Test**: Render the page with a valid Supabase session. Verify all visual sections (header, hero/keyvisual, title section, sidebar navigation, 6 award detail cards, Sun* Kudos section, footer) are present, correctly positioned, and match the Figma design at desktop (1440px), tablet (768px), and mobile (375px) viewports.

**Acceptance Scenarios**:

1. **Given** an authenticated user navigates to `/awards-information`, **When** the page renders, **Then** all major sections are visible: shared sticky header (with "Awards Information" nav link in active/selected state), hero/keyvisual with ROOT FURTHER logo, title section with "He thong giai thuong SAA 2025" heading, sidebar navigation with 6 category items, 6 award detail cards, Sun* Kudos promotional section, and shared footer (with "Awards Information" link highlighted).
2. **Given** the page renders at desktop viewport (>= 1280px), **When** the user views the main content area, **Then** a two-column layout is displayed: a sticky sidebar navigation (178px wide) on the left and award detail cards (853px wide) on the right, with 80px vertical gap between cards.
3. **Given** the page renders at tablet viewport (768px), **When** the user views the main content area, **Then** the sidebar navigation collapses or repositions to accommodate the narrower viewport while award cards remain readable.
4. **Given** the page renders at mobile viewport (375px), **When** the user views the main content area, **Then** the sidebar navigation is either hidden (replaced by an alternative navigation mechanism) or repositioned above the content, and award cards stack in a single-column layout with appropriate spacing.
5. **Given** the page has rendered, **When** the user views any award detail card, **Then** the card displays: a 336x336 award image (with gold border, rounded-24 corners, and glow shadow), the award title (24px gold #FFEA9E), a description paragraph (16px white, text-align justified), a separator line, "So luong giai thuong:" label with count number (36px) and unit text, another separator line, and "Gia tri giai thuong:" label with prize amount (36px) and optional note.
6. **Given** the hero section renders, **When** the user views it, **Then** the ROOT FURTHER logo (338x150px) is displayed on a keyvisual background (1440x547px) with a bottom-to-top gradient overlay (linear-gradient(0deg, #00101A -4.23%, transparent 52.79%)).
7. **Given** an unauthenticated user attempts to access `/awards-information` directly, **When** middleware evaluates the request, **Then** the user is redirected to the Login screen.

---

### User Story 2 - Sidebar Navigation with Scroll-Spy (Priority: P1)

As an authenticated user browsing the Awards Information page, I want a sticky sidebar navigation that tracks my scroll position and allows me to click to jump to any award section so that I can efficiently navigate between award categories.

**Why this priority**: The sidebar navigation is the primary navigation mechanism within the page. Without it, users must manually scroll through all content to find a specific award. The scroll-spy provides essential positional feedback.

**Independent Test**: Render the page with all 6 award sections. Click each sidebar item and verify smooth scrolling to the corresponding section. Manually scroll through the page and verify the sidebar active item updates to reflect the currently visible section.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is rendered at desktop viewport, **When** the user views the sidebar, **Then** 6 navigation items are listed corresponding to the 6 award categories: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, and MVP.
2. **Given** the sidebar is displayed, **When** the user clicks the "Top Project" sidebar item, **Then** the page smooth-scrolls to the Top Project award detail card section, and the "Top Project" sidebar item transitions to the active visual state (gold text #FFEA9E, bottom border, text-shadow glow).
3. **Given** the user is viewing the "Best Manager" award section (the section is in the viewport), **When** the scroll-spy evaluates visible sections, **Then** the "Best Manager" sidebar item displays in the active state while all other sidebar items display in the inactive state (white text, no border, no glow).
4. **Given** the user scrolls from the "Top Talent" section down to the "Top Project Leader" section, **When** the "Top Project Leader" section enters the viewport, **Then** the sidebar active state transitions from "Top Talent" to "Top Project Leader" smoothly without flicker.
5. **Given** the sidebar is in its sticky position, **When** the user scrolls through the main content, **Then** the sidebar remains fixed in the viewport alongside the scrolling award cards (CSS `position: sticky` behavior).
6. **Given** the user clicks the last sidebar item ("MVP"), **When** the page scrolls to the MVP section, **Then** the MVP section is scrolled into view even if it is the last section and there is insufficient content below it to fully scroll it to the top of the viewport.

---

### User Story 3 - Hashtag Anchor Deep Linking (Priority: P1)

As an authenticated user clicking an award card's "Chi tiet" link on the Homepage, I want to arrive at the Awards Information page with the page automatically scrolled to the specific award section so that I can immediately see the details of the award I selected.

**Why this priority**: Deep linking from the Homepage is the primary entry path to this page. The Homepage award cards explicitly link to `/awards-information#top-talent`, `/awards-information#top-project`, etc. Without anchor support, users would land at the top of the page and need to manually find the relevant section.

**Independent Test**: Navigate to `/awards-information#top-project` directly in the browser. Verify the page loads and scrolls to the Top Project section. Verify the sidebar "Top Project" item is in its active state.

**Acceptance Scenarios**:

1. **Given** a user clicks "Chi tiet" on the "Top Talent" card on the Homepage, **When** the Awards Information page loads at `/awards-information#top-talent`, **Then** the page scrolls to the Top Talent award detail card section and the sidebar "Top Talent" item displays in the active state.
2. **Given** a user navigates to `/awards-information#best-manager` via direct URL entry, **When** the page finishes loading, **Then** the page scrolls to the Best Manager section and the sidebar reflects "Best Manager" as active.
3. **Given** a user navigates to `/awards-information#signature-creator`, **When** the page loads, **Then** the page scrolls to the Signature 2025 - Creator section. The anchor ID matches the `anchor` field from the shared award data constants.
4. **Given** a user navigates to `/awards-information#invalid-anchor` (an anchor that does not correspond to any award), **When** the page loads, **Then** the page renders normally at the top without errors, and the first sidebar item displays as active by default.
5. **Given** a user navigates to `/awards-information` without any hashtag anchor, **When** the page loads, **Then** the page renders from the top, and the first sidebar item ("Top Talent") displays as active by default.
6. **Given** the page has loaded via hashtag anchor and scrolled to a section, **When** the user then manually scrolls to a different section, **Then** the scroll-spy updates the sidebar active state to reflect the newly visible section (the initial anchor does not permanently lock the active state).

---

### User Story 4 - Sun* Kudos Section Interaction (Priority: P2)

As an authenticated user viewing the Awards Information page, I want to see a promotional section for Sun* Kudos at the bottom of the page so that I can learn about the Kudos feature and navigate to it.

**Why this priority**: The Kudos section is a secondary promotional element. The core awards information is fully functional without it.

**Independent Test**: Render the Awards Information page. Scroll to the Sun* Kudos section. Verify it displays the same content and styling as the Homepage Kudos section (1152x500px, background image with dark fallback, left content + right KUDOS logo). Click the "Chi tiet" button and verify navigation to `/sun-kudos`.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is rendered, **When** the user scrolls past all award detail cards, **Then** the Sun* Kudos promotional section is displayed with a background image (dark fallback #00101A), left-side content text, right-side KUDOS logo, and a "Chi tiet" CTA button.
2. **Given** the Sun* Kudos section is visible, **When** the user clicks the "Chi tiet" button, **Then** the user is navigated to the `/sun-kudos` page.
3. **Given** the Sun* Kudos section renders, **When** the user views it, **Then** the section is visually identical to the Sun* Kudos section on the Homepage (shared component reuse), with dimensions approximately 1152x500px and consistent typography and spacing.
4. **Given** the Sun* Kudos section background image fails to load, **When** the section renders, **Then** the dark fallback background (#00101A) ensures all text and the CTA button remain visible and readable.

---

### Edge Cases

- **Invalid hashtag anchor in URL**: If the URL contains a `#fragment` that does not match any award category `anchor` value, the page renders normally from the top. No error is thrown. The first sidebar item displays as active by default.
- **All images fail to load**: Award card images and the hero keyvisual MUST have descriptive `alt` attributes. The hero section MUST have a dark fallback background color (#00101A) so the title text remains readable. Award card image containers MUST maintain their 336x336 dimensions with a placeholder or fallback background to prevent layout shift.
- **Sidebar scroll-spy with rapid scrolling**: The Intersection Observer callback MUST debounce or throttle updates to prevent rapid flickering of the active sidebar item during fast scrolling.
- **User session expires during page view**: When the next server-side request (navigation) detects an expired session, middleware redirects to Login. The static page content remains functional until the next navigation.
- **Sidebar sticky behavior at page boundaries**: The sidebar MUST stop being sticky when it reaches the bottom of the main content area (before the Sun* Kudos section), to avoid overlapping the footer or Kudos section.
- **Very long award descriptions**: Text should wrap naturally within the card width. No truncation is applied on this detail page (unlike Homepage cards which may truncate).
- **Keyboard-only navigation**: The sidebar navigation items MUST be focusable and operable via keyboard (Tab to focus, Enter to activate scroll). Award card content is read-only and does not require interactive keyboard handling.
- **Screen reader accessibility**: Each award section MUST have a proper heading hierarchy. Sidebar navigation MUST use `<nav>` with `aria-label`. Active sidebar item MUST be indicated via `aria-current="true"`.
- **Mobile sidebar collapse**: On mobile viewports where the two-column layout is not feasible, the sidebar MUST gracefully collapse, hide, or transform into an alternative navigation mechanism (e.g., horizontal scroll tabs or a dropdown).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| A | Header (shared) | Sticky dark navigation bar, same as Homepage. "Awards Information" nav link is in selected/active state. | Fixed at top on scroll; nav links have selected/hover/normal states |
| B | Hero / Keyvisual | Full-bleed background image (1440x547px) with bottom-to-top gradient overlay: linear-gradient(0deg, #00101A -4.23%, transparent 52.79%) | Static background, content overlaid |
| B.1 | ROOT FURTHER Logo | Event branding logo image (338x150px), centered on the hero keyvisual | Static display |
| C | Title Section | "Sun* Annual Awards 2025" subtitle (24px, white, Montserrat) + horizontal divider (#2E3940) + "Hệ thống giải thưởng SAA 2025" heading (57px, gold #FFEA9E, Montserrat bold) | Static display |
| D | Main Content Area | Two-column layout container: sticky sidebar (left) + award cards (right) | Responsive layout changes at breakpoints |
| D.sidebar | Sidebar Navigation | Sticky left sidebar (178px wide) listing 6 award category names vertically. Active item: gold text (#FFEA9E), bottom border, text-shadow glow. Inactive items: white text. | Click: smooth-scrolls to corresponding award section; Scroll-spy: active item updates on scroll |
| D.1 | Award Card: Top Talent | 336x336 image (gold border 2px #FFEA9E, border-radius 24px, box-shadow glow), title "Top Talent" (24px gold), description (16px white justified), separator, count "10" (36px) + unit "Don vi", separator, prize "7.000.000 VND" (36px) + note "(cho moi giai thuong)" | Static display; scroll target for sidebar click and URL anchor |
| D.2 | Award Card: Top Project | Same card structure. Count "02" + unit "Tap the", prize "15.000.000 VND" + note "(cho moi giai thuong)" | Static display; scroll target |
| D.3 | Award Card: Top Project Leader | Same card structure. Count "03" + unit "Ca nhan", prize "7.000.000 VND" + note "(cho moi giai thuong)" | Static display; scroll target |
| D.4 | Award Card: Best Manager | Same card structure. Count "01" + unit "Ca nhan", prize "10.000.000 VND" | Static display; scroll target |
| D.5 | Award Card: Signature 2025 - Creator | Same card structure. Count "01" + unit "Ca nhan + Tap the", prize "5.000.000 VND (ca nhan) / 8.000.000 VND (tap the)" | Static display; scroll target |
| D.6 | Award Card: MVP | Same card structure. Count "01" + no unit, prize "15.000.000 VND" | Static display; scroll target |
| E | Sun* Kudos Section | Promotional card (1152x500px), background image with dark fallback (#00101A), left content text + right KUDOS logo, "Chi tiet" CTA button. Shared component with Homepage. | Button click: navigates to /sun-kudos |
| F | Footer (shared) | Dark footer, same as Homepage. "Awards Information" link is highlighted/active with gold-tinted background and text-shadow glow. | Nav link clicks navigate to respective pages; active page link has highlighted state |

### Navigation Flow

- **From — Homepage header nav**: Click "Awards Information" link in the header navigation bar
- **From — Homepage hero CTA**: Click "ABOUT AWARDS" button in the hero section
- **From — Homepage award cards**: Click "Chi tiet" link on any award card, arriving with hashtag anchor (e.g., `/awards-information#top-talent`, `/awards-information#top-project`, `/awards-information#top-project-leader`, `/awards-information#best-manager`, `/awards-information#signature-creator`, `/awards-information#mvp`)
- **To — Sun* Kudos page**: Click "Chi tiet" button in the Sun* Kudos promotional section (navigates to `/sun-kudos`)
- **To — Homepage**: Click "About SAA 2025" header nav link or SAA logo (navigates to `/`)
- **To — Other pages**: Via shared header nav links ("Sun* Kudos"), notification bell, language selector, and profile dropdown (same behavior as Homepage header)
- **To — Login screen**: Via profile dropdown "Sign out" option (session destroyed, redirect)
- **Triggers**: Sidebar click triggers smooth scroll; URL hash triggers initial scroll on page load; scroll position triggers sidebar active state update

### Visual Requirements

- **Responsive breakpoints**: Default mobile (< 640px), `sm` (>= 640px), `md` tablet (>= 768px), `lg` desktop (>= 1024px), `xl` large desktop (>= 1280px) — per constitution TailwindCSS defaults
- **Animations/Transitions**: Sidebar active state transition (150ms ease-in-out for text color, border, and glow), smooth scroll behavior (`scroll-behavior: smooth` or programmatic `scrollIntoView({ behavior: 'smooth' })`), header nav link hover state (150ms ease-in-out)
- **Accessibility**: WCAG AA color contrast for all text on dark backgrounds (white on #00101A = 19.5:1, gold #FFEA9E on #00101A = 13.8:1 — both exceed AAA); keyboard-navigable sidebar items; `aria-label` on sidebar navigation; `aria-current` on active sidebar item; visible focus indicators on dark background; proper heading hierarchy (h1 for page title, h2 for award names); screen reader support for section identification
- **Touch targets**: All clickable sidebar items and CTA buttons MUST meet minimum 44x44px touch target size on mobile per constitution

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST require authentication. Unauthenticated users MUST be redirected to the Login screen via middleware before the page renders.
- **FR-002**: Page MUST display the shared sticky header with the SAA 2025 logo, three navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos"), notification bell, language selector, and user profile icon.
- **FR-003**: The "Awards Information" nav link in the header MUST display in its "selected" visual state when the user is on this page. Other header nav links MUST display in "normal" state.
- **FR-004**: The hero section MUST display the ROOT FURTHER logo (338x150px) on a full-bleed keyvisual background image (1440x547px) with a bottom-to-top gradient overlay: `linear-gradient(0deg, #00101A -4.23%, transparent 52.79%)`.
- **FR-005**: The title section MUST display "Sun* Annual Awards 2025" as a subtitle (24px, white) followed by a horizontal divider (#2E3940) and "He thong giai thuong SAA 2025" as the main heading (57px, gold #FFEA9E).
- **FR-006**: The sidebar navigation MUST list exactly 6 award category names matching the categories in the shared award data constants: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, and MVP.
- **FR-007**: Clicking a sidebar navigation item MUST smooth-scroll the page to the corresponding award detail card section.
- **FR-008**: The sidebar MUST implement scroll-spy behavior: the active sidebar item MUST automatically update to reflect the award section currently visible in the viewport as the user scrolls.
- **FR-009**: The active sidebar item MUST display with gold text (#FFEA9E), a bottom border, and a text-shadow glow effect. Inactive items MUST display with white text and no border/glow. Hover state: background rgba(255,255,255,0.1) with 150ms transition.
- **FR-010**: The sidebar MUST be sticky-positioned on desktop viewports, remaining visible alongside the scrolling award card content.
- **FR-011**: Each award detail card MUST display: a 336x336 award image (with gold border 2px solid #FFEA9E, border-radius 24px, and box-shadow glow), the award title (24px gold #FFEA9E), a description paragraph (16px white, text-align justified), a separator, "So luong giai thuong:" label with the count number (36px) and unit, a separator, and "Gia tri giai thuong:" label with the prize amount (36px) and optional note.
- **FR-012**: The page MUST support hashtag anchor deep linking. When the URL contains a valid hash fragment (e.g., `#top-talent`, `#top-project`, `#top-project-leader`, `#best-manager`, `#signature-creator`, `#mvp`), the page MUST scroll to the corresponding award section on initial load and set the corresponding sidebar item as active.
- **FR-013**: When no hash fragment is present or the hash fragment is invalid, the page MUST render from the top with the first sidebar item ("Top Talent") set as active by default.
- **FR-014**: Award detail cards MUST display the following data accurately per the Figma design:
  - Top Talent: count 10, unit "Don vi", prize "7.000.000 VND (cho moi giai thuong)"
  - Top Project: count 02, unit "Tap the", prize "15.000.000 VND (cho moi giai thuong)"
  - Top Project Leader: count 03, unit "Ca nhan", prize "7.000.000 VND (cho moi giai thuong)"
  - Best Manager: count 01, unit "Ca nhan", prize "10.000.000 VND"
  - Signature 2025 - Creator: count 01, unit "Ca nhan + Tap the", prize "5.000.000 VND (ca nhan) / 8.000.000 VND (tap the)"
  - MVP: count 01, unit none, prize "15.000.000 VND"
- **FR-015**: The Sun* Kudos promotional section MUST display below all award cards with a background image (dark fallback #00101A), left content text, right KUDOS logo, and a "Chi tiet" CTA button that navigates to `/sun-kudos`.
- **FR-016**: The shared footer MUST display with the "Awards Information" link in its highlighted/active state (gold-tinted background with text-shadow glow).
- **FR-017**: The vertical gap between consecutive award detail cards MUST be 80px per the Figma design.

### Technical Requirements

- **TR-001**: The Awards Information page MUST be a Next.js Server Component at the page level (`src/app/(main)/awards-information/page.tsx`). Authentication status MUST be verified server-side before rendering.
- **TR-002**: The sidebar navigation with scroll-spy MUST be implemented as a `"use client"` component since it requires `useState`, `useEffect`, `useRef`, and the Intersection Observer API for scroll tracking and client-side scroll behavior.
- **TR-003**: Scroll-spy MUST be implemented using the Intersection Observer API (not scroll event listeners) to efficiently detect which award section is currently visible in the viewport. Each award section MUST be observed with an appropriate `rootMargin` and `threshold` configuration.
- **TR-004**: Hashtag anchor scrolling on initial page load MUST be implemented in a client component `useEffect` that reads `window.location.hash`, finds the matching section element by ID, and calls `scrollIntoView({ behavior: 'smooth' })`. This MUST run after the page content has rendered.
- **TR-005**: The shared Header and Footer components (`src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`) MUST be reused from the Homepage implementation. The current page path MUST be passed to these components to determine which nav link to display in the active/selected state.
- **TR-006**: Award category data (title, description, image path, anchor) MUST be sourced from the existing typed constant array in `src/data/awards.ts`. The data file MUST be extended with additional fields for the detail page: `count` (number), `unit` (string | null), `prizeAmount` (string), and `prizeNote` (string | null). This ensures a single source of truth shared between the Homepage award cards and the Awards Information detail page.
- **TR-007**: All images (hero keyvisual, ROOT FURTHER logo, award card images) MUST use the Next.js `<Image>` component with responsive `sizes` and appropriate `priority` for above-the-fold images. Below-the-fold award card images MUST use lazy loading.
- **TR-008**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google`, consistent with the existing font configuration.
- **TR-009**: The page MUST achieve a Lighthouse performance score >= 85 on desktop. Hero keyvisual and first award card images MUST use `priority` loading; remaining images MUST use lazy loading.
- **TR-010**: All components MUST be compatible with the Cloudflare Workers edge runtime via OpenNext. No Node.js-only APIs in server components.
- **TR-011**: Award section element IDs MUST match the `anchor` field from the `AWARD_CATEGORIES` data constant (e.g., `id="top-talent"`, `id="top-project"`, etc.) to enable both hashtag deep linking and sidebar click-to-scroll.
- **TR-012**: The sidebar MUST use CSS `position: sticky` with an appropriate `top` value (accounting for the sticky header height) rather than JavaScript-based sticky positioning.

### Key Entities

- **User Session**: Managed by Supabase Auth via `@supabase/ssr`; stored in httpOnly cookies; required for page access; enforced by middleware.
- **Award Categories** (static data): Extended array of 6 objects from `src/data/awards.ts`, each containing `id`, `title`, `description`, `imagePath`, `anchor`, `count`, `unit`, `prizeAmount`, and `prizeNote`. Single source of truth shared between Homepage award cards and this detail page.

---

## State Management

### Local State

| State | Component | Type | Initial | Purpose |
|-------|-----------|------|---------|---------|
| activeSectionId | SidebarNavigation (client) | string | First award anchor ("top-talent") or hash from URL | Tracks the currently active/visible award section for sidebar highlighting |

### Global State

No global client-side state store is required. User session data is managed entirely by Supabase Auth via httpOnly cookies (server-side, not client-accessible). Session data needed for rendering (e.g., user role for header profile dropdown) is read server-side and passed as props to client components.

### UI States

**Default State**: All sections rendered, sidebar displays with first item ("Top Talent") active, all award cards visible in their static display state.

**Anchor Navigation State**: Page loads with a valid hash fragment. After rendering, the page scrolls to the targeted section and the sidebar updates to reflect the corresponding active item.

**Scroll-Spy Active State**: As the user scrolls through award sections, the sidebar active item transitions to match the currently visible section. Only one sidebar item is active at any time. The transition between active states uses a 150ms ease-in-out animation for text color and glow changes.

**Mobile Collapsed State** (responsive): On mobile viewports, the sidebar collapses or transforms. Award cards stack vertically in a single column. The hero and title sections adjust their typography and spacing for smaller screens.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | No API endpoints required for MVP. All content is static. | N/A |

**Note**: The Awards Information page displays entirely static content sourced from typed constants. No backend API calls are needed for the initial implementation. Authentication is enforced by middleware at the request level (Supabase session check), not by API calls within the page.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated users can access the Awards Information page without errors. Unauthenticated users are always redirected to Login.
- **SC-002**: All 6 award detail cards render with correct data (title, description, count, unit, prize amount, prize note) matching the Figma design specifications.
- **SC-003**: Clicking any sidebar navigation item smooth-scrolls to the correct corresponding award section within 500ms.
- **SC-004**: Scroll-spy correctly updates the active sidebar item to reflect the currently visible award section with < 200ms latency after the section enters the viewport.
- **SC-005**: Navigating to `/awards-information#top-project` (or any valid anchor) scrolls to the correct section and activates the correct sidebar item on initial page load.
- **SC-006**: Awards Information page achieves a Lighthouse performance score >= 85 on desktop and >= 70 on mobile.
- **SC-007**: All visual elements match the Figma design with < 5% pixel deviation at desktop (1440px) viewport.
- **SC-008**: The page is fully responsive and visually verified at mobile (375px), tablet (768px), and desktop (1280px) widths.
- **SC-009**: All interactive elements (sidebar items, Sun* Kudos CTA, header/footer links) are keyboard-accessible and meet WCAG AA contrast requirements.
- **SC-010**: The shared Header and Footer components render correctly on this page with the "Awards Information" link in its active/selected state (no component duplication between Homepage and Awards Information page).
- **SC-011**: Award data is sourced from the single shared data file (`src/data/awards.ts`), ensuring consistency between Homepage award cards and Awards Information detail cards.

---

## Out of Scope

- Award category data fetched from a database or API (initial implementation uses static typed constants)
- Individual award nomination or voting functionality
- Award winners display or announcement features
- Animated transitions between award sections on sidebar click (beyond smooth scroll)
- Print-friendly layout or PDF export of awards information
- Language selector full implementation and i18n text management (separate specification)
- Notification panel content and backend (handled by shared header, separate specification)
- Admin Dashboard and role management (handled by shared header, separate specification)
- Profile page implementation (handled by shared header, separate specification)
- Widget floating action button on this page (only specified for Homepage)
- Sun* Kudos page details and implementation (separate specification; this spec only defines the CTA navigation to it)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen specification and implementation exist (provides OAuth flow and session management)
- [x] Homepage SAA specification exists (`.momorph/specs/i87tDx10uM-HomepageSAA/spec.md`) — this page is linked from Homepage
- [x] Supabase middleware auth check configured in `src/middleware.ts` — already exists from Login/Homepage implementation
- [x] Shared Header/Footer layout components exist (`src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`) — created during Homepage implementation
- [x] Award category data constants exist (`src/data/awards.ts`) — created during Homepage implementation
- [ ] Award category data extended with detail fields (`count`, `unit`, `prizeAmount`, `prizeNote`) in `src/data/awards.ts`
- [ ] Assets downloaded from Figma: hero keyvisual background image, ROOT FURTHER logo (338x150px), 6 award detail card images (336x336px each), Sun* Kudos section background image and KUDOS logo
- [ ] Design style tokens documented (`.momorph/specs/zFYDgyj_pD-HeThongGiai/design-style.md`)

---

## Notes

- The shared Header and Footer components from the Homepage MUST be reused. The Header component should already accept a mechanism (e.g., current path prop or Next.js `usePathname()`) to determine which nav link to highlight as active. For this page, "Awards Information" should be active in both the Header and Footer.
- The award category data in `src/data/awards.ts` currently contains `id`, `title`, `description`, `imagePath`, and `anchor`. This file MUST be extended with `count` (number), `unit` (string | null), `prizeAmount` (string), and `prizeNote` (string | null) to serve the detail page. The Homepage award card component should remain unaffected by the addition of these optional fields.
- The Sun* Kudos section should be extracted as a shared component (e.g., `src/components/homepage/SunKudosSection.tsx` or `src/components/shared/SunKudosSection.tsx`) and reused on both the Homepage and the Awards Information page. If not already shared, it should be refactored during implementation.
- The sidebar scroll-spy implementation should use the Intersection Observer API rather than scroll event listeners for performance. A suggested `rootMargin` of `-20% 0px -70% 0px` or similar should be tuned to activate the sidebar item when a section enters the upper portion of the viewport.
- Award section element IDs (used for both anchor linking and scroll-spy targeting) MUST match the `anchor` field from `AWARD_CATEGORIES` in `src/data/awards.ts`. This ensures consistency between Homepage "Chi tiet" links and Awards Information page section targets.
- Assets for this page should be placed in `public/assets/awards-information/` following the convention established by the Login screen (`public/assets/login/`) and Homepage (`public/assets/homepage/`). If award card images are the same ones used on the Homepage, they may remain in `public/assets/homepage/` and be referenced from both pages.
- The hero keyvisual on this page may be the same image as the Homepage hero or a distinct one per the Figma design. Check the design file to confirm.
- Refer to `design-style.md` in this directory (when created) for all visual specifications, design tokens, color values, typography, and component-level styles extracted from the Figma design.
- Supabase SSR clients (`src/libs/supabase/client.ts`, `server.ts`, `middleware.ts`) already exist and MUST be reused.
