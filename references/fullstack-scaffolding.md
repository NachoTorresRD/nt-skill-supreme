# Full-Stack Scaffolding & Architecture Blueprints

*Production-ready full-stack application blueprints combining Auth, Database, Payments (Stripe), Admin Portal, and File Storage.*

---

## 🏗️ Full-Stack Project Directory Architecture

When generating or structuring modern full-stack web applications (Next.js / Vite + Express), adhere to this modular directory layout:

```
src/ (or app/)
├── app/                        # Next.js App Router Pages & API Routes
│   ├── (auth)/                 # Route Group: Authentication (Login, Register)
│   ├── (dashboard)/            # Route Group: Authenticated App Shell (Dashboard, Settings)
│   ├── api/                    # API Route Handlers (Auth, Stripe webhooks, DB queries)
│   ├── layout.tsx              # Root Layout (Providers, Fonts, Metadata)
│   └── page.tsx                # Marketing / Hero Home Page
├── components/                 # UI Component Library
│   ├── ui/                     # Primitives (Button, Modal, Input, Badge, Toast)
│   ├── forms/                  # React Hook Form + Zod Form instances
│   └── layout/                 # Sidebar, Header, Footer, Mobile Drawer
├── lib/                        # Singletons & External Integrations
│   ├── db/                     # Drizzle/Prisma DB instance, migration schemas
│   ├── auth/                   # Session utils, auth client, middleware helpers
│   ├── stripe/                 # Stripe client, subscription webhooks handler
│   └── utils.ts                # Tailwind `cn()` merger, currency formatters
├── server/                     # Backend Logic & Server Actions
│   ├── actions/                # Type-safe Server Actions (Mutations)
│   └── queries/                # Server-only Data Fetching (Queries)
├── types/                      # Global TypeScript definitions & DTOs
└── tests/                      # Vitest & Playwright test suites
```

---

## 💳 Stripe Payments & Subscription Integration Pattern

### 1. Webhook Signature Handler (Idempotent)
Handle async payment events cleanly with verification and idempotency checks:

```typescript
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { subscriptions } from '@/lib/db/schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response('Webhook Signature Verification Failed', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await db.insert(subscriptions).values({
        userId: session.client_reference_id!,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        status: 'active',
      }).onConflictDoUpdate({
        target: subscriptions.userId,
        set: { status: 'active' },
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await db.update(subscriptions)
        .set({ status: 'canceled' })
        .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
```

---

## 📂 Cloud File Storage Pattern (S3 / Cloudflare R2)

Upload files directly using presigned URLs to prevent server memory overhead:

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function generateUploadPresignedUrl(fileName: string, contentType: string) {
  const fileKey = `uploads/${Date.now()}-${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
  return { signedUrl, fileKey };
}
```
