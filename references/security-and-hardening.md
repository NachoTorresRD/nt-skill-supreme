# Security & Hardening Reference

*Contextual security guidance for input handling, access control, rate-limiting, and deployment hardening. Treat examples as starting points, not drop-in production controls.*

---

## 🛡️ OWASP Security Matrix

| Risk | Common mitigation | Context to verify |
|---|---|---|
| **SQL Injection (SQLi)** | Parameterized Queries / ORM | Never concatenate raw strings into DB queries. Use Drizzle/Prisma parameters. |
| **Cross-Site Scripting (XSS)** | Input Sanitization & React Escaping | Avoid `dangerouslySetInnerHTML` unless explicitly sanitized with DOMPurify. |
| **Cross-Site Request Forgery (CSRF)** | Framework CSRF protections and appropriate cookie attributes | Verify the auth flow, cross-origin requirements, and framework behavior. |
| **Broken Access Control** | Explicit Tenant & Role Middleware | Enforce authorization checks on server handlers, never rely on client UI hiding. |
| **Sensitive Data Exposure** | Keep secrets server-side and out of logs | Follow deployment secret management; public environment prefixes are client-visible. |
| **Rate-Limiting Deficit** | Per-route limits backed by an appropriate shared store | Choose limits and identity keys based on abuse risk, deployment topology, and trusted proxy configuration. |

---

## 🔒 Input Sanitization & Output Escaping Pattern

```typescript
import DOMPurify from 'isomorphic-dompurify';
// Use only when the product intentionally accepts rich HTML; prefer context-safe output handling.
export function sanitizeHtmlContent(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}
```

---

## Rate Limiting

- Prefer the platform or framework's supported rate-limit integration and a shared store for multi-instance deployments.
- An in-memory map is best-effort for a single process only: it resets on restart, is not shared across instances, and may grow without bounds.
- Do not trust arbitrary `X-Forwarded-For` values. Derive client identity only through explicitly configured trusted proxies; consider authenticated account or API-key limits as well.
- Choose limits per endpoint and threat model. Return a consistent `429` response and `Retry-After` where appropriate.

---

## Content Security Policy and Response Headers

The following common headers are not themselves a Content Security Policy. Configure CSP separately for the app's actual scripts, styles, images, fonts, media, and connections. Prefer nonces or hashes over broad `unsafe-inline` allowances where the framework supports them. Start with report-only mode, inspect violations, then enforce a tested policy.

Add other response headers only when compatible with the deployment. Enable HSTS only when HTTPS is consistently available for the covered hosts; a restrictive `Permissions-Policy` can also break legitimate product features.

```typescript
export const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```
