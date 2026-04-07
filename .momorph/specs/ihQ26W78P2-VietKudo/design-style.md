# Design Style: Viết Kudo (Write Kudo Dialog)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/ihQ26W78P2
**Extracted At**: 2026-04-07

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-overlay | #00101A | 80% | Backdrop overlay (rgba(0,16,26,0.8)) |
| --color-modal-bg | #FFF8E1 | 100% | Modal container background |
| --color-input-bg | #FFFFFF | 100% | Input field backgrounds |
| --color-input-border | #998C5F | 100% | Input borders, toolbar borders |
| --color-text-primary | #00101A | 100% | Title, labels, dark text on modal |
| --color-text-placeholder | #999999 | 100% | Placeholder text, helper text |
| --color-text-required | #CF1322 | 100% | Required asterisk (*) red |
| --color-text-community | #E46060 | 100% | "Tiêu chuẩn cộng đồng" link (soft red) |
| --color-btn-send | #FFEA9E | 100% | Send button gold background |
| --color-btn-cancel-bg | #FFEA9E | 10% | Cancel button background (rgba(255,234,158,0.1)) |
| --color-remove-btn | #D4271D | 100% | Image remove button (red circle) |
| --color-image-border | #FFEA9E | 100% | Image thumbnail gold border |
| --color-checkbox-border | #999999 | 100% | Checkbox border |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0 | #00101A |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0 | #00101A |
| --text-required | Noto Sans JP | 16px | 700 | 20px | 0 | #CF1322 |
| --text-input | Montserrat | 16px | 700 | 24px | 0.15px | #999999 |
| --text-helper | Montserrat | 16px | 700 | 24px | 0.15px | #999999 |
| --text-editor-hint | Montserrat | 16px | 700 | 24px | 0.5px | #00101A |
| --text-community-link | Montserrat | 16px | 700 | 24px | 0.15px | #E46060 |
| --text-add-button | Montserrat | 11px | 700 | 16px | 0.5px | #999999 |
| --text-checkbox-label | Montserrat | 22px | 700 | 28px | 0 | #999999 |
| --text-cancel-btn | Montserrat | 16px | 700 | 24px | 0.15px | #00101A |
| --text-send-btn | Montserrat | 22px | 700 | 28px | 0 | #00101A |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding | 40px | Modal inner padding (all sides) |
| --spacing-sections-gap | 32px | Gap between form sections |
| --spacing-label-input-gap | 16px | Gap between label and input in a row |
| --spacing-content-gap | 24px | Gap within content area (editor, hashtag, image) |
| --spacing-tag-gap | 8px | Gap between hashtag chips |
| --spacing-image-gap | 16px | Gap between image thumbnails |
| --spacing-action-gap | 24px | Gap between Cancel and Send buttons |
| --spacing-input-padding | 16px 24px | Standard input padding |
| --spacing-toolbar-padding | 10px 16px | Toolbar button padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 24px | Modal container |
| --radius-input | 8px | Standard inputs, toolbar ends |
| --radius-cancel-btn | 4px | Cancel button |
| --radius-send-btn | 8px | Send button |
| --radius-checkbox | 4px | Checkbox |
| --radius-thumbnail | 18px | Image thumbnail outer |
| --radius-thumbnail-inner | 4px | Image thumbnail inner |
| --radius-remove-btn | 50% | Image remove button (circle) |
| --border-input | 1px solid #998C5F | Standard input border |
| --border-checkbox | 1px solid #999999 | Checkbox border |
| --border-thumbnail | 1px solid #998C5F | Image thumbnail outer border |
| --border-thumbnail-gold | 1px solid #FFEA9E | Image thumbnail inner gold border |

---

## Layout Specifications

### Overlay

| Property | Value |
|----------|-------|
| Width | 100vw |
| Height | 100vh |
| Background | rgba(0, 16, 26, 0.8) |
| Position | fixed, inset: 0, z-index: 50 |

### Modal Container

| Property | Value | CSS |
|----------|-------|-----|
| Width | 752px | `width: 752px; max-width: 95vw` |
| Max-height | 90vh | `max-height: 90vh` |
| Padding | 40px | `padding: 40px` |
| Gap | 32px | `gap: 32px` |
| Background | #FFF8E1 | `background-color: #FFF8E1` |
| Border-radius | 24px | `border-radius: 24px` |
| Display | flex column | `display: flex; flex-direction: column` |
| Position | centered | `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| Overflow | auto | `overflow-y: auto` |

### Layout Structure (ASCII)

```
+============================================+
| OVERLAY (rgba(0,16,26,0.8), full viewport) |
|                                            |
|  +--------------------------------------+  |
|  | MODAL (752px, bg: #FFF8E1, r: 24px)  |  |
|  | padding: 40px, gap: 32px             |  |
|  |                                      |  |
|  |  "Gửi lời cám ơn và ghi nhận        |  |
|  |   đến đồng đội" (32px, centered)     |  |
|  |                                      |  |
|  |  Người nhận* [_____Tìm kiếm____▼]   |  |
|  |                                      |  |
|  |  Danh hiệu*  [___placeholder___▼]   |  |
|  |               helper text            |  |
|  |                                      |  |
|  |  [B][I][S][#][🔗][""] Tiêu chuẩn... |  |
|  |  +----------------------------------+|  |
|  |  | Textarea (672x200px)             ||  |
|  |  | placeholder text                 ||  |
|  |  +----------------------------------+|  |
|  |  @ mention hint text                 |  |
|  |                                      |  |
|  |  Hashtag* [+ Hashtag Tối đa 5]      |  |
|  |                                      |  |
|  |  Image [img][img][img]... [+ Image]  |  |
|  |                                      |  |
|  |  ☐ Gửi lời cám ơn và ghi nhận ẩn    |  |
|  |    danh                              |  |
|  |                                      |  |
|  |  [ Hủy ✕ ]  [====== Gửi ▷ ======]   |  |
|  +--------------------------------------+  |
+============================================+
```

---

## Component Style Details

### Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9870 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| color | #00101A | `color: #00101A` |
| text-align | center | `text-align: center` |
| width | 672px (full content) | `width: 100%` |

### Field Label (shared across Người nhận, Danh hiệu, Hashtag, Image)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

### Required Asterisk (*)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Noto Sans JP | system font fallback |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #CF1322 | `color: #CF1322` |

### Standard Input Field

| Property | Value | CSS |
|----------|-------|-----|
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background-color: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| placeholder color | #999999 | Montserrat 16px/24px bold |

### Rich Text Toolbar

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px | `width: 100%` |
| height | 40px | `height: 40px` |
| display | flex row | `display: flex; flex-direction: row` |

Each toolbar button:
| Property | Value |
|----------|-------|
| height | 40px |
| padding | 10px 16px |
| border | 1px solid #998C5F |
| background | transparent |
| First button radius | 8px 0 0 0 (top-left) |
| Last button radius | 0 8px 0 0 (top-right) |

### Textarea

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px (full) | `width: 100%` |
| height | 200px | `height: 200px; min-height: 120px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 0 8px 8px | Connected to toolbar (bottom corners only) |
| padding-left | 24px | `padding-left: 24px; padding-top: 16px` |
| background | #FFFFFF | `background-color: white` |

### Add Buttons ("+ Hashtag", "+ Image")

| Property | Value | CSS |
|----------|-------|-----|
| width | ~100-116px | `width: auto` |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFFFFF | `background-color: white` |
| Label text | 11px/16px bold #999 | small text with limit note |

### Image Thumbnail

| Property | Value | CSS |
|----------|-------|-----|
| size | 80x80px | `width: 80px; height: 80px` |
| outer border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| outer radius | 18px | `border-radius: 18px` |
| inner border | 1px solid #FFEA9E | gold highlight |
| inner radius | 4px | `border-radius: 4px` |

### Remove Button (on thumbnails)

| Property | Value | CSS |
|----------|-------|-----|
| size | 20x20px | `width: 20px; height: 20px` |
| background | #D4271D | `background-color: #D4271D` |
| border-radius | 50% | `border-radius: 50%` |
| position | absolute top-right | `position: absolute; top: -6px; right: -6px` |

### Checkbox (Gửi ẩn danh)

| Property | Value | CSS |
|----------|-------|-----|
| size | 24x24px | `width: 24px; height: 24px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 4px | `border-radius: 4px` |
| background | #FFFFFF | unchecked: white |
| Label | 22px/28px bold #999 | checkbox label text |

### Cancel Button ("Hủy")

| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px 40px | `padding: 16px 40px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255,234,158,0.1) | `background-color: rgba(255,234,158,0.1)` |
| text | Montserrat 16px bold #00101A | with close icon 24x24 |

### Send Button ("Gửi")

| Property | Value | CSS |
|----------|-------|-----|
| width | 502px | `flex: 1` (fills remaining space) |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| text | Montserrat 22px bold #00101A | with send icon 24x24 |

**Button States:**

| State | Cancel | Send |
|-------|--------|------|
| Default | bg: gold/10%, border #998C5F | bg: #FFEA9E |
| Hover | bg: gold/20% | bg: #FFE082 (slightly darker gold) |
| Disabled | opacity: 0.5, cursor: not-allowed | opacity: 0.5, cursor: not-allowed |
| Focus | outline: 2px solid #FFEA9E | outline: 2px solid #00101A |

---

## Component Hierarchy with Styles

```
SendKudosDialog ("use client")
├── Overlay (fixed, inset-0, bg-[rgba(0,16,26,0.8)], z-50)
└── Modal (fixed, centered, w-[752px], max-w-[95vw], max-h-[90vh], bg-[#FFF8E1], rounded-3xl, p-10, flex-col, gap-8, overflow-y-auto)
    ├── Title (font-montserrat, text-[32px], font-bold, text-[#00101A], text-center)
    ├── RecipientField (flex-row, gap-4, items-center)
    │   ├── Label "Người nhận" (text-[22px], font-bold, text-[#00101A]) + * (#CF1322)
    │   └── SearchInput (flex-1, h-14, border-[#998C5F], rounded-lg, px-6, py-4)
    ├── BadgeField (flex-col, gap-2)
    │   ├── Row (flex-row, gap-4, items-center)
    │   │   ├── Label "Danh hiệu" + *
    │   │   └── Input (w-[514px], h-14, same border/radius)
    │   └── HelperText (text-base, text-[#999])
    ├── EditorSection (flex-col, gap-6)
    │   ├── Toolbar+Textarea (connected via border-radius)
    │   │   ├── Toolbar (flex-row, h-10, border-[#998C5F])
    │   │   │   └── ToolbarButton x6 + "Tiêu chuẩn cộng đồng" link
    │   │   └── Textarea (w-full, h-[200px], border-[#998C5F], rounded-b-lg)
    │   ├── EditorHint (text-base, text-[#00101A])
    │   ├── HashtagField (flex-row, gap-4, items-center)
    │   │   ├── Label "Hashtag" + *
    │   │   └── TagChips + AddButton
    │   └── ImageField (flex-row, gap-4, items-center)
    │       ├── Label "Image"
    │       ├── Thumbnails x5 (80x80, rounded-[18px], relative)
    │       │   └── RemoveBtn (absolute, -top-1.5, -right-1.5, 20x20, bg-[#D4271D], rounded-full)
    │       └── AddImageButton
    ├── AnonymousCheckbox (flex-row, gap-4, items-center)
    │   ├── Checkbox (w-6, h-6, border-[#999], rounded)
    │   └── Label (text-[22px], font-bold, text-[#999])
    └── ActionButtons (flex-row, gap-6)
        ├── CancelBtn (border-[#998C5F], bg-[rgba(255,234,158,0.1)], rounded, px-10, py-4)
        └── SendBtn (flex-1, h-[60px], bg-[#FFEA9E], rounded-lg, text-[22px], font-bold)
```

---

## Responsive Specifications

The modal is a fixed-size overlay. On smaller screens:

| Breakpoint | Changes |
|------------|---------|
| Mobile (<640px) | Modal width: 95vw; padding: 24px; title: 24px; label: 18px; textarea: h-[150px]; buttons stack vertically |
| sm (640-767px) | Modal width: 90vw; padding: 32px |
| md (768-1023px) | Modal width: 752px (as designed) |
| lg (>=1024px) | As per Figma design |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Overlay | opacity | 200ms | ease-out | Open/Close |
| Modal | opacity, transform | 200ms | ease-out | Open: fade-in + slide-up; Close: fade-out + slide-down |
| Toolbar button | background-color | 100ms | ease-in-out | Hover/Active toggle |
| Send button | opacity | 150ms | ease-in-out | Disabled/Enabled state change |

---

## Implementation Mapping

| Design Element | Figma Node | Tailwind | React Component |
|---|---|---|---|
| Overlay | 520:11646 | `fixed inset-0 bg-[rgba(0,16,26,0.8)] z-50` | Part of `<SendKudosDialog>` |
| Modal | 520:11647 | `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[752px] max-w-[95vw] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-10 flex flex-col gap-8 overflow-y-auto z-50` | `<SendKudosDialog>` |
| Title | I520:11647;520:9870 | `font-montserrat text-[32px] font-bold text-[#00101A] text-center` | `<h2>` |
| Recipient field | I520:11647;520:9871 | `flex items-center gap-4` | `<RecipientField>` |
| Search input | I520:11647;520:9873 | `flex-1 h-14 border border-[#998C5F] rounded-lg px-6 py-4 bg-white` | `<input>` with autocomplete |
| Badge field | Frame 552 | `flex flex-col gap-2` | `<BadgeField>` |
| Toolbar | I520:11647;520:9877 | `flex h-10 border border-[#998C5F] rounded-t-lg` | `<Toolbar>` |
| Textarea | I520:11647;520:9886 | `w-full h-[200px] min-h-[120px] border border-[#998C5F] border-t-0 rounded-b-lg px-6 pt-4 bg-white` | `<textarea>` or rich text editor |
| Hashtag field | I520:11647;520:9890 | `flex items-center gap-4` | `<HashtagField>` |
| Image field | I520:11647;520:9896 | `flex items-center gap-4` | `<ImageField>` |
| Anonymous checkbox | I520:11647;520:14099 | `flex items-center gap-4` | `<label>` with `<input type="checkbox">` |
| Cancel button | I520:11647;520:9906 | `border border-[#998C5F] bg-[rgba(255,234,158,0.1)] rounded px-10 py-4` | `<button>` |
| Send button | I520:11647;520:9907 | `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold text-[#00101A]` | `<button>` |

---

## Media Files

No downloadable media files. All icons (Bold, Italic, Strikethrough, List, Link, Quote, Plus, Close, Send, Down arrow) are React SVG components.

---

## Notes

- This is a **modal dialog component**, not a page. It overlays the Sun* Kudos Live Board.
- The modal uses the same warm cream `#FFF8E1` background as kudos cards.
- The toolbar and textarea are visually connected — toolbar has `rounded-t-lg` (top corners), textarea has `rounded-b-lg` (bottom corners), with no gap between them.
- The "Tiêu chuẩn cộng đồng" link uses a unique soft red `#E46060` color not used elsewhere.
- Required asterisks use `Noto Sans JP` font (not Montserrat) — may need a fallback or just render in Montserrat as a practical compromise.
- The Send button fills most of the width (~502px) while Cancel is narrower (~146px). Use `flex: 1` on Send.
- Image thumbnails have two borders: outer (#998C5F, rounded-18) and inner (#FFEA9E gold, rounded-4). The remove button (×) is a 20px red circle positioned at the top-right corner, slightly overlapping.
- Focus trap MUST be implemented: Tab should cycle within the modal when open. Escape closes the modal.
