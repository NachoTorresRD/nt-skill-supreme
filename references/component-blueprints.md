# NT-Design Engine: Production Component Blueprints (Zero-Dead-UI)

*Enterprise-grade, type-safe, fully-interactive component blueprints. Every component implements real functional logic, async states, data binding, and zero dummy code.*

---

## ⚡ 1. Interactive Action Button with Real Mutation & Loading States

A production-grade action button that manages pending states, prevents double clicks, provides visual spinner feedback, and handles errors cleanly.

### React / Next.js / TypeScript:
```tsx
'use client';

import React, { useState } from 'react';

interface AsyncActionButtonProps {
  label: string;
  loadingLabel?: string;
  onExecute: () => Promise<void>;
  variant?: 'primary' | 'destructive' | 'secondary';
  className?: string;
}

export const AsyncActionButton: React.FC<AsyncActionButtonProps> = ({
  label,
  loadingLabel = 'Processing...',
  onExecute,
  variant = 'primary',
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      await onExecute();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Action failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
    destructive: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
    secondary: 'bg-surface-2 hover:bg-surface-3 text-text-main border border-border-subtle',
  };

  return (
    <div className="inline-flex flex-col items-start gap-1.5">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleClick}
        className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variantStyles[variant]} ${className}`}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>{loadingLabel}</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </button>
      {error && (
        <p className="text-xs text-rose-500 font-medium animate-fadeIn" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
```

---

## 📝 2. Production Form with Zod Validation & Server Submission

Never create forms with empty handlers. Enforce real validation, inline error feedback, and complete server submission:

```tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const LeadSchema = z.object({
  fullName: z.string().min(2, 'Name must have at least 2 characters').max(60),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(7, 'Phone number must have at least 7 digits').optional().or(z.literal('')),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

interface LeadFormProps {
  onSubmitLead: (data: LeadInput) => Promise<{ success: boolean; error?: string }>;
  onSuccessCallback?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmitLead, onSuccessCallback }) => {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
  });

  const handleFormSubmit = async (data: LeadInput) => {
    setServerError(null);
    setSuccessMessage(null);

    const result = await onSubmitLead(data);
    if (!result.success) {
      setServerError(result.error || 'Failed to submit form. Please check your data.');
      return;
    }

    setSuccessMessage('Thank you! Your information has been received.');
    reset();
    if (onSuccessCallback) onSuccessCallback();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 max-w-md w-full bg-surface-1 p-6 rounded-2xl border border-border-subtle backdrop-blur-md">
      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Jane Doe"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          {...register('fullName')}
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border-subtle text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-xs text-rose-500 font-medium">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
          Work Email *
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border-subtle text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-rose-500 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {serverError && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs font-medium" role="alert">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-medium" role="status">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all duration-150 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Sending Request...' : 'Submit Request'}
      </button>
    </form>
  );
};
```

---

## 📊 3. Living Data Table with Filtering, Sorting & Real CSV Export

Tables must connect directly to data arrays, provide working instant search, column sorting, and actionable export:

```tsx
'use client';

import React, { useState, useMemo } from 'react';

export interface DataRow {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'archived';
  amount: number;
}

interface DataTableProps {
  data: DataRow[];
  onRowDelete?: (id: string) => Promise<void>;
}

export const LivingDataTable: React.FC<DataTableProps> = ({ data, onRowDelete }) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof DataRow>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [data, search, selectedStatus, sortField, sortAsc]);

  const handleExportCSV = () => {
    const headers = ['ID,Name,Category,Status,Amount'];
    const rows = filteredData.map(
      (r) => `"${r.id}","${r.name}","${r.category}","${r.status}",${r.amount}`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-surface-1 rounded-2xl border border-border-subtle p-5">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records..."
            className="w-full px-3 py-2 bg-surface-2 border border-border-subtle rounded-lg text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-surface-2 border border-border-subtle rounded-lg text-sm text-text-main focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-surface-2 hover:bg-surface-3 text-text-main border border-border-subtle rounded-lg text-sm font-medium transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border-subtle">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 text-text-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="p-3 cursor-pointer select-none" onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}>
                Name {sortField === 'name' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right cursor-pointer select-none" onClick={() => { setSortField('amount'); setSortAsc(!sortAsc); }}>
                Amount {sortField === 'amount' && (sortAsc ? '▲' : '▼')}
              </th>
              {onRowDelete && <th className="p-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-2/40 transition-colors">
                  <td className="p-3 font-medium text-text-main">{row.name}</td>
                  <td className="p-3 text-text-muted">{row.category}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      row.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                      row.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums text-text-main">${row.amount.toFixed(2)}</td>
                  {onRowDelete && (
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onRowDelete(row.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text-muted text-sm">
                  No records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

---

## 🛒 4. Dynamic Cart / State Drawer with Real Quantity Controls & Checkout

Never output a static cart. Implement full quantity management, instant subtotal recalculations, and checkout handoff:

```tsx
'use client';

import React from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => Promise<void>;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutClick = async () => {
    setIsCheckingOut(true);
    try {
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface-1 border-l border-border-subtle h-full shadow-2xl flex flex-col z-10 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <h2 className="text-lg font-bold text-text-main">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-surface-2" aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-2/60 border border-border-subtle">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-text-main truncate">{item.name}</h4>
                  <p className="text-xs text-text-muted tabular-nums">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 rounded bg-surface-3 text-text-main disabled:opacity-40 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded bg-surface-3 text-text-main flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-2 text-rose-400 hover:text-rose-300 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        <div className="pt-4 border-t border-border-subtle space-y-3">
          <div className="flex justify-between text-base font-bold text-text-main">
            <span>Subtotal</span>
            <span className="tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0 || isCheckingOut}
            onClick={handleCheckoutClick}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all duration-150 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCheckingOut ? 'Redirecting to Checkout...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 📱 5. Contextual WhatsApp Floating Button (Local Business Only)

```html
<!-- Include for Local Business, Dental, Medical, Restaurant, or Local Services -->
<a href="https://wa.me/YOUR_PHONE_NUMBER?text=Hello!%20I%20would%20like%20more%20information." 
   target="_blank" 
   class="whatsapp-float" 
   aria-label="Chat on WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
  </svg>
</a>

<style>
  .whatsapp-float {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    width: 60px; height: 60px; border-radius: 50%;
    background: #25d366; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .whatsapp-float:hover { transform: scale(1.1); }
  }
  .whatsapp-float:active { transform: scale(0.95); }
</style>
```
