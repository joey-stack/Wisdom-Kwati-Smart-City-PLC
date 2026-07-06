import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

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
  const headline = page.locator('p.headline');
  await expect(headline).toBeVisible();
  await expect(headline).toContainText(/Dream Large|Live Smart/i);

  // Hero CTA or Nav CTA must exist and contain 'REQUEST A SITE VISIT'
  const ctaButton = page.locator('button.cta-button:visible, button.nav-cta:visible').first();
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toContainText(/REQUEST A SITE VISIT/i);

  // Main navigation links check (handles desktop navbar vs mobile menu drawer)
  const menuToggle = page.locator('.menu-toggle');
  const isMobile = await menuToggle.isVisible();

  if (isMobile) {
    // Mobile layout: Navbar links are hidden. Click the toggle to open mobile menu
    await menuToggle.click();
    const mobileOverlay = page.locator('.mobile-menu-overlay');
    await expect(mobileOverlay).toBeVisible();
    await expect(mobileOverlay.getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(mobileOverlay.getByRole('link', { name: 'Careers', exact: true })).toBeVisible();
    await expect(mobileOverlay.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
    
    // Close the menu
    await mobileOverlay.locator('.mobile-menu-close-btn').click({ force: true });
    await expect(mobileOverlay).not.toHaveClass(/menu-active/);

  } else {
    // Desktop layout: Navbar links should be visible directly in the navbar
    const navbar = page.locator('.navbar');
    await expect(navbar.getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Careers', exact: true })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
  }
});

