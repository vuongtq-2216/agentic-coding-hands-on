# Design Style: HeThongGiai (Awards System)

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `HeThongGiai`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/zFYDgyj_pD
**Extracted At**: 2026-04-07

---

## Page Overview

- **Dimensions**: 1440 x 6410px
- **Background**: #00101A
- **Reference width**: 1440px (different from Homepage's 1512px)

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | #101417 | 80% | Semi-transparent header (rgba(16, 20, 23, 0.8)) |
| --color-cta-primary | #FFEA9E | 100% | Gold accent - titles, active nav, meta labels |
| --color-text-gold | #FFEA9E | 100% | Gold text for page title, card titles, active sidebar nav |
| --color-cta-text | #00101A | 100% | Dark text on gold buttons |
| --color-text-primary | #FFFFFF | 100% | White body text |
| --color-border | #2E3940 | 100% | Divider lines, separators (rgba(46, 57, 64, 1)) |
| --color-divider | #2E3940 | 100% | Alias for --color-border, used in title section and card separators |
| --color-border-gold | #998C5F | 100% | Profile button border |
| --color-notification | #D4271D | 100% | Notification badge |
| --color-kudos-bg | #0F0F0F | 100% | Kudos card fallback background |
| --color-kudos-text | #DBD1C1 | 100% | Warm beige for KUDOS decorative text |
| --color-glow | #FAE287 | 100% | Gold glow in shadows and text-shadows |
| --color-secondary-btn-bg | #FFEA9E | 10% | Active footer nav background (rgba(255, 234, 158, 0.10)) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-page-title | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E |
| --text-page-subtitle | Montserrat | 24px | 700 | 32px | 0 | #FFFFFF |
| --text-award-card-title | Montserrat | 24px | 700 | 32px | 0 | #FFEA9E |
| --text-award-description | Montserrat | 16px | 700 | 24px | 0.5px | #FFFFFF |
| --text-meta-label | Montserrat | 24px | 700 | 32px | 0 | #FFEA9E |
| --text-meta-number | Montserrat | 36px | 700 | 44px | 0 | #FFFFFF |
| --text-meta-unit | Montserrat | 14px | 700 | 20px | 0.1px | #FFFFFF |
| --text-sidebar-active | Montserrat | 14px | 700 | 20px | 0.25px | #FFEA9E + text-shadow glow |
| --text-sidebar-inactive | Montserrat | 14px | 700 | 20px | 0.25px | #FFFFFF |
| --text-header-nav | Montserrat | 16px / 14px | 700 | 24px / 20px | 0.15px / 0.1px | #FFFFFF / #FFEA9E |
| --text-footer-nav | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 | #FFFFFF |
| --text-kudos-logo | SVN-Gotham | 96px | 400 | 24px | -13% | #DBD1C1 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Desktop horizontal page padding |
| --spacing-page-y | 96px | Desktop vertical page padding |
| --spacing-main-gap | 120px | Gap between major page sections |
| --spacing-sidebar-to-cards | 80px | Gap between sidebar and card list |
| --spacing-between-cards | 80px | Gap between award cards |
| --spacing-card-image-to-text | 40px | Gap from card image to text content |
| --spacing-card-content-gap | 32px | Gap within card text content panel |
| --spacing-title-to-description | 24px | Gap from card title to description |
| --spacing-sidebar-items | 16px | Gap between sidebar nav items |
| --spacing-title-section-inner | 16px | Gap within page title section (subtitle + divider + title) |
| --spacing-meta-section-inner | 16px | Gap within count/prize meta sections |
| --spacing-count-to-unit | 8px | Gap from count number to unit label |
| --spacing-footer-padding | 40px 90px | Footer padding |
| --spacing-header-padding | 12px 144px | Header padding |
| --spacing-footer-nav-gap | 48px | Between footer nav links |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card-image | 24px | Award card images (rounded-3xl) |
| --radius-card-content | 16px | Card text content panel (rounded-2xl) |
| --radius-kudos-card | 16px | Kudos section card |
| --radius-sidebar-item | 4px | Inactive sidebar items |
| --border-card-image | 0.955px solid #FFEA9E | Award card image gold border |
| --border-sidebar-active | 1px solid #FFEA9E | Active sidebar item bottom border |
| --border-divider | 1px solid #2E3940 | Section dividers, separators |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-card-image | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images (gold glow) |
| --shadow-sidebar-active | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active sidebar text glow |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Hero overlay | linear-gradient(0deg, #00101A -4.23%, transparent 52.79%) | Bottom-to-top gradient over keyvisual (0deg angle) |

### Backdrop Filters

| Name | Value | Usage |
|------|-------|-------|
| Card content blur | backdrop-filter: blur(32px) | Award card text content panel |

---

## Layout Specifications

### Page Structure

```
Full page: 1440 x 6410px
Background: #00101A
Content area: 1152px wide (1440 - 144*2 horizontal padding)
```

### Header (Shared Component)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 80px |
| Background | rgba(16, 20, 23, 0.8) |
| Padding | 12px 144px |
| Position | Fixed top |
| Active link | "Awards Information" (gold #FFEA9E + text-shadow glow) |

### Hero / Keyvisual Section (313:8437)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 547px |
| Position | absolute, top: 0 (below header at y:80) |
| Background | Cover image (keyvisual-bg.jpg) |
| Gradient overlay (313:8439) | 1440 x 627px, linear-gradient(0deg, #00101A -4.23%, transparent 52.79%) |
| ROOT FURTHER logo | 338 x 150px at position (144, 184) |

### Title Section (313:8453)

| Property | Value |
|----------|-------|
| Width | 1152px |
| Direction | flex column |
| Gap | 16px |
| Position | x: 144, y: 454 |
| Subtitle | 24px/32px white, Montserrat 700 |
| Divider | 1px solid #2E3940 |
| Title | 57px/64px gold (#FFEA9E), Montserrat 700, letter-spacing -0.25px |

### Main Content Area (313:8458)

| Property | Value |
|----------|-------|
| Width | 1152px |
| Direction | flex row |
| Gap | 80px |
| Justify | space-between |
| Left sidebar | 178px wide |
| Right card list | 853px wide |

### Sidebar Navigation (313:8459)

| Property | Value |
|----------|-------|
| Width | 178px |
| Height | 448px |
| Direction | flex column |
| Gap | 16px |
| Position | x: 144, y: 703, sticky (implementation) |

**Active item:**

| Property | Value |
|----------|-------|
| Border bottom | 1px solid #FFEA9E |
| Text color | #FFEA9E |
| Text shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Padding | 16px |
| Icon | 24x24 target icon |

**Inactive item:**

| Property | Value |
|----------|-------|
| Border radius | 4px |
| Text color | #FFFFFF |
| Padding | 16px |

**Hover state (all items):**

| Property | Value |
|----------|-------|
| Background | rgba(255, 255, 255, 0.1) |
| Transition | 150ms ease-in-out |
| Cursor | pointer |

**Sidebar items (in order):**
1. Top Talent (active by default)
2. Top Project
3. Top Project Leader
4. Best Manager
5. Signature 2025 Creator
6. MVP

### Award Card Template

| Property | Value |
|----------|-------|
| Card container | Full width, flex column, gap 80px (to next card/separator) |
| Content row | flex row, gap 40px |

**Card Image:**

| Property | Value |
|----------|-------|
| Size | 336 x 336px |
| Border | 0.955px solid #FFEA9E |
| Border radius | 24px (rounded-3xl) |
| Shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Mix blend mode | screen |

**Card Text Panel:**

| Property | Value |
|----------|-------|
| Direction | flex column |
| Gap | 32px |
| Backdrop filter | blur(32px) |
| Border radius | 16px (rounded-2xl) |
| Description width | 480px |

**Card Content Structure:**

| Element | Spec |
|---------|------|
| Title | 24px/32px gold (#FFEA9E), Montserrat 700, with icon |
| Description | 16px/24px white, Montserrat 700, text-justify, 480px wide |
| Separator | 480px or 853px wide, 1px #2E3940 |
| Count section | icon 24x24 + label "So luong giai thuong:" (24px gold) + number (36px white) + unit "Don vi" (14px white) |
| Prize section | icon 24x24 + label "Gia tri giai thuong:" (24px gold) + number (36px white) + unit "cho moi giai" (14px white) |

### Kudos Section (335:12023)

| Property | Value |
|----------|-------|
| Size | 1152 x 500px |
| Background | Background image + #0F0F0F fallback |
| Border radius | 16px |
| Content | Same as Homepage Kudos section |

### Footer (Shared Component)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Border top | 1px solid #2E3940 |
| Padding | 40px 90px |
| Logo | 69 x 64px |
| Nav gap | 48px |
| Active link | "Awards Information" has active state |

---

## Responsive Behavior

Based on TailwindCSS breakpoints:

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<640px) | Sidebar hidden (becomes horizontal scroll or accordion); cards stack vertically; image + text stack column; reduce padding to 16px |
| sm (640-767px) | Sidebar becomes horizontal nav or toggle; cards narrower |
| md (768-1023px) | Sidebar visible but narrower; 2-col layout may collapse |
| lg (>=1024px) | Full desktop layout as designed |

---

## Component Hierarchy

```
AwardsPage (bg: #00101A, min-h-screen, flex, flex-col, relative)
├── BackgroundLayer (absolute, top-0, w-full, h-[627px])
│   ├── KeyVisualImage (object-cover)
│   └── GradientOverlay (linear-gradient 0deg)
├── Header (shared, "Awards Information" active) [from layout]
├── Main (relative, z-10, px-36, py-24, flex-col, gap-[120px])
│   ├── HeroSection (ROOT FURTHER logo 338x150)
│   ├── TitleSection (subtitle + divider + title)
│   └── AwardsContent (flex-row, gap-20)
│       ├── Sidebar (w-[178px], sticky, flex-col, gap-4) [use client]
│       │   ├── SidebarItem "Top Talent" (active: gold + border + glow)
│       │   ├── SidebarItem "Top Project" (inactive: white)
│       │   ├── SidebarItem "Top Project Leader"
│       │   ├── SidebarItem "Best Manager"
│       │   ├── SidebarItem "Signature 2025 Creator"
│       │   └── SidebarItem "MVP"
│       └── CardList (w-[853px], flex-col, gap-20)
│           ├── AwardDetailCard "Top Talent"
│           │   ├── Image (336x336, gold border, rounded-3xl, glow shadow)
│           │   └── Content (flex-col, gap-8, backdrop-blur)
│           │       ├── Title (24px gold + icon)
│           │       ├── Description (16px white, justify, 480px)
│           │       ├── Separator
│           │       ├── CountSection (icon + "Số lượng giải thưởng:" + "10" + "Đơn vị")
│           │       ├── Separator
│           │       └── PrizeSection (icon + "Giá trị giải thưởng:" + "7.000.000 VNĐ" + "cho mỗi giải")
│           ├── AwardDetailCard "Top Project" (same structure)
│           ├── AwardDetailCard "Top Project Leader"
│           ├── AwardDetailCard "Best Manager"
│           ├── AwardDetailCard "Signature 2025 Creator" (has dual prize: individual + team)
│           └── AwardDetailCard "MVP"
├── KudosSection (same as Homepage)
└── Footer (shared, "Awards Information" active) [from layout]
```

---

## Implementation Mapping

| Design Element | Figma Node | Tailwind Classes | React Component |
|----------------|------------|------------------|-----------------|
| Page | 313:8436 | `bg-[#00101A] min-h-screen` | AwardsPage (Server) |
| Hero BG | 313:8437 | `absolute top-0 w-full h-[547px] object-cover` | `<Image>` |
| Gradient | 313:8439 | `absolute top-0 w-full h-[627px]` + inline gradient | `<div>` |
| Title section | 313:8453 | `w-[1152px] flex flex-col gap-4` | `<section>` |
| Sidebar | 313:8459 | `w-[178px] sticky top-24 flex flex-col gap-4` | `<AwardsSidebar>` [use client] |
| Sidebar item (active) | 313:8460 | `text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:...]` | `<SidebarItem>` |
| Sidebar item (inactive) | -- | `text-white rounded` | `<SidebarItem>` |
| Card list | 313:8466 | `w-[853px] flex flex-col gap-20` | `<div>` |
| Award card | 313:8467+ | `flex flex-row gap-10` | `<AwardDetailCard>` |
| Card image | child | `w-[336px] h-[336px] rounded-3xl border-[#FFEA9E] shadow-glow` | `<Image>` |
| Card content | child | `flex flex-col gap-8 backdrop-blur-[32px] rounded-2xl` | `<div>` |
| Meta number | child | `font-montserrat text-4xl font-bold text-white` | `<span>` |
| Meta label | child | `font-montserrat text-2xl font-bold text-[#FFEA9E]` | `<span>` |
| Meta unit | child | `font-montserrat text-sm font-bold text-white` | `<span>` |
| Kudos section | 335:12023 | Same as Homepage | `<KudosSection>` |
| Footer | -- | `border-t border-[#2E3940] px-[90px] py-10` | `<Footer>` (shared) |
| Header | -- | `bg-[rgba(16,20,23,0.8)] px-36 py-3 h-20` | `<Header>` (shared) |

---

## Media Files

| Node ID | Target Path | Usage |
|---------|-------------|-------|
| 2167:5138 | public/assets/awards/keyvisual-bg.jpg | Hero background image |
| 2789:12915 | public/assets/awards/root-further-logo.png | ROOT FURTHER logo (338 x 150px) |
| (award images) | public/assets/awards/award-*.png | 6 award card images (336 x 336px) -- can reuse from Homepage |
| Various icons | -- | Target, Diamond, License icons (React components) |

---

## Notes

- Page reference width is 1440px (not 1512px like Homepage).
- The gradient is bottom-to-top (0deg angle), different from Login and Homepage gradients.
- Award card text panel uses `backdrop-filter: blur(32px)` with `border-radius: 16px`.
- Sidebar should use `position: sticky` (not specified in Figma data but indicated by spec).
- Award data can be shared with Homepage cards (`src/data/awards.ts`) but needs to be extended with `description`, `count`, `unit`, `prize`, and `prizeNote` fields.
- The "Signature 2025 - Creator" card has a unique dual-prize layout (individual prize + team prize with a "Hoac" separator between them).
- Card images use `mix-blend-mode: screen` for the gold glow effect.
