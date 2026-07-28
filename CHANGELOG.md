# CHANGELOG

All notable changes to the `nt-skill-supreme` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-07-28

### Added
- **Full-Stack Software Engineering Expansion**: Transformed `nt-skill-supreme` into a complete end-to-end Full-Stack Engineering Engine for AI code assistants.
- **6 New Full-Stack Engineering Manuals**:
  - `references/state-and-data-fetching.md`: Server vs Client state, TanStack Query, Zustand, and 4-state loading experience.
  - `references/api-and-db-contracts.md`: Zod schema validation, Drizzle/Prisma ORM guidelines, and Postgres RLS.
  - `references/auth-and-multi-tenancy.md`: OAuth, Passkeys, HttpOnly cookies, RBAC matrix, and tenant isolation middleware.
  - `references/testing-and-qa.md`: Vitest, Playwright E2E, AI test verification directive, and anti-regression rules.
  - `references/security-and-hardening.md`: OWASP Top 10 defenses, DOMPurify sanitization, rate-limiting, and CSP headers.
  - `references/fullstack-scaffolding.md`: Full-stack app directory layout, Stripe subscription webhook handlers, and R2/S3 file upload patterns.
- **4 Full-Stack Product Archetypes**: Added `fullstack-app`, `saas-micro`, `api-service`, and `admin-portal`.
- **4 New Direct Commands**: Added `/build-fullstack-app`, `/refactor-codebase`, `/security-audit`, and `/add-feature`.
- **Test-Driven AI Directive**: Mandatory rule instructing AI agents to run test suites (`npm test`, `vitest`, `playwright`) and verify zero failure exit code before declaring tasks complete.

## [2.0.0] - 2026-07-14

### Added
- **Visual Profiles Engine**: Added three visual profiles (`minimal`, `balanced` [default], `supreme`) for contextual UI styling.
- **10 Product Archetypes**: Added domain-specific execution guidelines for `dashboard`, `landing-page`, `portfolio`, `ecommerce`, `saas`, `editorial`, `mobile-app`, `local-business`, `enterprise`, and `web-experience`.
- **Grounded Data & Zero Fake Stats Policy**: Strictly forbids AI models from inventing fake customer counts, star ratings, reviews, or unverified conversion statistics.
- **Respect Existing Codebases Directive**: Requires AI agents to inspect and elevate existing frameworks (React, Vue, Next.js, Tailwind, Shadcn, Chakra) without performing unauthorized rewrites.
- **Safe CLI Command Surface**: Rebuilt `bin/cli.js` with options:
  - `init [--ai <target>] [--dry-run] [--force]`
  - `status`
  - `remove`
  - `--help` & `--version`
- **Manifest Engine & Backups**: Writes `.nt-skill-supreme-manifest.json` for atomic installation tracking, and creates timestamped `.bak.[timestamp]` backups when `--force` overwrites existing files.
- **Honest Auto-Detection**: CLI automatically probes for active Gemini Antigravity, Claude, Cursor, Windsurf, Trae, Codex, and OpenCode environment signatures before installing.
- **Automated CLI Test Suite**: Created `tests/cli.test.js` using Node's native test runner (`node --test`), providing test coverage for dry-runs, backups, safe removal, status, and exit codes.
- **Bilingual Documentation**: Created synchronized `README.es.md` (Spanish) and `README.md` (English) with interactive language toggles, Before vs After transformation matrix, and live code snippets.
- **Audit Documentation**: Created `AUDIT.md` mapping risk priorities, contradiciton fixes, and rule preservation matrices.

### Changed
- **Relative Path Bindings**: Removed all hardcoded absolute `file:///` URLs across `SKILL.md` and documentation, replacing them with relative Markdown links (`./references/`).
- **Single Dominant CTA Standard**: Resolved primary/secondary CTA ambiguity; enforced exactly ONE visually dominant primary CTA per section.
- **Accessibility Media Queries**: Wrapped all 3D tilt perspective transforms and cursor tracking in `@media (hover: hover) and (pointer: fine)` guards. Added system motion reduction overrides (`prefers-reduced-motion: reduce`).

### Fixed
- Fixed CLI non-zero exit codes on failure (`process.exitCode = 1`).
- Fixed unhandled silent overwrites on local AI rule configurations.
- Fixed image fallback priority, prioritizing user assets and AI-generated assets over external CDN placeholders.
