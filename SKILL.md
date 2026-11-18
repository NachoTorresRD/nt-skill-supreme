---
name: nt-skill-supreme
description: "Use when building, refining, or auditing software and user interfaces. Offers contextual full-stack engineering and premium design guidance while respecting user intent, project conventions, and task scope."
---

# 👑 NT-SKILL SUPREME: Full-Stack Engineering & Product Design Guidance

`nt-skill-supreme` is a reusable reference for AI coding assistants. It offers practical design and engineering checklists for building, refining, and auditing software. Results depend on the assistant, its available tools, the project, and the checks that can actually be run; this skill guides work but cannot guarantee a particular outcome.

---

> [!IMPORTANT]
> **BRAND GUIDANCE**:
> Apply NT-Skill Supreme branding only when the user asks for a branded or white-label deliverable. Do not add unsolicited third-party branding to product UI. Never remove legally required license notices or attribution, misrepresent authorship, or suppress accurate technical explanations.

---

## How to Apply the Skill

Use these principles in order:

1. Follow the user's explicit goal, constraints, and requested level of change.
2. Preserve the project's established architecture, design system, and interaction patterns.
3. Deliver the smallest complete change that solves the task, including necessary quality checks.
4. Add optional polish only when it supports the product, audience, and workflow.

For existing projects, inspect the nearest relevant files first and expand exploration only when a dependency or contract requires it. Do not rewrite adjacent systems, add dependencies, create migrations, connect paid services, or broaden the feature without a clear need and user authorization. If a missing product decision materially affects implementation, ask one focused question; otherwise use a reversible, conventional default and state it.

**Premium is a quality bar, not a visual preset.** Aim for clear hierarchy, deliberate typography and color, coherent spacing, useful content, responsive behavior, accessible interactions, and careful details. Choose visual effects, animation, 3D, glass, or gradients only when they fit the product and improve comprehension or character. A calm, fast, familiar interface can be more premium than a highly decorated one.

Do not claim work is production-ready, tested, secure, or visually verified unless the relevant checks were actually performed. Report what was checked and any meaningful limitation.

## 🎨 Visual Profiles (Contextual Execution)

Choose a profile from the user's brief and the existing product. If neither sets a direction, use `balanced` as a restrained starting point; it does not require glass, glow, animation, or 3D.

| Profile | Key Characteristics | Recommended Use Cases |
|---|---|---|
| `--style minimal` | Clean, refined, editorial, high focus on typography and whitespace, subtle motion, zero neon/glow clutter. | Editorial, luxury brands, blogs, executive portfolios, legal. |
| `--style balanced` *(Default)* | Premium design, micro-interactions, moderate glassmorphism depth, smooth spring motion, WCAG AA contrast. | SaaS, agency sites, dental/medical, local services, general products. |
| `--style supreme` | High visual impact, 3D perspective tilt, spotlight tracking, native scroll-driven animations, parallax layers. | Product launches, web experiences, tech portfolios, high-end agency showcases. |

---

## 🏗️ Product Archetypes & Guidance

Use archetypes as prompts for discovery, not feature checklists. Include a pattern only when it supports the user's goal, available data, and existing product. Never invent pricing, reviews, metrics, addresses, integrations, or other real-world facts to complete an archetype.

| Archetype | Contextual focus | Avoid unless justified |
|---|---|---|
| `dashboard` | High data density, structured tables, empty states, sidebar navigation, clear active states, loading feedback. | **NO** 3D card tilt on tables/forms. **NO** automatic WhatsApp float buttons. |
| `landing-page` | 3-Second value hero, single dominant primary CTA, social proof placement, benefit bento grid, lead form. | Never allow secondary CTAs to compete visually with primary CTA. |
| `portfolio` | Metrics (+ validated growth), visual project cards, case study modal/drawer, skill breakdown, contact form. | Keep layout distractions minimal to let project visual assets shine. |
| `ecommerce` | Product cards, badge tags, filter sidebar, cart drawer preview, price transparency, star ratings. | Ensure responsive touch targets >= 44x44px on mobile filters. |
| `saas` | Interactive feature matrix, monthly/annual pricing switcher, live widget demo, API/docs links. | Ensure pricing switch recalculates values smoothly without layout shift. |
| `editorial` | High contrast typography, reading progress bar, drop caps, author bio, clean article layout. | **NO** heavy background glow spot items or intrusive floating widgets. |
| `mobile-app` | App Store / Play Store badges, device preview mockup, mobile finger ergonomics, bottom action bar. | Keep CTA fixed at thumb reach on mobile screens. |
| `local-business` | Contextual WhatsApp float button (`wa.me/`), working hours, map embed, quick booking form, local reviews. | Include exact address and phone contact details. |
| `enterprise` | High accessibility, subtle depth, security/compliance badges, corporate slate palette, "Request Demo" form. | Stick to professional slate/navy color tokens and high contrast text. |
| `web-experience` | Narrative scroll, 3D tilt layers, parallax background depth, custom cursor highlights, expressive transitions. | Must honor `prefers-reduced-motion` for accessible playback. |
| `fullstack-app` | Auth flows, DB models (Drizzle/Prisma), API routes with Zod, TanStack Query server cache, Stripe subscriptions. | Keep server logic separated in `server/` or `app/api/`. Enforce RLS policies. |
| `saas-micro` | Auth, tier switch, Stripe webhook listener, usage dashboard, onboarding drawer, responsive shell. | Enforce strict rate limits on auth and billing routes. |
| `api-service` | Zod request validation, OpenAPI specs, rate-limiting headers, standardized HTTP status responses, auth tokens. | **NO** unvalidated raw payloads or loose `any` types. |
| `admin-portal` | RBAC user management, data export (CSV/JSON), server-side paginated tables, audit log activity feed. | Require `admin` or `owner` permission guards on all routes. |

---

## 🛡️ Critical Operational Directives

### 1. Grounded Data & Zero Fake Stats Policy
- **NEVER invent fake customer counts, review stars, fake testimonials, fake awards, or unverified conversion statistics** (e.g. never invent "1,200+ satisfied clients" or "4.9/5 stars" as real data).
- When real data is missing during development, use explicitly marked placeholders: `[Placeholder: Real Client Reviews]`, `[Placeholder: Client Count]`, or ask the user for their exact metrics.

### 2. Respect Existing Codebases & Minimize Regression Risk
- Inspect the relevant framework, styling system, components, and contracts before changing them; keep reconnaissance proportional to the task.
- Prefer established project patterns. Replace or migrate a library, architecture, public API, or data contract only when required by the request and with user approval for a consequential change.
- Keep unrelated behavior and files untouched.

### 3. Relevant Verification & Honest Reporting
- Run the narrowest relevant test, build, type-check, or lint command available. Use broader checks when the change affects shared contracts or critical flows.
- If a check is unavailable, unrelated, or fails before reaching the changed code, report that accurately; do not claim it passed.
- Do not hide failures by deleting assertions, muting useful diagnostics, or weakening security. Avoid fixing unrelated failures as part of a focused task.

### 4. Type Safety & Contextual Security
- Validate untrusted inputs at the appropriate boundary using the project's established validation approach.
- Apply security controls that fit the actual threat model, deployment, and authentication architecture. Do not copy security snippets blindly; check framework version, trusted proxy configuration, storage model, and operational environment.

### 5. Accessible Motion & Pointer Safeguards
- Hover 3D tilt and cursor spotlights MUST be wrapped in `@media (hover: hover) and (pointer: fine)`.
- All non-essential animations MUST honor `@media (prefers-reduced-motion: reduce)`.
- Keyboard navigation MUST maintain high-visibility `:focus-visible` rings. Modals MUST trap focus and close on `Escape`.

### 6. Proportionate Project Discovery
- When a task touches persisted or remote data, inspect the nearest relevant model, endpoint, query, and caller; reuse its names and contracts.
- Do not invent disconnected production data when real entities exist. Clearly label sample data in prototypes.
- A missing model is not automatic permission to create a database migration or full vertical slice. Implement that slice only when the request calls for it; otherwise ask a focused question or explain the smallest safe next step.

### 7. Functional, Honest Interfaces
- Do not present an inert control as if it works. Implement its intended behavior, make it clearly disabled with a reason, or omit it. In a prototype, use an explicitly labeled, meaningful demonstration rather than pretending it is connected to production data.
- Add pending, success, and error feedback when an action is asynchronous or can fail. Keep simple navigation and synchronous controls simple; use the project's existing feedback patterns.

### 8. Responsible Intent Expansion
- For concise requests, infer only the supporting details needed to complete the stated goal: relevant validation, error handling, accessibility, responsive behavior, and verification.
- Do not infer new product features, external services, billing, authentication, persistence, or a full architecture from a short prompt. Surface consequential assumptions before implementing them.
- Prefer complete, maintainable work over maximum code volume. Explain any unimplemented follow-up separately.

---

## 🛠 Task Recipes

These names are task recipes, not necessarily registered slash commands. They are executable only when the host assistant provides matching commands; otherwise treat them as concise descriptions of work. Apply the scope and approval rules above to every recipe.

| Command / Trigger | Primary Action |
|---|---|
| `/build-client-site [niche] [--style minimal\|balanced\|supreme]` | Builds the requested site using the chosen profile and stack conventions; do not force a single-file output or invent client facts. |
| `/build-fullstack-app [niche] [stack]` | Scaffolds the requested application scope. Add authentication, persistence, billing, or admin areas only when requested or required and confirmed. |
| `/refactor-codebase` | Audits and restructures existing codebases following SOLID principles, type-safety standards, and clean architecture. |
| `/security-audit` | Analyzes code for OWASP Top 10 vulnerabilities, input sanitization gaps, rate-limiting deficits, and secret exposures. |
| `/add-feature [type]` | Implements the requested feature using existing project services; confirm before adding a new provider, paid service, or data migration. |
| `/add-section [type]` | Adds the requested section in the existing design system, with real content and working actions where available. |
| `/rapid-localize` | Replaces placeholders only with client details supplied or verified by the user. |
| `/design-audit` | Audits current frontend code for slop, contrast balance, spacing cadence, WCAG AA compliance, and interaction states. |
| `/polish-ui [--style minimal\|balanced\|supreme]` | Elevates existing UI with smooth animations, elevated depth, modern font stacks, and glassmorphism appropriate to the selected profile. |

---

## 📚 Master Reference Index

Consult specialized modules in `./references/` for deep-dive technical rules:

### Design & Frontend Engineering
1. **[niche-blueprints.md](./references/niche-blueprints.md)**: Industry-specific site structures, color palettes, typography pairs, and conversion funnels.
2. **[component-blueprints.md](./references/component-blueprints.md)**: Adaptable examples for action buttons, tables, forms, and drawers; verify framework fit and contracts before reuse.
3. **[cro-and-performance.md](./references/cro-and-performance.md)**: Grounded conversion rate optimization, 3-second value rule, mobile ergonomics, and Core Web Vitals.
4. **[motion-and-physics.md](./references/motion-and-physics.md)**: Scroll-driven CSS animations, 3D card tilt, spotlight tracking, and reduced motion safeguards.
5. **[image-gen-and-fallbacks.md](./references/image-gen-and-fallbacks.md)**: Dynamic AI image generation protocol and multi-tier graceful fallback strategy (SVG / Unsplash).
6. **[taste-anti-slop.md](./references/taste-anti-slop.md)**: Aesthetic guidelines, anti-slop rules, brutalist/minimalist presets, and palette generators.
7. **[ui-ux-wcag.md](./references/ui-ux-wcag.md)**: UX heuristics, layout grids, multi-device responsive patterns, and WCAG 2.1 AA accessibility standards.
8. **[craft-and-polish.md](./references/craft-and-polish.md)**: Visual QA audit protocols, micro-typography (`tabular-nums`), and craft commands.

### Full-Stack Architecture & Engineering
9. **[functional-logic-and-wiring.md](./references/functional-logic-and-wiring.md)**: Contextual patterns for functional controls, proportionate data discovery, forms, and responsible intent expansion.
10. **[state-and-data-fetching.md](./references/state-and-data-fetching.md)**: Server vs Client state, TanStack Query, Zustand, store discovery, and optimistic cache mutations.
11. **[api-and-db-contracts.md](./references/api-and-db-contracts.md)**: Zod validation, Drizzle/Prisma ORM standards, Postgres RLS, and Schema-to-UI Auto-Projection.
12. **[auth-and-multi-tenancy.md](./references/auth-and-multi-tenancy.md)**: OAuth, Passkeys, session cookies, multi-tenant middleware, and RBAC matrix.
13. **[testing-and-qa.md](./references/testing-and-qa.md)**: Vitest, Playwright E2E, AI test verification, and anti-regression protocols.
14. **[security-and-hardening.md](./references/security-and-hardening.md)**: OWASP defenses, input sanitization, rate-limiting, and security headers.
15. **[fullstack-scaffolding.md](./references/fullstack-scaffolding.md)**: Directory layout, Stripe subscription webhook handlers, and R2/S3 cloud storage uploads.
