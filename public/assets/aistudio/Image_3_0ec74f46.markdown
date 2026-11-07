---
name: Gráfica Arte Digital
colors:
  surface: '#081325'
  surface-dim: '#081325'
  surface-bright: '#2f394d'
  surface-container-lowest: '#040e20'
  surface-container-low: '#111c2e'
  surface-container: '#152032'
  surface-container-high: '#202a3d'
  surface-container-highest: '#2b3548'
  on-surface: '#d8e2fc'
  on-surface-variant: '#e2bdc7'
  inverse-surface: '#d8e2fc'
  inverse-on-surface: '#263144'
  outline: '#aa8891'
  outline-variant: '#5a3f47'
  surface-tint: '#ffb0c9'
  primary: '#ffb0c9'
  on-primary: '#650034'
  primary-container: '#e6007e'
  on-primary-container: '#ffffff'
  inverse-primary: '#b90064'
  secondary: '#b9c7e6'
  on-secondary: '#23304a'
  secondary-container: '#3c4964'
  on-secondary-container: '#abb9d8'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#a66900'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e2'
  primary-fixed-dim: '#ffb0c9'
  on-primary-fixed: '#3e001e'
  on-primary-fixed-variant: '#8e004b'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#b9c7e6'
  on-secondary-fixed: '#0d1b33'
  on-secondary-fixed-variant: '#394761'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#081325'
  on-background: '#d8e2fc'
  surface-variant: '#2b3548'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 54px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-impact, modern commercial identity tailored for on-demand print manufacturing, promotional branding, and large-format advertising in central Peru (Mazamari, Satipo, Selva Central). The personality balances industrial production reliability with vibrant, high-energy digital creativity. It evokes immediacy, technical precision, craftsmanship, and local commercial pride.

The visual direction merges **Dark Glassmorphism** with **High-Contrast Neon Accents**:
- Deep navy, near-black substrate layers simulate premium offset ink and darkroom work surfaces.
- Electric fuchsia and radiant amber create high-velocity visual tension, guiding eyes immediately toward commercial quotes and promotional triggers.
- Translucent frosted glass containers with subtle inner specular strokes maintain optical depth without reducing text contrast or mobile rendering performance.

## Colors

The palette is tuned specifically for dark environments with sharp luminances to emphasize vibrant print proofs, catalog items, and instant conversion triggers.

### Roles & Semantic Distribution
- **Primary (`#E6007E` / Fuchsia):** The core action driver. Used for primary conversion touchpoints, high-urgency tags, promotional borders, active tabs, and luminous focus states. Interactive hover transitions to `#FF1A98` with a soft diffuse bloom (`rgba(230, 0, 126, 0.4)`).
- **Secondary (`#0A1931` / Deep Navy Canvas):** The foundational base canvas. Provides richness far superior to pure `#000000`, anchoring technical authority and chromatic depth.
- **Tertiary (`#F59E0B` & `#D97706` / Gold & Amber):** Reserved for trust validations, premium service badges ("Calidad Offset", "Garantía Selva Central"), star ratings, and limited-stock promotional indicators.
- **Neutral Surface Stack:**
  - Base Ground: `#071224`
  - Base Surface: `#0A1931`
  - Elevated Container: `#0F2444`
  - High Elevation / Modals / Sheets: `#152D52`
- **Text & Content Contrast:**
  - High-Emphasis Content: `#FFFFFF`
  - Mid-Emphasis Body / Attributes: `#E2E8F0`
  - Low-Emphasis Metadata / Inactive Strokes: `#94A3B8`
- **Direct Conversion Channel (`#25D366` / Emerald Green):** Solely dedicated to WhatsApp triggers, rapid quote triggers, and real-time operator availability indicators.

## Typography

The type hierarchy leverages **Plus Jakarta Sans** uniformly to merge structural geometry with crisp screen legibility across dense product grids and dynamic smartphone viewports. 

- **Display & Commercial Headlines:** Use extra bold weights (800, 700) with slight negative tracking to assert high conversion impact on commercial offers, turnaround speed callouts, and category titles.
- **Body Text:** Uses regular (400) weight set against soft silver (`#E2E8F0`) to eliminate eye fatigue and maintain clear contrast on deep navy panels.
- **Labels & Microcopy:** High-weight uppercase styling (600, 700) with positive letter spacing is strictly applied to catalog pricing tiers, badges, dimension specs (e.g., "13x19 INCH", "BANNER 13OZ"), and production turnaround times.

## Layout & Spacing

This layout uses a mobile-first, 12-column responsive fluid grid designed around catalog browsing and rapid conversion pathways:
- **Mobile (< 768px):** 4 fluid columns with `margin-mobile` (16px) and `gutter-mobile` (12px). Catalog cards stack into a high-density 2-column or 1-column layout for single-handed thumb interaction.
- **Tablet (768px – 1024px):** 8 fluid columns with 24px margins and 20px gutters.
- **Desktop (> 1024px):** 12 columns capped at a max-width container of `1280px` with 32px side margins.

Vertical rhythm relies on the 8px baseline grid (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 40px). Commercial hero sections and promotional catalog segments maintain distinct vertical separation to isolate conversion intent.

## Elevation & Depth

Visual hierarchy uses layered dark glassmorphism, tinted specular outlines, and neon ambient diffusion:

- **Level 0 (Base Canvas):** Solid dark navy backdrop (`#071224` to `#0A1931`) with subtle radial gradients of faint fuchsia/navy light pools to add atmospheric depth.
- **Level 1 (Catalog Tiles & Sub-panels):** Semi-transparent `#0F2444` at 70% opacity, `backdrop-filter: blur(12px)`, bordered by a 1px solid stroke of `rgba(226, 232, 240, 0.08)`. Shadows are soft and tinted: `0 8px 24px -4px rgba(7, 18, 36, 0.6)`.
- **Level 2 (Interactive Hover & Featured Tiers):** 3D card tilt perspective with elevated translation (`translateY(-4px)`). The border transitions to a linear gradient featuring `rgba(230, 0, 126, 0.45)`, backed by an external fuchsia aura: `0 12px 32px -4px rgba(230, 0, 126, 0.25)`.
- **Level 3 (Sticky Nav, Floating CTAs & WhatsApp Pill):** Dense glass layer (`#071224` at 90% opacity, `backdrop-filter: blur(16px)`), outlined by `rgba(255, 255, 255, 0.12)` with high-spread depth shadows: `0 20px 40px -8px rgba(0, 0, 0, 0.75)`.

## Shapes

The design system adopts **Roundedness Level 2 (Rounded)**:
- Baseline elements (inputs, smaller buttons, chip filters) use a clean 8px (`0.5rem`) corner radius.
- Cards, modal containers, and catalog viewports scale up to 16px (`1rem`).
- Floating urgent ribbons, conversion CTAs, and WhatsApp floating contact pods use full pill radii (`9999px`) to maximize tactile tap appeal and contrast against angular printed artwork mockups.

## Components

### 1. Buttons
- **Primary High-Converting CTA:** Solid `#E6007E`, text `#FFFFFF`, bold `label-lg`. On hover: `#FF1A98` with `box-shadow: 0 0 20px rgba(230, 0, 126, 0.5)`. Active: scale `0.98`.
- **Direct WhatsApp Quote Button:** `#25D366` background, `#071224` or `#FFFFFF` text, paired with official WhatsApp messaging icon. Pulsing ambient green glow (`rgba(37, 211, 102, 0.35)`).
- **Secondary / Ghost Button:** Transparent background, 1px border `rgba(226, 232, 240, 0.2)`, text `#FFFFFF`. Hover: background `rgba(255, 255, 255, 0.06)`, border `#E2E8F0`.

### 2. Catalog Cards (Print Services)
- Constructed with `#0F2444` glassmorphism surface. Top half features print product mockups (e.g., gigantografías, tarjetas personales, volantes, packaging) with aspect ratio `4:3`.
- Bottom half holds product title (`title-md`), minimum quantity chips, and estimated turnaround time badge ("Entrega 24h").
- Subtle hover reaction: 3D perspective lift (`translateY(-4px)`), fuchsia border highlight, and direct one-click WhatsApp inquiry shortcut.

### 3. Filterable Tabs & Segmented Controls
- Horizontal pill-scroll layout for touch devices. 
- Inactive tabs: `#0F2444` background, `#94A3B8` text, 1px border `rgba(255, 255, 255, 0.05)`.
- Active tab: `#E6007E` background with white text, crisp drop shadow, and instant catalog filtering without page reloads.

### 4. Badges & Promotional Ribbons
- **Local Trust Badges:** Gold/amber-accented chips (`#F59E0B` icon + text on `rgba(245, 158, 11, 0.1)` surface) communicating regional authority: *"Taller Propio en Mazamari"*, *"Envíos a todo Satipo y Selva Central"*.
- **Urgent Ribbons:** Diagonal or top-right anchored badges in `#E6007E` with uppercase `label-sm` ("OFERTA DEL MES", "AL POR MAYOR").

### 5. Input Fields & Form Controls
- Dark inset backgrounds (`#071224`), 1px border `rgba(226, 232, 240, 0.15)`, text `#FFFFFF`, placeholder `#94A3B8`.
- Focus state: border `#E6007E` with a 3px ring `rgba(230, 0, 126, 0.2)`.
- Checkboxes/Radios: Customized with dark navy containers and fuchsia tick states.