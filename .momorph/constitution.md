<!--
Sync Impact Report
===================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (first version)
Added sections:
  - Core Principles (5 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .momorph/templates/plan-template.md ✅ aligned
  - .momorph/templates/spec-template.md ✅ aligned
  - .momorph/templates/tasks-template.md ✅ aligned
Follow-up TODOs: None
-->

# Agentic Coding Live Demo Constitution

## Core Principles

### I. Clean Code & Organization

All source code MUST be clear, concise, and well-organized. This principle
governs how code is written and structured across the entire project.

- Every file MUST have a single, clear responsibility.
- Functions MUST be short (preferably under 30 lines) and do one thing.
- Naming MUST be descriptive and consistent: use camelCase for variables
  and functions, PascalCase for components and types, UPPER_SNAKE_CASE
  for constants.
- No dead code, commented-out blocks, or unused imports. Remove them.
- Folder structure MUST follow the established convention:
  ```
  src/
  ├── app/                 # Next.js App Router (pages, layouts, routes)
  │   ├── (auth)/          # Auth route group
  │   ├── (main)/          # Main app route group
  │   ├── api/             # API routes
  │   ├── layout.tsx       # Root layout
  │   └── globals.css      # Global styles
  ├── components/          # Reusable UI components
  │   ├── ui/              # Primitive UI components (Button, Input, etc.)
  │   └── [feature]/       # Feature-specific components
  ├── hooks/               # Custom React hooks
  ├── libs/                # Third-party library wrappers
  │   └── supabase/        # Supabase client/server/middleware
  ├── services/            # Business logic and API call functions
  ├── types/               # Shared TypeScript type definitions
  └── utils/               # Pure utility functions
  ```
- Path alias `@/*` maps to `./src/*`. All imports MUST use this alias
  instead of relative paths that traverse more than one level up.
- TailwindCSS utility classes MUST be used for styling. Avoid inline
  styles and custom CSS unless absolutely necessary.
- Components MUST be extracted when a UI pattern is reused more than
  twice.

### II. Test-First Development (NON-NEGOTIABLE)

Test-Driven Development (TDD) is mandatory for all feature work.

- The TDD cycle MUST be followed strictly: write failing test → implement
  code to pass → refactor.
- Every user story MUST have acceptance tests defined before
  implementation begins.
- Unit tests MUST cover all business logic in `services/` and `utils/`.
- Integration tests MUST cover critical user flows and API routes.
- Tests MUST be co-located or placed in a dedicated `__tests__/`
  directory adjacent to the code they test.
- No feature is considered "done" until its tests pass in CI.
- Test files MUST use the naming convention `*.test.ts` or `*.test.tsx`.

### III. Responsive Design

The application MUST be fully responsive, providing an optimal user
experience across all screen sizes from mobile to desktop.

- All UI components and pages MUST be designed mobile-first, then
  enhanced for larger screens.
- Standard TailwindCSS breakpoints MUST be used consistently:
  - Default: mobile (< 640px)
  - `sm`: small tablet (>= 640px)
  - `md`: tablet (>= 768px)
  - `lg`: desktop (>= 1024px)
  - `xl`: large desktop (>= 1280px)
- Touch targets MUST be at least 44x44px on mobile devices.
- Layouts MUST use CSS Flexbox or Grid via Tailwind utilities. No fixed
  pixel widths for containers.
- Images MUST use Next.js `<Image>` component with responsive sizing.
- Every page MUST be visually verified at mobile (375px), tablet (768px),
  and desktop (1280px) widths before being marked complete.

### IV. Security First (OWASP)

All code MUST adhere to OWASP secure coding practices. Security is not an
afterthought — it is embedded in every development decision.

- **Injection Prevention**: All user inputs MUST be validated and
  sanitized. Use Supabase parameterized queries — never concatenate user
  input into SQL or RPC calls.
- **Authentication & Session Management**: Use Supabase Auth exclusively.
  Session tokens MUST be handled via `@supabase/ssr` with httpOnly
  cookies. Never expose tokens in client-side JavaScript or URLs.
- **Cross-Site Scripting (XSS)**: Rely on React's built-in escaping.
  Never use `dangerouslySetInnerHTML` unless the content is sanitized
  with a trusted library.
- **Sensitive Data Exposure**: API keys and secrets MUST be stored in
  environment variables. Never commit `.env` files. Client-side code MUST
  only access `NEXT_PUBLIC_*` variables.
- **Access Control**: Every API route and server action MUST verify the
  user's authentication status and authorization level before processing.
- **Security Headers**: Cloudflare Workers and Next.js middleware MUST
  enforce security headers (CSP, X-Frame-Options, X-Content-Type-Options,
  Strict-Transport-Security).
- **Dependency Security**: Run `yarn audit` regularly. No known critical
  vulnerabilities in production dependencies.
- **Error Handling**: Error messages returned to clients MUST NOT expose
  internal system details (stack traces, database schemas, file paths).

### V. Edge-Ready Architecture

The application runs on Cloudflare Workers via OpenNext. All code MUST be
compatible with the edge runtime and follow platform best practices.

- Server Components are the default. Use `"use client"` only when the
  component requires browser APIs, event handlers, or React hooks that
  need client-side state.
- API routes and server actions MUST be compatible with the Cloudflare
  Workers runtime (no Node.js-only APIs unless polyfilled by
  `nodejs_compat`).
- Supabase client creation MUST follow the established pattern:
  `createBrowserClient` for client components, `createServerClient` for
  server components and API routes.
- Leverage Cloudflare edge caching where appropriate. Static assets MUST
  be served from Cloudflare's asset pipeline.
- Keep worker bundle size minimal. Avoid importing large libraries that
  are not tree-shakeable.
- Environment-specific configuration MUST use wrangler environment
  variables and Next.js env conventions — never hardcode URLs or keys.

## Technology Stack & Constraints

### Approved Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | 4.x |
| Backend/BaaS | Supabase (Auth, DB, Realtime) | latest |
| Edge Runtime | Cloudflare Workers (via OpenNext) | — |
| Package Manager | Yarn | 1.22.22 |
| Node.js | — | 24.x |
| Linting | ESLint (next/core-web-vitals, next/typescript) | 9.x |

### Constraints

- **No additional CSS frameworks** (e.g., Bootstrap, Chakra). TailwindCSS
  is the sole styling solution.
- **No ORM besides Supabase client**. All database access goes through
  `@supabase/supabase-js`.
- **No server-side state stores** (Redis, etc.) unless explicitly approved
  via governance amendment.
- **All new dependencies** MUST be justified in the implementation plan
  and approved before installation.
- **TypeScript strict mode** is enabled and MUST NOT be relaxed. No
  `@ts-ignore` or `any` type without documented justification.

## Development Workflow

### Branch & Commit Strategy

- Work on feature branches created from `main`.
- Commit messages MUST follow Conventional Commits format:
  `type(scope): description` (e.g., `feat(auth): add login page`).
- Each commit MUST represent a logically complete unit of work.

### Code Quality Gates

- All code MUST pass `yarn lint` with zero errors before merge.
- All tests MUST pass before merge.
- TypeScript compilation (`yarn build`) MUST succeed with zero errors.

### Development Flow

1. Read and understand the constitution and feature spec.
2. Write tests for the feature (TDD — Red phase).
3. Implement code to pass tests (Green phase).
4. Refactor while keeping tests green (Refactor phase).
5. Verify responsive design at all breakpoints.
6. Run `yarn lint` and fix all issues.
7. Run `yarn build` to verify production build.
8. Commit and create pull request.

### File Naming Conventions

- React components: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useAuth.ts`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` (e.g., `auth.ts` in `types/`)
- Test files: `*.test.ts` or `*.test.tsx`
- Page routes: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
  (Next.js App Router conventions)

## Governance

This constitution is the single source of truth for all development
decisions in this project. It supersedes informal agreements and ad-hoc
practices.

### Amendment Procedure

1. Propose a change with rationale in a pull request modifying this file.
2. Document what changed and why in the Sync Impact Report comment.
3. Update the version number following semantic versioning:
   - **MAJOR**: Principle removed or fundamentally redefined.
   - **MINOR**: New principle or section added, or material expansion.
   - **PATCH**: Clarification, typo fix, or non-semantic refinement.
4. Propagate changes to dependent templates (plan, spec, tasks).

### Compliance

- All pull requests MUST verify compliance with this constitution.
- The plan template's "Constitution Compliance Check" MUST be completed
  before any implementation phase begins.
- Deviations MUST be documented with justification in the implementation
  plan's Violations table.

### Guidance

- For runtime development guidance, refer to:
  - `.momorph/guidelines/frontend.md` for frontend patterns.
  - `.momorph/guidelines/backend.md` for backend patterns.
  - `.momorph/guidelines/e2e/` for E2E testing standards.

**Version**: 1.0.0 | **Ratified**: 2026-04-06 | **Last Amended**: 2026-04-06
