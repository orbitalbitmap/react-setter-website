/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

// render test
test('loads expected content', async ({page}) => {
  await page.goto('placard/boulders/1');
  
  const climbsPerPlacardSelector = page.getByTestId('climbs-per-placard-container');
  const sectionSelectorContainer = page.getByTestId('section-selector-container');
  const topPlacardContainer = page.getByTestId('top-placard-container');
  const bottomPlacardContainer = page.getByTestId('bottom-placard-container');
  
  await expect(climbsPerPlacardSelector).toBeVisible();
  await expect(sectionSelectorContainer).toBeVisible();
  await expect(topPlacardContainer).toBeVisible();
  await expect(bottomPlacardContainer).toBeVisible();
});