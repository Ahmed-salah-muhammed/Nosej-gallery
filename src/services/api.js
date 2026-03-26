// src/services/api.js
// Centralised API layer — updated to use DummyJSON

const BASE_URL = "https://dummyjson.com";

/**
 * Fetch all products
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  const data = await res.json();
  return data.products; // DummyJSON returns { products: [], total, skip, limit }
}

/**
 * Fetch a single product by id
 * @param {number} id
 * @returns {Promise<Product>}
 */
export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id} (${res.status})`);
  return res.json();
}

/**
 * Fetch all categories
 * @returns {Promise<string[]>}
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
}
