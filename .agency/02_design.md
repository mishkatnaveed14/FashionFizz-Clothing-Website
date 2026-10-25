### FINAL LOOK NAME: **AURA CHROMATIQUE** (Twisted Editorial Luxury)
*A high-fashion evolution of the design seed. We shed the pure cyberpunk vibe and morphed it into a haute-couture editorial system: rich midnight voids, liquid silver accents, sharp oversized typography, and electric marigold highlights built specifically for high-end Pakistani and global retail.*

---

### 1. EXACT HEX PALETTE MAPPED TO TOKENS
*   `--paper` (Background Primary): `#0C0C0E` (Rich Deep Obsidian)
*   `--paper-surface` (Card/Panel Background): `#15161A` (Charcoal Velvet)
*   `--ink` (Primary Text/Headings): `#F5F6F8` (Bleached Alabaster)
*   `--ink-muted` (Secondary Text/Labels): `#9BA1A6` (Muted Pewter)
*   `--brand` (Primary Action/Brand Identity): `#FF5500` (Electric Marigold / Signal Orange)
*   `--accent` (Highlights/Badges/Sale): `#E8C252` (Antique Gold - crucial for festive collections)
*   `--soft` (Subtle Fills/Hover States): `#23252B` (Dark Steel)
*   `--line` (Borders/Dividers): `#2E323B` (Brushed Gunmetal)
*   `--chrome` (Reflective accents/Dividers): `#D8DCE2` (Liquid Silver)

---

### 2. GOOGLE FONTS (EXACT WEIGHTS & URL)
*   **Display:** `Cinzel` (Weights: `600`, `800`) – For high-fashion editorial titles, luxury headings, and massive section numbers.
*   **Body:** `Plus Jakarta Sans` (Weights: `400`, `500`, `600`) – Clean, highly legible luxury grotesque for product descriptions and UI text.
*   **Mono:** `Space Mono` (Weights: `400`, `700`) – For SKU codes, prices, countdown timers, and tracking IDs.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

### 3. TYPE SCALE
*   **Display Mega (Hero Titles):** `clamp(3.5rem, 8vw, 9rem)`, Line-height: `0.95`, Font: `Cinzel` (800)
*   **H1 (Page Titles):** `3rem` (48px), Line-height: `1.1`, Font: `Cinzel` (600)
*   **H2 (Section Headers):** `2.25rem` (36px), Line-height: `1.2`, Font: `Cinzel` (600)
*   **H3 (Card Titles/Sub-sections):** `1.5rem` (24px), Line-height: `1.3`, Font: `Plus Jakarta Sans` (600)
*   **Body Large:** `1.125rem` (18px), Line-height: `1.6`, Font: `Plus Jakarta Sans` (400)
*   **Body Base:** `1rem` (16px), Line-height: `1.5`, Font: `Plus Jakarta Sans` (400)
*   **Caption / Mono:** `0.875rem` (14px), Line-height: `1.4`, Font: `Space Mono` (400)
*   **Micro / Tag:** `0.75rem` (12px), Line-height: `1.2`, Font: `Space Mono` (700), Letter-spacing: `0.1em`

---

### 4. SPACING, RADIUS, BORDER & SHADOW RULES
*   **Spacing Grid:** Use an 8px base grid (`var(--space-1)` = 8px, `--space-2` = 16px, `--space-3` = 24px, `--space-4` = 32px, `--space-6` = 48px, `--space-8` = 64px, `--space-12` = 96px).
*   **Border Radius:** **Sharp & Structured.** Luxury does not use bubbly rounded corners.
    *   Cards & Containers: `4px`
    *   Buttons & Inputs: `2px`
    *   Pills & Tags: `9999px` (fully rounded for status badges only)
*   **Borders:** `1px solid var(--line)`. Active/Focus states transition to `1px solid var(--brand)`.
*   **Shadows:** Zero soft fuzzy drop shadows. Instead, use sharp offset architectural borders or multi-layered contrast glows:
    *   *Card Hover:* `4px 4px 0px var(--brand)` (Neo-brutalist editorial edge)
    *   *Dropdown/Modal:* `0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px var(--line)`

---

### 5. UI COMPONENT STYLES
*   **Buttons:**
    *   *Primary:* Background `var(--brand)`, text `var(--paper)`, font `Space Mono` (700), uppercase, tracked out (`0.05em`). Padding: `16px 32px`. Border radius `2px`. Hover shifts up with a solid shadow: `translateY(-2px)`, shadow `4px 4px 0px var(--chrome)`.
    *   *Secondary:* Transparent background, border `1px solid var(--chrome)`, text `var(--ink)`. Hover: background `var(--soft)`.
*   **Cards (Product Cards):**
    *   Dark obsidian background (`var(--paper-surface)`), sharp border. Image container has a 4:5 aspect ratio with a subtle zoom effect on hover (`scale(1.03)`). Sale badges sit absolute top-left in solid `var(--brand)` with `Space Mono` font. Price displays in bold `Space Mono` with original price crossed out in `var(--ink-muted)`.
*   **Inputs & Forms:**
    *   Background `var(--paper)`, border `1px solid var(--line)`, text `var(--ink)`, padding `14px 18px`, font `Plus Jakarta Sans`. Focus state: border changes to `var(--brand)`, box-shadow `0 0 0 1px var(--brand)`. Floating labels using `Space Mono`.
*   **Tables:**
    *   Full-width, clean grid lines (`var(--line)`). Header row in `var(--paper-surface)` with `Space Mono` uppercase tracking. Alternating row shading (`#0E0F12` vs `#0C0C0E`). Interactive rows highlight to `var(--soft)` on hover.

---

### 6. MOTION LANGUAGE
*   **Durations:** Quick snips for UI (`150ms`), smooth editorial reveals (`400ms`), complex page/curtain transitions (`700ms`).
*   **Easings:** `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo for snappy, ultra-modern deceleration).
*   **Transitions:** Fade-up reveals on scroll for product grids; color-block background transitions synchronized with user scroll velocity.

---

### 7. TEXTURE IDEAS
*   Subtle CSS linear-gradient noise overlay (`opacity: 0.03`) simulating raw woven unstitched fabric texture across full-bleed color blocks.
*   Liquid chrome metallic reflections rendered via animated CSS conic-gradients on hero accent panels.

---

### 8. LAYOUT SIGNATURES
*   **Full-Bleed Colour Blocks Changing Per Section:** As the user scrolls from "Unstitched" to "Pret" to "Fragrances", the background shifts dynamically between Obsidian (`#0C0C0E`), Deep Steel (`#1A1D24`), and Signal Marigold (`#FF5500`) blocks.
*   **Huge Numerals as Section Markers:** Every major section opens with a massive `clamp(6rem, 15vw, 14rem)` numeral (`01`, `02`, `03`) set in outlined `Cinzel` with 20% opacity `var(--chrome)`, overlapping background imagery.

---

### 9. INTRO LOADER
*   A full-screen obsidian black `#0C0C0E` overlay.
*   In the exact center, a minimalist liquid chrome spinning torus wireframe or a crisp loading percentage in `Space Mono` (`00%` to `100%`) in `var(--brand)`.
*   As it hits 100%, the screen splits horizontally like curtain doors sliding open with an ease-out expo motion, revealing the hero banner.

---

### 10. DASHBOARD & ADMIN STYLING
*   **Public Pages:** Immersive, high-contrast editorial dark mode with high-impact imagery and bold typography.
*   **Admin / User Dashboard Area:** Switches to a structured "Control Deck" layout. Retains the dark obsidian theme (`--paper`) but introduces distinct data architecture:
    *   Fixed left sidebar with `Space Mono` navigation links and active neon orange indicators.
    *   Data-dense tables, metric cards with real-time glowing status dots (e.g., pending, shipped, low stock).
    *   Monospace typography prioritized for numbers, SKUs, and financial metrics to ensure high readability for inventory managers and admins.

---

### 11. DESKTOP VS MOBILE RULES
*   **Desktop (1024px+):** Multi-column sticky category filters, dual-cursor magnetic hover states on product cards, horizontal scrolling lookbooks, and fixed side navigation.
*   **Mobile (<1024px):** Single-column vertical stacking, sticky bottom action bar for "Add to Cart" and "Quick Checkout", full-screen slide-up filter drawers, and touch-optimized horizontal swipe carousels for category bubbles.

---

### 12. THREE SIGNATURE VISUAL DETAILS
1.  **The Neon Marigold Corner Slash:** Every primary promotional banner or category tile features a sharp 45-degree signal-orange (`#FF5500`) triangle cut into the top-right corner containing the discount percentage (e.g., `50% OFF`) set in bold `Space Mono`.
2.  **Liquid Chrome Price Tags:** Prices on hover reveal a liquid chrome gradient background (`#D8DCE2` to `#5B6470`) with dark obsidian text, giving an upscale metallic sheen to the product value.
3.  **Embroidered Wireframe Motifs:** Subtle background vector wireframes of traditional Pakistani paisley and floral motifs rendered in hairline chrome strokes (`1px solid rgba(216, 220, 226, 0.15)`) floating behind clean modern typography.