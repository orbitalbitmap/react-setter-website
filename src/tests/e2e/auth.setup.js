import { test as setup, expect } from '@playwright/test';

const authFile = './playwright/.auth/user.json';
const userEmail = process.env.REACT_APP_TEST_EMAIL;
const userPassword = process.env.REACT_APP_TEST_PASSWORD;

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' })

  await expect(emailInput).toBeVisible();
  await emailInput.fill(userEmail)
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(userPassword);
  await expect(signInButton).toBeVisible();
  signInButton.click()

  const heading = page.getByRole('heading', { name: 'Dashboard' })
  await expect(heading).toBeVisible();

  await page.context().storageState({ path: authFile });
});