# Taste-Skill & Anti-Slop Visual Standards Reference

*Building distinctive, coherent interfaces without defaulting to generic templates or decorative excess.*

---

## 🚫 The Anti-Slop Commandments

Use these as warning signs, not rigid bans. First identify the product, audience, existing design system, and primary task; choose only visual treatments that improve clarity or character.

1. Avoid familiar templates when they do not fit the product; a restrained layout is valid when it best serves the workflow.
2. Use varied layout rhythm only when it improves hierarchy, comparison, or storytelling. Symmetry and repeated cards are appropriate for many operational interfaces.
3. Make controls legible, accessible, and consistent with the system; decorative elevation is optional.
4. Choose a coherent visual direction from the brand, content, audience, and existing product. Do not invent a motif solely to appear distinctive.

---

## 🎨 Aesthetic Presets & Palette Tokens

### 1. Dark Glassmorphism (Use When Appropriate)
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

- **Typography**: Use the project's available, licensed fonts. Pair display and body faces only when it strengthens hierarchy and remains readable.
- **Media**: Choose aspect ratios for the content and layout. Use `cover` for intentional crops and `contain` when the whole asset must remain inspectable; hover zoom is optional.
- **Surfaces**: Use blur, glow, shadows, and gradients sparingly. Avoid them when they reduce contrast, performance, or clarity.

## Quick Design Pass

1. Identify the primary user, task, and most important content.
2. Reuse brand tokens and components; choose a visual direction only where the product leaves room.
3. Establish hierarchy, readable type, consistent spacing, and responsive layout before adding effects.
4. Check key states and representative mobile/desktop widths. Prefer a real visual check when available; do not claim one was performed otherwise.
