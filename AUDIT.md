# 🔍 AUDIT.md — Comprehensive Repository Audit & Upgrade Strategy

**Target**: `nt-skill-supreme`  
**Auditor**: Staff Software Engineer & AI System Architect  
**Date**: 2026-07-14  

---

## 📋 Audit Summary & Risk Assessment

This audit evaluates the codebase, CLI installer, instruction files, reference manuals, and documentation of `nt-skill-supreme`. 

The core visual quality of the skill (tactile physics, zero-slop palettes, spatial cadence, glassmorphic elevation) is outstanding. The goal of this upgrade is **NOT** to reduce visual impact or convert the skill into generic rules, but to make it **safer, multi-platform, portable, contextual, grounded, and accessible** while preserving and expanding its signature design intelligence.

---

## 🚨 Critical & High Priority Issues

| ID | Issue Description | Affected Files | Proposed Solution | Priority |
|---|---|---|---|---|
| **SEC-01** | **Destructive Overwriting in CLI**: `bin/cli.js` overwrites `.cursor/rules/*.mdc`, `.windsurfrules`, and `AGENTS.md` without confirmation, backups, or `--force` flag. | `bin/cli.js` | Implement safe file operations: check existence, create timestamped backups (`.bak`), prompt/require `--force`, and log all actions. | **CRITICAL** |
| **PORT-01** | **Local Path Hardcoding**: Absolute `file:///c:/Users/nacho/...` links break portability on macOS, Linux, and other Windows paths. | `SKILL.md` | Replace all `file:///` URLs with relative Markdown links (`./references/filename.md`). | **CRITICAL** |
| **CLI-02** | **Incomplete CLI Command Surface**: Missing `--dry-run`, `--force`, `status`, `remove`, `--help`, `--version`, and manifest tracking. | `bin/cli.js`, `package.json` | Rebuild `bin/cli.js` with full CLI option parsing, `.nt-skill-supreme-manifest.json` manifest engine, and clean exit codes (`process.exitCode = 1`). | **HIGH** |
| **A11Y-01** | **Touch Device & Reduced Motion Deficit**: Hover 3D tilt effects lack `@media (hover: hover) and (pointer: fine)` guards, and animations lack `@media (prefers-reduced-motion: reduce)` rules. | `references/motion-and-physics.md`, `component-blueprints.md` | Wrap all pointer/hover 3D tilt physics in fine-pointer media queries, and add reduced-motion fallback rules. | **HIGH** |
| **CTXT-01** | **Over-Generalization of Style & Features**: Every project receives dark mode, neon glow, 3D tilt, and a WhatsApp float button regardless of archetype (e.g. dashboards, financial tools). | `SKILL.md`, `AGENTS.md`, `references/niche-blueprints.md` | Implement **3 Visual Profiles** (`minimal`, `balanced` [default], `supreme`) and **10 Product Archetypes** (`landing-page`, `dashboard`, `saas`, `local-business`, etc.). | **HIGH** |
| **QUAL-01** | **Unsubstantiated Marketing Claims & Fake Data**: Guaranteed claim percentages ("100%+ conversion lift", "80%+ traffic") and hardcoded fake reviews/star ratings. | `SKILL.md`, `cro-and-performance.md`, `component-blueprints.md` | Rephrase to grounded engineering standards. Prohibit inventing metrics/reviews; mandate clearly marked `[Placeholder]` tags for client data. | **HIGH** |
| **ARCH-01** | **Lack of Codebase Respect Directives**: Skill instructions didn't explicitly forbid replacing existing frameworks (React, Vue, Tailwind, Shadcn) in established projects. | `SKILL.md`, `AGENTS.md` | Add explicit "Respect Existing Codebases" directive to inspect and elevate existing tech stacks without unauthorized rewrites. | **HIGH** |
| **CONTR-01** | **CTA Hierarchy Contradiction**: One guideline demanded a single dominant CTA while component blueprints included competing primary buttons. | `SKILL.md`, `component-blueprints.md`, `cro-and-performance.md` | Resolve hierarchy: Exactly ONE visually dominant primary CTA per section; secondary CTAs must use lower visual hierarchy. | **MEDIUM** |
| **IMG-01** | **External CDN Reliance for Production**: External Unsplash URLs used as final production image strategy instead of temporary development placeholders. | `references/image-gen-and-fallbacks.md` | Establish 4-tier image priority: User assets > AI generated specific assets > Local optimized assets > External CDNs as temporary dev placeholders. | **MEDIUM** |
| **TEST-01** | **Zero Automated Test Coverage**: No test suite exists for CLI installation, backup creation, manifest generation, or status/remove features. | `package.json` | Create `tests/cli.test.js` using Node's native test runner (`node --test`), testing all CLI flags in isolated temp directories. | **MEDIUM** |

---

## 🎨 Visual Rules Preservation Matrix

The following signature visual features **MUST BE PRESERVED & ELEVATED** across the `balanced` and `supreme` profiles:

1. **Spatial Cadence**: Strict 4px/8px baseline grid system.
2. **Tactile Press Physics**: Instant scale shrink on active buttons (`transform: scale(0.96)`) at 100ms.
3. **Harmonious Palette Construction**: Tailored HSL color tokens with elevation shadows and dark mode depth.
4. **Micro-Typography**: `Outfit` / `Space Grotesk` display pairings with `Plus Jakarta Sans` / `Inter` body text and monospaced badges (`tabular-nums`).
5. **Interactive Depth & Glassmorphism**: `backdrop-filter: blur(16px)`, floating card layers, and contextual radial spotlights.
6. **3D Perspective Tilts & Physics**: Cursor-tracking specular glare highlights (guarded for non-touch fine pointers).
7. **Native Scroll-Driven Motion**: GPU-accelerated `animation-timeline: view()` reveals and progress indicators.

---

## 🛠 Upgrade Implementation Strategy

1. **Phase 2**: Rebind all internal references in `SKILL.md` and `README.md` to relative Markdown links (`./references/`).
2. **Phase 3 & 4**: Rebuild `bin/cli.js` into a robust Node.js CLI tool with manifest management, backup creation, dry-run mode, status reporting, safe removal, and real AI environment detection.
3. **Phase 5 & 6**: Expand `SKILL.md`, `AGENTS.md`, and reference manuals with Visual Profiles (`minimal`, `balanced`, `supreme`) and Product Archetypes (`dashboard`, `saas`, `landing-page`, `local-business`, etc.).
4. **Phase 7 & 8**: Resolve CTA/palette/layout contradictions and inject WCAG 2.1 AA accessibility guards (`prefers-reduced-motion`, `hover: hover and pointer: fine`, focus traps, ARIA live).
5. **Phase 9 & 10**: Enforce "Respect Existing Codebases" directive and ground all performance/CRO copy to prevent fake stats and fake reviews.
6. **Phase 11**: Standardize asset priority (User assets > AI generated > Local > External CDN placeholders).
7. **Phase 12**: Write comprehensive CLI automated test suite in `tests/cli.test.js`.
8. **Phase 13 & 14**: Update `package.json` to v2.0.0, create `CHANGELOG.md`, and synchronize `README.md` (English) and `README.es.md` (Spanish).
