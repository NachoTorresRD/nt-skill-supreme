# UI/UX Pro Max Architecture & WCAG Accessibility Reference

*Comprehensive layout systems, UX heuristics, responsive design rules, and WCAG 2.1 AA compliance standards.*

---

## 📐 Layout & Spatial Systems

### 1. The 4px/8px Baseline Scale
All dimensional values (margins, padding, gap, sizes) must strictly adhere to the 8px baseline grid:

```
4px   - Tight inline badge padding, border widths
8px   - Small gaps, icon padding, chip margins
16px  - Standard card padding, component gaps
24px  - Section spacing, modal padding
32px  - Hero section padding, desktop grid gaps
48px+ - Major page section divisions
```

### 2. Multi-Device Responsive Breakpoints

| Device Category | Breakpoint Range | Key UX Considerations |
|---|---|---|
| Mobile Compact | `< 640px` (`sm`) | Full-width buttons, bottom drawer modals, min touch target 44x44px. |
| Tablet / Foldable | `640px - 1024px` (`md`) | 2-column flex layouts, collapsible sidebar navigation. |
| Desktop | `1024px - 1440px` (`lg`/`xl`) | Multi-column dashboard grids, fixed top/side navigation bar. |
| Ultra-Wide Display | `> 1440px` (`2xl`) | Max layout container width constraint (`max-w-7xl` or `1400px` centered). |

---

## ♿ WCAG 2.1 AA Accessibility Checklist

### 1. Keyboard Navigation & Focus Management
- Interactive elements must be reachable via `Tab` and executable via `Enter` / `Space`.
- Focus indicators MUST NOT be removed with `outline: none` unless replaced by explicit, high-visibility focus rings:
  ```css
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent-primary);
  }
  ```
- Modal dialogs must trap focus (`focus-trap`) and dismiss on `Escape`.

### 2. Color Contrast Ratios
- **Normal Text (< 18pt)**: Contrast ratio >= **4.5:1** against surface background.
- **Large Text (>= 18pt or 14pt bold)**: Contrast ratio >= **3.0:1**.
- **UI Components & Icons**: Contrast ratio >= **3.0:1**.

### 3. Screen Reader Semantics & ARIA Standards
- Landmarked pages (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
- Standard form labels (`<label htmlFor="...">`) paired with `<input id="...">`.
- Status indicators and live region updates:
  ```html
  <div role="status" aria-live="polite" class="sr-only">
    Item added to shopping cart.
  </div>
  ```
