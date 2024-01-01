/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('distribution/current/boulders/1');
  
  const sectionsList = page.getByTestId('sections-list');
  const buttonContainer = page.getByTestId('button-container');
  const distributionContainer = page.getByTestId('distribution-container');
  const dateUpdateContainer = page.getByTestId('date-updater-container');
  
  await expect(sectionsList).toBeVisible();
  await expect(buttonContainer).toBeVisible();
  await expect(distributionContainer).toBeVisible();
  await expect(dateUpdateContainer).toBeVisible();
});