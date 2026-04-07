# Design Style: Dropdown Ngôn Ngữ (Language Dropdown)

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngôn ngữ`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/hUyaaugye2
**Extracted At**: 2026-04-07

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (gold muted) |
| --color-selected-bg | #FFEA9E | 20% | Selected option background (rgba(255,234,158,0.2)) |
| --color-text-primary | #FFFFFF | 100% | Option text |
| --color-hover-bg | #FFFFFF | 10% | Hover state background (rgba(255,255,255,0.1)) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-option | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Container inner padding |
| --spacing-option-padding | 16px | Each option's padding |
| --spacing-flag-text-gap | 4px | Gap between flag icon and text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container |
| --radius-option-selected | 2px | Selected option (VN) |
| --radius-option | 4px | Unselected option |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

---

## Layout Specifications

### Layout Structure (ASCII)

```
+---------------------------+
| Dropdown Container         |
| (bg: #00070C, border: 1px  |
|  solid #998C5F, radius: 8px|
|  padding: 6px)             |
|                            |
| +------------------------+ |
| | 🇻🇳 VN                 | |  ← Selected (bg: rgba(255,234,158,0.2), radius: 2px)
| | 108x56px, p:16px       | |
| +------------------------+ |
|                            |
| +------------------------+ |
| | 🇬🇧 EN                 | |  ← Unselected (bg: transparent, radius: 4px)
| | 110x56px, p:16px       | |
| +------------------------+ |
|                            |
+---------------------------+
```

---

## Component Style Details

### Dropdown Container (525:11713)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 525:11713 | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | Positioned below the language selector button |

### Selected Option — VN (I525:11713;362:6085)

| Property | Value | CSS |
|----------|-------|-----|
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| padding | 16px | `padding: 16px` |
| background | rgba(255,234,158,0.2) | `background-color: rgba(255,234,158,0.2)` |
| border-radius | 2px | `border-radius: 2px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- Flag icon: Vietnam flag (24x24px SVG component)
- Gap: 4px between flag and text
- Text "VN": Montserrat 16px, weight 700, line-height 24px, white, letter-spacing 0.15px, text-align center

### Unselected Option — EN (I525:11713;362:6128)

| Property | Value | CSS |
|----------|-------|-----|
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| padding | 16px | `padding: 16px` |
| background | transparent | `background-color: transparent` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- Flag icon: UK flag (24x24px SVG component)
- Gap: 4px between flag and text
- Text "EN": Montserrat 16px, weight 700, line-height 24px, white, letter-spacing 0.15px, text-align center

### Option States

| State | Changes |
|-------|---------|
| Selected (active language) | background: rgba(255,234,158,0.2); border-radius: 2px |
| Unselected | background: transparent; border-radius: 4px |
| Hover (unselected) | background: rgba(255,255,255,0.1) |
| Hover (selected) | No change (already highlighted) |
| Focus | outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px |

---

## Component Hierarchy with Styles

```
LanguageSelector (existing "use client" component)
├── TriggerButton (existing — flag + "VN"/"EN" + chevron)
└── DropdownOverlay (absolute, right-0, top-full, mt-1)
    └── DropdownContainer (bg: #00070C, border: #998C5F, rounded-lg, p-1.5, flex-col)
        ├── OptionItem "VN" (selected: bg-[rgba(255,234,158,0.2)], rounded-sm)
        │   ├── FlagVNIcon (w-6, h-6)
        │   └── Text "VN" (font-montserrat, text-base, font-bold, text-white)
        └── OptionItem "EN" (unselected: bg-transparent, rounded)
            ├── FlagENIcon (w-6, h-6)
            └── Text "EN" (font-montserrat, text-base, font-bold, text-white)
```

---

## Responsive Specifications

The dropdown dimensions remain fixed across all viewports (it's a small overlay). On mobile where the LanguageSelector may be compact (flag + chevron only, no text), the dropdown still shows full "VN" / "EN" options.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity | 150ms | ease-out | Open/Close |
| Option hover | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Dropdown container | 525:11713 | `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col` | Part of `<LanguageSelector>` |
| VN option (selected) | I525:11713;362:6085 | `flex items-center gap-1 px-4 py-4 bg-[rgba(255,234,158,0.2)] rounded-sm cursor-pointer` | `<button>` |
| EN option (unselected) | I525:11713;362:6128 | `flex items-center gap-1 px-4 py-4 rounded cursor-pointer hover:bg-white/10` | `<button>` |
| VN flag | I525:11713;362:6085;...;186:1709 | `w-6 h-6` | `<FlagVNIcon>` |
| EN flag | I525:11713;362:6128;...;186:1709 | `w-6 h-6` | `<FlagENIcon>` (new) |
| Option text | child | `font-montserrat text-base font-bold text-white tracking-[0.15px] text-center` | `<span>` |

---

## Media Files

No downloadable media files. Flag icons are React SVG components.

---

## Notes

- This updates the existing `LanguageSelector` component — NOT a new component.
- The dropdown bg `#00070C` is darker than the page bg `#00101A`.
- The selected option bg uses 20% gold opacity, different from nav hover (10%).
- A `FlagENIcon` (UK flag SVG) needs to be created. The `FlagVNIcon` already exists.
- The dropdown is absolutely positioned, right-aligned to the trigger button.
