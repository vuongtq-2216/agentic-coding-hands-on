# Design Style: Countdown - Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/8PJQswPZmU
**Extracted At**: 2026-04-06

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background (rgba(0, 16, 26, 1)) |
| --color-text-primary | #FFFFFF | 100% | Heading text, digit text, unit labels |
| --color-tile-border | #FFEA9E | 100% | Digit tile border (gold) |
| --color-tile-gradient-start | #FFFFFF | 100% | Digit tile gradient start |
| --color-tile-gradient-end | #FFFFFF | 10% | Digit tile gradient end (rgba(255,255,255,0.10)) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-heading | Montserrat | 36px | 700 (italic) | 48px | 0 |
| --text-digit | Digital Numbers | ~74px | 400 | -- | 0% |
| --text-unit-label | Montserrat | 36px | 700 | 48px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding | 96px 144px | Page content padding (desktop) |
| --spacing-section-gap | 120px | Gap within main content area |
| --spacing-title-to-timer | 24px | Gap between heading and countdown |
| --spacing-units-gap | 60px | Gap between countdown units (Days/Hours/Minutes) |
| --spacing-digits-gap | 21px | Gap between digit tiles within a unit |
| --spacing-digit-to-label | 21px | Gap between digit row and unit label |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-tile | 12px | Digit tile border-radius |
| --border-digit-tile | 0.75px solid #FFEA9E | Digit tile border |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Page overlay | linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%) | Over background image |
| Digit tile bg | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Digit tile background (with opacity 0.5) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (100vw) | Full viewport width |
| height | 1077px (100vh) | Full viewport height |
| background | #00101A | Dark fallback |
| display | flex | Centered layout |
| align-items | center | Vertically centered |
| justify-content | center | Horizontally centered |
| position | relative | For absolute background layers |
| overflow | hidden | Prevent scrollbars |

### Layout Structure (ASCII)

```
+======================================================================+ 0px
|                                                                        |
|  BG Image (position:absolute, inset:0, object-cover, z:0)             |
|  Gradient Overlay (position:absolute, inset:0, z:1)                    |
|                                                                        |
|                        CONTENT (z:10, centered)                        |
|                                                                        |
|              "Sự kiện sẽ bắt đầu sau"                                  |
|              (Montserrat 36px/48px bold white, centered)                |
|                                                                        |
|                         gap: 24px                                      |
|                                                                        |
|         +--------+  +--------+     +--------+  +--------+     +--------+  +--------+
|         | [0]    |  | [0]    |     | [0]    |  | [5]    |     | [2]    |  | [0]    |
|         | 77x123 |  | 77x123 |     | 77x123 |  | 77x123 |     | 77x123 |  | 77x123 |
|         +--------+  +--------+     +--------+  +--------+     +--------+  +--------+
|            DAYS                       HOURS                     MINUTES
|         (36px bold white)          (36px bold white)          (36px bold white)
|                                                                        |
|                  gap:60px              gap:60px                         |
|                                                                        |
+======================================================================+ 1077px
```

---

## Component Style Details

### Page Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35127 | - |
| width | 100vw | `width: 100vw` |
| height | 100vh | `height: 100vh` |
| background | #00101A | `background-color: #00101A` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| position | relative | `position: relative` |
| overflow | hidden | `overflow: hidden` |

### Background Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35129 | - |
| width | 100% | `width: 100%` |
| height | 100% | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| object-fit | cover | `object-fit: cover` |
| z-index | 0 | `z-index: 0` |

### Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35130 | - |
| position | absolute | `position: absolute; inset: 0` |
| background | linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%) | See value |
| z-index | 1 | `z-index: 1` |

### Content Area (Bìa)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35131 | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 24px | `gap: 24px` |
| position | relative | `position: relative` |
| z-index | 10 | `z-index: 10` |

### Heading Text — "Sự kiện sẽ bắt đầu sau"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35137 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| font-style | italic | `font-style: italic` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

### Countdown Container (Time)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35138 | - |
| width | 644px | `width: 644px; max-width: 100%` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 60px | `gap: 60px` |
| align-items | center | `align-items: center` |

### Each Countdown Unit (Days / Hours / Minutes)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2268:35139, 2268:35144, 2268:35149 | - |
| width | 175px | `width: 175px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 21px | `gap: 21px` |
| align-items | center | `align-items: center` |

### Digit Row (within unit)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 21px | `gap: 21px` |
| align-items | center | `align-items: center` |

### Digit Tile

| Property | Value | CSS |
|----------|-------|-----|
| width | 76.8px (~77px) | `width: 77px` |
| height | 122.88px (~123px) | `height: 123px` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Gradient background |
| opacity | 0.5 | `opacity: 0.5` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid #FFEA9E` |
| border-radius | 12px | `border-radius: 12px` |
| backdrop-filter | blur(24.96px) | `backdrop-filter: blur(25px)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

### Digit Text

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Digital Numbers | `font-family: var(--font-digital-numbers)` |
| font-size | ~74px | `font-size: 74px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |

### Unit Label (DAYS / HOURS / MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
PrelaunchPage (bg: #00101A, w-screen, h-screen, flex, items-center, justify-center, relative, overflow-hidden)
├── BackgroundImage (absolute, inset-0, z-0, object-cover)
├── GradientOverlay (absolute, inset-0, z-1, gradient 18deg)
└── Content (relative, z-10, flex, flex-col, items-center, gap-6)
    ├── Heading ("Sự kiện sẽ bắt đầu sau", font-montserrat, text-4xl, font-bold, italic, text-white, text-center)
    └── CountdownContainer (w-[644px], max-w-full, flex, flex-row, gap-[60px], items-center)
        ├── DaysUnit (w-[175px], flex, flex-col, gap-[21px])
        │   ├── DigitRow (flex, flex-row, gap-[21px])
        │   │   ├── DigitTile (w-[77px], h-[123px], backdrop-blur-[25px], gradient-bg, border-[#FFEA9E], rounded-xl, opacity-50)
        │   │   │   └── Digit (font-digital-numbers, text-[74px], text-white)
        │   │   └── DigitTile (same)
        │   └── Label ("DAYS", font-montserrat, text-4xl, font-bold, text-white)
        ├── HoursUnit (same structure, label "HOURS")
        └── MinutesUnit (same structure, label "MINUTES")
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
| Heading | font-size: 24px; line-height: 32px |
| Countdown Container | gap: 24px; width: 100%; padding: 0 16px |
| Countdown Unit | width: auto; gap: 12px |
| Digit Tile | width: 48px; height: 77px |
| Digit Text | font-size: 44px |
| Unit Label | font-size: 20px; line-height: 28px |

#### Small Tablet / sm (640px - 767px)

| Component | Changes |
|-----------|---------|
| Heading | font-size: 28px |
| Countdown Container | gap: 36px |
| Digit Tile | width: 56px; height: 90px |
| Digit Text | font-size: 54px |
| Unit Label | font-size: 24px |

#### Tablet / md (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Heading | font-size: 32px |
| Countdown Container | gap: 48px |
| Digit Tile | width: 64px; height: 103px |
| Digit Text | font-size: 62px |
| Unit Label | font-size: 28px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All components | As per Figma design (1512px reference width) |

---

## Icon Specifications

No icons on this page.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Countdown digits | value update | instant | -- | Timer tick (every 60s) |

No hover, focus, or click interactions on this page.

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 2268:35127 | `bg-[#00101A] w-screen h-screen flex items-center justify-center relative overflow-hidden` | `PrelaunchPage` (can be Server Component wrapper) |
| Background Image | 2268:35129 | `absolute inset-0 object-cover z-0` | `<Image>` |
| Gradient Overlay | 2268:35130 | `absolute inset-0 z-[1]` + inline gradient | `<div>` |
| Content | 2268:35131 | `relative z-10 flex flex-col items-center gap-6` | `<div>` |
| Heading | 2268:35137 | `font-montserrat text-2xl sm:text-[28px] md:text-[32px] lg:text-4xl font-bold italic text-white text-center leading-[48px]` | `<h1>` |
| Countdown Container | 2268:35138 | `w-[644px] max-w-full flex flex-row gap-6 sm:gap-9 md:gap-12 lg:gap-[60px] items-center justify-center` | `<div>` |
| Countdown Unit | 2268:35139 etc. | `flex flex-col gap-3 lg:gap-[21px] items-center` | `<CountdownUnit>` |
| Digit Tile | child | `w-[48px] h-[77px] sm:w-[56px] sm:h-[90px] md:w-[64px] md:h-[103px] lg:w-[77px] lg:h-[123px] backdrop-blur-[25px] bg-gradient-to-b from-white to-white/10 border-[0.75px] border-[#FFEA9E] rounded-xl opacity-50 flex items-center justify-center` | `<div>` |
| Digit Text | child | `font-digital-numbers text-[44px] sm:text-[54px] md:text-[62px] lg:text-[74px] text-white` | `<span>` |
| Unit Label | child | `font-montserrat text-xl sm:text-2xl md:text-[28px] lg:text-4xl font-bold text-white` | `<span>` |

---

## Media Files

| Node ID | Type | Target Path | Usage |
|---------|------|-------------|-------|
| 2268:35129 | JPG | public/assets/prelaunch/bg-image.jpg | Full-bleed background artwork (**NOTE**: May be same as Login/Homepage keyvisual — compare before downloading duplicate) |

---

## Notes

- The page has NO header, footer, or navigation — it is a pure full-screen countdown.
- The digit tiles are significantly larger than the Homepage countdown (77x123px vs 51x82px, font ~74px vs ~49px). Consider making the CountdownTimer component accept a `size` prop ("sm" | "lg") or creating a separate `PrelaunchCountdown` component.
- The gradient overlay angle is 18deg, different from Login's 90deg/0deg and Homepage's 12deg. Each screen has a unique gradient.
- The background image node ID (`2268:35129`) is different from Login (`662:14389`) and Homepage (`2167:9028`) — verify if it's the same artwork or a different crop.
- Unit labels use 36px (same as heading), much larger than Homepage's 24px.
- This page uses the same `NEXT_PUBLIC_SAA_EVENT_DATE` env var as the Homepage countdown.
- Middleware must be updated to allow public access to the prelaunch route.
