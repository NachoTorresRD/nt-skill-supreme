# State Management & Data Fetching Reference

*Best practices for Server vs. Client state separation, TanStack Query / SWR patterns, Zustand state stores, automatic store discovery, and resilient loading UX.*

---

## 🏗️ State Categorization Matrix

Never mix server cache into global UI state. Categorize state strictly into four layers:

| Layer | Responsibility | Recommended Tech | Anti-Pattern to Avoid |
|---|---|---|---|
| **Server State** | Async data fetched from API/DB, cached, invalidated | TanStack Query (`useQuery`), SWR, RTK Query | Storing API response arrays in Zustand or `useState`. |
| **Client UI State** | Local modal visibility, active tab index, sidebar toggle | React `useState`, Zustand, Jotai | Storing form input values in global Redux stores. |
| **URL State** | Search filters, pagination index, active modal query params | Next.js `useSearchParams`, React Router | Keeping filter states only in local state (breaks link sharing). |
| **Form State** | Transient user inputs, field validation, dirty state | React Hook Form, Formik | Re-rendering parent page on every single keypress. |

---

## 🔍 Proactive Store & Hook Discovery Protocol

Before writing a new state store or fetching hook, the AI agent MUST search the existing project:
1. **Search for Existing Query Hooks**: Look in `src/hooks/`, `lib/api/`, or `server/queries/` for hooks like `useUsers`, `useCurrentOrganization`, `useCart`.
2. **Search for Existing Stores**: Look in `stores/`, `lib/store/`, or `context/` for Zustand (`create()`), Redux slices, or React Context.
3. **Bind Directly to Discovered Stores**:
   - If `useCartStore` already exists with `{ items, addItem, removeItem }`, use it directly instead of creating local mock arrays.
   - If an existing hook provides `{ data, isLoading, error, refetch }`, consume it directly.

---

## ⚡ Server State & Caching Patterns

### 1. TanStack Query Standard Pattern
Always define explicit `queryKeys` as arrays with scoped identifiers:

```typescript
// ✅ CORRECT: Scoped query keys with automatic caching and invalidation
const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['users', 'profile', userId],
    queryFn: () => fetchUserProfile(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    gcTime: 1000 * 60 * 30,   // 30 minutes garbage collection
    retry: (failureCount, error) => failureCount < 3 && !is404(error),
  });
};
```

### 2. Optimistic UI Updates with Rollback
When executing mutations (e.g. liking a post, updating a status, deleting an item), update the local cache optimistically and roll back cleanly on failure:

```typescript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateTaskStatus,
  onMutate: async (newTask) => {
    // 1. Cancel outgoing queries to prevent overwriting optimistic update
    await queryClient.cancelQueries({ queryKey: ['tasks', newTask.id] });

    // 2. Snapshot the previous value
    const previousTask = queryClient.getQueryData(['tasks', newTask.id]);

    // 3. Optimistically update to the new value
    queryClient.setQueryData(['tasks', newTask.id], newTask);

    // Return context object with snapshotted value
    return { previousTask };
  },
  onError: (err, newTask, context) => {
    // 4. Roll back to previous value on failure
    if (context?.previousTask) {
      queryClient.setQueryData(['tasks', newTask.id], context.previousTask);
    }
  },
  onSettled: () => {
    // 5. Always refetch in the background to ensure authoritative sync
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});
```

---

## 🔄 Four-State Loading Experience

Every data-dependent UI section MUST explicitly handle all four state transitions:

1. **Loading State**: Skeleton loaders matching exact final layout dimensions (no generic spinners that trigger Layout Shift).
2. **Success State**: Smooth transition reveal of populated data.
3. **Empty State**: Contextual empty graphic, friendly explanation, and primary action button (e.g. "No invoices found. Create your first invoice").
4. **Error State**: Non-blocking error banner with human-readable error description and a "Retry" button.
