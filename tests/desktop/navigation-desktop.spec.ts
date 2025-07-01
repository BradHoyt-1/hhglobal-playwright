import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers';

test.describe('Navigation menu - Desktop', () => {
  const baseURL = 'https://www.hhglobal.com/';

  // Define menu items to test
  const menuItems = [
    {
      label: 'Who we are',
      hasSubmenu: true,
      subLinkText: 'Company',
      hrefContains: '/who-we-are/company'
    },
    {
      label: 'What we do',
      hasSubmenu: true,
      subLinkText: 'Creative + Digital',
      hrefContains: '/what-we-do/creative-digital'
    },
    {
      label: 'Case studies',
      hasSubmenu: false,
      hrefContains: '/casestudy'
    },
    {
      label: 'News',
      hasSubmenu: false,
      hrefContains: '/news'
    },
    {
      label: 'We’re hiring',
      hasSubmenu: false,
      hrefContains: '/careers'
    },
    {
      label: 'Contact us',
      hasSubmenu: false,
      hrefContains: '/contact'
    }
  ];

  test.beforeEach(async ({ page }) => {
    // Set viewport to a typical desktop size to ensure menu layout
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Go to the homepage
    await page.goto(baseURL);

    // Accept cookies banner if present
    await acceptCookies(page);

    // Remove residual overlays
    await page.evaluate(() => {
      const el = document.querySelector('#onetrust-consent-sdk');
      if (el) el.remove();
    });
    await page.addStyleTag({
      content: `
        #onetrust-consent-sdk,
        .onetrust-pc-dark-filter {
          display: none !important;
          pointer-events: none !important;
        }
      `
    });
  });

  test('should navigate correctly from main navigation', async ({ page }) => {
    for (const item of menuItems) {
      // Locate the top-level menu link by its accessible name
      const parentLink = page.getByRole('link', { name: item.label });
      await expect(parentLink).toBeVisible();

      if (item.hasSubmenu) {
        // Scroll into view to avoid any hidden state
        await parentLink.scrollIntoViewIfNeeded();

        // Hover to open the submenu
        await parentLink.hover();

        // Re-hide overlays in case they reappeared
        await page.evaluate(() => {
          const el = document.querySelector('#onetrust-consent-sdk');
          if (el) el.remove();
        });
        await page.addStyleTag({
          content: `
            #onetrust-consent-sdk,
            .onetrust-pc-dark-filter {
              display: none !important;
              pointer-events: none !important;
            }
          `
        });

        // Wait for submenu link to appear
        const submenuLink = page.getByRole('link', { name: item.subLinkText });
        await expect(submenuLink).toBeVisible({ timeout: 5000 });

        // Click submenu link and assert URL
        await submenuLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains));
      } else {
        // Click the parent link and assert URL
        await parentLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains));
      }

      // Return home before the next iteration
      await page.goto(baseURL);

      // Re-accept cookies and ensure overlays do not interfere
      await acceptCookies(page);
      await page.evaluate(() => {
        const el = document.querySelector('#onetrust-consent-sdk');
        if (el) el.remove();
      });
      await page.addStyleTag({
        content: `
          #onetrust-consent-sdk,
          .onetrust-pc-dark-filter {
            display: none !important;
            pointer-events: none !important;
          }
        `
      });
    }
  });
});