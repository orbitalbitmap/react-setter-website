/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockUser from '../../mock-data/mockUser';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';

// render test
test('loads expected content', async ({ page }) => {
  await page.goto('/');

  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' });

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();
});

test('failed login works as expected with a bad email/password', async ({ page }) => {
  await page.route('*/**/api/login', async route => {
    await route.abort();
  });
  await page.goto('/');

  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' });
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();
  await expect(snackNotification).not.toBeVisible();
  
  await signInButton.click();
  await expect(snackNotification).toBeVisible();
});

test('failed login works as expected with no email/password', async ({ page }) => {
  await page.goto('/');

  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' });
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(signInButton).toBeVisible();
  await expect(snackNotification).not.toBeVisible();
  
  // login attempt without email and password
  await signInButton.click();
  await expect(snackNotification).toBeVisible();

  // login attempt with email and no password
  await emailInput.fill('test@test.com')
  // waits for the first snackbar to clear to not caus a false positive
  await expect(snackNotification).not.toBeVisible();
  
  await signInButton.click();
  await expect(snackNotification).toBeVisible();
});

test('successful login works as expected', async ({ page }) => {
  await page.route('*/**/api/login', async route => {
    await route.fulfill({ json: mockUser });
  });
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.goto('/');

  const emailInput = page.getByLabel('Email Address');
  const passwordInput = page.getByLabel('Password');
  const signInButton = page.getByRole('button', { name: 'Sign In' });

  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@test.com')
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('test');
  await expect(signInButton).toBeVisible();
  signInButton.click()
  
  await signInButton.click();

  const heading = page.getByRole('heading', { name: 'Dashboard' })
  await expect(heading).toBeVisible();
});