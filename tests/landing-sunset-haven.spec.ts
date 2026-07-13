import { test, expect } from '@playwright/test';

test.describe('Sunset Haven Promo Landing Page', () => {
  test('should load the page and render main sections', async ({ page }) => {
    // Navigate to the promo page
    await page.goto('/landing/sunset-haven');

    // Check title
    await expect(page).toHaveTitle(/Invest in Abuja/i);

    // Verify Hero Section
    const headline = page.locator('h1');
    await expect(headline).toContainText(/Own a piece of/i);
    await expect(headline).toContainText(/Abuja's next/i);

    // Scroll down gradually to trigger reveal-on-scroll elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); // Wait for reveal animation

    // Verify Why Invest section
    const whyInvestHeading = page.locator('h2', { hasText: 'Why Serious Investors Are Buying' });
    await expect(whyInvestHeading).toBeVisible();

    // Verify Target Profile table
    const targetProfileTable = page.locator('table');
    await expect(targetProfileTable).toBeVisible();
    await expect(page.locator('th', { hasText: 'Target Profile' })).toBeVisible();

    // Verify Entirely Different section
    const entirelyDifferentHeading = page.locator('h2', { hasText: 'What Makes Sunset Haven Different?' });
    await expect(entirelyDifferentHeading).toBeVisible();

    // Verify Gallery section
    const galleryHeading = page.locator('h2', { hasText: 'Featured Estate Gallery' });
    await expect(galleryHeading).toBeVisible();

    // Verify Form rendering
    const formHeading = page.locator('#investment-form h3', { hasText: 'Request Yours Today' });
    await expect(formHeading).toBeVisible();
    
    // Verify specific form fields exist
    await expect(page.locator('#investment-form form input[name="fullName"]')).toBeVisible();
    await expect(page.locator('#investment-form form input[name="email"]')).toBeVisible();
    await expect(page.locator('#investment-form form select[name="plotSize"]')).toBeVisible();
    await expect(page.locator('#investment-form form select[name="purpose"]')).toBeVisible();

    // Verify Contact Info
    await expect(page.locator('.pd-sidebar-card span', { hasText: 'Contact' })).toBeVisible();
    await expect(page.locator('#investment-form a[href^="tel:"]').first()).toBeVisible();
  });

  test('should submit the investment form successfully', async ({ page }) => {
    await page.goto('/landing/sunset-haven');

    // Wait for the page to load
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();

    // Scroll down to trigger any dynamic animations/reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // Inject CSS to bypass GSAP scroll reveal hiding
    await page.addStyleTag({
      content: `
        .reveal-on-scroll, .wksc-reveal, #investment-form, #investment-form * {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          filter: none !important;
          pointer-events: auto !important;
        }
      `
    });

    // Verify Form elements are visible
    const nameInput = page.locator('#investment-form form input[name="fullName"]');
    await expect(nameInput).toBeVisible();

    // Fill form fields
    await nameInput.fill('Test Lead User');
    await page.locator('#investment-form form input[name="phone"]').fill('08012345678');
    await page.locator('#investment-form form input[name="email"]').fill('testlead@wisdomkwati.com');
    await page.locator('#investment-form form select[name="plotSize"]').selectOption('500sqm');
    await page.locator('#investment-form form select[name="purpose"]').selectOption('Residential (To Build)');

    // Submit form
    await page.locator('#investment-form form button[type="submit"]').click();

    // Verify success message is visible
    const successBanner = page.locator('text=Thank you, Test Lead User! Your request has been received.');
    await expect(successBanner).toBeVisible({ timeout: 15000 });
  });
});
