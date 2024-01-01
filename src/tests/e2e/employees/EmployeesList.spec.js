/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('employees');
  
  const employeesContainer = page.getByTestId('employees-container');
  
  await expect(employeesContainer).toBeVisible();
})