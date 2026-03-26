// src/services/api.js
// Centralised API layer — swap BASE_URL to use a different store API

const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch all products
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
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
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
}
