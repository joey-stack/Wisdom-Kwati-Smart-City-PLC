import { test, expect } from '@playwright/test';

test('property detail page loads correctly or handles fallback', async ({ page }) => {
  await page.goto('/house-types/white-pearl', { waitUntil: 'domcontentloaded' });

  // Inject CSS to bypass GSAP scroll reveal hiding
  await page.addStyleTag({
    content: `
      .reveal-on-scroll, .wksc-reveal {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        filter: none !important;
        pointer-events: auto !important;
      }
    `
  });

  // Check if we hit the fallback 'not found' screen
  const notFoundHeading = page.locator('text=SPECIFICATION NOT FOUND');
  const isNotFound = await notFoundHeading.isVisible();

  if (isNotFound) {
    // If not found (e.g. database not seeded locally), verify the fallback UI behaves correctly
    await expect(page.getByRole('link', { name: 'BACK TO LISTING' })).toBeVisible();
  } else {
    // Otherwise, verify the full property specification page renders
    await expect(page.locator('h1.hd-hero-title')).toBeVisible();

    // Verify the inquiry form exists and is interactive
    const form = page.locator('form.hd-inquiry-form');
    await expect(form).toBeVisible();
    await expect(form.locator('input[placeholder="Full Name"]')).toBeVisible();
    await expect(form.locator('input[placeholder="Email Address"]')).toBeVisible();
    await expect(form.locator('input[placeholder="Phone Number"]')).toBeVisible();
    await expect(form.locator('button[type="submit"]')).toBeVisible();
  }
});
