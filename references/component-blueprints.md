# NT-Design Engine: Component Blueprints & Snippets

*Production-ready HTML, CSS, and JS snippets designed for instantaneous client site assembly.*

---

## 📱 1. Sticky Navigation Bar + Mobile Drawer

```html
<header class="navbar">
  <div class="nav-container">
    <a href="#" class="brand-logo">BrandName</a>
    <nav class="nav-links desktop-only">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact" class="btn btn-primary">Book Consultation</a>
    </nav>
    <button class="hamburger mobile-only" onclick="toggleMobileNav()" aria-label="Toggle Navigation Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="mobile-drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
  <button class="close-drawer" onclick="toggleMobileNav()" aria-label="Close Navigation">&times;</button>
  <a href="#services" onclick="toggleMobileNav()">Services</a>
  <a href="#about" onclick="toggleMobileNav()">About</a>
  <a href="#pricing" onclick="toggleMobileNav()">Pricing</a>
  <a href="#contact" class="btn btn-primary" onclick="toggleMobileNav()">Book Consultation</a>
</div>

<style>
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10, 10, 15, 0.85); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 1rem 1.5rem;
  }
  .nav-container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
  .mobile-drawer {
    position: fixed; top: 0; right: 0; width: 80%; height: 100vh; z-index: 200;
    background: #0f172a; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;
    transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mobile-drawer.open { transform: translateX(0); }
</style>
<script>
  function toggleMobileNav() {
    document.getElementById('mobileDrawer').classList.toggle('open');
  }
</script>
```

---

## ⚡ 2. High-Converting Hero with Social Proof Stack (Grounded Data)

```html
<section class="hero">
  <div class="hero-content">
    <div class="social-proof-pill">
      <div class="avatar-stack">
        <span class="avatar">👤</span><span class="avatar">👤</span><span class="avatar">👤</span>
      </div>
      <span>[Placeholder: Real Client Rating / Social Proof Stat]</span>
    </div>
    <h1 class="hero-title">Transform Your Business Operations In Days, Not Months.</h1>
    <p class="hero-lead">We deliver high-end, conversion-focused websites tailored to your commercial goals.</p>
    <div class="hero-ctas">
      <!-- Visually Dominant Primary CTA -->
      <a href="#contact" class="btn btn-primary">Get Started Now</a>
      <!-- Lower Hierarchy Secondary CTA -->
      <a href="#services" class="btn btn-ghost">Learn More &rarr;</a>
    </div>
  </div>
</section>
```

---

## 💳 3. Interactive Pricing Cards with Billing Switch

```html
<section id="pricing" class="pricing-section">
  <div class="pricing-header">
    <h2>Transparent Pricing</h2>
    <div class="toggle-container">
      <span>Monthly</span>
      <input type="checkbox" id="billingToggle" onchange="toggleBilling()" aria-label="Toggle Annual Billing">
      <span>Annual (Discounted)</span>
    </div>
  </div>
  <div class="pricing-cards">
    <div class="card pricing-card">
      <h3>Basic Plan</h3>
      <div class="price" id="basicPrice">$29<span>/mo</span></div>
      <ul>
        <li>✓ Full Responsive Design</li>
        <li>✓ SEO Optimization</li>
      </ul>
      <a href="#contact" class="btn btn-secondary">Select Basic</a>
    </div>
    <div class="card pricing-card featured">
      <span class="badge">Recommended</span>
      <h3>Pro Plan</h3>
      <div class="price" id="proPrice">$79<span>/mo</span></div>
      <ul>
        <li>✓ Everything in Basic</li>
        <li>✓ Custom Booking System</li>
        <li>✓ Priority Support</li>
      </ul>
      <a href="#contact" class="btn btn-primary">Select Pro</a>
    </div>
  </div>
</section>
<script>
  function toggleBilling() {
    const isAnnual = document.getElementById('billingToggle').checked;
    document.getElementById('basicPrice').innerHTML = isAnnual ? '$23<span>/mo</span>' : '$29<span>/mo</span>';
    document.getElementById('proPrice').innerHTML = isAnnual ? '$63<span>/mo</span>' : '$79<span>/mo</span>';
  }
</script>
```

---

## 💬 4. Contextual WhatsApp Floating Button (Local Business Only)

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
