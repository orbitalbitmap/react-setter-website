/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockEmployeeList from '../../mock-data/mockEmployeeList';
import mockGymList from '../../mock-data/mockGymList';

const mockSingleEmployee = mockEmployeeList[0];

test('loads expected content', async ({page}) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockEmployeeList });
  });
  await page.route('*/**/api/employees/1', async route => {
    await route.fulfill({ json: mockSingleEmployee });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });

  await page.goto(`employees/${mockSingleEmployee.id}`);
  
  const employeeContainer = page.getByTestId('employee-container');
  const nameHeading = page.getByRole('heading', { name: `${mockSingleEmployee.firstName} ${mockSingleEmployee.lastName}` });
  const emailHeading = page.getByRole('heading', { name: mockSingleEmployee.email });
  const buttonContainer = page.getByTestId('button-container');
  
  await expect(employeeContainer).toBeVisible();
  await expect(nameHeading).toBeVisible();
  await expect(emailHeading).toBeVisible();
  await expect(buttonContainer).toBeVisible();
});