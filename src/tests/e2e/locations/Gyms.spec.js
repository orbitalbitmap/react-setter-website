/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockGymList from '../../mock-data/mockGymList';
import mockEmployeeList from '../../mock-data/mockEmployeeList';

test.beforeEach('mock out the appropriate api paths before navigating to the Gyms page', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });

  await page.goto('locations');
});
test('loads expected content', async ({ page }) => {
  const mainContainer = page.getByTestId('main-container');
  const locationsContainer = page.getByTestId('location-cards-container');
  const locationCardList = page.getByTestId('location-card');
  const firstCard = locationCardList.nth(0);
  const secondCard = locationCardList.nth(1);
  
  await expect(mainContainer).toBeVisible();
  await expect(locationsContainer).toBeVisible();
  await expect(locationCardList).toHaveCount(mockGymList.length);
  
  await expect(firstCard.getByRole('heading')).toHaveText(mockGymList[0].name);
  await expect(firstCard).toContainText(mockGymList[0].address);
  await expect(firstCard).toContainText(mockGymList[0].phoneNumber);

  await expect(secondCard.getByRole('heading')).toHaveText(mockGymList[1].name);
  await expect(secondCard).toContainText(mockGymList[1].address);
  await expect(secondCard).toContainText(mockGymList[1].phoneNumber);
});