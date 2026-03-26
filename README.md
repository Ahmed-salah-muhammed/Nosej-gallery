# ShopWave 2.0 — ATELIER 🛍️

Modern React e-commerce SPA — Vite + React Router v6 + **Tailwind CSS v4** + MUI v6 + Context API.

> Built & enhanced by **Ahmed Salah** — GIS Analyst & Full-Stack Developer

---

## 🚀 Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## 📁 Project Structure

```
shopwave/
├── public/
│   └── _redirects              # Netlify SPA redirect
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Marquee bar + live search dropdown + mobile drawer
│   │   ├── ProductCard.jsx       # Lazy images + entry animations
│   │   ├── Breadcrumbs.jsx       # MUI breadcrumbs for all pages
│   │   ├── Footer.jsx            # Full footer with contact, socials, payment badges
│   │   ├── ScrollToTop.jsx       # FAB appears after 300px scroll
│   │   ├── CartItem.jsx          # Cart row component
│   │   ├── QuantityControl.jsx   # Reusable +/− qty input
│   │   ├── ProtectedRoute.jsx    # Auth guard for checkout/profile
│   │   └── ErrorBoundary.jsx     # React error boundary
│   ├── context/
│   │   ├── CartContext.jsx       # Global cart (localStorage)
│   │   ├── AuthContext.jsx       # Mock auth (localStorage)
│   │   ├── ThemeContext.jsx      # Dark / light toggle
│   │   ├── ToastContext.jsx      # Top-right slide toasts
│   │   └── WishlistContext.jsx   # Wishlist (localStorage)
│   ├── hooks/
│   │   ├── useFetchProducts.js   # Fetch all products
│   │   └── useFetchProduct.js    # Fetch single product
│   ├── pages/
│   │   ├── Home.jsx              # Hero carousel, brand story, testimonials, partners
│   │   ├── Shop.jsx              # Advanced filters, view toggle, breadcrumbs
│   │   ├── ProductDetail.jsx     # Product detail with trust badges
│   │   ├── Cart.jsx              # Sticky summary + free-shipping progress
│   │   ├── Wishlist.jsx          # Wishlist with add-all-to-cart
│   │   ├── Checkout.jsx          # Multi-step checkout form
│   │   ├── Login.jsx             # Auth page
│   │   └── Profile.jsx           # Order tracker + GIS delivery map
│   ├── services/
│   │   └── api.js                # All fetch() calls (fakestoreapi.com)
│   ├── styles/
│   │   └── global.css            # Tailwind v4 + marquee/animation utilities
│   ├── theme/
│   │   └── index.jsx             # MUI theme (light + dark)
│   ├── App.jsx                   # Providers + protected routes + error boundary
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## ✨ Features

### UI / UX
- **Announcement Marquee** — infinite scrolling bar, pauses on hover
- **Hero Carousel** — 4 slides, auto-advances every 2s, styled arrows + dot indicators
- **Live Search** — navbar dropdown showing top 3 matching products with images
- **Breadcrumbs** — on every internal page
- **Scroll-to-Top** FAB — appears after 300px scroll
- **Dark Mode** — refined mid-contrast palette, toggled via ThemeContext
- **Top-Right Toasts** — slide-in MUI Alerts for cart/wishlist actions

### Pages
| Page | Highlights |
|------|-----------|
| Home | Carousel · Category grid · Best Sellers · Brand Story · Testimonials · Partner Brands marquee · Newsletter |
| Shop | Search · Category · Price range · Min rating · Sale filter · Sort (7 options) · Grid/List toggle |
| Product | Lazy image · Trust badges · Qty control · Wishlist toggle · Tabs (desc/reviews/shipping) |
| Cart | Clean item list · **Sticky order summary** · Free-shipping progress bar · Tax calc |
| Wishlist | Add all to cart · Remove individual · Empty state |
| Profile | Order history · **Step Tracker** · **GIS delivery map** (SVG mock route) |
| Checkout | Protected route · Multi-field form |

### Architecture
- **Protected Routes** — Checkout & Profile redirect to `/login` if unauthenticated
- **Error Boundary** — prevents full app crash
- **Flat directory** — `components/`, `pages/`, `context/`, `hooks/`, `services/`

---

## 🌍 GIS Signature Feature

The Profile page includes a **"Live Order Map"** tab — an SVG-based delivery route
visualisation showing a mock path from Warehouse → User Location, built as a nod to
**Ahmed Salah's GIS Analyst background**.

---

## 🚀 Deploy

### Netlify
`public/_redirects` is included — SPA routing works out of the box.

### Vercel
`vercel.json` is included with rewrite rules.

### Cloudflare Pages
No config needed.

---

## 👤 Developer

**Ahmed Salah** — GIS Analyst & Full-Stack Developer  
📧 ahmedsalah219013@gmail.com  
📱 +20 122 524 6488  
🐙 [github.com/Ahmed-salah-muhammed](https://github.com/Ahmed-salah-muhammed/)
