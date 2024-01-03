const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');


// Read from default ".env" file.
dotenv.config();

// @see https://playwright.dev/docs/test-configuration
module.exports = defineConfig({
  testDir: './src/tests/e2e/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});