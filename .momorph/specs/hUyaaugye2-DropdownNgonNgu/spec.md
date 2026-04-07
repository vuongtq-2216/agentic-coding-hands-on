# Feature Specification: Dropdown Ngôn Ngữ (Language Dropdown)

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The Language Dropdown is a small overlay component triggered by clicking the Language Selector button ("VN" + flag icon) in the site header. It presents two language options — Vietnamese ("VN" with Vietnam flag) and English ("EN" with UK flag). The currently selected language is highlighted with a gold-tinted background. Selecting a language updates the UI language, closes the dropdown, and persists the user's choice.

This is NOT a standalone page — it is a dropdown overlay that appears within the existing `LanguageSelector` component in the shared Header. It is used on all authenticated pages (Homepage, Awards Information) and the Login screen.

For the initial MVP, the dropdown is a UI shell: clicking options closes the dropdown but full i18n text switching is out of scope. The dropdown visually matches the Figma design with correct styling and interaction states.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Language Dropdown Display & Selection (Priority: P1)

As a user on any page with the site header, I want to click the language selector to see available languages and select one so that I can switch the interface language.

**Why this priority**: This is the sole feature of this component.

**Independent Test**: Click the "VN" language selector button in the header. Verify a dropdown appears with "VN" (selected/highlighted) and "EN" options. Click "EN" and verify the dropdown closes and the selector shows "EN".

**Acceptance Scenarios**:

1. **Given** the header is displayed, **When** the user clicks the language selector ("VN" + flag + chevron), **Then** a dropdown overlay appears below the selector with two options: "VN" (with Vietnam flag) and "EN" (with UK flag).
2. **Given** the dropdown is open, **When** the user views the options, **Then** the currently selected language ("VN" by default) has a gold-highlighted background (rgba(255,234,158,0.2)), and the other option has a dark background.
3. **Given** the dropdown is open, **When** the user clicks "EN", **Then** the dropdown closes, and the language selector button updates to show "EN" with the UK flag.
4. **Given** the dropdown is open, **When** the user clicks "VN" (already selected), **Then** the dropdown closes without changing anything.
5. **Given** the dropdown is open, **When** the user clicks outside the dropdown area, **Then** the dropdown closes without changing the language.
6. **Given** the dropdown is open, **When** the user presses the Escape key, **Then** the dropdown closes.
7. **Given** the user hovers over a non-selected option, **When** the cursor enters the option, **Then** the option shows a hover highlight (bg white/10).

---

### Edge Cases

- **Dropdown position overflow**: If the dropdown would extend beyond the viewport edge (on small screens), it should remain within the viewport.
- **Multiple rapid clicks**: Toggle behavior should be stable — no stuck states.
- **Keyboard navigation**: Tab should move focus between options, Enter should select.
- **i18n not implemented**: Selecting "EN" changes the selector display but does NOT translate page text (out of scope for MVP). A console info log may be added as a placeholder.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| A | Dropdown Container | Rounded dropdown overlay (border 1px solid #998C5F, bg #00070C, border-radius 8px, padding 6px) | Appears on click, disappears on outside click/Escape |
| A.1 | VN Option (selected) | Vietnam flag (24x24) + "VN" text (Montserrat 16px bold white). Bg: rgba(255,234,158,0.2), border-radius 2px | Click: select VN, close dropdown. Hover: subtle highlight |
| A.2 | EN Option (unselected) | UK flag (24x24) + "EN" text (Montserrat 16px bold white). Bg: transparent, border-radius 4px | Click: select EN, close dropdown. Hover: bg white/10 |

### Navigation Flow

- **From**: Language selector button click (on any page header)
- **To**: No navigation — dropdown closes in-place. Language preference updates.

### Visual Requirements

- **Position**: Absolute, directly below the language selector button, right-aligned
- **Animation**: Fade-in on open (opacity 0→1, 150ms ease-out)
- **Accessibility**: `role="listbox"`, `aria-activedescendant` for selected option, keyboard navigable

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Clicking the language selector button MUST toggle the dropdown open/closed.
- **FR-002**: The dropdown MUST display exactly 2 options: "VN" (Vietnam flag) and "EN" (UK flag).
- **FR-003**: The currently selected language MUST be visually distinguished with a gold-highlighted background (rgba(255,234,158,0.2)).
- **FR-004**: Clicking a language option MUST close the dropdown and update the selected language display in the header button.
- **FR-005**: Clicking outside the dropdown or pressing Escape MUST close the dropdown.
- **FR-006**: Hovering over an unselected option MUST show a hover highlight (bg white/10).

### Technical Requirements

- **TR-001**: The dropdown MUST be implemented by updating the existing `LanguageSelector` component at `src/components/layout/LanguageSelector.tsx` — replacing the current "Coming soon" placeholder content.
- **TR-002**: Language state (`selectedLang: "VN" | "EN"`) MUST be managed as local component state. No global state or cookies for MVP.
- **TR-003**: The component MUST remain a `"use client"` component (already is).
- **TR-004**: Flag icons for both VN and EN MUST be implemented as React icon components, not `<img>` tags.

### Key Entities

- **Language Option**: `{ code: "VN" | "EN", flag: ReactNode, label: string }`

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility (already exists) |
| selectedLang | "VN" \| "EN" | "VN" | Currently selected language |

### Global State

None for MVP. Full i18n would require a context provider (out of scope).

---

## API Dependencies

None. Language selection is client-side only for MVP.

---

## Success Criteria *(mandatory)*

- **SC-001**: Dropdown opens/closes correctly on button click, outside click, and Escape key.
- **SC-002**: Selected language is visually highlighted with gold background.
- **SC-003**: Switching language updates the header selector display (flag + text).
- **SC-004**: Visual match with Figma design at desktop viewport.

---

## Out of Scope

- Full i18n/localization (translating page text based on selected language)
- Persisting language preference (cookies, localStorage, database)
- Additional language options beyond VN and EN
- Server-side language detection

---

## Dependencies

- [x] `LanguageSelector.tsx` exists at `src/components/layout/LanguageSelector.tsx`
- [x] `FlagVNIcon` exists at `src/components/icons/FlagVNIcon.tsx`
- [ ] `FlagENIcon` (UK flag) — needs to be created or sourced

---

## Notes

- This replaces the "Coming soon" placeholder in the existing `LanguageSelector` component.
- The `FlagVNIcon` already exists from the Login screen implementation. A `FlagENIcon` (UK flag) needs to be created.
- The dropdown container uses `#00070C` background (slightly different from `#00101A` page bg) with `#998C5F` gold border.
- The selected option background `rgba(255,234,158,0.2)` is 20% gold — different from the nav hover which uses 10%.
- The chevron in the language selector rotates 180deg when the dropdown is open (already implemented).
