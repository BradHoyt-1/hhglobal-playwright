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
    // Set viewport to a smaller size to ensure hamburger icon appears
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(baseURL);
    await acceptCookies(page);
  });

  test('should navigate correctly', async ({ page }) => {
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

        await submenuLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains));
      } else {
        // Tap parent link directly
        await parentLink.click();
        await expect(page).toHaveURL(new RegExp(item.hrefContains));
      }

      // Return home
      await page.goto(baseURL);
    }
  });
});
