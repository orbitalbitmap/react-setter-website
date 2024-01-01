/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('sections/edit/1');
  
  const mainContainer = page.getByTestId('main-container');
  const ropeSectionContainer = page.getByTestId('rope-sections-container')
  const ropeButtonContainer = page.getByTestId('rope-buttons-container')
  const boulderSectionContainer = page.getByTestId('boulder-sections-container')
  const boulderButtonContainer = page.getByTestId('boulder-buttons-container')
  
  await expect(mainContainer).toBeVisible();
  await expect(ropeSectionContainer).toBeVisible();
  await expect(ropeButtonContainer).toBeVisible();
  await expect(boulderSectionContainer).toBeVisible();
  await expect(boulderButtonContainer).toBeVisible();
});