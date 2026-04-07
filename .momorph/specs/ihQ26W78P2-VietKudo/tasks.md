# Tasks: Viết Kudo (Write Kudo Dialog)

**Frame**: `ihQ26W78P2-VietKudo`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

---

## Phase 1: Setup (Dependencies)

**Purpose**: Install Tiptap rich text editor packages

- [ ] T001 Install Tiptap packages: `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention` | package.json

**Checkpoint**: Tiptap installed, builds clean

---

## Phase 2: Foundation (Sub-components)

**Purpose**: Create reusable sub-components needed by the dialog

- [ ] T002 [P] Create HashtagSelector client component ("use client"): flex-row gap-2 items-center. Label "Hashtag" (22px bold #00101A) + required asterisk (* #CF1322). Tag chips (removable, gap 8px). "+ Hashtag" button (116x48px, border #998C5F, bg white, rounded-lg, text 11px #999). Click opens input/dropdown to add tag. Max 5 — button hidden when 5 reached. Click × on chip removes tag. Accepts `hashtags: string[]`, `onChange: (tags: string[]) => void` props | src/components/kudos/HashtagSelector.tsx
- [ ] T003 [P] Create ImageUploader client component ("use client"): flex-row gap-4 items-center. Label "Image" (22px bold #00101A). Thumbnail previews (80x80, rounded-[18px], border #998C5F, inner gold border #FFEA9E). Red remove button (20px circle, bg #D4271D, absolute top-right) on each. "+ Image" button (98x48px, same style as hashtag add). File picker validates: JPEG/PNG/GIF/WebP only, max 5MB. Max 5 images — button hidden when 5. Uploads via `/api/kudos/upload-image`. Shows progress. Accepts `images: UploadedImage[]`, `onChange: (imgs: UploadedImage[]) => void` props | src/components/kudos/ImageUploader.tsx

**Checkpoint**: Sub-components ready for dialog integration

---

## Phase 3: User Story 1 + User Story 2 — Form Submission + Rich Text (Priority: P1) MVP

**Goal**: Full send-kudos modal with rich text editor, form validation, and submission

**Independent Test (US1)**: Click send bar → modal opens → fill recipient, badge, message, hashtag → click Send → modal closes, kudos created

**Independent Test (US2)**: In editor, select text → click Bold → text becomes bold. Type "@name" → mention dropdown appears → select → mention chip inserted

- [ ] T004 [US2] Create RichTextEditor client component ("use client"): Tiptap editor with custom toolbar matching design. Toolbar row (672px, h-10, border #998C5F, connected to editor via border-radius): Bold (B), Italic (I), Strikethrough (S), OrderedList (#), Link (🔗), Blockquote (""), each as toggle button (40px high, border #998C5F, transparent bg, active state). "Tiêu chuẩn cộng đồng" link (#E46060, right-aligned in toolbar). Editor area (672px, h-[200px] min-h-[120px], border #998C5F, rounded-b-lg, bg white, px-6 pt-4). Tiptap StarterKit + Link + Mention extensions. @ mention: triggered by "@" + 1 char, calls searchUsers API (debounced 300ms), dropdown with avatar+name+dept, inserts styled mention chip. Helper text below: "Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác" (16px #00101A). Accepts `content`, `onChange` props | src/components/kudos/RichTextEditor.tsx
- [ ] T005 [US1] Create SendKudosDialog client component ("use client"): React Portal to document.body. Overlay: fixed inset-0 bg-[rgba(0,16,26,0.8)] z-50. Modal: fixed centered w-[752px] max-w-[95vw] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-10 flex-col gap-8 overflow-y-auto z-50. Animation: 200ms fade+slide-up on open, reverse on close. Focus trap (Tab cycles within modal). Escape key closes. Form sections top-to-bottom: (A) Title "Gửi lời cám ơn và ghi nhận đến đồng đội" (32px bold #00101A centered), (B) Người nhận row (label 22px + * + SearchAutocomplete from existing component, required), (C) Danh hiệu row (label 22px + * + text input 514px border #998C5F + helper text #999), (D) RichTextEditor (required, non-empty), (E) HashtagSelector (required, min 1), (F) ImageUploader (optional), (G) Anonymous checkbox (24x24 border #999 rounded + label 22px #999), (H) Actions row: "Hủy" button (border #998C5F, bg gold/10%, rounded, text 16px + close icon) + "Gửi" button (flex-1 h-[60px] bg #FFEA9E rounded-lg, text 22px bold #00101A + send icon). Form state via useReducer: recipient, badge, message, hashtags, images, isAnonymous, isSubmitting, validationErrors, isDirty. Validation on submit: recipient required + not self, message non-empty, hashtags min 1. Self-kudos error: "Bạn không thể gửi kudos cho chính mình". Submit calls POST /api/kudos, shows loading, closes on success with toast. Unsaved changes prompt on close if isDirty. Accepts `isOpen: boolean`, `onClose: () => void`, `onSuccess: (kudos) => void`, `currentUserId: string` props | src/components/kudos/SendKudosDialog.tsx
- [ ] T006 [US1] Update SendKudosBar: replace `alert()` with `isDialogOpen` useState. Click sets `isDialogOpen=true`. Conditionally render `<SendKudosDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSuccess={...} currentUserId={...} />`. Pass currentUserId from parent (may need to accept as prop from page) | src/components/kudos/SendKudosBar.tsx

**Checkpoint**: Full send flow working — modal opens, form fills, validates, submits, closes

---

## Phase 4: User Story 3 — Image Upload (Priority: P2)

**Goal**: Wire image upload to API with progress and validation

- [ ] T007 [US3] Verify ImageUploader integration end-to-end: click "+ Image" → file picker → select valid image (JPEG, <5MB) → upload to `/api/kudos/upload-image` → thumbnail appears with gold border + red × button. Verify: invalid file type shows error "Chỉ chấp nhận file ảnh (jpg, png, gif, webp)". Oversized file shows error "Kích thước ảnh tối đa là 5MB". 5th image hides add button. Remove restores button | src/components/kudos/ImageUploader.tsx

**Checkpoint**: Image upload fully functional

---

## Phase 5: Polish & Cross-Cutting

**Purpose**: Validation edge cases, accessibility, build

- [ ] T008 [P] Verify form validation: empty required fields show inline errors (red text below fields). Self-kudos prevention works (selecting self as recipient shows error). Duplicate submission prevented (Send button disabled during submit). Network failure keeps modal open with error toast | src/components/kudos/SendKudosDialog.tsx
- [ ] T009 [P] Verify unsaved changes confirmation: enter data in any field → click Cancel/backdrop/Escape → confirmation prompt "Bạn có chắc muốn hủy? Nội dung chưa được lưu sẽ bị mất." appears with Discard/Continue options. Empty form closes without prompt | src/components/kudos/SendKudosDialog.tsx
- [ ] T010 Accessibility audit: focus trap cycles within modal (Tab/Shift+Tab), Escape closes modal, `aria-modal="true"` on modal, `aria-labelledby` pointing to title, toolbar buttons have `aria-label`, editor has `role="textbox"`, focus returns to SendKudosBar button after close | src/components/kudos/SendKudosDialog.tsx
- [ ] T011 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero TypeScript errors. Verify `/sun-kudos` page still compiles with the updated SendKudosBar | project root

**Checkpoint**: Dialog polished, accessible, build clean

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 (Tiptap needed for editor)
- **Phase 3 (US1+US2)**: Depends on Phase 2 (sub-components needed for dialog)
- **Phase 4 (US3)**: Depends on Phase 3 (dialog must exist)
- **Phase 5 (Polish)**: Depends on Phase 4 (all features in place)

### Parallel Opportunities

**Phase 2**: T002 + T003 parallel (different files)
**Phase 5**: T008 + T009 parallel (different test areas)

---

## Implementation Strategy

### MVP First

1. Phase 1 + 2 → Foundation ready
2. Phase 3 (US1 + US2) → **Send kudos MVP** — modal opens, form works, rich text, submission
3. **STOP and VALIDATE**: Open modal, fill all fields, submit, verify new kudos in feed

### Incremental Delivery

1. Phase 1-3 → MVP (form + rich text)
2. Phase 4 → Image upload
3. Phase 5 → Polish

---

## Notes

- The dialog replaces the `alert()` in existing `SendKudosBar.tsx` — no new routes
- Reuses `SearchAutocomplete.tsx` from the Kudos Live Board for recipient search
- Rich text content stored as HTML (simplest for Tiptap). Rendered in feed using `dangerouslySetInnerHTML` with sanitization
- The "Danh hiệu" field is free-text for MVP. Predefined options can be added later
- Anonymous kudos: `is_anonymous: true` in the API request. Feed renders "Người ẩn danh" instead of sender
- Modal scroll: `max-height: 90vh` + `overflow-y: auto` handles long forms on small screens
- Mark tasks complete as you go: `[x]`
