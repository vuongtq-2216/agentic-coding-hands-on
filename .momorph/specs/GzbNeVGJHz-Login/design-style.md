# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/GzbNeVGJHz
**Extracted At**: 2026-04-06

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, gradient endpoints |
| --color-header-bg | #0B0F12 | 80% | Header background (rgba(11,15,18,0.8)) |
| --color-cta-primary | #FFEA9E | 100% | Login button background (golden yellow) |
| --color-cta-text | #00101A | 100% | Login button text (dark on gold) |
| --color-text-primary | #FFFFFF | 100% | Body text, hero text, header text, footer text |
| --color-border-footer | #2E3940 | 100% | Footer top border separator |
| --color-gradient-start | #00101A | 100% | Left-to-right and bottom-to-top gradient solid end |
| --color-gradient-end | #00101A | 0% | Gradient transparent end |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hero-body | Montserrat | 20px | 700 | 40px | 0.5px |
| --text-cta-button | Montserrat | 22px | 700 | 28px | 0 |
| --text-lang-selector | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Desktop horizontal page padding (header + hero) |
| --spacing-page-y-top | 96px | Hero section top padding |
| --spacing-page-y-bottom | 96px | Hero section bottom padding |
| --spacing-hero-gap | 80px | Gap between key visual and content block |
| --spacing-content-gap | 24px | Gap between text and login button |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |
| --spacing-btn-x | 24px | Login button horizontal padding |
| --spacing-btn-y | 16px | Login button vertical padding |
| --spacing-btn-icon-gap | 8px | Gap between button text and Google icon |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn | 8px | Login button border-radius |
| --radius-lang-btn | 4px | Language selector button border-radius |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-btn-hover | 0 4px 12px rgba(0,0,0,0.3) | Login button hover elevation |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 100vw | Full viewport width |
| min-height | 100vh | Full viewport height |
| background | #00101A | Base dark background |
| display | flex | Vertical stack layout |
| flex-direction | column | Header → Content → Footer |
| position | relative | For absolute background layers |
| overflow | hidden | Prevent horizontal scroll from background |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Page-level vertical stack |
| flex-direction | column | Header, hero content, footer |
| justify-content | flex-start | Content starts from top |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐ 0px
│  A_Header (h:80px, bg:rgba(11,15,18,0.8), sticky top-0, z:50)       │
│  ├─ px: 144px, flex, items-center, justify-between                   │
│  │                                                                    │
│  │  ┌──────────┐                                    ┌──────────────┐ │
│  │  │ A.1 Logo │                                    │ A.2 Language │ │
│  │  │ 52x48px  │                                    │ 108x56px     │ │
│  │  │ (PNG)    │                                    │ VN+Flag+▼    │ │
│  │  └──────────┘                                    └──────────────┘ │
├──────────────────────────────────────────────────────────────────────┤ 80px
│                                                                      │
│  C_Keyvisual (position:absolute, inset:0, z:0)                       │
│  ├─ Background artwork image (object-cover, full-bleed)              │
│  ├─ Gradient overlay L→R: #00101A → transparent (25.41% breakpoint)  │
│  └─ Gradient overlay B→T: #00101A 22.48% → transparent 51.74%       │
│                                                                      │
│  B_Bìa Hero Content (flex:1, relative, z:10)                         │
│  ├─ px: 144px, py: 96px, flex-col, gap: 80px                        │
│  │                                                                    │
│  │  ┌─────────────────────────────────────────────┐                  │
│  │  │ B.1 ROOT FURTHER Logo (451x200px, PNG)      │ y:288          │
│  │  └─────────────────────────────────────────────┘                  │
│  │                                                                    │
│  │  ┌────────────────────────────────────────┐                       │
│  │  │ B.2 Content Text (480x80px)            │ y:568                │
│  │  │ "Bắt đầu hành trình của bạn cùng      │                       │
│  │  │  SAA 2025."                            │                       │
│  │  │ "Đăng nhập để khám phá!"               │                       │
│  │  │ Montserrat 20px/40px bold white        │                       │
│  │  └────────────────────────────────────────┘                       │
│  │                                           gap: 24px               │
│  │  ┌────────────────────────────────────┐                           │
│  │  │ B.3 Login Button (305x60px)        │ y:672                    │
│  │  │ bg:#FFEA9E, rounded-lg             │                           │
│  │  │ "LOGIN With Google" + Google icon  │                           │
│  │  │ Montserrat 22px bold #00101A       │                           │
│  │  └────────────────────────────────────┘                           │
│  │                                                                    │
├──────────────────────────────────────────────────────────────────────┤ 933px
│  D_Footer (border-top: 1px solid #2E3940, z:10)                      │
│  ├─ px: 90px, py: 40px, flex, items-center, justify-center          │
│  │  "Bản quyền thuộc về Sun* © 2025"                                │
│  │  Montserrat Alternates 16px bold white, text-center               │
└──────────────────────────────────────────────────────────────────────┘ 1024px
```

---

## Component Style Details

### A_Header — Header Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | - |
| width | 1440px (100%) | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11,15,18,0.8) | `background-color: rgba(11,15,18,0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |

### A.1 SAA Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;178:1033;178:1030 | - |
| width | 52px | `width: 52px` |
| height | 48px | `height: 48px` |
| type | PNG image | Next.js `<Image>` component |
| alt | "SAA 2025 Logo" | Accessibility |

### A.2 Language Selector

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | - |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- VN Flag icon (Node: I662:14391;186:1696;186:1821;186:1709) — 24x24px SVG
- "VN" text — Montserrat 16px, weight 700, line-height 24px, white, letter-spacing 0.15px
- Chevron Down icon (Node: I662:14391;186:1696;186:1821;186:1441) — 24x24px SVG

**States:**

| State | Changes |
|-------|---------|
| Default | As specified |
| Hover | background: rgba(255,255,255,0.1), cursor: pointer |
| Active/Open | Chevron rotates 180deg, dropdown visible |
| Focus | outline: 2px solid rgba(255,255,255,0.5), outline-offset: 2px |

### B.1 ROOT FURTHER Key Visual Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2939:9548 | - |
| width | 451px | `width: 451px; max-width: 100%` |
| height | 200px | `height: auto` |
| aspect-ratio | 115/51 | `aspect-ratio: 115/51` |
| type | PNG image | Next.js `<Image>` with `priority` |
| alt | "ROOT FURTHER - SAA 2025" | Accessibility |

### B.2 Content Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | - |
| width | 480px | `width: 480px; max-width: 100%` |
| padding-left | 16px | `padding-left: 16px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: white` |
| text-align | left | `text-align: left` |
| content | "Bắt đầu hành trình của bạn cùng SAA 2025.\nĐăng nhập để khám phá!" | Two lines |

### B.3 Login Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14426 (instance) | - |
| width | 305px | `width: 305px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | flex-start | `justify-content: flex-start` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Button Text:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14426;186:1568 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| content | "LOGIN With Google " | - |

**Google Icon:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14426;186:1766 | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| type | SVG | Icon Component |

**States:**

| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3) |
| Active | transform: translateY(0); box-shadow: none |
| Disabled/Loading | opacity: 0.7; cursor: not-allowed; pointer-events: none |
| Focus | outline: 2px solid #FFEA9E; outline-offset: 2px |

### D_Footer — Footer Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | - |
| width | 100% | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` (Figma source; renders as centered with single child) |

**Footer Text:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14447;342:1413 | - |
| font-family | Montserrat Alternates | `font-family: var(--font-montserrat-alternates)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |
| content | "Bản quyền thuộc về Sun* © 2025" | - |

### Error Banner (not in Figma — defined in spec)

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% (max: 480px) | `width: 100%; max-width: 480px` |
| padding | 12px 16px | `padding: 12px 16px` |
| background | rgba(239,68,68,0.15) | `background-color: rgba(239,68,68,0.15)` |
| border | 1px solid #EF4444 | `border: 1px solid #EF4444` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | #FCA5A5 | `color: #FCA5A5` |
| margin-bottom | 16px | `margin-bottom: 16px` |
| position | Above the Login button, within the hero text+button container |

**Animation**: Fade in (opacity 0→1, 200ms ease-out), auto-dismiss after 8s with fade out.

### Background Layers

**Key Visual Image (C_Keyvisual):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14389 | - |
| width | 1441px | `width: 100%` |
| height | 1022px | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| object-fit | cover | `object-fit: cover` |
| z-index | 0 | `z-index: 0` |

**Gradient Overlay Left-to-Right:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14392 | - |
| position | absolute | `position: absolute; inset: 0` |
| background | linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%) | `background: linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)` |

**Gradient Overlay Bottom-to-Top:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14390 | - |
| position | absolute | `position: absolute; inset: 0` |
| background | linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%) | `background: linear-gradient(to top, #00101A 22.48%, transparent 51.74%)` |

---

## Component Hierarchy with Styles

```
LoginPage (bg: #00101A, min-h-screen, flex, flex-col, relative, overflow-hidden)
├── BackgroundLayer (absolute, inset-0, z-0)
│   ├── KeyVisualImage (absolute, inset-0, object-cover, w-full, h-full)
│   ├── GradientLeft (absolute, inset-0, bg-gradient: 90deg #00101A→transparent)
│   └── GradientBottom (absolute, inset-0, bg-gradient: 0deg #00101A→transparent)
│
├── Header (sticky, top-0, z-50, h-20, bg-[rgba(11,15,18,0.8)], px-36, flex, items-center, justify-between)
│   ├── SAALogo (w-[52px], h-[48px], <Image>)
│   └── LanguageSelector (flex, items-center, gap-0.5, px-4, py-4, rounded, cursor-pointer) [use client]
│       ├── FlagVNIcon (w-6, h-6, SVG component)
│       ├── LangText ("VN", font-montserrat, text-base, font-bold, text-white)
│       └── ChevronDownIcon (w-6, h-6, SVG component, transition-transform)
│
├── HeroContent (flex-1, relative, z-10, flex, flex-col, justify-start, px-36, py-24, gap-20)
│   └── ContentFrame (flex, flex-col, justify-center, gap-20)
│       ├── RootFurtherLogo (w-[451px], max-w-full, h-auto, <Image priority>)
│       └── TextAndButton (flex, flex-col, gap-6, pl-4)
│           ├── InvitationText (w-[480px], max-w-full, font-montserrat, text-xl, font-bold, leading-10, tracking-wide, text-white)
│           ├── ErrorBanner (conditional, max-w-[480px], bg-red-500/15, border border-red-500, rounded-lg, p-3, mb-4) [use client]
│           │   └── ErrorText (font-montserrat, text-sm, font-medium, text-red-300)
│           └── LoginButton (w-[305px], h-[60px], bg-[#FFEA9E], rounded-lg, px-6, py-4, flex, items-center, gap-2, transition-all) [use client]
│               ├── ButtonTextFrame (flex, items-center, gap-1)
│               │   └── ButtonText ("LOGIN With Google" | "Logging in...", font-montserrat, text-[22px], font-bold, text-[#00101A])
│               └── GoogleIcon | Spinner (w-6, h-6, SVG component, conditional on isLoading)
│
└── Footer (relative, z-10, border-t, border-[#2E3940], px-[90px], py-10, flex, items-center, justify-center)
    └── CopyrightText ("Bản quyền thuộc về Sun* © 2025", font-montserrat-alternates, text-base, font-bold, text-white, text-center)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 639px |
| Small Tablet (sm) | 640px | 767px |
| Tablet (md) | 768px | 1023px |
| Desktop (lg) | 1024px | 1279px |
| XL Desktop (xl) | 1280px | infinity |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|-----------|---------|
| Header | height: 64px; padding: 12px 16px |
| SAA Logo | width: 40px; height: 36px |
| Language Selector | Compact: flag + chevron only, hide "VN" text; width: auto |
| Hero Section | padding: 40px 16px |
| Hero gap | gap: 40px (reduced from 80px) |
| ROOT FURTHER Logo | max-width: 280px; height: auto |
| Content Text | font-size: 16px; line-height: 28px; width: 100%; padding-left: 0 |
| Content gap | gap: 16px (reduced from 24px) |
| Login Button | width: 100%; height: 56px; font-size: 18px |
| Footer | padding: 24px 16px; font-size: 14px |
| Background gradients | Adjust left gradient to cover more (50%+) for text readability |

#### Small Tablet / sm (640px - 767px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 24px |
| Language Selector | Show "VN" text (restore from mobile compact) |
| Hero Section | padding: 48px 24px |
| Hero gap | gap: 48px |
| ROOT FURTHER Logo | max-width: 320px; height: auto |
| Content Text | font-size: 17px; line-height: 32px; width: 100% |
| Login Button | width: 305px (as design); height: 56px |
| Footer | padding: 28px 24px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 40px |
| Hero Section | padding: 60px 40px |
| Hero gap | gap: 60px |
| ROOT FURTHER Logo | max-width: 360px |
| Content Text | font-size: 18px; line-height: 36px |
| Login Button | width: 305px (as design) |
| Footer | padding: 32px 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All components | As per Figma design (1440px reference width) |
| Header | padding: 12px 144px |
| Hero Section | padding: 96px 144px |
| Hero gap | gap: 80px |
| ROOT FURTHER Logo | width: 451px |
| Login Button | width: 305px; height: 60px |
| Footer | padding: 40px 90px |

---

## Icon Specifications

| Icon Name | Size | Color | Node ID | Format | Usage |
|-----------|------|-------|---------|--------|-------|
| saa-logo | 52x48px | Original (multicolor) | I662:14391;178:1033;178:1030 | PNG | Header branding |
| vn-flag | 24x24px | Original (multicolor) | I662:14391;186:1696;186:1821;186:1709 | SVG | Language selector flag |
| chevron-down | 24x24px | #FFFFFF | I662:14391;186:1696;186:1821;186:1441 | SVG (create as component) | Language dropdown indicator |
| root-further-logo | 451x200px | Original | 2939:9548 | PNG | Hero branding image |
| google-icon | 24x24px | Original (multicolor) | I662:14426;186:1766 | SVG | Login button icon |

All icons MUST be implemented as **Icon Components** (React components), not raw `<img>` tags or inline SVG strings.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Login Button | transform, box-shadow | 150ms | ease-in-out | Hover in/out |
| Login Button | opacity | 150ms | ease-in-out | Disabled state transition |
| Language Selector | background-color | 150ms | ease-in-out | Hover |
| Language Chevron | transform (rotate 180deg) | 150ms | ease-in-out | Dropdown open/close |
| Language Dropdown | opacity, transform (translateY) | 150ms | ease-out | Open/Close |
| Error Banner | opacity | 200ms | ease-out | Show/Hide |
| Loading Spinner | transform (rotate 360deg) | 800ms | linear (infinite) | isLoading state |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 662:14387 | `bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden` | `LoginPage` (Server Component) |
| Background Image | 662:14389 | `absolute inset-0 object-cover w-full h-full` | `<Image>` in background layer |
| Gradient Left | 662:14392 | `absolute inset-0` + inline gradient style | `<div>` overlay |
| Gradient Bottom | 662:14390 | `absolute inset-0` + inline gradient style | `<div>` overlay |
| Header | 662:14391 | `sticky top-0 z-50 h-20 bg-[rgba(11,15,18,0.8)] px-36 flex items-center justify-between` | `<Header>` |
| SAA Logo | I662:14391;178:1033;178:1030 | `w-[52px] h-[48px]` | `<Image>` |
| Language Selector | I662:14391;186:1601 | `flex items-center gap-0.5 px-4 rounded cursor-pointer` | `<LanguageSelector>` (use client) |
| VN Flag | I662:14391;186:1696;186:1821;186:1709 | `w-6 h-6` | `<FlagVNIcon>` component |
| Language Text | I662:14391;186:1696;186:1821;186:1439 | `font-montserrat text-base font-bold text-white` | `<span>` |
| Chevron Down | I662:14391;186:1696;186:1821;186:1441 | `w-6 h-6 transition-transform` | `<ChevronDownIcon>` component |
| Hero Section | 662:14393 | `flex-1 relative z-10 flex flex-col px-36 py-24` | `<section>` |
| ROOT FURTHER Logo | 2939:9548 | `w-[451px] max-w-full h-auto` | `<Image priority>` |
| Hero Text Container | 662:14755 | `flex flex-col gap-6 pl-4` | `<div>` |
| Hero Text | 662:14753 | `w-[480px] max-w-full font-montserrat text-xl font-bold leading-10 tracking-wide text-white` | `<p>` |
| Login Button Container | 662:14425 | `flex` | `<div>` |
| Login Button | 662:14426 | `w-[305px] h-[60px] bg-[#FFEA9E] rounded-lg px-6 py-4 flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg` | `<LoginButton>` (use client) |
| Button Text | I662:14426;186:1568 | `font-montserrat text-[22px] font-bold text-[#00101A]` | `<span>` |
| Google Icon | I662:14426;186:1766 | `w-6 h-6` | `<GoogleIcon>` component |
| Error Banner | (spec-defined) | `max-w-[480px] bg-red-500/15 border border-red-500 rounded-lg p-3 text-sm font-medium text-red-300` | `<ErrorBanner>` (conditional, use client) |
| Loading Spinner | (spec-defined) | `w-6 h-6 animate-spin` | `<Spinner>` (replaces GoogleIcon when loading) |
| Footer | 662:14447 | `relative z-10 border-t border-[#2E3940] px-[90px] py-10 flex items-center justify-center` | `<footer>` |
| Footer Text | I662:14447;342:1413 | `font-montserrat-alternates text-base font-bold text-white text-center` | `<p>` |

---

## Media Files

| Node ID | Type | Target Path | Usage |
|---------|------|-------------|-------|
| I662:14391;178:1033;178:1030 | PNG | public/assets/login/saa-logo.png | Header SAA 2025 logo |
| I662:14391;186:1696;186:1821;186:1709 | SVG | public/assets/login/vn-flag.svg | Language selector flag |
| 2939:9548 | PNG | public/assets/login/root-further-logo.png | Hero ROOT FURTHER branding |
| I662:14426;186:1766 | SVG | public/assets/login/google-icon.svg | Login button Google icon |
| (create manually) | SVG | — | Chevron down icon (React component) |
| 662:14389 | PNG/JPG | public/assets/login/keyvisual-bg.jpg | Background artwork image (**NOTE**: Not available via `get_media_files` API — must be extracted from the C_Keyvisual group image using `get_design_item_image` or exported manually from Figma) |

---

## Notes

- All colors should use CSS variables defined in `src/app/globals.css` using TailwindCSS v4 `@theme inline` directive.
- Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google` in `src/app/layout.tsx`.
- Color contrast: White (#FFFFFF) on dark (#00101A) = ~19.5:1 ratio (exceeds WCAG AAA). Dark (#00101A) on gold (#FFEA9E) = ~13.8:1 ratio (exceeds WCAG AAA).
- The header's semi-transparent background may benefit from `backdrop-filter: blur(8px)` for better readability over the background image (enhancement, not in Figma).
- Background key visual image should use `quality={85}` and `sizes="100vw"` in the Next.js `<Image>` component for performance.
- All icons MUST be implemented as Icon Components (React components), not `<img>` tags or inline SVG.
