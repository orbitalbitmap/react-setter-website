import { test as setup, expect } from '@playwright/test';
import mockUser from '../mock-data/mockUser';
import mockFullEmployeeList from '../mock-data/mockFullEmployeeList';
import mockGymList from '../mock-data/mockGymList';

const authFile = './playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route('*/**/api/login', async route => {
    await route.fulfill({ json: mockUser });
  });

  await page.goto('/');
  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' })

  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@test.com')
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('test');
  await expect(signInButton).toBeVisible();
  signInButton.click();

  const heading = page.getByRole('heading', { name: 'Dashboard' })
  await expect(heading).toBeVisible();

  await page.context().storageState({ path: authFile });
});