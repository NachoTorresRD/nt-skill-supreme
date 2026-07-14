# NT-Design Engine: AI Image Generation & Graceful Fallback Protocol

*Directives for synthesizing contextual visual assets or executing multi-tier visual fallbacks.*

---

## 🎨 1. Dynamic AI Image Generation Protocol

When an AI agent executing `nt-design-pro-max` possesses image generation capabilities (e.g., `generate_image` tool):

- **Auto-Generation Priority**: Synthesize realistic, high-converting hero photography, product renders, clinic interior shots, food photography, or team portraits tailored to the client niche.
- **Aspect Ratio Calibration**:
  - Hero Banners / Background Overlays: `16:9` widescreen.
  - Cards & Features: `4:3` or `1:1` square aspect ratio.
  - Avatar & Team Profiles: `1:1` rounded square or circular mask.
- **Style Consistency**: Prompts MUST specify lighting (e.g., *"Modern ambient glassmorphism studio lighting, 8k resolution, photorealistic"*).

---

## 🛡️ 2. Multi-Tier Graceful Fallback Strategy (When Image Gen is Unavailable)

If the executing AI assistant does NOT have active image generation tools, **NEVER output empty text boxes like `[Image Here]` or raw letter placeholders (`A`, `B`, `C`)**.

Follow this strict fallback hierarchy:

### Tier 1: High-Fidelity Curated Unsplash Photos (Default Fallback for Photography)
Use reliable, high-resolution Unsplash URLs styled with `object-fit: cover` and border radii:
- Medical / Dental: `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop`
- Fitness / Gym: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop`
- Restaurant / Gastro: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop`
- Tech / SaaS: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop`

### Tier 2: Inline SVG Visual Illustrations & Badges
For features, icons, or abstract UI components, render inline SVG graphics with gradient fills:
```html
<div class="svg-badge-container">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
</div>
```

### Tier 3: Styled Glassmorphic Avatar Stacks & Metric Badges
For social proof and team profiles, use styled gradient circles with emoji indicators or SVG silhouettes.
