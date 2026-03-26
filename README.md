This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
public/
  _redirects
src/
  components/
    Breadcrumbs.jsx
    CartItem.jsx
    ErrorBoundary.jsx
    Footer.jsx
    Navbar.jsx
    ProductCard.jsx
    ProtectedRoute.jsx
    QuantityControl.jsx
    ScrollToTop.jsx
    StreetMap.jsx
  context/
    AuthContext.jsx
    CartContext.jsx
    ThemeContext.jsx
    ToastContext.jsx
    WishlistContext.jsx
  hooks/
    useFetchProduct.js
    useFetchProducts.js
  pages/
    Cart.jsx
    Checkout.jsx
    Home.jsx
    Login.jsx
    ProductDetail.jsx
    Profile.jsx
    Shop.jsx
    Wishlist.jsx
  services/
    api.js
  styles/
    global.css
  theme/
    index.jsx
  App.jsx
  main.jsx
.gitignore
index.html
package.json
README.md
shopy-darkmode-fix.zip
shopy.zip
vercel.json
vite.config.js
WALKTHROUGH.md
```

# Files

## File: public/_redirects
````
/* /index.html 200
````

## File: src/components/Breadcrumbs.jsx
````javascript
import { Link, useLocation } from "react-router-dom";
import {
  NavigateNext as NextIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const labels = {
  shop: "Shop",
  cart: "Cart",
  wishlist: "Wishlist",
  checkout: "Checkout",
  login: "Login",
  profile: "Profile",
  product: "Product",
};

export default function Breadcrumbs({ title }) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", path: "/" },
    ...parts.map((part, i) => ({
      label: labels[part] || title || decodeURIComponent(part),
      path: "/" + parts.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap cursor-pointer">
      {crumbs.map((c, i) => (
        <div key={c.path} className="flex items-center gap-2">
          {i > 0 && (
            <NextIcon
              className="text-gray-300 cursor-pointer"
              sx={{ fontSize: 14 }}
            />
          )}
          {i === 0 && (
            <HomeIcon
              className="text-gray-400 mr-1 cursor-pointer"
              sx={{ fontSize: 13 }}
            />
          )}
          {i < crumbs.length - 1 ? (
            <Link
              to={c.path}
              className="text-[10px] font-black text-gray-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
              {c.label}
            </Link>
          ) : (
            <span className="text-[10px] font-black  uppercase tracking-widest cursor-pointer">
              {c.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
````

## File: src/components/CartItem.jsx
````javascript
// src/components/CartItem.jsx — Stitch NOSEJ cart row (no dividers, spacing as separator)
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import QuantityControl from "./QuantityControl";

export default function CartItem({ product, qty }) {
  const { updateQty, removeItem } = useCart();
  const toast = useToast();

  const handleRemove = () => {
    removeItem(product.id);
    toast("Item removed from your selection", "error");
  };

  return (
    <div className="animate-slideIn flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
      {/* Thumbnail */}
      <div
        className="w-28 h-36 rounded-lg overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info grid: name | qty | unit price | total + delete */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full">
        {/* Name + ref */}
        <div className="md:col-span-1">
          <h3
            className="font-bold text-base leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            {product.title.length > 40
              ? product.title.slice(0, 40) + "…"
              : product.title}
          </h3>
          <p
            className="text-[10px] uppercase tracking-widest mt-1"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {product.category}
          </p>
        </div>

        {/* Qty stepper */}
        <div className="flex items-center space-x-3 md:justify-center">
          {/* Round ghost buttons per Stitch cart design */}
          <button
            onClick={() => updateQty(product.id, qty - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
            style={{
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              remove
            </span>
          </button>
          <span
            className="font-bold w-5 text-center text-sm"
            style={{ color: "var(--color-on-surface)" }}
          >
            {qty}
          </span>
          <button
            onClick={() => updateQty(product.id, qty + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
            style={{
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              add
            </span>
          </button>
        </div>

        {/* Unit price */}
        <div className="text-left md:text-center">
          <span
            className="text-sm md:hidden block"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Unit Price
          </span>
          <span
            className="font-medium text-sm"
            style={{ color: "var(--color-on-surface)" }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Subtotal + delete */}
        <div className="flex justify-between items-center md:justify-end gap-6">
          <div className="text-right">
            <span
              className="text-sm md:hidden block"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Total
            </span>
            <span
              className="font-bold text-base"
              style={{ color: "var(--color-on-surface)" }}
            >
              ${(product.price * qty).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 transition-colors duration-200 hover:text-[var(--color-error)]"
            style={{ color: "var(--color-on-surface-variant)" }}
            aria-label="Remove item"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/ErrorBoundary.jsx
````javascript
import { Component } from 'react'
import { BrokenImage as ErrorIcon } from '@mui/icons-material'

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info) }

  render() {
    if (this.state.hasError) return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 p-8 text-center">
        <ErrorIcon className="text-red-600" sx={{ fontSize: 80 }} />
        <h2 className="text-3xl font-black text-gray-900">Something went wrong</h2>
        <p className="text-gray-500 max-w-md text-sm font-bold">
          {this.state.error?.message || "An unexpected error occurred while rendering this piece."}
        </p>
        <button 
          onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
          className="px-10 py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all"
        >
          RELOAD PAGE
        </button>
      </div>
    )
    return this.props.children
  }
}
````

## File: src/components/Footer.jsx
````javascript
import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, TextField, Button, InputAdornment } from "@mui/material";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

const SHOP_LINKS = [
  "New Arrivals",
  "Best Sellers",
  "Men's Clothing",
  "Women's Clothing",
  "Accessories",
  "Sale",
];
const COMPANY_LINKS = [
  "Our Story",
  "Sustainability",
  "Press",
  "Careers",
  "Investors",
];
const SUPPORT_LINKS = [
  "Help Center",
  "Track Order",
  "Returns & Exchanges",
  "Size Guide",
  "Contact Us",
];

const SOCIALS = [
  {
    icon: <GoogleIcon fontSize="small" />,
    href: "mailto:ahmedsalah219013@gmail.com",
    label: "Google",
  },
  {
    icon: <GitHubIcon fontSize="small" />,
    href: "https://github.com/Ahmed-salah-muhammed/",
    label: "GitHub",
  },
  { icon: <TwitterIcon fontSize="small" />, href: "#", label: "X (Twitter)" },
  { icon: <FacebookIcon fontSize="small" />, href: "#", label: "Facebook" },
  { icon: <InstagramIcon fontSize="small" />, href: "#", label: "Instagram" },
];

const PAYMENT_METHODS = [
  { name: "VISA", color: "#1A1F71" },
  { name: "MC", color: "#EB001B" },
  { name: "PayPal", color: "#003087" },
  { name: "Apple Pay", color: "#000000" },
  { name: "Stripe", color: "#635BFF" },
];

function PaymentBadge({ name, color }) {
  return (
    <div
      className="px-4 py-2 rounded-lg min-w-[52px] text-center border"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-outline-variant)",
      }}
    >
      <span className="text-[10px] font-black tracking-wider" style={{ color }}>
        {name}
      </span>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);
  const [err, setErr] = useState("");

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleSub = () => {
    if (!validate(email)) {
      setErr("Enter a valid email");
      return;
    }
    setErr("");
    setSubDone(true);
  };

  return (
    <footer
      className="pt-20 pb-8 border-t"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        borderColor: "var(--color-outline-variant)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h2
              className="text-2xl font-black mb-4 font-serif tracking-widest"
              style={{ color: "var(--color-on-surface)" }}
            >
              NOSEJ
            </h2>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              The Digital Atelier — a destination for those who value
              craftsmanship, minimalism, and the art of the modern wardrobe.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3">
                <EmailIcon
                  sx={{ fontSize: 16, color: "var(--color-primary)" }}
                />
                <a
                  href="mailto:ahmedsalah219013@gmail.com"
                  className="text-sm transition-colors"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  ahmedsalah219013@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon
                  sx={{ fontSize: 16, color: "var(--color-primary)" }}
                />
                <a
                  href="tel:+201225246488"
                  className="text-sm transition-colors"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  +20 122 524 6488
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  size="small"
                  sx={{
                    border: "1px solid var(--color-outline-variant)",
                    borderRadius: "12px",
                    color: "var(--color-on-surface-variant)",
                    "&:hover": {
                      bgcolor: "#131b2e",
                      color: "white",
                      borderColor: "#131b2e",
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              { title: "SHOP", links: SHOP_LINKS },
              { title: "COMPANY", links: COMPANY_LINKS },
              { title: "SUPPORT", links: SUPPORT_LINKS },
            ].map((col) => (
              <div key={col.title}>
                <span
                  className="text-[11px] font-black mb-6 block tracking-widest uppercase"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {col.title}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="#"
                        className="text-sm transition-colors"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-left">
            <span
              className="text-[11px] font-black mb-6 block tracking-widest uppercase"
              style={{ color: "var(--color-on-surface)" }}
            >
              NEWSLETTER
            </span>
            <p
              className="text-sm leading-relaxed mb-6 max-w-[240px]"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Subscribe for exclusive deals & new drops.
            </p>
            {subDone ? (
              <div className="flex items-center gap-2 text-green-500">
                <CheckIcon sx={{ fontSize: 18 }} />
                <span className="font-bold text-xs">Subscribed!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full max-w-[240px]">
                <TextField
                  size="small"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErr("");
                  }}
                  error={!!err}
                  helperText={err}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ fontSize: 16 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSub}
                  sx={{
                    bgcolor: "#131b2e",
                    "&:hover": { bgcolor: "black" },
                    borderRadius: "8px",
                    fontWeight: 900,
                  }}
                >
                  SUBSCRIBE
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12">
          <span
            className="text-[10px] font-black block mb-4 tracking-[0.2em] uppercase"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            SECURE PAYMENT METHODS
          </span>
          <div className="flex flex-wrap gap-3">
            {PAYMENT_METHODS.map((p) => (
              <PaymentBadge key={p.name} {...p} />
            ))}
          </div>
        </div>

        <hr
          style={{
            borderColor: "var(--color-outline-variant)",
            marginBottom: "2rem",
          }}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="text-[11px]"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            `© ${new Date().getFullYear() + " "}
            <strong style={{ color: "var(--color-on-surface)" }}>
              Ahmed Salah
            </strong>{" "}
            — Nosej Digital Boutique. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (l) => (
                <Link
                  key={l}
                  to="#"
                  className="text-[11px] transition-colors"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {l}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
````

## File: src/components/Navbar.jsx
````javascript
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Badge,
  Tooltip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingBagOutlined as CartIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  PersonOutline as UserIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { fetchProducts } from "../services/api";

/* ── Announcement Bar ─────────────────────────────────────────── */
function AnnouncementBar() {
  const items = [
    "🚚 FREE SHIPPING ON ALL ORDERS OVER $99",
    "💳 BUY NOW PAY LATER — 0% INTEREST FOR 6 MONTHS",
    "🌍 WORLDWIDE DELIVERY IN 3–7 BUSINESS DAYS",
  ];
  const text = items.join("     ·     ");
  return (
    <div className=" bg-blue-900 text-white py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[text, text].map((t, i) => (
          <span
            key={i}
            className="px-8 text-[10px] font-black tracking-widest uppercase"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Live Search ──────────────────────────────────────────────── */
function LiveSearch({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then(setAllProducts)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      allProducts.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 5),
    );
  }, [query, allProducts]);

  return (
    <div className="relative flex-1 max-w-lg">
      <div
        className="flex items-center px-4 py-2 rounded-xl border-2 shadow-lg"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-primary)",
        }}
      >
        <SearchIcon
          sx={{ fontSize: 20, color: "var(--color-primary)", mr: 1.5 }}
        />
        <input
          autoFocus
          placeholder="Search for products..."
          className="flex-1 bg-transparent outline-none text-sm font-bold"
          style={{ color: "var(--color-on-surface)" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={onClose}
          className="p-1 rounded-full transition-colors hover:opacity-60"
        >
          <CloseIcon
            sx={{ fontSize: 18, color: "var(--color-on-surface-variant)" }}
          />
        </button>
      </div>

      {results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl border overflow-hidden z-[1500]"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-outline-variant)",
          }}
        >
          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigate(`/product/${p.id}`);
                onClose();
                setQuery("");
              }}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors border-b last:border-none"
              style={{ borderColor: "var(--color-outline-variant)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-surface-container-low)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <div
                className="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center p-1 flex-shrink-0"
                style={{
                  backgroundColor: "var(--color-surface-container-low)",
                }}
              >
                <img
                  src={p.thumbnail}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="text-sm font-black truncate"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {p.title}
                </h4>
                <span
                  className="text-xs font-black"
                  style={{ color: "var(--color-primary)" }}
                >
                  ${p.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────── */
export default function Navbar() {
  const { totalCount, totalPrice } = useCart();
  const { wishlist } = useWishlist();
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Profile", path: "/profile" },
  ];

  const iconBtnStyle = {
    color: "var(--color-on-surface)",
    padding: "8px",
    borderRadius: "50%",
    transition: "background 0.2s",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <AnnouncementBar />
      <nav
        className={`sticky top-0 z-[1100] transition-all duration-300 border-b ${scrolled ? "backdrop-blur-xl shadow-lg py-2" : "py-4"}`}
        style={{
          backgroundColor: scrolled
            ? dark
              ? "rgba(15,22,41,0.93)"
              : "rgba(250,248,255,0.93)"
            : "var(--color-surface)",
          borderColor: "var(--color-outline-variant)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {searchOpen ? (
              <LiveSearch onClose={() => setSearchOpen(false)} />
            ) : (
              <>
                {/* Logo */}
                <NavLink
                  to="/"
                  className="text-2xl font-black tracking-widest font-serif"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  NOSEJ
                </NavLink>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className="text-[11px] font-black uppercase tracking-widest transition-all pb-1 border-b-2"
                      style={({ isActive }) => ({
                        color: isActive
                          ? "var(--color-on-surface)"
                          : "var(--color-on-surface-variant)",
                        borderColor: isActive
                          ? "var(--color-primary)"
                          : "transparent",
                      })}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-1 md:gap-2">
                  <Tooltip title="Search">
                    <button
                      style={iconBtnStyle}
                      onClick={() => setSearchOpen(true)}
                    >
                      <SearchIcon sx={{ fontSize: 22 }} />
                    </button>
                  </Tooltip>

                  <Tooltip title="Wishlist">
                    <NavLink to="/wishlist" style={iconBtnStyle}>
                      <Badge
                        badgeContent={wishlist.length}
                        color="primary"
                        sx={{ "& .MuiBadge-badge": { bgcolor: "#2a14b4" } }}
                      >
                        <FavoriteIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </NavLink>
                  </Tooltip>

                  <Tooltip title="Cart">
                    <NavLink to="/cart" style={iconBtnStyle}>
                      <Badge
                        badgeContent={totalCount}
                        color="primary"
                        sx={{ "& .MuiBadge-badge": { bgcolor: "#2a14b4" } }}
                      >
                        <CartIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </NavLink>
                  </Tooltip>

                  <div className="hidden lg:block px-2">
                    <span
                      className="text-xs font-black"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      mx: 1,
                      height: 24,
                      alignSelf: "center",
                      borderColor: "var(--color-outline-variant)",
                      display: { xs: "none", sm: "block" },
                    }}
                  />

                  {/* Theme Toggle */}
                  <Tooltip title={dark ? "Light Mode" : "Dark Mode"}>
                    <button style={iconBtnStyle} onClick={toggle}>
                      {dark ? (
                        <LightModeIcon sx={{ fontSize: 22 }} />
                      ) : (
                        <DarkModeIcon sx={{ fontSize: 22 }} />
                      )}
                    </button>
                  </Tooltip>

                  {user ? (
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-black hidden sm:block"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {user.name}
                      </span>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="text-[10px] font-black tracking-widest hover:underline cursor-pointer"
                        style={{ color: "var(--color-primary)" }}
                      >
                        LOGOUT
                      </button>
                    </div>
                  ) : (
                    <Tooltip title="Login">
                      <NavLink to="/login" style={iconBtnStyle}>
                        <UserIcon sx={{ fontSize: 22 }} />
                      </NavLink>
                    </Tooltip>
                  )}

                  <button
                    className="md:hidden"
                    style={iconBtnStyle}
                    onClick={() => setMobileOpen(true)}
                  >
                    <MenuIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "var(--color-surface)",
            color: "var(--color-on-surface)",
          },
        }}
      >
        <div className="w-72 p-8">
          <div className="flex justify-between items-center mb-10">
            <h2
              className="text-2xl font-black font-serif tracking-widest"
              style={{ color: "var(--color-on-surface)" }}
            >
              NOSEJ
            </h2>
            <button
              style={{ ...iconBtnStyle, padding: "6px" }}
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <List className="flex flex-col gap-2">
            {[
              ...navLinks,
              { label: "Cart", path: "/cart" },
              { label: "Login", path: "/login" },
            ].map((l) => (
              <ListItem
                key={l.path}
                component={NavLink}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "var(--color-surface-container-low)",
                  },
                }}
              >
                <ListItemText
                  primary={l.label}
                  primaryTypographyProps={{
                    style: {
                      color: "var(--color-on-surface)",
                      fontWeight: 900,
                      fontSize: "0.75rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
````

## File: src/components/ProductCard.jsx
````javascript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating, IconButton, Button } from '@mui/material'
import {
  FavoriteBorder as FavoriteIcon, Favorite as FavoriteFilledIcon,
  ShoppingBagOutlined as CartIcon, Search as SearchIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

const FALLBACK = 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product, 1)
    toast(`"${product.title.slice(0, 22)}…" added to cart`, 'success')
  }
  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
    toast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist', 'info')
  }

  const isNew  = product.id % 3 === 0
  const isSale = product.discountPercentage > 10
  const isNosej = product.category === 'nosej'

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl card-entry border"
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
        borderColor: 'var(--color-outline-variant)',
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="relative pt-[120%] overflow-hidden rounded-t-2xl" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1 z-10">
          {isNosej && (
            <span className="bg-[#2a14b4] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              NOSEJ
            </span>
          )}
          {isNew && !isNosej && (
            <span className="bg-[#131b2e] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              SALE
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className={`absolute top-2.5 right-2.5 flex flex-col gap-2 z-10 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          <IconButton
            size="small"
            onClick={handleWishlist}
            sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#131b2e', color: 'white' } }}
          >
            {isInWishlist(product.id) ? <FavoriteFilledIcon fontSize="small" className="text-red-500" /> : <FavoriteIcon fontSize="small" />}
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
            sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#131b2e', color: 'white' } }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Product Image */}
        <img
          src={imgError ? FALLBACK : product.thumbnail}
          alt={product.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className={`absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 ${hover ? 'scale-110' : 'scale-100'}`}
        />

        {/* Add to Cart Slide-up */}
        <div className={`absolute bottom-0 left-0 w-full transition-transform duration-300 z-10 ${hover ? 'translate-y-0' : 'translate-y-full'}`}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAdd}
            startIcon={<CartIcon />}
            className="rounded-none py-3 text-[11px] font-extrabold tracking-widest"
            sx={{ borderRadius: 0, bgcolor: '#131b2e', '&:hover': { bgcolor: 'black' } }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50" style={{ color: 'var(--color-on-surface)' }}>
          {product.category}
        </p>
        <h3 className="font-extrabold uppercase tracking-tight mb-2 text-sm line-clamp-1 transition-colors" style={{ color: 'var(--color-on-surface)' }}>
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <Rating value={product.rating ?? 4} readOnly size="small" precision={0.1} sx={{ color: '#FBBF24', fontSize: '0.9rem' }} />
          <span className="font-semibold text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            ({product.stock})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-black text-lg" style={{ color: 'var(--color-on-surface)' }}>
            ${product.price.toFixed(2)}
          </span>
          {isSale && (
            <span className="line-through font-semibold text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
````

## File: src/components/ProtectedRoute.jsx
````javascript
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
````

## File: src/components/QuantityControl.jsx
````javascript
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

export default function QuantityControl({ value, onChange, min = 1, size = 'md' }) {
  const handleInput = (e) => {
    const parsed = parseInt(e.target.value, 10)
    if (!isNaN(parsed)) onChange(Math.max(min, parsed))
  }

  const handleBlur = (e) => {
    if (!e.target.value || parseInt(e.target.value, 10) < min) onChange(min)
  }

  const isSmall = size === 'sm'

  return (
    <div className={`inline-flex items-center bg-gray-50 rounded-xl border border-gray-100 transition-all hover:border-[#131b2e] hover:bg-white ${isSmall ? 'px-1 py-0.5' : 'px-2 py-1'}`}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`p-1 text-gray-900 hover:text-[#131b2e] transition-colors ${isSmall ? 'p-1' : 'p-2'}`}
      >
        <RemoveIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </button>

      <input
        type="text"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        className={`bg-transparent text-center font-black outline-none ${isSmall ? 'text-xs w-6' : 'text-sm w-8'}`}
        aria-label="quantity"
      />

      <button
        onClick={() => onChange(value + 1)}
        className={`p-1 text-gray-900 hover:text-[#131b2e] transition-colors ${isSmall ? 'p-1' : 'p-2'}`}
      >
        <AddIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </button>
    </div>
  )
}
````

## File: src/components/ScrollToTop.jsx
````javascript
import { useState, useEffect } from 'react'
import { Fab, Zoom, Tooltip } from '@mui/material'
import { KeyboardArrowUp as UpIcon } from '@mui/icons-material'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to Top" placement="left">
        <Fab onClick={scrollUp} size="medium" color="primary"
          sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, boxShadow: '0 4px 20px rgba(42,20,180,0.3)' }}>
          <UpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  )
}
````

## File: src/components/StreetMap.jsx
````javascript
// src/components/StreetMap.jsx
// Street-routing map using Leaflet + OSRM (free, no API key needed)

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

// Fix default Leaflet marker icons (Vite asset-pipeline issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const STORE_COORDS = [30.0444, 31.2357] // Nosej HQ — Central Cairo
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving'

// Custom store icon
const storeIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      background:#131b2e;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
    ">
      <span style="transform:rotate(45deg);font-size:16px;line-height:1;">🏪</span>
    </div>`,
  iconSize:   [36, 36],
  iconAnchor: [18, 36],
  popupAnchor:[0, -40],
})

// Custom user icon
const userIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:20px;height:20px;border-radius:50%;
      background:#2a14b4;border:3px solid white;
      box-shadow:0 2px 8px rgba(42,20,180,0.5);
    "></div>`,
  iconSize:   [20, 20],
  iconAnchor: [10, 10],
  popupAnchor:[0, -14],
})

/**
 * Fetch a road-based route from OSRM and return an array of LatLng coordinates.
 */
async function fetchRoute(from, to) {
  const url = `${OSRM_URL}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
  const res  = await fetch(url)
  if (!res.ok) throw new Error('OSRM request failed')
  const data = await res.json()
  if (data.code !== 'Ok' || !data.routes?.length) throw new Error('No route found')

  // GeoJSON coords are [lng, lat] — Leaflet wants [lat, lng]
  return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
}

export default function StreetMap({ productTitle }) {
  const mapRef     = useRef(null)
  const mapInst    = useRef(null)
  const routeLayer = useRef(null)

  const [status, setStatus]     = useState('idle') // idle | loading | success | error | denied
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const [userCoords, setUserCoords] = useState(null)

  // Initialise map once
  useEffect(() => {
    if (mapInst.current) return

    mapInst.current = L.map(mapRef.current, {
      center: STORE_COORDS,
      zoom:   13,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInst.current)

    // Store marker
    L.marker(STORE_COORDS, { icon: storeIcon })
      .addTo(mapInst.current)
      .bindPopup(`
        <div style="font-family:Inter,sans-serif;min-width:140px;">
          <strong style="font-size:13px;">Nosej Store</strong><br/>
          <span style="font-size:11px;color:#666;">Central Cairo</span>
        </div>`)
      .openPopup()

    return () => {
      mapInst.current?.remove()
      mapInst.current = null
    }
  }, [])

  const drawRoute = async (lat, lng) => {
    setStatus('loading')
    setUserCoords([lat, lng])

    try {
      // Fetch road-based route from OSRM
      const routeCoords = await fetchRoute([lat, lng], STORE_COORDS)

      // Remove previous route layer
      if (routeLayer.current) {
        mapInst.current.removeLayer(routeLayer.current)
      }

      // Draw the road route polyline
      routeLayer.current = L.polyline(routeCoords, {
        color:     '#2a14b4',
        weight:    5,
        opacity:   0.85,
        lineJoin:  'round',
        lineCap:   'round',
      }).addTo(mapInst.current)

      // Add user location marker
      L.marker([lat, lng], { icon: userIcon })
        .addTo(mapInst.current)
        .bindPopup('<span style="font-size:12px;font-family:Inter,sans-serif;">Your Location</span>')

      // Fit bounds to show full route
      mapInst.current.fitBounds(routeLayer.current.getBounds(), { padding: [40, 40] })

      // Calculate distance & ETA from OSRM response (re-fetch to get summary)
      const summaryUrl = `${OSRM_URL}/${lng},${lat};${STORE_COORDS[1]},${STORE_COORDS[0]}?overview=false`
      const summRes    = await fetch(summaryUrl)
      if (summRes.ok) {
        const summData = await summRes.json()
        if (summData.routes?.[0]) {
          const dist = summData.routes[0].distance // metres
          const dur  = summData.routes[0].duration // seconds
          setDistance((dist / 1000).toFixed(1))
          setDuration(Math.ceil(dur / 60))
        }
      }

      setStatus('success')
    } catch (err) {
      console.error('Routing error:', err)
      // Fallback: draw straight-line
      if (routeLayer.current) mapInst.current.removeLayer(routeLayer.current)
      routeLayer.current = L.polyline([[lat, lng], STORE_COORDS], {
        color: '#2a14b4', weight: 4, opacity: 0.6, dashArray: '8,6',
      }).addTo(mapInst.current)
      mapInst.current.fitBounds(routeLayer.current.getBounds(), { padding: [40, 40] })
      setStatus('error')
    }
  }

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setStatus('denied')
      return
    }
    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => drawRoute(pos.coords.latitude, pos.coords.longitude),
      ()    => setStatus('denied'),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden border border-gray-100"
        style={{ height: 340 }}
      />

      {/* Controls */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleLocate}
          disabled={status === 'loading'}
          className={`
            flex items-center justify-center gap-2 w-full py-3 rounded-xl
            font-black text-xs tracking-widest uppercase transition-all
            ${status === 'loading'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#131b2e] text-white hover:bg-black active:scale-[0.98]'}
          `}
        >
          {status === 'loading' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Calculating Route…
            </>
          ) : (
            <>
              📍 Get Directions to Store
            </>
          )}
        </button>

        {/* Route summary */}
        {status === 'success' && distance && (
          <div className="flex gap-3">
            <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-3 text-center">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Distance</p>
              <p className="text-xl font-black text-green-700">{distance} km</p>
            </div>
            <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Drive Time</p>
              <p className="text-xl font-black text-blue-700">{duration} min</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <p className="text-[11px] text-amber-600 font-bold text-center bg-amber-50 rounded-xl px-3 py-2 border border-amber-100">
            ⚠️ Showing approximate route — street data unavailable
          </p>
        )}

        {status === 'denied' && (
          <p className="text-[11px] text-red-500 font-bold text-center bg-red-50 rounded-xl px-3 py-2 border border-red-100">
            Location access denied. Please enable location in your browser.
          </p>
        )}

        <p className="text-[10px] text-gray-400 font-bold text-center">
          🏪 Nosej Store — Central Cairo, Egypt
        </p>
      </div>
    </div>
  )
}
````

## File: src/context/AuthContext.jsx
````javascript
import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopwave-user") || "null");
    } catch {
      return null;
    }
  });

  // Accepts either a string email OR a user object {email, name}
  const login = useCallback((emailOrUser, _password) => {
    let newUser;
    if (typeof emailOrUser === "string") {
      newUser = { email: emailOrUser, name: emailOrUser.split("@")[0] };
    } else {
      newUser = {
        email: emailOrUser.email,
        name: emailOrUser.name || emailOrUser.email.split("@")[0],
      };
    }
    setUser(newUser);
    try {
      localStorage.setItem("shopwave-user", JSON.stringify(newUser));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem("shopwave-user");
    } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
````

## File: src/context/CartContext.jsx
````javascript
// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopwave-cart') || '[]')
    } catch {
      return []
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('shopwave-cart', JSON.stringify(items))
    } catch {}
  }, [items])

  /** Total number of individual units in the cart */
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)

  /** Total monetary value before tax/shipping */
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  /** Add a product (or increase its qty if already present) */
  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { product, qty }]
    })
  }, [])

  /** Remove a product completely */
  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }, [])

  /** Set exact qty for a product — removes if qty <= 0 */
  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, qty } : i))
    )
  }, [removeItem])

  /** Wipe the entire cart */
  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider
      value={{ items, totalCount, totalPrice, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

/** Hook — must be used inside <CartProvider> */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
````

## File: src/context/ThemeContext.jsx
````javascript
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { getAppTheme } from '../theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('shopwave-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    // Apply data-theme attribute to html element — drives CSS vars in global.css
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.remove('dark')
    }
    // Persist preference
    try {
      localStorage.setItem('shopwave-theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  // Re-create MUI theme whenever mode changes
  const muiTheme = useMemo(() => getAppTheme(dark ? 'dark' : 'light'), [dark])

  const toggle = () => setDark((d) => !d)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <MUIThemeProvider theme={muiTheme}>
        {/* CssBaseline applies MUI palette.background.default to <body> */}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
````

## File: src/context/ToastContext.jsx
````javascript
import { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert, Slide } from '@mui/material'

const ToastContext = createContext(null)

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

export function ToastProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)

  const toast = useCallback((message, severity = 'info') => {
    setQueue(q => [...q, { message, severity, key: Date.now() }])
    setOpen(true)
    setCurrent({ message, severity, key: Date.now() })
  }, [])

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
        sx={{ mt: 9 }}
      >
        <Alert
          onClose={handleClose}
          severity={current?.severity || 'info'}
          variant="filled"
          sx={{
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            minWidth: 280,
            boxShadow: '0 8px 32px rgba(19,27,46,0.18)',
          }}
        >
          {current?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
````

## File: src/context/WishlistContext.jsx
````javascript
import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('stitch_wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('stitch_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const removeItem = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const clearWishlist = () => setWishlist([])

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, removeItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}
````

## File: src/hooks/useFetchProduct.js
````javascript
import { useState, useEffect } from 'react'
import { fetchProduct } from '../services/api'

export default function useFetchProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [tick, setTick]       = useState(0)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProduct(id)
      .then(data => {
        if (!cancelled) {
          setProduct(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [id, tick])

  const refetch = () => setTick(t => t + 1)
  return { product, loading, error, refetch }
}

export { useFetchProduct }
````

## File: src/hooks/useFetchProducts.js
````javascript
import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'

export default function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [tick, setTick]         = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [tick])

  const refetch = () => setTick(t => t + 1)
  return { products, loading, error, refetch }
}

export { useFetchProducts }
````

## File: src/pages/Cart.jsx
````javascript
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Button, Divider, Chip } from "@mui/material";
import {
  Close as CloseIcon,
  ShoppingBagOutlined as ShoppingIcon,
  ArrowBack as ArrowBackIcon,
  Lock as LockIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import QuantityControl from "../components/QuantityControl";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

function CartItemRow({ product, qty }) {
  const { removeItem, updateQty } = useCart();
  const isSale = product.discountPercentage > 10;
  return (
    <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-gray-100 last:border-none items-start sm:items-center">
      <div className="w-24 h-28 bg-gray-50 rounded-2xl border border-gray-100 flex-shrink-0 flex items-center justify-center p-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-black text-sm text-gray-900 leading-snug line-clamp-2">
            {product.title}
          </h3>
          <button
            onClick={() => removeItem(product.id)}
            className="p-1 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">
          {product.category}
        </span>
        <div className="flex items-center justify-between gap-4">
          <QuantityControl
            value={qty}
            onChange={(v) => updateQty(product.id, v)}
            size="sm"
          />
          <div className="text-right">
            <span className="block font-black text-lg text-gray-900">
              ${(product.price * qty).toFixed(2)}
            </span>
            {isSale && (
              <span className="text-[10px] font-bold text-gray-400 line-through">
                $
                {(
                  (product.price / (1 - product.discountPercentage / 100)) *
                  qty
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, clearCart, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">
              Shopping Cart
            </h1>
            <Breadcrumbs />
          </div>
        </div>
        <div className="min-h-[55vh] flex flex-col items-center justify-center text-center px-4">
          <ShoppingIcon className="text-gray-100 text-9xl mb-8" />
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 max-w-sm mb-10">
            There are no pieces in your archive yet. Discover our curated
            collection.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-12 py-4 text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all"
          >
            GO TO SHOP
          </button>
        </div>
        <Footer />
      </div>
    );

  const shipping = totalPrice >= 150 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">
            Shopping Cart
          </h1>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900">
                {totalCount} {totalCount === 1 ? "Item" : "Items"}
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-red-600 transition-colors tracking-widest"
              >
                <RefreshIcon sx={{ fontSize: 14 }} /> CLEAR CART
              </button>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              {items.map(({ product, qty }) => (
                <CartItemRow key={product.id} product={product} qty={qty} />
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-[#131b2e] transition-colors tracking-widest"
              >
                <ArrowBackIcon sx={{ fontSize: 16 }} /> CONTINUE SHOPPING
              </button>
            </div>
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-gray-50 rounded-[32px] border border-gray-100 p-10 shadow-sm">
                <h2 className="text-2xl font-black text-gray-900 mb-8">
                  Order Summary
                </h2>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="mb-8 p-6 bg-white rounded-2xl border border-dashed border-[#131b2e]/30">
                    <p className="text-[10px] font-black  mb-3 tracking-wider">
                      🚚 Add ${(150 - totalPrice).toFixed(2)} more for FREE
                      shipping
                    </p>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#131b2e] transition-all duration-500"
                        style={{
                          width: `${Math.min((totalPrice / 150) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-5 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold">
                      Subtotal ({totalCount} items)
                    </span>
                    <span className="text-gray-900 font-black">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold">
                      Estimated Tax
                    </span>
                    <span className="text-gray-900 font-black">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold">Shipping</span>
                    <span
                      className={`font-black ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}
                    >
                      {shipping === 0 ? "✓ FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <hr className="border-dashed border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-black ">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4  text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all mb-4"
                >
                  PROCEED TO CHECKOUT
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full py-4 border-2 border-gray-200 text-gray-900 font-black text-sm tracking-widest rounded-xl hover:border-[#131b2e] transition-all"
                >
                  CONTINUE SHOPPING
                </button>

                <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
                  <LockIcon sx={{ fontSize: 14 }} />
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    Secured with SSL encryption
                  </span>
                </div>

                {/* Payment Icons */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["VISA", "MC", "PayPal", "Apple Pay"].map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 border border-gray-200 rounded-md text-[9px] font-black text-gray-400"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
````

## File: src/pages/Checkout.jsx
````javascript
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  Avatar,
} from "@mui/material";
import {
  ChevronRight as ChevronIcon,
  LocalShippingOutlined as ShippingIcon,
  VerifiedUserOutlined as SecureIcon,
  CreditCardOutlined as CardIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order placement
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast(
        "Order placed successfully! Thank you for choosing NOSEJ.",
        "success",
      );
      navigate("/");
    }, 2000);
  };

  const shipping = totalPrice >= 150 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="bg-white pb-24">
      {/* Header with Breadcrumbs */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">
            Checkout
          </h1>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-[10px] font-black text-gray-400 hover:text-[#131b2e] transition-colors uppercase tracking-widest"
            >
              HOME
            </Link>
            <ChevronIcon className="text-gray-300" sx={{ fontSize: 14 }} />
            <Link
              to="/cart"
              className="text-[10px] font-black text-gray-400 hover:text-[#131b2e] transition-colors uppercase tracking-widest"
            >
              CART
            </Link>
            <ChevronIcon className="text-gray-300" sx={{ fontSize: 14 }} />
            <span className="text-[10px] font-black text-[#131b2e] uppercase tracking-widest">
              CHECKOUT
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-16">
                {/* Billing Details */}
                <div>
                  <h2 className="text-3xl font-black mb-8 text-gray-900">
                    Billing Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                    <div className="md:col-span-2">
                      <TextField
                        fullWidth
                        label="Street Address"
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </div>
                    <TextField
                      fullWidth
                      label="Town / City"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Postcode / ZIP"
                      required
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="text-3xl font-black mb-8 text-gray-900">
                    Payment Information
                  </h2>
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <FormControl component="fieldset" className="w-full">
                      <RadioGroup defaultValue="credit_card">
                        <div className="flex flex-col gap-6">
                          <div className="p-6 bg-white border-2 border-[#131b2e] rounded-2xl shadow-sm">
                            <FormControlLabel
                              value="credit_card"
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#131b2e",
                                    "&.Mui-checked": { color: "#131b2e" },
                                  }}
                                />
                              }
                              label={
                                <div className="flex items-center gap-3">
                                  <CardIcon className="text-[#131b2e]" />
                                  <span className="text-sm font-black text-gray-900">
                                    Credit / Debit Card
                                  </span>
                                </div>
                              }
                            />
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <TextField
                                  fullWidth
                                  label="Card Number"
                                  required
                                  name="cardNumber"
                                  value={formData.cardNumber}
                                  onChange={handleInputChange}
                                  placeholder="0000 0000 0000 0000"
                                  variant="outlined"
                                  size="small"
                                />
                              </div>
                              <TextField
                                fullWidth
                                label="Expiry Date"
                                required
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                variant="outlined"
                                size="small"
                              />
                              <TextField
                                fullWidth
                                label="CVV"
                                required
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                variant="outlined"
                                size="small"
                              />
                            </div>
                          </div>

                          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                            <FormControlLabel
                              value="paypal"
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#131b2e",
                                    "&.Mui-checked": { color: "#131b2e" },
                                  }}
                                />
                              }
                              label={
                                <span className="text-sm font-black text-gray-900">
                                  PayPal
                                </span>
                              }
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      size="small"
                      sx={{
                        color: "#131b2e",
                        "&.Mui-checked": { color: "#131b2e" },
                      }}
                    />
                  }
                  label={
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Create an account and save my billing information for
                      future purchases.
                    </span>
                  }
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#131b2e] text-white p-10 rounded-[40px] shadow-2xl sticky top-32">
                <h2 className="text-2xl font-black mb-8">Your Order</h2>

                <div className="flex flex-col gap-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-white rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                          <img
                            src={product.thumbnail}
                            alt=""
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[10px] font-black uppercase tracking-wider truncate w-32">
                            {product.title}
                          </h4>
                          <p className="text-[10px] font-bold opacity-50">
                            Qty: {qty}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-black">
                        ${(product.price * qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-white/10 mb-8" />

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Subtotal</span>
                    <span className="font-black">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Shipping</span>
                    <span className="font-black">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Est. Tax (8%)</span>
                    <span className="font-black">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-white/20 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black">Total</span>
                    <span className="text-3xl font-black text-white">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-white text-[#131b2e] font-black text-sm tracking-widest rounded-xl hover:bg-gray-100 transition-all mb-8 disabled:opacity-50"
                >
                  {isProcessing ? "PROCESSING..." : "COMPLETE PURCHASE"}
                </button>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 opacity-50">
                    <SecureIcon sx={{ fontSize: 18 }} />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      Secure encrypted payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <ShippingIcon sx={{ fontSize: 18 }} />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      Global delivery 5-7 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
````

## File: src/pages/Home.jsx
````javascript
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
  Rating,
  TextField,
  InputAdornment,
} from "@mui/material";
import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  ArrowForward as ArrowIcon,
  ArrowBackIos as PrevIcon,
  ArrowForwardIos as NextIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

/* ── Hero Carousel ── */
const SLIDES = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    label: `SPRING / SUMMER ${new Date().getFullYear()}`,
    title: "The New\nCollection",
    sub: "Timeless essentials reimagined for the modern wardrobe.",
    cta: "SHOP COLLECTION",
    ctaPath: "/shop",
    accent: "#2a14b4",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    label: "EXCLUSIVE DROPS",
    title: "The Digital\nGallery",
    sub: "Where innovation meets timeless craftsmanship.",
    cta: "DISCOVER MORE",
    ctaPath: "/shop",
    accent: "#c8442a",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1200",
    label: "LIMITED EDITION",
    title: "Curated\nFor You",
    sub: "Premium pieces selected by our style editors.",
    cta: "EXPLORE NOW",
    ctaPath: "/shop",
    accent: "#0d6e5b",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const s = SLIDES[current];

  return (
    <div className="relative h-[75vh] md:h-[92vh] overflow-hidden ">
      {/* Background */}
      {SLIDES.map((sl, i) => (
        <div
          key={sl.id}
          className={`cursor-pointer absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img src={sl.bg} alt="" className="w-full h-full object-cover" />
          <div className="cursor-pointer absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className=" relative z-20 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-xl">
          <span
            className="block text-[11px] font-black tracking-[0.3em] mb-4 uppercase"
            style={{ color: s.accent }}
          >
            {s.label}
          </span>
          <h1 className="text-white font-black text-5xl md:text-8xl leading-[1.1] mb-6 whitespace-pre-line drop-shadow-2xl">
            {s.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
            {s.sub}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(s.ctaPath)}
              className="cursor-pointer px-8 py-4 bg-white  font-black text-sm tracking-widest rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              {s.cta} <ArrowIcon fontSize="small" />
            </button>
            <button className="cursor-pointer px-8 py-4 border-2 border-white/60 text-white font-black text-sm tracking-widest rounded-xl hover:bg-white/10 transition-all">
              VIEW LOOKBOOK
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all hidden md:block"
      >
        <PrevIcon />
      </button>
      <button
        onClick={next}
        className="cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all hidden md:block"
      >
        <NextIcon />
      </button>

      {/* Dots */}
      <div className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`cursor-pointer h-2 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Brand Story ── */
function BrandStory() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000"
                alt="Brand Story"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="absolute -bottom-8 -right-8 text-white p-8 rounded-3xl max-w-[220px] shadow-2xl hidden md:block transform transition-transform duration-500 hover:-translate-y-2">
              <h3 className="text-4xl font-black mb-1">12+</h3>
              <p className="text-[10px] font-black opacity-80 tracking-[0.2em] uppercase leading-tight">
                YEARS OF UNCOMPROMISED CRAFTSMANSHIP
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="font-black text-[11px] tracking-[0.3em] mb-4 uppercase">
              OUR STORY
            </span>
            <h2 className="text-5xl font-black mb-8 leading-[1.1] font-serif text-gray-900">
              Crafted with Passion, <br />
              Worn with Pride
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              NOSEJ was born from a simple belief: that quality and style should
              never be mutually exclusive. Founded in 2013, we set out to bridge
              the gap between luxury craftsmanship and everyday accessibility.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Every piece in our collection is meticulously designed and sourced
              from ethical artisans across the globe. We don't just sell
              clothes; we curate experiences that empower you to express your
              unique identity.
            </p>
            <button className="px-10 py-4 border-2   font-black text-sm tracking-widest rounded-xl hover:bg-[#07122b] hover:text-white transition-all duration-300 uppercase">
              LEARN MORE ABOUT US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const REVIEWS = [
  {
    id: 1,
    name: "Raafat Kamel",
    role: "GIS Developer",
    text: "The attention to detail in every piece is remarkable. NOSEJ has truly redefined modern luxury for me.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sadas",
  },
  {
    id: 2,
    name: "Fadwa Mahmoud",
    role: "Full Stack Developer",
    text: "Minimalism at its finest. Their collection perfectly balances form and function without compromising on style.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: 3,
    name: "Bassem Hosni",
    role: "Military Officer",
    text: "I've been a loyal customer for years. The quality of the fabrics and the timeless designs are unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=elenaas",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className=" font-black text-[11px] tracking-[0.3em] mb-4 uppercase">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-black font-serif text-gray-900">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <QuoteIcon className="text-gray-100 text-6xl mb-6  transition-colors" />
              <p className="text-gray-600 text-lg italic mb-8 leading-relaxed">
                "{r.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-black text-sm text-gray-900">{r.name}</h4>
                  <p className="text-xs text-gray-400 font-bold">{r.role}</p>
                </div>
                <Rating
                  value={r.rating}
                  readOnly
                  size="small"
                  sx={{ color: "#FBBF24" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Partner Brands ── */
const BRANDS = [
  "ZARA",
  "H&M",
  "NIKE",
  "ADIDAS",
  "GUCCI",
  "PRADA",
  "VERSACE",
  "DIOR",
  "CHANEL",
  "HERMES",
  "BALENCIAGA",
  "OFF-WHITE",
];

function PartnerBrands() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">
          PARTNER BRANDS
        </span>
      </div>
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="mx-12 text-xl font-black text-gray-200 hover:text-[#070d1c] transition-colors cursor-default tracking-widest"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = () => {
    if (!validate(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="py-24 ">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-gray-500 font-black text-[11px] tracking-[0.3em] mb-4 uppercase">
          STAY IN THE LOOP
        </span>
        <h2 className="text-4xl font-black text-gray-900   md:text-5xl mb-6 font-serif">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-500  text-lg mb-12 ">
          Get exclusive offers, early access to new collections, and style
          inspiration delivered to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-green-400">
            <CheckIcon fontSize="large" />
            <span className="text-xl text-gray-500 font-black">
              You're subscribed! Welcome to the circle. ✨
            </span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-6 py-4 rounded-xl bg-white text-gray-900 font-bold ${error ? "border-2 border-red-500" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && (
                <p className="absolute -bottom-6 left-0 text-red-400 text-[10px] font-bold">
                  {error}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="px-10 py-4 bg-white  font-black text-sm tracking-widest rounded-xl hover:bg-gray-100 transition-all"
            >
              SUBSCRIBE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Main Home ── */
export default function Home() {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();
  const featured = products?.slice(0, 8) || [];

  return (
    <main className="bg-white">
      <HeroCarousel />

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="relative h-[420px] rounded-[32px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                alt="Couture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-3xl font-black mb-2">Couture</h3>
                <Link
                  to="/shop?category=womens-clothing"
                  className="text-white/80 font-black text-[10px] tracking-widest border-b border-white/30 w-fit pb-1 hover:text-white transition-colors"
                >
                  DISCOVER →
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-10 rounded-[32px] border border-gray-100">
              <h3 className="text-xl font-black mb-2 text-gray-900">
                Accessories
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                The finishing touches for a modern wardrobe.
              </p>
              <Link
                to="/shop?category=accessories"
                className=" font-black text-xs tracking-widest border-b-2 pb-1"
              >
                SHOP NOW →
              </Link>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="relative h-full min-h-[420px] rounded-[32px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=1600"
                alt="Menswear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 to-transparent p-12 flex flex-col justify-end">
                <span className="text-white/60 font-black text-[10px] tracking-[0.3em] mb-2 uppercase">
                  NEW ARRIVALS
                </span>
                <h3 className="text-white text-5xl font-black mb-4 font-serif">
                  The Modern <br /> Gentleman
                </h3>
                <Link
                  to="/shop?category=mens-clothing"
                  className="px-8 py-4 bg-white  font-black text-xs tracking-widest rounded-xl w-fit hover:bg-gray-100 transition-all"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className=" font-black text-[11px] tracking-[0.3em] mb-4 uppercase block">
                CURATED SELECTION
              </span>
              <h2 className="text-4xl font-black font-serif text-gray-900">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop"
              className=" font-black text-xs tracking-widest border-b-2 pb-1 hidden sm:block"
            >
              VIEW ALL PRODUCTS →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <div className="aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                  ))
              : featured.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
          </div>
        </div>
      </section>

      <BrandStory />
      <Testimonials />
      <PartnerBrands />
      <Newsletter />
      <Footer />
    </main>
  );
}
````

## File: src/pages/Login.jsx
````javascript
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim())
      e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async — 1s delay then log in
    setTimeout(() => {
      login({ email: form.email, name: form.name || form.email.split("@")[0] });
      toast(
        mode === "login"
          ? `Welcome back, ${form.email.split("@")[0]}! 👋`
          : `Account created! Welcome, ${form.name || form.email.split("@")[0]}! ✨`,
        "success",
      );
      navigate(from, { replace: true });
      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setErrors({});
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-blue-50/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-indigo-50/30 blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-16 z-10">
        {/* Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-[0.2em] font-serif text-gray-900 mb-2">
            NOSEJ
          </h1>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            THE DIGITAL BOUTIQUE
          </span>
        </div>

        <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-gray-500 mb-10 font-bold">
            {mode === "login"
              ? "Sign in to access your archive and orders."
              : "Join the NOSEJ. Get early access and exclusive deals."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  FULL NAME
                </label>
                <TextField
                  fullWidth
                  placeholder="Ahmed Salah"
                  value={form.name}
                  onChange={set("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  autoComplete="name"
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                EMAIL ADDRESS
              </label>
              <TextField
                fullWidth
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={set("email")}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          fontSize: 18,
                          color: errors.email ? "#ef4444" : "#9ca3af",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  PASSWORD
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-[10px] font-black text-[#131b2e] hover:underline uppercase tracking-widest"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <TextField
                fullWidth
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{
                          fontSize: 18,
                          color: errors.password ? "#ef4444" : "#9ca3af",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPass((s) => !s)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPass ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : mode === "login" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-xs font-bold text-gray-500">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-[#131b2e] font-black hover:underline"
                >
                  {mode === "login" ? "Sign up now" : "Sign in here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/ProductDetail.jsx
````javascript
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating, Button, Skeleton, IconButton } from "@mui/material";
import {
  FavoriteBorder as WishlistIcon,
  Favorite as WishlistFilledIcon,
  ShoppingBagOutlined as CartIcon,
  ArrowBack as BackIcon,
  LocalShipping as ShipIcon,
  Refresh as ReturnIcon,
  Shield as ShieldIcon,
  AccessTime as TimeIcon,
  Place as PlaceIcon,
} from "@mui/icons-material";
import useFetchProduct from "../hooks/useFetchProduct";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import QuantityControl from "../components/QuantityControl";
import Breadcrumbs from "../components/Breadcrumbs";
import StreetMap from "../components/StreetMap";

const NOSEJ_LOCATION = [31.23583, 29.9675];

const TRUST_ITEMS = [
  {
    icon: <ShipIcon sx={{ fontSize: 18 }} />,
    label: "Free Shipping",
    sub: "On orders over $150",
  },
  {
    icon: <ReturnIcon sx={{ fontSize: 18 }} />,
    label: "Free Returns",
    sub: "30-day return policy",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 18 }} />,
    label: "Secure Payment",
    sub: "SSL encrypted checkout",
  },
];

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useFetchProduct(id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();

  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Set initial main image when product loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    } else if (product?.thumbnail) {
      setMainImage(product.thumbnail);
    }
    setBrokenImgs(new Set());
  }, [product]);

  // Delivery estimation via geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setDeliveryInfo({
        text: "Standard Delivery",
        sub: "Ships in 2-5 business days",
        color: "text-gray-500",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const R = 6371;
        const dLat = ((latitude - NOSEJ_LOCATION[0]) * Math.PI) / 180;
        const dLon = ((longitude - NOSEJ_LOCATION[1]) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((NOSEJ_LOCATION[0] * Math.PI) / 180) *
            Math.cos((latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        if (distance < 50) {
          setDeliveryInfo({
            text: "Get it by Tomorrow",
            sub: "Fast delivery in Cairo",
            color: "text-green-600",
          });
        } else {
          setDeliveryInfo({
            text: "Delivery in 2-3 Days",
            sub: "Standard shipping to your location",
            color: "text-blue-600",
          });
        }
      },
      () =>
        setDeliveryInfo({
          text: "Standard Delivery",
          sub: "Ships in 2-5 business days",
          color: "text-gray-500",
        }),
    );
  }, []);

  const handleAdd = () => {
    addItem(product, qty);
    toast(`"${product.title.slice(0, 22)}…" added to cart`, "success");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(
      isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      "info",
    );
  };

  // Resolve image src — use fallback if broken
  const imgSrc = useCallback(
    (src) => (brokenImgs.has(src) ? FALLBACK_IMG : src || FALLBACK_IMG),
    [brokenImgs],
  );

  const markBroken = useCallback((src) => {
    setBrokenImgs((prev) => new Set([...prev, src]));
  }, []);

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-red-600 font-black">Product not found</h2>
        <Button variant="contained" onClick={() => navigate("/shop")}>
          Back to Shop
        </Button>
      </div>
    );

  // All unique images for thumbnails
  const allImages = product
    ? Array.from(
        new Set([product.thumbnail, ...(product.images ?? [])]),
      ).filter(Boolean)
    : [];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="py-12"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs title={product?.title?.slice(0, 30)} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 mb-10 font-extrabold text-xs hover:opacity-70 transition-opacity uppercase tracking-widest"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <BackIcon fontSize="small" />
          BACK TO COLLECTION
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── Image Gallery ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <Skeleton
                variant="rectangular"
                className="rounded-3xl h-[560px] w-full"
              />
            ) : (
              <>
                {/* Main image */}
                <div
                  className="relative rounded-3xl overflow-hidden flex items-center justify-center min-h-[520px] p-12 border"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    borderColor: "var(--color-outline-variant)",
                  }}
                >
                  <img
                    src={imgSrc(mainImage)}
                    alt={product?.title}
                    onError={() => markBroken(mainImage)}
                    className="max-w-full max-h-[440px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                  {product?.discountPercentage > 10 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase">
                      SALE
                    </span>
                  )}
                  <IconButton
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 shadow-lg"
                    sx={{
                      bgcolor: "white",
                      "&:hover": { bgcolor: "#131b2e", color: "white" },
                    }}
                  >
                    {isInWishlist(product?.id) ? (
                      <WishlistFilledIcon className="text-red-500" />
                    ) : (
                      <WishlistIcon />
                    )}
                  </IconButton>
                </div>

                {/* ── Thumbnails ── */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((img, idx) => {
                      const isActive = mainImage === img;
                      const src = imgSrc(img);
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setMainImage(img);
                          }}
                          className={`
                            relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-1
                            transition-all duration-200 hover:border-[#131b2e] hover:scale-105
                            ${
                              isActive
                                ? "border-[#131b2e] ring-1 ring-[#131b2e] ring-offset-1"
                                : "border-transparent"
                            }
                          `}
                          style={{
                            backgroundColor:
                              "var(--color-surface-container-low)",
                          }}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <img
                            src={src}
                            alt={`${product?.title} view ${idx + 1}`}
                            onError={() => markBroken(img)}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Active overlay indicator */}
                          {isActive && (
                            <span className="absolute inset-0 bg-[#131b2e]/10 pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Street Routing Map ── */}
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "var(--color-outline-variant)" }}
                >
                  <button
                    onClick={() => setShowMap((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-4 font-black text-[11px] tracking-widest uppercase transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "var(--color-surface-container-low)",
                      color: "var(--color-on-surface)",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <PlaceIcon sx={{ fontSize: 16 }} />
                      Find in Store — Nosej Cairo
                    </span>
                    <span
                      className={`text-[10px] transition-transform duration-300 ${showMap ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                  {showMap && (
                    <div
                      className="p-4"
                      style={{ backgroundColor: "var(--color-surface)" }}
                    >
                      <StreetMap productTitle={product?.title} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ── Product Info ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton height={32} width="40%" />
                <Skeleton height={60} width="90%" />
                <Skeleton height={30} width="30%" />
                <Skeleton height={120} />
              </div>
            ) : (
              <>
                <div>
                  <span
                    className="font-black text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {product?.category}
                    {product?.brand && product.brand !== product.category && (
                      <span className="ml-2 opacity-60">· {product.brand}</span>
                    )}
                  </span>
                  <h1
                    className="text-5xl font-black leading-tight mt-2 font-serif"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {product?.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <Rating
                    value={product?.rating ?? 4.5}
                    readOnly
                    precision={0.1}
                    sx={{ color: "#FBBF24" }}
                  />
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {product?.rating} ({product?.stock} in stock)
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-4xl font-black"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      ${product?.price?.toFixed(2)}
                    </span>
                    {product?.discountPercentage > 10 && (
                      <span
                        className="text-xl line-through font-bold"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {deliveryInfo && (
                    <div className="flex items-center gap-2 mt-1">
                      <TimeIcon
                        className={deliveryInfo.color}
                        sx={{ fontSize: 16 }}
                      />
                      <div>
                        <span
                          className={`text-xs font-black uppercase tracking-wider ${deliveryInfo.color}`}
                        >
                          {deliveryInfo.text}
                        </span>
                        <p
                          className="text-[10px] font-bold"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          {deliveryInfo.sub}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <hr style={{ borderColor: "var(--color-outline-variant)" }} />

                <p
                  className="leading-relaxed text-lg"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {product?.description}
                </p>

                <div className="flex items-center gap-6">
                  <span
                    className="font-black text-xs tracking-widest"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    QTY
                  </span>
                  <QuantityControl value={qty} onChange={setQty} size="md" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CartIcon />}
                    onClick={handleAdd}
                    className="flex-1 py-4 font-black text-sm tracking-widest rounded-xl"
                    sx={{
                      bgcolor: "#131b2e",
                      "&:hover": { bgcolor: "black" },
                      borderRadius: "12px",
                    }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleWishlist}
                    startIcon={
                      isInWishlist(product?.id) ? (
                        <WishlistFilledIcon className="text-red-500" />
                      ) : (
                        <WishlistIcon />
                      )
                    }
                    sx={{
                      px: 4,
                      borderColor: "var(--color-outline-variant)",
                      color: "var(--color-on-surface)",
                      borderRadius: "12px",
                      "&:hover": { borderColor: "#131b2e" },
                    }}
                  >
                    WISHLIST
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex gap-4 flex-wrap pt-4">
                  {TRUST_ITEMS.map((t) => (
                    <div
                      key={t.label}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        borderColor: "var(--color-outline-variant)",
                      }}
                    >
                      <div style={{ color: "var(--color-on-surface)" }}>
                        {t.icon}
                      </div>
                      <div>
                        <h4
                          className="text-[10px] font-black uppercase tracking-wider"
                          style={{ color: "var(--color-on-surface)" }}
                        >
                          {t.label}
                        </h4>
                        <p
                          className="text-[9px] font-bold"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          {t.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/Profile.jsx
````javascript
import { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
import {
  CheckCircle as CheckIcon,
  LocalShipping as ShipIcon,
  Inventory as BoxIcon,
  EmojiEvents as DeliveredIcon,
  ReceiptLong as ReceiptIcon,
  Map as MapIcon,
  MyLocation as LiveIcon,
  Route as RouteIcon,
  AccessTime as EtaIcon,
  Straighten as DistIcon,
} from "@mui/icons-material";
import L from "leaflet";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

// ── Leaflet icon fix ───────────────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STORE_COORDS = [29.962696, 31.2769423]; // Nosej — Central Maadi
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

// ── Custom icons ──────────────────────────────────────────────────────────
const storeIcon = L.divIcon({
  className: "",
  html: `<div style="width:40px;height:40px;border-radius:50% 50% 50% 0;background:#131b2e;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.4);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;">
           <span style="transform:rotate(45deg);font-size:18px;line-height:1;">🏪</span>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -44],
});

const buildUserIcon = (isLive) =>
  L.divIcon({
    className: "",
    html: `<div style="position:relative;width:28px;height:28px;">
           ${isLive ? `<div style="position:absolute;inset:0;border-radius:50%;background:rgba(42,20,180,0.25);animation:ping 1.4s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ""}
           <div style="position:absolute;inset:4px;border-radius:50%;background:#2a14b4;border:3px solid white;box-shadow:0 2px 8px rgba(42,20,180,0.5);"></div>
         </div>
         <style>@keyframes ping{75%,100%{transform:scale(2);opacity:0;}}</style>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });

// ── OSRM street routing ───────────────────────────────────────────────────
async function fetchStreetRoute(from, to) {
  const url = `${OSRM_URL}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("OSRM failed");
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error("No route");
  const { distance, duration } = data.routes[0];
  const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [
    lat,
    lng,
  ]);
  return { coords, distance, duration };
}

// ── Order Tracker ─────────────────────────────────────────────────────────
const ORDER_STEPS = [
  {
    label: "Order Placed",
    icon: <ReceiptIcon />,
    desc: "Mar 20, 2025 · 09:14 AM",
  },
  { label: "Processing", icon: <BoxIcon />, desc: "Mar 20, 2025 · 02:30 PM" },
  { label: "Shipped", icon: <ShipIcon />, desc: "Mar 21, 2025 · 11:00 AM" },
  {
    label: "Delivered",
    icon: <DeliveredIcon />,
    desc: "Expected Mar 25, 2025",
  },
];

function OrderTracker({ activeStep = 2 }) {
  return (
    <div>
      <h3
        className="text-xl font-black mb-8"
        style={{ color: "var(--color-on-surface)" }}
      >
        Order #ATL-20250320
      </h3>
      <div className="relative mb-12">
        <div
          className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 rounded-full z-0"
          style={{ backgroundColor: "var(--color-outline-variant)" }}
        />
        <div
          className="absolute top-[22px] left-[12.5%] h-1 rounded-full z-10 transition-all duration-1000"
          style={{ width: `${(activeStep / (ORDER_STEPS.length - 1)) * 75}%` }}
        />
        <div className="grid grid-cols-4 relative z-20">
          {ORDER_STEPS.map((step, i) => {
            const done = i <= activeStep;
            const active = i === activeStep;
            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500
                  ${done ? "bg-[#131b2e] text-white" : "text-gray-300"} ${active ? "ring-4 ring-[#131b2e]/20" : ""}`}
                  style={{
                    backgroundColor: done
                      ? "#131b2e"
                      : "var(--color-surface-container-highest)",
                  }}
                >
                  {done ? <CheckIcon sx={{ fontSize: 20 }} /> : step.icon}
                </div>
                <div className="text-center">
                  <p
                    className={`text-[10px] font-black uppercase tracking-wider mb-1 ${done ? "" : ""}`}
                    style={{
                      color: done ? "" : "var(--color-on-surface-variant)",
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="text-[9px] font-bold hidden sm:block"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <span className="inline-block px-3 py-1  text-white text-[10px] font-black rounded-md uppercase tracking-widest">
        In Transit — On Time
      </span>
    </div>
  );
}

// ── Live GIS Tracking Map ─────────────────────────────────────────────────
function GISTrackingMap() {
  const mapRef = useRef(null);
  const mapInst = useRef(null);
  const routeLayer = useRef(null);
  const userMarker = useRef(null);
  const watchId = useRef(null);
  const storeMarker = useRef(null);

  const [status, setStatus] = useState("idle"); // idle|requesting|live|error|denied
  const [distance, setDistance] = useState(null); // km
  const [duration, setDuration] = useState(null); // min
  const [accuracy, setAccuracy] = useState(null); // metres
  const [updateTime, setUpdateTime] = useState(null);

  // Init map once
  useEffect(() => {
    if (mapInst.current) return;

    mapInst.current = L.map(mapRef.current, {
      center: STORE_COORDS,
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInst.current);

    storeMarker.current = L.marker(STORE_COORDS, { icon: storeIcon })
      .addTo(mapInst.current)
      .bindPopup(
        `<div style="font-family:Inter,sans-serif;min-width:150px;">
        <strong style="font-size:13px;">🏪 Nosej Store</strong><br/>
        <span style="font-size:11px;color:#666;">Central Maadi, Cairo</span>
      </div>`,
      )
      .openPopup();

    return () => {
      mapInst.current?.remove();
      mapInst.current = null;
    };
  }, []);

  // Stop watching on unmount
  useEffect(() => {
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  const updateRoute = useCallback(async (lat, lng, acc) => {
    setAccuracy(Math.round(acc));
    setUpdateTime(
      new Date().toLocaleTimeString("en-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );

    // Move or create user marker
    if (userMarker.current) {
      userMarker.current.setLatLng([lat, lng]);
    } else {
      userMarker.current = L.marker([lat, lng], { icon: buildUserIcon(true) })
        .addTo(mapInst.current)
        .bindPopup(
          '<span style="font-size:12px;font-family:Inter,sans-serif;font-weight:700;">📍 Your Location</span>',
        );
    }

    // Fetch & redraw street route
    try {
      const {
        coords,
        distance: d,
        duration: dur,
      } = await fetchStreetRoute([lat, lng], STORE_COORDS);

      if (routeLayer.current) mapInst.current.removeLayer(routeLayer.current);

      // Gradient-style route: draw shadow then main line
      L.polyline(coords, { color: "#ffffff", weight: 7, opacity: 0.6 }).addTo(
        mapInst.current,
      );
      routeLayer.current = L.polyline(coords, {
        color: "#2a14b4",
        weight: 5,
        opacity: 0.9,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(mapInst.current);

      // Animated dashed progress overlay
      L.polyline(coords.slice(0, Math.ceil(coords.length * 0.6)), {
        color: "",
        weight: 3,
        opacity: 0.5,
        dashArray: "8, 6",
      }).addTo(mapInst.current);

      setDistance((d / 1000).toFixed(1));
      setDuration(Math.ceil(dur / 60));

      mapInst.current.fitBounds(routeLayer.current.getBounds(), {
        padding: [50, 50],
      });
    } catch {
      // Fallback straight line
      if (routeLayer.current) mapInst.current.removeLayer(routeLayer.current);
      routeLayer.current = L.polyline([[lat, lng], STORE_COORDS], {
        color: "#2a14b4",
        weight: 4,
        opacity: 0.6,
        dashArray: "10, 8",
      }).addTo(mapInst.current);
      mapInst.current.fitBounds(routeLayer.current.getBounds(), {
        padding: [50, 50],
      });
    }
  }, []);

  const startLiveTracking = () => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }

    setStatus("requesting");

    watchId.current = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude, accuracy } }) => {
        setStatus("live");
        updateRoute(latitude, longitude, accuracy);
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 12000 },
    );
  };

  const stopTracking = () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setStatus("idle");
    setDistance(null);
    setDuration(null);
    setAccuracy(null);
    setUpdateTime(null);
    if (userMarker.current) {
      mapInst.current?.removeLayer(userMarker.current);
      userMarker.current = null;
    }
    if (routeLayer.current) {
      mapInst.current?.removeLayer(routeLayer.current);
      routeLayer.current = null;
    }
    if (mapInst.current) mapInst.current.setView(STORE_COORDS, 14);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <MapIcon sx={{ color: "var(--color-primary)" }} />
        <h3
          className="text-xl font-black"
          style={{ color: "var(--color-on-surface)" }}
        >
          Live Order Map
        </h3>
        <span
          className="px-2 py-0.5 text-[9px] font-black rounded uppercase tracking-widest border"
          style={{
            color: status === "live" ? "#16a34a" : "var(--color-primary)",
            borderColor: status === "live" ? "#16a34a" : "var(--color-primary)",
            backgroundColor: status === "live" ? "#f0fdf4" : "transparent",
          }}
        >
          {status === "live" ? "🟢 LIVE" : "GIS Feature"}
        </span>
      </div>

      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        Real-time street-routing from your location to the Nosej store in Maadi.
        Position updates automatically every 5 seconds.
      </p>

      {/* Map */}
      <div
        className="rounded-3xl overflow-hidden border-2  shadow-xl relative"
        style={{ height: 420 }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

        {/* Info overlay */}
        <div
          className="absolute bottom-4 left-4 right-4 backdrop-blur-md rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 border z-[1000]"
          style={{
            backgroundColor:
              "rgba(var(--color-surface-rgb, 250,248,255), 0.92)",
            borderColor: "var(--color-outline-variant)",
            background: "rgba(250,248,255,0.92)",
          }}
        >
          {/* Legend */}
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm " />
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Store
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2a14b4]" />
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                You
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded bg-[#2a14b4]" />
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Route
              </span>
            </div>
          </div>

          {/* Stats */}
          {status === "live" && distance && (
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                <DistIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                <span className="text-[11px] font-black text-blue-700">
                  {distance} km
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 px-3 py-1.5 rounded-xl">
                <EtaIcon sx={{ fontSize: 14, color: "#16a34a" }} />
                <span className="text-[11px] font-black text-green-700">
                  {duration} min
                </span>
              </div>
              {accuracy && (
                <div className="hidden sm:flex items-center gap-1.5 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-xl">
                  <LiveIcon sx={{ fontSize: 14, color: "#7c3aed" }} />
                  <span className="text-[11px] font-black text-purple-700">
                    ±{accuracy}m
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live pulse badge */}
        {status === "live" && (
          <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-black tracking-widest">
              LIVE TRACKING
            </span>
          </div>
        )}
      </div>

      {/* Last update */}
      {updateTime && (
        <p
          className="text-[10px] font-bold mt-2 text-right"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Last updated: {updateTime}
        </p>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3 mt-5">
        {status !== "live" ? (
          <button
            onClick={startLiveTracking}
            disabled={status === "requesting"}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {status === "requesting" ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Acquiring Location…
              </>
            ) : (
              <>
                <LiveIcon sx={{ fontSize: 16 }} />
                Start Live Tracking
              </>
            )}
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all border-2 border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Stop Tracking
          </button>
        )}

        {status === "denied" && (
          <p className="text-[11px] font-bold text-center bg-red-50 border border-red-100 text-red-500 rounded-xl px-3 py-2">
            Location access denied — please enable it in your browser settings.
          </p>
        )}

        <p
          className="text-[10px] font-bold text-center"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          🌍 Road-based routing via OSRM · Built by Ahmed Salah — GIS Analyst &
          Full-Stack Developer
        </p>
      </div>
    </div>
  );
}

// ── Mock Orders ───────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    id: "ATL-20250320",
    date: "Mar 20, 2025",
    total: 142.5,
    items: 3,
    status: "Shipped",
  },
  {
    id: "ATL-20250210",
    date: "Feb 10, 2025",
    total: 89.99,
    items: 1,
    status: "Delivered",
  },
  {
    id: "ATL-20250115",
    date: "Jan 15, 2025",
    total: 210.0,
    items: 4,
    status: "Delivered",
  },
];

// ── Profile Page ──────────────────────────────────────────────────────────
export default function Profile() {
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const { wishlist } = useWishlist();
  const [tab, setTab] = useState(0);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header band */}
      <div
        className="py-16"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-5xl font-black mb-4 font-serif"
            style={{ color: "var(--color-on-surface)" }}
          >
            My Profile
          </h1>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div
              className="rounded-[32px] border p-10 text-center"
              style={{
                backgroundColor: "var(--color-surface-container-low)",
                borderColor: "var(--color-outline-variant)",
              }}
            >
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: "",
                  mx: "auto",
                  mb: 3,
                }}
              >
                {user?.name?.[0]?.toUpperCase() || "A"}
              </Avatar>
              <h2
                className="text-xl font-black mb-1"
                style={{ color: "var(--color-on-surface)" }}
              >
                {user?.name}
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {user?.email}
              </p>

              <hr
                style={{
                  borderColor: "var(--color-outline-variant)",
                  marginBottom: "2rem",
                }}
              />

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Cart", value: totalCount },
                  { label: "Wishlist", value: wishlist.length },
                  { label: "Orders", value: MOCK_ORDERS.length },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="block text-xl font-black">{s.value}</span>
                    <span
                      className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={logout}
                className="cursor-pointer w-full py-3 border-2 border-red-100 text-red-600 font-black text-[10px] tracking-widest rounded-xl hover:bg-red-50 transition-all uppercase"
              >
                SIGN OUT
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">
            <div
              className="mb-10 border-b"
              style={{ borderColor: "var(--color-outline-variant)" }}
            >
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "var(--color-on-surface-variant)",
                    "&.Mui-selected": { color: "var(--color-on-surface)" },
                  },
                  "& .MuiTabs-indicator": { bgcolor: "#131b2e" },
                }}
              >
                <Tab label="Order History" />
                <Tab label="Track Order" />
                <Tab label="Live Map" />
              </Tabs>
            </div>

            {/* ── Tab 0: Orders ── */}
            {tab === 0 && (
              <div className="flex flex-col gap-4">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-shadow hover:shadow-md"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-outline-variant)",
                    }}
                  >
                    <div>
                      <h4
                        className="font-black mb-1"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {order.id}
                      </h4>
                      <p
                        className="text-xs font-bold"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {order.date} · {order.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span
                        className="text-xl font-black"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        ${order.total.toFixed(2)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {order.status}
                      </span>
                      <button
                        onClick={() => setTab(2)}
                        className="text-[10px] font-black hover:underline tracking-widest uppercase"
                        style={{ color: "var(--color-primary)" }}
                      >
                        TRACK
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Tab 1: Order Tracker ── */}
            {tab === 1 && (
              <div
                className="p-10 rounded-[32px] border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-outline-variant)",
                }}
              >
                <OrderTracker activeStep={2} />
              </div>
            )}

            {/* ── Tab 2: Live Map ── */}
            {tab === 2 && (
              <div
                className="p-8 rounded-[32px] border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-outline-variant)",
                }}
              >
                <GISTrackingMap />
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
````

## File: src/pages/Shop.jsx
````javascript
import { useState, useMemo, useEffect } from "react";
import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Button,
  InputAdornment,
  Rating,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  ExpandMore as ExpandIcon,
  SentimentDissatisfied as EmptyIcon,
} from "@mui/icons-material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Pagination, PaginationItem } from "@mui/material";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const SORT_OPTIONS = [
  { label: "Default Sorting", value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Best Rating", value: "rating_desc" },
  { label: "Most Reviews", value: "reviews_desc" },
  { label: "Name: A–Z", value: "name_asc" },
  { label: "Name: Z–A", value: "name_desc" },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--color-outline-variant)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-4 font-black text-[11px] tracking-widest uppercase transition-colors"
        style={{ color: "var(--color-on-surface)" }}
      >
        {title}
        <ExpandIcon
          className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          sx={{ fontSize: 18 }}
        />
      </button>
      <Collapse in={open}>
        <div className="pb-6">{children}</div>
      </Collapse>
    </div>
  );
}

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 13000]);
  const [sortBy, setSortBy] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const allCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const maxPrice = useMemo(
    () =>
      products?.length
        ? Math.ceil(Math.max(...products.map((p) => p.price)))
        : 2000,
    [products],
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    let res = products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        categories.length === 0 || categories.includes(p.category);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchRating = (p.rating ?? 0) >= minRating;
      const matchSale = !onSale || p.discountPercentage > 10;
      return matchSearch && matchCat && matchPrice && matchRating && matchSale;
    });

    res = [...res];
    if (sortBy === "price_asc") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") res.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating_desc")
      res.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    else if (sortBy === "reviews_desc")
      res.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
    else if (sortBy === "name_asc")
      res.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "name_desc")
      res.sort((a, b) => b.title.localeCompare(a.title));
    return res;
  }, [products, search, categories, priceRange, sortBy, minRating, onSale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categories, priceRange, sortBy, minRating, onSale]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const resetAll = () => {
    setSearch("");
    setCategories([]);
    setPriceRange([0, maxPrice]);
    setSortBy("default");
    setMinRating(0);
    setOnSale(false);
    setCurrentPage(1);
  };

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-red-600 font-black">
          Something went wrong
        </h2>
        <Button
          variant="contained"
          onClick={refetch}
          sx={{ bgcolor: "#131b2e" }}
        >
          Try Again
        </Button>
      </div>
    );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="py-16"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-5xl font-black mb-4 font-serif"
            style={{ color: "var(--color-on-surface)" }}
          >
            Shop Collection
          </h1>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32">
              <div className="flex justify-between items-center mb-8">
                <h3
                  className="font-black text-lg flex items-center gap-2"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  <FilterIcon fontSize="small" /> Filters
                </h3>
                {(categories.length > 0 ||
                  minRating > 0 ||
                  onSale ||
                  search) && (
                  <button
                    onClick={resetAll}
                    className="text-[10px] font-black text-red-600 hover:underline tracking-widest"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <FilterSection title="Search">
                  <div className="relative">
                    <SearchIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      sx={{ fontSize: 18 }}
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-10 py-3 rounded-xl outline-none text-sm font-bold border transition-all"
                      style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        color: "var(--color-on-surface)",
                        borderColor: "var(--color-outline-variant)",
                      }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <CloseIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        sx={{ fontSize: 18 }}
                        onClick={() => setSearch("")}
                      />
                    )}
                  </div>
                </FilterSection>

                <FilterSection title="Categories">
                  <div className="flex flex-col gap-2">
                    {loading
                      ? [...Array(4)].map((_, i) => (
                          <Skeleton key={i} height={28} width="80%" />
                        ))
                      : allCategories.map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-[#131b2e] focus:ring-[#131b2e]"
                              checked={categories.includes(cat)}
                              onChange={() =>
                                setCategories((prev) =>
                                  prev.includes(cat)
                                    ? prev.filter((c) => c !== cat)
                                    : [...prev, cat],
                                )
                              }
                            />
                            <span
                              className={`text-sm capitalize transition-colors ${categories.includes(cat) ? "font-black text-[#131b2e]" : "text-gray-500 group-hover:text-gray-900"}`}
                            >
                              {cat}
                            </span>
                          </label>
                        ))}
                  </div>
                </FilterSection>

                <FilterSection title="Price Range">
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onChange={(_, v) => setPriceRange(v)}
                      min={0}
                      max={maxPrice}
                      valueLabelDisplay="auto"
                      sx={{ color: "#131b2e" }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-black text-gray-400">
                        ${priceRange[0]}
                      </span>
                      <span className="text-[10px] font-black text-gray-400">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Minimum Rating">
                  <Rating
                    value={minRating}
                    onChange={(_, v) => setMinRating(v ?? 0)}
                    precision={1}
                    sx={{ color: "#FBBF24" }}
                  />
                  {minRating > 0 && (
                    <span className="text-[10px] font-black text-gray-400 mt-2 block">
                      {minRating}+ stars
                    </span>
                  )}
                </FilterSection>

                <FilterSection title="Availability" defaultOpen={false}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300  focus:ring-[#131b2e]"
                      checked={onSale}
                      onChange={(e) => setOnSale(e.target.checked)}
                    />
                    <span
                      className={`text-sm transition-colors ${onSale ? "font-black " : "text-gray-500 group-hover:text-gray-900"}`}
                    >
                      On Sale
                    </span>
                  </label>
                </FilterSection>
              </div>

              {/* Promo Card */}
              <div className="mt-10 bg-[#131b2e] text-white p-8 rounded-3xl shadow-xl">
                <span className="text-[10px] font-black opacity-60 block mb-2 tracking-widest uppercase">
                  EXCLUSIVE
                </span>
                <h4 className="text-xl font-black mb-4">Unlock the Archive</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Join our circle for priority access and member shipping rates.
                </p>
                <button className="w-full py-3 bg-white font-black text-xs tracking-widest rounded-xl hover:bg-gray-100 transition-all">
                  JOIN NOW
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div>
                <h2
                  className="text-3xl font-black mb-1"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  Collection
                </h2>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {paginatedProducts.length}
                  </strong>{" "}
                  of {filtered.length} pieces
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <FormControl
                  variant="outlined"
                  size="small"
                  className="min-w-[180px]"
                >
                  <InputLabel sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    Sort By
                  </InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      borderRadius: "12px",
                    }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <MenuItem
                        key={o.value}
                        value={o.value}
                        sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                      >
                        {o.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#131b2e] text-white"
                        : "bg-white text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    <GridIcon fontSize="small" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#131b2e] text-white"
                        : "bg-white text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    <ListIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* Content */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton
                      variant="rectangular"
                      height={360}
                      className="rounded-2xl"
                    />
                    <Skeleton height={24} width="60%" />
                    <Skeleton height={20} width="40%" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <EmptyIcon className="text-gray-100 text-8xl mb-6" />
                <h3
                  className="text-2xl font-black mb-2"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  No pieces found
                </h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={resetAll}
                  className="px-8 py-3 border-2 border-[#131b2e] text-[#131b2e] font-black text-xs tracking-widest rounded-xl hover:bg-[#131b2e] hover:text-white transition-all"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <>
                {/* Products */}
                <div
                  className={`grid gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center gap-4 mt-12">
                  {/* MUI Pagination */}
                  <Pagination
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                    siblingCount={1}
                    variant="outlined"
                    boundaryCount={1}
                    // disabled
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
````

## File: src/pages/Wishlist.jsx
````javascript
import { useNavigate } from 'react-router-dom'
import {
  Tooltip
} from '@mui/material'
import {
  FavoriteBorder as EmptyHeartIcon, ShoppingBagOutlined as CartIcon,
  Delete as DeleteIcon, ArrowForward as ArrowIcon
} from '@mui/icons-material'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function Wishlist() {
  const { wishlist, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  const addAllToCart = () => {
    wishlist.forEach(p => addItem(p, 1))
    toast(`${wishlist.length} items added to cart`, 'success')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">My Wishlist</h1>
              <Breadcrumbs />
            </div>
            {wishlist.length > 0 && (
              <div className="flex gap-4">
                <button 
                  onClick={clearWishlist}
                  className="px-6 py-3 border-2 border-red-100 text-red-600 font-black text-[10px] tracking-widest rounded-xl hover:bg-red-50 transition-all uppercase"
                >
                  CLEAR ALL
                </button>
                <button 
                  onClick={addAllToCart}
                  className="px-6 py-3 bg-[#131b2e] text-white font-black text-[10px] tracking-widest rounded-xl hover:bg-black transition-all uppercase flex items-center gap-2"
                >
                  <CartIcon sx={{ fontSize: 16 }} /> ADD ALL TO CART
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {wishlist.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <EmptyHeartIcon className="text-gray-100 text-9xl mb-8" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm mb-10">
              Save your favourite pieces here to find them later with ease.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="px-12 py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all flex items-center gap-2"
            >
              EXPLORE COLLECTION <ArrowIcon fontSize="small" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-sm text-gray-500 font-bold">
                <strong className="text-gray-900">{wishlist.length}</strong> {wishlist.length === 1 ? 'piece' : 'pieces'} saved
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((p, i) => (
                <div key={p.id} className="relative group">
                  <ProductCard product={p} index={i} />
                  <Tooltip title="Remove from Wishlist">
                    <button 
                      onClick={() => { removeItem(p.id); toast('Removed from wishlist', 'info') }}
                      className="absolute top-4 right-4 p-2 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl shadow-lg z-20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
````

## File: src/services/api.js
````javascript
// src/services/api.js
// Centralised API layer — DummyJSON + men's categories + Nosej custom products

const BASE_URL = "https://dummyjson.com";

// ── Nosej branded products (custom / local) ──────────────────────────────────
const NOSEJ_PRODUCTS = [
  {
    id: 9001,
    title: "Nosej Classic White Tee",
    description:
      "Signature Nosej heavyweight cotton tee. Preshrunk, double-stitched hem and a relaxed boxy silhouette for effortless everyday style.",
    price: 49.99,
    discountPercentage: 0,
    rating: 4.8,
    stock: 120,
    brand: "Nosej",
    category: "nosej",
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 9004,
    title: "Nosej Runner Sneaker",
    description:
      "Lightweight mesh runner with responsive foam sole. Breathable upper, padded collar, and the signature Nosej N-logo on the heel.",
    price: 139.99,
    discountPercentage: 15,
    rating: 4.9,
    stock: 45,
    brand: "Nosej",
    category: "nosej",
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 9005,
    title: "Nosej Cap — Classic Logo",
    description:
      "Six-panel structured cap in washed cotton twill. Embroidered Nosej wordmark on the front, adjustable strap back.",
    price: 34.99,
    discountPercentage: 0,
    rating: 4.6,
    stock: 200,
    brand: "Nosej",
    category: "nosej",
    thumbnail:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 9006,
    title: "Nosej Tech Jacket",
    description:
      "Windproof, water-resistant shell with a minimal silhouette. Packable design, interior media pocket, and tonal Nosej zippers.",
    price: 189.99,
    discountPercentage: 20,
    rating: 4.8,
    stock: 30,
    brand: "Nosej",
    category: "nosej",
    thumbnail:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

// Men's categories from DummyJSON
const MENS_CATEGORIES = ["mens-shirts", "mens-shoes", "mens-watches"];

/**
 * Fetch all products — merges DummyJSON data with Nosej custom products.
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts() {
  const [mainRes, ...mensRes] = await Promise.all([
    fetch(`${BASE_URL}/products?limit=100`),
    ...MENS_CATEGORIES.map((cat) =>
      fetch(`${BASE_URL}/products/category/${cat}?limit=30`),
    ),
  ]);

  if (!mainRes.ok)
    throw new Error(`Failed to fetch products (${mainRes.status})`);

  const mainData = await mainRes.json();
  const mensData = await Promise.all(
    mensRes.map((r) => (r.ok ? r.json() : { products: [] })),
  );

  // Merge & de-duplicate by id
  const allApiProducts = [
    ...mainData.products,
    ...mensData.flatMap((d) => d.products ?? []),
  ];
  const seen = new Set();
  const dedupedApiProducts = allApiProducts.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  return [...NOSEJ_PRODUCTS, ...dedupedApiProducts];
}

/**
 * Fetch a single product — checks Nosej first, then DummyJSON.
 * @param {number|string} id
 * @returns {Promise<Product>}
 */
export async function fetchProduct(id) {
  const numId = Number(id);
  const local = NOSEJ_PRODUCTS.find((p) => p.id === numId);
  if (local) return local;

  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id} (${res.status})`);
  return res.json();
}

/**
 * Fetch all categories — appends "nosej" and men's categories.
 * @returns {Promise<string[]>}
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  const cats = await res.json();
  const extras = ["nosej", ...MENS_CATEGORIES];
  return Array.from(new Set([...extras, ...cats]));
}
````

## File: src/styles/global.css
````css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
@import "tailwindcss";
@import "leaflet/dist/leaflet.css";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS  (light = default)
═══════════════════════════════════════════════════════════════ */
@theme {
  --font-sans:    'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;

  --color-primary:                   #2a14b4;
  --color-primary-container:         #4338ca;
  --color-on-primary:                #ffffff;
  --color-secondary:                 #515f74;

  --color-background:                #faf8ff;
  --color-surface:                   #faf8ff;
  --color-surface-container-low:     #f2f3ff;
  --color-surface-container-highest: #dae2fd;

  --color-on-surface:                #131b2e;
  --color-on-surface-variant:        #464554;
  --color-outline-variant:           #c7c4d7;

  --radius-lg: 16px;
  --radius-md: 8px;
  --animate-marquee: marquee 30s linear infinite;
}

/* ═══════════════════════════════════════════════════════════════
   DARK MODE TOKENS
═══════════════════════════════════════════════════════════════ */
[data-theme="dark"] {
  --color-background:                #0f1629;
  --color-surface:                   #1a2235;
  --color-surface-container-low:     #151f33;
  --color-surface-container-highest: #222d45;
  --color-on-surface:                #e8eaf6;
  --color-on-surface-variant:        #8892a4;
  --color-outline-variant:           #2d3a52;
}

/* ═══════════════════════════════════════════════════════════════
   BASE
═══════════════════════════════════════════════════════════════ */
html {
  transition: background-color 0.25s ease, color 0.25s ease;
}
body {
  background-color: var(--color-background);
  color: var(--color-on-surface);
  font-family: var(--font-sans);
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ═══════════════════════════════════════════════════════════════
   DARK MODE — COMPREHENSIVE TAILWIND OVERRIDES
   These map Tailwind's hard-coded color classes to CSS vars
   so every component in the app responds to dark mode WITHOUT
   needing individual rewrites.
═══════════════════════════════════════════════════════════════ */

/* Backgrounds */
[data-theme="dark"] .bg-white          { background-color: var(--color-surface) !important; }
[data-theme="dark"] .bg-gray-50        { background-color: var(--color-surface-container-low) !important; }
[data-theme="dark"] .bg-gray-100       { background-color: var(--color-surface-container-highest) !important; }
[data-theme="dark"] .bg-gray-200       { background-color: #1e2d45 !important; }
[data-theme="dark"] .hover\:bg-gray-50:hover  { background-color: var(--color-surface-container-highest) !important; }
[data-theme="dark"] .hover\:bg-gray-100:hover { background-color: var(--color-surface-container-highest) !important; }

/* Text colors */
[data-theme="dark"] .text-gray-900     { color: var(--color-on-surface) !important; }
[data-theme="dark"] .text-gray-800     { color: var(--color-on-surface) !important; }
[data-theme="dark"] .text-gray-700     { color: #c5c9d6 !important; }
[data-theme="dark"] .text-gray-600     { color: var(--color-on-surface-variant) !important; }
[data-theme="dark"] .text-gray-500     { color: var(--color-on-surface-variant) !important; }
[data-theme="dark"] .text-gray-400     { color: #6b7a93 !important; }
[data-theme="dark"] .text-gray-300     { color: #3d4f6a !important; }

/* Borders */
[data-theme="dark"] .border-gray-100   { border-color: var(--color-outline-variant) !important; }
[data-theme="dark"] .border-gray-200   { border-color: var(--color-outline-variant) !important; }
[data-theme="dark"] .border-gray-300   { border-color: #3d4f6a !important; }

/* Hover text */
[data-theme="dark"] .hover\:text-gray-900:hover  { color: var(--color-on-surface) !important; }
[data-theme="dark"] .hover\:text-\[\#131b2e\]:hover { color: #a3b3d6 !important; }

/* Navbar — sticky white bar */
[data-theme="dark"] nav.sticky,
[data-theme="dark"] nav[class*="sticky"] {
  background-color: rgba(15, 22, 41, 0.92) !important;
  border-color: var(--color-outline-variant) !important;
}
[data-theme="dark"] .bg-white\/90 {
  background-color: rgba(15, 22, 41, 0.92) !important;
}

/* Glass header */
.glass-header {
  background-color: rgba(250, 248, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
[data-theme="dark"] .glass-header {
  background-color: rgba(15, 22, 41, 0.88) !important;
}

/* Live search dropdown */
[data-theme="dark"] .z-\[1500\].bg-white {
  background-color: var(--color-surface-container-low) !important;
}

/* Footer */
[data-theme="dark"] footer.bg-gray-50  { background-color: var(--color-surface-container-low) !important; }

/* Input fields (native) */
[data-theme="dark"] input[type="text"],
[data-theme="dark"] input[type="email"],
[data-theme="dark"] input[type="search"],
[data-theme="dark"] textarea {
  background-color: var(--color-surface-container-low) !important;
  color: var(--color-on-surface) !important;
  border-color: var(--color-outline-variant) !important;
}
[data-theme="dark"] input::placeholder { color: var(--color-on-surface-variant) !important; }

/* MUI components in dark mode — fill gaps CssBaseline doesn't cover */
[data-theme="dark"] .MuiDrawer-paper  { background-color: var(--color-surface) !important; }
[data-theme="dark"] .MuiMenu-paper,
[data-theme="dark"] .MuiPopover-paper { background-color: var(--color-surface-container-low) !important; }
[data-theme="dark"] .MuiMenuItem-root { color: var(--color-on-surface) !important; }
[data-theme="dark"] .MuiMenuItem-root:hover { background-color: var(--color-surface-container-highest) !important; }
[data-theme="dark"] .MuiOutlinedInput-root { border-color: var(--color-outline-variant) !important; }
[data-theme="dark"] .MuiInputLabel-root { color: var(--color-on-surface-variant) !important; }
[data-theme="dark"] .MuiSvgIcon-root:not([style]) { color: var(--color-on-surface) !important; }

/* Payment badges in footer */
[data-theme="dark"] .border-gray-200.bg-white.rounded-lg {
  background-color: var(--color-surface-container-low) !important;
  border-color: var(--color-outline-variant) !important;
}

/* Section headers (bg-gray-50 bands) */
[data-theme="dark"] .py-12.bg-gray-50,
[data-theme="dark"] .py-16.bg-gray-50 {
  background-color: var(--color-surface-container-low) !important;
}

/* Sidebar promo card — keep dark navy in both modes */
/* (already bg-[#131b2e] so no override needed) */

/* Announcement bar — keep dark in both modes */
/* (already bg-[#131b2e] so no override needed) */

/* ═══════════════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════════════ */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in-up { animation: fadeInUp 0.5s ease forwards; }

@keyframes cardEntry {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card-entry { animation: cardEntry 0.4s ease forwards; }

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════ */
@layer utilities {
  .signature-gradient {
    background: linear-gradient(135deg, #2a14b4 0%, #4338ca 100%);
  }
  .tonal-shadow {
    box-shadow: 0 20px 40px rgba(19, 27, 46, 0.06);
  }
}

/* ═══════════════════════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════════════════════ */
.editorial-headline {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
@media (max-width: 768px) {
  .editorial-headline { font-size: 2.5rem; }
}

/* ═══════════════════════════════════════════════════════════════
   SCROLLBARS
═══════════════════════════════════════════════════════════════ */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
}
````

## File: src/theme/index.jsx
````javascript
import { createTheme } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  const colors = {
    primary: '#2a14b4',
    primaryContainer: '#4338ca',
    secondary: '#515f74',
    background: isDark ? '#0f1629' : '#faf8ff',
    surface: isDark ? '#1a2235' : '#faf8ff',
    onSurface: isDark ? '#e8eaf6' : '#131b2e',
    surfaceContainerLow: isDark ? '#151f33' : '#f2f3ff',
    surfaceContainerHighest: isDark ? '#222d45' : '#dae2fd',
    outlineVariant: isDark ? '#2d3a52' : '#c7c4d7',
    textSecondary: isDark ? '#8892a4' : '#515f74',
  }

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary, light: colors.primaryContainer },
      secondary: { main: colors.secondary },
      background: { default: colors.background, paper: colors.surface },
      text: {
        primary: colors.onSurface,
        secondary: colors.textSecondary,
      },
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
      },
      outlineVariant: colors.outlineVariant,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 16,
      h1: { fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.875rem', fontWeight: 700 },
      h4: { fontSize: '1.5rem', fontWeight: 700 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.1rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.7 },
      overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' },
      caption: { fontSize: '0.8125rem' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            padding: '10px 24px',
            borderRadius: '10px',
            transition: 'all 0.2s ease-in-out',
            fontSize: '0.9375rem',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            boxShadow: 'none',
            '&:hover': { opacity: 0.9, boxShadow: '0 4px 16px rgba(42,20,180,0.25)' },
          },
          outlined: {
            borderColor: colors.outlineVariant,
            '&:hover': { backgroundColor: colors.surfaceContainerLow, borderColor: colors.primary },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '16px',
            backgroundColor: colors.surfaceContainerLow,
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { boxShadow: 'none' } },
      },
      MuiTextField: {
        defaultProps: { variant: 'filled' },
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: '10px',
              border: `1px solid ${colors.outlineVariant}`,
              '&:before, &:after': { display: 'none' },
              '&:hover': { backgroundColor: colors.surfaceContainerHighest },
              '&.Mui-focused': {
                backgroundColor: colors.background,
                boxShadow: `0 0 0 2px ${colors.primary}40`,
                borderColor: colors.primary,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 700, borderRadius: '8px' },
        },
      },
    },
  })
}
````

## File: src/App.jsx
````javascript
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./styles/global.css";

function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-white">
      <h1 className="text-[10rem] md:text-[15rem] font-black tracking-tighter text-gray-50 leading-none">
        404
      </h1>
      <h2 className="text-4xl font-black tracking-tight text-gray-900 -mt-20">
        Page not found
      </h2>
      <p className="text-gray-500 text-center max-w-md">
        The piece you're looking for has moved or no longer exists.
      </p>
      <RouterLink
        to="/"
        className="px-10 py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all"
      >
        RETURN TO ATELIER
      </RouterLink>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <ErrorBoundary>
          <Navbar />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </AppProviders>
    </BrowserRouter>
  );
}
````

## File: src/main.jsx
````javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
````

## File: .gitignore
````
# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
````

## File: index.html
````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ATELIER | The Digital Boutique</title>
    <meta name="description" content="ATELIER — A curated collection of high-end essentials where digital innovation meets timeless craftsmanship." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "shopwave",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^6.1.1",
    "@mui/material": "^6.5.0",
    "framer-motion": "^11.0.0",
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^6.26.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^4.0.0",
    "vite": "^5.4.1"
  }
}
````

## File: README.md
````markdown
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
````

## File: vercel.json
````json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
````

## File: vite.config.js
````javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
````

## File: WALKTHROUGH.md
````markdown
# ShopWave v2 - Complete Feature Walkthrough Guide

Welcome to the comprehensive walkthrough of ShopWave v2! This guide will take you through every new feature and enhancement, step-by-step, so you can fully explore and understand the application.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- npm or yarn package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Starting the Application

1. **Navigate to the project directory**:
   ```bash
   cd /home/ubuntu/shopping-app-project
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - The app will be available at `http://localhost:5174/` (or the next available port)
   - You should see the ShopWave homepage load immediately

---

## 📍 Section 1: Homepage Exploration

### 1.1 Hero Carousel (First Thing You See)

**What to Look For:**
- A large, full-screen banner with a beautiful background image
- Text overlay with "FEATURED COLLECTION" label
- Large headline (e.g., "Summer Collection 2026")
- Subtitle text below the headline
- A prominent "SHOP NOW" call-to-action button
- Navigation arrows on the left and right sides
- Dot indicators at the bottom center (4 dots for 4 slides)

**How to Interact:**
1. **Watch the auto-rotation**: The carousel automatically changes slides every 2 seconds
2. **Click the left arrow**: Go to the previous slide manually
3. **Click the right arrow**: Go to the next slide manually
4. **Click any dot at the bottom**: Jump directly to that slide
5. **Observe the animations**: Notice the smooth fade transitions and text animations as each slide appears
6. **Click the CTA button**: The "SHOP NOW" button will navigate you to the Shop page

**What's Happening Behind the Scenes:**
- Framer Motion library creates smooth animations
- Auto-rotation uses a 2-second interval
- Each slide has unique content (title, subtitle, image, button text)
- Animations are staggered for visual appeal

---

### 1.2 Featured Categories Section

**What to Look For:**
- Three category cards below the hero carousel
- Left card: "Couture" with a fashion image
- Middle card: "Accessories" with description
- Right card: "The Modern Gentleman" with large text overlay
- Each card has a "DISCOVER" or "EXPLORE ESSENTIALS" link

**How to Interact:**
1. **Hover over the cards**: Notice the subtle hover effects
2. **Click any card**: Navigate to the Shop page (filtered by that category if implemented)
3. **Observe the images**: High-quality fashion photography

---

### 1.3 Brand Story Section

**What to Look For:**
- A centered section with "OUR STORY" label in purple
- Large heading: "The Digital Atelier"
- Descriptive paragraph about the brand
- Light background color for contrast
- Professional typography and spacing

**Content Highlights:**
- Explains the brand's mission: craftsmanship, minimalism, and modern design
- Builds trust through storytelling
- Emphasizes quality and sustainability

**How to Interact:**
1. **Read the story**: Understand the brand values
2. **Notice the animation**: The section fades in as you scroll to it
3. **Observe the typography**: Professional font hierarchy and sizing

---

### 1.4 Best Sellers Grid

**What to Look For:**
- Section titled "CURATED SELECTION" and "The Best Sellers"
- Grid of 8 product cards displayed in rows
- Each product card shows:
  - Product image
  - Product name
  - Star rating
  - Price
  - "Add to Cart" and "Add to Wishlist" buttons
- "LOAD MORE PIECES" button at the bottom

**How to Interact:**
1. **Hover over a product card**: See the hover effects and interactive buttons appear
2. **Click the product image**: Navigate to the product detail page
3. **Click "Add to Cart"**: Add the product to your shopping cart (see toast notification)
4. **Click the heart icon**: Add the product to your wishlist
5. **Observe the animations**: Products fade in smoothly as you scroll
6. **Click "LOAD MORE PIECES"**: Load additional products (if pagination is implemented)

**What's Happening:**
- Products are lazy-loaded for better performance
- Skeleton loaders appear while products are loading
- Smooth entrance animations with Framer Motion
- Toast notifications confirm your actions

---

### 1.5 Customer Testimonials Section

**What to Look For:**
- Section titled "CUSTOMER REVIEWS" and "What Our Customers Say"
- 4 testimonial cards in a responsive grid
- Each card contains:
  - 5-star rating display
  - Customer quote in quotation marks
  - Customer avatar (profile picture)
  - Customer name
  - Customer role/title
- Cards have a white background with subtle shadows

**Testimonials Included:**
1. **Sarah Johnson** (Fashion Enthusiast) - About quality and confidence
2. **Michael Chen** (Style Consultant) - About transformation and mastery
3. **Emma Davis** (Creative Director) - About craftsmanship and attention to detail
4. **James Wilson** (Entrepreneur) - About lifestyle and brand vision

**How to Interact:**
1. **Read each testimonial**: Understand customer satisfaction
2. **Observe the avatars**: Real-looking profile pictures for credibility
3. **Notice the animations**: Testimonials appear staggered as you scroll
4. **Check the ratings**: All are 5-star ratings showing high satisfaction

**Why This Matters:**
- Social proof builds trust with potential customers
- Diverse customer profiles show broad appeal
- Professional presentation increases credibility

---

### 1.6 Partner Brands Showcase

**What to Look For:**
- Section titled "TRUSTED PARTNERS" and "Featured Brands"
- 6 brand cards in a responsive grid (2 columns on mobile, 3 on tablet, 6 on desktop)
- Each brand card shows:
  - A large emoji logo (🏷️, 👔, ✨, 💎, 🎨, ⭐)
  - Brand name (Brand A, B, C, etc.)
  - Subtle border and background
  - Hover effects

**How to Interact:**
1. **Hover over a brand card**: See the border color change to primary color (#2a14b4)
2. **Observe the hover effects**: Card lifts up with a shadow effect
3. **Notice the animations**: Brands scale up smoothly as you scroll to them
4. **Responsive behavior**: Cards rearrange based on screen size

**Design Features:**
- Hover effects: Border color change, shadow elevation, slight upward movement
- Smooth transitions for all hover states
- Responsive grid that adapts to screen size

---

### 1.7 Newsletter Subscription

**What to Look For:**
- Large blue section at the bottom of the homepage
- "Subscribe to Our Newsletter" heading
- Descriptive text about exclusive deals
- Email input field with placeholder text
- "Subscribe" button
- Newsletter section in the footer as well

**How to Interact:**
1. **Click the email input field**: Focus on the input
2. **Type an email address**: Try entering a valid email (e.g., "test@example.com")
3. **Click the Subscribe button**: Submit your email
4. **Try invalid email**: Enter something like "notanemail" and try to submit
5. **Observe validation**: The input should show an error state for invalid emails
6. **Success state**: After entering a valid email and clicking Subscribe, the input clears

**Email Validation:**
- Uses regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Requires: characters, @, more characters, dot, domain extension
- Visual feedback for invalid entries

---

## 📍 Section 2: Navigation & Global Components

### 2.1 Announcement Bar

**What to Look For:**
- Thin bar at the very top of every page
- Scrolling text with promotional message
- Text moves from right to left continuously

**How to Interact:**
1. **Hover over the announcement bar**: The scrolling pauses
2. **Move mouse away**: The scrolling resumes
3. **Observe the effect**: Smooth marquee animation

**Typical Messages:**
- "🎉 Welcome to ATELIER - Discover Premium Fashion | Free Shipping on Orders Over $150 | New Collection Available Now!"

---

### 2.2 Enhanced Navbar

**What to Look For:**
- Navigation bar below the announcement bar
- Left side: "ATELIER" logo/brand name
- Center: Search bar with magnifying glass icon
- Right side: Icons for wishlist, cart, theme toggle, and user profile

**Search Functionality (Live Search):**

1. **Click the search bar**: It becomes active
2. **Start typing a product name**: For example, type "shirt"
3. **Observe the dropdown**: Shows top 3 matching products with:
   - Product image thumbnail
   - Product name
   - Product price
   - Clickable card format
4. **Click a product in dropdown**: Navigate to that product's detail page
5. **Press Enter or click outside**: Close the dropdown

**Other Navbar Features:**

| Icon | Function | Behavior |
|------|----------|----------|
| 🔍 Search | Find products | Shows live search dropdown |
| ❤️ Wishlist | View saved items | Navigates to wishlist page |
| 🛒 Cart | View shopping cart | Shows item count badge + total price |
| 🌙/☀️ Theme | Toggle dark/light mode | Changes entire app theme |
| 👤 User Profile | User account | Shows when logged in; click to go to profile |

**Responsive Behavior:**
- On mobile: Some icons may be hidden, search bar may collapse
- On tablet: All icons visible, search bar visible
- On desktop: Full navbar with all features visible

---

### 2.3 Breadcrumb Navigation

**What to Look For:**
- Appears on all internal pages (not on homepage)
- Shows your current location in the app hierarchy
- Format: "HOME > SHOP > PRODUCT NAME" or similar
- Each part is clickable

**Examples:**
- Shop page: `HOME > SHOP`
- Product detail: `HOME > SHOP > PRODUCT NAME`
- Cart page: `HOME > SHOP > CART`
- Profile page: `HOME > PROFILE`

**How to Use:**
1. **Click any breadcrumb part**: Navigate to that section
2. **Use for quick navigation**: Jump back to previous pages easily
3. **Understand your location**: Always know where you are in the app

---

### 2.4 Scroll-to-Top Button

**What to Look For:**
- Floating button in the bottom-right corner of the screen
- Appears only after scrolling down 300 pixels
- Has an upward arrow icon
- Semi-transparent background with hover effects

**How to Interact:**
1. **Scroll down the page**: After 300px, the button appears
2. **Notice the animation**: Button fades in smoothly
3. **Hover over the button**: See the hover effect (color change, elevation)
4. **Click the button**: Smoothly scroll back to the top of the page
5. **Scroll back up**: Button disappears as you reach the top

**Why It's Useful:**
- Long pages need quick navigation back to top
- Improves user experience on mobile devices
- Smooth animation makes it feel polished

---

### 2.5 Professional Footer

**What to Look For:**
- Large section at the bottom of every page
- Multiple columns of information
- Dark background with light text

**Footer Sections:**

#### Newsletter Subscription (Top)
- Blue background section
- Email input field
- Subscribe button
- Promotional text

#### Brand Information (Left Column)
- "ATELIER" brand name
- Brand description
- Contact information:
  - Email: ahmed@example.com
  - Phone: +1 (555) 123-4567
- Social media links:
  - GitHub
  - Twitter
  - Facebook
  - Instagram
  - Google

**Social Links Behavior:**
1. **Hover over social icons**: See the hover effect (color change, lift effect)
2. **Click a social link**: Opens in a new tab
3. **Notice the styling**: Circular buttons with primary color on hover

#### Footer Links (Right Columns)
Four categories of links:

| Category | Links |
|----------|-------|
| SHOP | New Arrivals, Best Sellers, Sale, Collections |
| COMPANY | About Us, Our Story, Careers, Press |
| SUPPORT | Contact, Shipping Info, Returns, FAQ |
| LEGAL | Privacy Policy, Terms & Conditions, Cookie Policy, Disclaimer |

**How to Interact:**
1. **Hover over any link**: See the color change to primary color
2. **Click any link**: Navigate to that page (if implemented)
3. **Observe the styling**: Consistent typography and spacing

#### Payment Methods
- Display of accepted payment methods:
  - Visa
  - Mastercard
  - PayPal
  - Apple Pay
  - Google Pay

#### Copyright
- Year-based copyright notice
- Designer attribution: "Designed by Ahmed Salah"
- Updates automatically each year

---

## 🛍️ Section 3: Shop Page Features

### 3.1 Accessing the Shop Page

**How to Get There:**
1. Click "SHOP" in the navbar, OR
2. Click any "SHOP NOW" or "EXPLORE" button on the homepage, OR
3. Click the breadcrumb "SHOP" link, OR
4. Navigate directly to `/shop` in the URL

**What You'll See:**
- Two-column layout: Filters on left, products on right
- Page title: "Collection"
- Product count: "Showing X curated pieces in the digital atelier"
- Sort dropdown on the right

---

### 3.2 Filter Sidebar (Left Column)

**Sticky Positioning:**
- The sidebar stays visible as you scroll down the page
- Maintains position at top of viewport
- Very convenient for filtering while browsing

#### Search Filter
1. **Look for**: "SEARCH PIECES" section at the top
2. **Click the search input**: Type a product name
3. **Real-time filtering**: Products update as you type
4. **Example searches**: "shirt", "jacket", "dress", "shoes"

#### Category Filter
1. **Look for**: "CATEGORIES" section
2. **See all available categories**: Dynamically loaded from products
3. **Click a checkbox**: Select/deselect a category
4. **Multiple selection**: You can select multiple categories at once
5. **Selected styling**: Checked categories appear in bold with primary color
6. **Clear filters button**: Appears when categories are selected
7. **Click "Clear Filters"**: Reset all category selections

**Example Categories:**
- electronics
- jewelery
- men's clothing
- women's clothing

#### Price Range Filter
1. **Look for**: "PRICE RANGE" section
2. **See the slider**: Ranges from $0 to $1000
3. **Drag the slider**: Move left to decrease max price, right to increase
4. **Value display**: Shows current max price on the right
5. **Real-time filtering**: Products update as you adjust the slider
6. **Try different ranges**: $0-$100, $100-$500, $500-$1000

#### Exclusive Membership Card
1. **Look for**: Blue card at the bottom of sidebar
2. **Content**: "EXCLUSIVE" label, "Unlock the Archive" heading
3. **Description**: Benefits of joining the membership circle
4. **Action button**: "JOIN NOW" button
5. **Purpose**: Encourages user engagement and membership signup

---

### 3.3 Product Grid (Right Column)

#### Grid Header
- **Title**: "Collection"
- **Subtitle**: Shows product count
- **Sort Dropdown**: "Sort By" with options

#### Sorting Options
1. **Click the Sort dropdown**: See all available options
2. **Default Sorting**: Original order
3. **Price: Low to High**: Cheapest items first
4. **Price: High to Low**: Most expensive items first
5. **Name: A-Z**: Alphabetical order
6. **Observe the change**: Products rearrange immediately

#### Product Cards Display
- **Grid layout**: Responsive (1 column on mobile, 2 on tablet, 3 on desktop)
- **Each card shows**:
  - Product image
  - Product name
  - Star rating
  - Number of reviews
  - Price
  - "Add to Cart" button
  - "Add to Wishlist" button (heart icon)

#### Product Card Interactions
1. **Hover over a card**: See the hover effects
2. **Click the image**: Navigate to product detail page
3. **Click "Add to Cart"**: See a success toast notification
4. **Click the heart icon**: Add to wishlist (heart fills in)
5. **Observe animations**: Products fade in as they appear

#### Empty State
- **When no products match**: Shows a sad face icon
- **Message**: "The archive is empty"
- **Subtitle**: "No pieces match your current criteria"
- **Action button**: "Reset Filters" to clear all filters

---

### 3.4 Filtering Workflow Example

**Scenario: Find affordable women's clothing**

1. **Start on Shop page**: See all products
2. **Find Categories section**: Look for "women's clothing"
3. **Click the checkbox**: Select women's clothing
4. **Observe the change**: Products filter to show only women's items
5. **Find Price Range slider**: Drag to set max price to $50
6. **See the results**: Only affordable women's clothing displays
7. **Try sorting**: Click "Price: Low to High" to see cheapest items first
8. **Use search**: Type "shirt" to narrow down further
9. **Click "Clear Filters"**: Reset everything to see all products again

---

## 🛒 Section 4: Cart Page Features

### 4.1 Accessing the Cart Page

**How to Get There:**
1. Click the cart icon in the navbar, OR
2. Navigate to `/cart` in the URL, OR
3. Click "GO TO CART" after adding items

**What You'll See:**
- Page header with breadcrumbs
- Two-column layout: Cart items on left, Order Summary on right
- If cart is empty: Friendly message with "GO TO SHOP" button

---

### 4.2 Cart Items Section

#### Adding Items First
1. **Go to Shop page**: Browse products
2. **Click "Add to Cart"**: Add several items
3. **Return to Cart**: Click cart icon in navbar
4. **See your items**: All added products display

#### Cart Item Display
Each item shows:
- Product image thumbnail
- Product name
- Product price (per unit)
- Category information
- Quantity control
- Total price for that item
- Remove button (X icon)

#### Quantity Control
1. **Find the quantity control**: Shows current quantity
2. **Click + button**: Increase quantity
3. **Click - button**: Decrease quantity
4. **Type in the field**: Enter a specific quantity
5. **Observe the update**: Total price updates automatically

#### Removing Items
1. **Find the X button**: On the right side of each item
2. **Hover over it**: See the color change to red
3. **Click it**: Item is removed from cart
4. **Observe animation**: Item fades out smoothly

#### Item Animations
- Items fade in smoothly when cart loads
- Smooth transitions when quantities change
- Smooth fade-out when items are removed

---

### 4.3 Promo Code Section

**Location**: Below the cart items

**How to Use:**
1. **Find the "Have a Promo Code?" section**: Blue background box
2. **See the input field**: Placeholder says "Enter promo code (SAVE10 or SAVE20)"
3. **Type a promo code**: 
   - `SAVE10` = 10% discount
   - `SAVE20` = 20% discount
   - Other codes = no discount
4. **Click "Apply" button**: Apply the code
5. **See the result**: 
   - Valid code: "✓ Discount applied: $XX.XX" message appears
   - Invalid code: No discount message
6. **Check Order Summary**: Discount appears in the breakdown

**Example Workflow:**
- Cart subtotal: $100
- Apply code "SAVE10"
- Discount: -$10
- New subtotal: $90

---

### 4.4 Sticky Order Summary (Right Column)

**Key Feature: Sticky Positioning**
- The Order Summary stays visible as you scroll down
- Very convenient for reviewing totals while browsing items
- Remains at top of viewport

#### Order Summary Breakdown

| Item | Description | Example |
|------|-------------|---------|
| Subtotal | Sum of all items | $249.99 |
| Discount | Applied promo code | -$25.00 |
| Shipping | Delivery cost | FREE (or $9.99) |
| Tax | 8% sales tax | $18.40 |
| **Total** | **Final amount** | **$243.39** |

#### Shipping Rules
- **FREE shipping**: Orders over $150
- **$9.99 shipping**: Orders under $150
- **Displays dynamically**: Changes as you add/remove items

#### Tax Calculation
- **Rate**: 8% of subtotal (after discount)
- **Automatic**: Calculated in real-time
- **Included in total**: Already added to final amount

#### Terms & Conditions
1. **Find the checkbox**: Below the totals
2. **Read the label**: "I agree to the Terms & Conditions"
3. **Check the box**: Enable the checkout button
4. **Uncheck the box**: Disable the checkout button

#### Checkout Button
1. **Find "PROCEED TO CHECKOUT"**: Large blue button
2. **Disabled state**: Button is disabled until T&C is checked
3. **Enabled state**: Button is blue and clickable when T&C is checked
4. **Click to proceed**: Navigate to checkout page (if implemented)

#### Security Badge
- Lock icon with text: "Secure checkout with end-to-end encryption"
- Builds trust with customers
- Appears at bottom of Order Summary

---

### 4.5 Cart Workflow Example

**Complete Shopping Journey:**

1. **Start on homepage**: Browse featured products
2. **Add items**: Click "Add to Cart" on 3-4 products
3. **Go to cart**: Click cart icon in navbar
4. **Review items**: See all items with quantities and prices
5. **Adjust quantities**: Change quantity for one item
6. **Remove an item**: Click X on one product
7. **Apply promo code**: Enter "SAVE10" and click Apply
8. **Review totals**: Check Order Summary
   - See subtotal
   - See discount applied
   - See shipping (free or $9.99)
   - See tax calculation
   - See final total
9. **Check T&C**: Click the checkbox
10. **Proceed to checkout**: Click the button

---

## 👤 Section 5: Profile Page & Order Tracking

### 5.1 Accessing the Profile Page

**How to Get There:**
1. **If logged in**: Click the user icon in navbar, OR
2. **Navigate directly**: Go to `/profile` in URL, OR
3. **From any page**: Use the profile link in navbar

**If Not Logged In:**
- See message: "Please log in to view your profile"
- "Go to Login" button to navigate to login page

---

### 5.2 Profile Information Card (Left Sidebar)

#### User Avatar
- Large circular avatar with user initials
- Background color: Primary color (#2a14b4)
- Size: 100x100 pixels
- Shows first letter of user's name

#### User Details
- **Name**: Displayed prominently
- **Email**: Shown below name
- **Contact Information**:
  - Email address with icon
  - Phone number with icon
  - Location with icon

#### Profile Actions
1. **Edit Profile button**: Opens profile editing interface (if implemented)
2. **Logout button**: 
   - Click to logout
   - Redirects to homepage
   - Clears user session

---

### 5.3 Order History Section

#### Order List
- **Title**: "Order History"
- **Multiple order cards**: Each card represents one order
- **Responsive layout**: Stacks on mobile, side-by-side on desktop

#### Order Card Display
Each order card shows:
- **Order ID**: Unique identifier (e.g., "ORD-001")
- **Order Date**: When the order was placed
- **Item Count**: Number of items in order
- **Total Amount**: Order total price
- **Status Badge**: Color-coded status (Delivered, Shipped, Processing)

#### Order Card Interactions
1. **Click any order card**: Select that order for tracking
2. **Visual feedback**: Selected order has a blue border
3. **Hover effect**: Card lifts up with shadow
4. **Status colors**:
   - Green: Delivered ✓
   - Blue: Shipped 🚚
   - Orange: Processing ⏳

#### Mock Orders Included
1. **ORD-001** (Delivered)
   - Date: 2024-03-15
   - Total: $249.99
   - Items: 3
   - Status: Delivered

2. **ORD-002** (Shipped)
   - Date: 2024-03-22
   - Total: $159.99
   - Items: 2
   - Status: Shipped

3. **ORD-003** (Processing)
   - Date: 2024-03-25
   - Total: $89.99
   - Items: 1
   - Status: Processing

---

### 5.4 Order Progress Tracker

#### MUI Stepper Component
- **Visual representation**: Shows all order stages
- **4 stages**:
  1. Order Placed
  2. Processing
  3. Shipped
  4. Delivered

#### Stage Display
- **Completed stages**: Checkmark icon, filled circle
- **Current stage**: Highlighted, active indicator
- **Future stages**: Empty circle, not yet completed
- **Timestamps**: Date shown for each completed stage

#### Example: Delivered Order (ORD-001)
```
✓ Order Placed (2024-03-15)
✓ Processing (2024-03-16)
✓ Shipped (2024-03-17)
✓ Delivered (2024-03-20)
```

#### Example: Shipped Order (ORD-002)
```
✓ Order Placed (2024-03-22)
✓ Processing (2024-03-23)
✓ Shipped (2024-03-24)
○ Delivered (pending)
```

#### Example: Processing Order (ORD-003)
```
✓ Order Placed (2024-03-25)
✓ Processing (2024-03-25)
○ Shipped (pending)
○ Delivered (pending)
```

---

### 5.5 GIS Order Tracking Map

**This is the Signature Feature!**

#### Visual Delivery Route
The map shows a simplified delivery visualization:

```
📦 Warehouse (NY) ———————→ 🏠 Your Address
```

#### Map Components
1. **Starting Point**: 📦 Warehouse (NY)
2. **Ending Point**: 🏠 Your Address
3. **Progress Line**: Animated line connecting the two
4. **Status Indicator**: Shows current delivery status

#### Status Indicators

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| Delivered | ✓ | Green | Order arrived |
| In Transit | 🚚 | Blue | On the way |
| Being Prepared | ⏳ | Orange | Preparing to ship |

#### Tracking Information
Below the map visualization:

| Field | Content |
|-------|---------|
| Tracking Number | TRK123456789 (unique per order) |
| From | Warehouse (NY) |
| To | Your Address |

#### Animated Progress
- **Delivered orders**: Progress line fills from left to right
- **Animation duration**: 2 seconds
- **Smooth easing**: Linear animation for realistic effect
- **Completion**: Shows "Delivered Successfully" chip

#### How to Interact
1. **Select different orders**: Click different order cards
2. **Watch the animation**: Progress line animates for each order
3. **See status change**: Status indicator updates based on order status
4. **Read the details**: Check the From/To information

#### Example Workflow
1. **Click ORD-001** (Delivered):
   - Progress line fills completely
   - Shows "✓ Delivered Successfully"
   - All stages completed in stepper

2. **Click ORD-002** (Shipped):
   - Progress line partially filled
   - Shows "🚚 In Transit"
   - Shipped stage highlighted in stepper

3. **Click ORD-003** (Processing):
   - Progress line mostly empty
   - Shows "⏳ Being Prepared"
   - Processing stage highlighted in stepper

---

### 5.6 Profile Page Workflow Example

**Complete Profile Journey:**

1. **Navigate to profile**: Click user icon in navbar
2. **See your information**: Avatar, name, email, contact details
3. **View order history**: See list of all your orders
4. **Select an order**: Click on "ORD-001" (delivered order)
5. **See progress tracker**: All 4 stages show as completed
6. **View delivery map**: See the warehouse to home route
7. **Check tracking number**: TRK123456789
8. **Select different order**: Click on "ORD-002" (shipped order)
9. **See updated tracker**: Only 3 stages completed
10. **See updated map**: Progress line partially filled
11. **Check status**: "In Transit" indicator shows
12. **Select processing order**: Click on "ORD-003"
13. **See early stage**: Only 2 stages completed
14. **See map**: Progress line mostly empty
15. **See status**: "Being Prepared" indicator shows
16. **Edit profile**: Click "Edit Profile" button (if implemented)
17. **Logout**: Click "Logout" button to exit

---

## 🎨 Section 6: Theme & Design Features

### 6.1 Dark Mode Toggle

**How to Access:**
1. **Find the theme icon**: Moon (🌙) or Sun (☀️) in navbar
2. **Click the icon**: Toggle between dark and light mode
3. **Observe the change**: Entire app theme changes instantly

#### Light Mode
- Light backgrounds
- Dark text
- Bright colors
- Good for daytime use

#### Dark Mode
- Dark backgrounds
- Light text
- Adjusted colors for contrast
- Good for nighttime use

#### Persistence
- **Saved preference**: Your theme choice is saved to localStorage
- **Persists across sessions**: Reopening the app remembers your choice
- **Per-device setting**: Each device can have different theme

### 6.2 Color Palette

#### Primary Color
- **Hex**: #2a14b4 (Deep Blue)
- **Usage**: Buttons, links, highlights, accents
- **Hover state**: Slightly lighter shade

#### Semantic Colors
- **Success**: Green (for positive actions)
- **Error**: Red (for destructive actions)
- **Warning**: Orange (for caution)
- **Info**: Blue (for informational messages)

#### Text Colors
- **Primary text**: Dark in light mode, light in dark mode
- **Secondary text**: Muted gray
- **Disabled text**: Very light gray

### 6.3 Typography

#### Font Family
- **Sans-serif**: Professional, modern look
- **Google Fonts**: Imported for consistency

#### Font Sizes
- **H1 (Headlines)**: 3-5rem (large and bold)
- **H2-H3**: 1.5-2.5rem (section headers)
- **Body**: 1rem (standard reading)
- **Caption**: 0.75-0.85rem (small text)

#### Font Weights
- **900**: Extra bold (headings, CTAs)
- **800**: Bold (section titles)
- **700**: Semi-bold (emphasis)
- **600**: Medium (secondary text)
- **400**: Regular (body text)

### 6.4 Spacing & Layout

#### Spacing Scale
- **4px**: Minimal spacing
- **8px**: Small spacing
- **16px**: Standard spacing
- **24px**: Large spacing
- **32px**: Extra large spacing

#### Container Widths
- **Mobile**: Full width with padding
- **Tablet**: 90% width
- **Desktop**: 1200px max-width centered

#### Responsive Breakpoints
- **xs**: 0px (mobile phones)
- **sm**: 600px (small tablets)
- **md**: 960px (tablets)
- **lg**: 1280px (small desktops)
- **xl**: 1920px (large desktops)

---

## 🎬 Section 7: Animations & Interactions

### 7.1 Framer Motion Animations

#### Fade Animations
- **Entrance**: Elements fade in smoothly
- **Exit**: Elements fade out smoothly
- **Duration**: 0.3-0.5 seconds typically

#### Slide Animations
- **Hero carousel**: Text slides up with fade
- **Testimonials**: Cards slide in from bottom
- **Products**: Items slide up as they appear

#### Scale Animations
- **Hover effects**: Buttons and cards scale up slightly
- **Click feedback**: Elements scale down then back up
- **Loading states**: Skeleton loaders pulse

#### Stagger Effects
- **Multiple items**: Each item animates with a slight delay
- **Creates flow**: Smooth sequential animation
- **Example**: Products in grid animate one after another

### 7.2 Interactive Elements

#### Buttons
- **Hover**: Color change, slight elevation
- **Active**: Pressed appearance
- **Disabled**: Grayed out, no interaction

#### Cards
- **Hover**: Shadow increase, slight lift
- **Click**: Visual feedback
- **Transitions**: Smooth color and shadow changes

#### Input Fields
- **Focus**: Border color change, shadow
- **Error**: Red border, error message
- **Valid**: Green checkmark or success state

#### Icons
- **Hover**: Color change, scale effect
- **Animated**: Some icons animate on interaction
- **Tooltips**: Hover to see descriptions

---

## 🚨 Section 8: Toast Notifications

### 8.1 What Are Toasts?

Small pop-up messages that appear briefly to confirm actions or show status updates.

### 8.2 When Toasts Appear

| Action | Toast Message | Type |
|--------|---------------|------|
| Add to cart | "Added to cart!" | Success (green) |
| Add to wishlist | "Added to wishlist!" | Info (blue) |
| Remove from cart | "Removed from cart!" | Info (blue) |
| Apply promo code | "Discount applied!" | Success (green) |
| Invalid email | "Please enter a valid email" | Error (red) |

### 8.3 Toast Behavior

- **Position**: Bottom-right corner of screen
- **Duration**: 4 seconds (auto-dismiss)
- **Stacking**: Multiple toasts stack vertically
- **Animation**: Fade in and out smoothly
- **Dismissable**: Click the X to close manually

### 8.4 How to Trigger Toasts

1. **Add to cart**: Go to Shop, click "Add to Cart" on any product
2. **Add to wishlist**: Click the heart icon on a product
3. **Subscribe**: Enter email in newsletter and click Subscribe
4. **Invalid email**: Try entering "notanemail" in newsletter
5. **Apply promo**: Go to Cart, enter "SAVE10", click Apply

---

## 📱 Section 9: Responsive Design Testing

### 9.1 Testing on Different Screen Sizes

#### Mobile (320px - 600px)
1. **Open browser DevTools**: F12 or Right-click > Inspect
2. **Click device toolbar**: Toggle device toolbar icon
3. **Select mobile device**: iPhone 12, Pixel 5, etc.
4. **Observe changes**:
   - Single column layouts
   - Larger touch targets
   - Hamburger menu (if implemented)
   - Stacked navigation

#### Tablet (600px - 960px)
1. **Select tablet device**: iPad, Tab S6, etc.
2. **Observe changes**:
   - 2-column layouts
   - Larger cards
   - More comfortable spacing
   - Sidebar visible

#### Desktop (960px+)
1. **Select desktop**: Desktop 1920x1080, etc.
2. **Observe changes**:
   - Full layouts
   - 3-column grids
   - All features visible
   - Optimal spacing

### 9.2 Testing Orientation

1. **Portrait**: Vertical orientation (default)
2. **Landscape**: Horizontal orientation
3. **Observe**: Layout adjusts for each orientation

---

## 🔍 Section 10: Advanced Features to Explore

### 10.1 Product Detail Page

**How to Access:**
1. Click any product image or name
2. See full product details
3. Larger image, full description
4. Reviews section
5. Related products

### 10.2 Wishlist Page

**How to Access:**
1. Click heart icon on products
2. Click wishlist icon in navbar
3. See all saved items
4. Remove from wishlist
5. Move to cart

### 10.3 Checkout Page

**How to Access:**
1. Go to cart
2. Click "PROCEED TO CHECKOUT"
3. Enter shipping information
4. Enter payment details
5. Complete order

### 10.4 Login Page

**How to Access:**
1. Click user icon (when not logged in)
2. Or navigate to `/login`
3. Enter email
4. Login to access profile

---

## 💡 Section 11: Tips & Tricks

### 11.1 Keyboard Shortcuts
- **Tab**: Navigate through interactive elements
- **Enter**: Activate buttons and links
- **Escape**: Close dropdowns and modals
- **Space**: Toggle checkboxes

### 11.2 Browser DevTools Tips
- **Inspect Element**: Right-click any element
- **Network tab**: See API calls
- **Console**: Check for errors
- **Responsive Design Mode**: Test different sizes

### 11.3 Performance Tips
- **Lazy loading**: Images load as needed
- **Smooth scrolling**: Use smooth scroll behavior
- **Caching**: Repeat visits are faster
- **Minified assets**: Smaller file sizes

### 11.4 Accessibility Features
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Clear focus rings
- **Color contrast**: Readable text
- **Alt text**: Images have descriptions

---

## 🎓 Section 12: Learning Resources

### 12.1 Technology Stack

| Technology | Purpose | Learn More |
|------------|---------|------------|
| React 19 | UI framework | reactjs.org |
| Material-UI | Component library | mui.com |
| Framer Motion | Animations | framer.com/motion |
| React Router | Navigation | reactrouter.com |
| Tailwind CSS | Styling | tailwindcss.com |
| Vite | Build tool | vitejs.dev |

### 12.2 Code Structure
- **Components**: Reusable UI pieces
- **Pages**: Full page components
- **Context**: State management
- **Hooks**: Custom logic
- **Services**: API calls

### 12.3 Best Practices
- **Component composition**: Break into smaller pieces
- **Props drilling**: Pass data through props
- **State management**: Use Context for global state
- **Performance**: Memoize expensive computations
- **Accessibility**: Include ARIA labels

---

## 🎯 Section 13: Common User Scenarios

### Scenario 1: New Visitor Browsing
1. Land on homepage
2. See hero carousel
3. Read brand story
4. Browse testimonials
5. Check partner brands
6. Click "SHOP NOW"

### Scenario 2: Returning Customer Shopping
1. Login to profile
2. Check order history
3. Browse shop with filters
4. Add items to cart
5. Apply promo code
6. Proceed to checkout

### Scenario 3: Order Tracking
1. Login to profile
2. View order history
3. Select recent order
4. Check progress tracker
5. View delivery map
6. See tracking number

### Scenario 4: Mobile Shopping
1. Open on phone
2. Browse responsive layout
3. Use mobile-optimized search
4. Tap to add to cart
5. View cart on mobile
6. Proceed to checkout

---

## ✅ Section 14: Verification Checklist

Use this checklist to verify all features are working:

- [ ] Hero carousel auto-rotates every 2 seconds
- [ ] Navigation arrows work on carousel
- [ ] Dot indicators are clickable
- [ ] Live search shows top 3 products
- [ ] Breadcrumbs appear on all pages
- [ ] Scroll-to-top button appears after 300px
- [ ] Dark mode toggle works
- [ ] Theme preference persists
- [ ] Newsletter validation works
- [ ] Promo codes apply discounts
- [ ] Cart sticky summary stays visible
- [ ] Order tracker shows all stages
- [ ] Delivery map animates
- [ ] Testimonials load smoothly
- [ ] Partner brands hover effects work
- [ ] Product filtering works
- [ ] Sorting options work
- [ ] Responsive design works on mobile
- [ ] Toast notifications appear
- [ ] Footer links are clickable

---

## 🎉 Conclusion

You've now explored all the major features of ShopWave v2! The application demonstrates modern e-commerce best practices with:

✨ **Beautiful Design** - Professional UI with smooth animations
🛍️ **Complete Shopping Experience** - Browse, filter, cart, checkout
📦 **Advanced Order Tracking** - Progress tracker with GIS map
📱 **Responsive Design** - Works perfectly on all devices
🎨 **Dark Mode Support** - Comfortable viewing in any lighting
⚡ **Smooth Interactions** - Framer Motion animations throughout
🔒 **Professional Polish** - Attention to detail in every component

Thank you for exploring ShopWave v2. Enjoy your shopping experience!

---

**For questions or feedback, contact: ahmedsalah219013@gmail.com**
````
