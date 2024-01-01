/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('locations');
  
  const mainContainer = page.getByTestId('main-container');
  const locationsContainer = page.getByTestId('location-card-container');
  
  await expect(mainContainer).toBeVisible();
  await expect(locationsContainer).toBeVisible();
});