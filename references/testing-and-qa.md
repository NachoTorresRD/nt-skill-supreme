# Testing & Quality Assurance Reference

*Automated testing protocols, unit & integration testing with Vitest/Jest, E2E testing with Playwright, and AI verification directives.*

---

## 🧪 Testing Pyramid & Coverage Guidelines

Maintain balanced test coverage across the software stack:

```
        /  E2E Tests  \       <- Playwright (Critical user flows: Login, Checkout, Onboarding)
       /--------------- \
      / Integration Tests \    <- Vitest / React Testing Library (API routes, Component trees)
     /---------------------\
    /      Unit Tests       \   <- Vitest / Jest (Utility functions, Zod schemas, Reducers)
   ---------------------------
```

| Layer | Target Coverage | Recommended Engine | Speed |
|---|---|---|---|
| **Unit Tests** | Cover important pure logic and edge cases; set targets per project | `vitest` / Node `--test` | Usually fast |
| **Integration Tests** | Key API endpoints & Component hooks | `vitest` + `@testing-library/react` | Fast (< 1-2s per suite) |
| **E2E Tests** | Core business purchase/auth flows | `playwright` | Moderate (10-30s per flow) |

---

## 🤖 AI Test Verification Directive

> [!IMPORTANT]
> Run the narrowest relevant check available and report its result accurately. Do not claim an unrun check passed. If a failure is in the changed behavior, investigate and rerun after fixing it; report unrelated baseline failures without changing them as part of a focused task.

---

## 🛠️ Production Testing Patterns

### 1. Vitest Component Testing Pattern
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly and responds to click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit Form</Button>);
    
    const button = screen.getByRole('button', { name: /submit form/i });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button and shows spinner when loading prop is true', () => {
    render(<Button isLoading>Submit Form</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
```

### 2. Playwright E2E User Flow Pattern
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication & Dashboard Flow', () => {
  test('user can log in successfully and view dashboard metrics', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'SecurePassword123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
  });
});
```

---

## 📋 Anti-Regression Protocol

1. **Bug Fix Protocol**: Add a regression test when the behavior can be tested reliably and the test is proportionate to the change. For tiny or hard-to-isolate changes, use the narrowest practical validation and state the limitation.
2. **Contract Preservation**: Modifying function signatures or props requires updating all callers across the workspace.
3. **Diagnostics**: Do not suppress useful failures or catch errors silently. If a suppression is necessary, keep it narrow and explain why.
