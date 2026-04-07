# Implementation Plan: Viết Kudo (Write Kudo Dialog)

**Frame**: `ihQ26W78P2-VietKudo`
**Date**: 2026-04-07
**Spec**: `specs/ihQ26W78P2-VietKudo/spec.md`

---

## Summary

Replace the placeholder `alert()` in `SendKudosBar.tsx` with a full-featured Write Kudo modal dialog. The dialog includes: recipient search with autocomplete, badge/title input, rich text editor with toolbar (B/I/S/list/link/quote) and @ mentions, hashtag tag selector (1-5), image upload (0-5), anonymous checkbox, and Cancel/Send actions. The modal uses React Portal, focus trap, and 200ms fade+slide animation. Requires a rich text editor library (Tiptap recommended).

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/supabase-js, Tiptap (new)
**Database**: Uses existing `kudos_posts` table (already created)
**State Management**: Local useState/useReducer within the dialog component
**API Style**: Existing route handlers at `/api/kudos`, `/api/kudos/upload-image`, `/api/users/search`

---

## Constitution Compliance Check

- [x] Follows project coding conventions
- [x] Uses approved libraries and patterns
- [x] Adheres to folder structure guidelines
- [x] Meets security requirements (XSS prevention, auth validation)
- [x] Follows testing standards

**Violations**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Tiptap (new dependency) | Required for rich text editing with toolbar + @ mentions. No native alternative provides this. | Plain textarea (loses formatting), contentEditable (unreliable cross-browser) |

---

## Architecture Decisions

### Frontend Approach

- **Component**: Single `SendKudosDialog.tsx` client component with sub-components for each form section
- **Rich Text**: Tiptap editor (headless, React 19 compatible) with custom toolbar matching the design
- **Portal**: React `createPortal` to document.body for proper z-index stacking
- **Focus Trap**: Custom hook or `focus-trap-react` library
- **Image Upload**: Client-side → Supabase Storage via existing `/api/kudos/upload-image` endpoint
- **Form State**: `useReducer` for complex form state with validation

### Integration

- **Replaces**: The `alert()` in `SendKudosBar.tsx` with `isDialogOpen` state + `<SendKudosDialog>`
- **Reuses**: `SearchAutocomplete.tsx` (already exists from Kudos Live Board) for recipient search
- **Existing API routes**: POST /api/kudos, POST /api/kudos/upload-image, GET /api/users/search (already created or planned)

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/kudos/SendKudosDialog.tsx` | Main modal dialog ("use client") — replaces the current placeholder |
| `src/components/kudos/RichTextEditor.tsx` | Tiptap-based rich text editor with toolbar |
| `src/components/kudos/HashtagSelector.tsx` | Tag chip input for 1-5 hashtags |
| `src/components/kudos/ImageUploader.tsx` | Image upload area with thumbnails + remove |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/kudos/SendKudosBar.tsx` | Replace `alert()` with `isDialogOpen` state + render `<SendKudosDialog>` |
| `package.json` | Add `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-mention` |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @tiptap/react | ^2 | React integration for Tiptap editor |
| @tiptap/starter-kit | ^2 | Bold, Italic, Strike, BulletList, OrderedList, Blockquote |
| @tiptap/extension-link | ^2 | Link formatting in editor |
| @tiptap/extension-mention | ^2 | @ mention autocomplete |

---

## Implementation Strategy

### Phase 1: Foundation

1. Install Tiptap: `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention`
2. Create `HashtagSelector.tsx` — tag chip component with "+ Hashtag" button, max 5
3. Create `ImageUploader.tsx` — file picker, thumbnail previews with red × remove, max 5

### Phase 2: Core — US1 (Form Flow) + US2 (Rich Text)

4. Create `RichTextEditor.tsx` — Tiptap editor with custom toolbar (B/I/S/List/Link/Quote + "Tiêu chuẩn cộng đồng" link), @ mention extension with autocomplete dropdown
5. Create `SendKudosDialog.tsx` — Full modal: overlay, modal panel (752px, bg #FFF8E1, rounded-3xl, padding 40px), form sections (recipient, badge, editor, hashtags, images, anonymous, actions). Form state via useReducer. Validation on submit. Portal + focus trap + Escape key + animation 200ms
6. Update `SendKudosBar.tsx` — Replace alert with `isDialogOpen` state, conditionally render `<SendKudosDialog>` when open

### Phase 3: Extended — US3 (Image Upload)

7. Wire `ImageUploader` to `/api/kudos/upload-image` endpoint — client-side file validation (type, size), upload with progress, thumbnail preview, remove functionality

### Phase 4: Polish

8. Verify form validation (all required fields, self-kudos prevention, error display)
9. Verify unsaved changes confirmation on close
10. Accessibility: focus trap, Escape key, aria-modal, aria-labelledby, tab order
11. `yarn lint` + `yarn build`

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tiptap bundle size | Medium | Medium | Tree-shake unused extensions. Lazy-load editor component |
| Tiptap + React 19 compatibility | Low | High | Tiptap v2 supports React 19. Test early |
| @ mention performance | Low | Medium | Debounce 300ms, limit results to 10 |
| Image upload on edge runtime | Medium | Medium | Verify Supabase Storage API works on Cloudflare Workers. Fallback: client-direct upload |

### Estimated Complexity

- **Frontend**: Medium-High (rich text editor is the main complexity; rest is standard form)
- **Backend**: Low (existing API routes)
- **Testing**: Medium (form validation, editor interactions)

---

## Dependencies & Prerequisites

- [x] Sun* Kudos Live Board page exists with `SendKudosBar`
- [x] API routes exist: POST /api/kudos, POST /api/kudos/upload-image, GET /api/users/search
- [x] Types exist: `src/types/kudos.ts`
- [x] SearchAutocomplete component exists: `src/components/kudos/SearchAutocomplete.tsx`
- [ ] Tiptap packages installed
- [ ] Rich text storage format decided (HTML recommended for simplicity)

---

## Notes

- The dialog replaces the `alert()` in the existing `SendKudosBar.tsx`. No new routes or pages needed.
- The "Danh hiệu" (badge/title) field is a custom text input where users type a badge name. The list of predefined options should come from a constant or API in the future. For MVP, it's a free-text input.
- Tiptap's @ mention extension handles the autocomplete dropdown natively — it can reuse the same `/api/users/search` endpoint as `SearchAutocomplete`.
- The modal content may overflow on smaller screens — `max-height: 90vh` with `overflow-y: auto` ensures scrollability.
- Anonymous kudos: the `is_anonymous` flag is sent to the API. The backend stores the real `sender_id` but the feed displays "Người ẩn danh" instead of the sender name when `is_anonymous=true`.
