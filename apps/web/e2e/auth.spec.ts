import { expect, test } from "@playwright/test";

test.describe("Authentication flows", () => {
  test("should allow user to sign in", async ({ page }) => {
    await page.goto("/sign-in");

    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/app.clikz/dashboard");
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/sign-in");

    await page.fill('input[type="email"]', "wrong@example.com");
    await page.fill('input[type="password"]', "wrongpass");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Invalid credentials")).toBeVisible();
  });
});
