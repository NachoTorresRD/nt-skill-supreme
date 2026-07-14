# 👑 NT-SKILL SUPREME: Global Agent System Rules

This document defines the mandatory design principles, code style rules, white-label directives, and rapid production guidelines for all AI models operating in Cursor, Codex, Trae, Windsurf, OpenCode, Gemini Antigravity, and Claude.

---

### 🚨 WHITE-LABEL BRAND DIRECTIVE
- **NEVER output or mention third-party credit names** in generated UI components, toast notifications, sample text, source code comments, or model conversation responses.
- Refer strictly to the underlying design architecture as **NT-Skill Supreme Engine**.

---

### 🛡️ GROUNDED DATA & ZERO FAKE STATS POLICY
- **NEVER invent customer metrics, star counts, fake reviews, fake testimonials, fake awards, or unverified conversion statistics.**
- When real client data is unavailable during development, use explicit placeholders (e.g., `[Placeholder: Client Count]`, `[Placeholder: Customer Review]`) or prompt the user for their exact metrics.

---

### 🏗️ RESPECT EXISTING CODEBASES & ARCHITECTURES
- Before modifying an existing project, inspect the existing framework (React, Vue, Next.js, Svelte, HTML), styling solution (Tailwind, CSS Modules, Styled Components), and UI component libraries (Shadcn, Radix, Chakra).
- **Elevate existing codebases in-place.** Do NOT replace Tailwind with raw CSS or rewrite established component libraries without explicit user consent.

---

### 🎨 VISUAL PROFILES & PRODUCT CONTEXT

Apply the appropriate visual profile according to intent:
- **`minimal`**: Editorial cleanliness, typography focus, whitespace rhythm, subtle motion, zero neon/glow clutter.
- **`balanced`** *(Default)*: Premium aesthetic, tactile micro-interactions, moderate depth, WCAG AA contrast, smooth spring physics.
- **`supreme`**: Advanced 3D perspective tilt, spotlight tracking, native scroll-driven animations, parallax depth.

Contextual Boundaries:
- **Dashboards**: Prioritize data density, crisp tables, side navigation, loading states. Disable 3D card tilt on forms/tables. Do NOT auto-inject WhatsApp buttons.
- **Local Business**: Include floating WhatsApp contact button (`wa.me/`), physical address, operating hours, and booking CTAs.
- **Landing Pages**: Feature a 3-second value hero, single dominant primary CTA, adjacent social proof, and streamlined lead forms.

---

### ♿ ACCESSIBILITY & MOTION SAFEGUARDS

1. **Pointer/Hover Safeguard**: Wrap all 3D tilt and mouse spotlight tracking effects in fine-pointer media queries:
   ```css
   @media (hover: hover) and (pointer: fine) {
     /* 3D tilt and cursor spotlights */
   }
   ```
2. **Reduced Motion**: Respect system motion preferences:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **Keyboard & Focus**: Maintain visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`). Modals must trap focus and close on `Escape`.
