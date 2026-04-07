# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-06
**Status**: Draft

---

## Overview

The Login screen is the entry point of the SAA 2025 (Sun Annual Awards) platform for unauthenticated users. It presents a full-bleed dark-themed hero layout featuring event branding ("ROOT FURTHER"), a Vietnamese invitation message, and a single "LOGIN With Google" call-to-action button. Authentication is handled exclusively via Supabase Auth with Google OAuth (PKCE flow). On successful login, users are redirected to the Homepage SAA. The screen includes a persistent header with the SAA 2025 logo and a language selector, and a footer displaying copyright information.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Google OAuth Login (Priority: P1)

As an unauthenticated user visiting the SAA 2025 platform, I want to log in with my Google account so that I can access the awards platform features.

**Why this priority**: This is the core and only authentication mechanism. Without it, no user can access the application. It is the MVP.

**Independent Test**: Deploy the login page in isolation; clicking the button must complete the full OAuth round-trip and result in a valid Supabase session with redirect to the Homepage.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user is on the Login screen, **When** they click "LOGIN With Google", **Then** the system redirects them to Google's OAuth consent screen.
2. **Given** the user grants consent on Google's OAuth screen, **When** Google redirects back to the callback URL, **Then** the server creates a Supabase session with httpOnly cookies and redirects the user to the Homepage SAA.
3. **Given** the user denies consent on Google's OAuth screen, **When** Google redirects back with an error, **Then** the user is returned to the Login screen and a user-friendly error message is displayed (no stack traces or internal details).
4. **Given** a user who is already authenticated visits the Login screen URL, **When** the page loads, **Then** they are automatically redirected to the Homepage SAA without needing to re-login.

---

### User Story 2 - Login Screen Visual Presentation (Priority: P1)

As an unauthenticated user navigating to the application root, I want to see a visually compelling Login screen with clear branding and a prominent login button so that I understand the platform identity and know how to proceed.

**Why this priority**: Visual fidelity to the Figma design is essential for the first user impression and is required alongside the login functionality for a complete P1 delivery.

**Independent Test**: Render the page without active Supabase connectivity. Verify all visual elements are present, correctly positioned, and match the Figma design at desktop (1440px), tablet (768px), and mobile (375px) viewports.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user loads the Login page, **When** the page renders, **Then** the background key visual image is displayed full-bleed with left-to-right and bottom-to-top gradient overlays creating the dark atmosphere.
2. **Given** the page has rendered, **When** the user views the header, **Then** the SAA 2025 logo (52x48px) appears at the left and the language selector ("VN" with flag icon and chevron) appears at the right, on a semi-transparent dark background.
3. **Given** the page has rendered, **When** the user views the hero section, **Then** the "ROOT FURTHER" logo image (451x200px), Vietnamese invitation text ("Bắt đầu hành trình của bạn cùng SAA 2025. Đăng nhập để khám phá!"), and golden "LOGIN With Google" button (305x60px, #FFEA9E) are displayed with correct styling per design-style.md.
4. **Given** the page has rendered, **When** the user views the footer, **Then** the copyright text "Bản quyền thuộc về Sun* © 2025" is centered with a top border separator (#2E3940).

---

### User Story 3 - Language Selector Interaction (Priority: P2)

As a user on the Login screen, I want to click the language selector to switch between supported languages so that I can use the platform in my preferred language.

**Why this priority**: Internationalization is important but not required for the core login flow. It can be implemented after login functionality works.

**Independent Test**: Click the language selector and verify the dropdown appears. Select a language and verify the UI text updates accordingly.

**Acceptance Scenarios**:

1. **Given** the Login page is displayed, **When** the user clicks the language selector ("VN" with flag and chevron), **Then** a dropdown overlay appears with available language options (linked to screen `hUyaaugye2`).
2. **Given** the language dropdown is open, **When** the user selects a different language, **Then** the dropdown closes and the page text updates to the selected language.
3. **Given** the language dropdown is open, **When** the user clicks outside the dropdown, **Then** the dropdown closes without changing the language.

---

### User Story 4 - Login Button Interaction States (Priority: P2)

As a user interacting with the Login button, I want visual feedback on hover and a loading state after clicking so that I understand the system is responding to my action.

**Why this priority**: Interaction states improve UX polish but the login still functions without them.

**Independent Test**: Hover over the button and verify visual change. Click the button and verify it enters a disabled/loading state.

**Acceptance Scenarios**:

1. **Given** the Login page is displayed, **When** the user hovers over the "LOGIN With Google" button, **Then** the button displays a lift effect (translateY -2px) with a shadow (0 4px 12px rgba(0,0,0,0.3)).
2. **Given** the user clicks the "LOGIN With Google" button, **When** the OAuth flow is being initiated, **Then** the button becomes disabled (opacity 0.7, cursor not-allowed), the button text changes to "Logging in..." with a spinner replacing the Google icon, preventing double-clicks.
3. **Given** the OAuth redirect is in progress, **When** the user attempts to click the button again, **Then** nothing happens (button is disabled and non-interactive).

---

### Edge Cases

- What happens when the Supabase service is unreachable? Display a user-friendly error message; never expose stack traces or internal details (OWASP compliance).
- What happens when the OAuth callback returns with an invalid or expired state parameter? Redirect back to the Login screen with an error indication.
- What happens when cookies are disabled in the browser? The `@supabase/ssr` session relies on cookies; detect and show a warning message.
- What happens when the background key visual image fails to load? The dark fallback background (#00101A) MUST still render so text and button remain visible.
- What happens when the user navigates directly to the callback URL without initiating login? Handle missing state gracefully and redirect to Login.
- What happens on very slow connections? The loading state on the button persists; implement a reasonable timeout with error feedback.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| A_Header | Semi-transparent header bar (rgba(11,15,18,0.8)), 80px height | Fixed/sticky at top, overlays background |
| A.1 SAA Logo | SAA 2025 event logo, 52x48px, at left | Static display, no click action |
| A.2 Language Selector | "VN" + Vietnam flag + chevron down, 108x56px, at right | Click: opens language dropdown (screen hUyaaugye2); Hover: highlight |
| C_Keyvisual | Full-bleed background artwork image | Static, behind all content |
| Gradient Left | Left-to-right gradient overlay (#00101A → transparent) | Static overlay for text readability |
| Gradient Bottom | Bottom-to-top gradient overlay (#00101A → transparent) | Static overlay for text readability |
| B.1 Key Visual Logo | "ROOT FURTHER" branding image, 451x200px | Static display |
| B.2 Content Text | Vietnamese invitation text, Montserrat 20px bold white | Static display |
| B.3 Login Button | "LOGIN With Google" + Google icon, 305x60px, golden #FFEA9E | Click: initiates OAuth; Hover: lift/shadow; Disabled during loading |
| D_Footer | Copyright bar, border-top 1px solid #2E3940 | Static display, always at bottom |

### Navigation Flow

- **From**: Direct URL entry, or middleware redirect from any protected route (unauthenticated users are redirected here)
- **To (success)**: Homepage SAA (screen `i87tDx10uM`) — after successful Google OAuth callback
- **To (language)**: Language dropdown overlay (screen `hUyaaugye2`) — from language selector click
- **Triggers**: Click "LOGIN With Google" button initiates OAuth flow; successful callback completes redirect

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 640px), sm (>= 640px), md/tablet (>= 768px), lg/desktop (>= 1024px), xl (>= 1280px) — following TailwindCSS defaults per constitution
- **Animations/Transitions**: Button hover (lift + shadow, 150ms ease-in-out), button disabled transition (opacity, 150ms), language chevron rotation (150ms)
- **Accessibility**: WCAG AA color contrast (white on dark = 19.5:1, dark on gold = 13.8:1 — both exceed AAA); keyboard-navigable button and language selector; `aria-label` on login button; visible focus indicators on dark background; screen reader support

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users exclusively via Supabase Auth Google OAuth provider (PKCE flow).
- **FR-002**: System MUST redirect unauthenticated users to the Login screen when they attempt to access any protected route.
- **FR-003**: System MUST redirect already-authenticated users from the Login screen to the Homepage SAA automatically.
- **FR-004**: System MUST handle the OAuth callback by exchanging the authorization code for a session using `@supabase/ssr` with httpOnly cookies.
- **FR-005**: System MUST display an inline error banner above the Login button if the OAuth flow fails (user denies consent, network error, invalid callback). The banner MUST auto-dismiss after 8 seconds. Error messages MUST NOT expose internal system details.
- **FR-006**: System MUST render the Login screen with all visual elements matching the Figma design (header, background with gradients, hero content, footer).
- **FR-007**: The "LOGIN With Google" button MUST enter a disabled/loading state after being clicked to prevent duplicate OAuth initiations.
- **FR-008**: The language selector MUST open the language dropdown overlay when clicked.

### Technical Requirements

- **TR-001**: The Login page MUST load within 3 seconds on a 3G connection (background image optimized with Next.js `<Image>`).
- **TR-002**: All authentication tokens MUST be stored in httpOnly cookies via `@supabase/ssr`. Tokens MUST NOT be exposed in client-side JavaScript, localStorage, or URLs (OWASP compliance).
- **TR-003**: The Login page MUST be a Next.js Server Component at the page level, with client interactivity (button click handler, language selector) isolated to `"use client"` leaf components.
- **TR-004**: The OAuth callback API route MUST be compatible with Cloudflare Workers edge runtime (no Node.js-only APIs).
- **TR-005**: The background key visual image MUST use Next.js `<Image>` component with `priority` loading and responsive `sizes`.
- **TR-006**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google` for optimal performance.
- **TR-007**: Middleware (`src/middleware.ts` using `src/libs/supabase/middleware.ts`) MUST check session status to redirect authenticated users away from login and unauthenticated users away from protected pages.

### Key Entities *(if feature involves data)*

- **User Session**: Managed by Supabase Auth via `@supabase/ssr`; stored in httpOnly cookies; contains user ID, email, access token, refresh token.
- **OAuth State**: PKCE code verifier/challenge pair managed by Supabase SDK during the OAuth flow.

---

## State Management

### Local State (LoginButton — `"use client"` component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isLoading | boolean | false | Tracks OAuth initiation in progress |

### Error Communication

OAuth errors are communicated via URL search parameters. When the
`/auth/callback` route encounters a failure (denied consent, invalid state,
network error), it redirects back to the Login page with an `error` query
parameter (e.g., `/login?error=access_denied`). The Login page (Server
Component) reads `searchParams.error` and passes the error message as a
prop to the client-side `LoginButton` component, which renders the inline
error banner. This avoids the need for client-side error state management
for OAuth failures.

### Global State

No global state is required for this screen. User session is managed entirely
by Supabase Auth via httpOnly cookies (server-side, not client-accessible).

### UI States

**Default State**: Login button active, all visual elements rendered.

**Loading State** (after button click):
- Login button: opacity 0.7, cursor not-allowed, pointer-events none
- Button text changes to "Logging in..." with a small spinner icon replacing the Google icon
- All other elements remain unchanged

**Error State** (OAuth failure, Supabase unreachable, denied consent):
- An inline error banner appears above the Login button within the hero section
- Banner style: background rgba(239,68,68,0.15), border 1px solid #EF4444, border-radius 8px, padding 12px 16px
- Error text: Montserrat 14px, weight 500, color #FCA5A5 (light red on dark bg)
- Example messages: "Đăng nhập không thành công. Vui lòng thử lại." / "Không thể kết nối. Vui lòng kiểm tra mạng."
- Error banner auto-dismisses after 8 seconds or on button re-click
- Login button returns to default state when error is shown

**Success State**: User is immediately redirected to Homepage SAA — no success
message is shown on the Login screen itself.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /auth/login | GET | Server action or route handler that initiates Supabase Google OAuth (`supabase.auth.signInWithOAuth`) and redirects to Google | New (predicted) |
| /auth/callback | GET | Handles Google OAuth redirect; exchanges authorization code for session via `supabase.auth.exchangeCodeForSession(code)` | New (predicted) |
| Supabase /auth/v1/authorize | GET | External: Supabase OAuth initiation endpoint | Exists (Supabase managed) |
| Supabase /auth/v1/token | POST | External: Supabase token exchange endpoint | Exists (Supabase managed) |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Google OAuth login attempts complete successfully (valid session created) when user grants consent.
- **SC-002**: Login page achieves Lighthouse performance score >= 90 on desktop and >= 75 on mobile.
- **SC-003**: All visual elements match Figma design with < 5% pixel deviation at desktop (1440px) viewport.
- **SC-004**: Unauthenticated users are always redirected to Login; authenticated users never see the Login screen.
- **SC-005**: Zero authentication tokens exposed in client-side JavaScript, localStorage, or URL parameters (verified via browser DevTools).

---

## Out of Scope

- Email/password login (only Google OAuth is supported per design)
- User registration separate from Google OAuth (sign-up happens automatically on first Google login via Supabase)
- Language dropdown implementation details (screen `hUyaaugye2` — separate specification)
- Homepage SAA implementation (screen `i87tDx10uM` — separate specification)
- Password reset flow (not applicable for OAuth-only authentication)
- User profile management
- Admin authentication or role-based access control beyond basic authenticated/unauthenticated

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — auth endpoints defined in this spec as predicted
- [ ] Database design completed (`.momorph/database.sql`) — Supabase Auth manages user table internally
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`) — created alongside this spec

---

## Notes

- The current `src/app/layout.tsx` uses Geist font. It MUST be updated to include Montserrat and Montserrat Alternates via `next/font/google`.
- No root-level `src/middleware.ts` exists yet. A new file is needed that imports from `src/libs/supabase/middleware.ts` and implements auth redirect logic.
- The `src/app/page.tsx` currently contains Next.js boilerplate. The login page will use a route group `(auth)/login/page.tsx` per the constitution's folder structure, with the root page handling redirect logic.
- Assets (SAA logo PNG, ROOT FURTHER logo PNG, Google icon SVG, VN flag SVG, background keyvisual) need to be downloaded from Figma and placed in `public/assets/login/` per the frontend guideline naming convention.
- Given the constitution requires Server Components as default, the page itself MUST be a Server Component that checks auth status. The interactive login button and language selector MUST be separate `"use client"` components.
- Refer to `design-style.md` in this directory for all visual specifications, design tokens, and component styles.
- Supabase SSR clients already exist in `src/libs/supabase/` (client.ts, server.ts, middleware.ts) and MUST be reused.
