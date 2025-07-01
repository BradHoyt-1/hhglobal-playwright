import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2, // Switch to 0 retries for clarity when writing tests
  reporter: 'html',
  workers: 3, // Limit to 3 workers due to CPU performance

  use: {
    baseURL: 'https://www.hhglobal.com',
    trace: 'on',
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read'],
      },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Safari'] },
    // },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
