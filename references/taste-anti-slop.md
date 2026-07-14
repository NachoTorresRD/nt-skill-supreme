# Taste-Skill & Anti-Slop Visual Standards Reference

*Eliminating generic AI frontend templates and instilling high aesthetic taste.*

---

## 🚫 The Anti-Slop Commandments

AI models frequently default to generic, uninspired design templates ("AI slop"). Follow these strict anti-slop rules:

1. **Ban Generic Blue/Purple Gradients on White**: Avoid plain centered white card containers on light gray backgrounds with default `#3b82f6` blue buttons.
2. **Ban Centered Feature Trios**: Do not default to 3 equal-width boxes with generic lucide icons in pastel circles. Vary column widths, grid rhythm, visual weights, and feature card heights.
3. **Ban Unstyled Inputs & Buttons**: Input controls must feature custom focus rings, elevated background depth, clean label alignment, and contextual placeholder typography.
4. **Enforce Cohesive Design Systems**: Every interface must adopt a specific design motif (e.g., Sleek Dark Glassmorphic, Modern Minimalist Monochrome, High-Tech Cyberpunk Terminal, Neobrutalist Expressive).

---

## 🎨 Aesthetic Presets & Palette Tokens

### 1. Dark Glassmorphism (Default Modern Sleek)
```css
:root {
  --bg-base: hsl(224, 25%, 6%);
  --surface-1: rgba(255, 255, 255, 0.03);
  --surface-2: rgba(255, 255, 255, 0.07);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --accent-primary: hsl(265, 89%, 66%);
  --accent-glow: rgba(168, 85, 247, 0.25);
  --text-main: hsl(0, 0%, 98%);
  --text-muted: hsl(215, 15%, 65%);
}
```

### 2. High-Fidelity Monochrome & Accent Spot
```css
:root {
  --bg-base: #0a0a0c;
  --surface-card: #121215;
  --border-card: #222228;
  --accent-spot: #f97316; /* Electric Amber */
  --text-heading: #ffffff;
  --text-body: #a1a1aa;
}
```

### 3. Neobrutalist Expressive
```css
:root {
  --bg-base: #fef08a; /* Vibrant Soft Yellow */
  --surface-card: #ffffff;
  --border-heavy: #000000;
  --shadow-hard: 5px 5px 0px #000000;
  --accent-pop: #ff0055;
  --font-display: 'Space Grotesk', sans-serif;
}
```

---

## 🖼 Image & Typography Craft

- **Font Pairing Rule**: Always pair a high-character display font (`Space Grotesk`, `Outfit`, `Playfair Display`) with an ultra-readable UI body font (`Inter`, `Plus Jakarta Sans`).
- **Aspect Ratio Control**: Use consistent media container aspect ratios (`aspect-video`, `aspect-[4/3]`, `aspect-square`) with `object-fit: cover` and subtle hover scale filters.
- **Glass Backdrop Blurs**: Card overlays must use `backdrop-filter: blur(12px)` to blend gracefully with ambient background lighting.
