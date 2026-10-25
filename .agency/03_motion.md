# 3D Web & Motion Experience Plan: FashionFizz (Aura Chromatique)

## 1. Intro Loader Animation
* **Concept:** A high-end editorial black-out curtain reveal driven by Framer Motion and Three.js canvas sync.
* **Sequence:**
  1. **Phase 1 (0ms - 600ms):** Solid `#0C0C0E` background with a central spinning procedural Torus Knot wireframe in Liquid Silver (`#D8DCE2`) glowing with Electric Marigold (`#FF5500`) point lights.
  2. **Phase 2 (600ms - 1200ms):** Counter displays `00%` to `100%` in `Space Mono` font, accompanied by a horizontal scale-up of a `--brand` line (`#FF5500`).
  3. **Phase 3 (1200ms - 1600ms):** Curtain splits vertically or slides upward (`Y: 0% -> -100%`) using an `easeInOutExpo` easing curve while the main React app fades in underneath.

---

## 2. Hero Scene Composition (Procedural Geometry Only)
* **Canvas Setup:** `<Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>`
* **Scene Elements:**
  * **Core Object:** A majestic, high-subdivision procedural `TorusKnotGeometry(10, 3, 256, 32, 2, 3)` representing fluid draped silk and unstitched luxury folds.
  * **Material:** Custom `MeshPhysicalMaterial` configured with:
    * `color`: `#15161A` (Charcoal Velvet base)
    * `roughness`: 0.15 (High gloss silk sheen)
    * `metalness`: 0.85 (Liquid silver/antique gold reflection)
    * `transmission`: 0.2 (Subtle fabric translucency)
    * `clearcoat`: 1.0, `clearcoatRoughness`: 0.1
  * **Lighting Rig:**
    * 1x Key Light (Warm Antique Gold `#E8C252`, intensity: 3.5) positioned top-left.
    * 1x Rim Light (Electric Marigold `#FF5500`, intensity: 5.0) positioned bottom-right for edge highlights.
    * 1x Ambient Light (Deep Obsidian tint `#23252B`, intensity: 1.0).

---

## 3. Item / Detail Viewer (PDP 3D Fabric Inspector)
* **Purpose:** Fulfills the `three_d_plan` spec for product detail pages, enabling users to rotate unstitched fabric folds and inspect embroidery details closely.
* **Component:** `<FabricViewer3D />`
* **Interactivity:**
  * **OrbitControls:** Enabled with dampening (`dampingFactor={0.05}`), restricted polar angle (`minPolarAngle={Math.PI / 4}`, `maxPolarAngle={Math.PI / 1.5}`), and disabled panning to keep focus on the twist.
  * **Dynamic Color Swapping:** React state updates the shader/material `color` prop instantly when a user clicks a color variant swatch (e.g., switching from Obsidian `#0C0C0E` to Festive Marigold `#FF5500`).
  * **Micro-Displacement:** Procedural sine-wave vertex distortion on pointer move to simulate cloth rippling under cursor influence.

---

## 4. Scroll-Driven Scene Changes
* **Scroll Engine:** `framer-motion` `useScroll` + `useTransform` hooked into R3F frame loop via `useFrame`.
* **Milestones across Home Page:**
  * **Hero (0% - 25% scroll):** Torus knot rotates slowly on axis (`rotation.y += delta * 0.2`), scale at `1.0`.
  * **Categories (25% - 60% scroll):** Knot scales down (`0.7`), shifts right, and morphs its twist parameters as user scrolls past "Unstitched" and "Pret" collections.
  * **Footer / CTA (75% - 100% scroll):** Knot flattens into an abstract geometric ring framing the brand tagline.

---

## 5. Hover / Press Micro-Interactions (Framer Motion)
* **Buttons:**
  ```tsx
  <motion.button
    whileHover={{ y: -2, boxShadow: "4px 4px 0px var(--chrome)" }}
    whileTap={{ y: 0, boxShadow: "0px 0px 0px var(--chrome)" }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  />
  ```
* **Product Cards:**
  ```tsx
  <motion.div
    whileHover={{ y: -4, borderColor: "var(--brand)" }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  />
  ```

---

## 6. Loading Strategy & Performance Budget
* **Lazy Loading:** `React.lazy` for heavy R3F Canvas wrappers and detailed product modals.
* **Suspense Fallback:** Minimal skeleton loader using CSS pulse matching `--paper-surface` (`#15161A`).
* **Offscreen Optimization:** Canvas automatically pauses rendering when scrolled out of the viewport using `IntersectionObserver` combined with `@react-three/fiber`'s `frameloop="demand"` or custom visibility checks.
* **Performance Budget:**
  * **Max DPR:** Capped at `2` (`dpr={[1, 2]}`).
  * **Polycount:** Torus geometry kept under 15,000 triangles on mobile, 50,000 on desktop.
  * **Texture Strategy:** Procedural roughness/metalness maps preferred over heavy 4K bitmaps to maintain instant TTI (Time to Interactive).

---

## 7. LITE Phone Alternative (CSS 3D Fallback)
* **Trigger:** Activated on touch devices, low-power mode, or when `window.matchMedia('(prefers-reduced-motion: reduce)')` matches.
* **Implementation:** Pure CSS 3D Transforms (`perspective: 1000px`).
* **Structure:**
  ```tsx
  <div className="css-3d-scene" style={{ perspective: '1000px' }}>
    <motion.div 
      className="css-3d-card"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Floating Layers simulating depth */}
      <div className="layer-base bg-[#15161A] border border-[#2E323B] p-6 rounded-[4px]" />
      <div className="layer-accent absolute inset-0 translate-z-[30px] border border-[#FF5500]/40 pointer-events-none" />
    </motion.div>
  </div>
  ```