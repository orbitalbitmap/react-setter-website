/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('employees/1');
  
  const employeeContainer = page.getByTestId('employee-container');
  const buttonContainer = page.getByTestId('button-container');
  
  await expect(employeeContainer).toBeVisible();
  await expect(buttonContainer).toBeVisible();
});