# Design Style: Sun* Kudos - Live Board

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `SunKudosLiveBoard`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/MaZUn5xHXZ
**Extracted At**: 2026-04-07

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background (rgba(0, 16, 26, 1)) |
| --color-header-bg | #101417 | 80% | Semi-transparent header (rgba(16, 20, 23, 0.8)) |
| --color-cta-primary | #FFEA9E | 100% | Gold accent - titles, active nav, stat values, dividers, borders, buttons |
| --color-cta-text | #00101A | 100% | Dark text on gold buttons and light card backgrounds |
| --color-text-primary | #FFFFFF | 100% | White body text on dark backgrounds |
| --color-text-gold | #FFEA9E | 100% | Gold text for section titles, stat values, leaderboard names, active nav |
| --color-text-gray | #999999 | 100% | Timestamps, department codes, pagination numbers |
| --color-text-hashtag | #D4271D | 100% | Hashtag text color within kudos cards |
| --color-card-bg | #FFF8E1 | 100% | Warm cream card background for kudos cards |
| --color-sidebar-bg | #00070C | 100% | Stats box and leaderboard container background |
| --color-border-gold | #998C5F | 100% | Input bars, sidebar containers, filter buttons, image gallery borders |
| --color-border-divider | #2E3940 | 100% | Section dividers, footer border (rgba(46, 57, 64, 1)) |
| --color-message-bg | #FFEA9E | 40% | Message box background (rgba(255, 234, 158, 0.4)) |
| --color-input-bg | #FFEA9E | 10% | Input bar background (rgba(255, 234, 158, 0.1)) |
| --color-featured-border | #FFEA9E | 100% | Featured highlight card border (4px solid) |
| --color-button-gold | #FFEA9E | 100% | Secret Box button, CTA buttons |
| --color-kudos-logo | #DBD1C1 | 100% | Warm beige for KUDOS logo text |
| --color-glow | #FAE287 | 100% | Gold glow in text-shadows and decorative effects |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-subtitle | Montserrat | 36px | 700 | 44px | 0 | #FFEA9E |
| --text-kudos-logo | SVN-Gotham | 140px | 400 | 35px | -13% | #DBD1C1 |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0 | #FFFFFF |
| --text-spotlight-count | Montserrat | 36px | 700 | 44px | 0 | #FFFFFF |
| --text-pagination | Montserrat | 28px | 700 | 36px | 0 | #999999 |
| --text-stat-value | Montserrat | 32px | 700 | 40px | 0 | #FFEA9E |
| --text-stat-label | Montserrat | 22px | 700 | 28px | 0 | #FFFFFF |
| --text-cta-button | Montserrat | 22px | 700 | 28px | 0 | #00101A |
| --text-leaderboard-name | Montserrat | 22px | 700 | 28px | 0 | #FFEA9E |
| --text-leaderboard-desc | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-message | Montserrat | 20px | 700 | 32px | 0 | #00101A |
| --text-person-name | Montserrat | 16px | 700 | 24px | 0.15px | #00101A |
| --text-dept-code | Montserrat | 14px | 700 | 20px | 0.1px | #999999 |
| --text-timestamp | Montserrat | 16px | 700 | 24px | 0.5px | #999999 |
| --text-category-label | Montserrat | 16px | 700 | 24px | 0.5px | #00101A |
| --text-hashtag | Montserrat | 16px | 700 | 24px | 0.5px | #D4271D |
| --text-like-count | Montserrat | 24px | 700 | 32px | 0 | #00101A |
| --text-button-small | Montserrat | 16px | 700 | 24px | 0.15px | #00101A |
| --text-input-placeholder | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-filter-dropdown | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-badge | Montserrat | ~11-13px | 700 | ~16-17px | ~0.08px | #FFFFFF |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 | #FFFFFF |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Desktop horizontal page padding (header + main) |
| --spacing-main-gap | 120px | Gap between major sections in main content |
| --spacing-section-gap | 40px | Section internal gap (header to content within a section) |
| --spacing-feed-cards-gap | 24px | Gap between kudos feed cards |
| --spacing-feed-sidebar-gap | 80px | Gap between feed column and sidebar column |
| --spacing-card-internal-gap | 16px | Internal gap within kudos cards |
| --spacing-sidebar-items-gap | 24px | Gap between sidebar boxes (stats, leaderboard) |
| --spacing-sidebar-inner-gap | 16px | Gap between items within sidebar boxes |
| --spacing-image-gallery-gap | 16px | Gap between image gallery thumbnails |
| --spacing-carousel-cards-gap | 24px | Gap between highlight carousel cards |
| --spacing-pagination-gap | 32px | Gap between pagination numbers |
| --spacing-filter-buttons-gap | 8px | Gap between filter dropdown buttons |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-input-pill | 68px | Pill-shaped input bars (send kudos, search) |
| --radius-highlight-card | 16px | Featured highlight card border-radius |
| --radius-kudos-card | 24px | All Kudos feed card border-radius |
| --radius-sidebar-box | 17px | Stats and leaderboard box border-radius |
| --radius-message-box | 12px | Message box within kudos cards |
| --radius-thumbnail | 18px | Image gallery thumbnail border-radius |
| --radius-btn | 8px | CTA buttons (Secret Box, etc.) |
| --radius-spotlight | 47px | Spotlight board container border-radius |
| --border-input | 1px solid #998C5F | Input bar border |
| --border-sidebar | 1px solid #998C5F | Sidebar container border |
| --border-spotlight | 1px solid #998C5F | Spotlight board border |
| --border-featured-card | 4px solid #FFEA9E | Featured highlight card border |
| --border-avatar | 1.869px solid #FFFFFF | Avatar circle border |
| --border-badge | 0.5px solid #FFEA9E | Badge pill border |
| --border-thumbnail | 1px solid #998C5F | Image gallery thumbnail border |
| --border-divider | 1px solid #2E3940 | Section dividers, footer border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-nav-selected | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Selected nav text gold glow |
| --shadow-badge-text | text-shadow with glow | Badge text shadow for legibility |
| --shadow-x2-multiplier | stroke: black on white text | x2 multiplier badge uses black stroke on white text |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| KV overlay | linear-gradient(25deg, #00101A 14.74%, transparent 47.8%) | Over keyvisual background image (512px height region) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px (100%) | Full viewport width, reference 1440px |
| height | 5862px | Full page height (scrollable) |
| background | #00101A | Base dark background |
| display | flex | Vertical stack layout |
| flex-direction | column | Header -> Main -> Footer |
| position | relative | For absolute background layers |
| overflow | hidden | Prevent horizontal scroll from background |
| min-height | 100vh | Ensure full viewport coverage |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Page-level vertical stack |
| flex-direction | column | Header, main content, footer |
| justify-content | flex-start | Content starts from top |

### Layout Structure (ASCII)

```
+======================================================================+ 0px
|  A_Header (h:80px, bg:rgba(16,20,23,0.8), sticky top-0, z:50)       |
|  +-- px: 144px, flex, items-center, justify-between                  |
|  |                                                                    |
|  |  +----------+  +--------- NAV ---------+    +--- CONTROLS ---+   |
|  |  | SAA Logo |  | About SAA | Awards    |    | Bell | Lang |  |   |
|  |  | 52x48    |  | Info      | Kudos*    |    | Prof |      |  |   |
|  |  +----------+  +----------+------------+    +--------------+--+   |
|  |                             *(active)                              |
+======================================================================+ 80px
|                                                                       |
|  B_BackgroundLayer (position:absolute, inset:0, z:0)                 |
|  +-- Keyvisual image (w:100%, h:512px, object-cover)                 |
|  +-- Gradient overlay: linear-gradient(25deg,                        |
|  |   #00101A 14.74%, transparent 47.8%)                              |
|                                                                       |
|  C_Main Content (flex:1, relative, z:10)                              |
|  +-- px: 144px, py: 96px, flex-col, items-center, gap: 120px        |
|  |                                                                    |
|  |  +===========================================================+    |
|  |  | D_HeroSection                                              |    |
|  |  |                                                            |    |
|  |  |  +-- Hero subtitle (36px gold, Montserrat)                |    |
|  |  |  +-- KUDOS Logo (140px, SVN-Gotham, #DBD1C1)              |    |
|  |  |  +-- InputBars (flex-row)                                  |    |
|  |  |      +-- Send Input (738x72, pill r68, border #998C5F)    |    |
|  |  |      +-- Search Input (381x72, pill r68, border #998C5F)  |    |
|  |  +===========================================================+    |
|  |                                                   gap: 120px      |
|  |  +===========================================================+    |
|  |  | E_HighlightKudosSection                                    |    |
|  |  |  +-- SectionHeader                                        |    |
|  |  |  |   +-- Subtitle (24px white)                            |    |
|  |  |  |   +-- Divider (1px #2E3940)                            |    |
|  |  |  |   +-- Title (57px gold)                                |    |
|  |  |  |   +-- Filter dropdowns (flex-row, gap 8px)             |    |
|  |  |  +-- Carousel                                             |    |
|  |  |      +-- HighlightCard x3-4 (528px, gap 24px)            |    |
|  |  |      +-- Prev/Next arrows                                 |    |
|  |  |      +-- Pagination (28px, #999, gap 32px)                |    |
|  |  +===========================================================+    |
|  |                                                   gap: 120px      |
|  |  +===========================================================+    |
|  |  | F_SpotlightBoardSection                                    |    |
|  |  |  +-- SectionHeader (subtitle + divider + title)           |    |
|  |  |  +-- SpotlightVisualization                               |    |
|  |  |      (1157x548, border 1px #998C5F, rounded-47px)         |    |
|  |  |      "388 KUDOS" in 36px white                            |    |
|  |  |      Network graph / word cloud visualization              |    |
|  |  +===========================================================+    |
|  |                                                   gap: 120px      |
|  |  +===========================================================+    |
|  |  | G_AllKudosSection                                          |    |
|  |  |  +-- SectionHeader (subtitle + divider + title)           |    |
|  |  |  +-- ContentArea (flex-row, gap: 80px)                    |    |
|  |  |      |                                                     |    |
|  |  |      +-- KudosFeed (680px, flex-col, gap: 24px)           |    |
|  |  |      |   +-- KudosCard (680px, bg #FFF8E1, r24)           |    |
|  |  |      |   +-- KudosCard                                    |    |
|  |  |      |   +-- KudosCard                                    |    |
|  |  |      |   +-- KudosCard                                    |    |
|  |  |      |                                                     |    |
|  |  |      +-- Sidebar (422px, flex-col, gap: 24px)             |    |
|  |  |          +-- StatsBox (422px, bg #00070C, r17)            |    |
|  |  |          |   +-- Stat rows (label + value)                |    |
|  |  |          |   +-- SecretBoxButton (374x60, bg #FFEA9E)     |    |
|  |  |          +-- LeaderboardBox (422px, bg #00070C, r17)      |    |
|  |  |              +-- Entries (avatar + name + prize)           |    |
|  |  +===========================================================+    |
|  |                                                                    |
+======================================================================+ ~5762px
|  H_Footer (border-top: 1px solid #2E3940, z:10)                     |
|  +-- px: 90px, py: 40px, flex, justify-between, items-center        |
|  |  +--------+  +---------- NAV ----------+  +-- Copyright --+      |
|  |  | Logo   |  | Link1 | Link2 | Link3   |  | Montserrat   |      |
|  |  | 69x64  |  | gap: 48px              |  | Alternates   |      |
|  |  +--------+  +------------------------+  +--------------+      |
+======================================================================+ ~5862px
```

---

## Component Style Details

### A_Header -- Header Bar

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16,20,23,0.8) | `background-color: rgba(16,20,23,0.8)` |
| backdrop-filter | blur(8px) | `backdrop-filter: blur(8px)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |

**Note**: Shared component with other SAA pages. On this page, "Sun* Kudos" nav link is in the active/selected state.

**Nav Link States:**

| State | Changes |
|-------|---------|
| Normal | color: #FFFFFF; no border; no shadow |
| Selected ("Sun* Kudos") | color: #FFEA9E; border-bottom: 1px solid #FFEA9E; text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Hover | background: rgba(255,234,158,0.1); color: #FFFFFF |

### B_BackgroundLayer -- Key Visual + Gradient

**Key Visual Image:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 512px | `height: 512px` |
| position | absolute | `position: absolute; top: 0; left: 0` |
| object-fit | cover | `object-fit: cover` |
| z-index | 0 | `z-index: 0` |

**Gradient Overlay:**

| Property | Value | CSS |
|----------|-------|-----|
| position | absolute | `position: absolute; inset: 0` |
| background | linear-gradient(25deg, #00101A 14.74%, transparent 47.8%) | `background: linear-gradient(25deg, #00101A 14.74%, transparent 47.8%)` |
| z-index | 1 | `z-index: 1` |

### D_HeroSection -- Hero Area

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| gap | 40px | `gap: 40px` |

**Hero Subtitle:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 44px | `line-height: 44px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-align | center | `text-align: center` |

**KUDOS Logo Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | `font-family: var(--font-svn-gotham)` |
| font-size | 140px | `font-size: 140px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 35px | `line-height: 35px` |
| letter-spacing | -13% | `letter-spacing: -0.13em` |
| color | #DBD1C1 | `color: #DBD1C1` |
| text-align | center | `text-align: center` |

### D.1_InputBars -- Send & Search Bars

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 16px | `gap: 16px` |
| align-items | center | `align-items: center` |

**Send Kudos Input:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 738px | `width: 738px` |
| height | 72px | `height: 72px` |
| border-radius | 68px | `border-radius: 68px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | rgba(255,234,158,0.1) | `background-color: rgba(255,234,158,0.1)` |
| padding | 0 24px | `padding: 0 24px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: white` |
| placeholder-color | #FFFFFF (with opacity) | `::placeholder { color: rgba(255,255,255,0.5) }` |

**Search Input:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 381px | `width: 381px` |
| height | 72px | `height: 72px` |
| border-radius | 68px | `border-radius: 68px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | rgba(255,234,158,0.1) | `background-color: rgba(255,234,158,0.1)` |
| padding | 0 24px | `padding: 0 24px` |
| icon | Search icon, left-aligned | 24x24px SVG, color: #FFFFFF |

### E_HighlightKudosSection -- Highlight Carousel

**SectionHeader:**

| Property | Value | CSS |
|----------|-------|-----|
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

**Filter Dropdowns:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 8px | `gap: 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 8px 16px | `padding: 8px 16px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: white` |

### E.1_HighlightCard -- Featured Kudos Card

| Property | Value | CSS |
|----------|-------|-----|
| width | 528px | `width: 528px` |
| border | 4px solid #FFEA9E | `border: 4px solid #FFEA9E` |
| background | #FFF8E1 | `background-color: #FFF8E1` |
| border-radius | 16px | `border-radius: 16px` |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Avatar:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 64px | `width: 64px` |
| height | 64px | `height: 64px` |
| border-radius | 50% | `border-radius: 50%` |
| border | 1.869px solid #FFFFFF | `border: 1.869px solid white` |
| object-fit | cover | `object-fit: cover` |

**Badge (Category):**

| Property | Value | CSS |
|----------|-------|-----|
| width | ~109px | `width: auto; min-width: 109px` |
| height | ~19px | `height: auto` |
| border-radius | 999px | `border-radius: 999px` (pill) |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid #FFEA9E` |
| padding | 2px 8px | `padding: 2px 8px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | ~11px | `font-size: 11px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | ~16px | `line-height: 16px` |
| letter-spacing | ~0.08px | `letter-spacing: 0.08px` |
| color | #FFFFFF | `color: white` |
| text-shadow | glow effect | Badge text shadow for legibility |

**Message Box:**

| Property | Value | CSS |
|----------|-------|-----|
| border | 1px solid #FFEA9E | `border: 1px solid #FFEA9E` |
| background | rgba(255,234,158,0.4) | `background-color: rgba(255,234,158,0.4)` |
| border-radius | 12px | `border-radius: 12px` |
| padding | 16px 24px | `padding: 16px 24px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #00101A | `color: #00101A` |

**Hashtags (inside message):**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #D4271D | `color: #D4271D` |

**Person Name:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #00101A | `color: #00101A` |

**Dept Code:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| color | #999999 | `color: #999` |

**Timestamp:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #999999 | `color: #999` |

**Carousel Pagination:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| gap | 32px | `gap: 32px` |
| align-items | center | `align-items: center` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 28px | `font-size: 28px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 36px | `line-height: 36px` |
| color | #999999 | `color: #999` |
| active-color | #FFEA9E | Active page: `color: #FFEA9E` |

### F_SpotlightBoardSection -- Spotlight Visualization

**Spotlight Container:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 1157px | `width: 1157px; max-width: 100%` |
| height | 548px | `height: 548px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 47px | `border-radius: 47px` |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` |

**Spotlight Count Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 44px | `line-height: 44px` |
| color | #FFFFFF | `color: white` |
| content | "388 KUDOS" | Dynamic count value |

**Note**: Contains an interactive network graph / word cloud visualization. Implementation should use a canvas-based or SVG-based library for the node connections and word layout.

### G_AllKudosSection -- Feed + Sidebar Layout

**ContentArea:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 80px | `gap: 80px` |
| align-items | flex-start | `align-items: flex-start` |

### G.1_KudosFeed -- Feed Column

| Property | Value | CSS |
|----------|-------|-----|
| width | 680px | `width: 680px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |

### G.1.1_KudosCard -- All Kudos Feed Card

| Property | Value | CSS |
|----------|-------|-----|
| width | 680px | `width: 680px` |
| background | #FFF8E1 | `background-color: #FFF8E1` |
| border-radius | 24px | `border-radius: 24px` |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Note**: Same internal structure as the highlight card but wider. Content area is 600px (680px - 40px padding on each side).

**Image Gallery (inside card):**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 16px | `gap: 16px` |

**Image Thumbnail:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 88px | `width: 88px` |
| height | 88px | `height: 88px` |
| border-radius | 18px | `border-radius: 18px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| object-fit | cover | `object-fit: cover` |
| count | up to 5 per row | Max 5 thumbnails visible |

**Category Label:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #00101A | `color: #00101A` |

**Like Count:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #00101A | `color: #00101A` |

### G.2_Sidebar -- Stats & Leaderboard Column

| Property | Value | CSS |
|----------|-------|-----|
| width | 422px | `width: 422px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |
| position | sticky | `position: sticky; top: 100px` (optional, for scroll stickiness) |

### G.2.1_StatsBox -- Statistics Container

| Property | Value | CSS |
|----------|-------|-----|
| width | 422px | `width: 422px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 17px | `border-radius: 17px` |
| padding | 24px | `padding: 24px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Stat Row:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |

**Stat Label:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #FFFFFF | `color: white` |

**Stat Value:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Secret Box Button:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 374px | `width: 374px` |
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

**Secret Box Button States:**

| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3) |
| Active | transform: translateY(0); box-shadow: none |
| Focus | outline: 2px solid #FFEA9E; outline-offset: 2px |

### G.2.2_LeaderboardBox -- Leaderboard Container

| Property | Value | CSS |
|----------|-------|-----|
| width | 422px | `width: 422px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 17px | `border-radius: 17px` |
| padding | 24px | `padding: 24px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Leaderboard Entry:**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 16px | `gap: 16px` |

**Leaderboard Avatar:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 64px | `width: 64px` |
| height | 64px | `height: 64px` |
| border-radius | 50% | `border-radius: 50%` |
| object-fit | cover | `object-fit: cover` |

**Leaderboard Name:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Leaderboard Description/Prize:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: white` |

### H_Footer -- Footer Bar

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |

**Note**: Shared component with other SAA pages. "Sun* Kudos" nav link is active in the footer as well.

**Footer Copyright Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat Alternates | `font-family: var(--font-montserrat-alternates)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

## Component Hierarchy with Styles

```
SunKudosPage (bg: #00101A, min-h-screen, flex, flex-col, relative, overflow-hidden)
├── BackgroundLayer (absolute, inset-0, z-0)
│   ├── KeyVisualImage (absolute, top-0, left-0, w-full, h-[512px], object-cover)
│   └── GradientOverlay (absolute, inset-0, bg-gradient: 25deg #00101A 14.74% -> transparent 47.8%)
│
├── Header (sticky, top-0, z-50, h-20, bg-[rgba(16,20,23,0.8)], backdrop-blur-sm, px-36, flex, items-center, justify-between)
│   ├── LeftSection (flex, items-center, gap-16)
│   │   ├── SAALogo (w-[52px], h-[48px], <Image>)
│   │   └── NavLinks (flex, items-center, gap-6)
│   │       ├── NavLink "About SAA" (font-montserrat, text-sm, font-bold, text-white)
│   │       ├── NavLink "Awards" (font-montserrat, text-sm, font-bold, text-white)
│   │       ├── NavLink "Info" (font-montserrat, text-sm, font-bold, text-white)
│   │       └── NavLink "Sun* Kudos" (font-montserrat, text-sm, font-bold, text-[#FFEA9E], border-b border-[#FFEA9E], text-shadow-gold) *ACTIVE*
│   └── RightSection (flex, items-center, gap-4)
│       ├── NotificationBell (w-10, h-10, relative) [use client]
│       ├── ProfileAvatar (w-10, h-10, rounded-full)
│       └── LanguageSelector (flex, items-center, gap-0.5, rounded, cursor-pointer) [use client]
│
├── Main (flex-1, relative, z-10, flex, flex-col, items-center, gap-[120px], px-36, py-24)
│   │
│   ├── HeroSection (flex, flex-col, items-center, gap-10)
│   │   ├── HeroSubtitle (font-montserrat, text-[36px], font-bold, leading-[44px], text-[#FFEA9E], text-center)
│   │   ├── KUDOSLogo (font-svn-gotham, text-[140px], font-normal, leading-[35px], tracking-[-0.13em], text-[#DBD1C1])
│   │   └── InputBarsRow (flex, flex-row, gap-4)
│   │       ├── SendKudosInput (w-[738px], h-[72px], rounded-[68px], border border-[#998C5F], bg-[rgba(255,234,158,0.1)], px-6) [use client]
│   │       └── SearchInput (w-[381px], h-[72px], rounded-[68px], border border-[#998C5F], bg-[rgba(255,234,158,0.1)], px-6) [use client]
│   │
│   ├── HighlightKudosSection (w-full, flex, flex-col, gap-10)
│   │   ├── SectionHeader (flex, flex-col, gap-4)
│   │   │   ├── Subtitle (font-montserrat, text-2xl, font-bold, text-white)
│   │   │   ├── Divider (w-full, h-px, bg-[#2E3940])
│   │   │   ├── TitleRow (flex, justify-between, items-center)
│   │   │   │   ├── Title (font-montserrat, text-[57px], font-bold, leading-[64px], tracking-[-0.25px], text-[#FFEA9E])
│   │   │   │   └── FilterDropdowns (flex, gap-2)
│   │   │   │       ├── FilterButton (border border-[#998C5F], rounded-lg, px-4, py-2, font-montserrat, text-base, font-bold, text-white)
│   │   │   │       └── FilterButton (same styling)
│   │   │   └── ...
│   │   └── CarouselContainer (relative) [use client]
│   │       ├── CarouselTrack (flex, gap-6, overflow-hidden)
│   │       │   └── HighlightCard x N (w-[528px], border-4 border-[#FFEA9E], bg-[#FFF8E1], rounded-2xl, p-6 pb-4)
│   │       │       ├── CardHeader (flex, items-center, gap-3)
│   │       │       │   ├── Avatar (w-16, h-16, rounded-full, border-[1.869px] border-white, object-cover)
│   │       │       │   ├── PersonInfo (flex, flex-col)
│   │       │       │   │   ├── Name (font-montserrat, text-base, font-bold, text-[#00101A])
│   │       │       │   │   └── DeptCode (font-montserrat, text-sm, font-bold, text-[#999])
│   │       │       │   └── Badge (rounded-full, border-[0.5px] border-[#FFEA9E], px-2, py-0.5, font-montserrat, text-[11px], font-bold, text-white)
│   │       │       ├── MessageBox (border border-[#FFEA9E], bg-[rgba(255,234,158,0.4)], rounded-xl, px-6, py-4)
│   │       │       │   ├── MessageText (font-montserrat, text-xl, font-bold, text-[#00101A])
│   │       │       │   └── Hashtags (font-montserrat, text-base, font-bold, text-[#D4271D])
│   │       │       ├── Timestamp (font-montserrat, text-base, font-bold, text-[#999])
│   │       │       └── LikeRow (flex, items-center, gap-2)
│   │       │           └── LikeCount (font-montserrat, text-2xl, font-bold, text-[#00101A])
│   │       ├── PrevArrow (absolute, left-0, z-10)
│   │       ├── NextArrow (absolute, right-0, z-10)
│   │       └── Pagination (flex, gap-8, font-montserrat, text-[28px], font-bold, text-[#999])
│   │
│   ├── SpotlightBoardSection (w-full, flex, flex-col, gap-10)
│   │   ├── SectionHeader (same pattern as above)
│   │   └── SpotlightVisualization (w-[1157px], h-[548px], border border-[#998C5F], rounded-[47px], relative, overflow-hidden) [use client]
│   │       └── KudosCount (absolute, font-montserrat, text-[36px], font-bold, text-white)
│   │
│   └── AllKudosSection (w-full, flex, flex-col, gap-10)
│       ├── SectionHeader (same pattern as above)
│       └── ContentArea (flex, flex-row, gap-20)
│           ├── KudosFeed (w-[680px], flex, flex-col, gap-6)
│           │   └── KudosCard x 4+ (w-[680px], bg-[#FFF8E1], rounded-3xl, p-10 pb-4)
│           │       ├── CardHeader (flex, items-center, gap-3)
│           │       │   ├── Avatar (w-16, h-16, rounded-full, border-[1.869px] border-white)
│           │       │   ├── PersonInfo (flex, flex-col)
│           │       │   │   ├── Name (text-base, font-bold, text-[#00101A])
│           │       │   │   └── DeptCode (text-sm, font-bold, text-[#999])
│           │       │   └── Badge (pill, text-[11px])
│           │       ├── MessageBox (border border-[#FFEA9E], bg-[rgba(255,234,158,0.4)], rounded-xl, px-6, py-4)
│           │       │   ├── MessageText (text-xl, font-bold, text-[#00101A])
│           │       │   └── Hashtags (text-base, text-[#D4271D])
│           │       ├── ImageGallery (flex, gap-4)
│           │       │   └── Thumbnail x 5 (w-[88px], h-[88px], rounded-[18px], border border-[#998C5F], object-cover)
│           │       ├── CategoryLabel (text-base, font-bold, text-[#00101A])
│           │       ├── Timestamp (text-base, font-bold, text-[#999])
│           │       └── LikeRow (flex, items-center, gap-2)
│           │           └── LikeCount (text-2xl, font-bold, text-[#00101A])
│           │
│           └── Sidebar (w-[422px], flex, flex-col, gap-6, sticky top-[100px])
│               ├── StatsBox (bg-[#00070C], border border-[#998C5F], rounded-[17px], p-6, flex, flex-col, gap-4)
│               │   ├── StatRow (flex, justify-between, items-center)
│               │   │   ├── Label (font-montserrat, text-[22px], font-bold, text-white)
│               │   │   └── Value (font-montserrat, text-[32px], font-bold, text-[#FFEA9E])
│               │   ├── StatRow ...
│               │   └── SecretBoxButton (w-[374px], h-[60px], bg-[#FFEA9E], rounded-lg, font-montserrat, text-[22px], font-bold, text-[#00101A])
│               │
│               └── LeaderboardBox (bg-[#00070C], border border-[#998C5F], rounded-[17px], p-6, flex, flex-col, gap-4)
│                   └── LeaderboardEntry (flex, items-center, gap-4)
│                       ├── Avatar (w-16, h-16, rounded-full)
│                       ├── EntryInfo (flex, flex-col)
│                       │   ├── Name (font-montserrat, text-[22px], font-bold, text-[#FFEA9E])
│                       │   └── Prize (font-montserrat, text-base, font-bold, text-white)
│                       └── ...
│
└── Footer (relative, z-10, border-t border-[#2E3940], px-[90px], py-10, flex, items-center, justify-between)
    ├── FooterLogo (w-[69px], h-[64px], <Image>)
    ├── FooterNav (flex, items-center, gap-12)
    │   └── NavLink x N (font-montserrat, text-sm, font-bold, text-white)
    └── CopyrightText (font-montserrat-alternates, text-base, font-bold, text-white, text-center)
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
| Hero Section | padding: 40px 16px; flex-col; items-center |
| KUDOS Logo | font-size: 64px; line-height: 20px |
| Hero Subtitle | font-size: 20px; line-height: 28px |
| Input Bars | flex-col; width: 100%; each input: width: 100%, height: 56px |
| Section Title | font-size: 32px; line-height: 40px |
| Highlight Carousel | single card visible; card width: 100%; swipe navigation |
| Spotlight Board | width: 100%; height: auto; aspect-ratio preserved; border-radius: 24px |
| All Kudos Content | flex-col; sidebar below feed |
| Kudos Card | width: 100%; padding: 24px 16px 12px 16px |
| Image Gallery | thumbnails: 64x64px; max 4 visible; overflow-x-auto |
| Sidebar | width: 100%; margin-top: 40px |
| Stats Box | width: 100%; padding: 16px |
| Leaderboard Box | width: 100%; padding: 16px |
| Secret Box Button | width: 100% |
| Pagination | font-size: 20px; gap: 20px |
| Footer | padding: 24px 16px; flex-col; gap: 16px; text-align: center |

#### Small Tablet / sm (640px - 767px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 24px |
| Page Content | padding: 48px 24px |
| KUDOS Logo | font-size: 80px |
| Input Bars | flex-col; width: 100% |
| Highlight Cards | narrower cards (~420px); single or two visible |
| Kudos Card | width: 100% |
| Content Area | flex-col; sidebar below feed |
| Sidebar | width: 100% |
| Section Title | font-size: 40px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 40px |
| Page Content | padding: 60px 40px; gap: 80px |
| KUDOS Logo | font-size: 100px |
| Input Bars | flex-row; send: 60%, search: 40% |
| Highlight Cards | two cards visible in carousel |
| Content Area | flex-col or sidebar collapses below feed |
| Kudos Card | width: 100% (single column) |
| Sidebar | width: 100%; flex-row wrapping (stats + leaderboard side by side if space allows) |
| Spotlight Board | width: 100%; height: auto |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All components | As per Figma design (1440px reference width) |
| Header | padding: 12px 144px |
| Page Content | padding: 96px 144px; gap: 120px |
| KUDOS Logo | font-size: 140px |
| Input Bars | flex-row; send: 738px, search: 381px |
| Highlight Cards | 3+ cards visible (528px each) |
| Content Area | flex-row; gap: 80px; feed: 680px, sidebar: 422px |
| Spotlight Board | 1157x548px |

---

## Icon Specifications

| Icon Name | Size | Color | Format | Usage |
|-----------|------|-------|--------|-------|
| saa-logo | 52x48px | Original (multicolor) | PNG | Header branding |
| search-icon | 24x24px | #FFFFFF | SVG | Search input bar icon |
| send-icon | 24x24px | #FFFFFF | SVG | Send kudos input icon |
| chevron-left | 24x24px | #FFFFFF | SVG | Carousel previous arrow |
| chevron-right | 24x24px | #FFFFFF | SVG | Carousel next arrow |
| heart-icon | 24x24px | #00101A | SVG | Like button on cards |
| notification-bell | 24x24px | #FFFFFF | SVG | Header notification |
| chevron-down | 24x24px | #FFFFFF | SVG | Filter dropdown indicator |
| vn-flag | 24x24px | Original (multicolor) | SVG | Language selector flag |
| footer-logo | 69x64px | Original | PNG | Footer SAA logo |

All icons MUST be implemented as **Icon Components** (React components), not raw `<img>` tags or inline SVG strings.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel | transform (translateX) | 300ms | ease-in-out | Prev/Next arrow click |
| Carousel Pagination | color, text-shadow | 150ms | ease-in-out | Active page change |
| Secret Box Button | transform, box-shadow | 150ms | ease-in-out | Hover in/out |
| Filter Dropdown | opacity, transform (translateY) | 150ms | ease-out | Open/Close |
| Filter Chevron | transform (rotate 180deg) | 150ms | ease-in-out | Dropdown open/close |
| Nav Link | color, text-shadow | 150ms | ease-in-out | Hover / active state |
| Input Focus | border-color, box-shadow | 150ms | ease-in-out | Focus in/out |
| Kudos Card | opacity, transform (translateY) | 200ms | ease-out | Load / appear animation |
| Like Button | transform (scale) | 150ms | ease-in-out | Click (scale up then back) |
| Spotlight Visualization | continuous | varies | linear | Interactive node animations |
| Language Chevron | transform (rotate 180deg) | 150ms | ease-in-out | Dropdown open/close |

---

## Implementation Mapping

| Design Element | Tailwind / CSS Class | React Component |
|----------------|---------------------|-----------------|
| Page Container | `bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden` | `SunKudosPage` (Server Component) |
| Background Image | `absolute top-0 left-0 w-full h-[512px] object-cover z-0` | `<Image>` in background layer |
| Gradient Overlay | `absolute inset-0 z-[1]` + inline gradient style `linear-gradient(25deg, #00101A 14.74%, transparent 47.8%)` | `<div>` overlay |
| Header | `sticky top-0 z-50 h-20 bg-[rgba(16,20,23,0.8)] backdrop-blur-sm px-36 flex items-center justify-between` | `<Header>` (shared) |
| Nav Link (active) | `font-montserrat text-sm font-bold text-[#FFEA9E] border-b border-[#FFEA9E]` + gold text-shadow | `<NavLink>` |
| Hero Section | `flex flex-col items-center gap-10` | `<HeroSection>` |
| Hero Subtitle | `font-montserrat text-[36px] font-bold leading-[44px] text-[#FFEA9E] text-center` | `<h2>` |
| KUDOS Logo | `font-svn-gotham text-[140px] font-normal leading-[35px] tracking-[-0.13em] text-[#DBD1C1]` | `<h1>` |
| Input Bars Row | `flex flex-row gap-4` | `<div>` |
| Send Input | `w-[738px] h-[72px] rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] px-6 font-montserrat text-base font-bold text-white placeholder:text-white/50` | `<SendKudosInput>` (use client) |
| Search Input | `w-[381px] h-[72px] rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] px-6 font-montserrat text-base font-bold text-white` | `<SearchInput>` (use client) |
| Section Header | `flex flex-col gap-4` | `<SectionHeader>` |
| Section Title | `font-montserrat text-[57px] font-bold leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h2>` |
| Section Subtitle | `font-montserrat text-2xl font-bold text-white` | `<span>` |
| Section Divider | `w-full h-px bg-[#2E3940]` | `<hr>` or `<div>` |
| Filter Dropdown | `border border-[#998C5F] rounded-lg px-4 py-2 font-montserrat text-base font-bold text-white` | `<FilterDropdown>` (use client) |
| Carousel Container | `relative w-full overflow-hidden` | `<HighlightCarousel>` (use client) |
| Highlight Card | `w-[528px] border-4 border-[#FFEA9E] bg-[#FFF8E1] rounded-2xl p-6 pb-4 flex flex-col gap-4` | `<HighlightKudosCard>` |
| Card Avatar | `w-16 h-16 rounded-full border-[1.869px] border-white object-cover` | `<Image>` |
| Card Badge | `rounded-full border-[0.5px] border-[#FFEA9E] px-2 py-0.5 font-montserrat text-[11px] font-bold text-white` | `<Badge>` |
| Card Message Box | `border border-[#FFEA9E] bg-[rgba(255,234,158,0.4)] rounded-xl px-6 py-4` | `<div>` |
| Message Text | `font-montserrat text-xl font-bold text-[#00101A]` | `<p>` |
| Hashtag Text | `font-montserrat text-base font-bold text-[#D4271D]` | `<span>` |
| Person Name | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A]` | `<span>` |
| Dept Code | `font-montserrat text-sm font-bold leading-5 tracking-[0.1px] text-[#999]` | `<span>` |
| Timestamp | `font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#999]` | `<span>` |
| Like Count | `font-montserrat text-2xl font-bold text-[#00101A]` | `<span>` |
| Pagination | `flex gap-8 font-montserrat text-[28px] font-bold text-[#999]` | `<Pagination>` (use client) |
| Spotlight Board | `w-[1157px] max-w-full h-[548px] border border-[#998C5F] rounded-[47px] relative overflow-hidden` | `<SpotlightVisualization>` (use client) |
| Spotlight Count | `font-montserrat text-[36px] font-bold text-white` | `<span>` |
| Kudos Feed | `w-[680px] flex flex-col gap-6` | `<KudosFeed>` |
| Kudos Card | `w-[680px] bg-[#FFF8E1] rounded-3xl p-10 pb-4 flex flex-col gap-4` | `<KudosCard>` |
| Image Gallery | `flex gap-4` | `<div>` |
| Image Thumbnail | `w-[88px] h-[88px] rounded-[18px] border border-[#998C5F] object-cover` | `<Image>` |
| Category Label | `font-montserrat text-base font-bold tracking-[0.5px] text-[#00101A]` | `<span>` |
| Sidebar | `w-[422px] flex flex-col gap-6 sticky top-[100px]` | `<Sidebar>` |
| Stats Box | `bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4` | `<StatsBox>` |
| Stat Label | `font-montserrat text-[22px] font-bold text-white` | `<span>` |
| Stat Value | `font-montserrat text-[32px] font-bold text-[#FFEA9E]` | `<span>` |
| Secret Box Button | `w-[374px] h-[60px] bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold text-[#00101A] flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-lg` | `<SecretBoxButton>` (use client) |
| Leaderboard Box | `bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4` | `<LeaderboardBox>` |
| Leaderboard Name | `font-montserrat text-[22px] font-bold text-[#FFEA9E]` | `<span>` |
| Leaderboard Desc | `font-montserrat text-base font-bold text-white tracking-[0.15px]` | `<span>` |
| Footer | `relative z-10 border-t border-[#2E3940] px-[90px] py-10 flex items-center justify-between` | `<Footer>` (shared) |
| Footer Copyright | `font-montserrat-alternates text-base font-bold text-white text-center` | `<p>` |

---

## Media Files

| Asset | Type | Target Path | Usage |
|-------|------|-------------|-------|
| SAA Logo | PNG | `public/assets/kudos/saa-logo.png` | Header branding (shared, may reuse `public/assets/login/saa-logo.png`) |
| Key Visual BG | JPG | `public/assets/kudos/keyvisual-bg.jpg` | Hero background image (512px region) |
| KUDOS Logo | SVG/Font | `public/assets/kudos/kudos-logo.svg` | KUDOS text logo (or rendered via SVN-Gotham font) |
| VN Flag | SVG | `public/assets/login/vn-flag.svg` | Language selector flag (shared) |
| Footer Logo | PNG | `public/assets/homepage/saa-logo-footer.png` | Footer SAA logo (shared) |
| Search Icon | SVG | Component | Search input bar icon |
| Send Icon | SVG | Component | Send kudos input bar icon |
| Chevron Left | SVG | Component | Carousel prev arrow |
| Chevron Right | SVG | Component | Carousel next arrow |
| Heart Icon | SVG | Component | Like/reaction button |
| Notification Bell | SVG | `public/assets/homepage/notification-icon.svg` | Header notification (shared) |
| Chevron Down | SVG | Component | Filter/dropdown indicator |
| Kudos Background | PNG | `public/assets/homepage/kudos-bg.png` | May be reused for spotlight background (shared) |
| Pen/Edit Icon | SVG | `public/assets/homepage/pen-icon.svg` | Send kudos action (shared) |
| Avatar Placeholders | PNG | API-driven | User profile photos loaded from API |
| Image Attachments | JPG/PNG | API-driven | Kudos card image gallery from API |
| Spotlight Graph Data | JSON/API | API-driven | Network graph / word cloud visualization data |

**Note**: Many assets are shared with the Homepage and Login pages. Reuse existing `public/assets/` files where possible rather than duplicating.

---

## Notes

- **Reference width**: 1440px (Figma artboard). All fixed pixel values are based on this reference.
- **Page height**: 5862px total (long scrollable page -- the most complex screen in SAA 2025).
- **KV gradient**: `linear-gradient(25deg, #00101A 14.74%, transparent 47.8%)` applied over a 512px-tall keyvisual background image region.
- **Cards**: Use warm cream background `#FFF8E1` with gold accent borders and message boxes. This creates a striking contrast against the dark `#00101A` page background.
- **Badges**: Have text-shadow for glow effect and use very small font sizes (~11-13px). The x2 multiplier badge uses black stroke on white text for a distinct look.
- **SVN-Gotham font**: Used exclusively for the large KUDOS logo text at 140px. Must be loaded as a custom font via `@font-face` or `next/font/local` since it is not available on Google Fonts.
- **Sidebar stickiness**: The sidebar (stats + leaderboard) should use `position: sticky; top: 100px` so it remains visible while scrolling through the kudos feed.
- **Color contrast**: White (#FFFFFF) on dark (#00101A) = ~19.5:1 ratio (exceeds WCAG AAA). Dark (#00101A) on cream (#FFF8E1) = ~15.2:1 ratio (exceeds WCAG AAA). Dark (#00101A) on gold (#FFEA9E) = ~13.8:1 ratio (exceeds WCAG AAA).
- **Header/Footer**: Shared components with other SAA pages. The "Sun* Kudos" nav link should be in active state on this page.
- **Spotlight visualization**: The network graph / word cloud is an interactive component that will require a dedicated visualization library (e.g., D3.js, vis.js, or a canvas-based approach). The 47px border-radius creates a distinctive rounded container.
- **All typography is Montserrat weight 700** except the KUDOS logo (SVN-Gotham 400) and copyright (Montserrat Alternates 700).
- **Fonts**: Montserrat and Montserrat Alternates MUST be loaded via `next/font/google` in `src/app/layout.tsx`. SVN-Gotham must be loaded via `next/font/local`.
- **Background key visual image** should use `quality={85}` and `sizes="100vw"` in the Next.js `<Image>` component for performance.
- All icons MUST be implemented as Icon Components (React components), not `<img>` tags or inline SVG.
- Colors should use CSS variables defined in `src/app/globals.css` using TailwindCSS v4 `@theme inline` directive.
