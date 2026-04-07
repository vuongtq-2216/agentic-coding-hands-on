# Implementation Plan: Login

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-06
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`

---

## Summary

Implement the Login screen as the app entry point for unauthenticated users. The screen displays a full-bleed dark hero layout with SAA 2025 branding and a "LOGIN With Google" button. Authentication uses Supabase Auth Google OAuth (PKCE flow) with httpOnly cookies via `@supabase/ssr`. Next.js middleware enforces auth redirects. All UI follows the Figma design-style.md specifications with responsive breakpoints.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: N/A (Supabase Auth manages user table internally)
**Testing**: To be configured (Vitest recommended for unit/integration)
**State Management**: Local state only (isLoading in client component); session via httpOnly cookies
**API Style**: Next.js Route Handlers + Server Actions

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — PascalCase components, camelCase functions, `@/*` path alias
- [x] Uses approved libraries and patterns — Supabase Auth, TailwindCSS, next/font/google, Next.js Image
- [x] Adheres to folder structure guidelines — `(auth)/login/`, `components/`, `libs/supabase/`
- [x] Meets security requirements — httpOnly cookies, PKCE flow, no token exposure, OWASP error handling
- [x] Follows testing standards — TDD planned, acceptance tests defined in spec

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| No test framework installed yet | Must add Vitest before Phase 2 implementation | Jest (heavier, less ESM-friendly) |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based. Login-specific components in `src/components/login/`, shared UI in `src/components/ui/`
- **Styling Strategy**: TailwindCSS v4 utilities with design tokens as CSS variables in `globals.css`. Responsive via mobile-first Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Data Fetching**: Server Component reads auth session at page level. No client-side data fetching needed — OAuth is a redirect-based flow
- **Server vs Client boundary**:
  - `page.tsx` = Server Component (reads searchParams for errors, checks auth session)
  - `LoginButton.tsx` = `"use client"` (handles click → server action, loading state)
  - `LanguageSelector.tsx` = `"use client"` (handles dropdown toggle, placeholder for P2)

### Backend Approach

- **API Design**: Server Action for initiation + Route Handler for callback
  - **Login initiation**: Server Action in `src/app/(auth)/login/actions.ts` — calls `supabase.auth.signInWithOAuth({ provider: 'google' })` server-side and redirects to the returned URL. Server Action is preferred over a separate route handler because it's simpler, co-located with the page, and avoids an extra HTTP round-trip
  - **OAuth callback**: Route Handler at `GET /auth/callback` (`src/app/auth/callback/route.ts`) — exchanges the auth code for a session via `supabase.auth.exchangeCodeForSession(code)` and redirects to homepage. Must be a Route Handler because Google redirects to this URL externally
- **Auth Strategy**: Supabase OAuth PKCE flow. The `signInWithOAuth` call generates a PKCE code verifier stored in cookies, and `exchangeCodeForSession` completes the exchange
- **Middleware**: New `src/middleware.ts` using existing `src/libs/supabase/middleware.ts` pattern to:
  1. Refresh expired sessions on every request
  2. Redirect unauthenticated users to `/login` for protected routes
  3. Redirect authenticated users away from `/login` to `/`
  4. Set security headers per constitution IV: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` (HSTS). Note: CSP should be configured via `next.config.ts` headers rather than middleware for optimal Cloudflare Workers compatibility

### Integration Points

- **Existing Services**: `src/libs/supabase/server.ts` (createServerClient), `src/libs/supabase/middleware.ts` (updateSession)
- **Shared Components**: Header and Footer will be reusable across screens (extracted to `src/components/layout/`)
- **API Contracts**: Supabase Auth API (managed externally); internal routes `/auth/login` and `/auth/callback`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/GzbNeVGJHz-Login/
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
│   ├── (auth)/
│   │   └── login/
│   │       ├── page.tsx              # Login page (Server Component)
│   │       └── actions.ts            # Server Action: loginWithGoogle()
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts             # OAuth callback route handler
│   ├── layout.tsx                    # MODIFY: Add Montserrat fonts
│   ├── globals.css                   # MODIFY: Add design tokens
│   └── page.tsx                      # MODIFY: Redirect to /login or homepage
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Shared header (logo + language)
│   │   └── Footer.tsx                # Shared footer (copyright)
│   ├── login/
│   │   ├── LoginButton.tsx           # "use client" — OAuth button + loading
│   │   └── LanguageSelector.tsx      # "use client" — Language dropdown toggle (P2)
│   ├── ui/
│   │   └── Spinner.tsx               # Loading spinner component
│   └── icons/
│       ├── GoogleIcon.tsx            # Google logo SVG component
│       ├── ChevronDownIcon.tsx       # Chevron down SVG component
│       └── FlagVNIcon.tsx            # Vietnam flag SVG component
├── libs/
│   └── supabase/
│       ├── client.ts                 # EXISTS — browser client
│       ├── server.ts                 # EXISTS — server client
│       └── middleware.ts             # EXISTS — middleware helper
├── types/
│   └── auth.ts                       # Auth-related TypeScript types
└── middleware.ts                     # NEW: Root middleware for auth redirects

public/
└── assets/
    └── login/
        ├── saa-logo.png              # SAA 2025 header logo
        ├── root-further-logo.png     # ROOT FURTHER hero branding
        ├── keyvisual-bg.jpg          # Background artwork image
        ├── google-icon.svg           # Google icon (source for component)
        └── vn-flag.svg               # Vietnam flag (source for component)
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Add Montserrat + Montserrat Alternates fonts via `next/font/google`; update metadata |
| `src/app/globals.css` | Add login design tokens as CSS variables under `@theme inline` |
| `src/app/page.tsx` | Replace boilerplate with redirect logic (authenticated → homepage, else → /login) |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/ssr | ^0.8.0 | Already installed — Supabase SSR auth |
| @supabase/supabase-js | ^2.90.1 | Already installed — Supabase client |
| next | 15.5.9 | Already installed — Framework |
| tailwindcss | ^4 | Already installed — Styling |

No new dependencies required.

---

## Implementation Strategy

### Phase 0: Asset Preparation

Download all media files from Figma using `get_media_file` tool:
- SAA logo PNG → `public/assets/login/saa-logo.png`
- ROOT FURTHER logo PNG → `public/assets/login/root-further-logo.png`
- Google icon SVG → `public/assets/login/google-icon.svg`
- VN flag SVG → `public/assets/login/vn-flag.svg`
- Background keyvisual → `public/assets/login/keyvisual-bg.jpg` (extract via `get_design_item_image` or manual Figma export)

Create SVG Icon Components from downloaded assets:
- `GoogleIcon.tsx`, `ChevronDownIcon.tsx`, `FlagVNIcon.tsx`

### Phase 1: Foundation (Setup + Infrastructure)

1. **Update `globals.css`** — Add design tokens from design-style.md as CSS variables
2. **Update `layout.tsx`** — Add Montserrat + Montserrat Alternates via `next/font/google`, update metadata
3. **Create `src/middleware.ts`** — Auth redirect middleware using existing `libs/supabase/middleware.ts`
4. **Create `src/types/auth.ts`** — Auth-related TypeScript types
5. **Create `Spinner.tsx`** — Reusable loading spinner component
6. **Create icon components** — `GoogleIcon`, `ChevronDownIcon`, `FlagVNIcon`

### Phase 2: Core Features — US1 (Google OAuth Login) + US2 (Visual Presentation)

Both P1 stories are implemented together as a single vertical slice.
**TDD requirement**: Write failing tests BEFORE implementing each component/route. Follow Red → Green → Refactor cycle per constitution II.

7. **Create `src/app/auth/callback/route.ts`** — OAuth callback route handler (write test first: mock Supabase `exchangeCodeForSession`, verify redirect on success/error)
8. **Create login Server Action** — `src/app/(auth)/login/actions.ts` with `loginWithGoogle()` that calls `supabase.auth.signInWithOAuth({ provider: 'google' })` and redirects to the returned URL (write test first: mock Supabase, verify redirect URL returned)
9. **Create `Header.tsx`** — Shared header with SAA logo + language selector placeholder
10. **Create `Footer.tsx`** — Shared footer with copyright text
11. **Create `LoginButton.tsx`** — `"use client"` component that calls the Server Action, manages loading state, renders error banner from props
12. **Create `src/app/(auth)/login/page.tsx`** — Server Component login page composing Header, hero content, LoginButton (with error from searchParams), Footer
13. **Update `src/app/page.tsx`** — Root redirect logic (authenticated → homepage, else → /login)
14. **Verify responsive design** at 375px, 768px, 1280px viewports

### Phase 3: Extended Features — US3 (Language Selector) + US4 (Button States)

15. **Implement `LanguageSelector.tsx`** — `"use client"` dropdown toggle with chevron rotation (P2, placeholder dropdown content — full implementation deferred to language dropdown spec)
16. **Refine button interaction states** — Hover lift/shadow transitions, focus outlines, disabled state polish

### Phase 4: Polish & Cross-Cutting

17. **Error handling** — Verify error banner displays on OAuth failures, auto-dismiss, OWASP-compliant messages. Add cookies-disabled detection: on OAuth callback failure where session can't be established, redirect with `?error=cookies_required` and display a specific error message in the banner ("Vui lòng bật cookies để đăng nhập.")
18. **Accessibility audit** — Keyboard navigation, aria-labels, focus indicators, screen reader testing
19. **Performance** — Lighthouse audit, image optimization verification, font loading check
20. **Code cleanup** — Remove unused code, verify lint passes, verify build succeeds

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase Google OAuth not configured in project | Medium | High | Verify Supabase dashboard has Google provider enabled with correct client ID/secret |
| Background image too large for 3G performance target | Medium | Medium | Compress to WebP/AVIF, use responsive `sizes`, set `quality={75-85}` |
| Cloudflare Workers edge runtime incompatibility | Low | High | Test callback route with `wrangler dev`; verify no Node.js-only APIs used |
| `next/font/google` with Montserrat Alternates availability | Low | Low | Verify font name in Google Fonts registry; fallback to Montserrat if unavailable |

### Estimated Complexity

- **Frontend**: Medium (full-page layout with responsive design, multiple components)
- **Backend**: Low (two simple route handlers + middleware)
- **Testing**: Medium (OAuth flow requires integration test setup with Supabase)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LoginButton → Server Action → Supabase Auth → redirect
- [x] **External dependencies**: Supabase Auth API (Google OAuth provider)
- [ ] **Data layer**: N/A — no database operations
- [x] **User workflows**: Full OAuth login flow (click → Google → callback → redirect)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Button click triggers OAuth, loading state displays, error banner shows on failure |
| Service ↔ Service | Yes | Middleware redirects authenticated/unauthenticated users correctly |
| App ↔ External API | Yes | Supabase Auth OAuth initiation and callback exchange |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive layout at mobile/tablet/desktop breakpoints |

### Test Environment

- **Environment type**: Local (Supabase local via Docker) + Staging (Supabase cloud)
- **Test data strategy**: Fresh Supabase auth state per test; use test Google account
- **Isolation approach**: Clear cookies between tests; use incognito browser for E2E

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth SDK | Mock in unit tests | Isolate component behavior from external service |
| Google OAuth consent | Skip in unit tests, real in E2E | Cannot mock external OAuth provider redirect |
| Next.js middleware | Real | Must test actual redirect behavior |
| Next.js Image | Mock in unit tests | Avoid actual image loading in tests |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Click login button → redirect to Google OAuth → callback creates session → redirect to homepage
   - [ ] Authenticated user visits /login → auto-redirect to homepage
   - [ ] Unauthenticated user visits protected route → redirect to /login

2. **Error Handling**
   - [ ] User denies Google consent → redirect to /login?error=access_denied → error banner shown
   - [ ] Invalid callback code → redirect to /login with error
   - [ ] Supabase unreachable → error message displayed, no stack traces

3. **Edge Cases**
   - [ ] Direct navigation to /auth/callback without state → redirect to /login
   - [ ] Double-click login button → only one OAuth initiation (button disabled)
   - [ ] Back-button after successful login → should not show login page

### Tooling & Framework

- **Test framework**: Vitest (to be installed)
- **Supporting tools**: @testing-library/react, MSW (for Supabase API mocking)
- **CI integration**: `yarn test` in CI pipeline before merge

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Auth route handlers | 90%+ | High |
| Middleware redirects | 90%+ | High |
| LoginButton component | 80%+ | High |
| Layout components (Header/Footer) | 70%+ | Medium |
| Error scenarios | 80%+ | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved — reviewed and complete
- [x] `design-style.md` approved — reviewed with Figma data verification
- [ ] Supabase Google OAuth provider configured in Supabase dashboard
- [ ] Google Cloud Console: OAuth 2.0 client ID created with correct callback URL

### External Dependencies

- Supabase Auth (Google OAuth provider must be enabled)
- Google Cloud Console (OAuth client ID + redirect URI)
- Figma media file downloads (via MoMorph `get_media_file` tool)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The login page uses `(auth)` route group, which means the URL will be `/login` (not `/(auth)/login`). The route group is purely for folder organization.
- The OAuth initiation uses a Server Action co-located at `src/app/(auth)/login/actions.ts`. The callback uses a Route Handler at `/auth/callback` (actual URL path, NOT inside the `(auth)` route group).
- The LanguageSelector in Phase 3 is implemented as a visual placeholder (toggle only). Full language switching logic depends on the language dropdown spec (screen `hUyaaugye2`), which is out of scope.
- No new npm dependencies are needed. All required packages are already installed.
- Supabase local development via Docker should be configured for testing, but is not strictly required — development can use the Supabase cloud project.
