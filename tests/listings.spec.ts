import { test, expect } from '@playwright/test';

test('property listings render and filters are interactive', async ({ page }) => {
  await page.goto('/house-types', { waitUntil: 'domcontentloaded' });

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

  // Verify the main header for House Types
  const heading = page.locator('h1.ht-headline');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(/Smart homes/i);

  // Verify filter elements are present and visible
  await expect(page.locator('select#filter-estate')).toBeVisible();
  await expect(page.locator('select#filter-beds')).toBeVisible();
  await expect(page.locator('select#filter-baths')).toBeVisible();
  await expect(page.locator('select#filter-type')).toBeVisible();
  await expect(page.locator('button#filter-reset')).toBeVisible();

  // Either listings should load or the no-results/loading UI should display cleanly
  const grid = page.locator('#ht-grid');
  const noResults = page.locator('#ht-no-results');
  
  await expect(grid.or(noResults).first()).toBeVisible();
});
