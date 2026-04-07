# Tasks: Dropdown Ngôn Ngữ (Language Dropdown)

**Frame**: `hUyaaugye2-DropdownNgonNgu`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

---

## Phase 1: Setup

**Purpose**: Create the missing UK flag icon component

- [ ] T001 Create FlagENIcon SVG component (24x24, UK flag with red/white/blue Union Jack design, same pattern as existing FlagVNIcon) | src/components/icons/FlagENIcon.tsx

**Checkpoint**: UK flag icon ready

---

## Phase 2: User Story 1 — Language Dropdown Display & Selection (Priority: P1)

**Goal**: Replace "Coming soon" placeholder with working VN/EN language dropdown

**Independent Test**: Click header language selector → dropdown shows VN (highlighted gold) + EN → click EN → selector updates to show EN + UK flag → click again → VN now unselected, EN selected

- [ ] T002 [US1] Update LanguageSelector component: add `selectedLang` state (`"VN" | "EN"`, default `"VN"`). Replace "Coming soon" dropdown content with two option buttons. Dropdown container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col`. Each option: `flex items-center gap-1 px-4 py-4 cursor-pointer transition-colors duration-150`. Selected option: `bg-[rgba(255,234,158,0.2)] rounded-sm`. Unselected option: `bg-transparent rounded hover:bg-white/10`. VN option: FlagVNIcon + "VN" text. EN option: FlagENIcon + "EN" text. Click handler: set `selectedLang`, close dropdown. Update trigger button to dynamically show selected language's flag + code (FlagVNIcon/"VN" or FlagENIcon/"EN"). Text: `font-montserrat text-base font-bold text-white tracking-[0.15px]`. Focus state: `outline-2 outline-white/50 outline-offset-2` | src/components/layout/LanguageSelector.tsx

**Checkpoint**: Language dropdown fully functional

---

## Phase 3: Polish

- [ ] T003 Run `yarn lint` and fix all errors. Run `yarn build` and verify zero errors. Verify dropdown works on Login page, Homepage, and Awards Information page (shared component) | project root

**Checkpoint**: Build clean, dropdown works on all pages

---

## Dependencies & Execution Order

- **T001**: No dependencies — start immediately
- **T002**: Depends on T001 (needs FlagENIcon)
- **T003**: Depends on T002

No parallel opportunities (3 sequential tasks).

---

## Notes

- This updates the EXISTING `LanguageSelector.tsx` — does NOT create a new component
- The existing component already has: `isOpen` state, click-outside detection, chevron rotation, Escape key handling
- Only the dropdown content and `selectedLang` state are new
- Full i18n text switching is out of scope — selecting EN only changes the selector display
- Mark tasks complete as you go: `[x]`
