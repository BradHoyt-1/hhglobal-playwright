import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers';

test.describe('Navigation menu - Mobile', () => {
  const baseURL = 'https://www.hhglobal.com/';

  const menuItems = [
    {
      label: 'Who we are',
      parentId: '#menu-item-9392',
      hasSubmenu: true,
      subLinkText: 'Company',
      hrefContains: '/who-we-are/company'
    },
    {
      label: 'What we do',
      parentId: '#menu-item-9393',
      hasSubmenu: true,
      subLinkText: 'Creative + Digital',
      hrefContains: '/what-we-do/creative-digital'
    },
    {
      label: 'Case studies',
      parentId: '#menu-item-6044',
      hasSubmenu: false,
      hrefContains: '/casestudy'
    },
    {
      label: 'News',
      parentId: '#menu-item-6037',
      hasSubmenu: false,
      hrefContains: '/news'
    },
    {
      label: 'We’re hiring',
      parentId: '#menu-item-6045',
      hasSubmenu: false,
      hrefContains: '/careers'
    },
    {
      label: 'Contact us',
      parentId: '#menu-item-471',
      hasSubmenu: false,
      hrefContains: '/contact'
    }
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await acceptCookies(page);
  });

  test('should navigate correctly from mobile navigation', async ({ page }) => {
    // Allow more time per test
    test.setTimeout(60_000);

    for (const item of menuItems) {
      // Open hamburger menu
      const burgerButton = page.locator('#burger_cont');
      await expect(burgerButton).toBeVisible();
      await burgerButton.click();

      const parentLink = page.locator(`${item.parentId} > a`);
      await expect(parentLink).toBeVisible();

      if (item.hasSubmenu) {
        // Tap parent to expand submenu
        await parentLink.click();

        const submenuLink = page.locator(`${item.parentId} ul.sub-menu a`, {
          hasText: item.subLinkText
        });

        await expect(submenuLink).toBeVisible();

        // Click submenu and verify navigation
        await submenuLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains), { timeout: 20000 });

      } else {
        // Tap parent link directly and verify navigation
        await parentLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains), { timeout: 20000 });
      }

      // Return home
      await page.goto(baseURL);

      // Re-accept cookies in case they reappear
      await acceptCookies(page);
      await page.locator('#onetrust-consent-sdk').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      await page.locator('.onetrust-pc-dark-filter').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      await page.evaluate(() => {
        const el = document.querySelector('#onetrust-consent-sdk');
        if (el) el.remove();
      });
    }
  });
});
