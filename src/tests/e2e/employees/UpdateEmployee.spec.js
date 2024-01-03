/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockEmployeeList from '../../mock-data/mockEmployeeList';
import mockGymList from '../../mock-data/mockGymList';

const mockSingleEmployee = mockEmployeeList[0];

test.beforeEach('mock the necessary api paths before navigating to the UpdateEmployee page', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });

  await page.goto(`employees/edit/${mockSingleEmployee.id}`);
});

test('make sure the UpdateEmployee page works as expected', async ({page}) => {
  await page.route('*/**/api/updateEmployee', async route => {
    await route.fulfill({ status: 200 });
  });

  const updateEmployeeContainer = page.getByTestId('update-employee-container');
  const firstNameInput = page.getByLabel('First Name');
  const lastNameInput = page.getByLabel('Last Name');
  const placardNameInput = page.getByLabel('Name on placard');
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Password');
  const phoneNumberInput = page.getByLabel('Phone Number');
  const employeeLocationsInput = page.getByLabel('Employee\'s gyms');
  const submitButton = page.getByRole('button', { name: 'Save Employee'});
  const snackNotification = page.getByTestId('snackbar-notification');
  
  await expect(updateEmployeeContainer).toBeVisible();
  await expect(firstNameInput).toBeVisible();
  firstNameInput.fill('Test');

  await expect(lastNameInput).toBeVisible();
  lastNameInput.fill('Test');

  await expect(placardNameInput).toBeVisible();
  placardNameInput.fill('Test');

  await expect(emailInput).toBeVisible();
  emailInput.fill('test@test.com');

  await expect(passwordInput).toBeVisible();
  passwordInput.fill('v3ry_R34Lp455w0rd');

  await expect(phoneNumberInput).toBeVisible();
  phoneNumberInput.fill('333-333-3333');
  
  await expect(employeeLocationsInput).toBeVisible();
  await employeeLocationsInput.click();
  await page.getByRole('option').nth(0).click();
  // Simulates a user clicking out of the component's popup to close it
  await page.mouse.click(10, 10);

  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Employee info updated!');
});

test('make sure the UpdateEmployee page works as expected when the backend sends back an error', async ({page}) => {
  await page.route('*/**/api/updateEmployee', async route => {
    await route.fulfill({ status: 500 });
  });

  const submitButton = page.getByRole('button', { name: 'Save Employee'});
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Employee info could not be updated.  Please, try again.');
});