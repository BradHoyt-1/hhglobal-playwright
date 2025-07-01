import { Page } from '@playwright/test';

export async function acceptCookies(page: Page) {
  const acceptButton = page.getByRole('button', { name: 'Accept All Cookies' });

  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
}
