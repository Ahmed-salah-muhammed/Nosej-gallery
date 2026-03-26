import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Mock products API
  await page.route("https://fakestoreapi.com/products", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: 1,
          title: "Test Product",
          price: 109.95,
          description: "Test Description",
          category: "men's clothing",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        },
      ]),
    });
  });
});

test("homepage renders and has correct branding", async ({ page }) => {
  await page.goto("http://localhost:5174/");
  await expect(page.getByText("SHOPWAVE")).toBeVisible();
  await expect(page.getByText("SUMMER ATELIER 2024")).toBeVisible();
});

test("navigation to shop works", async ({ page }) => {
  await page.goto("http://localhost:5174/");
  await page.click("text=SHOP");
  await expect(page).toHaveURL(/.*shop/);
  await expect(page.getByText("THE SQUAD COLLECTION")).toBeVisible();
});

test("search functionality works", async ({ page }) => {
  await page.goto("http://localhost:5174/");
  const searchInput = page.getByPlaceholder("Search pieces...");
  await searchInput.fill("Test");
  await expect(page.getByText("Test Product")).toBeVisible();
});

test("cart page renders empty state", async ({ page }) => {
  await page.goto("http://localhost:5174/cart");
  await expect(page.getByText("Your archive is empty")).toBeVisible();
});
