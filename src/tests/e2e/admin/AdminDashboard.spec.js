/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';

test.beforeEach('mock the necessary api paths before navigating to the AdminDashboard page', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  
  page.goto('admin');
});

test('make sure the new employee form works as expected', async ({ page }) => {
  await page.route('*/**/api/saveEmployee', async route => {
    await route.fulfill({ status: 200});
  });

  const newEmployeeTab = page.getByTestId('new-setter-tab');
  const newEmployeeFrom = page.getByTestId('new-setter-form');
  const snackNotification = page.getByTestId('snackbar-notification');
  const firstNameInput = page.getByLabel('First Name');
  const lastNameInput = page.getByLabel('Last Name');
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Password');
  const phoneNumberInput = page.getByLabel('Phone Number');
  const roleInput = page.getByLabel('Role');
  const employeeLocationsInput = page.getByLabel('Employee\'s gyms');
  const submitButton = page.getByRole('button', { name: 'Save Employee' });
  
  await expect(newEmployeeTab).toBeVisible();
  await expect(newEmployeeFrom).toBeVisible();

  await expect(firstNameInput).toBeVisible();
  await firstNameInput.fill('Test');

  await expect(lastNameInput).toBeVisible();
  await lastNameInput.fill('Test');

  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@test.com');
  
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('v3ry_R34Lp455w0rd');

  await expect(phoneNumberInput).toBeVisible();
  await phoneNumberInput.fill('111-111-1111');

  await expect(roleInput).toBeVisible();
  await roleInput.click();
  // clicks the second option in the list as the first is just a placeholder.
  await page.getByRole('option').nth(0).click();

  await expect(employeeLocationsInput).toBeVisible();
  await employeeLocationsInput.click();
  await page.getByRole('option').nth(0).click();
  
  // Simulates a user clicking out of the component's popup to close it
  await page.mouse.click(10, 10);
  
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('A new employee has been saved!');
});

test('make sure that new employee cannot be saved until all required fields are filled', async ({ page }) => {
  await page.route('*/**/api/saveEmployee', async route => {
    await route.fulfill({ status: 200});
  });

  const newEmployeeTab = page.getByTestId('new-setter-tab');
  const newEmployeeFrom = page.getByTestId('new-setter-form');
  const snackNotification = page.getByTestId('snackbar-notification');
  const firstNameInput = page.getByLabel('First Name');
  const lastNameInput = page.getByLabel('Last Name');
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Password');

  const submitButton = page.getByRole('button', { name: 'Save Employee' });
  
  await expect(newEmployeeTab).toBeVisible();
  await expect(newEmployeeFrom).toBeVisible();
  await expect(snackNotification).not.toBeVisible();

  // tries submitting without filling out any information
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Missing information, please enter all of the required fields.');
  await expect(snackNotification).not.toBeVisible();

  // tries submitting after filling out just the first name field
  await firstNameInput.fill('Test');
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Missing information, please enter all of the required fields.');
  await expect(snackNotification).not.toBeVisible();
  
  // tries submitting after filling out just the last name field
  await lastNameInput.fill('Test');
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Missing information, please enter all of the required fields.');
  await expect(snackNotification).not.toBeVisible();
  
  // tries submitting after filling out just the email field
  await emailInput.fill('test@test.com');
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Missing information, please enter all of the required fields.');
  await expect(snackNotification).not.toBeVisible();
  
  // tries submitting after filling out just the password field
  await passwordInput.fill('v3ry_R34Lp455w0rd');
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('A new employee has been saved!');
});

test('make sure the new gym form works as expected', async ({ page }) => {
  await page.route('*/**/api/saveNewGym', async route => {
    await route.fulfill({ status: 200 });
  });

  const newGymTab = page.getByTestId('new-gym-tab');
  const newGymForm = page.getByTestId('new-gym-form');
  const snackNotification = page.getByTestId('snackbar-notification');
  const nameInput = page.getByLabel('Gym Name');
  const addressInput = page.getByLabel('Address');
  const phoneNumberInput = page.getByLabel('Phone Number');
  const facebookInput = page.getByLabel('Facebook');
  const instagramInput = page.getByLabel('Instagram');
  const twitterInput = page.getByLabel('Twitter');
  const headSetterInput = page.getByLabel('Head Setter');
  const submitButton = page.getByRole('button', { name: 'Save Gym' });
  
  await expect(newGymTab).toBeVisible();
  await newGymTab.click();
  await expect(newGymForm).toBeVisible();

  await expect(nameInput).toBeVisible();
  await nameInput.fill('CRG Cragstead');

  await expect(addressInput).toBeVisible();
  await addressInput.fill('111 Teton Heights Ave Cragstead, MA 00001');

  await expect(phoneNumberInput).toBeVisible();
  await phoneNumberInput.fill('111-111-1111');

  await expect(facebookInput).toBeVisible();
  await facebookInput.fill('CRG Cragstead');

  await expect(instagramInput).toBeVisible();
  await instagramInput.fill('@crgcragstead');

  await expect(twitterInput).toBeVisible();
  await twitterInput.fill('crgCragstead');

  await expect(headSetterInput).toBeVisible();
  await headSetterInput.click();
  // clicks the second option in the list as the first is just a placeholder.
  await page.getByRole('option').nth(1).click();
  
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('A new gym has been saved!');
});

test('make sure that new gym cannot be saved until all required fields are filled', async ({ page }) => {
  await page.route('*/**/api/saveNewGym', async route => {
    await route.fulfill({ status: 200 });
  });

  const newGymTab = page.getByTestId('new-gym-tab');
  const newGymForm = page.getByTestId('new-gym-form');
  const snackNotification = page.getByTestId('snackbar-notification');
  const nameInput = page.getByLabel('Gym Name');

  const submitButton = page.getByRole('button', { name: 'Save Gym' });
  
  await expect(newGymTab).toBeVisible();
  await newGymTab.click();
  await expect(newGymForm).toBeVisible();
  await expect(snackNotification).not.toBeVisible();

  // tries submitting without filling out any information
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('Missing information, please enter all of the required fields.');
  await expect(snackNotification).not.toBeVisible();

  // tries submitting after filling out just the first name field
  await nameInput.fill('Test');
  await submitButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('A new gym has been saved!');
});