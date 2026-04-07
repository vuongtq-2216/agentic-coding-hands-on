# Tasks: Login

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download Figma assets and create project structure for login feature

- [x] T001 Download media files from Figma using `get_media_file` tool for all login assets (SAA logo, ROOT FURTHER logo, Google icon, VN flag, keyvisual background) | public/assets/login/
- [x] T002 [P] Create GoogleIcon SVG component from downloaded google-icon.svg | src/components/icons/GoogleIcon.tsx
- [x] T003 [P] Create ChevronDownIcon SVG component (white, 24x24) | src/components/icons/ChevronDownIcon.tsx
- [x] T004 [P] Create FlagVNIcon SVG component from downloaded vn-flag.svg | src/components/icons/FlagVNIcon.tsx
- [x] T005 [P] Create Spinner loading component (24x24, animate-spin, 800ms linear infinite) | src/components/ui/Spinner.tsx

**Checkpoint**: All assets downloaded and icon components ready

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Add login design tokens (colors, typography, spacing, borders, shadows) as CSS variables under `@theme inline` in globals.css per design-style.md | src/app/globals.css
- [x] T007 Add Montserrat and Montserrat Alternates fonts via `next/font/google`, expose as CSS variables, update metadata title/description | src/app/layout.tsx
- [x] T008 Create auth-related TypeScript types (LoginError type for searchParams error codes, ErrorCode union type: 'access_denied' | 'server_error' | 'cookies_required' | 'unknown') | src/types/auth.ts
- [x] T009 Create root middleware: refresh sessions via existing `libs/supabase/middleware.ts`, redirect unauthenticated users to `/login`, redirect authenticated users away from `/login` to `/`, set security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) | src/middleware.ts

**Checkpoint**: Foundation ready — design tokens, fonts, middleware, types all in place

---

## Phase 3: User Story 1 + User Story 2 — Google OAuth Login + Visual Presentation (Priority: P1) MVP

**Goal**: Complete working login page with Google OAuth and pixel-perfect Figma design

**Independent Test (US1)**: Click "LOGIN With Google" → complete OAuth round-trip → valid Supabase session → redirect to homepage

**Independent Test (US2)**: Render page without Supabase → all visual elements match Figma at 1440px, 768px, 375px

**TDD**: Write failing tests BEFORE implementing each component/route. Follow Red → Green → Refactor.

### Auth Backend (US1)

- [x] T010 [US1] Create OAuth callback route handler: read `code` from searchParams, call `supabase.auth.exchangeCodeForSession(code)`, redirect to `/` on success, redirect to `/login?error=<code>` on failure. Handle missing code/state gracefully | src/app/auth/callback/route.ts
- [x] T011 [US1] Create login Server Action `loginWithGoogle()`: create server Supabase client, call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: <origin>/auth/callback } })`, redirect to returned URL | src/app/(auth)/login/actions.ts

### Layout Components (US2)

- [x] T012 [P] [US2] Create Header component: sticky top-0, z-50, h-20, bg rgba(11,15,18,0.8), px responsive (16px mobile → 144px desktop), flex items-center justify-between. Contains SAA logo Image (52x48) at left and language selector placeholder at right. Responsive: reduce logo to 40x36 on mobile, reduce padding per design-style.md breakpoints | src/components/layout/Header.tsx
- [x] T013 [P] [US2] Create Footer component: relative z-10, border-t border-[#2E3940], px responsive (16px mobile → 90px desktop), py responsive (24px mobile → 40px desktop), flex items-center justify-center. Text "Bản quyền thuộc về Sun* (C) 2025" in Montserrat Alternates 16px bold white centered | src/components/layout/Footer.tsx

### Login Components (US1 + US2)

- [x] T014 [US1] Create LoginButton client component ("use client"): accepts `error?: string` prop. Default state: 305x60 button, bg #FFEA9E, rounded-lg, Montserrat 22px bold #00101A text "LOGIN With Google" + GoogleIcon. Loading state: isLoading=true, opacity 0.7, text "Logging in..." + Spinner replacing GoogleIcon. Error state: render inline ErrorBanner above button (bg red-500/15, border red-500, Montserrat 14px #FCA5A5, auto-dismiss 8s). onClick calls loginWithGoogle Server Action. Responsive: width 100% on mobile, 305px on sm+ | src/components/login/LoginButton.tsx

### Page Assembly (US1 + US2)

- [x] T015 [US1] Create Login page as Server Component: check auth session (if authenticated, redirect to `/`), read `searchParams.error` for OAuth error, compose full layout — BackgroundLayer (absolute keyvisual Image + two gradient overlays per design-style.md), Header, HeroContent section (flex-1, relative z-10, responsive padding, ROOT FURTHER Image with priority, invitation text in Montserrat 20px/40px bold white, LoginButton with error prop), Footer. Apply all responsive breakpoints from design-style.md | src/app/(auth)/login/page.tsx
- [x] T016 [US1] Update root page.tsx: replace Next.js boilerplate with server-side auth check — if authenticated redirect to homepage `/`, else redirect to `/login` | src/app/page.tsx

**Checkpoint**: US1 + US2 complete — Login page renders with full Figma-matching design, Google OAuth login works end-to-end

---

## Phase 4: User Story 3 + User Story 4 — Language Selector + Button States (Priority: P2)

**Goal**: Add language selector interaction and polish button hover/focus/loading states

**Independent Test (US3)**: Click language selector → dropdown toggles open/close, chevron rotates

**Independent Test (US4)**: Hover button → lift + shadow effect; click → disabled/loading state

### Language Selector (US3)

- [x] T017 [US3] Create LanguageSelector client component ("use client"): flex items-center gap-0.5, px-4, rounded, cursor-pointer. Contains FlagVNIcon (24x24), "VN" text (Montserrat 16px bold white), ChevronDownIcon (24x24, transition-transform). Manages `isOpen` state: click toggles dropdown open/close, chevron rotates 180deg when open, click-outside closes. Hover: bg rgba(255,255,255,0.1). Focus: outline 2px solid rgba(255,255,255,0.5). Dropdown content is placeholder (full implementation deferred to language dropdown spec hUyaaugye2). Responsive: hide "VN" text on mobile (<640px), show on sm+ | src/components/login/LanguageSelector.tsx
- [x] T018 [US3] Integrate LanguageSelector into Header component replacing the language selector placeholder | src/components/layout/Header.tsx

### Button States Polish (US4)

- [x] T019 [US4] Refine LoginButton interaction states: add hover transition (translateY -2px, box-shadow 0 4px 12px rgba(0,0,0,0.3), 150ms ease-in-out), active state (translateY 0, no shadow), focus state (outline 2px solid #FFEA9E, outline-offset 2px), ensure disabled/loading prevents pointer events. Verify all transitions are 150ms ease-in-out | src/components/login/LoginButton.tsx

**Checkpoint**: US3 + US4 complete — Language selector toggles, button has polished interaction states

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Refinements affecting multiple stories

- [x] T020 [P] Verify error handling: test OAuth failure scenarios (denied consent → ?error=access_denied, invalid code → ?error=server_error, cookies disabled → ?error=cookies_required). Verify error banner displays correct Vietnamese messages, auto-dismisses after 8 seconds, shows no stack traces or internal details | src/components/login/LoginButton.tsx
- [x] T021 [P] Accessibility audit: verify keyboard navigation (Tab through button and language selector), aria-labels on login button ("Đăng nhập bằng Google"), visible focus indicators on dark background, screen reader announces button text and error messages. Verify touch targets >= 44x44px on mobile | src/app/(auth)/login/page.tsx
- [x] T022 [P] Performance audit: run Lighthouse (target >= 90 desktop, >= 75 mobile), verify background image uses Next.js Image with priority + quality={85} + sizes="100vw", verify fonts load via next/font/google without FOUT, verify page loads < 3s on simulated 3G | src/app/(auth)/login/page.tsx
- [x] T023 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Remove any unused imports or dead code | project root

**Checkpoint**: All user stories complete, polished, and ready for merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 completion (assets + icons needed for components)
- **US1+US2 (Phase 3)**: Depends on Phase 2 completion — BLOCKS on middleware + design tokens + fonts
- **US3+US4 (Phase 4)**: Depends on Phase 3 completion (Header must exist before integrating LanguageSelector)
- **Polish (Phase 5)**: Depends on Phase 4 completion (all features must be in place)

### Within Each Phase

- Tasks marked [P] within a phase can run in parallel
- Non-[P] tasks must run sequentially in listed order
- Auth backend tasks (T010-T011) should complete before page assembly (T015)
- Layout components (T012-T013) can be built in parallel with auth backend

### Parallel Opportunities

**Phase 1**: T002, T003, T004, T005 can all run in parallel (after T001 downloads assets)

**Phase 3**: T012 and T013 can run in parallel with T010 and T011 (different files, no dependencies)

**Phase 5**: T020, T021, T022 can all run in parallel (independent audit tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2
2. Complete Phase 3 (US1 + US2 — OAuth + Visual)
3. **STOP and VALIDATE**: Test OAuth flow end-to-end, verify visual fidelity at 3 breakpoints
4. Deploy if ready — this is the MVP

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1 + US2) → Test → Deploy (MVP)
3. Phase 4 (US3 + US4) → Test → Deploy (Enhanced)
4. Phase 5 (Polish) → Test → Deploy (Production-ready)

---

## Notes

- Commit after each task or logical group of tasks
- Run `yarn lint` before moving to next phase
- The `(auth)` route group means the URL is `/login`, not `/(auth)/login`
- OAuth callback route is at `/auth/callback` (actual URL, outside route group)
- Server Action `loginWithGoogle()` is co-located with the page at `src/app/(auth)/login/actions.ts`
- LanguageSelector dropdown content is a visual placeholder — full i18n deferred to screen `hUyaaugye2`
- Mark tasks complete as you go: `[x]`
- All responsive values reference design-style.md breakpoints (Mobile < 640px, sm 640-767px, md 768-1023px, lg >= 1024px)
