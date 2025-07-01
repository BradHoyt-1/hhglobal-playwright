# “HH Global Home Task – Brad Hoyt” PDF File

Please refer to the “HH Global Home Task – Brad Hoyt” PDF document which is included in the hhglobal-playwright folder for the Scalability Strategy, AI Disclosure, and a complete, detailed overview beyond what is included in this README.

# HH Global QA Automation Framework

This project demonstrates a Playwright-based test automation framework for testing the [HH Global website](https://www.hhglobal.com) across desktop and mobile devices.

---

## 🎯 Objectives

- Validate that key UI elements render and function as expected.
- Confirm navigation works across desktop and mobile views, including the hamburger menu.
- Establish a scalable foundation for broader test coverage.
- Showcase how Playwright can be used effectively for cross-device QA.

---

## 🗂 Project Structure

```
├── tests/
│   ├── desktop/
│   │   ├── homepage-desktop.spec.ts
│   │   ├── navigation-desktop.spec.ts
│   │   └── navigation-hamburger-desktop.spec.ts
│   ├── mobile/
│   │   ├── homepage-mobile.spec.ts
│   │   └── navigation-mobile.spec.ts
│   ├── home.spec.ts
│   └── ui-elements.spec.ts
├── helpers/
│   └── acceptCookies.ts
├── playwright.config.ts
└── README.md
```

> *Note:* The current folder structure separates desktop and mobile for clarity. In the future, tests could be organized by feature area and tagged by device.

---

## ⚙️ Setup Instructions

To run the tests:

1. Open a terminal and navigate to the project folder:
   ```bash
   cd hhglobal-playwright
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install browsers:
   ```bash
   npx playwright install
   ```
4. (Optional) Install the [Playwright Test for VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

---

## 🌐 iOS and Cross-Platform Testing

While Playwright’s device emulation reliably validates responsive layouts, especially with the Chromium and Mobile Chrome projects, I would recommend using a 3rd party tool like Browserstack for running tests on real devices. I would especially recommend this for iOS devices. Playwright’s Mobile Safari emulation is not reliable, and the only way to test on Mac operating systems from a PC would be to use a tool like this. Also, using Browserstack can help catch touch-specific and rendering issues that emulators may miss. When running the tests for this project, I recommend running the desktop tests with Chromium (`--project="chromium"`) and mobile tests with Mobile Chrome (`--project="Mobile Chrome"`).

**To run only desktop tests:**

npx playwright test tests/desktop --project="chromium"

**To run only mobile tests:**

npx playwright test tests/mobile --project="Mobile Chrome"

---

## 🧭 Overview of Test Coverage

### 🖥️ Desktop Tests

- **home.spec.ts**: Smoke test to confirm homepage loads (checks page title).
- **ui-elements.spec.ts**: Verifies navigation bar, hero banner, and footer visibility.
- **homepage-desktop.spec.ts**: Tests hero section, data cards, contact form, map, and footer links.
- **navigation-desktop.spec.ts**: Validates top-level menu and submenus.
- **navigation-hamburger-desktop.spec.ts**: Checks hamburger menu visibility and navigation when resizing.

### 📱 Mobile Tests

- **home.spec.ts**: Smoke test confirming homepage loads.
- **ui-elements.spec.ts**: Checks key homepage elements on mobile.
- **homepage-mobile.spec.ts**: Validates hero section, cards, contact form, and footer.
- **navigation-mobile.spec.ts**: Verifies hamburger menu expands and navigation works.

---

## 🛠 Helper

**helpers/acceptCookies.ts**: Addresses the cookie consent overlay across all tests.

---

## ⚙️ Playwright Configuration Notes

To improve reliability on my development machine, I adjusted the config:

- Timeout increased from 30,000ms to 90,000ms.
- Retries set to 2 (default was 0).
- Worker count limited to 3 (default was 4).

*Tip:* When writing or debugging new tests, I set retries to 0 to catch all failures.