# API & Database Contracts Reference

*Type-safe API validation, schema integrity, Drizzle / Prisma database standards, Row-Level Security (RLS), and Schema-to-UI Auto-Projection.*

---

## 🔒 Type-Safe Validation Schema (Zod)

Every incoming API payload, request body, and route parameter MUST be validated at the runtime boundary using Zod or equivalent type-safe validators:

```typescript
import { z } from 'zod';

// Input Schema Definition
export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  role: z.enum(['admin', 'member', 'guest']).default('member'),
  organizationId: z.string().uuid({ message: 'Invalid organization UUID' }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

### Route Handler Integration Pattern
```typescript
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const payload = CreateUserSchema.parse(json);
    
    // Process business logic with guaranteed type payload
    const user = await db.insert(users).values(payload).returning();
    return Response.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return Response.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

## 🔄 Schema-to-UI Auto-Projection (Zero User Overhead)

When generating UI for existing projects, the AI must automatically project database & Zod schemas directly into interface elements without asking the user for field definitions:

### Projection Matrix:
| Schema Type | UI Input / Element | Validation & Formatting |
|---|---|---|
| `z.string().email()` | `<input type="email">` | Email regex check, `@` autocomplete |
| `z.string().min(n).max(m)` | `<input type="text">` or `<textarea>` | Live character counter, inline error |
| `z.enum(['a', 'b', 'c'])` | `<select>` or Radio Group | Formatted capitalized option labels |
| `z.number().positive()` | `<input type="number" step="any">` | Currency / quantity formatter (`tabular-nums`) |
| `z.boolean()` | Modern Toggle Switch | Accessible `role="switch"`, `aria-checked` |
| `timestamp` / `date` | Datepicker or relative time | Clean localized date formatting |

---

## 🗄️ Database Schemas & ORM Standards (Drizzle / Prisma)

### 1. Drizzle ORM Schema Standards
Always define explicit table constraints, foreign key cascades, timestamps, and indexes on queried fields:

```typescript
import { pgTable, uuid, varchar, timestamp, index } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('projects_org_idx').on(table.organizationId),
}));
```

### 2. Row Level Security (RLS) Rules for Postgres / Supabase
Always enforce tenant boundaries at the database level:

```sql
-- Enable RLS on target table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for tenant isolation
CREATE POLICY "Users can access their organization projects"
ON projects FOR ALL
USING (organization_id = auth.jwt() ->> 'organization_id');
```

---

## 🚦 API Error Standards

Standardize HTTP status codes across all API endpoints:

| Status Code | Meaning | Usage Scenario |
|---|---|---|
| `200 OK` | Success | Successful GET, PUT, or DELETE request. |
| `201 Created` | Created | Successful POST creation. |
| `400 Bad Request` | Validation Error | Zod validation fail or invalid JSON payload. |
| `401 Unauthorized` | Unauthenticated | Missing or expired auth token / session cookie. |
| `403 Forbidden` | Access Denied | Authenticated user lacks permission / tenant mismatch. |
| `404 Not Found` | Resource Missing | Targeted entity ID does not exist in DB. |
| `429 Too Many Requests` | Rate Limited | Client exceeded request quota threshold. |
| `500 Server Error` | Unexpected Failure | Uncaught exception logged to telemetry. |
