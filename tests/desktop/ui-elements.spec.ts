import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers';

test.describe('Homepage UI Elements', () => {
  test('should display navigation, hero banner, and footer', async ({ page }) => {
    await page.goto('/');

      // Handle cookies
    await acceptCookies(page);

    // Navigation bar (adjust selector as needed)
    await expect(page.locator('header')).toBeVisible();

    // Hero banner text
    await expect(page.locator('div.hero-container')).toBeVisible();

    // Footer
    await expect(page.locator('footer')).toBeVisible();
  });
});
