# Authentication & Multi-Tenancy Reference

*Secure authentication flows, Role-Based Access Control (RBAC), tenant isolation middleware, and session management.*

---

## 🔑 Authentication Architecture Patterns

Use modern authentication solutions (Better Auth, NextAuth v5, Supabase Auth, Clerk) following these core principles:

1. **HttpOnly, Secure Cookies**: Store session tokens in `HttpOnly`, `SameSite=Lax`, `Secure` cookies (NEVER store JWT access tokens in `localStorage` or `sessionStorage` due to XSS vulnerability).
2. **Short-Lived Sessions with Silent Refresh**: Access tokens expire in 15 minutes; refresh tokens auto-rotate and expire in 7-30 days.
3. **MFA & Passkey Support**: Support WebAuthn / Passkeys alongside standard OAuth (Google, GitHub) and Magic Link passwordless logins.

---

## 🏢 Multi-Tenant Middleware Guard Pattern

Intercept requests at the middleware level to inject tenant context and verify authorization before invoking route handlers:

```typescript
// Middleware implementation (Next.js / Express pattern)
export async function middleware(req: NextRequest) {
  const session = await getSession(req);
  const path = req.nextUrl.pathname;

  // Protect private application routes
  if (path.startsWith('/dashboard') || path.startsWith('/api/protected')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verify tenant membership
    const tenantId = req.headers.get('x-tenant-id') || session.user.defaultTenantId;
    if (!session.user.tenants.includes(tenantId)) {
      return new NextResponse(JSON.stringify({ error: 'Tenant access forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}
```

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

Implement granular permission checking using action guards:

```typescript
export type Role = 'owner' | 'admin' | 'editor' | 'viewer';

export const Permissions = {
  'project:create': ['owner', 'admin'],
  'project:delete': ['owner'],
  'project:edit':   ['owner', 'admin', 'editor'],
  'project:view':   ['owner', 'admin', 'editor', 'viewer'],
} as const;

export function hasPermission(role: Role, action: keyof typeof Permissions): boolean {
  return (Permissions[action] as readonly string[]).includes(role);
}
```

---

## 🚨 Security Guard Checklist for Auth Implementation

- [ ] Password hashes MUST use `argon2id` or `bcrypt` with work factor >= 12.
- [ ] Auth endpoints MUST enforce strict Rate-Limiting (max 5 failed login attempts per IP per 15 minutes).
- [ ] Session invalidation on Logout MUST purge cookies on both client and server token revocation tables.
- [ ] Password reset tokens MUST be cryptographically random (`crypto.randomBytes(32)`), hashed in DB, and expire within 15 minutes.
