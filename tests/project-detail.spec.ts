import { test, expect } from '@playwright/test';

test('project detail page hero section renders correctly', async ({ page }) => {
  await page.goto('/projects/whispering-pines', { waitUntil: 'domcontentloaded' });

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

  // Verify the page has loaded and the dynamic header is visible
  const heading = page.locator('h1.pd-hero-title-new');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(/Whispering Pines/i);

  // Check the left-column form and its elements
  const form = page.locator('form.pd-hero-form');
  await expect(form).toBeVisible();
  
  await expect(page.locator('input#hero-name')).toBeVisible();
  await expect(page.locator('input#hero-phone')).toBeVisible();
  await expect(page.locator('input#hero-email')).toBeVisible();
  await expect(page.locator('select#hero-plot-size')).toBeVisible();
  await expect(page.locator('select#hero-budget')).toBeVisible();
  await expect(page.locator('select#hero-payment-plan')).toBeVisible();
  await expect(page.locator('textarea#hero-message')).toBeVisible();

  // Verify the submit and site updates buttons
  await expect(page.locator('button.pd-hero-submit-btn')).toBeVisible();
  await expect(page.locator('a.pd-hero-updates-btn')).toBeVisible();

  // Check the right-column slideshow and slide elements
  const slider = page.locator('.pd-hero-slider');
  await expect(slider).toBeVisible();

  const slides = page.locator('.pd-hero-slide');
  await expect(slides.first()).toBeVisible();

  const progress = page.locator('.pd-slider-progress-num').first();
  await expect(progress).toBeVisible();

  const logo = page.locator('.pd-slider-logo-watermark').first();
  await expect(logo).toBeVisible();
});

test('project detail page has no horizontal overflow on mobile viewport', async ({ page }) => {
  // Set viewport to a small mobile screen
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/projects/whispering-pines', { waitUntil: 'domcontentloaded' });

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

  // Verify there is no horizontal scrollbar on the body or html elements
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow).toBe(false);
});
