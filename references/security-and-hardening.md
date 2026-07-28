# Security & Hardening Reference

*OWASP Top 10 defenses, input sanitization, CSRF/XSS protection, rate-limiting, and secrets management.*

---

## 🛡️ OWASP Security Matrix

| Vulnerability | Mitigation Strategy | Mandatory Implementation Rule |
|---|---|---|
| **SQL Injection (SQLi)** | Parameterized Queries / ORM | Never concatenate raw strings into DB queries. Use Drizzle/Prisma parameters. |
| **Cross-Site Scripting (XSS)** | Input Sanitization & React Escaping | Avoid `dangerouslySetInnerHTML` unless explicitly sanitized with DOMPurify. |
| **Cross-Site Request Forgery (CSRF)** | Anti-CSRF Tokens & SameSite Cookies | Use `SameSite=Lax` or `Strict` on all auth session cookies. |
| **Broken Access Control** | Explicit Tenant & Role Middleware | Enforce authorization checks on server handlers, never rely on client UI hiding. |
| **Sensitive Data Exposure** | Environment Variable Isolation | Keep `SECRET_KEY`, DB URLs, and API tokens in server `.env` (never expose via `NEXT_PUBLIC_`). |
| **Rate-Limiting Deficit** | Redis / Memory Token Bucket | Apply rate limits on public POST API endpoints (`/api/login`, `/api/contact`, `/api/checkout`). |

---

## 🔒 Input Sanitization & Output Escaping Pattern

```typescript
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Sanitize user HTML content before rendering or saving to DB
export function sanitizeHtmlContent(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}
```

---

## ⚡ Rate-Limiting Middleware Pattern (Upstash Redis / Memory)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(req: NextRequest, limit = 10, windowMs = 60000) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return null; // OK
  }

  if (record.count >= limit) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }

  record.count += 1;
  return null;
}
```

---

## 🛡️ Mandatory Content Security Policy (CSP) Headers

Configure strict response headers in application edge servers:

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
