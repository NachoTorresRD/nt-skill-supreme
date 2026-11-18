# Functional Logic & Real Wiring Engine Reference

*Adaptable patterns for clear controls, real behavior, existing project data, and appropriately complete features.*

---

## 1. Functional Controls, Proportionate States

Do not present an inert control as if it works. Implement the behavior requested, show a clear disabled state with a reason, or omit the control. For prototypes, make simulated behavior explicit. Match feedback to the control: asynchronous actions usually need pending and error handling; a normal link or synchronous toggle does not need a toast, spinner, or four-state framework.

Avoid misleading controls such as `href="#"`, empty submit handlers, and placeholder click actions in delivered production UI. If the task is a visual prototype, use clearly labeled mock behavior instead of inventing a backend.

For asynchronous actions, consider these states when they improve the experience:
1. **Idle**: Clear label, keyboard focus, and appropriate affordance.
2. **Pending**: Prevent duplicate submissions when harmful; show progress for operations that take noticeable time.
3. **Success**: Confirm only when the outcome is not already obvious; update relevant data.
4. **Error**: Explain the failure and preserve user input when possible.

---

## 2. Proportionate Codebase Discovery

When a task touches persisted or remote data, inspect the nearest relevant model, endpoint, query, and caller before changing the contract. Keep exploration local to the feature; do not scan unrelated modules for every UI task.

### Step-by-Step Discovery Protocol:
1. Identify the framework and data library from nearby files or the package manifest.
2. Find the model and existing query/mutation only if the feature reads or changes data.
3. Reuse existing field names, validation, authorization, and API contracts.
4. If persistence is absent, do not add a schema, endpoint, or full vertical slice by default. Implement only the requested scope, or ask one focused question when persistence materially changes the solution.

---

## 🔘 3. Production Action Button Patterns

### Pattern A: React / Next.js Server Action & TanStack Query Mutation
```tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ActionButtonProps {
  itemId: string;
  queryKey: readonly unknown[];
  onSuccessMessage?: string;
  onPerformAction: (id: string) => Promise<{ success: boolean; message?: string }>;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  itemId,
  queryKey,
  onSuccessMessage = 'Action completed successfully',
  onPerformAction,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await onPerformAction(itemId);
      if (!result.success) throw new Error(result.message || 'Operation failed');
      return result;
    },
    onMutate: () => {
      setErrorMessage(null);
      setSuccessMessage(null);
    },
    onSuccess: async (result) => {
      setSuccessMessage(result.message || onSuccessMessage);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: (err: Error) => {
      setErrorMessage(err.message || 'An unexpected error occurred');
    },
  });

  return (
    <div className="flex flex-col gap-1 items-start">
      <button
        type="button"
        disabled={isPending}
        onClick={() => mutate()}
        className={`relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
          isPending ? 'bg-primary/80' : 'bg-primary hover:bg-primary-hover text-white shadow-sm'
        }`}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <span>Execute Action</span>
        )}
      </button>

      {errorMessage && (
        <span className="text-xs text-rose-500 font-medium" role="alert">
          {errorMessage}
        </span>
      )}
      {successMessage && (
        <span className="text-xs text-emerald-600 font-medium" role="status">
          {successMessage}
        </span>
      )}
    </div>
  );
};
```

### Pattern B: Vanilla JS / Native HTML Micro-Action with Async Handler
```html
<button
  id="exportBtn"
  class="btn btn-primary"
  type="button"
  onclick="handleExportData(this)"
  aria-label="Export active dataset to CSV"
>
  <span class="btn-spinner hidden" aria-hidden="true">⏳</span>
  <span class="btn-text">Export CSV</span>
</button>

<script>
async function handleExportData(btn) {
  const spinner = btn.querySelector('.btn-spinner');
  const label = btn.querySelector('.btn-text');

  // 1. Enter Pending State
  btn.disabled = true;
  spinner.classList.remove('hidden');
  label.textContent = 'Generating...';

  try {
    // 2. Execute Real Operational Logic (e.g. Export CSV from memory/DOM/API)
    const response = await fetch('/api/reports/export', { credentials: 'same-origin' });
    if (!response.ok) throw new Error('Failed to generate export');

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 60000);

    // 3. Success Feedback
    label.textContent = 'Downloaded!';
    setTimeout(() => { label.textContent = 'Export CSV'; }, 2000);
  } catch (err) {
    // 4. Error Feedback
    console.error('Export error:', err);
    label.textContent = 'Error. Retry?';
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}
</script>
```

---

## 4. Form Submission & Validation

When a form submits data, use the project's validation and form libraries where present. A useful checklist is:
1. Define required fields and validation messages at the appropriate boundary.
2. Associate field errors with inputs using the framework's established accessibility pattern.
3. Prevent duplicate requests when appropriate and show progress for longer operations.
4. Send data to the real destination only when the task calls for persistence or a server action.
5. After submission:
   - On success: Reset dirty form state, show feedback banner/toast, redirect or close modal.
   - On failure: Keep user data intact, focus the first invalid field, display clear error text.

---

## 5. Data Tables & Lists

Add table controls only when they serve the requested workflow and data size:
1. Search and filters should update the correct source (client or server); debounce only when it prevents wasteful work or typing lag.
2. Add sorting for useful columns and expose sort direction accessibly.
3. Distinguish a genuinely empty dataset from no search results; offer a recovery action only when one is useful and supported.
4. Implement requested row actions against existing mutations. Use confirmation or undo for destructive actions according to the product's conventions.

---

## 6. Responsible Intent Expansion

For a brief prompt, infer only supporting work needed to complete the stated goal:

1. Include necessary validation, error handling, accessibility, responsive behavior, and focused verification.
2. Follow existing data sources and interaction patterns.
3. Do not invent product behavior, persistence, services, or architecture. State consequential assumptions or ask before expanding scope.
