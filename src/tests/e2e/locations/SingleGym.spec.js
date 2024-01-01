/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('locations/1');
  
  const mainContainer = page.getByTestId('main-container');
  const headSetter = page.getByTestId('head-setter-container');
  const fullTimeSetters = page.getByTestId('full-time-setters-container');
  const partTimeSetters = page.getByTestId('part-time-setters-container');
  
  await expect(mainContainer).toBeVisible();
  await expect(headSetter).toBeVisible();
  await expect(fullTimeSetters).toBeVisible();
  await expect(partTimeSetters).toBeVisible();
});