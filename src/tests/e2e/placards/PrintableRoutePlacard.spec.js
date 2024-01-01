/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

// render test
test('loads expected content', async ({page}) => {
  await page.goto('placard/ropes/1');
  
  const climbSelectorsContainer = page.getByTestId('climb-selectors-container');
  const routePlacardContainer = page.getByTestId('route-placard-container');
  
  await expect(climbSelectorsContainer).toBeVisible();
  await expect(routePlacardContainer).toBeVisible();
});