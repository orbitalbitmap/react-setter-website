/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';

test('make sure the EmployeeList page loads the expected count and works correctly', async ({ page, baseURL }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });

  await page.goto('employees');
  
  const employeesContainer = page.getByTestId('employees-container');
  const employeeCard = page.getByTestId('employee-card-container');
  const employeeContainer = page.getByTestId('employee-container');

  const singleEmployeeLink = employeeCard.getByRole('link').first();

  await expect(employeesContainer).toBeVisible();
  await expect(employeeCard).toHaveCount(mockFullEmployeeList.length);

  await expect(singleEmployeeLink).toBeVisible();
  await singleEmployeeLink.click();

  await expect(page.url()).toBe(`${baseURL}/employees/${mockFullEmployeeList[0].id}`);
  await expect(employeeContainer).toBeVisible();
});