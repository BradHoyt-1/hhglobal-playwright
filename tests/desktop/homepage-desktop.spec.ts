import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers';

test.describe('HH Global Homepage - Desktop', () => {
  const baseURL = 'https://www.hhglobal.com/';

test.beforeEach(async ({ page }) => {
  // Desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Navigate to the site
  await page.goto('https://www.hhglobal.com/');

  // Accept cookies via the helper
  await acceptCookies(page);

  // Wait for known overlays to disappear (in a simple way)
  await page.locator('#onetrust-consent-sdk').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  await page.locator('.onetrust-pc-dark-filter').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});

  // Optionally remove the consent SDK element if still present
  await page.evaluate(() => {
    const el = document.querySelector('#onetrust-consent-sdk');
    if (el) el.remove();
  });
});

  test.describe('Hero Section - Desktop', () => {
    test('should navigate when clicking the Learn More button', async ({ page }) => {
      // Arrange: locate the Learn More button
      const learnMoreButton = page.locator('a.custom-button', { hasText: 'Learn more' });

      // Assert it's visible
      await expect(learnMoreButton).toBeVisible();

      // Act: click the button
      await learnMoreButton.click();

      // Final assert: URL includes /company
      await expect(page).toHaveURL(/\/company/);
    });
  });

  test.describe('Data Cards Section - Desktop', () => {
    test('should navigate when clicking the first data card', async ({ page }) => {
      // Arrange: get the first data card link
      const firstCardLink = page.locator('.data-visualisation-card').first().locator('a.data-vis-card-link');

      // Assert it's visible
      await expect(firstCardLink).toBeVisible();

      // Act: click the card
      await firstCardLink.click();

      // Final assertion: URL includes the expected path
      await expect(page).toHaveURL(/who-we-are\/company/);
    });
  });

  test.describe('Contact Form Section - Desktop', () => {
    test('should display and allow filling form fields without submission', async ({ page }) => {
      // Locate the form elements by their IDs
      const firstNameInput = page.locator('#first_name');
      const lastNameInput = page.locator('#last_name');
      const companyInput = page.locator('#company');
      const emailInput = page.locator('#email');
      const phoneInput = page.locator('#phone');
      const countrySelect = page.locator('#country');
      const reasonSelect = page.locator('#reason');
      const messageTextarea = page.locator('#message');

      // Assert visibility
      await expect(firstNameInput).toBeVisible();
      await expect(lastNameInput).toBeVisible();
      await expect(companyInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(phoneInput).toBeVisible();
      await expect(countrySelect).toBeVisible();
      await expect(reasonSelect).toBeVisible();
      await expect(messageTextarea).toBeVisible();

      // Fill text inputs
      await firstNameInput.fill('Test');
      await lastNameInput.fill('User');
      await companyInput.fill('Test Company');
      await emailInput.fill('test@example.com');
      await phoneInput.fill('555-123-4567');
      await messageTextarea.fill('This is a test message for demonstration purposes.');

      // Select dropdown options
      await countrySelect.selectOption({ label: 'United States of America' });
      await reasonSelect.selectOption({ label: 'I want more information about your services' });

      // Assert values
      await expect(firstNameInput).toHaveValue('Test');
      await expect(lastNameInput).toHaveValue('User');
      await expect(companyInput).toHaveValue('Test Company');
      await expect(emailInput).toHaveValue('test@example.com');
      await expect(phoneInput).toHaveValue('555-123-4567');
      await expect(messageTextarea).toHaveValue('This is a test message for demonstration purposes.');
    });
  });
  // Since this is a production environment, no forms are submitted.

  test.describe('Map Section - Desktop', () => {
    test('should display location details when clicking the UK map pin', async ({ page }) => {
      // Locate the United Kingdom marker button by its aria-label
      const ukMarker = page.locator('button.map-marker[aria-label="United Kingdom"]');

      // Assert it's visible and clickable
      await expect(ukMarker).toBeVisible();
      await ukMarker.click();

      // Locate the info box that appears
      const infoBox = page.locator('#map_item_3');

      // Assert it's visible
      await expect(infoBox).toBeVisible();

      // Assert it contains expected text
      await expect(infoBox).toContainText('REGIONAL EMEA HEADQUARTERs');
      await expect(infoBox).toContainText('HH Global | London');
      await expect(infoBox).toContainText('Grove House');
      await expect(infoBox).toContainText('Leatherhead, Surrey KT22 9DF');
    });
  });

  test.describe('Footer Section - Desktop', () => {
    test('should navigate when clicking Terms + Conditions', async ({ page }) => {
      // Arrange
      const footerLink = page.locator('a[href="/terms-conditions/"]');

      // Act: click the footer link
      await footerLink.scrollIntoViewIfNeeded();
      await footerLink.click();

      // Assert: confirm URL
      await expect(page).toHaveURL(/\/terms-conditions/);
    });
  });
});
