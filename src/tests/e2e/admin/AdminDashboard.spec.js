/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

// render test
test('loads expected content', async ({page}) => {
  await page.goto('admin');
  
  const newEmployeeTab = page.getByTestId('new-setter-tab');
  const newEmployeeFrom = page.getByTestId('new-setter-form');
  const newGymTab = page.getByTestId('new-gym-tab');
  const newGymForm = page.getByTestId('new-gym-form');

  
  await expect(newEmployeeTab).toBeVisible();
  await expect(newEmployeeFrom).toBeVisible();
  await expect(newGymTab).toBeVisible();
  await expect(newGymForm).not.toBeVisible();
});

test('will switch the visible content from the new setter form to the new gym form and then back', async ({ page }) => {
  await page.goto('admin');

  const newEmployeeTab = page.getByTestId('new-setter-tab');
  const newEmployeeFrom = page.getByTestId('new-setter-form');
  const newGymTab = page.getByTestId('new-gym-tab');
  const newGymForm = page.getByTestId('new-gym-form');

  
  await newGymTab.click();
  await expect(newEmployeeFrom).not.toBeVisible();
  await expect(newGymForm).toBeVisible();

  await newEmployeeTab.click();
  await expect(newEmployeeFrom).toBeVisible();
  await expect(newGymForm).not.toBeVisible();
});