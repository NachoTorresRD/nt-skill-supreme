# NT-Design Engine: Advanced Motion, Scroll Effects & Hover FX Reference

*Scroll-driven CSS animations, 3D perspective tilts, spotlight tracking, and physics-based micro-interactions.*

---

## 📜 1. Native Scroll-Driven & Scroll-Triggered Effects (Zero JS Jank)

Modern scroll effects run GPU-accelerated off the main thread using native CSS `animation-timeline`:

### A. Element Reveal on Scroll
```css
/* Card Reveal as it scrolls into viewport */
.card-scroll-reveal {
  animation: revealOnScroll linear forwards;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}

@keyframes revealOnScroll {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### B. Scroll Reading Progress Bar
```css
.scroll-progress-bar {
  position: fixed; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-violet));
  transform-origin: 0%;
  animation: pageProgress linear;
  animation-timeline: scroll();
  z-index: 1000;
}

@keyframes pageProgress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

---

## 🎛️ 2. Advanced 3D Hover Tilt & Spotlight Tracking

### A. 3D Card Perspective Tilt + Specular Glare (JS + CSS)
```html
<div class="tilt-card-wrapper">
  <div class="tilt-card" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)">
    <div class="tilt-glare"></div>
    <h3>3D Tilt Interactive Component</h3>
    <p>Card responds dynamically to cursor position with perspective depth.</p>
  </div>
</div>

<style>
  .tilt-card-wrapper { perspective: 1000px; }
  .tilt-card {
    background: var(--bg-surface-1); border: 1px solid var(--border-subtle);
    border-radius: 20px; padding: 2rem; position: relative; overflow: hidden;
    transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    transform-style: preserve-3d;
  }
  .tilt-glare {
    position: absolute; inset: 0; pointer-events: none; opacity: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%);
    transition: opacity 0.3s ease;
  }
  .tilt-card:hover .tilt-glare { opacity: 1; }
</style>

<script>
  function handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }
  function resetTilt(card) {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
</script>
```

---

## ⚡ 3. Tactile Press Feedback & Asymmetric Spring Rules

- **Hover state**: Subtle elevation lift (`hover:-translate-y-1`) with soft shadow expansion.
- **Active state**: Tactile press shrink (`active:scale-[0.97]` or `scale(0.96)`) at 100ms.
- **Popovers vs Modals**: Popovers scale from anchor (`transform-origin: var(--radix-popover-content-transform-origin)`). Modals stay centered.
