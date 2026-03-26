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
