/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('sections/1');
  
  const mainContainer = page.getByTestId('specific-sections-container');
  const sectionContainer = page.getByTestId('Worcester-sections-container')
  
  await expect(mainContainer).toBeVisible();
  await expect(sectionContainer).toBeVisible();
});