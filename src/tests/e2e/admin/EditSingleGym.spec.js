/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from'../../mock-data/mockSingleGym';

test('make sure the EditSingleGym page works as expected', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route(`*/**/api/gymById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });
  await page.route('*/**/api/updateGymInfo', async route => {
    await route.fulfill({ status: 200 });
  });
  
  await page.goto(`admin/location/${mockSingleGym.id}`);

  const mainContainer = page.getByRole('main');
  const editContainer = page.getByTestId('edit-container');
  const addressInput = page.getByLabel('Address');
  const phoneNumberInput = page.getByLabel('Phone Number');
  const headSetterInput = page.getByLabel('Head Setter');
  const headSetterOptions = page.getByRole('option');
  const newHeadSetterOption = await headSetterOptions.count()-1;
  const facebookInput = page.getByLabel('Facebook');
  const instagramInput = page.getByLabel('Instagram');
  const twitterInput = page.getByLabel('Twitter');
  const submitButton = page.getByRole('button', { name: 'Update Info'});
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(mainContainer).toBeVisible();
  await expect(editContainer).toBeVisible();

  await expect(addressInput).toBeVisible();
  await addressInput.fill('100 Mount Crest View Anaheim, Ca');

  await expect(phoneNumberInput).toBeVisible();
  await phoneNumberInput.fill('111-222-3333');
  
  await expect(headSetterInput).toBeVisible();
  await headSetterInput.click();
  await headSetterOptions.nth(newHeadSetterOption).click();
  
  await expect(facebookInput).toBeVisible();
  await facebookInput.fill('100 Mount Crest View Anaheim, Ca');
  
  await expect(instagramInput).toBeVisible();
  await instagramInput.fill('100 Mount Crest View Anaheim, Ca');
  
  await expect(twitterInput).toBeVisible();
  await twitterInput.fill('100 Mount Crest View Anaheim, Ca');
  
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('The gym\'s information has been saved!');
});