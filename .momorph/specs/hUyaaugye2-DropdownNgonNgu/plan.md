# Implementation Plan: Dropdown Ngôn Ngữ (Language Dropdown)

**Frame**: `hUyaaugye2-DropdownNgonNgu`
**Date**: 2026-04-07
**Spec**: `specs/hUyaaugye2-DropdownNgonNgu/spec.md`

---

## Summary

Replace the "Coming soon" placeholder in the existing `LanguageSelector` component with a proper dropdown showing VN and EN language options. Create a `FlagENIcon` (UK flag SVG). Add `selectedLang` state to track the chosen language. Highlight the selected option with a gold-tinted background. This is a ~15 minute implementation — 1 icon to create, 1 component to update.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4 (all already installed)
**Database**: N/A
**State Management**: Local state only (`selectedLang`)
**API Style**: None

---

## Constitution Compliance Check

- [x] Follows project coding conventions
- [x] Uses approved libraries and patterns
- [x] Adheres to folder structure guidelines
- [x] Meets security requirements (no auth changes)
- [x] Follows testing standards

**Violations**: None.

---

## Architecture Decisions

- **No new component** — updates the existing `LanguageSelector.tsx` in `src/components/layout/`
- **Local state only** — `selectedLang: "VN" | "EN"` managed via `useState`
- **`FlagENIcon`** — new SVG icon component following the same pattern as `FlagVNIcon`
- **No i18n** — selecting EN changes the display but does not translate text (MVP placeholder)

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/icons/FlagENIcon.tsx` | UK flag SVG icon (24x24) |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/layout/LanguageSelector.tsx` | Replace "Coming soon" dropdown content with VN/EN option list. Add `selectedLang` state. Style selected option with `bg-[rgba(255,234,158,0.2)]`. Update trigger button to show selected language flag + code. |

### Dependencies

No new dependencies.

---

## Implementation Strategy

### Phase 1: Setup

1. **Create `FlagENIcon.tsx`** — UK flag SVG component (24x24), same pattern as FlagVNIcon

### Phase 2: Core Feature — US1 (Language Dropdown)

2. **Update `LanguageSelector.tsx`** — Replace "Coming soon" with:
   - `selectedLang` state (`"VN" | "EN"`, default `"VN"`)
   - Dropdown container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col`
   - Two option buttons: flag icon + language code text
   - Selected option: `bg-[rgba(255,234,158,0.2)] rounded-sm`
   - Unselected option: `bg-transparent rounded hover:bg-white/10`
   - Click: set `selectedLang`, close dropdown
   - Trigger button: dynamically show selected flag + code

### Phase 3: Polish

3. **Build verification** — `yarn lint` + `yarn build`

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| None significant | — | — | Tiny scope, isolated change |

### Estimated Complexity

- **Frontend**: Very Low (1 icon + update 1 component)
- **Backend**: None
- **Testing**: Very Low

---

## Next Steps

1. **Run** `/momorph.implement` directly (scope is too small for tasks.md)

---

## Notes

- The existing `LanguageSelector` already has `isOpen` state, click-outside detection, chevron rotation, and Escape key handling. Only the dropdown content and a new `selectedLang` state need to be added.
- The trigger button currently always shows "VN" + FlagVNIcon. After this change, it dynamically shows the selected language's flag + code.
