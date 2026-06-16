import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

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

  // Expect the main headline to be visible and contain the brand promise
  const headline = page.locator('h1.headline');
  await expect(headline).toBeVisible();
  await expect(headline).toContainText(/Dream Large|Live Smart/i);

  // Hero CTA or Nav CTA must exist and contain 'REQUEST A SITE VISIT'
  const ctaButton = page.locator('button.nav-cta, button.cta-button').first();
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toContainText(/REQUEST A SITE VISIT/i);

  // Main navigation links in the navbar should be visible
  const navbar = page.locator('.navbar');
  await expect(navbar.getByRole('link', { name: 'About', exact: true })).toBeVisible();
  await expect(navbar.getByRole('link', { name: 'Careers', exact: true })).toBeVisible();
  await expect(navbar.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
});
