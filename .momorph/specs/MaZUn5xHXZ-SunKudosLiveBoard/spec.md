# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The Sun* Kudos Live Board (`/sun-kudos`) is the most complex screen in the SAA 2025 (Sun Annual Awards) platform. It is a social recognition/kudos board where employees send appreciation messages to each other. The page serves as a real-time feed of kudos posts, a spotlight visualization of the kudos network, and a personal stats dashboard.

The page is structured into four major sections stacked vertically: (A) a Hero/KV Banner with the "KUDOS" branding, a send-kudos input bar, and a search bar; (B) a Highlight Kudos carousel showcasing featured kudos posts with filterable hashtag and department dropdowns, followed by a Spotlight Board visualization showing total kudos and an interactive word cloud / network graph; (C) an All Kudos section with a two-column layout containing a left-side kudos feed with infinite scroll and a right-side stats sidebar; and the shared Header and Footer. The shared Header displays the "Sun* Kudos" nav link in its active/selected state.

The page requires authentication; unauthenticated users are redirected to the Login screen by middleware. Authenticated users can view all kudos posts, send new kudos to other employees, like existing kudos posts, copy permalinks, filter highlighted kudos, search for user profiles, view personal statistics (kudos sent/received, hearts received, secret box counts), open secret boxes, and browse the "Top 10 Sunner" leaderboard.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Kudos Feed Display (Priority: P1)

As an authenticated user visiting the Sun* Kudos page, I want to see a chronological feed of all kudos posts with sender/receiver info, messages, hashtags, images, and like counts so that I can read and appreciate the recognition culture within the company.

**Why this priority**: The kudos feed is the core content of the page. Without it, the page has no value. Every other feature depends on kudos posts being visible.

**Independent Test**: Render the page with a valid Supabase session and seeded kudos data (at least 15 posts). Verify the feed displays posts in reverse-chronological order with all card elements visible. Scroll to trigger additional loading and verify new posts appear.

**Acceptance Scenarios**:

1. **Given** an authenticated user navigates to `/sun-kudos`, **When** the page renders, **Then** the ALL KUDOS section displays a feed of kudos cards in reverse-chronological order (newest first) in the left column (680px wide).
2. **Given** the kudos feed is rendered, **When** the user views any kudos card, **Then** the card displays: sender avatar (64px round) + name + department code + badge type, a send arrow icon, receiver avatar (64px round) + name + department code + badge type, a gold divider, timestamp (gray #999999), category label, message text in a gold-bordered box (border #FFEA9E, bg rgba(255,234,158,0.4), rounded-12, text 20px dark, justify-aligned), optional image gallery (up to 5 thumbnails at 88x88px, rounded-18), hashtags in red (#D4271D), a second gold divider, and an action row with heart icon + like count and a "Copy Link" button.
3. **Given** the feed has loaded the initial batch of posts, **When** the user scrolls to the bottom of the feed, **Then** additional posts are loaded automatically (infinite scroll) or a "Load more" button is displayed for paginated loading.
4. **Given** the feed is loading additional posts, **When** the request is in progress, **Then** a loading skeleton or spinner is displayed below the last visible card.
5. **Given** no kudos posts exist in the system, **When** the page renders, **Then** the feed area displays an empty state message (e.g., "Chua co kudos nao. Hay la nguoi dau tien gui loi cam on!").
6. **Given** a kudos post has attached images, **When** the user views the card, **Then** up to 5 image thumbnails (88x88px, rounded-18) are displayed in a horizontal row below the message text.
7. **Given** an unauthenticated user attempts to access `/sun-kudos` directly, **When** middleware evaluates the request, **Then** the user is redirected to the Login screen.

---

### User Story 2 - Send Kudos (Priority: P1)

As an authenticated user, I want to click the send-kudos input bar and fill out a form/dialog to send a kudos message to another employee so that I can publicly recognize and appreciate their work.

**Why this priority**: Sending kudos is the primary write action. Without it, the board would be read-only and eventually stale. This is the core engagement mechanism.

**Independent Test**: Click the send-kudos input bar. Verify a dialog/form opens. Fill in recipient, message, hashtags, and optionally attach images. Submit and verify a new kudos post appears at the top of the feed.

**Acceptance Scenarios**:

1. **Given** the page is rendered, **When** the user clicks the send-kudos input bar ("Hom nay, ban muon gui loi cam on va ghi nhan den ai?", 738x72px pill shape), **Then** a send-kudos dialog or modal form opens.
2. **Given** the send-kudos form is open, **When** the user views the form, **Then** it contains fields for: recipient search/selection, message text area, hashtag input, image attachment (optional), and category/label selection.
3. **Given** the user is filling out the form, **When** they type in the recipient field, **Then** an autocomplete dropdown displays matching user profiles (name, avatar, department).
4. **Given** the user has filled in all required fields (recipient and message), **When** they click the submit/send button, **Then** the form submits, the dialog closes, and the new kudos post appears at the top of the ALL KUDOS feed.
5. **Given** the user submits the form, **When** the submission is in progress, **Then** the submit button enters a loading/disabled state to prevent double submission.
6. **Given** the user submits the form, **When** the server returns a validation error (e.g., empty message, invalid recipient), **Then** the form displays inline error messages next to the offending fields without closing the dialog.
7. **Given** the send-kudos form is open, **When** the user clicks outside the dialog or clicks a close/cancel button, **Then** the dialog closes without submitting.
8. **Given** the user has entered data into the form and attempts to close it, **When** the close action is triggered, **Then** a confirmation prompt asks if they want to discard unsaved changes (if content has been entered).

---

### User Story 3 - Highlight Kudos Carousel (Priority: P1)

As an authenticated user, I want to see a carousel of highlighted/featured kudos posts with filtering options so that I can browse the most noteworthy recognition within the company.

**Why this priority**: The highlight section is the first content section below the hero and serves as the primary visual showcase. It drives engagement by surfacing the best kudos posts.

**Independent Test**: Render the page with seeded highlighted kudos data. Verify the carousel displays featured cards with gold border styling. Click the next/prev arrows and verify navigation. Apply hashtag and department filters and verify the carousel updates.

**Acceptance Scenarios**:

1. **Given** the page is rendered, **When** the user views the HIGHLIGHT KUDOS section, **Then** a section header is displayed with "Sun* Annual Awards 2025" subtitle, a divider, and "HIGHLIGHT KUDOS" in 57px gold text.
2. **Given** the highlight section is rendered, **When** the user views it, **Then** a carousel of featured kudos cards is displayed with prev/next navigation arrows and a pagination indicator (e.g., "2/5").
3. **Given** the carousel is displayed, **When** the user views a featured card, **Then** the card (528px wide) is styled with a 4px gold border, #FFF8E1 background, rounded-16 corners, and contains: sender info (avatar 64px + name + dept code + badge), send arrow icon, receiver info (same structure), gold divider (#FFEA9E), timestamp, category label (e.g., "IDOL GIOI TRE"), message text in a gold-tinted box, hashtags in red (#D4271D), and an action row with "Copy Link" and "Xem chi tiet" buttons plus a heart icon with like count.
4. **Given** the carousel has multiple pages, **When** the user clicks the next arrow, **Then** the carousel transitions to the next set of cards and the pagination indicator updates (e.g., from "2/5" to "3/5").
5. **Given** the carousel is on the first page, **When** the user clicks the prev arrow, **Then** nothing happens or the carousel wraps to the last page (depending on design intent).
6. **Given** the filter dropdowns are displayed, **When** the user selects a hashtag from the "Hashtag" dropdown, **Then** the carousel updates to display only highlighted kudos matching the selected hashtag.
7. **Given** the filter dropdowns are displayed, **When** the user selects a department from the "Phong ban" dropdown, **Then** the carousel updates to display only highlighted kudos where sender or receiver belongs to the selected department.
8. **Given** both filters are applied, **When** the user views the carousel, **Then** results match both the selected hashtag AND department (intersection filter).
9. **Given** the applied filters match no results, **When** the carousel updates, **Then** an empty state message is displayed within the carousel area (e.g., "Khong tim thay kudos noi bat nao").

---

### User Story 4 - User Stats Sidebar (Priority: P2)

As an authenticated user, I want to see my personal kudos statistics in a sidebar so that I can track my recognition activity and engagement.

**Why this priority**: Personal stats drive user engagement and retention but are not essential for the core feed experience. Users can still view and send kudos without stats.

**Independent Test**: Render the page with a valid session and seeded stats data for the current user. Verify the stats box displays correct values for kudos received, sent, hearts received (with x2 multiplier badge), secret boxes opened, and secret boxes remaining.

**Acceptance Scenarios**:

1. **Given** the ALL KUDOS section is rendered, **When** the user views the right sidebar (422px wide), **Then** a stats box is displayed with dark background (#00070C), gold border (#998C5F), rounded-17 corners, and 24px padding.
2. **Given** the stats box is rendered, **When** the user views it, **Then** the following stats are displayed with labels and values: "So Kudos ban nhan duoc:" with value in 32px gold, "So Kudos ban da gui:" with value, "So tim ban nhan duoc:" with value and a x2 multiplier badge.
3. **Given** the stats box is rendered, **When** the user views below the first group of stats, **Then** a divider separates the kudos stats from secret box stats: "So Secret Box ban da mo:" with value, "So Secret Box chua mo:" with value.
4. **Given** the stats box is rendered, **When** the user views the bottom of the stats section, **Then** a gold "Mo Secret Box" button (374x60px, bg #FFEA9E, text #00101A, with gift icon) is displayed.
5. **Given** the user has unopened secret boxes (count > 0), **When** they click the "Mo Secret Box" button, **Then** a secret box opening interaction or dialog is triggered.
6. **Given** the user has zero unopened secret boxes, **When** they view the button, **Then** the "Mo Secret Box" button is disabled or displays a message indicating no boxes are available.
7. **Given** the stats API fails to load, **When** the sidebar renders, **Then** the stats box displays a graceful fallback (loading skeleton or "Unable to load stats" message) without crashing the page.

---

### User Story 5 - Spotlight Board (Priority: P2)

As an authenticated user, I want to see an interactive visualization of the total kudos network so that I can explore the connections and recognition patterns across the organization.

**Why this priority**: The spotlight board is a visually impressive feature that enhances engagement but is not required for core kudos functionality. The page is fully usable without it.

**Independent Test**: Render the page with seeded spotlight data. Verify the visualization board displays the total kudos count (e.g., "388 KUDOS"), a word cloud or network graph with avatar dots and names, and interactive controls (search bar, pan/zoom).

**Acceptance Scenarios**:

1. **Given** the page is rendered, **When** the user views the SPOTLIGHT BOARD section, **Then** a section header displays "SPOTLIGHT BOARD" in 57px gold text.
2. **Given** the spotlight section is rendered, **When** the user views the visualization area, **Then** an interactive board (1157x548px, rounded-47px, border #998C5F) is displayed with a total kudos count (e.g., "388 KUDOS" in 36px white text).
3. **Given** the visualization is rendered, **When** the user views the board, **Then** a word cloud or network graph is displayed with avatar dots and names representing users who have sent or received kudos.
4. **Given** the visualization is rendered, **When** the user types in the board search bar, **Then** the visualization highlights or focuses on the matching user within the graph.
5. **Given** the visualization is rendered, **When** the user uses pan/zoom controls, **Then** the visualization pans and zooms accordingly to explore different areas of the graph.
6. **Given** the spotlight API fails to load, **When** the section renders, **Then** a graceful fallback is displayed (e.g., a static image or "Unable to load spotlight" message) without breaking the page layout.

---

### User Story 6 - Like & Copy Link (Priority: P2)

As an authenticated user viewing a kudos post, I want to like it with a heart icon and copy a permalink so that I can show appreciation and share specific kudos with others.

**Why this priority**: Liking and sharing are secondary engagement features that enhance the social experience but are not required for core viewing or sending functionality.

**Independent Test**: Render a kudos card. Click the heart icon and verify the like count increments and the icon changes to a filled/active state. Click "Copy Link" and verify the clipboard contains the correct permalink URL.

**Acceptance Scenarios**:

1. **Given** a kudos card is displayed in the feed or carousel, **When** the user views the action row, **Then** a heart icon and like count are displayed, along with a "Copy Link" button.
2. **Given** the user has not liked a specific kudos post, **When** they click the heart icon, **Then** the like count increments by 1 and the heart icon transitions to a filled/active state (e.g., solid red or gold).
3. **Given** the user has already liked a specific kudos post, **When** they click the heart icon again, **Then** the like count decrements by 1 and the heart icon transitions back to the unfilled/inactive state (toggle behavior).
4. **Given** the user clicks the heart icon, **When** the API call is in progress, **Then** an optimistic UI update is applied immediately (count changes instantly) and is rolled back if the API call fails.
5. **Given** the user clicks "Copy Link" on a kudos card, **When** the click event fires, **Then** the permalink URL for that specific kudos post is copied to the clipboard and a brief toast/tooltip confirms the action (e.g., "Da sao chep link!").
6. **Given** the user clicks "Xem chi tiet" on a highlighted kudos card, **When** the click event fires, **Then** the user is navigated to the full detail view of that kudos post or it scrolls to the corresponding card in the ALL KUDOS feed.

---

### User Story 7 - Top 10 Leaderboard (Priority: P3)

As an authenticated user, I want to see the "10 SUNNER NHAN QUA MOI NHAT" leaderboard in the sidebar so that I can see which colleagues have recently received prizes.

**Why this priority**: The leaderboard is a supplementary engagement element. It adds social proof and gamification but the page is fully functional without it.

**Independent Test**: Render the sidebar with seeded leaderboard data. Verify the list displays up to 10 entries with avatar, name, and prize description.

**Acceptance Scenarios**:

1. **Given** the ALL KUDOS sidebar is rendered, **When** the user views below the stats box, **Then** a "10 SUNNER NHAN QUA MOI NHAT" leaderboard section is displayed with the same dark container styling (#00070C bg, #998C5F border, rounded-17).
2. **Given** the leaderboard is rendered, **When** the user views the list, **Then** up to 10 entries are visible, each showing: a user avatar (64px round), name (22px gold text), and prize description (16px white text).
3. **Given** the leaderboard has more than 5 entries, **When** the initial view renders, **Then** the first 5 entries are visible with a scroll or "show more" mechanism to reveal the rest.
4. **Given** the leaderboard API fails to load, **When** the sidebar renders, **Then** the leaderboard section displays a graceful fallback without crashing the page.

---

### User Story 8 - Search Sunner (Priority: P3)

As an authenticated user, I want to search for user profiles from the search bar in the hero section so that I can find specific colleagues and view their kudos activity.

**Why this priority**: Profile search is a convenience feature for navigation. Users can still find colleagues by scrolling the feed or using browser search.

**Independent Test**: Type a user name into the search bar. Verify an autocomplete dropdown displays matching profiles with avatar, name, and department. Click a result and verify navigation to the user's profile or filtered kudos view.

**Acceptance Scenarios**:

1. **Given** the hero section is rendered, **When** the user views the search bar, **Then** a pill-shaped search input (381x72px) with placeholder text "Tim kiem profile Sunner" is displayed.
2. **Given** the user types at least 2 characters in the search bar, **When** the input changes, **Then** an autocomplete dropdown displays matching user profiles (avatar, name, department) after a debounce delay (300ms).
3. **Given** search results are displayed, **When** the user clicks on a result, **Then** the user is navigated to the selected user's profile page or the feed is filtered to show only kudos involving that user.
4. **Given** the user types a query with no matches, **When** the autocomplete renders, **Then** an empty state message is displayed (e.g., "Khong tim thay Sunner nao").
5. **Given** the search bar has focus, **When** the user presses Escape or clicks outside, **Then** the autocomplete dropdown closes.

---

### Edge Cases

- **Empty kudos feed**: Display a friendly empty state message encouraging the user to send the first kudos. All other sections (stats, spotlight, highlights) should still render independently.
- **User sends kudos to themselves**: The API should reject self-kudos. The recipient autocomplete should either exclude the current user or the form should display a validation error.
- **Very long kudos message**: Message text should be clamped or truncated in the feed card view (e.g., max 5 lines with "Read more" expand) to prevent excessively tall cards disrupting the feed layout.
- **Images fail to load**: Image thumbnails in kudos cards MUST have descriptive `alt` attributes and display a placeholder/fallback icon if the image URL is broken.
- **User avatar not available**: Display a default avatar (initials or generic icon) when a user has no profile photo.
- **Concurrent likes**: Optimistic UI updates should handle race conditions. If a like API call fails after optimistic update, roll back the UI and show a brief error toast.
- **Network failure during send kudos**: Display an error message within the dialog without closing it, allowing the user to retry. Do not lose the user's typed content.
- **Rapid carousel navigation**: Debounce or throttle carousel prev/next clicks to prevent animation conflicts or excessive API calls.
- **Spotlight board with very few users**: The visualization should degrade gracefully with small data sets (e.g., 1-5 users) without looking broken or empty.
- **Secret box open when count is zero**: The button must be disabled or the API must return a clear error. The UI should not allow the action.
- **Session expires during interaction**: When the next API call detects an expired session, redirect to Login. Any in-progress form data is lost (warn user if possible).
- **HTML/script injection in kudos messages**: All user-generated content (messages, hashtags) MUST be sanitized and rendered as text, never as raw HTML. XSS prevention is mandatory.
- **Extremely high like counts**: Display abbreviated counts (e.g., "1.2K", "15K") for counts exceeding 999 to prevent layout overflow.
- **Multiple filter combinations yield no results**: Both highlight carousel and feed should display appropriate empty state messages.
- **Keyboard-only navigation**: All interactive elements (input bars, carousel arrows, cards, like buttons, dropdowns, dialog form) MUST be focusable and operable via keyboard (Tab, Enter, Escape).
- **Copy link on unsupported browsers**: If the Clipboard API is unavailable, fall back to a textarea-based copy method or show a manual copy prompt.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| A | Hero/KV Banner | Full-width banner area with dark background, gradient overlays, event branding | Static background, overlaid content |
| A.1 | Hero Title | "He thong ghi nhan va cam on" in 36px gold text | Static display |
| A.2 | KUDOS Logo | "KUDOS" text in SVN-Gotham 140px, beige #DBD1C1 | Static display |
| A.3 | Send Kudos Bar | Pill-shaped input bar (738x72px), placeholder: "Hom nay, ban muon gui loi cam on va ghi nhan den ai?" | Click: opens send-kudos dialog/form; hover: subtle highlight |
| A.4 | Search Bar | Pill-shaped search input (381x72px), placeholder: "Tim kiem profile Sunner" | Type: triggers autocomplete dropdown after debounce; Escape: closes dropdown |
| B | Highlight Section Header | "Sun* Annual Awards 2025" subtitle + divider + "HIGHLIGHT KUDOS" (57px gold) | Static display |
| B.1 | Hashtag Filter | Dropdown filter labeled "Hashtag" | Click: opens dropdown; select: filters carousel |
| B.2 | Department Filter | Dropdown filter labeled "Phong ban" (department) | Click: opens dropdown; select: filters carousel |
| B.3 | Highlight Carousel | Horizontal carousel of featured kudos cards with prev/next arrows | Arrow click: navigate between pages; pagination "2/5" updates |
| B.4 | Featured Kudos Card | 528px wide card with gold border (4px), bg #FFF8E1, rounded-16 | Contains sender/receiver info, message, hashtags, action buttons |
| B.4.1 | Sender Info | Avatar (64px round) + name + dept code + badge (e.g., "Rising Hero") | Static display within card |
| B.4.2 | Send Icon | Arrow icon between sender and receiver | Static display |
| B.4.3 | Receiver Info | Avatar (64px round) + name + dept code + badge | Static display within card |
| B.4.4 | Card Content | Timestamp, category label, message in gold box (border gold, bg rgba(255,234,158,0.4), rounded-12, 20px text), hashtags (#D4271D) | Static display within card |
| B.4.5 | Card Actions | "Copy Link" + "Xem chi tiet" buttons, heart icon + like count | Click: copy link / navigate to detail / toggle like |
| B.5 | Carousel Pagination | "2/5" page indicator between arrows | Updates on carousel navigation |
| B.6 | Spotlight Section Header | "SPOTLIGHT BOARD" (57px gold) | Static display |
| B.7 | Spotlight Board | Interactive visualization (1157x548px, rounded-47px, border #998C5F) | Pan, zoom, search within board |
| B.7.1 | Kudos Count | "388 KUDOS" total count (36px white) | Static display, updates on data load |
| B.7.2 | Board Visualization | Word cloud / network graph with avatar dots and names | Hover: highlight node; click: focus on user |
| B.7.3 | Board Search | Search bar within the visualization area | Type: highlights matching user in graph |
| B.7.4 | Board Controls | Pan/zoom controls | Click/drag: pan; scroll/buttons: zoom |
| C | All Kudos Section Header | "ALL KUDOS" (57px gold) | Static display |
| C.1 | Feed Layout | Two-column layout: left feed (680px) + right sidebar (422px), gap 80px | Responsive stacking on mobile |
| C.2 | Kudos Feed Card | 680px wide, bg #FFF8E1, rounded-24, padding 40px | Contains all card sub-components |
| C.2.1 | Card Sender/Receiver Row | Avatars (64px) + names + dept codes + badges, send icon between | Static display |
| C.2.2 | Card Timestamp | Timestamp in gray (#999999) | Static display |
| C.2.3 | Card Category | Category label + edit icon (for own posts) | Edit icon click: opens category edit (own posts only) |
| C.2.4 | Card Message | Gold-bordered box (border #FFEA9E, bg rgba(255,234,158,0.4), rounded-12, 20px text, justify) | Static display; long messages clamped with "Read more" |
| C.2.5 | Card Images | Up to 5 thumbnails (88x88px, rounded-18) in horizontal row | Click: opens image in lightbox/modal |
| C.2.6 | Card Hashtags | Hashtag list in red (#D4271D) | Click: filters feed by hashtag (optional) |
| C.2.7 | Card Action Row | Heart icon + like count, "Copy Link" button | Heart click: toggle like; Copy Link: copies permalink |
| D | Stats Box | 422px, bg #00070C, border #998C5F, rounded-17, padding 24px | Static display with interactive button |
| D.1 | Kudos Received Stat | "So Kudos ban nhan duoc:" + value (32px gold) | Static display |
| D.2 | Kudos Sent Stat | "So Kudos ban da gui:" + value | Static display |
| D.3 | Hearts Received Stat | "So tim ban nhan duoc:" + value + x2 multiplier badge | Static display |
| D.4 | Secret Box Opened Stat | "So Secret Box ban da mo:" + value | Static display |
| D.5 | Secret Box Remaining Stat | "So Secret Box chua mo:" + value | Static display |
| D.6 | Open Secret Box Button | Gold button (374x60px, bg #FFEA9E, text #00101A, gift icon), "Mo Secret Box" | Click: triggers secret box open; disabled when count = 0 |
| D.7 | Leaderboard Section | "10 SUNNER NHAN QUA MOI NHAT" header, same dark container styling | Static display with scroll |
| D.7.1 | Leaderboard Entry | Avatar (64px round) + name (22px gold) + prize description (16px white) | Static display; up to 10 entries, first 5 visible |
| E | Shared Header | Sticky dark navigation bar consistent with Homepage | "Sun* Kudos" nav link in active/selected state |
| F | Shared Footer | Dark footer consistent with Homepage | "Sun* Kudos" link highlighted |

### Navigation Flow

- **From**: Homepage SAA (screen `i87tDx10uM`) via header nav "Sun* Kudos" link, hero CTA "ABOUT KUDOS" button, or Kudos section "Chi tiet" button
- **From**: Awards Information page via header nav "Sun* Kudos" link
- **From**: Direct URL entry `/sun-kudos` (authenticated users only)
- **To — Send Kudos Dialog**: Via send-kudos input bar click (overlay/modal, not a page navigation)
- **To — Kudos Detail View**: Via "Xem chi tiet" button on highlight cards (scrolls to card in feed or opens detail modal)
- **To — User Profile**: Via search result click or user name click in kudos cards
- **To — Secret Box Interaction**: Via "Mo Secret Box" button click (overlay/modal)
- **To — Homepage**: Via header nav "About SAA 2025" link or SAA logo click
- **To — Awards Information**: Via header nav "Awards Information" link
- **To — Login screen**: Via profile dropdown "Sign out" (session destroyed, redirect)

### Visual Requirements

- **Responsive breakpoints**: Default mobile (< 640px), `sm` (>= 640px), `md` tablet (>= 768px), `lg` desktop (>= 1024px), `xl` large desktop (>= 1280px) -- per constitution TailwindCSS defaults
- **Animations/Transitions**: Carousel slide transition (300ms ease-in-out), heart like animation (200ms scale bounce), card hover (150ms ease-in-out subtle elevation), dialog open/close (200ms fade + slide-up), toast notification (150ms fade-in, auto-dismiss after 3 seconds), filter dropdown open (150ms fade-in), autocomplete dropdown (150ms fade-in)
- **Accessibility**: WCAG AA color contrast for all text on dark and light backgrounds; keyboard navigation for all interactive elements (Tab order: header -> hero input bars -> highlight filters -> carousel arrows -> spotlight controls -> feed cards -> sidebar -> footer); `aria-label` attributes on icon-only buttons (heart, copy, arrows, close); visible focus indicators; `aria-live="polite"` on feed updates and like count changes; dialog must trap focus when open; Escape key closes dialogs and dropdowns
- **Touch targets**: All clickable elements MUST meet minimum 44x44px touch target size on mobile per constitution
- **Color palette**: Primary gold #FFEA9E, dark background #00070C / #00101A, card background #FFF8E1, gold border #998C5F, hashtag red #D4271D, beige #DBD1C1, text gray #999999, gold divider #FFEA9E

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST require authentication. Unauthenticated users MUST be redirected to the Login screen via middleware before the page renders.
- **FR-002**: Page MUST display the shared Header with the "Sun* Kudos" nav link in its active/selected visual state.
- **FR-003**: Page MUST display the shared Footer with the "Sun* Kudos" link highlighted.
- **FR-004**: The Hero/KV Banner MUST display the title "He thong ghi nhan va cam on" (36px gold), "KUDOS" logo (SVN-Gotham 140px, beige #DBD1C1), the send-kudos input bar (738x72px pill), and the search bar (381x72px pill).
- **FR-005**: Clicking the send-kudos input bar MUST open a send-kudos dialog/form with fields for recipient selection, message text, hashtag input, image attachment, and category selection.
- **FR-006**: The send-kudos form MUST validate that recipient and message are required fields. Submitting without them MUST display inline validation errors.
- **FR-007**: Successfully submitting the send-kudos form MUST create a new kudos post via API, close the dialog, and prepend the new post to the ALL KUDOS feed.
- **FR-008**: The search bar MUST trigger an autocomplete dropdown after a 300ms debounce when the user types at least 2 characters, displaying matching user profiles (avatar, name, department).
- **FR-009**: The HIGHLIGHT KUDOS section MUST display a carousel of featured kudos cards with prev/next navigation arrows and a pagination indicator.
- **FR-010**: The HIGHLIGHT KUDOS section MUST provide "Hashtag" and "Phong ban" (department) filter dropdowns that filter the carousel content.
- **FR-011**: Highlighted kudos cards (528px wide) MUST display sender/receiver info with avatars, names, department codes, and badge types, plus message content, hashtags, timestamps, category labels, and action buttons.
- **FR-012**: The "Copy Link" button on any kudos card MUST copy the permalink URL of that specific kudos post to the clipboard and display a brief confirmation toast.
- **FR-013**: The "Xem chi tiet" button on highlighted kudos cards MUST navigate the user to the full detail view of that kudos post.
- **FR-014**: The SPOTLIGHT BOARD section MUST display an interactive visualization (1157x548px, rounded-47px, border #998C5F) showing total kudos count and a word cloud / network graph with user avatar dots and names.
- **FR-015**: The spotlight board MUST include a search bar that highlights matching users within the visualization and pan/zoom controls for navigation.
- **FR-016**: The ALL KUDOS section MUST display a two-column layout with the kudos feed (680px left) and stats sidebar (422px right) separated by an 80px gap.
- **FR-017**: The ALL KUDOS feed MUST support infinite scroll or paginated loading to display all kudos posts in reverse-chronological order.
- **FR-018**: Each kudos feed card (680px, bg #FFF8E1, rounded-24, padding 40px) MUST display sender/receiver row, gold divider, timestamp, category label, message box, optional image gallery, hashtags, second gold divider, and action row.
- **FR-019**: The heart/like button on kudos cards MUST toggle between liked and unliked states. Liking increments the count; unliking decrements it. MUST use optimistic UI updates.
- **FR-020**: The stats sidebar MUST display a stats box (#00070C bg, #998C5F border, rounded-17, 24px padding) showing: kudos received count (32px gold), kudos sent count, hearts received count (with x2 multiplier badge), secret boxes opened count, and secret boxes remaining count.
- **FR-021**: The stats sidebar MUST display a "Mo Secret Box" gold button (374x60px, #FFEA9E bg, #00101A text, gift icon) that triggers a secret box opening interaction when clicked.
- **FR-022**: The "Mo Secret Box" button MUST be disabled or show an unavailable state when the user has zero unopened secret boxes.
- **FR-023**: The sidebar MUST display a "10 SUNNER NHAN QUA MOI NHAT" leaderboard section showing up to 10 entries with avatar (64px), name (22px gold), and prize description (16px white).
- **FR-024**: All user-generated content (kudos messages, hashtags, user names) MUST be sanitized to prevent XSS attacks. Content MUST be rendered as text, never as raw HTML.
- **FR-025**: Badge types ("Rising Hero", "Legend Hero", "New Hero", "Super Hero") MUST be displayed next to user names in kudos cards based on user profile data.
- **FR-026**: Image thumbnails in kudos cards MUST be clickable to open a lightbox/modal for full-size viewing.
- **FR-027**: The feed MUST display a loading skeleton during initial data fetch and a loading indicator at the bottom during pagination/infinite scroll loading.
- **FR-028**: Filter and search states MUST be reflected in the URL query parameters to enable shareable/bookmarkable filtered views (optional, P3).

### Technical Requirements

- **TR-001**: The Sun* Kudos page (`src/app/(main)/sun-kudos/page.tsx` or equivalent) MUST be a Next.js Server Component. Authentication status MUST be verified server-side before rendering. Initial data fetching for the feed, highlights, and stats MUST occur server-side.
- **TR-002**: Interactive components (send-kudos dialog, carousel, like buttons, search autocomplete, spotlight visualization, infinite scroll, secret box) MUST be implemented as `"use client"` leaf components.
- **TR-003**: The kudos feed infinite scroll MUST use Intersection Observer API for scroll detection, not scroll event listeners, to ensure performance.
- **TR-004**: All images (user avatars, kudos image attachments, card backgrounds) MUST use the Next.js `<Image>` component with responsive `sizes` and lazy loading for below-the-fold content. Avatars should use `priority` only in the hero section.
- **TR-005**: The send-kudos form MUST use React 19 `useActionState` (or equivalent server action pattern) for form submission with proper loading and error states.
- **TR-006**: The spotlight board visualization SHOULD use a lightweight client-side rendering library (e.g., D3.js, vis.js, or Canvas API) for the network graph. The visualization MUST NOT block the main thread during rendering.
- **TR-007**: API calls for feed pagination MUST include cursor-based pagination (using post ID or timestamp) rather than offset-based pagination to handle new posts being added during browsing.
- **TR-008**: The like/unlike action MUST implement optimistic UI updates: update the UI immediately, send the API request, and roll back on failure.
- **TR-009**: Fonts MUST be loaded via `next/font/google` (Montserrat, Montserrat Alternates) and `next/font/local` for SVN-Gotham (KUDOS logo text).
- **TR-010**: All components MUST be compatible with the Cloudflare Workers edge runtime via OpenNext. No Node.js-only APIs in server components or API routes.
- **TR-011**: Authentication MUST be enforced via `src/middleware.ts` using the existing Supabase middleware pattern. The middleware MUST check for a valid session and redirect unauthenticated requests to `/login`.
- **TR-012**: The Header and Footer MUST reuse the shared layout components from `src/components/layout/`. The Header MUST accept a prop or use route matching to determine the active nav link.
- **TR-013**: Kudos data types and interfaces MUST be defined in `src/types/kudos.ts` (or similar) and shared across all components that consume kudos data.
- **TR-014**: The autocomplete search MUST implement debouncing (300ms) on the client side to prevent excessive API calls during typing.
- **TR-015**: Image uploads in the send-kudos form MUST validate file type (JPEG, PNG, GIF, WebP only) and file size (max 5MB per image, max 5 images per post) before upload.
- **TR-016**: The page MUST achieve a Lighthouse performance score >= 80 on desktop. Above-the-fold content (hero, highlight section headers) MUST be server-rendered. Below-the-fold sections (spotlight, all kudos feed) MAY use client-side data fetching with loading states.
- **TR-017**: Clipboard operations for "Copy Link" MUST use the Clipboard API (`navigator.clipboard.writeText()`) with a fallback for unsupported browsers.
- **TR-018**: The carousel MUST support touch swipe gestures on mobile devices in addition to arrow button navigation.

### Key Entities

- **Kudos Post**: The central data entity. Contains `id` (UUID), `sender_id` (FK to User), `receiver_id` (FK to User), `message` (text, required), `category` (string, e.g., "IDOL GIOI TRE"), `hashtags` (string array), `image_urls` (string array, max 5), `is_highlighted` (boolean), `like_count` (integer, default 0), `created_at` (timestamp), `updated_at` (timestamp). Relationships: belongs to sender (User), belongs to receiver (User), has many likes (KudosLike).

- **User**: Represents a platform user/employee. Contains `id` (UUID, from Supabase Auth), `email` (string), `full_name` (string), `avatar_url` (string, nullable), `department_code` (string), `department_name` (string), `badge_type` (enum: "Rising Hero" | "Legend Hero" | "New Hero" | "Super Hero" | null), `created_at` (timestamp). Source: Supabase Auth user metadata extended with a `profiles` table in Supabase DB.

- **UserStats**: Aggregated statistics for a specific user. Contains `user_id` (FK to User), `kudos_received_count` (integer), `kudos_sent_count` (integer), `hearts_received_count` (integer), `hearts_multiplier` (integer, e.g., 2), `secret_boxes_opened` (integer), `secret_boxes_remaining` (integer). May be computed on-the-fly or stored as a materialized view.

- **SecretBox**: Represents an openable reward box. Contains `id` (UUID), `user_id` (FK to User), `is_opened` (boolean, default false), `prize_description` (string, nullable, populated on open), `opened_at` (timestamp, nullable). Relationship: belongs to User.

- **Hashtag**: Represents a tag used in kudos posts. Contains `id` (UUID), `name` (string, unique, e.g., "#teamwork"), `usage_count` (integer). Used for filtering in the highlight carousel and for display in kudos cards. May be normalized into a separate table or stored as a string array on KudosPost.

- **KudosLike**: Join table for like relationships. Contains `id` (UUID), `kudos_id` (FK to KudosPost), `user_id` (FK to User), `created_at` (timestamp). Unique constraint on (kudos_id, user_id) to prevent duplicate likes.

- **LeaderboardEntry**: Represents a recent prize recipient. Contains `user_id` (FK to User), `prize_description` (string), `awarded_at` (timestamp). Used for the "10 SUNNER NHAN QUA MOI NHAT" sidebar section.

---

## State Management

### Local State

| State | Component | Type | Initial | Purpose |
|-------|-----------|------|---------|---------|
| isSendDialogOpen | HeroSection / SendKudosBar | boolean | false | Controls send-kudos dialog visibility |
| formData | SendKudosDialog | object | { recipient: null, message: "", hashtags: [], images: [], category: "" } | Tracks form field values |
| formErrors | SendKudosDialog | object | {} | Tracks per-field validation errors |
| isSubmitting | SendKudosDialog | boolean | false | Tracks form submission in progress |
| recipientQuery | SendKudosDialog | string | "" | Tracks autocomplete search input for recipient |
| recipientResults | SendKudosDialog | User[] | [] | Stores autocomplete search results |
| searchQuery | SearchBar | string | "" | Tracks hero search bar input |
| searchResults | SearchBar | User[] | [] | Stores search autocomplete results |
| isSearchOpen | SearchBar | boolean | false | Controls search dropdown visibility |
| carouselPage | HighlightCarousel | number | 1 | Current page of the highlight carousel |
| carouselTotalPages | HighlightCarousel | number | 1 | Total pages in the carousel |
| selectedHashtag | HighlightFilters | string or null | null | Currently selected hashtag filter |
| selectedDepartment | HighlightFilters | string or null | null | Currently selected department filter |
| kudosFeed | KudosFeedContainer | KudosPost[] | [] (server-rendered initial) | List of loaded kudos posts for the feed |
| feedCursor | KudosFeedContainer | string or null | null | Cursor for next page of feed pagination |
| hasMorePosts | KudosFeedContainer | boolean | true | Whether more posts are available to load |
| isFeedLoading | KudosFeedContainer | boolean | false | Tracks feed pagination loading state |
| likedPosts | KudosFeedContainer | Set<string> | new Set() | Set of kudos IDs the current user has liked |
| userStats | StatsSidebar | UserStats or null | null (server-rendered) | Current user's stats data |
| isSecretBoxOpening | StatsSidebar | boolean | false | Tracks secret box open action in progress |
| spotlightData | SpotlightBoard | object or null | null | Visualization data for the spotlight graph |
| isSpotlightLoading | SpotlightBoard | boolean | true | Tracks spotlight data loading state |

### Global State

No global client-side state store (e.g., Zustand, Redux) is required for the initial implementation. User session data is managed entirely by Supabase Auth via httpOnly cookies (server-side, not client-accessible). Session data needed for rendering (e.g., user ID for determining "liked" state, user role for edit icon visibility) is read server-side and passed as props to client components.

If real-time updates are added in a future iteration (Supabase Realtime for live feed updates), a lightweight state management solution may be introduced to coordinate between feed components.

### UI States

**Default State**: Page fully rendered with hero, highlight carousel on page 1, spotlight board loaded, ALL KUDOS feed with initial posts, stats sidebar with current user data, leaderboard populated. All dialogs/dropdowns closed.

**Send Kudos Dialog Open State**: Modal overlay displayed with form fields. Background content is dimmed (backdrop). Focus is trapped within the dialog. Escape key or close button dismisses the dialog.

**Feed Loading State**: Initial page load shows server-rendered content. When scrolling triggers infinite scroll, a loading skeleton or spinner appears below the last visible card until new data arrives.

**Feed Empty State**: If no kudos posts exist, a centered empty state message is displayed in the feed area with an illustration or icon and CTA text encouraging the user to send the first kudos.

**Like Toggle States**: Heart icon toggles between outlined (unliked) and filled (liked) with a brief scale animation (200ms). Like count updates optimistically.

**Filter Applied State**: When hashtag or department filters are active, the corresponding dropdown displays the selected value. The carousel content updates to show only matching highlighted kudos. A "clear filter" affordance is available.

**Search Active State**: When the search bar has focus and input, the autocomplete dropdown is visible below the input. Selecting a result navigates away; pressing Escape or blurring closes the dropdown.

**Error States**:
- Send kudos form: Inline field-level error messages in red below the offending field.
- Feed load failure: Error message with retry button replaces the loading skeleton.
- Stats load failure: Stats box shows "Unable to load stats" with retry option.
- Like failure: Optimistic update rolled back; brief error toast displayed.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | GET | Fetch paginated kudos feed (cursor-based). Query params: `cursor`, `limit`, `hashtag`, `user_id` | New (predicted) |
| /api/kudos | POST | Create a new kudos post. Body: `receiver_id`, `message`, `category`, `hashtags`, `image_urls` | New (predicted) |
| /api/kudos/highlights | GET | Fetch highlighted/featured kudos for the carousel. Query params: `hashtag`, `department`, `page`, `limit` | New (predicted) |
| /api/kudos/stats | GET | Fetch the authenticated user's personal stats (kudos received/sent, hearts, secret boxes) | New (predicted) |
| /api/kudos/:id/like | POST | Like a specific kudos post. Returns updated like count | New (predicted) |
| /api/kudos/:id/like | DELETE | Unlike a specific kudos post. Returns updated like count | New (predicted) |
| /api/kudos/spotlight | GET | Fetch spotlight board data (total count, user nodes, connections for visualization) | New (predicted) |
| /api/secret-box/open | POST | Open a secret box for the authenticated user. Returns prize description and updated counts | New (predicted) |
| /api/sunner-leaderboard | GET | Fetch the top 10 most recent prize recipients. Returns array of user + prize entries | New (predicted) |
| /api/users/search | GET | Search for users by name. Query params: `q` (search term), `limit`. Returns matching user profiles | New (predicted) |
| /api/kudos/upload-image | POST | Upload an image attachment for a kudos post. Accepts multipart/form-data. Returns image URL | New (predicted) |
| Supabase session refresh | -- | Handled automatically by `@supabase/ssr` middleware on each request | Exists (middleware) |

**Notes on API Design**:
- All endpoints require a valid Supabase session (authenticated requests only). The session token is passed via httpOnly cookies.
- The `GET /api/kudos` endpoint uses cursor-based pagination with the `cursor` parameter being the `id` or `created_at` of the last loaded post. Default `limit` is 10.
- The `POST /api/kudos` endpoint should validate: `receiver_id` exists and is not the sender, `message` is non-empty (max 2000 characters), `hashtags` array max 10 items, `image_urls` array max 5 items.
- Image upload (`/api/kudos/upload-image`) returns a Supabase Storage public URL that is then included in the `image_urls` array of the kudos post creation request.
- The spotlight data endpoint may return a simplified graph structure: `{ total_kudos: number, nodes: [{ user_id, name, avatar_url, x, y }], edges: [{ from_user_id, to_user_id, weight }] }`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated users can view the Sun* Kudos page without errors. Unauthenticated users are always redirected to Login.
- **SC-002**: Users can successfully create a new kudos post via the send-kudos dialog, and the new post appears in the feed within 2 seconds of submission.
- **SC-003**: The kudos feed loads the initial batch of posts within 3 seconds on a 4G connection and supports infinite scroll loading of additional batches.
- **SC-004**: The highlight carousel displays filtered results within 1 second of filter selection and supports smooth navigation between pages.
- **SC-005**: Like/unlike actions reflect in the UI within 200ms (optimistic update) and are persisted to the backend within 2 seconds.
- **SC-006**: The spotlight board visualization renders within 5 seconds and supports interactive pan/zoom/search without frame drops below 30fps.
- **SC-007**: All visual elements match the Figma design with < 5% pixel deviation at desktop (1440px) viewport.
- **SC-008**: The page is fully responsive and visually verified at mobile (375px), tablet (768px), and desktop (1280px) widths. On mobile, the two-column ALL KUDOS layout stacks vertically (sidebar below feed).
- **SC-009**: All interactive elements are keyboard-accessible and meet WCAG AA contrast requirements.
- **SC-010**: Zero XSS vulnerabilities: all user-generated content is rendered as sanitized text, never as raw HTML.
- **SC-011**: Zero authentication tokens or session data exposed in client-side JavaScript, localStorage, or URL parameters (OWASP compliance).
- **SC-012**: Page achieves a Lighthouse performance score >= 80 on desktop and >= 65 on mobile.
- **SC-013**: The send-kudos dialog validates all inputs and prevents submission of invalid data (empty message, self-kudos, oversized images).

---

## Out of Scope

- Real-time live feed updates via WebSocket or Supabase Realtime (initial implementation uses manual refresh or periodic polling)
- Kudos post editing or deletion by the sender (only category edit icon is shown per design; full edit/delete is deferred)
- Comment/reply threads on kudos posts (not present in the Figma design)
- User profile page implementation (this spec defines navigation to it via search results and card name clicks)
- Admin moderation tools for kudos posts (e.g., flagging, removing inappropriate content)
- Push notifications for received kudos
- Advanced analytics or reporting on kudos trends
- Gamification beyond badge display and secret boxes (e.g., points system, achievements)
- Internationalization/i18n for kudos page content (initial implementation is Vietnamese only)
- Dark/light theme toggle (the page uses a fixed dark theme)
- Secret box prize fulfillment or inventory management (this spec only covers the "open" interaction)
- Full leaderboard page with all recipients (this spec covers only the sidebar widget showing top 10)
- Language dropdown implementation details (separate specification, screen `hUyaaugye2`)
- Notification panel implementation (defined in Homepage specification)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen specification exists (`.momorph/specs/GzbNeVGJHz-Login/spec.md`)
- [x] Login screen implemented (provides OAuth flow and session management)
- [x] Homepage specification exists (`.momorph/specs/i87tDx10uM-HomepageSAA/spec.md`)
- [x] Supabase middleware auth check configured in `src/middleware.ts`
- [x] Shared Header/Footer layout components available (from Homepage implementation)
- [ ] Supabase database tables created: `kudos_posts`, `kudos_likes`, `user_profiles` (extended), `secret_boxes`, `hashtags` (optional), `leaderboard_entries`
- [ ] API route handlers implemented for all predicted endpoints (see API Dependencies section)
- [ ] Supabase Storage bucket configured for kudos image uploads
- [ ] Assets downloaded from Figma: hero background/keyvisual image, KUDOS logo image or SVN-Gotham font file, badge icons (Rising Hero, Legend Hero, New Hero, Super Hero), gift icon for Secret Box button, send arrow icon, heart icon (filled/unfilled), copy link icon, carousel arrow icons, search icon, pan/zoom control icons
- [ ] SVN-Gotham font file available for local loading via `next/font/local`
- [ ] Spotlight visualization library selected and installed (e.g., D3.js, vis.js, or custom Canvas implementation)
- [ ] Test data seeded in Supabase for development: at least 20 kudos posts, 10 users with varied departments and badge types, 5 highlighted posts, 5 secret boxes, 10 leaderboard entries

---

## Notes

- This is the most complex screen in the SAA 2025 platform due to the combination of: real-time-like feed with infinite scroll, a send/create form with file uploads, interactive visualization, multiple filter mechanisms, optimistic UI updates for likes, and a sidebar with dynamic stats. Implementation should be phased: Phase 1 (P1) focuses on feed display and send kudos; Phase 2 (P2) adds stats, spotlight, and like/copy; Phase 3 (P3) adds leaderboard and search.
- The SVN-Gotham font is used exclusively for the "KUDOS" logo text (140px, beige #DBD1C1). This font is not available on Google Fonts and MUST be loaded via `next/font/local` from a font file placed in the project (e.g., `public/fonts/SVNGotham.woff2`).
- Badge types (Rising Hero, Legend Hero, New Hero, Super Hero) appear to be assigned per user profile, not per kudos post. The badge should be stored in the user's profile data and displayed consistently across all their kudos posts.
- The x2 multiplier badge on "hearts received" in the stats sidebar suggests a multiplier mechanic where certain conditions (e.g., highlighted posts, specific events) double the heart value. The exact business logic should be clarified with the product team; the frontend should display whatever multiplier value the API returns.
- The spotlight board visualization is the most technically challenging component. Consider using D3.js force-directed graph for the network layout, with avatar images as node representations. The visualization should be lazy-loaded as a client component to avoid impacting initial page load performance.
- For the initial implementation, the spotlight board search and pan/zoom can be simplified. A basic Canvas or SVG-based rendering with click-to-zoom on nodes is acceptable for MVP.
- Cursor-based pagination for the kudos feed is strongly recommended over offset-based pagination because new posts are frequently added to the top of the feed. Offset pagination would cause duplicate posts when new items are inserted.
- The send-kudos form image upload flow: (1) User selects images in the form, (2) images are uploaded to Supabase Storage via `/api/kudos/upload-image` immediately (with progress indicators), (3) returned URLs are stored in local state, (4) on form submit, the URLs are included in the `POST /api/kudos` request body. This avoids sending large files in the main form submission.
- The carousel component should consider using a library like Embla Carousel or Swiper for robust touch support, RTL support, and accessibility. Alternatively, a custom implementation using CSS scroll-snap is viable for simpler requirements.
- Assets should be placed in `public/assets/sun-kudos/` following the convention established by other screens.
- Supabase SSR clients (`src/libs/supabase/client.ts`, `server.ts`, `middleware.ts`) already exist from previous implementations and MUST be reused.
- The "edit icon" next to the category label on kudos cards is only visible on posts where the current user is the sender. This requires comparing the `sender_id` with the authenticated user's ID.
- Refer to `design-style.md` in this directory (when created) for all visual specifications, design tokens, color values, typography, and component-level styles extracted from the Figma design.
