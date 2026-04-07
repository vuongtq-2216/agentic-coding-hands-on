# Design Style: HomepageSAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `HomepageSAA`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/i87tDx10uM
**Extracted At**: 2026-04-06

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background (rgba(0, 16, 26, 1)) |
| --color-header-bg | #101417 | 80% | Semi-transparent header (rgba(16, 20, 23, 0.8)) |
| --color-cta-primary | #FFEA9E | 100% | Gold accent - buttons, titles, selected states (rgba(255, 234, 158, 1)) |
| --color-cta-text | #00101A | 100% | Dark text on gold buttons |
| --color-text-primary | #FFFFFF | 100% | White body text |
| --color-text-gold | #FFEA9E | 100% | Gold text for section titles, card titles, selected nav |
| --color-border | #998C5F | 100% | Muted gold border (award cards, secondary buttons) |
| --color-border-footer | #2E3940 | 100% | Divider lines, footer border (rgba(46, 57, 64, 1)) |
| --color-secondary-btn-bg | #FFEA9E | 10% | Secondary button background (rgba(255, 234, 158, 0.10)) |
| --color-notification | #D4271D | 100% | Notification badge |
| --color-kudos-bg | #0F0F0F | 100% | Kudos card fallback background |
| --color-kudos-text | #DBD1C1 | 100% | Warm beige for KUDOS logo text |
| --color-glow | #FAE287 | 100% | Gold glow in shadows and text-shadows |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-content-heading | Montserrat | 24px | 700 | 32px | 0 |
| --text-sub-content | Montserrat | 20px | 700 | 32px | 0 |
| --text-card-title | Montserrat | 24px | 400 | 32px | 0 |
| --text-body-bold | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-body-regular | Montserrat | 16px | 400 | 24px | 0.5px |
| --text-nav-link | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-cta-button | Montserrat | 22px | 700 | 28px | 0 |
| --text-small-button | Montserrat | 16px | 500/700 | 24px | 0.15px |
| --text-lang-selector | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-countdown-digit | Digital Numbers | ~49px | 400 | -- | 0 |
| --text-countdown-label | Montserrat | 24px | 700 | 32px | 0 |
| --text-kudos-logo | SVN-Gotham | 96px | 400 | 24px | -13% |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Desktop horizontal page padding (header + main) |
| --spacing-main-gap | 120px | Gap between major sections in main content |
| --spacing-section-gap | 80px | Within awards section (between card rows) |
| --spacing-content-card-padding | 120px 104px | Content card internal padding |
| --spacing-footer-padding | 40px 90px | Footer padding |
| --spacing-header-padding | 12px 144px | Header padding |
| --spacing-award-card-gap | 80px | Between award cards (row and column) |
| --spacing-cta-gap | 40px | Between CTA buttons |
| --spacing-countdown-units-gap | 40px | Between Day/Hour/Minute units |
| --spacing-countdown-digits-gap | 14px | Between digit tiles within a unit |
| --spacing-header-nav-gap | 24px | Between nav links |
| --spacing-header-logo-nav-gap | 64px | Logo to nav links |
| --spacing-footer-nav-gap | 48px | Between footer nav links |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-award-card | 24px | Award card images |
| --radius-kudos-card | 16px | Kudos section card |
| --radius-btn | 8px | CTA buttons, content card |
| --radius-small-btn | 4px | Small buttons, nav items, language selector |
| --radius-countdown-tile | 8px | Countdown digit tiles |
| --radius-widget | 100px | Pill-shaped widget button |
| --border-award-card | 0.955px solid #FFEA9E | Award card image border |
| --border-secondary-btn | 1px solid #998C5F | Secondary button border |
| --border-countdown-tile | 0.5px solid #FFEA9E | Countdown digit tile border |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-award-card | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images (gold glow) |
| --shadow-widget | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Widget button (gold glow) |
| --shadow-nav-selected | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Selected nav text glow |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Hero overlay | linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%) | Over keyvisual background image |
| Countdown tile | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Digit tile background (with opacity 0.5) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (100%) | Full viewport width, reference 1512px |
| min-height | 4480px | Full page height |
| background | #00101A | Base dark background |
| display | flex | Vertical stack layout |
| flex-direction | column | Header -> Main -> Footer |
| position | relative | For absolute background layers |
| overflow | hidden | Prevent horizontal scroll from background |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Page-level vertical stack |
| flex-direction | column | Header, main content, footer |
| justify-content | flex-start | Content starts from top |

### Layout Structure (ASCII)

```
+======================================================================+ 0px
|  A1_Header (h:80px, bg:rgba(16,20,23,0.8), sticky top-0, z:50)       |
|  +-- px: 144px, flex, items-center, justify-between, gap: 238px       |
|  |                                                                     |
|  |  +----------+  +--------- NAV ---------+    +--- CONTROLS ---+     |
|  |  | Logo     |  | About SAA | Awards    |    | Bell | Lang |  |     |
|  |  | 52x48    |  | Info      | Kudos     |    | Prof |      |  |     |
|  |  +----------+  +----------+------------+    +--------------+--+     |
+======================================================================+ 80px
|                                                                        |
|  3.5_Keyvisual (position:absolute, inset:0, z:0)                      |
|  +-- Background artwork image (object-cover, w:100%, h:1392px)        |
|  +-- Gradient overlay: linear-gradient(12deg, ...)                     |
|                                                                        |
|  Bia_Main Content (flex:1, relative, z:10)                             |
|  +-- px: 144px, py: 96px, flex-col, items-center, gap: 120px          |
|  |                                                                     |
|  |  +===========================================================+     |
|  |  | B_HeroSection (w:1224px, flex-col, gap:40px)               |     |
|  |  |                                                            |     |
|  |  |  +----------------------------------------------+          |     |
|  |  |  | ROOT FURTHER Logo (451x200px, PNG)            |          |     |
|  |  |  +----------------------------------------------+          |     |
|  |  |                                                            |     |
|  |  |  +-- B1_Countdown (w:1224px, flex-col, gap:16px)           |     |
|  |  |  |   "Coming soon" text                                    |     |
|  |  |  |   +-- Countdown Container (w:429px, flex-row, gap:40px) |     |
|  |  |  |   |   +--------+ +--------+ +--------+                 |     |
|  |  |  |   |   | Day    | | Hour   | | Minute |                 |     |
|  |  |  |   |   |116x128 | |116x128 | |116x128 |                 |     |
|  |  |  |   |   | [0][0] | | [0][0] | | [0][0] |                 |     |
|  |  |  |   |   +--------+ +--------+ +--------+                 |     |
|  |  |  +-- B2_EventInfo (w:637px, flex-col, gap:8px)             |     |
|  |  |  |   Date/Time/Location (gold values)                     |     |
|  |  |  +-- B3_CTAButtons (w:570px, flex-row, gap:40px)           |     |
|  |  |      +-- ABOUT AWARDS (276x60, bg:#FFEA9E)                |     |
|  |  |      +-- ABOUT KUDOS (bg:gold/10%, border:#998C5F)        |     |
|  |  +===========================================================+     |
|  |                                                     gap: 120px     |
|  |  +===========================================================+     |
|  |  | B4_ContentCard (w:1152px, radius:8px, p:120px 104px)       |     |
|  |  |  Root Text Logo (189x67) + Further Text Logo (290x67)     |     |
|  |  |  Description text (24px/32px bold white, justify)          |     |
|  |  +===========================================================+     |
|  |                                                     gap: 120px     |
|  |  +===========================================================+     |
|  |  | C_AwardsSection (w:1224px)                                 |     |
|  |  |  +-- C1_Header (subtitle + divider + title)                |     |
|  |  |  +-- C2_Grid (3x2, gap:80px)                              |     |
|  |  |      +--------+ +--------+ +--------+                     |     |
|  |  |      | Card 1 | | Card 2 | | Card 3 |                     |     |
|  |  |      | 336px  | | 336px  | | 336px  |                     |     |
|  |  |      +--------+ +--------+ +--------+                     |     |
|  |  |      +--------+ +--------+ +--------+                     |     |
|  |  |      | Card 4 | | Card 5 | | Card 6 |                     |     |
|  |  |      +--------+ +--------+ +--------+                     |     |
|  |  +===========================================================+     |
|  |                                                     gap: 120px     |
|  |  +===========================================================+     |
|  |  | D1_KudosSection (w:1224px, h:500px)                        |     |
|  |  |  Inner (1120x500, bg-img + #0F0F0F, radius:16px)          |     |
|  |  |  +-- Left: subtitle + title + desc + button (457px)       |     |
|  |  |  +-- Right: KUDOS logo (96px) + illustration (264x219)    |     |
|  |  +===========================================================+     |
|                                                                        |
|  6_Widget (fixed, right:19px, z:40)                                    |
|  +-- 106x64px, bg:#FFEA9E, radius:100px, shadow:gold glow             |
|                                                                        |
+======================================================================+ ~4380px
|  7_Footer (border-top: 1px solid #2E3940, z:10)                       |
|  +-- px: 90px, py: 40px, flex, justify-between, items-center          |
|  |  +--------+  +---------- NAV ----------+  +-- Copyright --+        |
|  |  | Logo   |  | Link1 | Link2 | Link3   |  | Montserrat   |        |
|  |  | 69x64  |  | gap: 48px              |  | Alternates   |        |
|  |  +--------+  +------------------------+  +--------------+        |
+======================================================================+ ~4480px
```

---

## Component Style Details

### A1_Header -- Header Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9091 | - |
| width | 100% | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16,20,23,0.8) | `background-color: rgba(16,20,23,0.8)` |
| backdrop-filter | blur(8px) | `backdrop-filter: blur(8px)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |

**Note**: The Figma design shows a computed `gap: 238px` between left and right sections at 1512px width. For responsive implementation, use `justify-content: space-between` instead of a fixed gap. The left section (logo + nav) and right section (controls) are separated by available space.

**Left Section:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 64px | `gap: 64px` (logo to nav) |

**SAA Logo:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 52px | `width: 52px` |
| height | 48px | `height: 48px` |
| type | PNG image | Next.js `<Image>` component |
| alt | "SAA 2025 Logo" | Accessibility |

**Nav Links Container:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 24px | `gap: 24px` |

**Nav Link Item:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| color | #FFFFFF | `color: white` |
| cursor | pointer | `cursor: pointer` |

**Nav Link States:**

| State | Changes |
|-------|---------|
| Normal | color: #FFFFFF; no border; no shadow |
| Selected | color: #FFEA9E; border-bottom: 1px solid #FFEA9E; text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Hover | background: rgba(255,234,158,0.1); color: #FFFFFF |

**Right Section (Controls):**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 16px | `gap: 16px` |

**Notification Bell:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| position | relative | For badge positioning |

**Notification Badge:**

| Property | Value | CSS |
|----------|-------|-----|
| background | #D4271D | `background-color: #D4271D` |
| border-radius | 50% | Circular badge |
| position | absolute | `position: absolute; top: 0; right: 0` |
| min-width | 16px | Minimum size for badge |

**Language Selector:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**Language Selector Children:**
- Flag icon: 24x24px SVG
- "VN" text: Montserrat 16px, weight 700, line-height 24px, white, letter-spacing 0.15px
- Chevron Down icon: 24x24px SVG

**Language Selector States:**

| State | Changes |
|-------|---------|
| Default | As specified |
| Hover | background: rgba(255,255,255,0.1); cursor: pointer |
| Active/Open | Chevron rotates 180deg; dropdown visible |
| Focus | outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px |

**User Profile Menu:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| border-radius | 50% | Circular avatar |
| cursor | pointer | `cursor: pointer` |

---

### 3.5_Keyvisual -- Background Layer

**Key Visual Image:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9027 | - |
| width | 100% | `width: 100%` |
| height | 1392px | `height: 1392px` |
| position | absolute | `position: absolute; inset: 0` |
| object-fit | cover | `object-fit: cover` |
| object-position | center | `object-position: center` |
| z-index | 0 | `z-index: 0` |

**Gradient Overlay:**

| Property | Value | CSS |
|----------|-------|-----|
| position | absolute | `position: absolute; inset: 0` |
| background | linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%) | `background: linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)` |
| z-index | 1 | Above the background image |

---

### Bia_Main Content -- Main Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9030 | - |
| width | 100% | `width: 100%` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 120px | `gap: 120px` |
| padding | 96px 144px | `padding: 96px 144px` |
| position | relative | `position: relative` |
| z-index | 10 | `z-index: 10` |

---

### B_HeroSection -- Hero Inner

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9031 | - |
| width | 1224px | `width: 1224px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 40px | `gap: 40px` |

**ROOT FURTHER Logo:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 451px | `width: 451px; max-width: 100%` |
| height | 200px | `height: auto` |
| type | PNG image | Next.js `<Image>` with `priority` |
| alt | "ROOT FURTHER - SAA 2025" | Accessibility |

---

### B1_Countdown -- Countdown Timer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9035 | - |
| width | 1224px | `width: 1224px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**"Coming soon" Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |

**Countdown Container:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 429px | `width: 429px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 40px | `gap: 40px` |

**Each Countdown Unit (Day / Hour / Minute):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 116px | `width: 116px` |
| height | 128px | `height: 128px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 14px | `gap: 14px` |
| align-items | center | `align-items: center` |

**Digit Tile:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 51.2px | `width: 51.2px` |
| height | 81.92px | `height: 81.92px` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Gradient background |
| opacity | 0.5 | `opacity: 0.5` |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| backdrop-filter | blur(16.64px) | `backdrop-filter: blur(16.64px)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Digit Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Digital Numbers | `font-family: var(--font-digital-numbers)` |
| font-size | ~49px | `font-size: 49px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |

**Unit Label (Day / Hour / Minute):**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |

---

### B2_EventInfo -- Event Information

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9053 | - |
| width | 637px | `width: 637px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 8px | `gap: 8px` |

**Event Labels (Date:, Time:, Location:):**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |

**Event Values:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: #FFEA9E` (gold) |

**Event Description:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |

---

### B3_CTAButtons -- Call-to-Action Buttons

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9062 | - |
| width | 570px | `width: 570px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 40px | `gap: 40px` |

**Primary Button (ABOUT AWARDS):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 276px | `width: 276px` |
| height | 60px | `height: 60px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

**Secondary Button (ABOUT KUDOS):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 276px | `width: 276px` |
| height | 60px | `height: 60px` |
| background | rgba(255,234,158,0.10) | `background-color: rgba(255,234,158,0.10)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #FFFFFF | `color: white` |

**CTA Button States:**

| State | Primary | Secondary |
|-------|---------|-----------|
| Default | bg: #FFEA9E; text: #00101A | bg: rgba(255,234,158,0.10); border: #998C5F; text: white |
| Hover | transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3) | bg: #FFEA9E; text: #00101A (matches primary hover) |
| Active | transform: translateY(0); box-shadow: none | transform: translateY(0) |
| Focus | outline: 2px solid #FFEA9E; outline-offset: 2px | outline: 2px solid #FFEA9E; outline-offset: 2px |

---

### B4_ContentCard -- Content Section Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:10152 | - |
| width | 1152px | `width: 1152px; max-width: 100%` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| padding | 120px 104px | `padding: 120px 104px` |

**Root Text Logo:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 189px | `width: 189px` |
| height | 67px | `height: 67px` |
| type | PNG image | Next.js `<Image>` component |

**Further Text Logo:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 290px | `width: 290px` |
| height | 67px | `height: 67px` |
| type | PNG image | Next.js `<Image>` component |

**Body Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |
| text-align | justify | `text-align: justify` |

---

### C1_AwardsHeader -- Awards Section Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9069 | - |
| width | 1224px | `width: 1224px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Subtitle:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |

**Divider:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: #2E3940` |

**Title:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | #FFEA9E | `color: #FFEA9E` |

---

### C2_AwardsGrid -- Award Cards Grid

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5005:14974 | - |
| width | 1224px | `width: 1224px; max-width: 100%` |
| display | grid | `display: grid` |
| grid-template-columns | repeat(3, 1fr) | `grid-template-columns: repeat(3, 336px)` |
| gap | 80px | `gap: 80px` (both row and column) |

**Award Card (x6):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `width: 336px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |
| cursor | pointer | `cursor: pointer` |

**Award Card Image:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| border | 0.955px solid #FFEA9E | `border: 1px solid #FFEA9E` |
| border-radius | 24px | `border-radius: 24px` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Gold glow shadow |
| overflow | hidden | `overflow: hidden` |
| object-fit | cover | `object-fit: cover` |

**Award Card Title:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Award Card Description:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |

**Award Card Detail Button ("Chi tiet"):**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 500 | `font-weight: 500` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |
| padding | 16px 0px | `padding: 16px 0px` |
| cursor | pointer | `cursor: pointer` |

**Award Card States:**

| State | Changes |
|-------|---------|
| Default | box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287; border: 1px solid #FFEA9E |
| Hover | transform: translateY(-4px); box-shadow: 0 8px 8px 0 rgba(0,0,0,0.25), 0 0 12px 0 #FAE287 (enhanced glow) |

---

### D1_KudosSection -- Sun* Kudos

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3390:10349 | - |
| width | 1224px | `width: 1224px; max-width: 100%` |
| height | 500px | `height: 500px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Inner Container:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 1120px | `width: 1120px` |
| height | 500px | `height: 500px` |
| background-image | url(...) | Background image |
| background-color | #0F0F0F | Fallback background |
| border-radius | 16px | `border-radius: 16px` |
| overflow | hidden | `overflow: hidden` |
| display | flex | `display: flex` |
| position | relative | `position: relative` |

**Left Content Area:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 457px | `width: 457px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |

**Kudos Subtitle:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |

**Kudos Title:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Kudos Description:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| text-align | justify | `text-align: justify` |

**Kudos CTA Button:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 127px | `width: 127px` |
| height | 56px | `height: 56px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #00101A | `color: #00101A` |

**KUDOS Logo Text (Right Side):**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | `font-family: var(--font-svn-gotham)` |
| font-size | 96px | `font-size: 96px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | -13% | `letter-spacing: -0.13em` |
| color | #DBD1C1 | `color: #DBD1C1` |

**Illustration (Right Side):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 264px | `width: 264px` |
| height | 219px | `height: 219px` |
| type | PNG image | Next.js `<Image>` component |

---

### 6_Widget -- Floating Widget Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5022:15169 | - |
| position | fixed | `position: fixed` |
| right | 19px | `right: 19px` |
| bottom | 24px | `bottom: 24px` (derived from design — Figma shows absolute top: 830px within 1024px viewport, translating to approximately 24px from bottom edge) |
| z-index | 40 | `z-index: 40` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Gold glow shadow |

**Inner Container:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 100px | `border-radius: 100px` (pill shape) |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 8px | `gap: 8px` |
| padding | 16px | `padding: 16px` |
| cursor | pointer | `cursor: pointer` |

**Widget Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #00101A | `color: #00101A` |

**Widget States:**

| State | Changes |
|-------|---------|
| Default | As specified with gold glow shadow |
| Hover | transform: scale(1.05); enhanced shadow |
| Active | transform: scale(0.98) |

---

### 7_Footer -- Footer Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5001:14800 | - |
| width | 100% | `width: 100%` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| padding | 40px 90px | `padding: 40px 90px` |
| position | relative | `position: relative` |
| z-index | 10 | `z-index: 10` |

**Footer Logo:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 69px | `width: 69px` |
| height | 64px | `height: 64px` |
| type | PNG image | Next.js `<Image>` component |
| alt | "SAA 2025 Logo" | Accessibility |

**Footer Nav Links:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 48px | `gap: 48px` |

**Footer Nav Link:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| cursor | pointer | `cursor: pointer` |

**Footer Nav Link States:**

| State | Changes |
|-------|---------|
| Normal | color: white; no background; no shadow |
| Active (current page) | background: rgba(255,234,158,0.1); text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Hover | background: rgba(255,234,158,0.1) |

**Footer Copyright:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat Alternates | `font-family: var(--font-montserrat-alternates)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
HomepageSAA (bg: #00101A, min-h-screen, flex, flex-col, relative, overflow-hidden)
├── BackgroundLayer (absolute, inset-0, z-0)
│   ├── KeyVisualImage (absolute, object-cover, w-full, h-[1392px])
│   └── GradientOverlay (absolute, inset-0, bg-gradient: 12deg #00101A→transparent)
│
├── Header (sticky, top-0, z-50, h-20, bg-[rgba(16,20,23,0.8)], backdrop-blur, px-36, flex, items-center, justify-between) [shared with Login]
│   ├── LeftSection (flex, items-center, gap-16)
│   │   ├── SAALogo (w-[52px], h-[48px], <Image>)
│   │   └── NavLinks (flex, items-center, gap-6) [use client]
│   │       ├── NavLink "About SAA 2025" (selected: text-[#FFEA9E], border-b, text-shadow-glow)
│   │       ├── NavLink "Awards Information" (text-white)
│   │       └── NavLink "Sun* Kudos" (text-white)
│   └── RightSection (flex, items-center, gap-4)
│       ├── NotificationBell (w-10, h-10, relative) [use client]
│       │   └── Badge (absolute, top-0, right-0, bg-[#D4271D], rounded-full)
│       ├── LanguageSelector (w-[108px], h-[56px], flex, items-center, gap-0.5, px-4, rounded) [use client]
│       │   ├── FlagIcon (w-6, h-6, SVG)
│       │   ├── LangText ("VN", font-montserrat, text-base, font-bold, text-white)
│       │   └── ChevronDownIcon (w-6, h-6, SVG, transition-transform)
│       └── UserProfileMenu (w-10, h-10, rounded-full) [use client]
│
├── Main (flex-1, z-10, flex, flex-col, items-center, gap-[120px], px-36, py-24)
│   ├── HeroSection (w-[1224px], max-w-full, flex, flex-col, gap-10)
│   │   ├── RootFurtherLogo (w-[451px], max-w-full, h-auto, <Image priority>)
│   │   ├── CountdownTimer (w-[1224px], flex, flex-col, gap-4) [use client]
│   │   │   ├── ComingSoonText ("Coming soon", font-montserrat, text-2xl, font-bold, text-white)
│   │   │   └── CountdownContainer (w-[429px], flex, flex-row, gap-10)
│   │   │       ├── CountdownUnit "Day" (w-[116px], h-[128px], flex, flex-col, gap-[14px])
│   │   │       │   ├── DigitRow (flex, flex-row, gap-[14px])
│   │   │       │   │   ├── DigitTile (w-[51.2px], h-[81.92px], backdrop-blur, gradient-bg, border-[#FFEA9E], rounded-lg, opacity-50)
│   │   │       │   │   │   └── Digit (font-digital-numbers, text-[49px], text-white)
│   │   │       │   │   └── DigitTile (same)
│   │   │       │   └── Label ("Day", font-montserrat, text-2xl, font-bold, text-white)
│   │   │       ├── CountdownUnit "Hour" (same structure)
│   │   │       └── CountdownUnit "Minute" (same structure)
│   │   ├── EventInfo (w-[637px], max-w-full, flex, flex-col, gap-2)
│   │   │   ├── InfoRow (label: text-white 16px bold, value: text-[#FFEA9E] 24px bold)
│   │   │   ├── InfoRow (same)
│   │   │   ├── InfoRow (same)
│   │   │   └── Description (font-montserrat, text-base, font-bold, text-white)
│   │   └── CTAButtons (w-[570px], max-w-full, flex, flex-row, gap-10)
│   │       ├── PrimaryBtn "ABOUT AWARDS" (w-[276px], h-[60px], bg-[#FFEA9E], rounded-lg, text-[#00101A], text-[22px], font-bold)
│   │       └── SecondaryBtn "ABOUT KUDOS" (bg-[rgba(255,234,158,0.10)], border-[#998C5F], rounded-lg, text-white)
│   │
│   ├── ContentSection (w-[1152px], max-w-full, rounded-lg, p-[120px_104px], flex, flex-col, gap-8)
│   │   ├── LogoContainer (flex)
│   │   │   ├── RootTextLogo (w-[189px], h-[67px], <Image>)
│   │   │   └── FurtherTextLogo (w-[290px], h-[67px], <Image>)
│   │   └── DescriptionText (font-montserrat, text-2xl, font-bold, text-white, text-justify)
│   │
│   ├── AwardsSection (w-[1224px], max-w-full, flex, flex-col, gap-20)
│   │   ├── AwardsHeader (flex, flex-col, gap-4)
│   │   │   ├── Subtitle (font-montserrat, text-2xl, font-bold, text-white)
│   │   │   ├── Divider (w-full, h-px, bg-[#2E3940])
│   │   │   └── Title (font-montserrat, text-[57px], leading-[64px], font-bold, text-[#FFEA9E], tracking-[-0.25px])
│   │   └── AwardsGrid (grid, grid-cols-3, gap-20)
│   │       └── AwardCard x6 (w-[336px], flex, flex-col, gap-6)
│   │           ├── CardImage (w-[336px], h-[336px], aspect-square, rounded-3xl, border-[#FFEA9E], shadow-glow, overflow-hidden)
│   │           ├── CardTitle (font-montserrat, text-2xl, font-normal, text-[#FFEA9E])
│   │           ├── CardDescription (font-montserrat, text-base, font-normal, text-white)
│   │           └── DetailButton ("Chi tiet", font-montserrat, text-base, font-medium, text-white, flex, items-center, gap-1, py-4)
│   │
│   └── KudosSection (w-[1224px], max-w-full, h-[500px], flex, items-center, justify-center)
│       └── KudosCard (w-[1120px], h-[500px], bg-cover, bg-[#0F0F0F], rounded-2xl, overflow-hidden, relative)
│           ├── LeftContent (w-[457px], flex, flex-col, gap-8)
│           │   ├── Subtitle (font-montserrat, text-2xl, font-bold, text-white)
│           │   ├── Title (font-montserrat, text-[57px], leading-[64px], font-bold, text-[#FFEA9E])
│           │   ├── Description (font-montserrat, text-base, font-bold, text-white, text-justify)
│           │   └── CTAButton (w-[127px], h-[56px], bg-[#FFEA9E], rounded, text-[#00101A])
│           └── RightContent
│               ├── KudosLogo (font-svn-gotham, text-[96px], text-[#DBD1C1], tracking-[-0.13em])
│               └── Illustration (w-[264px], h-[219px], <Image>)
│
├── WidgetButton (fixed, right-[19px], z-40) [use client]
│   └── Inner (w-[106px], h-[64px], bg-[#FFEA9E], rounded-full, flex, items-center, gap-2, px-4, shadow-glow)
│       ├── Icon (w-6, h-6, SVG)
│       └── Text (font-montserrat, text-2xl, font-bold, text-[#00101A])
│
└── Footer (relative, z-10, border-t, border-[#2E3940], px-[90px], py-10, flex, items-center, justify-between) [shared with Login]
    ├── FooterLogo (w-[69px], h-[64px], <Image>)
    ├── FooterNav (flex, items-center, gap-12)
    │   ├── FooterLink "About SAA 2025" (font-montserrat, text-base, font-bold, text-white)
    │   ├── FooterLink "Award Information" (active: bg-[rgba(255,234,158,0.1)], text-shadow-glow)
    │   ├── FooterLink "Sun* Kudos" (text-white)
    │   └── FooterLink "Tiêu chuẩn chung" (text-white)
    └── CopyrightText (font-montserrat-alternates, text-base, font-bold, text-white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 639px |
| Small Tablet (sm) | 640px | 767px |
| Tablet (md) | 768px | 1023px |
| Desktop (lg) | 1024px | infinity |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|-----------|---------|
| Header | height: 64px; padding: 12px 16px; hamburger menu replaces nav links |
| SAA Logo | width: 40px; height: 36px |
| Nav Links | Hidden; replaced by hamburger menu with slide-out drawer |
| Language Selector | Compact: flag + chevron only, hide text; width: auto |
| Notification Bell | width: 32px; height: 32px |
| User Profile | width: 32px; height: 32px |
| Main Content | padding: 40px 16px; gap: 60px |
| Hero Section | width: 100% |
| ROOT FURTHER Logo | max-width: 280px; height: auto |
| Countdown Container | width: 100%; gap: 16px |
| Countdown Unit | width: 80px; height: 100px |
| Digit Tile | width: 36px; height: 58px; font-size: 32px |
| Event Info | width: 100%; font-size labels: 14px; font-size values: 18px |
| CTA Buttons | flex-direction: column; width: 100%; gap: 16px |
| CTA Button | width: 100%; height: 56px; font-size: 18px |
| Content Card | padding: 40px 24px; width: 100% |
| Content Body Text | font-size: 18px; line-height: 28px |
| Awards Grid | grid-template-columns: 1fr (single column); gap: 40px |
| Award Card | width: 100%; max-width: 336px; margin: 0 auto |
| Awards Title | font-size: 36px; line-height: 44px |
| Kudos Section | height: auto; min-height: 400px |
| Kudos Inner | width: 100%; flex-direction: column |
| Kudos Left Content | width: 100% |
| Kudos Title | font-size: 36px; line-height: 44px |
| KUDOS Logo | font-size: 48px |
| Widget Button | right: 12px; width: 80px; height: 48px |
| Footer | flex-direction: column; padding: 24px 16px; gap: 16px; text-align: center |
| Footer Nav | gap: 24px; flex-wrap: wrap; justify-content: center |
| Background gradients | Adjust overlay for text readability on smaller viewport |

#### Small Tablet / sm (640px - 767px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 24px |
| Language Selector | Show text (restore from mobile compact) |
| Main Content | padding: 48px 24px; gap: 80px |
| Hero Section | width: 100% |
| ROOT FURTHER Logo | max-width: 360px |
| Countdown Container | width: 100% |
| CTA Buttons | flex-direction: row; gap: 24px |
| CTA Button | width: auto; min-width: 200px |
| Content Card | padding: 60px 40px |
| Awards Grid | grid-template-columns: repeat(2, 1fr); gap: 40px |
| Award Card | width: 100% |
| Awards Title | font-size: 42px; line-height: 52px |
| Kudos Inner | width: 100% |
| Footer | padding: 28px 24px |

#### Tablet / md (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 40px; show nav links (no hamburger) |
| Main Content | padding: 60px 40px; gap: 100px |
| Hero Section | width: 100% |
| ROOT FURTHER Logo | max-width: 400px |
| CTA Buttons | gap: 32px |
| Content Card | padding: 80px 60px |
| Awards Grid | grid-template-columns: repeat(2, 1fr); gap: 60px |
| Awards Title | font-size: 48px; line-height: 56px |
| Kudos Inner | width: 100% |
| Footer | padding: 32px 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All components | As per Figma design (1512px reference width) |
| Header | padding: 12px 144px; height: 80px |
| Main Content | padding: 96px 144px; gap: 120px |
| Hero Section | width: 1224px |
| Content Card | width: 1152px; padding: 120px 104px |
| Awards Grid | grid-template-columns: repeat(3, 336px); gap: 80px |
| Kudos Inner | width: 1120px; height: 500px |
| Footer | padding: 40px 90px |
| Widget | right: 19px |

---

## Icon Specifications

| Icon Name | Size | Color | Node ID | Format | Usage |
|-----------|------|-------|---------|--------|-------|
| saa-logo | 52x48px | Original (multicolor) | I2167:9091;178:1033;178:1030 | PNG | Header branding |
| saa-logo-footer | 69x64px | Original (multicolor) | 5001:14800 (child) | PNG | Footer branding |
| notification-bell | 24x24px | #FFFFFF | I2167:9091 (child) | SVG (React component) | Header notification bell |
| notification-badge | 8-16px circle | #D4271D | -- | CSS (no asset) | Notification count badge |
| vn-flag | 24x24px | Original (multicolor) | I2167:9091 (child) | SVG | Language selector flag |
| chevron-down | 24x24px | #FFFFFF | I2167:9091 (child) | SVG (React component) | Language dropdown indicator; rotates 180deg on open |
| user-profile | 40x40px | -- | I2167:9091 (child) | Image (avatar) | User profile menu trigger |
| arrow-right | 16x16px | #FFFFFF | C2 card (child) | SVG (React component) | "Chi tiet" detail button arrow |
| pen-icon | 24x24px | #00101A | 5022:15169 (child) | SVG (React component) | Widget button icon |
| kudos-logo | -- | #DBD1C1 | 3390:10349 (child) | Text (SVN-Gotham 96px) | Kudos section decorative text |
| root-further-logo | 451x200px | Original | 2167:9031 (child) | PNG | Hero branding image |
| root-text-logo | 189x67px | Original | 3204:10152 (child) | PNG | Content card "Root" text logo |
| further-text-logo | 290x67px | Original | 3204:10152 (child) | PNG | Content card "Further" text logo |
| kudos-illustration | 264x219px | Original | 3390:10349 (child) | PNG | Kudos section decorative illustration |

All icons MUST be implemented as **Icon Components** (React components), not raw `<img>` tags or inline SVG strings. Image assets use Next.js `<Image>` component.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav Link | background, border, text-shadow | 150ms | ease-in-out | Hover / Select |
| CTA Button (Primary) | transform, box-shadow | 150ms | ease-in-out | Hover |
| CTA Button (Secondary) | transform, box-shadow, background, color | 150ms | ease-in-out | Hover |
| Award Card | transform, box-shadow | 200ms | ease-out | Hover |
| Countdown Timer | digit values | every minute | -- | Timer tick (client-side interval) |
| Widget Button | transform, opacity | 150ms | ease-in-out | Hover / Click |
| Language Chevron | transform (rotate 180deg) | 150ms | ease-in-out | Dropdown open/close |
| Language Dropdown | opacity, transform (translateY) | 150ms | ease-out | Open / Close |
| Notification Dropdown | opacity, transform (translateY) | 150ms | ease-out | Open / Close |
| User Profile Menu | opacity, transform (translateY) | 150ms | ease-out | Open / Close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | i87tDx10uM (root) | `bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden` | `HomepageSAA` (Server Component) |
| Background Image | 2167:9027 | `absolute inset-0 object-cover w-full h-[1392px]` | `<Image>` in background layer |
| Gradient Overlay | 2167:9027 (child) | `absolute inset-0` + inline gradient style `linear-gradient(12deg, ...)` | `<div>` overlay |
| Header | 2167:9091 | `sticky top-0 z-50 h-20 bg-[rgba(16,20,23,0.8)] backdrop-blur px-36 flex items-center justify-between` | `<Header>` (shared component) |
| SAA Logo (header) | I2167:9091;178:1033;178:1030 | `w-[52px] h-[48px]` | `<Image>` |
| Nav Links | 2167:9091 (child) | `flex items-center gap-6` | `<NavLinks>` (use client) |
| Nav Link (selected) | -- | `font-montserrat text-sm font-bold text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<NavLink>` |
| Nav Link (default) | -- | `font-montserrat text-sm font-bold text-white transition-all duration-150` | `<NavLink>` |
| Notification Bell | 2167:9091 (child) | `w-10 h-10 relative cursor-pointer` | `<NotificationBell>` (use client) |
| Language Selector | 2167:9091 (child) | `w-[108px] h-[56px] flex items-center gap-0.5 px-4 rounded cursor-pointer` | `<LanguageSelector>` (use client) |
| User Profile | 2167:9091 (child) | `w-10 h-10 rounded-full cursor-pointer` | `<UserProfileMenu>` (use client) |
| Main Content | 2167:9030 | `flex-1 relative z-10 flex flex-col items-center gap-[120px] px-36 py-24` | `<main>` |
| Hero Section | 2167:9031 | `w-[1224px] max-w-full flex flex-col gap-10` | `<HeroSection>` |
| ROOT FURTHER Logo | 2167:9031 (child) | `w-[451px] max-w-full h-auto` | `<Image priority>` |
| Countdown Timer | 2167:9035 | `w-full flex flex-col gap-4` | `<CountdownTimer>` (use client) |
| Coming Soon Text | 2167:9035 (child) | `font-montserrat text-2xl font-bold text-white` | `<p>` |
| Countdown Container | 2167:9035 (child) | `w-[429px] flex flex-row gap-10` | `<div>` |
| Countdown Unit | 2167:9035 (child) | `w-[116px] h-[128px] flex flex-col items-center gap-[14px]` | `<CountdownUnit>` |
| Digit Tile | 2167:9035 (child) | `w-[51.2px] h-[81.92px] backdrop-blur-[16.64px] bg-gradient-to-b from-white to-white/10 border-[0.5px] border-[#FFEA9E] rounded-lg opacity-50 flex items-center justify-center` | `<div>` |
| Digit Text | 2167:9035 (child) | `font-digital-numbers text-[49px] text-white` | `<span>` |
| Unit Label | 2167:9035 (child) | `font-montserrat text-2xl font-bold text-white` | `<span>` |
| Event Info | 2167:9053 | `w-[637px] max-w-full flex flex-col gap-2` | `<EventInfo>` |
| Event Label | 2167:9053 (child) | `font-montserrat text-base font-bold text-white` | `<span>` |
| Event Value | 2167:9053 (child) | `font-montserrat text-2xl font-bold text-[#FFEA9E]` | `<span>` |
| CTA Buttons | 2167:9062 | `w-[570px] max-w-full flex flex-row gap-10` | `<div>` |
| Primary CTA | 2167:9062 (child) | `w-[276px] h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center font-montserrat text-[22px] font-bold text-[#00101A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer` | `<button>` or `<Link>` |
| Secondary CTA | 2167:9062 (child) | `w-[276px] h-[60px] bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-lg flex items-center justify-center font-montserrat text-[22px] font-bold text-white transition-all duration-150 hover:bg-[#FFEA9E] hover:text-[#00101A] cursor-pointer` | `<button>` or `<Link>` |
| Content Card | 3204:10152 | `w-[1152px] max-w-full rounded-lg flex flex-col gap-8 p-[120px_104px]` | `<ContentSection>` |
| Root Text Logo | 3204:10152 (child) | `w-[189px] h-[67px]` | `<Image>` |
| Further Text Logo | 3204:10152 (child) | `w-[290px] h-[67px]` | `<Image>` |
| Content Body Text | 3204:10152 (child) | `font-montserrat text-2xl font-bold text-white text-justify` | `<p>` |
| Awards Header | 2167:9069 | `w-full flex flex-col gap-4` | `<div>` |
| Awards Subtitle | 2167:9069 (child) | `font-montserrat text-2xl font-bold text-white` | `<p>` |
| Awards Divider | 2167:9069 (child) | `w-full h-px bg-[#2E3940]` | `<hr>` or `<div>` |
| Awards Title | 2167:9069 (child) | `font-montserrat text-[57px] leading-[64px] font-bold text-[#FFEA9E] tracking-[-0.25px]` | `<h2>` |
| Awards Grid | 5005:14974 | `grid grid-cols-3 gap-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1` | `<div>` |
| Award Card | 5005:14974 (child) | `w-[336px] flex flex-col gap-6 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1` | `<AwardCard>` |
| Card Image | 5005:14974 (child) | `w-[336px] h-[336px] aspect-square rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] overflow-hidden` | `<Image>` |
| Card Title | 5005:14974 (child) | `font-montserrat text-2xl font-normal text-[#FFEA9E]` | `<h3>` |
| Card Description | 5005:14974 (child) | `font-montserrat text-base font-normal text-white` | `<p>` |
| Card Detail Btn | 5005:14974 (child) | `font-montserrat text-base font-medium text-white flex items-center gap-1 py-4 cursor-pointer` | `<button>` or `<Link>` |
| Kudos Section | 3390:10349 | `w-[1224px] max-w-full h-[500px] flex items-center justify-center` | `<KudosSection>` |
| Kudos Inner | 3390:10349 (child) | `w-[1120px] h-[500px] bg-cover bg-[#0F0F0F] rounded-2xl overflow-hidden relative flex` | `<div>` |
| Kudos Left Content | 3390:10349 (child) | `w-[457px] flex flex-col gap-8` | `<div>` |
| Kudos Subtitle | 3390:10349 (child) | `font-montserrat text-2xl font-bold text-white` | `<p>` |
| Kudos Title | 3390:10349 (child) | `font-montserrat text-[57px] leading-[64px] font-bold text-[#FFEA9E]` | `<h2>` |
| Kudos Description | 3390:10349 (child) | `font-montserrat text-base font-bold text-white text-justify` | `<p>` |
| Kudos CTA Button | 3390:10349 (child) | `w-[127px] h-[56px] bg-[#FFEA9E] rounded flex items-center justify-center font-montserrat text-base font-bold text-[#00101A] cursor-pointer` | `<button>` or `<Link>` |
| KUDOS Logo Text | 3390:10349 (child) | `font-svn-gotham text-[96px] font-normal text-[#DBD1C1] tracking-[-0.13em] leading-[24px]` | `<span>` |
| Kudos Illustration | 3390:10349 (child) | `w-[264px] h-[219px]` | `<Image>` |
| Widget Button | 5022:15169 | `fixed right-[19px] bottom-6 z-40 shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287]` | `<WidgetButton>` (use client) |
| Widget Inner | 5022:15169 (child) | `w-[106px] h-[64px] bg-[#FFEA9E] rounded-full flex items-center justify-center gap-2 px-4 cursor-pointer transition-all duration-150` | `<button>` |
| Widget Text | 5022:15169 (child) | `font-montserrat text-2xl font-bold text-[#00101A]` | `<span>` |
| Footer | 5001:14800 | `relative z-10 border-t border-[#2E3940] px-[90px] py-10 flex items-center justify-between` | `<Footer>` (shared component) |
| Footer Logo | 5001:14800 (child) | `w-[69px] h-[64px]` | `<Image>` |
| Footer Nav | 5001:14800 (child) | `flex items-center gap-12` | `<nav>` |
| Footer Link | 5001:14800 (child) | `font-montserrat text-base font-bold text-white cursor-pointer` | `<Link>` |
| Footer Copyright | 5001:14800 (child) | `font-montserrat-alternates text-base font-bold text-white` | `<p>` |

---

## Media Files

| Node ID | Type | Target Path | Usage |
|---------|------|-------------|-------|
| I2167:9091;178:1033;178:1030 | PNG | public/assets/homepage/saa-logo.png | Header SAA 2025 logo (52x48) |
| 5001:14800 (child) | PNG | public/assets/homepage/saa-logo-footer.png | Footer SAA 2025 logo (69x64) |
| 2167:9031 (child) | PNG | public/assets/homepage/root-further-logo.png | Hero ROOT FURTHER branding (451x200) |
| 3204:10152 (child-1) | PNG | public/assets/homepage/root-text-logo.png | Content card "Root" text logo (189x67) |
| 3204:10152 (child-2) | PNG | public/assets/homepage/further-text-logo.png | Content card "Further" text logo (290x67) |
| 2167:9027 | JPG | public/assets/homepage/keyvisual-bg.jpg | Background keyvisual artwork image (**NOTE**: Must be extracted from the Keyvisual group using `get_design_item_image` or exported manually from Figma) |
| 5005:14974 (child-1) | PNG/JPG | public/assets/homepage/award-1.jpg | Award card 1 image (336x336) |
| 5005:14974 (child-2) | PNG/JPG | public/assets/homepage/award-2.jpg | Award card 2 image (336x336) |
| 5005:14974 (child-3) | PNG/JPG | public/assets/homepage/award-3.jpg | Award card 3 image (336x336) |
| 5005:14974 (child-4) | PNG/JPG | public/assets/homepage/award-4.jpg | Award card 4 image (336x336) |
| 5005:14974 (child-5) | PNG/JPG | public/assets/homepage/award-5.jpg | Award card 5 image (336x336) |
| 5005:14974 (child-6) | PNG/JPG | public/assets/homepage/award-6.jpg | Award card 6 image (336x336) |
| 3390:10349 (bg) | JPG | public/assets/homepage/kudos-bg.jpg | Kudos card background image |
| 3390:10349 (child) | PNG | public/assets/homepage/kudos-illustration.png | Kudos section illustration (264x219) |
| I2167:9091 (child) | SVG | public/assets/homepage/vn-flag.svg | Language selector Vietnam flag icon |
| (create as component) | SVG | -- | Notification bell icon (React component) |
| (create as component) | SVG | -- | Chevron down icon (React component) |
| (create as component) | SVG | -- | Arrow right icon (React component) |
| (create as component) | SVG | -- | Pen/edit icon for widget (React component) |
| I2167:9091 (child) | SVG | -- | Google icon if login present (React component) |

---

## Notes

- All colors should use CSS variables defined in `src/app/globals.css` using TailwindCSS v4 `@theme inline` directive.
- Fonts (Montserrat, Montserrat Alternates, Digital Numbers, SVN-Gotham) MUST be loaded via `next/font/google` or `next/font/local` in `src/app/layout.tsx`. Digital Numbers and SVN-Gotham are custom fonts requiring local loading.
- Color contrast: White (#FFFFFF) on dark (#00101A) = ~19.5:1 ratio (exceeds WCAG AAA). Dark (#00101A) on gold (#FFEA9E) = ~13.8:1 ratio (exceeds WCAG AAA).
- The header's semi-transparent background uses `backdrop-filter: blur(8px)` for readability over the background image.
- Background key visual image should use `quality={85}` and `sizes="100vw"` in the Next.js `<Image>` component for performance.
- All icons MUST be implemented as Icon Components (React components), not `<img>` tags or inline SVG strings.
- The Header and Footer are shared components with the Login screen. Ensure consistent implementation across both screens.
- The CountdownTimer component must be a client component (`"use client"`) as it requires `setInterval` for live updates.
- Award card data (images, titles, descriptions) should be fetched from an API or defined in a data file, not hardcoded in the component.
- The Widget button vertical position is derived as `bottom: 24px` from the Figma absolute positioning (top: 830px within a 1024px viewport).
- The 1512px reference width differs from the Login screen's 1440px. Use `max-w-[1512px] mx-auto` or responsive widths as appropriate.
