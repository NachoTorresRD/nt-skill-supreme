# 👑 NT-SKILL SUPREME

<p align="center">
  <a href="./README.es.md">es Español</a> | <b>us English</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/RELEASE-v1.0.0-blue?style=flat-square" alt="Release">
  <img src="https://img.shields.io/badge/REASONING_RULES-185-purple?style=flat-square" alt="Rules">
  <img src="https://img.shields.io/badge/UI_STYLES-80+-emerald?style=flat-square" alt="Styles">
  <img src="https://img.shields.io/badge/CLI-v1.0.0-cyan?style=flat-square" alt="CLI">
  <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=flat-square" alt="License">
</p>

<p align="center">
  <b>The Master AI Skill that provides design intelligence, micro-interactions, 3D physics, 2026 CRO, and rapid agency web production across all modern AI platforms.</b>
</p>

<p align="center">
  <img src="./assets/banner.png" alt="NT-SKILL SUPREME Design Intelligence" width="100%" style="border-radius: 16px;">
</p>

---

## ⚡ Multi-AI Installation Commands

Install **NT-SKILL SUPREME** instantly in your preferred AI assistant with a single terminal command:

### 🌟 Universal Auto-Install (All Detected AI Environments)
```bash
npx nt-skill-supreme init
```

### 🎯 Platform-Specific Installation Commands

| Target AI Assistant | Terminal Command | Target Path |
|---|---|---|
| **Google Gemini Antigravity** | `npx nt-skill-supreme init --ai antigravity` | `~/.gemini/config/skills/nt-skill-supreme` |
| **Claude Code & Desktop** | `npx nt-skill-supreme init --ai claude` | `~/.claude/skills/nt-skill-supreme` |
| **Cursor Editor** | `npx nt-skill-supreme init --ai cursor` | `.cursor/rules/nt-skill-supreme.mdc` |
| **Windsurf IDE** | `npx nt-skill-supreme init --ai windsurf` | `.windsurfrules` |
| **Trae / OpenCode / Codex** | `npx nt-skill-supreme init --ai trae` | `AGENTS.md` |

---

## 💥 The Real Transformation: Before vs After

Why do websites generated with **NT-SKILL SUPREME** convert and amaze clients on first sight?

| UX / UI Feature | ❌ Without Skill (Standard AI Generation) | 🚀 With NT-SKILL SUPREME |
|---|---|---|
| **Design & Palettes** | Plain white background, default `#3b82f6` blue buttons ("AI Slop") | Adaptive dark HSL palettes, glassmorphism `backdrop-blur-md`, and ambient glows |
| **Click Feedback** | Static buttons/cards, no tactile feedback on press | Instant tactile press response `:active scale(0.96)` at 100ms |
| **Hover & Cursor** | Flat static cards without depth | Dynamic **3D Card Hover Tilt** following cursor with specular glare highlights |
| **Scroll Animations** | Zero motion or heavy JS libraries causing lag | Fluid, native GPU-accelerated CSS `animation-timeline: view()` reveals |
| **CRO Psychology** | Long boring forms and generic headlines | 3-Second value rule, near-CTA social proof, and floating WhatsApp lead capture |
| **Images & Fallbacks** | Broken text boxes like `[Insert Image]` | Photorealistic AI assets or graceful Unsplash/SVG fallbacks |

---

## 🛠 Code & Component Showcase

### 1. Tactile Scale Physics `:active scale(0.96)`
The skill forces the AI assistant to inject tactile press responses on every interactive element:

```css
.btn-supreme {
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Instant tactile click feedback */
.btn-supreme:active {
  transform: scale(0.96);
}
```

### 2. 3D Tilt Cards with Dynamic Specular Reflection
```javascript
function handleTilt(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height/2) / (rect.height/2)) * -12;
  const rotateY = ((x - rect.width/2) / (rect.width/2)) * 12;
  
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
  card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
}
```

### 3. Floating WhatsApp CTA for Direct Conversions
```html
<a href="https://wa.me/PHONE?text=Hello!%20I%20want%20information" target="_blank" class="whatsapp-float">
  <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
  </svg>
</a>
```

---

## 🚀 Direct Commands

| Command | Action |
|---|---|
| `/build-client-site [niche]` | **Rapid Agency Engine**: Generates a complete, multi-section, high-converting client site in a single HTML file (Dental, Gym, Law, Restaurant, Agency, SaaS, E-Commerce). |
| `/add-section [type]` | Injects a production-ready section (Sticky Header, Floating WhatsApp, Pricing Switch, Accordion FAQ, Lead Capture Form). |
| `/rapid-localize` | Replaces placeholders with client-specific brand name, phone number, WhatsApp link, and local address. |
| `/design-audit` | Perform a visual hierarchy, accessibility, and slop scan of your current frontend components. |
| `/polish-ui` | Elevate existing components with smooth transitions, refined typography, and glassmorphic depth. |
| `/anti-slop` | Strip away boring template defaults and inject custom design tokens and dynamic color palettes. |

---

## 📁 Repository Structure

```
nt-skill-supreme/
├── assets/
│   └── banner.png                    # Official Showcase Hero Banner Image
├── SKILL.md                          # Primary skill definition (YAML frontmatter + system instructions)
├── AGENTS.md                         # Rules for Cursor, Trae, Windsurf, OpenCode & Codex
├── references/                       # Master technical reference manuals
│   ├── niche-blueprints.md           # Commercial industry blueprints & conversion funnels
│   ├── component-blueprints.md       # Drop-in code snippets (Navbar, Hero, FAQs, WhatsApp Float)
│   ├── cro-and-performance.md        # 3-Second value rule, mobile ergonomics, Core Web Vitals
│   ├── motion-and-physics.md         # Scroll-driven CSS animations, 3D tilt & spring physics
│   ├── image-gen-and-fallbacks.md    # AI photo generation protocol & Unsplash/SVG fallbacks
│   ├── taste-anti-slop.md            # Zero-slop & palette generation guide
│   ├── ui-ux-wcag.md                 # UI/UX grids & WCAG accessibility rules
│   └── craft-and-polish.md           # Visual QA & design audit manual
├── bin/cli.js                        # Multi-AI universal installer CLI script
└── .claude-plugin/plugin.json        # Claude Desktop & Claude Code plugin metadata
```

---

## 📄 License
Released under the [MIT License](LICENSE). Copyright (c) 2026 NachoTorresRD.
