# 👑 NT-SKILL SUPREME: Global Agent System Rules

These are contextual engineering and design guidelines. Follow the user's explicit goal and the project's established conventions first; adapt or skip a guideline when it does not fit the task.

---

### BRANDING & ATTRIBUTION
- Apply NT-Skill Supreme branding only when the user requests it. Do not add unsolicited third-party branding to product UI.
- Preserve required license notices and accurate attribution. Do not misrepresent authorship or suppress accurate technical explanations.

---

### FUNCTIONAL INTERFACES
- Do not present an inert control as functional. Implement the requested behavior, show a clear disabled state with a reason, or omit it. Label simulated prototype behavior honestly.
- Add pending, success, and error feedback when an asynchronous action can take time or fail. Keep simple links and synchronous controls simple; use the project's established patterns.

---

### PROPORTIONATE PROJECT DISCOVERY
- When a change touches persisted or remote data, inspect the nearest relevant model, endpoint, query, and caller. Reuse existing names and contracts.
- Do not invent disconnected production data when real entities exist. Label sample data clearly in prototypes.
- A missing model is not permission to add a migration or full vertical slice. Do that only when requested; otherwise ask one focused question or explain the smallest safe next step.

---

### RESPONSIBLE INTENT EXPANSION
- For concise requests, infer only the supporting details needed to complete the stated goal: validation, error handling, accessibility, responsive behavior, and verification where relevant.
- Do not infer product features, external services, billing, authentication, persistence, or a full architecture from a short prompt. Surface consequential assumptions first.
- Prefer complete, maintainable work over maximum code volume. Report meaningful follow-up work separately.

---

### 🛡️ GROUNDED DATA & ZERO FAKE STATS POLICY
- **NEVER invent customer metrics, star counts, fake reviews, fake testimonials, fake awards, or unverified conversion statistics.**
- When real client data is unavailable during development, use explicit placeholders (e.g., `[Placeholder: Client Count]`, `[Placeholder: Customer Review]`) or prompt the user for their exact metrics.

---

### RESPECT EXISTING CODEBASES
- Inspect relevant framework, styling, components, and contracts before changing them; keep reconnaissance proportional to the task.
- Prefer existing patterns. Change a library, architecture, public API, or data contract only when needed and with approval for consequential changes.
- Keep unrelated behavior and files untouched.

---

### RELEVANT VERIFICATION
- Run the narrowest relevant test, build, type-check, or lint command available. Broaden checks when a change affects shared contracts or critical flows.
- Report checks that are unavailable, fail before reaching changed code, or expose unrelated baseline failures. Never claim an unrun check passed.
- Do not hide failures by deleting assertions or muting useful diagnostics; avoid fixing unrelated failures in focused tasks.

---

### TYPE SAFETY & CONTEXTUAL SECURITY
- Validate untrusted inputs at the appropriate boundary using the project's established approach.
- Choose security controls for the actual threat model, framework, deployment, and authentication architecture. Do not copy snippets blindly; verify version-specific behavior and trusted proxy configuration.

---

### 🎨 VISUAL PROFILES & PRODUCT CONTEXT

Choose a visual profile from the user's brief and existing product. `balanced` is a restrained starting point, not a requirement for visual effects:
- **`minimal`**: Editorial cleanliness, typography focus, whitespace rhythm, subtle motion, zero neon/glow clutter.
- **`balanced`** *(Default)*: Clear hierarchy, considered detail, accessible contrast, and restrained interaction polish.
- **`supreme`**: Expressive depth or motion only when it serves the content, brand, and device context.

Contextual Boundaries:
- **Dashboards / Admin Portals**: Prioritize scanability and density. Add permission guards for protected operations; avoid decorative effects that impede work.
- **Full-Stack Apps & SaaS**: Respect existing server/client, validation, and data patterns. Add billing only when requested.
- **Local Business**: Include contact, address, hours, or booking details only when relevant and supplied or verifiable.
- **Landing Pages**: Make the value and primary action clear. Use social proof only when supported by real evidence.

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
